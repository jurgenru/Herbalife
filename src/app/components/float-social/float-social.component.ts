import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-float-social",
  templateUrl: "./float-social.component.html",
  styleUrls: ["./float-social.component.css"]
})
export class FloatSocialComponent implements OnInit {

  constructor(private userService: UserService) {}
  user: any;
  socialMedia: any;
  ngOnInit() {this.get();}

  get(){
    this.userService.getManagerById(1).subscribe((data:any)=>{
      [data].map(element => {
        this.user = element;
        if(this.user.socialMedia){
          this.socialMedia = JSON.parse(element.socialMedia);
        }
      });
    })
  }
  openSocialMedia(navUrl){
    window.open(navUrl, "_blank");
  }
}