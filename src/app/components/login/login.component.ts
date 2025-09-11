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
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    RouterLink,
    MatProgressSpinnerModule,  
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  dialogRef = inject<MatDialogRef<LoginComponent>>(MatDialogRef);
  private fb = inject(FormBuilder);
  data = inject(MAT_DIALOG_DATA);
  loading = false;
  protected snackBar = inject(MatSnackBar);

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
      this.loading = true;
      this.tokenService.getToken(loginData).subscribe({
        next: (data) => {
          this.storageService.setToken('accessToken', data.access);
          this.storageService.setToken('refreshToken', data.refresh);
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
          this.loading = false;
        },
        error: (err) => {
          console.error('Login error:', err);
          this.snackBar.open('Erro no login. Verifique suas credenciais.', 'Fechar');
          this.loading = false;
        }
      });
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
