import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../services/category/category.service";
import {} from "../../services/user/user.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-category-control',
  templateUrl: './categoryControl.component.html',
  styleUrls: ['./categoryControl.component.css']
})
export class CategoryControlComponent implements OnInit {
    sub$: any[]=[];
    category;
    error:string;
    edit:boolean;
  constructor(private route:ActivatedRoute, private Category:CategoryService) { }

  ngOnInit() {
      this.sub$.push(this.route.params.subscribe(params => {
          let queryProp = Object.keys(params)[0];
          let queryValue = params[queryProp];
          this.edit = !!queryProp;
          if(params[queryProp]){
              this.sub$.push(this.Category.query({[queryProp]:queryValue}).subscribe(categories=>{

                      if(!categories['error']){
                          this.category = categories[0];
                      }
                      else {
                          this.error = categories['error']
                      }
                  }

              ))
          }
      }));
  }

}
