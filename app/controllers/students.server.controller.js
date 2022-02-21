const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;

// error handling controller method
const getErrorMessage = function(err) {
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Student number already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

// Register new student
exports.create = function (req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    var student = new Student(req.body); //get data from React form
    console.log("body: " + req.body.studentNumber);

    // Use the 'User' instance's 'save' method to save a new user document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
            
        }
    });
};
//
// Returns all users
exports.list = function (req, res, next) {
    // Use the 'User' instance's 'find' method to retrieve a new user document
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};
//
//'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.student);
};
//
// 'userByID' controller method to find a user by its id
exports.studentByID = function (req, res, next, id) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	Student.findOne({
        _id: id
	}, (err, student) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.student = student;
            console.log(student);
			// Call the next middleware
			next();
		}
	});
};
//update a user by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Student.findByIdAndUpdate(req.student.id, req.body, function (err, student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(student);
    });
};
// delete a user by id
exports.delete = function(req, res, next) {
    Student.findByIdAndRemove(req.student, req.body, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};
//