import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/api/token.service';
import { Router } from '@angular/router';
import { LoginData } from '../../models/loginData';

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
  styleUrl: './login.component.css'
})
export class LoginComponent {
    form!: FormGroup;

    constructor(
        private formBuilder:FormBuilder,
        private tokenService: TokenService,
        // private storageService: StorageService,
        // private domainService: DomainService,
        private router: Router,
      ) { 
    }

  ngOnInit(): void {
    this.criarForm()
  }

  criarForm(): void {
    this.form = this.formBuilder.group({
      email: [''],
      senha: [''],
    })
  }

  login(): void {
    const loginData: LoginData = {
      email: this.form.get("email")?.value,
      password: this.form.get("senha")?.value,
    }
    if (this.form.valid) {
    };
      this.tokenService.getToken(this.form.value).subscribe({
        next: (data) => {
          console.log(data);
          // this.storageService.setToken(data.token);
          // this.domainService.setDomain(data.domain);
          this.router.navigate(['/login']);
        }

            }
      )}
}
