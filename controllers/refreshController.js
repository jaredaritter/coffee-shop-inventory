exports.index = (req, res, next) => {
  res.send('The refresh route is working');
};

exports.otherExport = (req, res, next) => {
  res.send('The other export method works as well.');
};
