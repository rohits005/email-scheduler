module.exports = {
    root: true,
    env: {
      es6: true,
      node: true,
    },
    extends: [
      "eslint:recommended"
    ],
    rules: {
      quotes: ["error", "double"],
    },
    
    // Newly added property
    parserOptions: {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "experimentalObjectRestSpread": true
      }
    },
  };