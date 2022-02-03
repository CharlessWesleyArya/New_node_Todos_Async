var todos = [];
function getNextId() {
    return todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
}

var router=require('express').Router();

//http://localhost:3000/todos GET
router.get('/', function (req, res) {
    res.json(todos)
});

//http://localhost:3000/todos POST
router.post('/', function (req, res) {
    var todo = { ...req.body, id: getNextId() };
    todos.push(todo)
    //create id
    res.json(todo)
});

//http://localhost:3000/todos/1 PUT
router.put('/:id', function (req, res) {
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
router.patch('/:id', function (req, res) {
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
router.delete('/:id', function (req, res) {
    var { id } = req.params;
    todos = todos.filter(todo => todo.id != id)
    res.json(todos)
})

module.exports=router;