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

router.put("/changeOperation", async (req, res) => {
  const {amount, concept, id} = req.body
  await Operations.update({
    amount: amount, 
    concept: concept,
  }, { where: {id: id} })
  res.json("SUCCESS")
})

router.delete("/:operationId", async (req, res) => {
  const operationId = req.params.operationId
  await Operations.destroy({
    where: {
      id: operationId,
    },
  })
  res.json("DELETED SUCCESS")
})

module.exports = router