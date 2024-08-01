import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  ngAfterViewInit() {
    const menuButton = document.getElementById('menu-button');
    const menu = document.getElementById('menu');

    menuButton?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
    });
  }
}
