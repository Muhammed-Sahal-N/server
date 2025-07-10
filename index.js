import dotenv from 'dotenv';
dotenv.config();


import express from "express"
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js"
import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors"
const app = express();
// app.use(cors(process.env.CLIENT_URL))
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(clerkMiddleware());
app.use("/webhooks",webhookRouter)
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.get("/auth-state", (req, res) => {
//       const authState = req.auth;
//       res.json(authState);
//     });
// app.get("/protect", (req, res) => {
//   const {userId} = req.auth;
//   if(!userId){
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// });
// app.get("/protect2", requireAuth(), (req, res) => {
//   res.status(200).json("content")
// });



app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)

app.get("/", (req, res) => {
  res.send(" Backend API is running!");
});




app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        message:error.message || "went wrong",
        status:error.status,
        stack:error.stack,
    })

})

// app.listen(3000, () => {
//     connectDB()
    
//     console.log("Server is running!");
//   });
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Crash to show error on Render
  }
};

startServer();


// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });