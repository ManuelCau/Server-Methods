import { Request, Response } from "express";
import Joi from 'joi';

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

const getAll = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
};
const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
};

//convalidazione joi

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = (req: Request, res: Response) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet); //joy

  if (validateNewPlanet.error) {
    return res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
  }

  planets = [...planets, newPlanet];

  res.status(201).json({ msg: "The planet was created." });
  console.log(planets);
};
const updateById = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
  console.log(planets);
  res.status(200).json({ msg: "Planet was updated!" });
};
const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));
  res.status(200).json({ msg: "Planet was deleted!" });
};

export { getAll, getOneById, create, updateById, deleteById };
