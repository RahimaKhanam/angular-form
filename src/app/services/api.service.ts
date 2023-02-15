import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base_url

@Injectable({
  providedIn: 'root'
})



export class ApiService {

  constructor(private http: HttpClient) { }

  // All Users
  usersList() {
    return this.http.get(`${baseUrl}`)
  }
  // Record of a user
  getUserById(id:any) {
    return this.http.get(`${baseUrl}/${id}`)
  }
  // Save user
  saveUser(obj: any) {
    return this.http.post(`${baseUrl}`, obj)
  }
  // Update user
  updateUser(id = '', obj: any) {
    return this.http.put(`${baseUrl}/${id}`, obj)
  }
  // Delete user
  deleteUser(id: any) {
    return this.http.delete(`${baseUrl}/${id}`)
  }
}
