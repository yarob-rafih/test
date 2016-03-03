var CronJob = require('cron').CronJob;
var Converter = require("csvtojson").Converter;
var requestGetter = require('request');
var openDataUrl = "https://data.calgary.ca/_layouts/OpenData/DownloadDataset.ashx?Format=CSV&VariantId=4(CITYonlineDefault)";
var path = require('path');
var appDir = path.dirname(require.main.filename);
var logger = require(appDir + '/lib/Logger');
var connection = require(appDir + '/lib/DBConnection');

var job = new CronJob('00 30 11 * * 1-5', function() {
        /*
         * Runs every weekday (Monday through Friday)
         * at 16:30:00 PM. It does not run on Saturday
         * or Sunday.
         */
        getOpenData('PDC0-99999-99999-00201-P');
        getOpenData('PDC0-99999-99999-00204-P');
    }, function () {
        /* This function is executed when the job stops */
    },
    true /* Start the job right now */
);


var getOpenData = function (sourceId) {
    var converter = new Converter({constructResult:true});
    converter.on("end_parsed", function (jsonObj) {
        logger.info(jsonObj);
    });

    requestGetter.get(openDataUrl + "&DatasetId=" + sourceId + "(CITYonlineDefault)").pipe(converter);
}

module.exports = job;