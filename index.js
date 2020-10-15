const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 7000
const db = require('./queries')
const { body, validationResult } = require('express-validator')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', 
    [
        body('name').isLength({ min: 5}).withMessage('must be at least 5 chars long')
    ], 
    db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
