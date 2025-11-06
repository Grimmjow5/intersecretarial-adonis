import { DependenceService } from "#services/dependence_service";
import { inject } from "@adonisjs/core";
import { FactoryController } from "./factory_controller.js";
import { Dependence, IDependence } from "#models/dependence";


@inject()
export default class DependencesController
    extends FactoryController<IDependence> {
    constructor(control: DependenceService) {
        super(control);
        console.log("Se crea instalncia de servicio");
    }

   
}
