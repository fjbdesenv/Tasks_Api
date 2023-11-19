import { Router } from "../class";
import { MAP_PATH_ROLES } from "../conf";
import { ControllerUsuario } from "../controllers";

const RouterUsuario = (new Router(ControllerUsuario, MAP_PATH_ROLES.USUARIOS)).router;

export { RouterUsuario };
