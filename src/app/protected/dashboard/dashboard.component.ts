import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { USuario } from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  get usuario() {
    return  this.authServices.usuario;
  }

  constructor(private router: Router,
              private authServices: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigateByUrl('/auth');
    this.authServices.logout();
  }

}
