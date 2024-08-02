import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check authentication status on component initialization
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngAfterViewInit() {
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');

    menuButton?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
  }

  logout(): void {
    // Log out the user and update the navigation display
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home']); // Redirect to home page after logout
  }
}
