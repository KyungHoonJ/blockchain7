import { Router } from "express";

import userApi from "./user.js";

const router = Router();

router.use("/user", userApi);

export default router;
