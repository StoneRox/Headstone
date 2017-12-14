import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../../services/article/article.service";

@Component({
  selector: 'app-userDetails',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.css']
})
export class UserDetailsComponent implements OnInit,OnDestroy {
    user;
    articles;
    error:string;
    sub$:any[]=[];
  constructor(private route: ActivatedRoute,private User:UserService,private Article:ArticleService) { }

  ngOnInit() {
      this.sub$.push(this.route.params.subscribe(params => {
          let queryProp = Object.keys(params)[0];
          let queryValue = params[queryProp];
          if(params[queryProp]){
              this.sub$.push(this.User.query({[queryProp]:queryValue}).subscribe(user=>{
                      if(!user['error']){
                          this.user = user[0];
                          this.sub$.push(this.Article.query({author:user[0]['username']}).subscribe(articles=>{
                                  if(!user['error']){
                                      this.articles = articles;
                                  }
                                  else {
                                      this.error = user['error']
                                  }
                              }
                          ))
                      }
                      else {
                          this.error = user['error']
                      }
                  }
              ))
          }
      }));
  }
    ngOnDestroy() {
        this.sub$.forEach(s=>{
            s.unsubscribe();
        })
    }

}
