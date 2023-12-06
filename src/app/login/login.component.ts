import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email:['',[
      Validators.required,
      Validators.email
    ]],
    password:['',[
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*')
    ]],
  })
 constructor(private fb:FormBuilder ,private api:ApiService , private route:Router){

 }

 login(){
  if(this.loginForm.valid){
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    const reqBody = {
    
      email,
      password
   }
   this.api.loginApi(reqBody).subscribe({
    next:(res:any)=>{
      console.log(res);
      sessionStorage.setItem("token",res.token)
      localStorage.setItem("existinguser",JSON.stringify(res.existinguser))
      this.route.navigateByUrl('')
    },
    error:(err:any)=>{
      console.log(err);
      
    }
   })

  }
  

  
 }


}
