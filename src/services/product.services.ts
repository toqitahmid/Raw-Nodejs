import { readFileSync, writeFileSync} from "node:fs";
import path from "node:path";

interface Iproducts {
  id: number;
  name: string;
  price: number;
}

const cwd = process.cwd();
const setPath = path.join(cwd, "./src/db/product.json");
const getProducts = () =>  {
    const fileRead = readFileSync(setPath, 'utf8');
    return JSON.parse(fileRead);
}

const writeProducts = (payload: Iproducts[]) => {
    writeFileSync(setPath, JSON.stringify(payload));
}

export {getProducts, writeProducts};