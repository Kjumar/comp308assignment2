const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');

module.exports = function(app) {
    app.route('/api/courses')
        .get(courses.list)
        .post(courses.create);
    //
    app.route('/api/courses/:courseId')
        .get(courses.read)
        .put(students.requiresLogin, courses.update)
        .delete(students.requiresLogin, courses.delete);
    //
    app.route('/api/addcourse')
        .get(students.requiresLogin, courses.listAddedCourses)
        .put(students.requiresLogin, courses.addCourse);
    //
    app.param('courseId', courses.courseById);
    //app.param('studentId', students.studentByID);
};