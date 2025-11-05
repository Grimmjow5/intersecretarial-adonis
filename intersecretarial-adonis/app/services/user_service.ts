import { IUser, User } from "#models/user";
import { inject } from "@adonisjs/core";
import { Model } from "mongoose";
import { ResponseType } from "#dtos/response";

@inject()
export class UserService {
  private readonly modelUser: Model<IUser> = User;

  public async createUser(
    user: Partial<IUser>,
  ): Promise<ResponseType> {
    try {
      const userNew = new this.modelUser(user);
      const register = await userNew.save();
      let res: ResponseType = {
        message: "Usuario creado",
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
  public async updateUser(user: Partial<IUser>): Promise<ResponseType> {
    try {      
      let userUpdate = await this.modelUser.findByIdAndUpdate(
        user.id,
        { $set: user },
        { new: true },
      );
      if (!userUpdate) throw new Error("No se encontro Usuario");

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
}
