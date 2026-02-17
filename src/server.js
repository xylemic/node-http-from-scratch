const http = require('http')

const server = http.createServer((req, res) => {
  console.log(req)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')

  res.end('hello, from nodeJS')
})

const port = 8080

server.listen(port, () => console.log(`server running successfully on port: ${port}`))

