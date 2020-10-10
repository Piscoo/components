const concurrently = require("concurrently");

concurrently(
  [
    "json-server --watch ./build/server/db.json --routes ./build/server/routes.json -q",
    "npm run storybook"
  ],
  { raw: true }
);
