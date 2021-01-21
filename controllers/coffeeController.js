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
  res.send('Coffee List still needs to be created.');
};

exports.coffee_detail = function (req, res, next) {
  res.send('Coffee Detail still needs to be created.');
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
