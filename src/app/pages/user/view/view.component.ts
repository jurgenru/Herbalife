import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  user: any;
  socialMedia: any = {}

  constructor(
    private userService: UserService,
    private managerService: ManagerService
  ) { }

  ngOnInit() {
    this.me();
  }

  me() {
    this.userService.me().subscribe((me: any) => {
      this.managerService.getByUserId(me.id).subscribe((man: any) => {
        man.forEach(element => {
          if (man.socialMedia) {
            this.socialMedia = JSON.parse(this.user.socialMedia);
          }
          this.user = element;
        });
      });
    });
  }

}
