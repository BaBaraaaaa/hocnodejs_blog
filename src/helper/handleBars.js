const handlerbars = require('handlebars');

module.exports = {
    // register new function helpers
    inc: (i) => { return i + 1 },

    sortable: (field, sort) => {
        const currentSort = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'bi bi-sort-alpha-down',
            asc: 'bi bi-sort-alpha-down',
            desc: 'bi bi-sort-alpha-up-alt'
        }
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        const icon = icons[currentSort]
        const type = types[currentSort];

        const href = handlerbars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        const output = `<a href="${href}"> <i class="${icon}"></i></a>`;
        
        return new handlerbars.SafeString(output);
    }

};