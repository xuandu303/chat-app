import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.userId = decoded.userId;
    next();
  });
};
