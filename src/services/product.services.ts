import { readFileSync, Utf8Stream } from "node:fs";
import path from "node:path";

const getProducts = () =>  {
    const cwd = process.cwd();
    const setPath = path.join(cwd, "./src/db/product.json");
    const fileRead = readFileSync(setPath, 'utf8');
    return JSON.parse(fileRead);
}

export default getProducts;