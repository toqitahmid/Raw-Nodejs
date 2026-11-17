import type { IncomingMessage, ServerResponse } from "http";
import {createProduct, getProductById, getProductController, modifyProduct} from "../controllers/product.controller";
import rootCotroller from "../controllers/root.controller";


const routeHandler = (req: IncomingMessage, res: ServerResponse) => {

  let url = req.url;
  let method = req.method;

  let extractUrl = url?.split("/");
  let id = Number(extractUrl?.at(2));
  
  if (req.url === "/" && method === "GET") {
    rootCotroller(req, res);
  } 
  else if (req.url === "/products" && method === "GET") {
    getProductController(req, res);
  } 
  else if (url === `/products/${id}` && method === "GET") {
    getProductById(req, res);
  } else if (url === "/products" && method === "POST") {
    createProduct(req, res);
  } else if (url === `/products` && method === "PUT") {
    modifyProduct(req, res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid url!" }));
  }
};

export default routeHandler;
