module.exports = {
  default: {
    require: [
      'src/support/hooks.ts',
      'tests/e2e/steps/**/*.ts',
      'tests/api/steps/**/*.ts'
    ],
    paths: [
      'tests/e2e/features/**/*.feature',
      'tests/api/features/**/*.feature'
    ],
    format: [
      'progress',
      'json:reports/report.json',
      'html:reports/cucumber-report.html'
    ],
    requireModule: ['ts-node/register'],
    timeout: '120000'
  }
};
