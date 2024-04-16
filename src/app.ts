import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use('/', (req, res) => {
  res.send('Hello there!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`) 
})