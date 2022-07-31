const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());   // allows us to read the body of requests

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

// Endpoints for HTTP Requests
// app.get()
// app.post()
// app.put()
// app.delete()

// We can define these routes with app.get() and etc. rather than with 'if' statements.

app.get('/', (req, res) => {   // route handler or callback function responds to the request
    res.send("Hello World!!!");
});

// In the real world, we would want to query a database and respond with it, but we are focusing on the endpoints here.
app.get('/api/courses', (req, res) => {
    res.send(courses);   // we can replace the numbers with real course objects
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);  // equivalent to getting result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,  // when using a DB, the ID is assigned by the DB
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);   // by convention, we return the object created in the body of the response.
});


app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));   // let defines a variable that we can reset later

    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // object not found error code
        return;
    }
    const { error } = validateCourse(req.body);  // equivalent to getting result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update Course
    course.name = req.body.name;
    // Return the updated course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));   // let defines a variable that we can reset later
    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // object not found error code
        return;
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
    // res.send(req.query);   // to send query params
});

// PORT
const port = process.env.PORT || 3000;  // read the value else use 3000 arbitrary value

app.listen(port, () => console.log(`Listening on Port ${port}.`));

app.delete('/api/courses/:id',  (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id == parseInt(req.params.id));   // let defines a variable that we can reset later
    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // object not found error code
        return;
    }
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});