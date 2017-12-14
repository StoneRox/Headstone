import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserComponent} from "../../shared-components/user/user.component";
import {RouterModule} from "@angular/router";
@NgModule({
    declarations: [UserComponent],
    exports: [UserComponent,CommonModule,RouterModule],
    imports:[CommonModule,RouterModule]
})
export class SharedUserModule {
}
