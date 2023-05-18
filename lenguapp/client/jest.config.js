//module Name mapper to import scss

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper:{
        '^.+\\.(css|scss)$': '<rootDir>/config/cssStub.js'
    }
};
  