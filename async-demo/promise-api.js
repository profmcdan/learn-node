const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));

const p1 = Promise.reject(new Error("reason for rejection ... "));
p1.catch(err => {
  console.log(err.message);
});

// Parallel Ascycs
const p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Async operation 1 ... ");
    resolve(1);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 2 ... ");
    resolve(2);
    // reject(new Error("Something failed"));
  }, 2000);
});

Promise.all([p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log("Error: ", err.message));

Promise.race([p2, p3])
  .then(res => console.log(res))
  .catch(err => console.log("Error: ", err.message));
