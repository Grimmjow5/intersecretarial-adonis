import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import createUserValidador from "#validators/user";
import { IUser } from "#models/user";
import validateAdmin from "#validators/usersadmin";
import mongoose, { MongooseError } from "mongoose";
import { json } from "stream/consumers";

@inject()
export default class UsersController {
    constructor(private readonly serviceUser: UserService) {}

    public async createUser({ request, response }: HttpContext) {
        try {
            const userValidado = await request.validateUsing(
                createUserValidador,
            );
            const userInsert = userValidado as Partial<IUser>;
            const newUser = await this.serviceUser.createUser(userInsert);
            const { code, ...res } = newUser;
            return response.status(code).json(res);
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    public async createUserAdmin({ response, request }: HttpContext) {
        try {
            const admin = await request.validateUsing(validateAdmin);
            let adminNew = await this.serviceUser.createUser({
                ...admin,
                permissions: { administrator: true },
            });
            const { code, ...res } = adminNew;
            return response.status(code).json(res);

        } catch (error) {
            return response.status(500).json({
                success: 500,
                message: error.message,
            });
        }
    }
    
    public async updateUser({request,response}:HttpContext){
        try {
            const user = await request.validateUsing(createUserValidador);
            const userDecode = user as Partial<IUser>;
            const updateUser = await this.serviceUser.updateUser(userDecode);
            const {code,...userUpdate} = updateUser;
            return response.status(code).json(userUpdate);
        } catch (error) {
            return response.status(error.code).json({success:false,message:error.message});
        }
    }
}
