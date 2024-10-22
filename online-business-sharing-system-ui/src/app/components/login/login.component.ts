import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public loginUser(user: User): void {
    this.authenticationService.login(user).subscribe(
      (response: HttpResponse<User>) => {
        this.authenticationService.addUserToLocalStorage(response.body!);
        this.router.navigateByUrl('/dashboard/home');
        this.toastService.toastSuccess('You have been successfully login');
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError('Username or password incorrect');
      }
    );
  }
}
