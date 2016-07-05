'use strict';

var _ = require('lodash');
var parse = require('safe-json-obj-parse');

var stdin = process.stdin;
var stdout = process.stdout;
var inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
	inputChunks.push(chunk);
});

stdin.on('end', function () {
	var inputJSON = inputChunks.join();

	var out = _.chain(parse(inputJSON))
		.thru(function(parsedData) {
			if (process.argv[2]) {
				return _.get(parsedData, process.argv[2]);
			}

			return parsedData;
		})
		.map(function (parsedData) {
			if (_.isObject(parsedData)) {
				return JSON.stringify(parsedData);
			}

			return '' + parsedData;
		})
		.join('\n')
		.value();

	stdout.write(out);
	stdout.write('\n');
});
