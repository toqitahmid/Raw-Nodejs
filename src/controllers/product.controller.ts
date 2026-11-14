import type { IncomingMessage, ServerResponse } from "http";
import getProducts from "../services/product.services";

const getProductController = (req: IncomingMessage, res: ServerResponse) => {

  let url = req.url;
  let method = req.method;
  
  if (url?.startsWith("/products") && method === "GET") {

    const products = getProducts();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Here your products", data: products }));

  } else {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "There are no products" }));

  }
};

export default getProductController;
