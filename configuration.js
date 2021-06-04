let path = require('path');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
require('protractor-screenshoter-plugin');
let currentDate = new Date();
var totalDateString = currentDate.getDate()+'-'+ (currentDate.getMonth() + 1)+'-'+(currentDate.getYear()+1900) +'-'+ currentDate.getHours()+'hrs-'+currentDate.getMinutes()+'min-'+currentDate.getUTCSeconds()+'sec';
let reportDirectory = './reportFolderScreenshotReporter'+totalDateString;

exports.config = {
	directConnect:true,
	chromeDriver: './chromedriver.exe',
    'chromeOptions':{
args:["--log-level=3"]
    },
	capabilities:{
		browserName: 'chrome'
	},
	framework:'jasmine',
	specs:[
		'./specs/*.js'
	],
	getPageTimeout:30000,
	allScriptsTimeout:300000,
	plugins: [{
        
        package: 'protractor-screenshoter-plugin',
        screenshotPath: reportDirectory,
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'failure+success',
        withLogs: 'true',
        writeReportFreq: 'asap',
        imageToAscii: 'failure',
        htmlReport:'true',
        verbose:'info',
        clearFoldersBeforeTest: true,
        // failTestOnErrorLog: {
        //     failTestOnErrorLogLevel: 900
        // }
    }],
	onPrepare(){

        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: false,     // display stacktrace for each failed assertion
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: true,  // display each successful spec
            displayFailedSpec: true,      // display each failed spec
            displayPendingSpec: true,    // display each pending spec
            displaySpecDuration: true,   // display each spec duration
            displaySuiteNumber: true,    // display each suite number (hierarchical)
            colors: {
                success: 'green',
                failure: 'red',
                pending: 'cyan'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '- '
            },
            customProcessors: []
        }));
		browser.params.dataConfigJSONPageStaticInfo = path.resolve(__dirname,'./common/pageStaticConfig.json');
		browser.params.commonHelperAbsPath = require('./helper/dropDown.js');
		//browser.params.automationPractice_PO = require('./pageObjects/automationPractice_PO.js');
}

};
