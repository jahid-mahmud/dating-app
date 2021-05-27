import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig>;
  
  @Output() cancelRegister = new EventEmitter();
  maxDate: Date;

  validationErrors: string[] = [];
  registerForm: FormGroup = new FormGroup({
    gender: new FormControl('male', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    knownAs: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
  });

  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router) {
      this.bsConfig = {
        containerClass: 'theme-red',
        dateInputFormat: 'DD MMMM YYYY'
      }
     }


  

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  
  
  hasError(controlName: string, type: string) {
    let formControl = this.registerForm.get(controlName);
    return formControl && formControl.hasError(type) && formControl.touched;
  }


  

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register() {
    console.log(this.registerForm)
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
