import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import storeRouter from "./routes/storeRoutes";
import logger from "./logger";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", storeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
});