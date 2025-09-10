import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/api/token.service';
import { LoginData } from '../../models/loginData';
import { StorageService } from '../../services/storage/storage.service';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  dialogRef = inject<MatDialogRef<LoginComponent>>(MatDialogRef);
  private fb = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);

  private formBuilder = inject(FormBuilder);
  private tokenService = inject(TokenService);
  private storageService = inject(StorageService);

  form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): void {
    this.form = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      // const { username, password } = this.form.value;
      const loginData: LoginData = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
      };
      this.tokenService.getToken(loginData).subscribe({
        next: (data) => {
          this.storageService.setToken('accessToken', data.access);
        },
      });
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
