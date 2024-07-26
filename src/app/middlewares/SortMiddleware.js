module.exports = function SortMiddleWare(req, res, next) {

    res.locals._sort = {
        enable: false,
        type: 'default'
    };
    if (req.query.hasOwnProperty('_sort')) {
        res.locals._sort.enable = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column;
    }
    //hợp nhất obj
    // Object.assign(req.query._sort,{
    //     enable: true,
    //     type: req.query.type,
    //     column: req.query.column,
    // })
    next();
}