import { Request, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const secret = "test";

const auth: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedData = jwt.verify(token, secret) as JwtPayload;
      req.userId = decodedData?.id;

      next();
    } catch (verifyError) {
      console.error("Token verification error:", verifyError);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Auth error:", error);
  }
};

export default auth;
