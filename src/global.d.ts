import type { Connection } from "mongoose";

declare global {
  // Optional shared mongoose connection cache on the global object
  var mongooseConn:
    | {
        conn: Connection | null;
        promise: Promise<Connection> | null;
      }
    | undefined;
}

export {};
