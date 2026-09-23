import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder)
  route = inject(Router)

  authService = inject(AuthService)
  

  hasError = signal(false)
  
  registerForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    fullName: ['',[Validators.required,Validators.minLength(8)]]
  })

  onSubmit(){
    if(this.registerForm.invalid){
      this.hasError.set(true)
      setTimeout(()=>{
        this.hasError.set(false)
      },2000)

      return
    }

    const {email = '',password = '',fullName = ''} = this.registerForm.value

    this.authService.register(email!,password!,fullName!).subscribe((isAuthenticated) =>{
      if(isAuthenticated){
        this.route.navigateByUrl('/')
        return
      }

      this.hasError.set(true)
       setTimeout(()=>{
        this.hasError.set(false)
      },2000)

    }

    )

  }
}
