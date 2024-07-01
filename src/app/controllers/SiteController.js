
const Course = require('../models/Course.js');

class SiteController {
    //[GET] /home
   async index(req, res) {

       try {
        const courses = await Course.find();
        res.render('home',
            res.json(courses)
    );
       }catch (error) {
        logger.error(error);
       }

        // res.render('home');
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
    //[POST] /search
    searchPost(req, res) {
        console.log(req.body);
        res.send('');
        res.render('news');
    }
}
module.exports = new SiteController();
