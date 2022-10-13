// ça fait le lien entre les routes et les services
import { Response, Request } from "express";
import { createUser, searchUser } from "../services/user.services";
import { createUsersFaker } from "../../src/services/user.services";
import { UserFaker } from "../../src/services/user.services";

/**
 * Create a new user with a random name and a random email
 * @param req 
 * @param res 
 */
export async function createUserHandler(
  req: Request<{}, {}, any["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    console.log("Il y a pas de problème 🙌");
    res.status(200).send({
      message: "l'utilisateur à bien été créé ✅",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
}


export async function populateHandler(
  req: Request,
  res: Response,
  numberOfUsers: number
) {
  try {
    const users = await createUsersFaker(numberOfUsers);
    res.status(200).send({
      message: numberOfUsers + " utilisateurs ont été créés ✅",
      users: users,
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function listUserFaker(req: Request, res: Response) {
  try {
    const user = await UserFaker();
    console.log("Il y a pas de problème 🙌");
    res.status(200).send({
      message: "la liste est prête ✅",
      user: user,
    });
  } catch (error: any) {
    error.message = "Il y a eu un problème 🤔";
  }
}

export async function userSearch(req: Request, res: Response, surname: string) {
  try {
    let user: any;
    user = await searchUser(surname);
    if (user) {
      res.status(200).send({
        message: "l'utilisateur "+ surname +" à bien été trouvé ✅",
        user: user,
      });
    } else {
      res.status(404).send({
        message: "l'utilisateur n'a pas été trouvé 🤔",
      });
    }
  } catch (error: any) {
    res.status(400).send(error);
  }
}