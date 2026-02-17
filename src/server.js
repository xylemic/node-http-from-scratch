const http = require('http')

const port = 8080

const handleRequest = (req, res) => {
  console.log(`incoming request: ${req.method} ${req.url}`)

  if (req.method === 'GET' && req.url === '/') {
    return sendText(res, 200, 'home route')
  }

  if (req.method === 'GET' && req.url === '/health') {
    return sendJSON(res, 200, { status : 'OK' })
  }

  if (req.method === 'POST' && req.url === '/echo') {
    return handleEcho(req, res)
  }

  return sendJSON(res, 404, { error : 'not found' })
}

const sendText  = (res, statusCode, message) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'text/plain')
  res.end(message)
}

const sendJSON = (res, statusCode, data) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}


const handleEcho = (req, res) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk

    if (body.length > 1e6) {
      req.socket.destroy()
    }
  })

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body)
      return sendJSON(res, 200, { received: parsed })
    } catch (err) {
      return sendJSON(res, 400, { error: 'invalid json' })
    }
  })
}


const server = http.createServer(handleRequest)

server.listen(port, () => console.log(`server running successfully on port: ${port}`))

