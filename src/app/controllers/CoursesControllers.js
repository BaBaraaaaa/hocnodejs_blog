
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose.js');
const Course = require('../models/Course.js');

class CoursesControllers {
    //[GET]/course/:slug
   async show(req, res,next) {
        const slug =  req.params.slug;
        console.log(slug);
        await Course.findOne({slug: slug})
    .then(courses => {  
        //  res.send(courses);
        res.render('courses/show',{course: mongooseToObject(courses)});
    })
    .catch(next);     
    }
     //[GET]/course/create
     create(req, res,next) {
        res.render('courses/create');
     
    }
     //[POST]/course/create
    async   createItem(req, res,next) {
        const course = new Course(req.body);
        console.log(course);
        course.save()
        .then(()=> {
        res.redirect(`/course/${course.slug}`);
       })
       .catch(next);
    }
    //[GET] /courses/:id/edit
    async editItem(req, res, next) {
        console.log(req.params.id);
        Course.findById(req.params.id)
        .then((course)=>{
            console.log(course);
            res.render('courses//update',{course: mongooseToObject(course)});
        })
        .catch(next);
        
    }
    //[PUT] /courses/:id/edit
    async updateItem(req, res, next) {
       
        await Course.findByIdAndUpdate(req.params.id, req.body, {new: false})
        .then((course)=> {
            res.redirect(`/courses/${course.slug}`);
       })
       .catch(next);
    }


}

module.exports = new CoursesControllers();
