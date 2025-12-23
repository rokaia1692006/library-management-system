import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { LightDarkBtnComponent } from '../../shared/components/LightDarkBtn/LightDarkBtn.component';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet,MatIcon,LightDarkBtnComponent],
  templateUrl: './auth-layout.component.html',
 styleUrls: ['./auth-layout.component.scss']

})
export class AuthLayoutComponent {


}
