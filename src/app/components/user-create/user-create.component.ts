import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profileImage:''
  };

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('email', this.user.email);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('profileImage', this.user.profileImage);

    this.apiService.createUser(formData).subscribe(
      res => {
        console.log('User created successfully');
        // do something with the response
      this.router.navigate(['/user-list']);

      },
      err => {
        console.log('Error creating user:', err);
        // handle the error
      }
    );
  }
  onImageSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.user.profileImage = event.target.files[0];
  
    }
  }
}
