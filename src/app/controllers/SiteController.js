class SiteController {
    //[GET] /home
    index(req, res) {
        res.render('home');
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
