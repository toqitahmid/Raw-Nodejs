import type { IncomingMessage, ServerResponse } from "http";
import getProductController from "../controllers/product.controller";
import rootCotroller from "../controllers/root.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  console.log(req.method);

  if (req.url === "/") {
    rootCotroller(req,res);
  } 
  else if (req.url?.startsWith("/products")) {
    getProductController(req, res);
  }
};

export default routeHandler;
