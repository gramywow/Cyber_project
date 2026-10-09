/**
 * Réception du formulaire de contact.
 *
 * L'envoi passe par l'API Resend. Tant que la clé et la boîte de réception
 * ne sont pas définies, la route répond 503 et le site l'affiche clairement :
 * aucune demande n'est acceptée puis perdue.
 *
 *   RESEND_API_KEY       clé d'API Resend (obligatoire)
 *   CONTACT_TO_EMAIL     boîte qui reçoit les demandes (obligatoire)
 *   CONTACT_FROM_EMAIL   expéditeur sur un domaine vérifié chez Resend,
 *                        ex. "Use Case Factory <contact@domaine.fr>" (facultatif)
 *
 * Sans CONTACT_FROM_EMAIL, l'envoi part de l'expéditeur de test de Resend.
 * Resend ne le délivre alors qu'à l'adresse du compte Resend lui-même :
 * CONTACT_TO_EMAIL doit être cette adresse tant qu'aucun domaine n'est vérifié.
 */

const TEST_SENDER = "Use Case Factory <onboarding@resend.dev>";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, company: 160, siem: 60, message: 4000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Champ piège rempli : on répond comme un succès sans rien envoyer.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const siem = clean(body.siem, LIMITS.siem);
  const message = clean(body.message, LIMITS.message);

  if (!name || !company || !EMAIL.test(email)) {
    return Response.json({ error: "invalid_fields" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || TEST_SENDER;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Demande de catalogue : ${company} (${siem || "SIEM non précisé"})`,
      text: [
        `Nom : ${name}`,
        `E-mail : ${email}`,
        `Société : ${company}`,
        `SIEM : ${siem || "non précisé"}`,
        "",
        message || "(pas de message)",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
