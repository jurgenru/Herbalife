import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.session();
  }

  session() {
    const filter = `{"fields": {"role": true}`;
    this.userService.me().subscribe((data: any) => {
        this.userService.getById(data.id, filter).subscribe((user: any) => {{
            console.log(user);
            if(user.role == 'admin') {
                this.router.navigate(['/dashboard']);
            }
        }});
    });
}
}
