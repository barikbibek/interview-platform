import "@clerk/express";
import type { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string | null;
        sessionId: string | null;
        orgId?: string | null;
        getToken(): Promise<string | null>;
      };
      user?: IUser;
    }
  }
}

export {};
