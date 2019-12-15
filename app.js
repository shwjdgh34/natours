const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const myLogger = (req, res, next) => {
  console.log('MyLogger');
  next();
};
const myLogger2 = (req, res, next) => {
  console.log('MyLogger2');
  next();
};
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(myLogger);
app.use(myLogger2);

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
