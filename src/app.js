const express = require('express')
const fs = require('fs')
const app = express()
const filename = './products.json'

app.get('/products', async (req, res) => {
    let contenido = await fs.promises.readFile(filename, 'utf-8')
    res.send( JSON.parse(contenido) )
})

app.get('/product', async (req,res) => {
    try {
        const data = await fs.promises.readFile(filename, 'utf-8');
        const contenido = JSON.parse(data);
        const limit = req.query.limit
        const firstElements = contenido.slice(0, limit);
        return res.send(firstElements);
      } catch (err) {
        return res.status(500).send({ error: 'Error reading array files' });
      }
})

app.get('/products/:id', async (req,res) => {
    try {
        const data = await fs.promises.readFile(filename, 'utf-8');
        const contenido = JSON.parse(data);
        const { id } = req.params
        const product = contenido.find(item => item.id === id)
        if (!product) res.send({ error: "Product not found" })
        else res.send({ product })
    } catch (error) {
        return res.status(500).send({ error: 'Error reading array files' });
    }
})



app.listen(8080, () => console.log('Servidor Funcionando'))