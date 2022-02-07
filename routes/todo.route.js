var router = require('express').Router();
var path = require('path')
var { getFileContent, writeFileContent } = require('../utils/file.util')
const file_name = path.join(__dirname, '..', 'db', 'todo.db.json')
async function getNextId() {
    var parsedData = await getFileContent(file_name)
    return parsedData.length === 0 ? 1 : parsedData[parsedData.length - 1].id + 1;
}
//http://localhost:3000/todos GET
router.get('/', async function (req, res) {
    var parsedData = await getFileContent(file_name)
    res.json(parsedData)
})
//http://localhost:3000/todos POST
router.post('/', async function (req, res) {
    var id = await getNextId();
    var todos = await getFileContent(file_name);
    var todo = { ...req.body, id: id }
    todos.push(todo)
    var data = await writeFileContent(file_name, todos)
    res.json(data)
});
//http://localhost:3000/todos/1 PUT
router.put('/:id', async function (req, res) {
    //var id=req.params.id;
    var { id } = req.params;
    var updatedObj = req.body;
    var todos = await getFileContent(file_name);
    var idx = todos.findIndex(todo => todo.id == id)
    if (idx != 1) {
        todos[idx] = { ...updatedObj, id: id }
        var data = await writeFileContent(file_name, todos)
        return res.json(data)
    }
    res.json({
        msg: "id not present"
    })


});
//http://localhost:3000/todos/1 PATCH
router.patch('/:id', async function (req, res) {
    var { id } = req.params;
    var updatedObj = req.body;
    var todos = await getFileContent(file_name);
    var idx = todos.findIndex(todo => todo.id == id)
    if (idx != 1) {
        todos[idx] = { ...todos[idx], ...updatedObj, id: id }
        var data = await writeFileContent(file_name, todos)
        return res.json(data)
    }
    res.json({
        msg: "id not present"
    })
});
//http://localhost:3000/todos/1 DELETE
router.delete('/:id', async function (req, res) {
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
    todos => todos.filter(todo => todo.id != id)
    await writeFileContent(file_name, todos)
    return res.json({})
})

module.exports = router;