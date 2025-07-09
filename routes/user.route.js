 import express from "express"
import { signUp } from "../controllers/user.controller.js"
 
// import { getUserSavedPosts, savePost } from "../controllers/user.controller.js"


 const router =express.Router()

 router.post("/register",signUp)
// router.patch("/save", savePost)

export default router 