import express from "express";
import { router as nekretnineRouter } from "./routes/nekretnine.js";
import ponudeRouter from "./routes/ponude.js";
const app = express();
app.use(express.json());
app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Greska prilikom pokretanja posluzitelja ", error.message);
  } else {
    console.log(
      "Server ceka na dolazne zahtjeve na portu http://localhost:3000"
    );
  }
});
