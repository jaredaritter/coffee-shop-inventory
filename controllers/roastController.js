// REQUIRED MODULES

// MODEL MODULES
const Roast = require('../models/roast');

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
  res.send('Roast Detail still needs to be created.');
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
