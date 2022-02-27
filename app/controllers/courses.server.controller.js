const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = mongoose.model('Student');

const getErrorMessage = function(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    const course = new Course();
    course.courseName = req.body.courseName;
    course.courseCode = req.body.courseCode;
    course.section = req.body.section;
    course.semester = req.body.semester;
    console.log(req.body);

    course.save((err) => {
        if (err) {
            console.log('error', getErrorMessage(err));
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

exports.list = function(req, res) {
    Course.find().sort({courseCode: 'asc', semester: 'asc', section: 'asc'}).exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
};

exports.courseById = function(req, res, next, id) {
    Course.findById(id).exec((err, course) => {
        if (err) {
            return next(err);
        }
        if (!course) {
            return next (new Error('Failed to find course id: ' + id));
        }
        req.course = course;
        next();
    });
};

exports.read = function(req, res) {
    res.status(200).json(req.course);
};

exports.listSections = function(req, res) {
    Course.findAll({courseCode: req.courseCode}).exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    })
}

exports.update = function(req, res) {
    const course = req.course;
    course.courseCode = req.courseCode;
    course.courseName = req.courseName;
    course.section = req.section;
    course.semester = req.semester;

    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};