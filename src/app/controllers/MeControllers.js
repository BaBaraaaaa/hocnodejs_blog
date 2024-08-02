
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose.js');
const Course = require('../models/Course.js');

class CoursesControllers {
    //[GET]/me/stored/courses
    async show(req, res, next) {
        let coursesQuery = Course.find({});
        let pageNum = req.query.page;
        let nexP = req.query.nextPage;
        let prevP = req.query.prevPage;
        const limit = req.query.limit ;
        let showCourse = Course.countDocumentsWithDeleted({ deleted: true });
        //pagination
        const pageNumber = () => {
            if (nexP != 0 && nexP != null) {
                return pageNum = parseInt(nexP);
            }
            else if (prevP != 0 && prevP != null) {
                return pageNum = parseInt(prevP);
            }
            else {
                return pageNum;
            }
        }
        const options = {
            totalPages: req.query.totalDocs  || 1,
            page:  pageNumber() || 1,
            limit: limit ?? 2, 
            nextPage: req.query.nextPage ?? null,
            prevPage: req.query.prevPage ?? null,
            sort: req.query._sort,
            search: req.query.search,


        };
        const paginate = Course.paginate({}, options)
            .then(pageResult => { return pageResult;})
            .catch(next);
        Promise.all([coursesQuery.sortable(req), paginate, showCourse])
            .then(([courses, pageResult, showCourse]) => {
                // res.json(pageResult)
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(pageResult.docs),
                    pageResult: pageResult, coursesCount: showCourse
                });
            })
            .catch(next);

        // Promise.all([showCourse, coursesQuery.sortable(req)])
        //     .then(([count, courses]) => {
        //         console.log('Total courses deleted count: ', count);
        //         res.render('me/stored-courses', { coursesCount: count, courses: mutipleMongooseToObject(courses)});
        //     })
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
        Course.findWithDeleted({ deleted: true })
            .then(courses => {
                //courses need filter to show only deleted courses
                //courses.filter(course => course.deleted)
                //https://github.com/dsanel/mongoose-delete/issues/98 it work for me
                res.render('me/trash-courses', {
                    courses:
                        mutipleMongooseToObject(courses)
                });
            });
    }



}

module.exports = new CoursesControllers();
