import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CategoryFormComponent} from "../../shared-components/categoryForm/categoryForm.component";
@NgModule({
    declarations: [CategoryFormComponent],
    exports: [CategoryFormComponent,CommonModule,RouterModule],
    imports:[CommonModule,RouterModule]
})
export class SharedCategoryFormModule {
}
