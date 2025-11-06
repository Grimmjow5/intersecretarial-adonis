import mongoose, { Document, Schema } from "mongoose";
import { StatusModel } from "../dtos/status.js";
import timeNowPosh from "#utils/timeNowPosh";

export interface IDependence extends Document {
    name: string;
    nameNormalized: string;
    status: StatusModel;
}

const DependenceSchema = new Schema<IDependence>({
    name: { type: String, required: true, unique: true },
    nameNormalized: { type: String },
    status: {
        type: String,
        enum: Object.values(StatusModel),
        default: StatusModel.Active,
    },
});

DependenceSchema.pre("save", function (next) {
    const now = timeNowPosh();
    this.set('createdAt',now);
    this.set('updateAt',now);
    next();
});

DependenceSchema.pre('updateOne', function(next){
    const now = timeNowPosh();
    this.set('updateAt',now);
    next();
});

DependenceSchema.set("toJSON",{
    virtuals:true,
    versionKey:false,
    transform:(_,ret)=>{
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Dependence = mongoose.model('dependencies',DependenceSchema);