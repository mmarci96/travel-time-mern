import express ,{ Request, Response, NextFunction } from "express";
import { createUser } from "../services/userService";
import { createToken } from "../services/authService";

const router = express.Router();

router.post("/signup", async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await createUser(username, email, password);
        return res.status(201).json(newUser);
    } catch (err: any) {
        if (err.message === "Username is already taken" ||
            err.message === "Email is already registered") {
            return res.status(409).json({ error: err.message });
        }
        next(err);
    }
});

router.post('/login', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newToken = createToken(email,password)
        return res.status(200).json(newToken)
    } catch(err:any){
        if (err.message === "No user with email" ||
            err.message === "Wrong password!") {
            return res.status(409).json({ error: err.message });
        }
        next(err);
    }
})

export default router;
