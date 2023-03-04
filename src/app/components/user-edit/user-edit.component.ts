import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: any;
  user: any;
  constructor(  private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      profileImage: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.user = params;
      this.userForm.patchValue({
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber
      });
    });
  }
onSubmit() {
    const formData = new FormData();
    formData.append('id', this.userForm.get('id').value);
    formData.append('firstName', this.userForm.get('firstName').value);
    formData.append('lastName', this.userForm.get('lastName').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('phoneNumber', this.userForm.get('phoneNumber').value);
    formData.append('profileImage', this.userForm.get('profileImage').value);

    this.apiService.updateUser(this.user.id,formData).subscribe(() => {
      this.router.navigate(['/user-list']);
    });
  }
}
