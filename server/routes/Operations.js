const express = require('express')
const router = express.Router()
const {Operations} = require('../models')


router.get("/", async (req, res) => {
  const listOfOperations = await Operations.findAll()
  res.json(listOfOperations)
})

router.get('/byId/:id', async (req,res) => {
  const id = req.params.id
  const operation = await Operations.findByPk(id)
  res.json(operation)
})

router.post("/", async (req, res) => {
  const operation = req.body
  await Operations.create(operation)
  res.json(operation)
})

module.exports = router