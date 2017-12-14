import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {
    private sub$: any[] = [];
    searchQuery:string;
    users;
    error:string;
    constructor(private route: ActivatedRoute,private User:UserService) { }

    ngOnInit() {
        this.sub$.push(this.route.queryParams.subscribe(params => {
            this.sub$.push(this.User.query(params).subscribe(users=>{
                    if(!users['error']){
                        this.users = users;
                    }
                    else {
                        this.error = users['error']
                    }
                }
            ))
        }));
    }

    ngOnDestroy() {
        this.sub$.forEach(s=>{
            s.unsubscribe();
        })
    }
    search(e){
        e.preventDefault();
        this.User.query({username:this.searchQuery}).subscribe(users=>{
            if(!users['error']){
                this.users = users;
            }
        })
    }

    inputToProp(e) {
        this.searchQuery = e.target.value;
    }
}
