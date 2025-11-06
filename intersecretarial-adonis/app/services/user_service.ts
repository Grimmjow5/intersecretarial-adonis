import { IUser, User } from "#models/user";
import { inject } from "@adonisjs/core";
import { Fabrica } from "./fabrica.js";
import { Model } from "mongoose";
import { ResponseType } from "#dtos/response";

@inject()
export class UserService extends Fabrica<IUser> {
    constructor(modelService: Model<IUser>) {
        super(modelService);
    }

    public override async update(
        model: Record<string, any>,
    ): Promise<ResponseType> {
        if (model.status) {
            delete model.status;
        }
        return await super.update(model);
    }
    public async updateStatus(model: Record<string, any>): Promise<ResponseType>{
        return await super.update(model);
    }
}
