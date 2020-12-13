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

// Check if Itemcode exists

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

// Add new Supplier

app.post('/supplier/add', async(req,res) => {
    try {
        const {name, location} = req.body
        const newSupplier = await pool.query("INSERT INTO suppliers (name, location) VALUES($1, $2) RETURNING *",
         [name, location]
         );
        
        res.json(newSupplier.rows[0])

    } catch (err) {
        res.json(err)
    }
})

// Check if Supplier exists

app.get('/supplier/add', async(req,res) => {
    try {
        const name = req.query.name
        const location = req.query.location
        console.log(name)
        console.log(location)
        const checkSupplier = await pool.query("SELECT (name, location) FROM suppliers WHERE EXISTS (SELECT (name, location) FROM suppliers WHERE suppliers.name = $1 AND suppliers.location = $2)",[name, location])
        console.log(checkSupplier)
        res.json(checkSupplier)
    } catch (error) {
        console.log(error)
    }
})

// update item quantity after transaction

app.put('/transaction/update/:id', async(req,res) => {
    try {
        const {itemcode, quantity} = req.body;

        const updateItem = await pool.query('UPDATE items SET (qtyonhand) = ROW($1) WHERE itemcode = $2',
         [quantity, itemcode])

        res.json('item was updated')
    } catch (err) {
        console.log(err.message)
    }
})

// Add new receipt transaction

app.post('/receipt/:id', async(req,res) => {
    try {
        const {date, supplier, type} = req.body
        console.log(date, supplier)
        const newReceipt = await pool.query("INSERT INTO transactions (transaction_date, supplier_id, type) VALUES($1, $2, $3) RETURNING *",
        [date, supplier, type]
        );

        res.json(newReceipt.rows[0])
    } catch (error) {
        res.json(error)
    }
})

// Add new receipt transaction

app.post('/transaction/:id', async(req,res) => {
    try {
        const {transaction, itemcode, quantity} = req.body
        console.log(transaction, itemcode, quantity)
        const newTrans = await pool.query("INSERT INTO transaction_detail (transaction_id, itemcode, quantity) VALUES($1, $2, $3) RETURNING *",
        [transaction, itemcode, quantity]
        );

        res.json(newTrans.rows[0])
    } catch (error) {
        res.json(error)
    }
})

// get Supplier

app.get('/supplier/:id', async(req,res) => {
    try {
        const id = req.query.id
        const supplier = await pool.query('SELECT * FROM suppliers WHERE id = $1',
        [id]);

        res.json(supplier.rows[0])
    } catch (err) {
        console.log(err.message)
        res.json('supplier does not exist')
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



app.listen(5000, () => {
    console.log('Server has started on port 5000')
});


