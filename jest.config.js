module.exports = {
    // Test environment
    testEnvironment: "node",
  
    // Directories to look for test files
    roots: ["<rootDir>/tests"],
  
    // File patterns for tests
    testMatch: ["**/*.test.js"],
  
    // Generate JUnit XML report for Jenkins
    reporters: [
      "default", // Default Jest reporter
      [
        "jest-junit", // JUnit reporter
        {
          outputDirectory: "test-results", // Folder to save the report
          outputName: "junit.xml",        // Name of the report file
        },
      ],
    ],
  
    // Collect code coverage
    collectCoverage: true,
    coverageReporters: ["lcov", "text"], // Formats for coverage reports
    coverageDirectory: "coverage",      // Folder to save coverage reports
  };