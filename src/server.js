import express from "express";
import 'dotenv/config';
import cors from "cors";
import { conectarDB } from "./config/db.js";
import productosRoutes from "./routers/productos.router.js";
import clientesRoutes from "./routers/clientes.router.js";
import ventasRoutes from "./routers/ventas.router.js";

const app = express();
const port = process.env.PORT;
app.use(express.json());


app.use(cors({
    origin:["https://ValentinaDelgadoRincon/Frontend_inventario","http://localhost:4000"],
    methods:["GET","POST","PATCH","DELETE"],
    allowedHeaders:["Content-Type"],
    credentials:false
}));

app.use("/videojuegos",productosRoutes);
app.use("/clientes",clientesRoutes);
app.use("/ventas",ventasRoutes);

app.use("/health",(req, res)=>{
    res.json({message:"OK"})
})

conectarDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`API escuchada en://localhost:${port}`)
    })
})