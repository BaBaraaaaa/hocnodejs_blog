
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose.js');
const Course = require('../models/Course.js');

class CoursesControllers {
    //[GET]/me/stored/courses
   async show(req, res,next) {
    Promise.all([Course.countDocumentsWithDeleted({ deleted: true }),Course.find()])
    .then(([count, courses]) => {
        console.log('Total courses deleted count: ', count);
        res.render('me/stored-courses',{coursesCount: count, courses: mutipleMongooseToObject(courses)});
    })
    //you can use Promise.all([]) to wait for multiple promises to resolve before proceeding.
    // await Course.countDocumentsWithDeleted({ deleted: true })
    // .then(count => {
    //     console.log('Deleted courses count: ', count);
    // })
    // .catch(error => {console.error('Error counting deleted courses: ', error);});

    // await Course.find()
    // .then(courses => {  
    //     // res.send(courses);
    //     res.render('me/stored-courses',{courses: mutipleMongooseToObject(courses)});
    // })
    // .catch(next);
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
