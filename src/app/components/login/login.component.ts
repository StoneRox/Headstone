import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import InputErrorMessagesModel from "../../models/input-error-messages.model";
import {generateValidators, trimFormInputs} from "../../utils/form-helper";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    error: Object = {
        get(prop: string) {
            return this[prop]
        }
    };
    errorMessages: Object = InputErrorMessagesModel;
    controlsNames: string[];
    messageOnSuccess: string;
    sub$;

    constructor(private fb: FormBuilder, private auth: AuthService,private user:UserService,private router:Router) {
    }

    sendErrorMessage(propName: string, c: AbstractControl, submit?: boolean) {
        if ((c.dirty && c.errors) || (submit && c.errors)) {
            for (let key of  Object.keys(c.errors)) {
                if (this.errorMessages[key]) {
                    this.error[propName] = this.errorMessages[key](propName, c.errors[key], key);
                    break
                }
            }
        }
        else {
            delete this.error[propName]
        }
    }

    save() {
        trimFormInputs(this.loginForm);
        if (this.loginForm.invalid) {
            this.controlsNames.forEach(name => {
                this.sendErrorMessage(name, this.loginForm.controls[name], true)
            });
        }
        else {
            let reqBody = {username: this.loginForm.value.username, password: this.loginForm.value.password};
            this.sub$.push(this.auth.login(reqBody).subscribe((res) => {
                    if (res['error']) {
                        this.error['username'] = "Invalid username or password";
                        this.error['password'] = "Invalid username or password"
                    }
                    else {
                        this.messageOnSuccess = 'Login success';
                        setTimeout(() => {
                            this.messageOnSuccess = '';
                        }, 3000);
                        this.loginForm.reset();
                        this.user.remember(res);
                        this.router.navigate(['/'])
                    }
                }
            ))
        }
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', generateValidators(true, '[a-zA-Z0-9]+', 4, 14)],
            password: ['', generateValidators(true, '[a-zA-Z0-9]+', 5, 12)]
        });
        this.sub$ = Object.keys(this.loginForm.controls).map(key => {
            let control = this.loginForm.get(key);
            return control.valueChanges
                .debounceTime(900)
                .subscribe(() => {
                    this.sendErrorMessage(key, control)
                })
        });
        this.controlsNames = Object.keys(this.loginForm.controls);
    }

    ngOnDestroy() {
        this.sub$.forEach(s => {
            s.unsubscribe()
        })
    }

    checkBoxChangeValue(e) {
        this.loginForm.controls[e.target.id].setValue((!eval(e.target.value)).toString());
    }
}
