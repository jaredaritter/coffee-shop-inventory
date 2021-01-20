// REQUIRED MODULES

// MODEL MODULES

exports.index = function (req, res, next) {
  res.render('index', {title: 'Express Inventory'});
}

// EXPORTS.NAME ASSIGNMENT OR A MODULE.EXPORTS ASSIGNMENT AT END BOTH WORK TO EXPORT CONTROLLER FUNCTIONS