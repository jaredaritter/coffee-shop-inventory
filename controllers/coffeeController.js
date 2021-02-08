// REQUIRED MODULES
const async = require('async');
const { body, validationResult } = require('express-validator');

// MODEL MODULES
const Coffee = require('../models/coffee');
const Origin = require('../models/origin');
const Roast = require('../models/roast');

// INDEX CONTROLLER FUNCTION
exports.index = function (req, res, next) {
  async.parallel(
    {
      coffee_count: function (callback) {
        Coffee.countDocuments({}, callback);
      },
      origin_count: function (callback) {
        Origin.countDocuments({}, callback);
      },
      roast_count: function (callback) {
        Roast.countDocuments({}, callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        title: 'Coffee Shop Inventory',
        data: results,
        error: err,
      });
    }
  );
};

// INDIVIDUAL CONTROLLER FUNCTIONS
exports.coffee_list = function (req, res, next) {
  Coffee.find()
    .sort({ name: 1 })
    .exec(function (err, coffee_list) {
      if (err) {
        return next(err);
      }
      res.render('coffee_list', {
        title: 'Coffee List',
        coffee_list: coffee_list,
      });
    });
};

exports.coffee_detail = function (req, res, next) {
  Coffee.findById(req.params.id)
    .populate('origin')
    .populate('roast')
    .exec(function (err, coffee) {
      if (err) {
        return next(err);
      }
      if (coffee === null) {
        const error = new Error('Coffee not found');
        error.status = 404;
        return next(err);
      }
      res.render('coffee_detail', {
        title: `Coffee: ${coffee.name}`,
        coffee: coffee,
      });
    });
};

exports.coffee_create_get = function (req, res, next) {
  // NEED ORIGIN AND ROAST FROM DB FOR SELECT INPUTS
  async.parallel(
    {
      origin_list: function (callback) {
        // FIND ALL ORIGINS
        Origin.find({}, callback);
      },
      roast_list: function (callback) {
        // FIND ALL ROASTS
        Roast.find({}, callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // DO OTHER THINGS
      // RENDER COFFEE FORM VIEW
      res.render('coffee_form', {
        title: 'Create Coffee',
        origin_list: results.origin_list,
        roast_list: results.roast_list,
      });
    }
  );
};

exports.coffee_create_post = [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('origin_country', 'Origin must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('roast_name', 'Roast must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must be number <= 1000')
    .trim()
    .isNumeric()
    .withMessage('Price must be a number.')
    .isLength({ min: 1, max: 4 })
    .escape(),
  body('quantity')
    .trim()
    .isNumeric()
    .withMessage('Quantuty must be a number.')
    .isLength({ min: 1, max: 3 })
    .withMessage('Must be 3 digits or less')
    .escape(),
  (req, res, next) => {
    // BUILD ERRORS LIST BASED ON VALIDATION RESULT
    const errors = validationResult(req);

    // BUILD NEW BOOK
    const coffee = new Coffee({
      name: req.body.name,
      description: req.body.description,
      origin: req.body.origin_country,
      roast: req.body.roast_name,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    // IF ERRORS IS NOT EMPTY THEN RERENDER PAGE WITH SANITIZED DATA
    if (!errors.isEmpty()) {
      // GRAB ORIGIN AND ROAST LISTS AGAIN
      async.parallel(
        {
          origin_list: function (callback) {
            Origin.find(callback);
          },
          roast_list: function (callback) {
            Roast.find(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          // console.log('Coffee: ' + coffee.origin._id);
          res.render('coffee_form', {
            title: 'Create Coffee',
            coffee: coffee,
            errors: errors.array(),
            origin_list: results.origin_list,
            roast_list: results.roast_list,
          });
        }
      );
    }
    // ELSE SAVE GOOD DATA TO DB
    else {
      coffee.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(coffee.url);
      });
    }
  },
];

exports.coffee_update_get = function (req, res, next) {
  // GET COFFEE BASED ON ID WITH ORIGIN_LIST AND ROAST_LIST
  async.parallel(
    {
      coffee: function (callback) {
        Coffee.findById(req.params.id, callback);
      },
      origin_list: function (callback) {
        Origin.find(callback);
      },
      roast_list: function (callback) {
        Roast.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.coffee === null) {
        const err = new Error('Coffee Not found');
        err.status = 404;
        return next(err);
      }
      // RENDER
      else {
        res.render('coffee_form', {
          title: `Update: ${results.coffee.name}`,
          coffee: results.coffee,
          origin_list: results.origin_list,
          roast_list: results.roast_list,
        });
      }
    }
  );
};

exports.coffee_update_post = [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('origin_country', 'Origin must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('roast_name', 'Roast must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('price', 'Price must be number <= 1000')
    .trim()
    .isNumeric()
    .withMessage('Price must be a number.')
    .isLength({ min: 1, max: 4 })
    .escape(),
  body('quantity')
    .trim()
    .isNumeric()
    .withMessage('Quantuty must be a number.')
    .isLength({ min: 1, max: 3 })
    .withMessage('Must be 3 digits or less')
    .escape(),
  (req, res, next) => {
    // BUILD ERRORS LIST BASED ON VALIDATION RESULT
    const errors = validationResult(req);

    // BUILD NEW BOOK
    const coffee = new Coffee({
      name: req.body.name,
      description: req.body.description,
      origin: req.body.origin_country,
      roast: req.body.roast_name,
      price: req.body.price,
      quantity: req.body.quantity,
      _id: req.params.id,
    });

    // IF ERRORS IS NOT EMPTY THEN RERENDER PAGE WITH SANITIZED DATA
    if (!errors.isEmpty()) {
      // GRAB ORIGIN AND ROAST LISTS AGAIN
      async.parallel(
        {
          origin_list: function (callback) {
            Origin.find(callback);
          },
          roast_list: function (callback) {
            Roast.find(callback);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          res.render('coffee_form', {
            title: 'Create Coffee',
            coffee: coffee,
            errors: errors.array(),
            origin_list: results.origin_list,
            roast_list: results.roast_list,
          });
        }
      );
    }
    // ELSE SAVE GOOD DATA TO DB
    else {
      Coffee.findByIdAndUpdate(
        req.params.id,
        coffee,
        {},
        function (err, updatedCoffee) {
          if (err) {
            return next(err);
          }
          res.redirect(updatedCoffee.url);
        }
      );
    }
  },
];

exports.coffee_delete_get = (req, res, next) => {
  Coffee.findById(req.params.id).exec(function (err, coffee) {
    if (err) {
      return next(err);
    }
    if (coffee === null) {
      res.redirect('/inventory/coffees');
    } else {
      res.render('coffee_delete', {
        title: 'Delete Coffee',
        coffee: coffee,
      });
    }
  });
};

exports.coffee_delete_post = (req, res, next) => {
  Coffee.findByIdAndRemove(req.body.coffee_id, function deleteCoffee(err) {
    if (err) {
      return next(err);
    } else {
      res.redirect('/inventory/coffees');
    }
  });
};

// EXPORTS.NAME ASSIGNMENT OR A MODULE.EXPORTS ASSIGNMENT AT END BOTH WORK TO EXPORT CONTROLLER FUNCTIONS
