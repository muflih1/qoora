import nodemailer from "nodemailer"
import { google } from "googleapis"
import { getEnv } from "../env.js"

const { OAuth2 } = google.auth

const auth = new OAuth2({
  clientId: getEnv('MAILING_CLIENT_ID'),
  clientSecret: getEnv('MAILING_CLIENT_SECRET'),
  redirectUri: getEnv('MAILING_REDIRECT_URI'),
})

export function sendVerificationEmail(email: string, verificationCode: string) {
  auth.setCredentials({
    refresh_token: getEnv('MAILING_REFRESH_TOKEN'),
  })
  const accessToken = auth.getAccessToken()
  const stmp = nodemailer.createTransport({
    // @ts-ignore typescript is dumb
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: getEnv('MAILING_EMAIL'),
      clientId: getEnv('MAILING_CLIENT_ID'),
      clientSecret: getEnv('MAILING_CLIENT_SECRET'),
      accessToken,
      refreshToken: getEnv('MAILING_REFRESH_TOKEN')
    }
  })
  const mailOptions = {
    from: getEnv('MAILING_EMAIL'),
    to: email,
    subject: 'Email Confirmation',
    html: `<div style="max-width:525px;margin:0 auto;text-align:center;padding:0 4px 16px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%" align="center"><tr><td><div style="margin:0 auto;max-width:525px"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%" align="center"><tr style="direction:ltr;font-size:0;padding-top:16px;padding-bottom:24px;text-align:center"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%" width="100%"><tr><td style="font-size:0;padding:0;word-break:break-word" align="center"><div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:31px;font-weight:700;line-height:32px;color:#b92b27">Qoora</div><tr><td style="font-size:0;padding:0;padding-top:24px;padding-right:25%;padding-bottom:24px;padding-left:25%;word-break:break-word"><p style="border-top-color:#b92b27;border-top-style:solid;border-top-width:.5px"><tr><td style="font-size:0;padding:0;word-break:break-word" align="left"><div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:15px;line-height:1.6;text-align:left;color:#333">Thank you for joining Qoora! Let's verify your email so we can finish creating your account. Your confirmation code is:</div><tr><td style="font-size:0;padding:0;word-break:break-word" align="center"><div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:19px;font-weight:700;line-height:1.6;color:#333">${verificationCode}</div></table></table></div></table></div>`
  }
  stmp.sendMail(mailOptions, (err, response) => {
    if (err) return err
    return response
  })
}