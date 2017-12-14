import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "../../lazy-routed-components/users/users.component";

const routes: Routes = [
    { path: '', component: UsersComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes),CommonModule],
    declarations: [UsersComponent]
})
export class UsersModule {
}
