/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.terms = (req, res) => {
  res.render('terms', {
    title: 'Terms and Conditions'
  });
};

exports.privacy = (req, res) => {
  res.render('privacy', {
    title: 'Privacy Policy'
  });
};
