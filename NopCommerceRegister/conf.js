// Tests for the calculator.

// let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const Reporter = require('jasmine-2-testrail')
const reporter = new Reporter({});

exports.config = {
  directConnect: true,

  framework: 'jasmine2',

  specs: [
    'spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  onPrepare: function(){
    jasmine.getEnv().addReporter(reporter);
    // jasmine.getEnv().addReporter(new SpecReporter({
    //   displayFailuresSummary: true,
    //   displayFailuredSpec: true,
    //   displaySuiteNumber: true,
    //   displaySpecDuration: true
    // }));
  },

  afterLaunch:() => {
    reporter.createRun(5,1,browser.params.runName)
    return new Promise(() => true)
  }
};
