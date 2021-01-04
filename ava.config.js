export default {
	files: ["src/**/*_test.ts"],
	failWithoutAssertions: true,
	verbose: true,
  extensions: ["ts"],
  require: [
    "./lib/tsst-register.js",
    "reflect-metadata"
  ]
};
