import { Router } from "express";
import { Controller } from './controller.js'
import authentification from "../../middleware/authentification.js";
import upload from "../../helper/upload.js";
const router = Router()



router.post('/register', Controller.register)
router.post('/update',authentification, Controller.update)
router.post('/list', Controller.list)
router.post('/delete', Controller.delete)

export default router