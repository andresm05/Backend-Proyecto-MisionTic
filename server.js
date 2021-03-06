import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import routesProducts from "./views/productos/rutas.js";
import routesUsers from "./views/usuarios/rutas.js";
import routesSales from './views/ventas/rutas.js';
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import autorizacionEstadoUsuario from './middleware/estadoUsuario.js';


dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://deveapps.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "api-autenticacion-deveapps",
  issuer: "https://deveapps.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);
app.use(autorizacionEstadoUsuario);
app.use(routesUsers);
app.use(routesProducts);
app.use(routesSales);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};
connectDB(main);
