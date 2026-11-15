import type { IncomingMessage, ServerResponse } from "http";

export const bodyPaser = (req: IncomingMessage, res: ServerResponse): Promise<any> => {
    let body = "";
    return new Promise((resolve, reject) => {
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            try{
                resolve(body);
            }
            catch(error){
                reject(error)
            }
        })
    })
}