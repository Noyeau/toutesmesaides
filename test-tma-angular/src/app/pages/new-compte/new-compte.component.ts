import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-new-compte',
  templateUrl: './new-compte.component.html',
  styleUrls: ['./new-compte.component.css']
})
export class NewCompteComponent implements OnInit {

  public form = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    password2: new FormControl(null, [Validators.required]),

  })
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form.controls.password2.setValidators([Validators.required, this.passwordValidator()])
  }

  send() {
    this.form.controls.password2.updateValueAndValidity()
    console.log(this.form)
    if (this.form.valid) {
      this.authService.signUp(this.form.value.login, this.form.value.password, this.form.value.password2).subscribe(res => {
        this.router.navigate(['/app'])
      })
    }
  }

  passwordValidator(): ValidatorFn {
    let form = this.form
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control)
      if (control.value === this.form.value.password) {
        return null
      }
      return { passwordOK: false }

    };
  }

}
