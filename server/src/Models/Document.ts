import { model, Schema } from "mongoose";
import { v4 } from "uuid";

//the document interface
export interface IDocument {
  _id: string;
  changedAt: Date;
  createdAt: Date;
  name: string;
  roles: string[];
  owner: string;
}

//the schema of the document
const documentSchema = new Schema<IDocument>({
  _id: {
    type: String,
    required: true,
    default: () => v4(),
  },
  changedAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => new Date(),
  },
  name: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    roles: [],
  },
  owner: {
    type: String,
    required: true,
  },
});

//the exported model of the documentSchema
export default model<IDocument>("document", documentSchema);
