import type { IncomingMessage, ServerResponse } from "http";
import getProducts from "../services/product.services";
import { bodyPaser } from "../utils/parseBody";
interface Iproducts {
  id: number;
  name: string;
  price: number;
}

const getProductController = (req: IncomingMessage, res: ServerResponse) => {
  
    const products = getProducts();
    let msgSuccess = products.length === 0 ? "There is no products" : "Here are your products";
    let pdtSuccess = products.length === 0 ? [] : products;
    
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `${msgSuccess}`, data: pdtSuccess }));
};

const getProductById = (req: IncomingMessage, res: ServerResponse) => {
  let url = req.url;
  let extractUrl = url?.split("/");
  let id = Number(extractUrl?.at(2));
  
  const products = getProducts();
  let product = products.find((p: Iproducts) => p.id === id);
  console.log(product);
  
  if (product) {
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
