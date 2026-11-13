import type { IncomingMessage, ServerResponse } from "http";

const rootCotroller = (req: IncomingMessage, res: ServerResponse) => {

  let url = req.url;
  let method = req.method;
  
  if (url?.startsWith("/") && method === "GET") {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "You are in root" }));
    
  } else {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "You are in root" }));
    
  }
};

export default rootCotroller;
