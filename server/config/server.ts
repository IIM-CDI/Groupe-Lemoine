export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://unmeaningly-unleveled-rashida.ngrok-free.dev",
  app: {
    keys: env.array("APP_KEYS"),
  },
});
