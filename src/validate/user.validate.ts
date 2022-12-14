import { object, string, TypeOf } from "zod";

// les requis pour Γͺtre un utilisateur valide
export const createUserSchema = object({
  body: object({
    surname: string({
      required_error: "Pseudo requis",
    }),
    password: string({
      required_error: "Mot de passe requis π",
    }).min(6, "Mot de passe trop court π€"),
    email: string({
      required_error: "L'e-mail est requis π§",
    }),
  })
    .refine((data) => data.surname !== "hitler" && data.surname !== "Hitler", {
      message: "Pseudo interdit β",
      path: ["forbiddenName"],
    })
    .refine((data) => data.email.includes("@"), {
      message: "Le mail n'est pas correcte π£",
    }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
