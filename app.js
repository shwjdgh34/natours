const fs = require('fs');
const express = require('express');
const app = express();
const port = 4000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};
const getTourById = (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
const createTour = (req, res) => {
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
};
// my own middleware. The order of middlewares does matter.
app.use((req, res, next) => {
  console.log('hi, my own middleware is called 👋');
  next();
});
app.use(express.json());
// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);

app
  .route('/api/v1/tours')
  .get(getAllTour)
  .post(createTour);
app.route('/api/v1/tours/:id').get(getTourById);

app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
