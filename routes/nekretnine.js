import express from "express";
const router = express.Router();

let nekretnine = [
  {
    id: 1,
    naziv: "Stan u centru",
    opis: "Prostran stan s balkonom u centru grada.",
    cijena: 120000,
    lokacija: "Zagreb",
    broj_soba: 3,
    povrsina: 85,
  },
  {
    id: 2,
    naziv: "Kuća s bazenom",
    opis: "Luksuzna kuća s privatnim bazenom.",
    cijena: 350000,
    lokacija: "Split",
    broj_soba: 5,
    povrsina: 200,
  },
  {
    id: 3,
    naziv: "Apartman uz more",
    opis: "Moderan apartman s pogledom na more.",
    cijena: 180000,
    lokacija: "Rijeka",
    broj_soba: 2,
    povrsina: 60,
  },
];

router.get("/", (req, res) => {
  res.status(200).json(nekretnine);
});

router.get("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  if (isNaN(id_nekretnina)) {
    res.status(400).json({ message: "Id nekretnine mora biti broj!" });
    return;
  }
  const nekretnina = nekretnine.find((n) => n.id == id_nekretnina);
  if (!nekretnina) {
    res
      .status(404)
      .json({ message: `Nekretnina sa ${id_nekretnina} ne postoji` });
    return;
  } else {
    res.status(200).json(nekretnina);
  }
});

router.post("/izradi", (req, res) => {
  let nekretnina = req.body;
  let { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  let kljucevi = Object.keys(nekretnina);
  if (
    !(
      kljucevi.includes("naziv") &&
      kljucevi.includes("opis") &&
      kljucevi.includes("cijena") &&
      kljucevi.includes("lokacija") &&
      kljucevi.includes("broj_soba") &&
      kljucevi.includes("povrsina")
    )
  ) {
    res
      .status(400)
      .json({ message: "Niste poslali sve potrebne podatke o nekretninama!" });
    return;
  }

  if (nekretnina.cijena < 0) {
    res.status(400).json({ message: "Cijena nekretnine mora biti pozitivna!" });
    return;
  }

  if (nekretnina.broj_soba < 0) {
    res
      .status(400)
      .json({ message: "Nekretnina ne smije imat negativan broj soba!" });
    return;
  }

  const nova_nekretnina = {
    id: nekretnine.length + 1,
    naziv,
    opis,
    cijena,
    lokacija,
    broj_soba,
    povrsina,
  };

  nekretnine.push(nova_nekretnina);
  res.status(201).json({ message: "Dodali ste novu nekretninu" });
});

router.put("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const nekretnina = req.body;
  const index = nekretnine.findIndex((n) => n.id == id_nekretnina);
  if (index !== -1) {
    nekretnine[index] = nekretnina;
    res.status(200).json({ message: "Nekretnina uspjesno azurirana" });
  } else {
    res
      .status(404)
      .json({ message: "Nekretnina ne postoji sa trazenim id-em!" });
  }
});

router.patch("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const novo = req.body;
  const index = nekretnine.findIndex((n) => n.id == id_nekretnina);
  if (index !== -1) {
    nekretnine[index] = { ...nekretnine[index], ...novo };
    res.status(200).json({ message: "Uspjesno izmjenjeni podaci" });
  } else {
    res.status(404).json({ message: "Nekretnina sa tim ID-em ne postoji!" });
  }
});

router.delete("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const index = nekretnine.findIndex((n) => n.id == id_nekretnina);
  if (index !== -1) {
    nekretnine.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Nekretnina sa tim id-em ne postoji!" });
  }
});

export { router, nekretnine };
