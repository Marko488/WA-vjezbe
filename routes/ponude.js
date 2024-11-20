import express from "express";
const router = express.Router();
import { nekretnine } from "./nekretnine.js";

const ponude = [
  {
    id: 1,
    id_nekretnine: 1,
    ime_kupca: "Marko",
    prezime_kupca: "Petrović",
    ponudena_cijena: 450000,
    broj_telefona_kupca: "0911234567",
  },
  {
    id: 2,
    id_nekretnine: 2,
    ime_kupca: "Ana",
    prezime_kupca: "Ivić",
    ponudena_cijena: 190000,
    broj_telefona_kupca: "0927654321",
  },
  {
    id: 3,
    id_nekretnine: 3,
    ime_kupca: "Ivana",
    prezime_kupca: "Horvat",
    ponudena_cijena: 140000,
    broj_telefona_kupca: "0953219876",
  },
  {
    id: 4,
    id_nekretnine: 4,
    ime_kupca: "Jakov",
    prezime_kupca: "Novak",
    ponudena_cijena: 1150000,
    broj_telefona_kupca: "0986543210",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(ponude);
});

router.post("/izradi", (req, res) => {
  const ponuda = req.body;
  const {
    id_nekretnine,
    ime_kupca,
    prezime_kupca,
    ponudena_cijena,
    broj_telefona_kupca,
  } = req.body;
  const kljucevi = Object.keys(ponuda);
  if (
    !(
      kljucevi.includes("id_nekretnine") &&
      kljucevi.includes("ime_kupca") &&
      kljucevi.includes("prezime_kupca") &&
      kljucevi.includes("ponudena_cijena") &&
      kljucevi.includes("broj_telefona_kupca")
    )
  ) {
    res.status(400).json({ message: "Niste unijeli sve podatke o ponudi!" });
    return;
  }

  if (isNaN(ponuda.id_nekretnine)) {
    res.status(400).json({ message: "Id nekretnina mora biti broj!" });
    return;
  }

  if (ponuda.ponudena_cijena < 0) {
    res.status(400).json({ message: "Cijena ne smije  biti negativna!" });
    return;
  }

  const nek = nekretnine.find((n) => n.id == ponuda.id_nekretnine);

  if (!nek) {
    res.status(400).json({ message: "Taj id_nekretnine ne postoji!" });
    return;
  }

  const nova_ponuda = {
    id: ponude.length + 1,
    id_nekretnine,
    ime_kupca,
    prezime_kupca,
    ponudena_cijena,
    broj_telefona_kupca,
  };

  ponude.push(nova_ponuda);
  res.status(201).json({ message: "Uspjesno ste napravili ponudu." });
});

export default router;
