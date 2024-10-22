import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public currentUser!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.getUserToLocalStorage();
  }

  public logOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    this.toastService.toastSuccess('Logout Success');
  }

  // GET USER ROLES
  public getUserRole(): string {
    return this.authenticationService.getUserToLocalStorage().role;
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ROLE_ADMIN;
  }

  public get isCustomer(): boolean {
    return this.getUserRole() === Role.ROLE_CUSTOMER;
  }
}
