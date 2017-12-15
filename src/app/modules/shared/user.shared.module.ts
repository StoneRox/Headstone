import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserComponent} from "../../shared-components/user/user.component";
import {RouterModule} from "@angular/router";
import {PipeModule} from "../pipe/pipe.module";
@NgModule({
    declarations: [UserComponent],
    exports: [UserComponent,CommonModule,RouterModule,PipeModule],
    imports:[CommonModule,RouterModule,PipeModule]
})
export class SharedUserModule {
}
