import { model, Schema } from 'mongoose';

const logSchema: Schema = new Schema(
  {
    action: {
      type: String
    },
    emitter: {
      type: String
    },
    target: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Log = model("Log", logSchema);
