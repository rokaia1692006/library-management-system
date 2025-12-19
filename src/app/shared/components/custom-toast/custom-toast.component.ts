import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-custom-toast',
  imports: [MatIcon],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss'
})
export class CustomToastComponent {
constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, icon: string }) {}
}
