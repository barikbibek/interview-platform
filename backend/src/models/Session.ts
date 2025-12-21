import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type SessionDifficulty = "easy" | "medium" | "hard";
export type SessionStatus = "active" | "completed";

export interface ISession extends Document {
  problem: string;
  difficulty: SessionDifficulty;
  host: Types.ObjectId;
  participant?: Types.ObjectId | null;
  status: SessionStatus;
  callId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    callId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Session: Model<ISession> = mongoose.model<ISession>(
  "Session",
  sessionSchema
);

export default Session;
