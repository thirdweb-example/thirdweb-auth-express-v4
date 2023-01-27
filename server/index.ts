import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { config } from "dotenv";
import express from "express";

config();

const app = express();
const PORT = 8000;

// NOTE: This users map is for demo purposes. Its used to show the power of
// what you can accomplish with the Auth callbacks. In a production app,
// you would want to store this data somewhere externally, like a database or
// on-chain.
const users: Record<string, any> = {};

const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
  // NOTE: All these callbacks are optional! You can delete this section and
  // the Auth flow will still work.
  callbacks: {
    onLogin: async (address) => {
      // Here we can run side-effects like creating and updating user data
      // whenever a user logs in.
      if (!users[address]) {
        users[address] = {
          created_at: Date.now(),
          last_login_at: Date.now(),
          num_log_outs: 0,
        };
      } else {
        users[address].last_login_at = Date.now();
      }

      // We can also provide any session data to store in the user's session.
      return { role: ["admin"] };
    },
    onUser: async (user) => {
      // Here we can run side-effects whenever a user is fetched from the client side
      if (users[user.address]) {
        users[user.address].user_last_accessed = Date.now();
      }

      // And we can provide any extra user data to be sent to the client
      // along with the default user object.
      return users[user.address];
    },
    onLogout: async (user) => {
      // Finally, we can run any side-effects whenever a user logs out.
      if (users[user.address]) {
        users[user.address].num_log_outs++;
      }
    },
  },
});

// We add the auth middleware to our app to let us access the user across our API
app.use(authMiddleware);

// Now we add the auth router to our app to set up the necessary auth routes
app.use("/auth", authRouter);

app.get("/secret", async (req, res) => {
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
