const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

// create new item

app.post('/add', async(req,res) => {
    try {
        const {itemcode, description, qtyonhand, cost, price} = req.body
        const newItem = await pool.query("INSERT INTO items (itemcode, description, qtyonhand, cost, price) VALUES($1, $2, $3, $4, $5) RETURNING *",
         [itemcode, description, qtyonhand, cost, price]
         );

         res.json(newItem.rows[0])

    } catch (err) {
        res.json(err)
    }
})

// get all items

app.get('/items', async(req,res) => {
    try {
        const allItems = await pool.query('SELECT * FROM items')
        res.json(allItems.rows)
    } catch (err) {
        console.log(err.message)
    }
})

// get todo

app.get('/items/:id', async(req,res) => {
    try {
        const {id} = req.params
        const item = await pool.query('SELECT * FROM items WHERE id = $1',
        [id]);

        res.json(item.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

// update todo

app.put('/items/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const {name} = req.body;

        const updateItem = await pool.query('UPDATE items SET name = $1 WHERE id = $2',
         [name, id])

        res.json('item was updated')
    } catch (err) {
        console.log(err.message)
    }
})


// delete todo

app.delete('/items/:id', async(req,res) => {
    try {
        const {id} = req.params

        const deleteItem = await pool.query('DELETE FROM items WHERE id = $1', 
        [id])

        res.json('Item Deleted')
    } catch (err) {
        console.log(err.message)
    }
})

// Search by name

app.get('/items/search/:name', async(req,res) => {
    try {
        const {name} = req.params
        const item = await pool.query('SELECT * FROM items WHERE name = $1',
        [name]);

        res.json(item.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log('Server has started on port 5000')
});