import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
      console.log(req.method);
      console.log(req.url);

      if(req.url === "/" && req.method === "GET"){
        // console.log("You are in the root")
        res.writeHead(
          200,
          {"Content-Type": "application/json"},
        );
        res.end(JSON.stringify({massage: "You are in the root"}))
    }
    else if(req.url?.startsWith("/products") && req.method === "GET"){
      res.writeHead(
        200,
        {"Content-Type": "application/json"},
      );
      res.end(JSON.stringify({message: "Here is your products"}));
    }
    else{
        res.writeHead(
          404,
          {"Content-Type": "application/json"},
        );
        res.end(JSON.stringify({ message: "You are out of the root" }));
      }
  },
);

server.listen(5000, () => {
  console.log("Server is running successfully!");
  console.log("Server is running successfully!");
  console.log("Server is running successfully!");
});
