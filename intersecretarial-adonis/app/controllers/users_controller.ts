import { UserService } from "#services/user_service";
import { inject } from "@adonisjs/core";
import { IUser } from "#models/user";
import { FactoryController } from "./factory_controller.js";
import type { HttpContext } from "@adonisjs/core/http";
import { StatusModel } from "#dtos/status";
import validateAdmin from "#validators/usersadmin"

@inject()
export default class UsersController extends FactoryController<IUser> {
    constructor(private control: UserService) {
        super(control);
    }

    public async restoreUser({ response, request }: HttpContext) {
        try {
            const id = request.param("id");
            const restore = await this.control.updateStatus({
                id,
                status: StatusModel.Active,
            });
            const { code, ...todo } = restore;
            return response.status(code).json(todo);
        } catch (error) {
            return response.status(error.code).json({
                success: false,
                message: error.message,
            });
        }
    }

    public async inactiveUser({ response, request }: HttpContext) {
        try {
            const id = request.param("id");
            const restore = await this.control.updateStatus({
                id,
                status: StatusModel.Inactive,
            });
            const { code, ...todo } = restore;
            return response.status(code).json(todo);
        } catch (error) {
            return response.status(error.code).json({
                success: false,
                message: error.message,
            });
        }
    }

    
    public async createUserAdmin({ response, request }: HttpContext) {
        try {
            const admin = await request.validateUsing(validateAdmin);
            let adminNew = await this.control.create({
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
}
