const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'root root root', app: 'Natours' });
});
app.post('/', (req, res) => {
  res.send('good post');
});
app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
