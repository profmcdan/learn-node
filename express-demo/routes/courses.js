const express = require("express");
const Joi = require("joi");

const router = express.Router();

const courses = [
  { id: 1, name: "EEE" },
  { id: 2, name: "MEE" },
  { id: 3, name: "CVE" },
  { id: 4, name: "APH" },
  { id: 5, name: "CSC" }
];

const movies = [
  { id: 1, name: "Black Panther", type: "Drama" },
  { id: 2, name: "Given", type: "Action" },
  { id: 3, name: "Black", type: "Drama" },
  { id: 4, name: "Black Heart", type: "Romance" },
  { id: 5, name: "Black Family", type: "Drama" },
  { id: 6, name: "Black Magic", type: "Scifi" },
  { id: 7, name: "Black Love", type: "Love" },
  { id: 8, name: "Black Ops", type: "Crime" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    // Return 404
    res.status(404).send("The course with the given id not found");
  } else {
    // Return 200
    res.send(course);
  }
  res.send(course);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body.name);
  // console.log(result);
  if (error) {
    // return 400 bad request
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  // Look up the course
  // if not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given id cannot be found");
    return;
  }
  // validate
  // if invalid, return 400 bad request
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("The name field is required and it cant be less than 3 characters");
    return;
  }
  // if valid, update
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  // Look up the course
  // if not exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given id cannot be found");
    return;
  }
  // To delete, get the index first
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

function validateCourse(course) {
  // Define the schema
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  const result = Joi.validate(course.name, schema);
  console.log(result);
  return result;
}

module.exports = router;
