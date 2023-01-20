import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { config } from "dotenv";
import express from "express";

config();

const app = express();
const PORT = 8000;

const { thirdwebAuthRouter, thirdwebAuthMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});

app.use("/auth", thirdwebAuthRouter);

app.get("/secret", thirdwebAuthMiddleware, async (req, res) => {
  const user = await getUser(req);

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
