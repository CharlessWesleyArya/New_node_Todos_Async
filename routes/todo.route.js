var router = require('express').Router();
var path = require('path')
var { getFileContent, writeFileContent } = require('../utils/file.util')
const file_name = path.join(__dirname, '..', 'db', 'todo.db.json')
const { badRequest, internalServerError } = require('../utils/Error')
async function getNextId() {
    var parsedData = await getFileContent(file_name)
    return parsedData.length === 0 ? 1 : parsedData[parsedData.length - 1].id + 1;
}
//http://localhost:3000/todos GET
router.get('/', async function (req, res, next) {
    try {
        var parsedData = await getFileContent(file_name)
        res.json(parsedData)
    }
    catch (err) {
        next(internalServerError.getError('Something went wrong'))
    }
})
//http://localhost:3000/todos POST
router.post('/', async function (req, res, next) {
    try {
        var id = await getNextId();
        var todos = await getFileContent(file_name);
        var todo = { ...req.body, id: id }
        todos.push(todo)
        var data = await writeFileContent(file_name, todos)
        res.json(data)
    }
    catch (err) {
        next(err)
    }
});
//http://localhost:3000/todos/1 PUT
router.put('/:id', async function (req, res, next) {
    //var id=req.params.id;
    try {
        var { id } = req.params;
        var updatedObj = req.body;
        var todos = await getFileContent(file_name);
        var idx = todos.findIndex(todo => todo.id == id)
        if (idx != 1) {
            todos[idx] = { ...updatedObj, id: id }
            var data = await writeFileContent(file_name, todos)
            return res.json(data)
        }
        next(badRequest.getError(''))
    }
    catch (err) {
        next(err)
    }
});
//http://localhost:3000/todos/1 PATCH
router.patch('/:id', async function (req, res, next) {
    try {
        var { id } = req.params;
        var updatedObj = req.body;
        var todos = await getFileContent(file_name);
        var idx = todos.findIndex(todo => todo.id == id)
        if (idx != 1) {
            todos[idx] = { ...todos[idx], ...updatedObj, id: id }
            var data = await writeFileContent(file_name, todos)
            return res.json(data)
        }
        next(badRequest.getError('no todo is present'))
    }
    catch (err) {
        next(err)
    }
});
//http://localhost:3000/todos/1 DELETE
router.delete('/:id', async function (req, res, next) {
    try {
        var { id } = req.params;
        {/* getFileContent(file_name, function (err, todos) {
        if (err) throw err;
        todos = todos.filter(todo => todo.id != id)
        writeFileContent(file_name, todos, function (err) {
            if (err) throw err;
            res.json({})
        })
    }) */}
        var todos = await getFileContent(file_name)
        var NewTodos = todos.filter(todo => todo.id != id)
        if (todos.length === NewTodos.length) {
            //no todo is matched with the given id
            return next(badRequest.getError('no todo is present'))
        }
        await writeFileContent(file_name, todos)
        return res.json({})
    }
    catch (err) {
        next(internalServerError.getError('Something went wrong'))
    }
})

module.exports = router;