import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser:string;
    constructor(private user: UserService,private auth: AuthService, private router:Router) {
    }

    ngOnInit() {
        this.currentUser = this.user.current()['username']
    }

    logout() {
        this.auth.logout().subscribe(res=>{
            if(!res['error']){
                delete localStorage.user;
                this.currentUser = null;
                this.router.navigate(['/login'])
            }
        })
    }
}
