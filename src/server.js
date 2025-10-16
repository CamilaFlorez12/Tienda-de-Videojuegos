import express from "express";
import 'dotenv/config';
import cors from "cors";
import { swaggerDocument } from "./swagger.js";
import swaggerUI from 'swagger-ui-express';
import { conectarDB } from "./config/db.js";
import productosRoutes from "./routers/productos.router.js";
import clientesRoutes from "./routers/clientes.router.js";
import ventasRoutes from "./routers/ventas.router.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods:["GET","POST","PATCH","DELETE"],
    allowedHeaders:["Content-Type"],
    credentials:false
}));

app.use("/videojuegos",productosRoutes);
app.use("/clientes",clientesRoutes);
app.use("/ventas",ventasRoutes);

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/health",(req, res)=>{
    res.json({message:"OK"})
})

app.use((req, res)=>{
    res.status(404).json({error: "Ruta no encontrada"})
})

conectarDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`API escuchada en://localhost:${port}`)
    })
})