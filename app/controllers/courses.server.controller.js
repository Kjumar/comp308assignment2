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
    });
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

exports.addCourse = function(req, res) {
    const course = req.body.course;
    const student = req.body.student;

    Student.findOne({studentNumber: student.studentNumber}).exec((err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        // ==========================================================================================
        // USING SAVE WILL REHASH THE PASSWORD... USE UPDATE INSTEAD TO ONLY CHANGE THE COURSES FIELD
        // ==========================================================================================
        Student.findOneAndUpdate({_id: student._id},
            {courses: [...student.courses, course._id]}, (err, student) => {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    res.status(200).json(student);
                }
        });
    });
};

exports.listAddedCourses = function(req, res) {
    const studentNumber = req.body.studentNumber;

    Student.findOne({studentNumber: studentNumber}).populate('courses').exec((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses.courses);
        }
    });
}

exports.removeCourse = function(req, res) {
    const courseId = req.body.courseId;
    const studentNumber = req.body.studentNumber;

    Student.findOne({studentNumber: studentNumber}).populate('courses').exec((err, student) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        console.log(student.courses);
        const newCourses = student.courses.filter( (course) => course._id != courseId);
        console.log(newCourses);

        Student.findOneAndUpdate({studentNumber: studentNumber},
            {courses: newCourses}, (err, student) => {
                if (err) {
                    return res.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    res.status(200).json(student);
                }
        });
    });
}