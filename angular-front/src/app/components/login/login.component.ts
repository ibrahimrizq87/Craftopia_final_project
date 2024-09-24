import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  // providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  sessionError:boolean  =false;
  loginError :string ='';
  submitted: boolean = false;
  backendErrors: any = {};

  constructor(private userService: UserService ,   private router: Router) { }
  getErrorMessages(): string[] {
    const errorMessages: string[] = [];
    if (this.backendErrors) {
      Object.keys(this.backendErrors).forEach(key => {
        this.backendErrors[key].forEach((message: string) => {
          errorMessages.push(`${key}: ${message}`);
        });
      });
    }
    return errorMessages;
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('loginSession')){
      sessionStorage.removeItem('loginSession');

      this.sessionError = true;
    }
  }
  onSubmit(loginForm: any) {
    // this.backendErrors = [];
    this.loginError = '';
    this.submitted = true;
    if (loginForm.valid) {
      const formData = new FormData();

      const deviceName = getDeviceName();
      console.log(deviceName);

      if (deviceName) {
        formData.append('device_name', deviceName);

      }
      Object.keys(loginForm.value).forEach(key => {
        formData.append(key, loginForm.value[key]);
      });
   


      this.userService.login(formData).subscribe(
        response => {
          const token = response.token;
          // console.log('login successful:', response);
          // console.log('tocken:', token);

          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('logged', 'true');

          // this.router.navigate(['/home']);
          window.location.href = '/home';


          // this.router.navigate(['/home']);

        },
        error => {
          if (error.status === 400) {
            this.backendErrors = error.error.errors;

            console.error('Registration failed:', error);
            console.log('Error: ' + error.error.errors);

            Object.keys(error.error.errors).forEach(key => {
              console.log('Field:', key);

              error.error.errors[key].forEach((message: String) => {
                console.log('Error message:', message);
              });
            });
          } else if(error.status === 401){
            this.loginError = 'password is not correct, try again later';
          } else if(error.status === 404){
            this.loginError = 'email dose not exists, make suer to enter the correct email';

          }else {
            console.error('An unexpected error occurred:', error);
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
function getDeviceName(): string {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return 'Android Device';
  } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return 'iOS Device';
  } else if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  } else if (/Win/i.test(userAgent)) {
    return 'Windows PC';
  } else if (/Mac/i.test(userAgent)) {
    return 'Macintosh';
  } else if (/Linux/i.test(userAgent)) {
    return 'Linux';
  } else {
    return 'Unknown Device';
  }
}