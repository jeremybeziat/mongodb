import { object, string, TypeOf } from "zod";

// les requis pour être un utilisateur valide
export const createUserSchema = object({
  body: object({
    surname: string({
      required_error: "Pseudo requis",
    }),
    password: string({
      required_error: "Mot de passe requis 🔐",
    }).min(6, "Mot de passe trop court 🤏"),
    email: string({
      required_error: "L'e-mail est requis 📧",
    }),
  })
    .refine((data) => data.surname !== "hitler" && data.surname !== "Hitler", {
      message: "Pseudo interdit ❎",
      path: ["forbiddenName"],
    })
    .refine((data) => data.email.includes("@"), {
      message: "Le mail n'est pas correcte 📣",
    }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
