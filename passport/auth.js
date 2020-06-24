module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please login");
    res.redirect("/stamina/users/login");
  },
  ensurenotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/stamina/home");
    }
    next();
  },
};
