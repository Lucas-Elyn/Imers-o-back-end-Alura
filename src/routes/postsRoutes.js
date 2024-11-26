import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  
  // Cria uma instância do middleware Multer
  const upload = multer({ storage: storage });

const routes = (app) => {
    app.use(express.json()); //Fazendo o servidor interpretar o corpo no formato json
    app.use(cors(corsOptions))
    //Rota para buscar os posts  
    app.get("/posts", listarPosts); //Rota para buscar os posts
    app.post("/posts", postarNovoPost ); // Rota para criar um post
    app.post("/upload", upload.single("imagem"), uploadImagem); //chama a função controladora para processamento da imagem
    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
