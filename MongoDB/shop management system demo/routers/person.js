const express = require("express");
const { Person, validatePerson } = require("../models/person");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validatePerson(req.body);

  if (error) return res.status(400).send(error.details.map(e => e.message));

  const person = new Person(req.body);
  person.save();
  return res.status(200).send(req.body);
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find().populate(
        "person",
        "name address -_id"
      );

    return res.status(200).send(persons);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
