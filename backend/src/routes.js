const express = require("express");

const routes = express.Router();

const AuthController = require("./controllers/AuthController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");

routes.post("/login", AuthController.login);

/**
 * Ongs
 */
routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

/**
 * Incidents
 */
routes.get("/incidents", IncidentController.index);
routes.get("/incidents/:id", IncidentController.show);
routes.post("/incidents", IncidentController.store);
routes.put("/incidents/:id", IncidentController.update);
routes.delete("/incidents/:id", IncidentController.destroy);

/**
 * Profile
 */
routes.get("/profile", ProfileController.index);

module.exports = routes;
