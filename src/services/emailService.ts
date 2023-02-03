import nodemailer from 'nodemailer';
import * as process from 'process';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'commentservermailer@gmail.com', // generated ethereal user
    pass: 'ndrbkdnpyxszsicf', // generated ethereal password
  },
});

// send mail with defined transport object
export const send = async ({ email, subject, html }: any) => {
  await transporter.sendMail({
    from: 'Auth API', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: '', // plain text body
    html, // html body
  });
};

export const sendActivationLink = async (email: string, token: string) => {
  const link = `${process.env.CLIENT_URL}/activate/${token}`;

  send({
    email,
    subject: 'Account activation',
    html: `
    <h1>Account activation link</h1>
    <a href="${link}">${link}</a>
    `,
  });
};

export const emailService = { send, sendActivationLink };
