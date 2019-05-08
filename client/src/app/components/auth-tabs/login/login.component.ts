import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  errorMessage: String

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      this.tokenService.SetToken(data.token)
      this.loginForm.reset();
      this.router.navigate(['home'])
    },
    err => {
      console.log(err);
      if (err.error.msg) {
        this.errorMessage = err.error.msg[0].message;
      }

      if (err.error.message) {
        this.errorMessage = err.error.message;
      }
    })
  }

}
