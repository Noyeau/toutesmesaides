import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appPage',
  templateUrl: './appPage.component.html',
  styleUrls: ['./appPage.component.css']
})
export class AppPageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  logOut(){
    this.authService.signOut()
    this.router.navigate(['/'])
  }
}
