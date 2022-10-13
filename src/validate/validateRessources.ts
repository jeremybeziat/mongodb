import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.query,
      });
      console.log("c'est valide 🙌");
      next();
    } catch (error: any) {
      return res.status(400).send(error);
    }
  };
export default validate;
