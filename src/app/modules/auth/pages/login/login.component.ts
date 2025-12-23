import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ErrormsgComponent } from '../../../../shared/components/errormsg/errormsg.component';
// import { AuthServicesService } from '../../services/auth-services.service';
import { inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoaderServiceService } from '../../../../shared/services/loader-service.service';
 import { Login } from '../../models/login';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule, ErrormsgComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  private loaderService = inject(LoaderServiceService);
  sucess : boolean | null = false;
  apiError: string | null = null;
private router = inject(Router);
// private readonly authService = inject(AuthServicesService)
  LoginForm = new FormGroup({

email : new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
password : new FormControl('',[Validators.required,Validators.minLength(8)]),
RememberME : new FormControl(false)
})

  getValues(){
      this.loaderService.show();
    if(this.LoginForm.valid){
      const data : Login={

        email: this.LoginForm.get('email')?.value!,
        password: this.LoginForm.get('password')?.value!
      }
       this.router.navigate(['/admin/dashboard']).then(()=>{
              this.loaderService.hide();
           });

      this.LoginForm.reset();

//       this.authService.login(data).subscribe({
//         next:(res)=>{
//           console.log('wth',res);
//           if(res.message == 'success'){
const remember = !!this.LoginForm.get('RememberME')?.value;
//             this.LoginForm.reset();
//   this.sucess = true;
// this.authService.setToken(res.token,remember);

//             this.router.navigate(['/dashboard']).then(()=>{
//               this.loaderService.hide();
//             });
//           }
//         },
//         error:(err)=>{
//           this.loaderService.hide();
//           console.error('FAILED' , err.error);

//          this.apiError= err.error?.message || "Try Again";

//         }
//       })
//       //send back
//     }
    }
    else{
      this.loaderService.hide();
      this.LoginForm.markAllAsTouched();

    }

  }

}
