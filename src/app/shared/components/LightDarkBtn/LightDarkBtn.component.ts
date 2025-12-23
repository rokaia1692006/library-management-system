import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-LightDarkBtn',
  imports: [NgIf,MatIcon],
  templateUrl: './LightDarkBtn.component.html',
  styleUrls: ['./LightDarkBtn.component.scss']
})
export class LightDarkBtnComponent {
isDark = false;
    isanimate = false;
    ngOnInit() {
    const theme = localStorage.getItem('theme') || 'light';
  this.isDark = theme === 'dark';
   document.body.classList.add(
      this.isDark ? 'dark-theme' : 'light-theme'
    );
 
  }
  ChangeTheme() {
    if(this.isanimate) return;
    this.isanimate = true;
    setTimeout(() => {
    this.isDark = !this.isDark;
   document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme', !this.isDark);
  localStorage.setItem('theme', this.isDark ? 'dark' : 'light');

  },150);
  setTimeout(() => {
    this.isanimate = false;
  }, 600);
  }
}
