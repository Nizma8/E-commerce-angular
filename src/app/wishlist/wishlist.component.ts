import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any =[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
 
      this.getWishlist()
   
  }
   getWishlist(){
    this.api.getWishlistApi().subscribe({
      next:(res:any)=>{
        this.wishlist = res
        this.api.getWIshlistCount()
      },

      error:(err:any)=>{
        alert(err.error)
      }
    })
   }

   wishlistRemove = (id:any)=>{
    this.api.deleteWishListItemApi(id).subscribe({
      next:(res:any)=>{
        this.getWishlist()
        console.log(res);
        
      },
      error:(err:any)=>{
          console.log(err.err);
          
      }
    })
   }


}
