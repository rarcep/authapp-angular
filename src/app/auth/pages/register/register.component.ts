import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name: ['Romeo', [Validators.required]],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authServices: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    const {name, email, password} = this.miFormulario.value;
    this.authServices.crearUsuario(name, email, password)
      .subscribe(ok => {
        if(ok === true){
          console.log(ok)
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire({
            title: 'Error!',
            text: ok,
            icon: 'error'
          });
        }
      });
    /* this.router.navigateByUrl('/dashboard'); */
  }

}
