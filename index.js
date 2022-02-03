const express = require('express');
const app = express();

var todos = []

app.use(express.json())

var todos = [];
function getNextId() {
    return todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
}

//http://localhost:3000/todos GET
app.get('/todos', function (req, res) {
    res.json(todos)
});

//http://localhost:3000/todos POST
app.post('/todos', function (req, res) {
    var todo = { ...req.body, id: getNextId() };
    todos.push(todo)
    //create id
    res.json(todo)
});

//http://localhost:3000/todos/1 PUT
app.put('/todos/:id', function (req, res) {
    //var id=req.params.id;
    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        todos[idx] = { ...updatedObj, id: id };
        return res.send({ ...updatedObj, id: id });
    }
    return json({
        msg: 'The given data is not there'
    })
});

//http://localhost:3000/todos/1 PATCH
app.patch('/todos/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        todos[idx] = { ...todos[idx], ...updatedObj, id: id };
        return res.send({ ...updatedObj, id: id });
    }
    return json({
        msg: 'The given data is not there'
    })
});

//http://localhost:3000/todos/1 DELETE
app.delete('/todos/:id', function (req, res) {
    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id)
    res.json(todos)
})


app.listen(3000, () => {
    console.log("Server Started");
})