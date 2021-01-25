// REQUIRED MODULES
const { body, validationResult } = require('express-validator');

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
  res.render('origin_form', {
    title: 'Create Origin',
  });
};

exports.origin_create_post = [
  // VALIDATE AND SANITIZE FORM INFORMATION
  body('country', 'Country name is required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('producer').trim().escape(),

  // PROCESS REQUEST
  (req, res, next) => {
    // EXTRACT ERRORS
    const errors = validationResult(req);

    // CREATE OBJECT WITH CLEANED DATA
    const origin = new Origin({
      country: req.body.country,
      producer: req.body.producer,
    });

    if (!errors.isEmpty()) {
      // RERENDER PAGE WITH SANITIZED DATA
      res.render('origin_form', {
        title: 'Create Origin',
        origin: origin,
        errors: errors.array(),
      });
    } else {
      // CHECK IF ORIGIN/PRODUCER ALREADY EXISTS
      Origin.findOne({
        country: origin.country,
        producer: origin.producer,
      }).exec(function (err, found_origin) {
        if (err) {
          return next(err);
        }
        if (found_origin) {
          // REDIRECT TO FOUND ORIGIN PAGE
          res.redirect(found_origin.url);
        } else {
          // SAVE ORIGIN TO DB AND REDIRECT TO ORIGIN DETAIL PAGE
          origin.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(origin.url);
          });
        }
      });
    }
  },
];

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
