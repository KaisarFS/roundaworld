// module.exports = {
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//   },
//   moduleFileExtensions: ['js', 'jsx'],
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
//   transformIgnorePatterns: [
//     '/node_modules/(?!(axios)/)',
//   ],
//   testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],

//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx}',
//     '!src/index.js',
//     '!src/serviceWorker.js',
//   ],

//   coverageReporters: ['html', 'text'],

//   moduleNameMapper: {
//     '\\.(css|less)$': 'identity-obj-proxy',
//     '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
//   },

//   verbose: true,
// };

module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // transformIgnorePatterns: [
  //   '/node_modules/(?!(axios|redux-persist)/)', // Ensure axios is transformed
  // ],
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
