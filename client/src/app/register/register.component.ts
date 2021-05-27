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
  // @Output() cancelRegister = new EventEmitter();
  // model: any = {};

  bsConfig: Partial<BsDatepickerConfig>;
  dxpConnectionForm: FormGroup = new FormGroup({
    iak: new FormControl('', [Validators.required]),
    idpUserId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    organizationId: new FormControl({value: '', disabled: true}, [Validators.required]),
  });

  // constructor(private accountService: AccountService, private toastr: ToastrService) { }

  // ngOnInit(): void {
  // }
  

  // register() {
  //   this.accountService.register(this.model).subscribe(response => {
  //     console.log(response);
  //     this.cancel();
  //   }, error => {
  //     console.log(error);
  //     this.toastr.error(error.error);
  //   })
  // }

  hasError(controlName: string, type: string) {
    let formControl = this.registerForm.get(controlName);
    return formControl && formControl.hasError(type) && formControl.touched;
  }

  // connectDxp() {

  // }


  // cancel() {
  //   this.cancelRegister.emit(false);
  // }

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register() {
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
