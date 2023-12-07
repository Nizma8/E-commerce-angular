import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   server_url:string="http://localhost:3000"

   wishListCount = new BehaviorSubject(0)
   searchKey = new BehaviorSubject("")
   cartCount = new BehaviorSubject(0)
   cartTotalAmount = new BehaviorSubject(0)
  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWIshlistCount()
this.getCartCount()
    }
   }

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
  appendTokenheader =()=>{
    const token = sessionStorage.getItem("token") || ''
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {
      headers
    }
  }

  addToWishlistApi =(reqBody:any)=>{
    return this.http.post(`${this.server_url}/user/wishlist`,reqBody,this.appendTokenheader())
    }
    addToCartApi =(reqBody:any)=>{
      return this.http.post(`${this.server_url}/user/cart/add`,reqBody,this.appendTokenheader())
      }
  
getWishlistApi =()=>{
  return this.http.get(`${this.server_url}/user/wishlist`,this.appendTokenheader())
}
getCartApi =()=>{
  return this.http.get(`${this.server_url}/user/cart`,this.appendTokenheader())
}
getWIshlistCount =()=>{
  return this.getWishlistApi().subscribe((res:any)=>{
       this.wishListCount.next(res.length)
    }
  )

}
getCartCount = ()=>{
return this.getCartApi().subscribe((res:any)=>{
  this.cartCount.next(res.length)
})
}

deleteWishListItemApi = (id:any)=>{
  return this.http.delete(`${this.server_url}/user/wishlist/remove/${id}`,this.appendTokenheader())

}

// increment api
incrementCartApi(id:any){
  return this.http.get(`${this.server_url}/user/cart/increment/${id}`,this.appendTokenheader())


}
decrementCartApi(id:any){
  return this.http.get(`${this.server_url}/user/cart/decrement/${id}`,this.appendTokenheader())


}

removeCartItemApi(id:any){
 return this.http.delete(`${this.server_url}/user/card/delete/${id}`,this.appendTokenheader())
}
emptyCartApi(){
  return this.http.delete(`${this.server_url}/user/card/empty`,this.appendTokenheader())
 }
}


