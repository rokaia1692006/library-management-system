import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-errormsg',
  imports: [],
  templateUrl: './errormsg.component.html',
  styleUrl: './errormsg.component.scss'
})
export class ErrormsgComponent {
@Input () control !: AbstractControl | null
@Input () label !: string ;
@Input () compare !: FormGroup;

}
