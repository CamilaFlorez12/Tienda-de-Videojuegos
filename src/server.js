import express from "express";
import 'dotenv/config';
import cors from "cors";
import { conectarDB } from "./config/db.js";
import productosRoutes from "./routers/productos.router.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET","POST","PATCH","DELETE"],
    allowedHeaders:["Content-type"],
    credentials:false
}));

app.use("/videojuegos",productosRoutes);

app.use("/health",(req, res)=>{
    res.json({message:"OK"})
})

conectarDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`API escuachada en://localhost:${port}`)
    })
})