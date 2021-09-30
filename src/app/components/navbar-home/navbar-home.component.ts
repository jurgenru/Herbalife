import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from "@angular/common";
import { UserService } from "src/app/services/user.service";
import { ProfileService } from "src/app/services/profile.service";
import { ToastrService } from 'ngx-toastr';
import { CartService } from "src/app/services/cart.service";
import { ManagerService } from "src/app/services/manager.service";

@Component({
  selector: "app-navbar-home",
  templateUrl: "./navbar-home.component.html",
  styleUrls: ["./navbar-home.component.css"]
})
export class NavbarHomeComponent implements OnInit, OnDestroy {
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public sidebarColor: string = "red";

  public isCollapsed = true;

  closeResult: string;
  user: any;
  image: any;
  status: boolean;

  public totalItem: number = 0;
  role: any;
  icon: any;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private cartService: CartService,
    private managerService: ManagerService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.me();
    this.getIcon();
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    var navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add('bg-white');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }
  };

  ngOnInit() {
    window.addEventListener("resize", this.updateColor);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

    this.cartService.getProducts().subscribe(res => {
      this.totalItem = res.length;
    })
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }

    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }


  open(content) {
    this.modalService.open(content, { windowClass: 'modal-search' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }
  changeNavbarColor(color) {
    var navbar = document.getElementsByClassName('navbar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if (navbar != undefined) {
      navbar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
  }
  changeButton(color) {
    var buttons = document.getElementsByClassName('btn-theme');
       for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("data", color);
    }
    // if (buttons != undefined) {
    //   buttons.setAttribute('data', color);
    // }
  }

  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute('data', color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute('data', color);
    }
  }

  changeDashboardColor(color, color2) {
    this.changeSidebarColor(color2);
    this.changeNavbarColor(color2);
    this.changeButton(color2)
    var body = document.getElementsByTagName('body')[0];

    if (body && color === 'white-content') {
      body.classList.add(color);
    }
    else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
    this.status = false;
  }

  me() {
    if (localStorage.getItem('herTok')) {
      this.userService.me().subscribe((user: any) => {
        this.status = true;
        this.user = user;
        const filter = `{"fields": {"id": true}}`;
        this.userService.getById(user.id, filter).subscribe((data: any) => {
          this.role = data.role;
          switch (data.role) {
            case 'customer':
              this.profileService.getByuserId(user.id).subscribe((prof: any) => {
                if (Object.keys(prof).length === 0) {
                  this.router.navigate(['customer/create']);
                  this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Complete su perfil antes de continuar', '5000', 'warning', 'top', 'center');
                } else {
                  prof.forEach(element => {
                    this.image = element.image;
                  });
                }
              });
              break;
            case 'admin':
              this.managerService.getByUserId(user.id).subscribe((adm: any) => {
                adm.forEach(element => {
                  this.image = element.image;
                });
              });
          }
        });
      });
    }
  }

  notification(content, time, type, from, align) {
    this.toastr.error(content, '', {
      timeOut: time,
      closeButton: true,
      enableHtml: true,
      toastClass: `alert alert-${type} alert-with-icon`,
      positionClass: 'toast-' + from + '-' + align
    });
  }

  getIcon() {
    this.managerService.getByUserId(1).subscribe((ic: any) => {
      ic.forEach(element => {
        this.icon = element.icon;
      });
    });
  }

}