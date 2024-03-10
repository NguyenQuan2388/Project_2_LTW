'use strict';
/*
 * run-test-using-node.js - Run the cs142 project #2 test code using Node.js rather than in the
 * browser.  The browser has a better debugging environment so this is more a demonstration that the
 * JavaScript works in both places. To run the test:
 *   node run-tests-using-node.js
 */

/* jshint node: true */

// We need the Node.js file system access module (fs) and the Node.js JavaScript virtual machine
// access.
var fs = require('fs');
var vm = require('vm');

// Build an emulation of the browser's script tag processing where everything is in a global
// space and goes under the name window.

global.window = global;  // The browser script assume global is available under the name window

/**
 * processScriptFromFile - Emulate the effects of a script tag in the browser by running the
 * contents of the file as a script with its scope being the global object.
 * @param {string} filename - File name of script to load and run.
 */
function processScriptFromFile(filename) {
    // Warning: Ugly, un-Node.js-like code warning:
    // In order to emulate the browser JavaScript environment we need to undo the default isolation
    // in node modules. By directly calling into the Node.js vm.Script() API we can have
    // all the JavaScripts files run in the same context like on the browser.
    try {
        // eslint-disable-next-line max-len
        new vm.Script(fs.readFileSync(filename).toString(), {filename: filename}).runInThisContext();
    } catch (err) {
        // fs.readFileSync communicates errors using exceptions. We log but otherwise ignore errors
        console.error('Error processing', filename, ':', err.message);
    }
}

console.log('*********** Running Project #2 tests ***********');

console.log('*** Loading project files ....');
processScriptFromFile('./make-multi-filter.js');
processScriptFromFile('./template-processor.js');

console.log('*** Running tests ....');
processScriptFromFile('./test-project2.js');

var p1Message = global.cs142Project2Results.p1Message;
var p2Message = global.cs142Project2Results.p2Message;
var p3Message = global.cs142Project2Results.p3Message;


var testWorked =  (p1Message === 'SUCCESS') &&  (p2Message === 'SUCCESS') &&
    (p3Message === 'SUCCESS');

// eslint-disable-next-line max-len
process.exit(Number(!testWorked));  // For npm: Return process status code 0 on success, 1 on failure.