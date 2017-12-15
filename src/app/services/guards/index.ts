import {AuthGuard} from "./auth/auth.guard";
import {AdminGuard} from "./admin/admin.guard";
let guards = {
  AuthGuard,
    AdminGuard
};
export default  Object.values(guards);
export let Guards = guards;
