import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 cart:any=[]
 cartTotalPrice:Number=0
 constructor(private api:ApiService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }else{
      alert("please login")
    }
  }

  getCart(){
this.api.getCartApi().subscribe({
  next:(res:any)=>{
  this.cart=res
  console.log(this.cart);
  
  console.log(this.cart);
  this.api.getCartCount()
  this.getCartTotalPrice()
  },error:(err:any)=>{
    alert(err.error)
  }
})
  }
  getCartTotalPrice(){
    if(this.cart.length>0){
      let total=0
      this.cart.forEach((item:any)=>{
        total+=item.totalPrice
        this.cartTotalPrice = Math.ceil(total)
      })
    }else{
      this.cartTotalPrice=0
    }
  }
  increment(id:any){
   this.api.incrementCartApi(id).subscribe({
    next:(res:any)=>{
      this.getCart()
      this.getCartTotalPrice()
      this.api.getCartCount()
    },
    error:(err:any)=>{
      console.log(err.error);
      
    }
   })
  }

  decrement(id:any){
    this.api.decrementCartApi(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
     })
  }
  removeItem(id:any){
    this.api.removeCartItemApi(id).subscribe({
      next:(res:any)=>{
        this.getCart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      }, error:(err:any)=>{
        console.log(err.error);
        }})}

  emptyCart(){
    this.api.emptyCartApi().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.getCart()
        this.getCartTotalPrice()
        this.api.getCartCount()
      }, error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }
}
