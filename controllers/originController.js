// REQUIRED MODULES

// MODEL MODULES
const Origin = require('../models/origin');

// INDIVIDUAL CONTROLLER FUNCTIONS
exports.origin_list = function (req, res, next) {
  Origin.find({}, function (err, origin_list) {
    if (err) {
      return next(err);
    }
    res.render('origin_list', {
      title: 'Origin List',
      origin_list: origin_list,
    });
  });
};

exports.origin_detail = function (req, res, next) {
  Origin.findById(req.params.id).exec(function (err, origin) {
    if (err) {
      return next(err);
    }
    if (origin === null) {
      const err = new Error('Origin not found');
      err.status = 404;
      return next(err);
    }
    res.render('origin_detail', {
      title: `Origin: ${origin.country}`,
      origin: origin,
      error: err,
    });
  });
};

exports.origin_create_get = function (req, res, next) {
  res.send('Origin Create GET still needs to be created.');
};

exports.origin_create_post = (req, res, next) => {
  res.send('Origin Create POST still needs to be created.');
};

exports.origin_update_get = (req, res, next) => {
  res.send('Origin Update GET still needs to be created.');
};

exports.origin_update_post = (req, res, next) => {
  res.send('Origin Update POST still needs to be created.');
};

exports.origin_delete_get = (req, res, next) => {
  res.send('Origin Delete GET still needs to be created.');
};

exports.origin_delete_post = (req, res, next) => {
  res.send('Origin Delete POST still needs to be created.');
};

// EXPORTS.NAME ASSIGNMENT OR A MODULE.EXPORTS ASSIGNMENT AT END BOTH WORK TO EXPORT CONTROLLER FUNCTIONS
