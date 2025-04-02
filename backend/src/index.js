import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import taskRoutes from './routes/task.route.js'

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/task", taskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`);
    connectDB();
});