import type { IncomingMessage, Server, ServerResponse } from "http";
import { getProducts, writeProducts } from "../services/product.services";
import { bodyPaser } from "../utils/parseBody";
import { json } from "stream/consumers";
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
    const products = getProducts();
    products.push(data);
    writeProducts(products);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
         message: "product add successfully",
         data: data,
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


const modifyProduct = async(req: IncomingMessage, res: ServerResponse) => {
  const data:Iproducts = await bodyPaser(req,res);
  const products: Iproducts[] = getProducts();
  let index = products.findIndex((p:Iproducts) => p.id === data.id);
  console.log(index)

  if(index < 0){
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Product can't modified"}))
  }

  products[index] = {...data};
  writeProducts(products);
  if(products){
    res.writeHead(200,{"Content-type": "application/json"});
    res.end(JSON.stringify({message: "Product update successfully!", data: data}));
  }
  else{
    res.writeHead(200,{"Content-type": "application/json"});
    res.end(JSON.stringify({message: "Product didn't update successfully!"}));
  }

}

export { getProductController, getProductById, createProduct, modifyProduct };
