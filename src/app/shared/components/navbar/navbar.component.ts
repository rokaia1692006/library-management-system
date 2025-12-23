import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { LightDarkBtnComponent } from '../LightDarkBtn/LightDarkBtn.component';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [NgIf, NgFor, NgClass, NgStyle, MatIcon, LightDarkBtnComponent]
})
export class NavbarComponent implements AfterViewInit {
  tabs = [
    { title: 'Dashboard', path: '/admin/dashboard' },
    { title: 'Books', path: '/admin/books' },
    { title: 'Reports', path: '/admin/reports' },
    { title: 'Inventory', path: '/admin/orders' }
  ];
  currentTitle = '';
  menuOpen = false;
  activeTabWidth = 0;
  activeTabLeft = 0;
  isDark = false;

  constructor(private el: ElementRef, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url;
        const tab = this.tabs.find(t => currentPath.includes(t.path));
        if (tab) {
          this.currentTitle = tab.title;
          setTimeout(() => this.setBubblePosition(), 0);
        }
      });
  }

  ngAfterViewInit() {
    this.checkTheme();
    setTimeout(() => this.setBubblePosition(), 0);
    const observer = new MutationObserver(() => {
this.checkTheme();
    });
    observer.observe(document.body,{attributes: true , attributeFilter: ['class'] });
  }

  selectTab(tab: any) {
    this.router.navigateByUrl(tab.path);
    this.menuOpen = false;
  }

  setBubblePosition(element?: HTMLElement) {
    const activeEl = element || Array.from( this.el.nativeElement.querySelectorAll('a') as NodeListOf<HTMLElement>)
      .find(a => a.textContent?.trim() === this.currentTitle);
    if (activeEl) {
      this.activeTabWidth = activeEl.offsetWidth;
      this.activeTabLeft = activeEl.offsetLeft;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.setBubblePosition();
     if (window.innerWidth >= 1024) {
    this.menuOpen = false;
  }
  }
 

drawerBg = '';
  checkTheme() {
    this.isDark = document.body.classList.contains('dark-theme');
    const bodyStyle = getComputedStyle(document.body);
  this.drawerBg = this.isDark
    ? bodyStyle.getPropertyValue('--surface-dark') || '#192633' 
    : bodyStyle.getPropertyValue('--surface-light') || '#E6F0FF';
  }
}
