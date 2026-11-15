import type { IncomingMessage, ServerResponse } from "http";
import getProducts from "../services/product.services";
import { bodyPaser } from "../utils/parseBody";
interface Iproducts {
  id: number;
  name: string;
  price: number;
}

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

const getProductById = (req: IncomingMessage, res: ServerResponse) => {
  let url = req.url;
  let method = req.method;
  let extractUrl = url?.split("/");
  let id = Number(extractUrl?.at(2));
  
  const products = getProducts();
  let product = products.find((p: Iproducts) => p.id === id);
  console.log(product);
  
  if (method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product successfully retreived",
        data: product,
      }),
    );
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product can't retrieved",
      }),
    );
  }
};


const createProduct = async(req: IncomingMessage, res: ServerResponse) => {
  try {
     const data = await bodyPaser(req,res);
     console.log(data);
     res.writeHead(200, { "Content-Type": "application/json" });
     res.end(
       JSON.stringify({
         message: "product add successfully",
       }),
     );
   } catch {
     res.writeHead(200, { "Content-Type": "application/json" });
     res.end(
       JSON.stringify({
         message: "Product can't add",
       }),
     );
   }
}

export { getProductController, getProductById, createProduct };
