import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the user interface
export interface IUser {
  _id: string;
  username: string;
  email: string;
  hashedPassword: string;
  oneTimePassword: string;
  profilePicture: string;
  roles: string[];
}

//the schema of the user
const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true,
    default: () => v4()
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  oneTimePassword: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: [],
  },
});

//the exported model of the userSchema
export default model<IUser>("user", userSchema);
