import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config.js";

// Desc: middleware para verificar el token JWT
// Desc: middleware for verifying JWT token
export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];

		if (!token) {
			return res.status(403).send({
				message: "No token provided!",
			});
		}

		const decoded = jwt.verify(token, jwtSecret);
		const authorized = await prisma.tab_users.findUnique({
			where: { user_id: decoded.id },
		});

		req.query.userType = authorized.user_type;
		req.query.userLabId = authorized.lab_id;

		authorized ? next() : res.status(401).send({ message: "No user found!" });
	} catch (err) {
		res.status(404).send({ message: "No user found!" });
	}
};

export const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).send({
				message: "No token provided!",
			});
		}

		const decoded = jwt.verify(token, jwtSecret);
		const authorized = await prisma.tab_users.findUnique({
			where: { user_id: decoded.id },
		});

		authorized?.user_type == "admin"
			? next()
			: res.status(401).send({ message: "No autorizado!" });
	} catch (err) {
		res.status(404).send({ message: "No user found!" });
	}
};

export const isNormal = async (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(403).send({
				message: "No token provided!",
			});
		}

		const decoded = jwt.verify(token, jwtSecret);
		const authorized = await prisma.tab_users.findUnique({
			where: { user_id: decoded.id },
		});

		authorized?.user_type == "normal"
			? next()
			: res.status(401).send({ message: "No autorizado!" });
	} catch (err) {
		res.status(404).send({ message: "No user found!" });
	}
};
