var router = require('express').Router();
var path = require('path')
var { getFileContent, writeFileContent } = require('../utils/file.util')
const file_name = path.join(__dirname, '..', 'db', 'todo.db.json')
function getNextId(cb) {
    getFileContent(file_name, function (err, todos) {
        if (err) return cb(err)
        return cb(null, todos.length == 0 ? 1 : todos[todos.length - 1].id + 1, todos);
    })

}
//http://localhost:3000/todos GET
router.get('/', function (req, res) {
    getFileContent(file_name, function (err, todos) {
        if (err) throw err;
        res.json(todos)
    })
});

//http://localhost:3000/todos POST
router.post('/', function (req, res) {
    //var todo = { ...req.body, id: getNextId() };
    getNextId(function (err, id, todos) {
        if (err) throw err;
        var todo = { ...req.body, id: id };
        todos.push(todo)
        writeFileContent(file_name, todos, function (err, data) {
            if (err) throw err;
            res.json(todo)
        })
    });
});

//http://localhost:3000/todos/1 PUT
router.put('/:id', function (req, res) {
    //var id=req.params.id;
    var { id } = req.params;
    var updatedObj = req.body;
    getFileContent(file_name, function (err,todos) {
        if (err) throw err;
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...updatedObj, id: id };
            return writeFileContent(file_name, todos, function (err) {
                if (err) throw err;
                return res.json({ ...updatedObj, id: id });
            })

        }
        return res.json({
            msg: 'The given data is not there'
        })
    })
});

//http://localhost:3000/todos/1 PATCH
router.patch('/:id', function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    getFileContent(file_name, function (err,todos) {
        if (err) throw err;
        var idx = todos.findIndex(todo => todo.id == id);
        if (idx != -1) {
            todos[idx] = { ...todos[idx], ...updatedObj, id: id };
            return writeFileContent(file_name, todos, function (err) {
                if (err) throw err;
                return res.json({ ...todos[idx], ...updatedObj, id: id })
            })
            return res.send({ ...updatedObj, id: id });
        }
        return res.json({
            msg: 'The given data is not there'
        })
    })
});

//http://localhost:3000/todos/1 DELETE
router.delete('/:id', function (req, res) {
    var { id } = req.params;
    getFileContent(file_name, function (err, todos) {
        if (err) throw err;
        todos = todos.filter(todo => todo.id != id)
        writeFileContent(file_name, todos, function (err) {
            if (err) throw err;
            res.json({})
        })
    })

})

module.exports = router;