/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from "#controllers/users_controller";
import router from "@adonisjs/core/services/router";

router.get("/", async () => "It works!");

router.group(() => {
    router.post("/users", [UsersController, "createUser"]); 
    router.put("/users",[UsersController,'updateUser']);
    router.post("/users/administrator",[UsersController,'createUserAdmin']);    

}).prefix("/api/v1");
