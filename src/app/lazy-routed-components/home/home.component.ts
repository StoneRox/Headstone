import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {CategoryService} from "../../services/category/category.service";
import {ArticleService} from "../../services/article/article.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser;
    categories;
    error:string;
    searchQuery:string;
    articles;
  constructor(private user:UserService, private Article:ArticleService,private category:CategoryService) { }

  ngOnInit() {
      this.currentUser = this.user.current();
      this.category.getAll().subscribe(c=>{
          if(!c['error']){
              this.categories = c;
          }
          else {
              this.error = c['error']
          }
      })
  }
    search(e){
        e.preventDefault();
        this.Article.query({title:(this.searchQuery||'')+'$regex'}).subscribe(articles=>{
            if(!articles['error']){
                this.articles = articles;
            }
        })
    }

    inputToProp(e) {
        this.searchQuery = e.target.value;
    }

}
