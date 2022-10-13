// l'interface décrit tout les champs de l'utilisateur 
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  surname: string;
  password: string;
  creatdAt: Date;
  updateAt: Date;
  comparePassword(passwordAttempt: string): Promise<Boolean>;
}
