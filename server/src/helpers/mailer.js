import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAILER_USER,
		pass: process.env.MAILER_PASSWORD,
	},
});

transporter.verify().then(() => {
	console.log('Ready for send emails');
});

/* export function sendMail(user_email) {
	transporter.sendMail({
		from: `"OLvido su contraseña?" <${process.env.MAILER_USER}>`,
		to: user_email,
		subject: 'Recuperar contraseña',
		html: `<h1>Recuperar contraseña</h1>
    <br/>
    <b>Por favor haga click en el siguiente enlace para validar su cuenta</b>
    <a href="${}"/>`,
	});
} */
