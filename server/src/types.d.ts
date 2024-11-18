import { Db } from "mongodb";

declare global {
    namespace Express {
        interface Request {
            db?: Db; // Add the `db` property to the `Request` interface
        }
    }
}
