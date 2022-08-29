## Getting Started

This example demonstrates how to use thirdweb Auth with an express backend and react frontend.

To run this project, you need will first need to install the dependencies for the client and express backend with the following commands:

```bash
cd client && npm install
cd express && npm install
# or
cd client && yarn install
cd express && yarn install
```

Next, you need to create a `/express/.env` file (within the `/express`) directory and add the `ADMIN_PRIVATE_KEY` variable to it with the private key of the wallet you want to use as the admin wallet to generate and verify payloads. Your file should use something like the following:

```/express/.env
ADMIN_PRIVATE_KEY=...
```

Then, you can run the project by running the following two commands in separate terminals:

```bash
npm run dev
npm run server
# or
yarn dev
yarn server
```

## Learn More

To learn more about thirdweb, take a look at the following resources:

- [thirdweb Auth Documentation](https://docs.thirdweb.com/auth) - learn about thirdweb Auth.
- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
  
You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).