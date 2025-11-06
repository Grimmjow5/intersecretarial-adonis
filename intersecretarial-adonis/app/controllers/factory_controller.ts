import { Fabrica } from "#services/fabrica";
import type { HttpContext } from "@adonisjs/core/http";
import { Document } from "mongoose";
import createUserValidador from "#validators/user"


export abstract class FactoryController<T extends Document>{

    constructor(private readonly servicio:Fabrica<T>){

    }
    public async create({ request, response }: HttpContext) {
            try {
                const body = await request.body();
                const newDependence = await this.servicio.create(body);
                const { code, ...res } = newDependence;
                return response.status(code).json(res);
            } catch (error) {
                return response.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
  public async update({request,response}:HttpContext){
        try {
            const item = await request.validateUsing(createUserValidador);            
            const updateItem = await this.servicio.update(item);
            const {code,...itemUpdate} = updateItem;
            return response.status(code).json(itemUpdate);
        } catch (error) {
            return response.status(error.code).json({success:false,message:error.message});
        }
    }
        public async getAll({response}:HttpContext){
            let lista = await this.servicio.getAll();
            return response.json(lista);
        }
}
