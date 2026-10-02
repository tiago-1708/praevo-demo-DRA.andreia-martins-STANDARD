import { createServerFn, getGlobalStartContext } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { contactSubmissionSchema } from "./contact-submission";
import { enforceContactRateLimit } from "./contact-rate-limiter";
import type { RuntimeEnv, ServerRequestContext } from "./server-context";
import { siteConfig } from "./site-config";

/**
 * Envio do formulário de contactos. Notifica a advogada por email
 * (Resend), com "Responder" a ir diretamente para o email de quem escreveu.
 * Sem confirmação automática ao cliente: a advogada contacta diretamente
 * pelos dados recebidos.
 *
 * Secrets: lidos de `context.env` (bindings do Worker em produção — ver
 * `src/server.ts`). Em `vite dev` local esse contexto não existe (o Worker
 * não corre em dev), por isso cai-se para `process.env`, que é o Node real
 * do `vite dev` — por isso `npm run dev` continua a funcionar com
 * `RESEND_API_KEY=... npm run dev` como documentado no SCAFFOLD.
 *
 * `getGlobalStartContext()` devolve em runtime exactamente o que passámos
 * em `handler.fetch(request, { context: { env } })` — confirmado a ler o
 * código-fonte de `@tanstack/start-client-core`/`start-server-core`. O tipo
 * inferido dessa função não resolve correctamente nesta versão do pacote
 * (fica `never` apesar do `Register` estar aumentado — bug de inferência
 * genérica a montante, não um erro de tipagem nosso), por isso o cast
 * explícito abaixo é necessário e seguro.
 */
function currentEnv(): RuntimeEnv {
  return (getGlobalStartContext() as ServerRequestContext | undefined)?.env ?? {};
}

const HONEYPOT_MIN_ELAPSED_MS = 1200;

const runtimeConfigSchema = z.object({
  apiKey: z.string().min(1),
  to: z.string().email(),
  from: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[^\r\n]*$/, "from inválido"),
});

function readRuntimeConfig() {
  const env = currentEnv();
  const apiKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  // Secrets vazios (o workflow sincroniza "" quando não existem) caem para o
  // email da advogada definido em site-config.ts.
  const to =
    env.LEAD_DESTINATION_EMAIL || process.env.LEAD_DESTINATION_EMAIL || siteConfig.advogado.email;
  const from =
    env.LEAD_FROM_ADDRESS ||
    process.env.LEAD_FROM_ADDRESS ||
    `Site ${siteConfig.advogado.displayName} <onboarding@resend.dev>`;

  return runtimeConfigSchema.safeParse({ apiKey, to, from });
}

function escapeHtml(value: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (c) => map[c]);
}

function jsonResponse(status: number, body: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(contactSubmissionSchema)
  .handler(async ({ data }) => {
    const request = getRequest();

    // Honeypot preenchido ou submissão mais rápida do que um humano
    // consegue ler+preencher o formulário: aceitar em silêncio, sem enviar
    // nem gastar quota do Resend, sem dar ao bot sinal de que foi apanhado.
    const elapsed = Date.now() - data.formStartedAt;
    if (data.website || elapsed < HONEYPOT_MIN_ELAPSED_MS) {
      return { accepted: true as const };
    }

    await enforceContactRateLimit(currentEnv(), request);

    const config = readRuntimeConfig();
    if (!config.success) {
      throw jsonResponse(503, { error: "email_unavailable" });
    }
    const { apiKey, to, from } = config.data;

    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone);
    const telHref = `tel:${data.phone.replace(/[^\d+]/g, "")}`;
    const message = data.message
      ? escapeHtml(data.message).replace(/\n/g, "<br>")
      : "<em>Sem mensagem.</em>";
    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#6b5a52;font-size:13px;width:90px;vertical-align:top">${label}</td><td style="padding:8px 0;font-size:15px">${value}</td></tr>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#2e1c1a;max-width:560px">
        <div style="background:#521616;color:#f4f1ea;padding:18px 24px;border-radius:10px 10px 0 0">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8">Site · ${escapeHtml(siteConfig.advogado.displayName)}</div>
          <div style="font-size:20px;margin-top:4px">Novo pedido de contacto</div>
        </div>
        <div style="border:1px solid #ddd3c7;border-top:0;padding:20px 24px;border-radius:0 0 10px 10px;background:#fbf9f5">
          <table style="border-collapse:collapse;width:100%">
            ${row("Nome", name)}
            ${row("Telefone", `<a href="${telHref}" style="color:#521616">${phone}</a>`)}
            ${row("Email", `<a href="mailto:${email}" style="color:#521616">${email}</a>`)}
            ${row("Mensagem", message)}
          </table>
          <p style="margin:18px 0 0;font-size:12px;color:#6b5a52">Enviado pelo formulário de contactos do site. Pode responder diretamente a este email para escrever a ${name}.</p>
        </div>
      </div>
    `.trim();

    const text = [
      "Novo pedido de contacto (site)",
      "",
      `Nome: ${data.name}`,
      `Telefone: ${data.phone}`,
      `Email: ${data.email}`,
      "",
      data.message ? `Mensagem:\n${data.message}` : "Sem mensagem.",
      "",
      "Enviado pelo formulário de contactos do site. Pode responder diretamente a este email.",
    ].join("\n");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: data.email,
          subject: `Novo pedido de contacto pelo site: ${data.name}`,
          html,
          text,
        }),
        signal: controller.signal,
      });
    } catch (error) {
      console.error("Falha ao contactar o Resend:", error);
      throw jsonResponse(502, { error: "email_provider_error" });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      // Nunca devolver o body/estado do Resend ao cliente — só log interno.
      console.error(`Resend respondeu ${res.status} ao enviar contacto.`);
      throw jsonResponse(502, { error: "email_provider_error" });
    }

    return { accepted: true as const };
  });
