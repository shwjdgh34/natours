# Server with Express + MongoDB

this is for learning Express + mongoDB to make server. app.js is main page

# TOC

- [Server with Express + MongoDB](#server-with-express--mongodb)
- [TOC](#toc)
  - [Middleware](#middleware)
    - [express.json()](#expressjson)
  - [Route](#route)
  - [status code](#status-code)

## Middleware

### express.json()

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. This is make us get access to the request body on the request object

A middleware that appears fist in the code, is excuted before one the appears later. So the orders of the code matters a lot in Express

Express is middleware stack(order as defined in the code) . Everything is middleware even route.

```javascript
app.use(express.json());
app.post('/api/v1/tours',(req, res) => {
    console.log(req.body);
};
```

> if dont use express.json() body-parser middleware, req.body returns 'undefined'

## route

```javascript
// app.get('/api/v1/tours', getAllTour);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);

app
  .route('/api/v1/tours')
  .get(getAllTour)
  .post(createTour);
app.route('/api/v1/tours/:id').get(getTourById);
```

> this is refactoried by route()

## status code

- 200: OK (get)
- 201: create (post)
- 204: no content (delete)
- 400 : error
- 404 : page not founded
