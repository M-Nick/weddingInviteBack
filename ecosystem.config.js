module.exports = {
  apps: [
    {
      script: "src/index.js",
      name: "wedding-express",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
