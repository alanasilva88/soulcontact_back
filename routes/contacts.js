import { Contact } from "../models/contact.js";
import { contatoValidation } from "../utils/validations.js";
import { Router } from "express";


export const contactRouter = Router();

// Inserção de contato [POST]
contactRouter.post("/contatos", async (req, res) => {
    // error => objeto com detalhes dos erros de validação
    // value => são os dados do req.body
    const { error, value } = contatoValidation.validate(req.body, { abortEarly: false });

    if (error) {
        // http 400 - bad request - indica que a requisição tem dados inválidos
        res.status(400).json({message: "Dados inválidos!", error: error.details});
        return;
    }


    const { nome, sobrenome, email, telefone, observacoes, favorito } = value; // propriedades do contato criado no models TROCA req.bady pelo value devido aos dados que foram validados anteriormente

    try { // linha para criar contatos no body
        const novoContato = new Contact
        ({ 
            nome,
            sobrenome, 
            email, 
            telefone, 
            observacoes, 
            favorito 
        });
        await novoContato.save(); // linha para guardar o contato criado anteriormente
        res.json({message: "Contato criado com sucesso!"});
    } catch (err){
        res.status(500).json({message: "Um erro ocorreu ao criar contato!", error: err});

    }
});


// Listagem de todos os contatos [GET]
contactRouter.get("/contatos", async (req, res) => { 
    const lista = await Contact.find();
    res.json(lista);
});


// Listagem de um contato específico
contactRouter.get("/contatos/:id", async (req, res) => {
    const contato = await Contact.findById(req.params.id);
    // const contato = await Contact.findById(req.params.id).select('-__v'); para excluir essa propriedade
    
    if(contato) {
        res.json(contato);
    } else {
        res.status(404).json({message: "Contato não encontrado!"});
    }
});


// Atualização de contato [PUT]
contactRouter.put("/contatos/:id", async (req, res) => {

    const { error, value } = contatoValidation.validate(req.body, { abortEarly: false });

    if (error) {
        // http 400 - bad request - indica que a requisição tem dados inválidos
        res.status(400).json({message: "Dados inválidos!", error: error.details});
        return;
    }


    const { nome, sobrenome, email, telefone, observacoes, favorito } = value; 
    // o campo que você não quer atualizar basta retirar
     try {
        const contato = await Contact.findByIdAndUpdate(
            req.params.id, 
        {
            nome, 
            sobrenome, 
            email, 
            telefone, 
            observacoes, 
            favorito
        }); // aqui ele procura o contato indicado pelo id, se existir ele exibirá atualizado

        if(contato) {
            res.json({message: "Contato atualizado com sucesso!"});
        } else {
            res.status(404).json({message: "Contato não encontrado!"});
        }

     } catch (err) {
        res.status(500).json({message: "Um erro ocorreu ao atualizar!", error: err});
     }
});


// Exclusão de contato [DELETE]
contactRouter.delete("/contatos/:id", async (req, res) => {
    
    try {
        const contato = await Contact.findByIdAndDelete(req.params.id);
        
        if(contato) {
            res.json({message: "Contato removido com sucesso!"});
        } else {
            res.status(404).json({message: "Ocorreu um erro! Contato não encontrado!"});
        }
    } catch (err) {
        res.status(500).json({message: "Ocorreu um erro ao remover o contato!", error: err});
    }
});