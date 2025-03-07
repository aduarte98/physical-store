import mongoose from "mongoose";
import logger from "../logger";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        logger.info("MongoDB conectado com sucesso!");
    } catch (error) {
        logger.error("Erro ao conectar ao MongoDB", { error });
        process.exit(1);
    }
};

export default connectDB;
