import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  profile: any = {};

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.me();
  }

  me() {
    this.userService.me().subscribe((user: any) => {
      const filter = `{"fields": {"id": true, "image": true, "phoneNumber": true}}`;
      this.userService.getById(user.id, filter).subscribe((us: any) => {
        this.userService.getProfileById(user.id).subscribe((prof: any) => {
        this.profile = prof;
        this.profile.email = us.email;
        this.profile.phoneNumber = us.phoneNumber;
      });
      });
    });
  }

}
