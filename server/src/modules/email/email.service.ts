import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { env } from '../../config/env'
import { logger } from '../../common/utils/logger'
import type { AffiliateRequest } from '../affiliates/entities/affiliate-request.entity'
import {
  buildAffiliateAdminEmail,
  buildAffiliateUserEmail,
} from './templates/affiliate.template'

interface MailMessage {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

export class EmailService {
  private readonly transporter: Transporter | null

  constructor() {
    this.transporter = env.SMTP_HOST
      ? nodemailer.createTransport({
          host: env.SMTP_HOST,
          port: env.SMTP_PORT,
          secure: env.SMTP_SECURE,
          auth:
            env.SMTP_USER && env.SMTP_PASS
              ? { user: env.SMTP_USER, pass: env.SMTP_PASS }
              : undefined,
        })
      : null
  }

  async sendAffiliateEmails(request: AffiliateRequest): Promise<void> {
    const userContent = buildAffiliateUserEmail(request)
    const adminContent = buildAffiliateAdminEmail(request)

    const results = await Promise.allSettled([
      this.send({
        to: request.email,
        ...userContent,
        replyTo: env.CONTACT_EMAIL,
      }),
      this.send({
        to: env.CONTACT_EMAIL,
        ...adminContent,
        replyTo: request.email,
      }),
    ])

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const target = index === 0 ? 'solicitante' : 'equipo'
        logger.error(`No fue posible enviar el correo de afiliación al ${target}`, result.reason)
      }
    })
  }

  private async send(message: MailMessage): Promise<void> {
    if (env.RESEND_API_KEY) {
      await this.sendWithResend(message)
      return
    }

    if (this.transporter) {
      await this.transporter.sendMail({
        from: env.MAIL_FROM,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        replyTo: message.replyTo,
      })
      return
    }

    logger.warn(
      `[email:dev] Sin proveedor configurado. Correo simulado para ${message.to}: ${message.subject}`,
    )
  }

  private async sendWithResend(message: MailMessage): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [message.to],
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Resend respondió ${response.status}: ${body}`)
    }
  }
}
