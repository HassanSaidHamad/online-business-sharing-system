import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public registerNewStudent(student: User): void {
    this.authService.registerNewCustomer(student).subscribe(
      (response: User) => {
        this.router.navigateByUrl('/login');
        Swal.fire({
          icon: 'success',
          title: 'New user registered.',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to register new user',
          showConfirmButton: true,
          // timer: 1500,
        });
      }
    );
  }
}
