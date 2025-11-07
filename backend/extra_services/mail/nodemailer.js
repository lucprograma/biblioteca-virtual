// extra_services/nodemailer.js
import 'dotenv/config';
import nodemailer from 'nodemailer';

// Acepta ambas convenciones y quita espacios del pass por si vinieran
const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_USER;
const SMTP_PASS = (process.env.SMTP_PASS || process.env.GMAIL_PASS || '').replace(/\s+/g, '');

// Podés usar service:'gmail', pero prefiero host/port explícitos (ambas opciones sirven)

// Opción A: service (simple)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: { user: SMTP_USER, pass: SMTP_PASS },
// });

// Opción B: host/port (recomendada)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || 'true') === 'true', // true si 465, false si 587
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

export default transporter;