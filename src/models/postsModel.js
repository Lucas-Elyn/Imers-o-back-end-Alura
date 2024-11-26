import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexao fornecida 
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO) 

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts(){
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts"); // seleciona os posts dentro do bando de dados
    return colecao.find().toArray(); //Fazer uma conversão com o Array para retornar o comando
}

export async function criarPost(novoPost){ //criação de posts
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost); 
}

export async function atualizarPost(id, novoPost){ //criação de posts
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost}); 
}