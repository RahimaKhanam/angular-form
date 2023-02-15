import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm = {
    name: '',
    username: '',
    email: '',
    phone: '',
    address: {
      city: '',
      street: '',
      zipcode: ''
    },
    website: ''
  };
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  title = 'Create User'
  id: any;
  userData: any;
  editMode = false;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      console.log(url[0].path)
      if (url[0].path == 'edit') {
        this.title = 'Update User'
        this.editMode = true;
        this.route.paramMap.subscribe((param) => {
          console.log(param)
          this.id = param.get('id');
          console.log(this.id);
          this.apiService.getUserById(this.id).subscribe((data: any) => {
            console.log(data);
            this.userForm = data;
          });
        });
      }
      else this.editMode = false;
    });
  }

  create(){
    this.apiService.saveUser(this.userForm)
        .subscribe({
          next: (data) => {
            alert("User added successfully");
            this.router.navigate(["/users"])
          },
          error: (err: any) => {
            console.log(err);
          }
        })
  }

  update(){
    this.apiService.updateUser(this.id, this.userForm)
        .subscribe({
          next: (data) => {
            alert("User updated successfully");
            this.router.navigate(["/users"])
          },
          error: (err) => {
            console.log(err);
          }
        })
  }

  goBack(){
    this.location.back()
  }

}
