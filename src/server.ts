import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import storeRouter from "./routes/storeRoutes";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", storeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});