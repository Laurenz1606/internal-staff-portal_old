import { model, Schema } from "mongoose";

//the user interface
export interface IDocument {
  _id: string;
}

//the schema of the user
const documentSchema = new Schema<IDocument>({
  _id: {
    type: String,
    required: true,
  },
});

//the exported model of the userSchema
export default model<IDocument>("document", documentSchema);
