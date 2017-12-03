const express = require('express')
const app = express()
var path = require('path');

app.get('/', (req, res) => res.sendFile(path.resolve('index.html')))
app.get('/team', (req, res) => res.sendFile(path.resolve('team.html')))
app.get('/schedule', (req, res) => res.sendFile(path.resolve('schedule.html')))
app.get('/sitemap', (req, res) => res.sendFile(path.resolve('sitemap.html')))

app.listen(8080, () => console.log('VintagePL app listening on port 8080!'))
