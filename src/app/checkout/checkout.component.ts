import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  cartTotalAmount:number = 0
  checkoutStatus:boolean=false
  showSuccess:boolean = false
  showCancel: boolean = false
  showError: boolean = false
  
  checkoutForm = this.fb.group({
    uname:['',[
      Validators.required,Validators.pattern('[a-zA-Z ]*')
    ]],
    flat:['',[
      Validators.required,Validators.pattern('[a-zA-Z ]*')
    ]],
    place:['',[
      Validators.required,Validators.pattern('[a-zA-Z ]*')
    ]],
    pincode:['',[
      Validators.required,Validators.pattern('[0-9]*')
    ]]
  })
  public payPalConfig ? : IPayPalConfig;
  
  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){}
  
  ngOnInit(): void {
    this.api.cartTotalAmount.subscribe((amount:any)=>{
      this.cartTotalAmount = amount
    })
  }
  private initConfig(): void {
    const total = JSON.stringify(this.cartTotalAmount)
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: total,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: total
                        }
                    }
                },
               
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            this.api.emptyCartApi().subscribe((res:any)=>{
                 this.route.navigateByUrl('/cart')
                 this.checkoutStatus = false
                 this.checkoutForm.reset()
                 alert("Your order is succesfully placed!!")
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;
              this.checkoutStatus = false
              alert("Transaction has been failed")
        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
            this.checkoutStatus = false
            alert("Transaction has been failed")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };}

 cancel(){
  this.checkoutForm.reset()
 }
 buyNow(){
  if(this.checkoutForm.valid){
  this.checkoutStatus =true
  this.initConfig()
  }else{

  }
 }
}
