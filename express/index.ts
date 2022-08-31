import express from "express";
import { getUser, ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { config } from "dotenv";

config();

const app = express();
const PORT = 5000;

ThirdwebAuth(app, {
  privateKey: process.env.ADMIN_PRIVATE_KEY || "",
  domain: "localhost:3000",
});

app.get("/secret", (req, res) => {
  const user = getUser(req);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    })
  }

  return res.status(200).json({
    message: "This is a secret... don't tell anyone."
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});