import env from '#start/env';
import type { ApplicationService } from '@adonisjs/core/types'
import mongoose from 'mongoose'

export default class MongoProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

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