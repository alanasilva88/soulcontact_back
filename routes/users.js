import { User } from "../models/user.js";
import { userValidation } from "../utils/validations.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/user", async (req, res) => {

    const { error, value } = userValidation.validate(req.body, { abortEarly: false });

    if (error) {
        
        res.status(400).json({ message: "Dados inválidos!", error: error.details });
        return;
    }

    const { nome, email, senha } = value;

    try {
        const novoUser = new User({ nome, email, senha });
        await novoUser.save();

        res.json({ message: "Usuário criado com sucesso!" });
    } catch (err) {

        res.status(500).json({ message: "Um erro ocorreu ao criar usuário!", error: err });
    }
});

userRouter.get("/user", async (req, res) => { 
    
    const lista = await User.find();
    
    res.json(lista);  
       
    
});


userRouter.get("/user/:id", async (req, res) => {
    const usuario = await User.findById(req.params.id);
    
    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({message: "Usuário não encontrado!"});
    }
});



userRouter.put("/user/:id", async (req, res) => {

    const { error, value } = userValidation.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(400).json({message: "Dados inválidos!", error: error.details});
        return;
    }


    const { nome, email, senha } = value; 

     try {
        const usuario = await User.findByIdAndUpdate(
            req.params.id, 
        {
            nome, 
            email, 
            senha
        }); 

        if(usuario) {
            res.json({message: "Usuário atualizado com sucesso!"});
        } else {
            res.status(404).json({message: "Usuário não encontrado!"});
        }

     } catch (err) {
        res.status(500).json({message: "Um erro ocorreu ao atualizar!", error: err});
     }
});



userRouter.delete("/user/:id", async (req, res) => {
    
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        
        if(usuario) {
            res.json({message: "Usuário removido com sucesso!"});
        } else {
            res.status(404).json({message: "Ocorreu um erro! Usuário não encontrado!"});
        }
    } catch (err) {
        res.status(500).json({message: "Ocorreu um erro ao remover usuário!", error: err});
    }
});