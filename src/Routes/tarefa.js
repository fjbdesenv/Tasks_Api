import { Router } from "../class";
import { mapPathRoles } from "../conf";
import { ControllerTarefa } from "../controllers";

const RouterTarefa = (new Router(ControllerTarefa, mapPathRoles.TAREFAS)).router;

export { RouterTarefa };
