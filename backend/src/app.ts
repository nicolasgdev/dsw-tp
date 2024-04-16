import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use('/', (req, res) => {
  res.send('Hello there!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`) 
})