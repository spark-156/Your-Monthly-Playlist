import express from 'express'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('world')
})

module.exports = {
  path: '/api/',
  handler: app
}
