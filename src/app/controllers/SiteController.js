
const Course = require('../models/Course.js');
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose.js');
class SiteController {
    //[GET] /home
   async index(req, res,next) {   
    await Course.find()
    .then(courses => {  
        // res.send(courses);
        res.render('home',{courses: mutipleMongooseToObject(courses)});
    })
    .catch(next);
    }
    
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
    //[POST] /search
    searchPost(req, res) {
        console.log(req.body);
       
        res.render('news');
    }
}
module.exports = new SiteController();
