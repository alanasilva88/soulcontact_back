import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { contactRouter } from "./routes/contacts.js";
import { userRouter } from "./routes/users.js";

config(); // Carrega as variáveis do .env

const app = express();
app.use(express.json()); // Certifique-se de que isto está antes das rotas

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => { 
        console.log("Mongo DB connected!");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });

app.use(contactRouter);
app.use(userRouter);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
