const express = require("express");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use("/productos", router.productosRoute);
app.use("/fabricantes", router.fabricantesRoute);
app.use("/componentes", router.componentesRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
});