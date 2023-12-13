/** @type {import('jest').Config} */
const config = {
    verbose: true,
    testMatch: [
        '<rootDir>/tests/**',
      ],
    moduleFileExtensions: [
        "js",
        "json",
        "jsx",
        "node"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
  };
  
module.exports = config;