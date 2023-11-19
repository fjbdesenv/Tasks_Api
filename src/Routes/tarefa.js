import { Router } from "../class";
import { MAP_PATH_ROLES } from "../conf";
import { ControllerTarefa } from "../controllers";

const RouterTarefa = (new Router(ControllerTarefa, MAP_PATH_ROLES.TAREFAS)).router;

export { RouterTarefa };
