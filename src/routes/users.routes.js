import { Router } from "express";
import { createToken, hashPassword, isValidPassword } from "../utils/index.js";
import passport from "passport";
import User from "../models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("El usuario ya existe");
    }

    // Crear nuevo usuario con contraseña hasheada
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password)
    });

    await newUser.save();
    res.status(201).send("Usuario registrado exitosamente");
  } catch (error) {
    res.status(500).send("Error al registrar usuario: " + error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Credenciales inválidas");
    }

    if (!isValidPassword(password, user.password)) {
      return res.status(401).send("Credenciales inválidas");
    }

    const userForToken = { ...user.toObject() };
    delete userForToken.password;

    let token = createToken(userForToken);
    res
      .cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
      .send({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).send("Error en el login: " + error.message);
  }
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send(req.user);
});

export default router;