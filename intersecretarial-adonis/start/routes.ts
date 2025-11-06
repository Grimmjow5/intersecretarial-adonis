/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import DependencesController from "#controllers/dependences_controller";
import UsersController from "#controllers/users_controller";
import router from "@adonisjs/core/services/router";

router.get("/", async () => "It works!");

//Users
router.group(() => {
    router.post("/users", [UsersController, "create"]);
    router.get("/users", [UsersController, "getAll"]);    
    router.put("/users", [UsersController, "update"]);
    router.put("/users/restore/:id", [UsersController, "restoreUser"]);
    router.delete("/users/:id", [UsersController, "inactiveUser"]);
    router.post("/users/administrator", [UsersController, "createUserAdmin"]);

    //Dependencias
}).prefix("/api/v1");

router.group(() => {
    router.post("dependencies", [DependencesController, "create"]);
    router.get("dependencies/todos", [DependencesController, "getAll"]);
}).prefix("/api/v1");
