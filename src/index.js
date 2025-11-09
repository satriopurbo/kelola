import { Router } from "express";
const router = Router()

import user from "./module/user/route.js"; router.use('/user', user)
import komentar from "./module/komentar/route.js"; router.use('/komentar', komentar)
export default router