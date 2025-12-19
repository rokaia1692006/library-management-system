import { Component, HostListener, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoaderServiceService } from '../../services/loader-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loggedin = false;
  menuOpen = false;

  private router = inject(Router);
  private loaderService = inject(LoaderServiceService);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
        if (window.innerWidth <= 1024) this.menuOpen = false;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 700) this.menuOpen = false;
  }

  get hide() {
    return window.innerWidth <= 700 && !this.menuOpen;
  }
}
