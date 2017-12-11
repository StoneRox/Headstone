import {RegisterComponent} from "./register/register.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";


let Components = {
    RegisterComponent,
    NotfoundComponent,
    LoginComponent,
    NavbarComponent
};
let componentsArray: any[] = Object.values(Components);
export {Components}
export default componentsArray
