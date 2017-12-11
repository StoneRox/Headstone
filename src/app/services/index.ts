import guards from "./guards";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./user/user.service";

let services: any[] = [
    guards,
    AuthService,
    UserService
];
export default services
