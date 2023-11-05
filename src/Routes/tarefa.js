import { Router } from "../class";
import { ControllerTarefa } from "../controllers";

const RouterTarefa = (new Router(ControllerTarefa)).router;

export { RouterTarefa };
