import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { SimpleModalService } from "ngx-simple-modal";
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

@Component({
  selector: 'app-virtual-card-component',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent implements OnInit {
  @Input() type: 1 | 2;
  @Input() data: any = {};
  @Input() options: any = {};

  constructor( 
    private router: Router,
    private simpleModalService: SimpleModalService,
     ) { }

  ngOnInit(): void {
  }
  
  socialUrl(data){
    return window.open(data, "_blank");
  }

  openContactForm(email){
    this.simpleModalService.addModal(
      ContactFormComponent,
      {
        title: "Enviar Correo Electrónico",
        toEmail: email,
        name: this.data.names,
      },
      { closeOnClickOutside: true }
    );
  }

  optionOpen(option){
    switch (option.type){
      case 'store':
        this.router.navigate(['customer/store/view/' + option.id])
      break;
      case 'blog':
        this.router.navigate(['customer/blog/view/' + option.id]);
      break;
      case 'service':
        this.router.navigate(['customer/service/view/' + option.id])
      break;
      case 'lection':
        this.router.navigate(['customer/trainer/view/' + option.id])
      break;
      default:
      break;
    }
  }
}
