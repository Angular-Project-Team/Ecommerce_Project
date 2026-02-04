import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from '../../shared/models/productType';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   private readonly base_URL="http://localhost:3000/products"
 constructor(private http:HttpClient){

 }
 allProducts(){
  return this.http.get<ProductType[]>(this.base_URL);
 }
 productbyId(id:number){
  return this.http.get<ProductType>(`${this.base_URL}/${id}`);
 }
 updateProduct(id:number,newProduct:ProductType){
  return this.http.put(`${this.base_URL}/${id}`,newProduct);
 }
  createProduct(newProduct:ProductType){
  return this.http.post(this.base_URL,newProduct);
 }
  deleteProduct(id:number){
  return this.http.delete(`${this.base_URL}/${id}`);
 }

}


