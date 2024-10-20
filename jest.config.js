module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/serviceWorker.js',
  ],

  coverageReporters: ['html', 'text'],

  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },

  verbose: true,
};
