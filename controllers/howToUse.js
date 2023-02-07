/**
 * @file How to use page controllers
 */

// render how to use page
module.exports.renderHowToUse = (req, res) => {
    const pageTitle = 'Sobre';
    res.render('howToUse', { pageTitle });
}