// REQUIRED MODULES
const async = require('async');

// MODEL MODULES
const Roast = require('../models/roast');
const Coffee = require('../models/coffee');

// INDIVIDUAL CONTROLLER FUNCTIONS
exports.roast_list = function (req, res, next) {
  Roast.find().exec(function (err, roast_list) {
    if (err) {
      return next(err);
    }
    res.render('roast_list', {
      title: 'Roast List',
      roast_list: roast_list,
    });
  });
};

exports.roast_detail = function (req, res, next) {
  async.parallel(
    {
      roast: function (callback) {
        Roast.findById(req.params.id).exec(callback);
      },
      coffee_list: function (callback) {
        Coffee.find({ roast: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.roast === null) {
        const err = new Error('Roast not found');
        err.status = 404;
        return next(err);
      }
      console.log(results.coffee_list);
      res.render('roast_detail', {
        title: 'Roast Details',
        roast: results.roast,
        coffee_list: results.coffee_list,
      });
    }
  );
};

exports.roast_create_get = function (req, res, next) {
  res.send('Roast Create GET still needs to be created.');
};

exports.roast_create_post = (req, res, next) => {
  res.send('Roast Create POST still needs to be created.');
};

exports.roast_update_get = (req, res, next) => {
  res.send('Roast Update GET still needs to be created.');
};

exports.roast_update_post = (req, res, next) => {
  res.send('Roast Update POST still needs to be created.');
};

exports.roast_delete_get = (req, res, next) => {
  res.send('Roast Delete GET still needs to be created.');
};

exports.roast_delete_post = (req, res, next) => {
  res.send('Roast Delete POST still needs to be created.');
};

// EXPORTS.NAME ASSIGNMENT OR A MODULE.EXPORTS ASSIGNMENT AT END BOTH WORK TO EXPORT CONTROLLER FUNCTIONS
