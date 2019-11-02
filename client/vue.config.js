module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        ws: true,
      },
      "/auth": {
        target: "http://localhost:3001",
      },
    },
  },
};
