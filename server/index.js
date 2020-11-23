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

app.get('/add', async(req,res) => {
    try {
        const itemcode = req.query.itemcode
        console.log(itemcode)
        const checkItem = await pool.query("SELECT itemcode FROM items WHERE EXISTS (SELECT itemcode FROM items WHERE items.itemcode = $1)",[itemcode])
        console.log(checkItem)
        res.json(checkItem)
    } catch (error) {
        console.log(error)
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
        const itemcode = req.query.itemcode
        const item = await pool.query('SELECT * FROM items WHERE itemcode = $1',
        [itemcode]);

        res.json(item.rows[0])
    } catch (err) {
        console.log(err.message)
        res.json('item does not exist')
    }
})

// update todo

app.put('/items/:id', async(req,res) => {
    try {
        const {itemcode, description, qtyonhand, cost, price} = req.body;

        const updateItem = await pool.query('UPDATE items SET (description, qtyonhand, cost, price) = ($1,$2,$3,$4) WHERE itemcode = $5',
         [description, qtyonhand, cost, price, itemcode])

        res.json('item was updated')
    } catch (err) {
        console.log(err.message)
    }
})


// delete todo

app.delete('/items/:id', async(req,res) => {
    try {
        const itemcode = req.body.itemcode;
        console.log(itemcode)
        const deleteItem = await pool.query("DELETE FROM items WHERE itemcode = $1", 
        [itemcode])

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