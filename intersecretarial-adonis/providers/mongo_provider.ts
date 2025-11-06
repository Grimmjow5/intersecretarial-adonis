import DependencesController from '#controllers/dependences_controller';
import { Dependence } from '#models/dependence';
import { User } from '#models/user';
import { DependenceService } from '#services/dependence_service';
import { Fabrica } from '#services/fabrica';
import { UserService } from '#services/user_service';
import env from '#start/env';
import type { ApplicationService } from '@adonisjs/core/types'
import mongoose from 'mongoose'

export default class MongoProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.singleton(DependenceService,()=>{
      return new DependenceService(Dependence); 
    });
    let ss =  new DependenceService(Dependence); 
    this.app.container.singleton(DependencesController,()=>{
      return new DependencesController(ss);
    })

    this.app.container.singleton(UserService,()=>{
      return new UserService(User);
    });
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    await mongoose.connect(env.get("URL_MONGO"));
  }

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}