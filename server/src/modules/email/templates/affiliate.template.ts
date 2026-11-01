import type { AffiliateRequest } from '../../affiliates/entities/affiliate-request.entity'

export interface EmailContent {
  subject: string
  html: string
  text: string
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export const buildAffiliateUserEmail = (request: AffiliateRequest): EmailContent => {
  const name = escapeHtml(request.fullName)
  const subject = 'Recibimos tu solicitud de afiliación — Papá Ganjah'

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2933; line-height: 1.6; max-width: 600px;">
      <h1 style="font-size: 22px;">Hola, ${name}</h1>
      <p>Recibimos tu solicitud para sumarte a Papá Ganjah. Gracias por querer construir una comunidad informada, responsable y con enfoque de derechos.</p>
      <p>Nuestro equipo revisará tu información y se pondrá en contacto contigo para dar seguimiento. Mientras tanto, puedes escribirnos a <a href="mailto:contacto@papaganjah.org">contacto@papaganjah.org</a>.</p>
      <p style="margin-top: 24px;">Con cariño,<br><strong>Colectivo Papá Ganjah A.C.</strong></p>
      <p style="font-size: 12px; color: #6b7280;">Este es un correo automático de confirmación. No es necesario responderlo.</p>
    </div>
  `

  const text = [
    `Hola, ${request.fullName}`,
    '',
    'Recibimos tu solicitud para sumarte a Papá Ganjah. Gracias por querer construir una comunidad informada, responsable y con enfoque de derechos.',
    '',
    'Nuestro equipo revisará tu información y se pondrá en contacto contigo para dar seguimiento.',
    'Puedes escribirnos a contacto@papaganjah.org.',
    '',
    'Colectivo Papá Ganjah A.C.',
  ].join('\n')

  return { subject, html, text }
}

export const buildAffiliateAdminEmail = (request: AffiliateRequest): EmailContent => {
  const subject = `Nueva solicitud de afiliación: ${request.fullName}`
  const safeMotivation = escapeHtml(request.motivation).replace(/\n/g, '<br>')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2933; line-height: 1.6; max-width: 640px;">
      <h1 style="font-size: 22px;">Nueva solicitud de afiliación</h1>
      <p>Se registró una nueva postulación en la plataforma.</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 6px; font-weight: bold;">Nombre</td><td style="padding: 6px;">${escapeHtml(request.fullName)}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Correo</td><td style="padding: 6px;">${escapeHtml(request.email)}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Teléfono</td><td style="padding: 6px;">${escapeHtml(request.phone)}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Ciudad</td><td style="padding: 6px;">${escapeHtml(request.city)}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">Estado</td><td style="padding: 6px;">${request.status}</td></tr>
        <tr><td style="padding: 6px; font-weight: bold;">ID</td><td style="padding: 6px;">${request.id}</td></tr>
      </table>
      <h2 style="font-size: 16px; margin-top: 24px;">Motivación</h2>
      <p>${safeMotivation}</p>
      <p style="margin-top: 24px;">Responde este correo para contactar a la persona solicitante.</p>
    </div>
  `

  const text = [
    'Nueva solicitud de afiliación',
    '',
    `Nombre: ${request.fullName}`,
    `Correo: ${request.email}`,
    `Teléfono: ${request.phone}`,
    `Ciudad: ${request.city}`,
    `Estado: ${request.status}`,
    `ID: ${request.id}`,
    '',
    'Motivación:',
    request.motivation,
  ].join('\n')

  return { subject, html, text }
}
