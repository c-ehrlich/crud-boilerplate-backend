/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // stuff we added begins here
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true, // even if there are pending handlers
  clearMocks: true,
};