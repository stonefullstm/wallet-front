import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/api/token.service';
import { Router } from '@angular/router';
import { LoginData } from '../../models/loginData';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private tokenService = inject(TokenService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login(): void {
    const loginData: LoginData = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };
    if (this.form.valid) {
    }
    this.tokenService.getToken(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.storageService.setToken('accessToken', data.access);
        // this.domainService.setDomain(data.domain);
        this.router.navigate(['/home']);
      },
    });
  }
}
