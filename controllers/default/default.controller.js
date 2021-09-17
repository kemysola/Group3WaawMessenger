module.exports = {
    home: (req,res) => {
        let pageTitle = 'Home Page';
        res.render('default/index', {pageTitle: pageTitle});
    }
}