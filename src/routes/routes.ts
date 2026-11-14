import type { IncomingMessage, ServerResponse } from "http";
import {getProductById, getProductController} from "../controllers/product.controller";
import rootCotroller from "../controllers/root.controller";


const routeHandler = (req: IncomingMessage, res: ServerResponse) => {

  let url = req.url;
  let method = req.method;

  let extractUrl = url?.split("/");
  let id = Number(extractUrl?.at(2));
  
  if (req.url === "/") {
    rootCotroller(req, res);
  } 
  if (req.url === "/products") {
    getProductController(req, res);
  } 
  if (url === `/products/${id}`) {
    getProductById(req,res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid url!" }));
  }
};

export default routeHandler;
