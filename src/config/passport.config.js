import jwt from "passport-jwt";
import passport from "passport";
import User from "../models/user.model.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "clave-secreta", // Asegúrate de que esta clave coincida con la que usas para firmar los tokens
      },
      async (jwt_payload, done) => {
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authToken"]; // Asegúrate de que este nombre coincida con el nombre de la cookie que usas para almacenar el token
  }
  return token;
};

export default initializePassport;