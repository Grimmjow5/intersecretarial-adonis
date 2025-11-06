import { ResponseType } from "#dtos/response";
import { Document, Model } from "mongoose";
import { IServiceRepo } from "./IServiceRepo.js";




export abstract class Fabrica<T extends Document> implements IServiceRepo<T> {
    protected readonly modelRepo: Model<T>;
    
    constructor(model: Model<T>) {
        this.modelRepo = model;
        console.log("Secrea model");
    }

    public async create(
        user: Record<string,any>,
    ): Promise<ResponseType> {
        try {
            const userNew = new this.modelRepo(user);
            const register = await userNew.save();
            let res: ResponseType = {
                message: "Registro creado",
                data: register,
                success: true,
                code: 201,
            };
            return res;
        } catch (error) {
            const res: ResponseType = {
                success: false,
                message: error.message,
                data: null,
                code: 500,
            };
            return res;
        }
    }
    public async update(model: Record<string,any> ): Promise<ResponseType> {
        try {
            
            let userUpdate = await this.modelRepo.findByIdAndUpdate(
                model.id,
                { $set: model },
                { new: true },
            );
            if (!userUpdate) throw new Error("No se encontro Registro");

            const res: ResponseType = {
                success: true,
                message: "Usuario Actualizado Correctamente",
                code: 200,
                data: userUpdate,
            };

            return res;
        } catch (error) {
            let res: ResponseType = {
                code: 500,
                data: null,
                message: error.message,
                success: false,
            };
            return res;
        }
    }
    public async getAll():Promise<Array<T>>{
        let all = await this.modelRepo.find();
        return all;
    }


}
