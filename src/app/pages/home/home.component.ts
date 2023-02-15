import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userList: any;
  @ViewChild('modal') closeModal: any;
  idTodelete: number = 0;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadAPI()
  }

  loadAPI() {
    this.apiService.usersList().subscribe((list: any) => {
      console.log("List", list);
      this.userList = list;
    })
  }

  editUser(id: any) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
  }

  delete() {
    this.apiService.deleteUser(this.idTodelete).subscribe({
      next: (data) => {
        alert("Record Deleted!")
        this.closeModal.nativeElement.click();
      },
    });
  }

}
