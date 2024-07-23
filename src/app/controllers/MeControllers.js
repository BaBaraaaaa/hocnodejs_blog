
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
     //[GET]/me/stored/trash/courses
    async trash(req, res, next) {
        Course.findWithDeleted({deleted: true})
        .then(courses => { 
            //courses need filter to show only deleted courses
            //courses.filter(course => course.deleted)
            //https://github.com/dsanel/mongoose-delete/issues/98 it work for me
            res.render('me/trash-courses',{courses:
                 mutipleMongooseToObject(courses)});
        });
     }
   

  
}

module.exports = new CoursesControllers();
