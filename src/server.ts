import express from "express";
import "express-async-errors";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

//creare un nuovo pianeta

app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  planets = [...planets, newPlanet];

  res.status(201).json({ msg: "The planet was created." });
  console.log(planets);
});

//aggiornare un pianeta con PUT

app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  console.log(planets);
  res.status(200).json({ msg: "Planet was updated!" });
});

//eliminare con DELETE
app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: "Planet was deleted!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
