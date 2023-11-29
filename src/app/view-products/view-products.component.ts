import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  product:any={}
  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data:any)=>{
      // console.log(data);
      const {id} = data
      // api call to get a particular product details
      this.getProductDetails(id)
    })
  }

  getProductDetails = (id:any)=>{
    this.api.viewProApi(id).subscribe({
      next:(res:any)=>{
       this.product = res
       console.log(this.product);
       
      },
      error:(err:any)=>{
        console.log(err.message);
        
      }
    })
  }
}
