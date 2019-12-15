const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.use(express.json());
app.get('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour
        }
      });
    }
  );
});
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
