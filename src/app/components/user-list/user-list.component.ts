import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.apiService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }
}
