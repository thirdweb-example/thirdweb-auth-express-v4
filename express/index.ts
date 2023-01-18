import express from "express";
import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { config } from "dotenv";
import { PrivateKeyWallet } from "@thirdweb-dev/wallets";

config();

const app = express();
const PORT = 8000;

const { thirdwebAuth, getUser } = ThirdwebAuth({
  domain: "example.com",
  wallet: new PrivateKeyWallet(process.env.ADMIN_PRIVATE_KEY || ""),
});

app.use(thirdwebAuth);

app.get("/secret", (req, res) => {
  const user = getUser(req);

  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

  return res.status(200).json({
    message: "This is a secret... don't tell anyone.",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
