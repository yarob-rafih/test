var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var logger = require(appDir + '/lib/Logger');
var connection = require(appDir + '/lib/DBConnection');


router.use(bodyParser.json());       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


router.get("/",function(req,res){
    res.sendFile(appDir + "/public/index.html");
});


router.use("/floorplan/:id",function(req,res,next){
    if(req.params.id == 0) {
        res.json({"message" : "You must pass a floorplan ID other than 0"});
    }
    else next();
});

router.get("/floorplan/:id",function(req,res){
    var floorplan = require(appDir + '/routes/Floorplan');
    floorplan.get(req.params.id);

    floorplan.eventEmitter.once('retrieved', function(rows) {
        res.json(rows);
    });
});


router.get("/amenities",function(req,res){
    var amenities = require(appDir + '/routes/Amenities');
    res.send(amenities.get());
});


router.get("/schools",function(req,res){
    var schools = require(appDir + '/routes/Schools');
    res.send(schools.get());
});

router.get('/add-floorplan', function(req, res){
    res.sendFile(appDir + "/public/floorplan.html");
});

router.post('/add-floorplan', function(req, res){
    res.send('Hello ' + req.body.layer + ' - ' + req.body.rotation);
});

router.use(function(err, req, res, next) {
    logger.error(err);
    res.status(500).sendFile(appDir + "/public/500.html");
});

router.use('/static', express.static(appDir + '/public'));

router.use("*",function(req,res){
    res.status(404).sendFile(appDir + "/public/404.html");
});

module.exports = router;
