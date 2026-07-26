import type { Connection } from "mongoose";
declare global {
  let mongooseConn:
    {
      conn: Connection | null;
      promise: Promise<Connection> | null;
    }
    | undefined;
}
export { }
