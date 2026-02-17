raw HTTP Server (node.js from first principles)

this project is a minimal HTTP server built using node.js’ native http module, without any frameworks like Express.

the goal of this project is not to build a feature rich API, but to understand how HTTP works at a lower level and how node handles requests, responses, and streams internally.

what this demonstrates

this server intentionally implements:

manual routing

explicit status code handling

response header management

stream-based request body parsing

JSON parsing with error boundaries

payload size protection (1MB limit)

separation of routing and response helpers

why not use express?

frameworks abstract important mechanics such as:

how HTTP messages are structured

how request bodies arrive in chunks

how responses are finalized

how content-type headers influence client interpretation

this project rebuilds those concepts manually to better understand what frameworks hide.

how It Works

when a request arrives:

node’s HTTP server receives a parsed HTTP message.

the handleRequest function routes based on method and URL.

for POST requests:

the request body arrives as a stream.

data is accumulated chunk-by-chunk.

a size limit is enforced (1MB).

JSON parsing occurs only after the end event.

responses are sent using helper functions that standardize formatting.

routes

GET /
returns plain text response.

GET /health
returns JSON status object.

POST /echo
accepts JSON payload and returns it back.
returns 400 for invalid JSON.
rejects payloads larger than 1MB.

example usage

start server:
node server.js

test health route:
curl http://localhost:8080/health


test echo route:
curl -X POST http://localhost:8080/echo \
-H "Content-Type: application/json" \
-d '{"name":"bobby"}'

