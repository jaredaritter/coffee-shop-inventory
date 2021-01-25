// REQUIRED MODULES
const async = require('async');

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
    // .populate('origin')
    // .populate('roast')
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
  res.send('Coffee Create GET still needs to be created.');
};

exports.coffee_create_post = (req, res, next) => {
  res.send('Coffee Create POST still needs to be created.');
};

exports.coffee_update_get = (req, res, next) => {
  res.send('Coffee Update GET still needs to be created.');
};

exports.coffee_update_post = (req, res, next) => {
  res.send('Coffee Update POST still needs to be created.');
};

exports.coffee_delete_get = (req, res, next) => {
  res.send('Coffee Delete GET still needs to be created.');
};

exports.coffee_delete_post = (req, res, next) => {
  res.send('Coffee Delete POST still needs to be created.');
};

// EXPORTS.NAME ASSIGNMENT OR A MODULE.EXPORTS ASSIGNMENT AT END BOTH WORK TO EXPORT CONTROLLER FUNCTIONS
