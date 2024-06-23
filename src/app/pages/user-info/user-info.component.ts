import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-info.component.html',
})
export default class UserInfoComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  //Data
  public user = this.userService.user();

  ngOnInit(): void {
    //Si no existe un usuario, lo enviamos al login
    if (!this.user) this.router.navigateByUrl('/login');
  }
}
