module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'json'],
  coverageReporters: ['lcov'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      '<rootDir>/node_modules/jest-transform-stub',
    '^.+\\.(jsx|js)?$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      '<rootDir>/node_modules/jest-transform-stub'
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'test-reports' }]],
  transformIgnorePatterns: ['<rootDir>/node_modules/*'],
  setupFilesAfterEnv: ['./jest.setup.js'],
}
