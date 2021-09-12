module.exports = function (err, response) {
  console.error('axios error!', err);
  response.status(500).send('This is a Status 500.  Negative Ghost Rider; the pattern is full.');
};
