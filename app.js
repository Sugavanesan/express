const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { Logger } = require('./middleware/logEvent')
const { errorHandler } = require('./middleware/errorLogHandler')
const port = process.env.PORT || 3000

app.use(Logger)

const corsOptions = require('./config/corsoptions')

app.use(cors(corsOptions))
app.use(express.urlencoded({ 'extended': false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.use('/employees', require('./api/employees'))

app.get('/newpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'NewPage.html'))
})

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)
app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })