// angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  data = {
    username: '',
    password: '',
  };

  login() {
    const data = {
      username: this.data.username,
      password: this.data.password,
    };

    this.userService.create(data).subscribe({
      next: (res) => {
        console.log("res", res);
        localStorage.setItem("username", this.data.username)
        this.data = {
          username: '',
          password: '',
        }
        this.router.navigate(['/manage-resident']);
      },
      error: (e) => {
        console.log(e);
        
          alert("Username or password invalid")
      }
    });
  }
}
