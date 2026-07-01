import type { APIRoute } from "astro";

export const prerender = false;

interface RankItem {
  id: string;
  score: number;
}

interface LeadPayload {
  nombre?: string;
  whatsapp?: string;
  presupuesto?: string;
  mensaje?: string;
  estilo?: string;
  estiloId?: string;
  ranking?: RankItem[];
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getEnv(locals: App.Locals): Record<string, string | undefined> {
  // Cloudflare runtime (producción / wrangler) y fallback a import.meta.env (astro dev)
  const runtimeEnv =
    (locals as unknown as { runtime?: { env?: Record<string, string> } })
      ?.runtime?.env ?? {};
  return {
    RESEND_API_KEY: runtimeEnv.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY,
    LEAD_TO_EMAIL:
      runtimeEnv.LEAD_TO_EMAIL ??
      import.meta.env.LEAD_TO_EMAIL ??
      "gimrgc@gmail.com",
    LEAD_FROM_EMAIL:
      runtimeEnv.LEAD_FROM_EMAIL ??
      import.meta.env.LEAD_FROM_EMAIL ??
      "The Woods <onboarding@resend.dev>",
  };
}

export const POST: APIRoute = async ({ request, locals }) => {
  const json = (body: object, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let data: LeadPayload;
  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return json({ ok: false, error: "Cuerpo de la solicitud inválido." }, 400);
  }

  const nombre = (data.nombre ?? "").trim();
  const whatsapp = (data.whatsapp ?? "").trim();
  if (!nombre || !whatsapp) {
    return json(
      { ok: false, error: "Nombre y WhatsApp son obligatorios." },
      400
    );
  }

  const env = getEnv(locals);
  if (!env.RESEND_API_KEY) {
    console.error("[lead] Falta RESEND_API_KEY");
    return json(
      {
        ok: false,
        error:
          "El servidor no está configurado para enviar correos (falta la API Key).",
      },
      500
    );
  }

  const estilo = esc(data.estilo || "—");
  const presupuesto = esc(data.presupuesto || "No especificado");
  const mensaje = esc(data.mensaje || "—");

  const rankingRows = (data.ranking ?? [])
    .map(
      (r) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b;">${esc(
          r.id
        )}</td><td style="padding:4px 0;font-weight:600;">${esc(
          r.score
        )} pts</td></tr>`
    )
    .join("");

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#1c1a17;">
    <div style="background:#1c1a17;color:#fff;padding:24px 28px;border-radius:16px 16px 0 0;">
      <h1 style="margin:0;font-size:20px;">🌳 Nuevo lead — The Woods</h1>
      <p style="margin:6px 0 0;color:#b6ad9f;font-size:14px;">Test de estilo de decoración</p>
    </div>
    <div style="border:1px solid #e4ded2;border-top:none;border-radius:0 0 16px 16px;padding:28px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#7a736a;width:140px;">Nombre</td><td style="padding:8px 0;font-weight:600;">${esc(
          nombre
        )}</td></tr>
        <tr><td style="padding:8px 0;color:#7a736a;">WhatsApp</td><td style="padding:8px 0;font-weight:600;"><a href="https://wa.me/${esc(
          whatsapp.replace(/[^0-9]/g, "")
        )}" style="color:#8a6a47;">${esc(whatsapp)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#7a736a;">Estilo</td><td style="padding:8px 0;font-weight:600;">${estilo}</td></tr>
        <tr><td style="padding:8px 0;color:#7a736a;">Presupuesto</td><td style="padding:8px 0;font-weight:600;">${presupuesto}</td></tr>
        <tr><td style="padding:8px 0;color:#7a736a;vertical-align:top;">Mensaje</td><td style="padding:8px 0;">${mensaje}</td></tr>
      </table>

      ${
        rankingRows
          ? `<div style="margin-top:20px;padding-top:16px;border-top:1px solid #e4ded2;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a736a;">Afinidad de estilos</p>
              <table style="font-size:13px;">${rankingRows}</table>
            </div>`
          : ""
      }
    </div>
    <p style="text-align:center;color:#9b9384;font-size:12px;margin-top:16px;">
      Enviado automáticamente desde thewoods · Puebla, México
    </p>
  </div>`;

  const text = `Nuevo lead — The Woods
Nombre: ${nombre}
WhatsApp: ${whatsapp}
Estilo: ${data.estilo || "—"}
Presupuesto: ${data.presupuesto || "No especificado"}
Mensaje: ${data.mensaje || "—"}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: [env.LEAD_TO_EMAIL],
        reply_to: undefined,
        subject: `🌳 Nuevo lead (${data.estilo || "estilo"}) — ${nombre}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead] Resend error:", res.status, detail);
      return json(
        {
          ok: false,
          error:
            "No pudimos enviar tu solicitud en este momento. Intenta de nuevo.",
        },
        502
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[lead] Excepción:", err);
    return json(
      { ok: false, error: "Error de red al enviar tu solicitud." },
      500
    );
  }
};
