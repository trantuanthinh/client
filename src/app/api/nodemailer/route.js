// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "tramy2454@gmail.com",
		pass: "bqibiwlpcbzxxnzg",
	},
});

export async function POST(req, res) {
	const body = await req.json();
	async function sendEmail({ to, subject, html }) {
		try {
			const info = await transporter.sendMail({
				from: '"Sweeties Cake" <tramy2454@gmail.com>',
				to: body.to,
				subject: body.subject,
				html: body.html,
			});

			console.log("Message sent: %s", info.messageId);
			return info.messageId;
		} catch (error) {
			console.error("Error sending email:", error);
			throw error;
		}
	}
	await sendEmail({
		to: body.to,
		subject: body.subject,
		html: body.html,
	});
	return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
