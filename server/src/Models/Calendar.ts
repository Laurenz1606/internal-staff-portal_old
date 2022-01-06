import { model, Schema } from "mongoose";
import { v4 } from "uuid";

interface IDate {
  _id: string;
  title: string;
  start: Date;
  end: Date;
}

//the calendar interface
export interface ICalendar {
  _id: string;
  color: string;
  dates: IDate[];
  target: {
    target: string;
    _id: string;
  };
}

//the schema of the calendar
const calendarSchema = new Schema<ICalendar>({
  _id: {
    type: String,
    required: true,
    default: () => v4(),
  },
  color: {
    type: String,
    required: true,
  },
  dates: {
    type: [Object],
    required: true,
    default: [],
  },
  target: {
    target: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
      default: () => v4(),
    },
  },
});

//the exported model of the calendarSchema
export default model<ICalendar>("calendar", calendarSchema);
