import { Router } from "../class";
import { mapPathRoles } from "../conf";
import { ControllerUsuario } from "../controllers";

const RouterUsuario = (new Router(ControllerUsuario, mapPathRoles.USUARIOS)).router;

export { RouterUsuario };
