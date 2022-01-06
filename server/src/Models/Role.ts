import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the role interface
export interface IRole {
  _id: string;
  name: string;
  calendar: string;
  users: string[];
}

//the schema of the role
const roleSchema = new Schema<IRole>({
  _id: {
    type: String,
    required: true,
    default: () => v4(),
  },
  name: {
    type: String,
    required: true,
  },
  calendar: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
    default: [],
  },
});

//the exported model of the roleSchema
export default model<IRole>("role", roleSchema);
