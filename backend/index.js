const express = require("express");

const app = express();

app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    message: "Hello from Express"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
