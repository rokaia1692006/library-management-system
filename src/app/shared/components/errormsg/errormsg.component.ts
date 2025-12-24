import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-errormsg',
  imports: [NgIf],
  templateUrl: './errormsg.component.html',
  styleUrls: ['./errormsg.component.scss']
})
export class ErrormsgComponent {
@Input() control!: AbstractControl | null;
@Input() label!: string;
@Input() patternMsg: string = 'Invalid format.';
@Input() mismatchMsg: string = 'Values do not match.';
}
