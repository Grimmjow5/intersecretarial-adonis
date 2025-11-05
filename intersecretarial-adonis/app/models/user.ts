import mongoose, { Document, Schema } from "mongoose";
import timeNowPosh from "#utils/timeNowPosh";

export enum StatusUser {
    Active = "active",
    Inactive = "inactive",
}

export type Permisos = {
    administrator: boolean;
    users: {
        read: boolean;
        create: boolean;
        edit: boolean;
        restore: boolean;
        delete: boolean;
    };
    dependencies: {
        read: boolean;
        create: boolean;
        edit: boolean;
        restore: boolean;
        delete: boolean;
    };
    administrativeUnits: {
        read: boolean;
        create: boolean;
        restore: boolean;
        delete: boolean;
    };
    administrativeUnitsInformation: {
        read: boolean;
        edit: boolean;
        allowed: Array<mongoose.Types.ObjectId>;
    };
    [key: string]: any;
};

export interface IUser extends Document {
    userName: string;
    password: string;
    name: string;
    position: string;
    degree: string;
    email: string;
    phone: string;
    permissions: Partial<Permisos>;
    status: StatusUser;
    createdAt: number;
    updatedAt: number;
}

const UserSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: [true, "El userName ya existe"],
    },
    password: { type: String, required: true },
    name: { type: String },
    position: { type: String },
    degree: { type: String },
    email: { type: String, unique: [true, "El correo ya existe"] },
    phone: { type: String },
    status: {
        type: String,
        enum: Object.values(StatusUser),
        default: StatusUser.Active,
    },
    permissions: {
        administrator: { type: Boolean, default: false },
        users: {
            read: { type: Boolean, default: false },
            create: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            restore: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
        },
        dependencies: {
            read: { type: Boolean, default: false },
            create: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            restore: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
        },
        administrativeUnits: {
            read: { type: Boolean, default: false },
            create: { type: Boolean, default: false },
            restore: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
        },
        administrativeUnitsInformation: {
            read: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            allowed: [{ type: Schema.Types.ObjectId, red: "secretarias" }],
        },
    },
    createdAt: { type: Number },
    updatedAt: { type: Number },
}, { timestamps: false });

UserSchema.pre('save',function (next) {
    const now = timeNowPosh();
    this.set("createdAt",now);
    this.set("updatedAt",now);
    next();    
});

UserSchema.pre('updateOne',function (next) {
    const now = timeNowPosh();
    this.set("updatedAt",now);
    next();    
});

//Esta parte es para que cuando se conviera de objetos a json => 
// caambia en nombre de _id a id 

UserSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,//tambien quita a version de documento
    transform:(_,ret)=>{
        ret.id = ret._id;
        delete ret._id;
    }
});

export const User = mongoose.model("users",UserSchema);
