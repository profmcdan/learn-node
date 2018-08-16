const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost:27017/playground",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Database Connected ... ");
  })
  .catch(err => console.log("Error: Cant connect to MongoDB Database ... "));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    }
  }
});

// Classes and Objects
// Human and John ... John is an instance of Human
// Class - Course, object --
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course ",
    author: "Chris",
    tags: ["js", "angular", "frontend"],
    isPublished: false
  });
  // save the object
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function getCourse(name) {
  const courses = await Course.find({ author: name, isPublished: false })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// createCourse();
// getCourse("Chris");

// Comparison operators
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal)
// lt (less than)
// lte (less than or equal)
// in
// nin (not in)

// Logical Query
// or
// and

async function getCoursess(name) {
  const courses = await Course.find({
    author: name,
    isPublished: false,
    price: { $gt: 10, $lte: 30 }
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
