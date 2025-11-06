import { Dependence, IDependence } from "#models/dependence";
import { inject } from "@adonisjs/core";
import { Document, Model } from "mongoose";
import { Fabrica } from "./fabrica.js";

@inject()
export class DependenceService  extends Fabrica<IDependence>  {
  

  constructor(modelService: Model<IDependence>) {
    super(modelService);
    
  }
 
/*
  public static get getInstance() {
    if (!DependenceService.instance) {
      DependenceService.instance = new DependenceService(Dependence);
    }
    return DependenceService.instance;
  }*/
}
