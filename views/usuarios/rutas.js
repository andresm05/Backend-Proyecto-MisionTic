import Express from "express";
import {
  checkOrCreateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getSellers,
  updateUser,
} from "../../controllers/usuarios/controller.js";

const routesUsers = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los vehiculos");
  } else {
    res.json(result);
  }
};

routesUsers.route("/usuarios").get((req, res) => {
  getAllUsers(genericCallback(res));
});

routesUsers.route("/usuarios").post((req, res) => {
  createUser(req.body, genericCallback(res));
});

routesUsers.route("/usuarios/self").get((req, res) => {
  console.log('alguien hizo get en la ruta /self');
  checkOrCreateUser(req, genericCallback(res));
});

routesUsers.route("/usuarios/:role").get((req, res) => {
  getSellers(req.params.role, genericCallback(res));
});

routesUsers.route("/usuarios/:id").patch((req, res) => {
  updateUser(req.params.id, req.body, genericCallback(res));
});

routesUsers.route("/usuarios/:id").delete((req, res) => {
  deleteUser(req.params.id, genericCallback(res));
});

export default routesUsers;
