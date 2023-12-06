import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any=[]
  searchKey:string=""
  constructor(private api:ApiService){
   
  }

  ngOnInit(): void {
    this.getAllProduct()
    this.api.searchKey.subscribe((data:any)=>{
    this.searchKey = data
    })
  }
  getAllProduct = ()=>{
     ( this.api.getAllProjects()).subscribe({
      next:(res:any)=>{
        this.allProducts=res
        // console.log(this.allProducts);
        
      },
      error:(res:any)=>{
        console.log(res.message);
        
      }
     })
  }
  addtoWishlist = (product:any)=>{
    if(sessionStorage.getItem("token")){
      this.api.addToWishlistApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getWIshlistCount()
          alert(`${res.title} add to your wishlist`)
          
        },
        error:(err:any)=>{
          alert(err.error)
        }
      })
    }else{
alert("please login")
    }
  }

  addtoCart = (products:any)=>{
    // add quantity key with value as 1 to product object
   if(sessionStorage.getItem("token")){
    Object.assign(products,{quantity:1})
    this.api.addToCartApi(products).subscribe({
      next:(res:any)=>{
        alert(res)
        this.api.getCartCount()
      },
      error:(res:any)=>{
        console.log(console.log(res)
        );
        
      }
    })
   }else{
    alert("please login")
   }
  }


}
