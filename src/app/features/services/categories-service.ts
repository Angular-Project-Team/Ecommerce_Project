import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryType } from '../Home/models/catType';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly base_URL="http://localhost:3000/categories"
  constructor(private http:HttpClient){}

  allCategories(){
  return this.http.get<CategoryType[]>(this.base_URL);
 }
 CategorybyId(id:number){
  return this.http.get<CategoryType>(`${this.base_URL}/${id}`);
 }
 updateCategory(id:number,newCategory:CategoryType){
  return this.http.put(`${this.base_URL}/${id}`,newCategory);
 }
  createCategory(newCategory:CategoryType){
  return this.http.post(this.base_URL,newCategory);
 }
  deleteCategory(id:number){
  return this.http.delete(`${this.base_URL}/${id}`);
 }
}


