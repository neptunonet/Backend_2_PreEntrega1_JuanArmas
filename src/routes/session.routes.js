import { Router } from "express";
import userModel from "../models/user.model.js";
import { isValidPassword, createToken } from "../utils/index.js";
import handlePolicies from "../middlewares/handle-policies.js";
import passport from "passport";

const router = Router();

router.post("/login", handlePolicies(["PUBLIC"]), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ status: "error", error: "Usuario no encontrado" });
    }

    if (!isValidPassword(password, user.password)) {
      return res.status(401).json({ status: "error", error: "Contraseña incorrecta" });
    }

    const userToken = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    };

    const token = createToken(userToken);

    res.cookie('authToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({ status: "success", message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Error interno del servidor" });
  }
});

router.get("/current", passport.authenticate('jwt', { session: false }), handlePolicies(["USER", "ADMIN"]), (req, res) => {
  if (req.user) {
    res.status(200).json({
      status: "success",
      user: {
        id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        role: req.user.role,
        cart: req.user.cart
      }
    });
  } else {
    res.status(401).json({ status: "error", error: "No hay usuario autenticado" });
  }
});

export default router;