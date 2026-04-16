import ai from "./dist/index.js";

const data = {
  user: {
    id: "123",
    name: "Ali",
    createdAt: "2024-01-01"
  }
};

console.log("Before:", JSON.stringify(data));

const result = ai(data)
  .prune(["id", "createdAt"])
  .compact()
  .value();

console.log("After:", result);
