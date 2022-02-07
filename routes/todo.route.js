var router = require('express').Router();
var path = require('path')
var { getFileContent, writeFileContent } = require('../utils/file.util')
const file_name = path.join(__dirname, '..', 'db', 'todo.db.json')
function getNextId() {
    return getFileContent(file_name)
        .then(parsedData => {
            return parsedData.length === 0 ? 1 : parsedData[parsedData.length - 1].id + 1;
        })
        .catch(err => {
            console.log(err)
        })
}
//http://localhost:3000/todos GET
router.get('/', function (req, res) {
    getFileContent(file_name)
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
        })
})

//http://localhost:3000/todos POST
router.post('/', function (req, res) {
    {/* getNextId(function (err, id, todos) {
        
        if (err) throw err;
        var todo = { ...req.body, id: id };
        todos.push(todo)
        writeFileContent(file_name, todos, function (err, data) {
            if (err) throw err;
            res.json(todo)
        })
    }); */}
    var _id;
    console.log("camed")
    getNextId()
        .then(id => (_id = id))
        .then(_ => getFileContent(file_name))
        .then(todos => {
            var todo = { ...req.body, id: _id };
            todos.push(todo)
            return writeFileContent(file_name, todos)
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
        })
});

//http://localhost:3000/todos/1 PUT
router.put('/:id', function (req, res) {
    //var id=req.params.id;
    var { id } = req.params;
    var updatedObj = req.body;

    var _todos;
    var _idx;
    getFileContent(file_name)
        .then(todos => (_todos = todos))
        .then(todos => (todos.findIndex(todo => todo.id == id)))
        .then(idx => (_idx = idx))
        .then(idx => (idx != -1))
        .then(isPresent => {
            if (isPresent) {
                _todos[_idx] = { ...updatedObj, id: id };
                return writeFileContent(file_name, _todos)
            }
            return Promise.reject();
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
        })
});

//http://localhost:3000/todos/1 PATCH
router.patch('/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    var _todos;
    var _idx;
    getFileContent(file_name)
        .then(todos => (_todos = todos))
        .then(todos => (todos.findIndex(todo => todo.id == id)))
        .then(idx => (_idx = idx))
        .then(idx => (idx != -1))
        .then(isPresent => {
            if (isPresent) {
                _todos[_idx] = { ..._todos[_idx], ...updatedObj, id: id };
                return writeFileContent(file_name, _todos)
            }
            return Promise.reject();
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
        })
});

//http://localhost:3000/todos/1 DELETE
router.delete('/:id', function (req, res) {
    var { id } = req.params;
    {/* getFileContent(file_name, function (err, todos) {
        if (err) throw err;
        todos = todos.filter(todo => todo.id != id)
        writeFileContent(file_name, todos, function (err) {
            if (err) throw err;
            res.json({})
        })
    }) */}
    getFileContent(file_name)
        .then(todos => todos.filter(todo => todo.id != id))
        .then(newTodos => writeFileContent(file_name, newTodos))
        .then(_ => res.json())
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;