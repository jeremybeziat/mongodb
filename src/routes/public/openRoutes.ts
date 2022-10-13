import { Express } from "express";
import { Request, Response } from "express";
import {
  populateHandler,
  createUserHandler,
  listUserFaker,
  userSearch,
} from "../../controller/user.controller";
import validate from "../../validate/validateRessources";
import { createUserSchema } from "../../validate/user.validate";

export function openRoutes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.status(200).send({ message: "✅" });
  });
  
  //utilisateur créer avec postman
  app.post("/api/user", validate(createUserSchema), createUserHandler);

  //utilisateur créer à partir de fake données par rapport à la demande
  app.post("/faker/user/:numberOfUsers", (req: Request, res: Response) => {
    const numberOfUsers = Number(req.params.numberOfUsers);
    populateHandler(req, res, numberOfUsers);
  });//cp7

  //liste des utilisateurs
  app.get("/user/list", (req: Request, res: Response) => {
    listUserFaker(req, res);
  });

  //recherche un utilisateur
  app.get("/user/search/:surname", (req: Request, res: Response) => {
    const surname = req.params.surname;
    userSearch(req, res, surname);
  });
}
