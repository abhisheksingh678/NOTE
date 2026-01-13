import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4002;

//Database connection code
try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connected to db");
} catch (error) {
  console.log("Error connecting to mongodb");
}

// app.use(cors({
//   origin: "*"
// }));

//Routing middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
); //Frontend se jo bhi request aayega usko accept kregaa
app.use("/api/v1/noteapp", noteRoutes);

app.listen(port, () => {
  console.log(`Server  listening on port ${port}`);
});
