import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  constructor(public router: Router) {}

  ngOnInit(): void {
    
  }
  
  /**
   * navigates to movie page
   * @function goToMovies
   */

  goToMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * navigates to user profile
   * @function goToProfile
   */

  goToProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * logs out an already logged in user
   * @function logOut
   */
  logOut(): void {
    this.router.navigate(["welcome"]);
  }
}
