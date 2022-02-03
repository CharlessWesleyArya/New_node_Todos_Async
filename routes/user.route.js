var users = [{
    "title": "welcome",
    "description": "this is modified",
    "user": 1
}, {
    "title": "welcome",
    "description": "this is modified third id ",
    "user": 3
}, {
    "title": "welcome",
    "description": "this is modified second id",
    "user": 2
}];
var router = require('express').Router();
router.get('/', function (req, res) {
    res.json(users)
});

module.exports=router;
