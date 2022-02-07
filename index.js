const express = require('express');
const app = express();
const errorHandler=require('./utils/error.util')
const todoRoute = require('./routes/todo.route')
const userRoute = require('./routes/user.route')


app.use(express.json())

app.use('/todos', todoRoute)
app.use('/users', userRoute)

app.use('/todos',errorHandler)
app.listen(3000, () => {
    console.log("Server Started");
})