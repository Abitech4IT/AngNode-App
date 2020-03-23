import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit, OnDestroy{
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authservice: AuthService){}

    ngOnInit() {
        this.authStatusSub = this.authservice.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onLogin(form: NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading = true;
        this.authservice.loginUser(form.value.email, form.value.password);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }

}