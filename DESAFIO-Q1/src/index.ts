import express from "express";
import benchmarkRoutes from "./routes/benchmarkRoutes";
const app = express();
const port = 3000;

app.use(express.json());

// Usa o roteador que criamos
app.use("/api", benchmarkRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
