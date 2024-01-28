import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService,private router:Router) { 
    this.loginForm = new FormGroup({
      'email':new FormControl (null,[Validators.required,Validators.email]),
      'password':new FormControl (null,[Validators.required])
    });

  }

  ngOnInit() {
  }
  email = '';
  password = '';
  errorMessage = '';
  loginForm : FormGroup;
  isClicked = false;
  login(){
    if(this.authService.login(this.email,this.password)){
      this.router.navigate(['/tabs','tab1'])
    }
    else{
      this.errorMessage='Invalid username or password';
    }
  }
  onClick(){
    this.isClicked=true;
  }
}
