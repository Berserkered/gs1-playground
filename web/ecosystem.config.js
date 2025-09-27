module.exports = {
  apps: [
    {
      name: "gs1-web-dev",
      cwd: "C:/Users/Admin/gs1-playground/web",
      script: "node",
      args: "./node_modules/next/dist/bin/next dev -p 3000",
      env: { NODE_ENV: "development" }
    }
  ]
};
