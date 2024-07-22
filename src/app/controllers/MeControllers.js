
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose.js');
const Course = require('../models/Course.js');

class CoursesControllers {
    //[GET]/me/stored/courses
   async show(req, res,next) {
    await Course.find()
    .then(courses => {  
        // res.send(courses);
        res.render('me/stored-courses',{courses: mutipleMongooseToObject(courses)});
      
    })
    .catch(next);
   
    }
  
}

module.exports = new CoursesControllers();
