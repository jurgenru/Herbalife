import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  isSubmitted = false;
  services: number;

  Types:any = ['Gimnasio', 'Comida', 'Otros']
  constructor(public fb: FormBuilder) { }

  serviceForm = this.fb.group({
    serviceType: ['', [Validators.required]]
  })

  changeService(e) {
    console.log(e.value)
    this.serviceType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get serviceType(){
    return this.serviceForm.get('serviceType')
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSubmitted = true;
    if (!this.serviceForm.valid) {
      return false;
    } else {
      console.log(this.serviceForm.value);
    }
  }

}
