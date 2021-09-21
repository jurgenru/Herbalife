import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class StoreService {

    public cartItemList : any = [];
    public productList = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient) { }    
    
    post(body) {
        return this.http.post(`${environment.apiUrl}stores`, body).pipe();
    }

    get(filter) {
        return this.http.get(`${environment.apiUrl}stores?filter=${filter}`).pipe();
    }

    getProductsById(id) {
        return this.http.get(`${environment.apiUrl}stores/${id}/products`).pipe();
    }

    getById(id) {
        return this.http.get(`${environment.apiUrl}stores/${id}`).pipe();
    }

    delete(id){
        return this.http.delete(`${environment.apiUrl}stores/${id}`).pipe();
    }

    deleteProductById(id) {
        return this.http.delete(`${environment.apiUrl}stores/${id}/products`).pipe();
    }
    update(id, body) {
        return this.http.patch(`${environment.apiUrl}stores/${id}`, body).pipe();
    }

    //CARD
    getProducts(){
        return this.productList.asObservable();
    }

    addToCard(product:any){
        Object.assign(product, {quantify:1, total: product.price});
        this.cartItemList.map((a:any, index:any) => {
            if(product.id == a.id){
                // product.quantify++;
                // product.total = parseFloat(a.total) + parseFloat(product.price);
                this.cartItemList.splice(index, 1);
            }
        })
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        localStorage.setItem('carList', JSON.stringify(this.cartItemList));
        this.getTotalPrice();
        console.log('servicio-car',this.cartItemList);
    }

    getTotalPrice():number{
        let grandTotal = 0;
        this.cartItemList.map((a:any)=>{
            grandTotal += parseFloat(a.total);
        })
        return grandTotal;
    }

    removeCardItem(product: any){
        this.cartItemList.map((a:any, index:any) =>{
            if(product.id == a.id){
                this.cartItemList.splice(index, 1);
            }
        })
        this.productList.next(this.cartItemList);
        localStorage.setItem('carList', JSON.stringify(this.cartItemList));
        this.getTotalPrice();
    }

    removeAllCard(){
        this.cartItemList = [];
        this.productList.next(this.cartItemList);
        localStorage.setItem('carList', JSON.stringify(this.cartItemList));
        this.getTotalPrice();
    }
    //FIN
}
