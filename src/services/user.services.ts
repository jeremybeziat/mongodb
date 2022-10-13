import { DocumentDefinition } from "mongoose";
import UserModel from "../models/user.model";
import { UserDocument } from "../interfaces/interfaces.user";
import { faker } from "@faker-js/faker";
import gravatar from "gravatar";


export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAT" | "updateAT" | "comparePassword">
  >
): Promise<any> {
  try {
    await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Create a new user with a random name and a random email
 * @param numberOfUsers number of users to create
 * @returns array of users
 */
export async function createUsersFaker(numberOfUsers: number): Promise<any> {
  try {
    const users: any[] = [];
    return Array.from({ length: numberOfUsers }).forEach(() => {
      users.push(createRandomUser());
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

// faker envoie des fausses données pour les users et l'avatar avec gravatar
export async function createRandomUser() {
  try {
    const user = await UserModel.create({
      avatar: gravatar.url(faker.internet.email(), { s: "200", d: "retro" }),
      surname: faker.word.adjective() + "_" + faker.animal.type(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function UserFaker() {
  try {
    return await UserModel.find({});
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function searchUser(surname: string) {
  try {
    let user: any;
    user = await UserModel.findOne({ surname: surname }).exec();
    console.log(user);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
