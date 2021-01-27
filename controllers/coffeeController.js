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
