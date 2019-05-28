const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controller = require('./controller');
require('dotenv').config();
const massive = require('massive');
const cors = require('cors')

app.use(cors(), bodyParser.json())

const port = 3001
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(`database is connected!`);
})


app.get('/api/inventory', controller.getProducts)

app.post('/api/product', controller.addProducts)

app.delete('/api/:id', controller.deleteProduct)
app.put('/api/product', controller.updateProduct)

app.listen(port, ()=> console.log(`server is running on ${port}`))

