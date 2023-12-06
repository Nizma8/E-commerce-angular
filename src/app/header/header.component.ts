import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

   username:string=""
   count:Number=0
   cartCount:Number=0
   searchString:string =""
   constructor(private api:ApiService){}
   ngOnInit(): void {
     if(localStorage.getItem("existinguser")){
      this.username=JSON.parse(localStorage.getItem("existinguser")||"").username
    this.getWishListCoun()
    this.getCartCoun()
     }else{
      this.username =""
      this.count=0
     }
   }

   getWishListCoun(){
    this.api.wishListCount.subscribe((res:any)=>{
      this.count = res
      
    })
   }
   getCartCoun(){
    this.api.cartCount.subscribe((res:any)=>{
       this.cartCount =res
    })
   }

   getSearchKey(search:any){
    this.api.searchKey.next(search.value)
   }
   logout(){
    localStorage.removeItem("existinguser")
    sessionStorage.removeItem("token")
    this.username=""
   }
}
