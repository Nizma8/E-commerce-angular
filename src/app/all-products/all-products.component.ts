import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any=[]
  constructor(private api:ApiService){
   
  }

  ngOnInit(): void {
    this.getAllProduct()
  }
  getAllProduct = async()=>{
     (await this.api.getAllProjects()).subscribe({
      next:(res:any)=>{
        this.allProducts=res
        // console.log(this.allProducts);
        
      },
      error:(res:any)=>{
        console.log(res.message);
        
      }
     })
  }


}
