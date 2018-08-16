// A promise is an object that holds the eventaul result of an anysc operation.
// It is initailly pending, which can go from pending to fulfilled or pending to rejected

const p = new Promise((resolve, reject) => {
  // Kick off some async work
  // ... call resolve() or reject()
  setTimeout(() => {
    // resolve({ user: "User" });
    reject(new Error("message"));
  }, 2000);
});

p.then(result => {
  console.log("Result ", result);
}).catch(err => console.log("Error: ", err.message));
