//module Name mapper to import scss
const esModules = ['d3', 'd3-array', 'd3-delaunay', 'internmap', 'delaunator' , 'robust-predicates'].join('|');
module.exports = {
    collectCoverage: false,
    moduleFileExtensions: [
        "js",
        "json",
        "jsx",
        "node"
      ],
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
      },
      transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!${esModules})`
      ],
     // It 
    testEnvironment: 'jsdom',
    //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper:{}
};
  