import { Router } from "../class";
import { ControllerUsuario } from "../controllers";

const RouterUsuario = (new Router(ControllerUsuario)).router;

export { RouterUsuario };
