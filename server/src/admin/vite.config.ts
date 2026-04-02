import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      allowedHosts: ["crustless-katherin-unindurative.ngrok-free.dev"],
    },
  });
};
