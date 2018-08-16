console.log("Before");
const user = getUser(5)
  .then(res => {
    console.log(res);
    const repos = getRepositories(res.gitUsername)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.message);
      });
  })
  .catch(err => {
    console.log(err.message);
  });
console.log("After");

// function displayUser(user) {
//   console.log("User: ", user);
//   //Get Repo
//   getRepositories(user.gitUsername, displayCommits);
// }

// function displayCommits(repo) {
//   console.log(repo);
// }

// dealing with async codes, you can use three approaches
// 1. Callbacks
// 2. Promises
// 3. Async/await

function getUser(id) {
  return new Promise((resolve, reject) => {
    // kick off async work
    setTimeout(() => {
      console.log("Connected to database");
      resolve({ id: id, gitUsername: "profmcdan" });
    }, 1000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Connected to database");
      resolve({
        usernane: username,
        repo1: "repo1",
        repo2: "repo2",
        repo3: "repo3"
      });
    }, 3000);
  });
}
