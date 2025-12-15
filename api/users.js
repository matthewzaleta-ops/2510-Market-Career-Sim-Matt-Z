import express from "express";
import bcrypt from "bcrypt";
import requireBody from "#middleware/requireBody";
import { createUser, getUserByUsernameAndPassword } from "#db/users";
import { createToken } from "#utils/jwt";

const router = express.Router();
export default router;

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await createUser(username, hashedPassword);

    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  }
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;

    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.id });
    res.send(token);
  }
);
