import { ResponseType } from "#dtos/response";
import { Document } from "mongoose";

export interface IServiceRepo<T extends Document>{    
    create(model:Partial<T>):Promise<ResponseType>;
    update(model:Partial<T>):Promise<ResponseType>;
}