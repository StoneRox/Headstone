import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-category-form',
    templateUrl: './categoryForm.component.html',
    styleUrls: ['./categoryForm.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

    @Input() category: string;
    @Input() edit: string;
    error: string;
    sub$:any[]=[];
    oldName:string;
    params;
    constructor(private Category: CategoryService,private router:Router, private route:ActivatedRoute) {
    }

    ngOnInit() {
        if(this.edit){
            this.sub$.push(this.route.params.subscribe(params => {
                this.params = params;


            }));

        }
    }

    ngOnDestroy() {
        this.sub$.forEach(s=>{
            s.unsubscribe();
        })
    }

    inputToProp(e) {
        this.category = e.target.value;
        setTimeout(() => {
            if (!this.category) {
                this.error = 'The category name is required'
            }
            else if (this.category && !this.category.match(/^[a-zA-Z-]{3,}$/)) {
                this.error = 'The category name should be at least 3 latin letters and can contain "-"'
            }
            else {
                this.error = '';
            }
        }, 1000)
    }
    remove(){
        if(this.params && this.params['name']){
            this.sub$.push(this.Category.remove(this.params['name']).subscribe(res=>{
                if(res['error']){
                    this.error = res['error'];
                    setTimeout(()=>{
                        this.error =''
                    },3000)
                }
                else {
                    this.router.navigate(['/'])
                }
            }))
        }
    }
    save(e) {
        e.preventDefault();
        if (this.category && !this.error) {
            if(this.edit && this.params){
                let queryProp = Object.keys(this.params)[0];
                let queryValue = this.params[queryProp];
                if(queryValue){
                    this.sub$.push(this.Category.edit(queryValue,{name: this.category}).subscribe(res => {
                        if(!res['error']){
                            this.router.navigate(['/'])
                        }
                        else{
                            this.error = res['error'];
                            setTimeout(()=>{
                                this.error =''
                            },3000)
                        }
                    }))
                }

            }
            else{
                this.sub$.push(this.Category.create({name: this.category}).subscribe(res => {
                    if(!res['error']){
                        this.router.navigate(['/'])
                    }
                    else{
                        this.error = res['error'];
                        setTimeout(()=>{
                            this.error =''
                        },3000)
                    }
                }))
            }

        }
    }
}
