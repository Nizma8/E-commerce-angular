import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   server_url:string="http://localhost:3000"
  constructor(private http:HttpClient) { }

  // get all projects

getAllProjects = ()=>{
   return this.http.get(`${this.server_url}/products/all`)
  }
//view products

  viewProApi=(id:any)=>{
   return this.http.get(`${this.server_url}/products/view/${id}`)
  }

  // register
  registerApi =(user:any)=>{
    return this.http.post(`${this.server_url}/user/register`,user)
  }

  //login
  loginApi = (user:any)=>{
    return this.http.post(`${this.server_url}/user/login`,user)

  }

}


