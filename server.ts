import express from "express";
import expressWebsockets from "express-ws";
import { Server } from "@hocuspocus/server";

// Configure Hocuspocus
const server = Server.configure({
  // ...
});

// Setup your express instance using the express-ws extension
const { app } = expressWebsockets(express());

// A basic http route
app.get("/", (request, response) => {
  response.send("Hello World!");
});

// Add a websocket route for Hocuspocus
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.ws("/collaboration", (websocket, request) => {
  const context = {
    user: {
      id: 1234,
      name: "Jane",
    },
  };

  server.handleConnection(websocket, request, context);
});

// Only start the server if we're running directly (not being imported by Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 1234;
  app.listen(port as number, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
}

// This is important for Vercel
export default app;