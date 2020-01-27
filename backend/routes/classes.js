let router = require('express').Router();

// all course
router.get('/allCourses', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
// all course created by
router.get('/allCourses/:id', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

//add course
router.get('/add', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// delete course
router.get('/delete/:id', function (req, res) {
    let id = req.body.id;
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    })
});

// update course
router.get('/update/:id', function (req, res) {
    let id = req.body.id;
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});


// save course ranking
router.get('/saveRanking/:id', function (req, res) {
    let id = req.body.id;
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// update course ranking
router.get('/upadateRanking/:id', function (req, res) {
    let id = req.body.id;
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
// update course ranking
router
// Export API routes
module.exports = router;