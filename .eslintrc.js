export default {
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
  },

  settings: {
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts"],
    },
  },
};
