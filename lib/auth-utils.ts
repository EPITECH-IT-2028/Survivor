import jwt from "jsonwebtoken";

export default function generateToken(
  foundUsers: { id: number; name: string }[],
) {
  const token = jwt.sign(
    { userId: foundUsers[0].id, name: foundUsers[0]?.name },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
