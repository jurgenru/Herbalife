import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: "",
    children: []
  },
  {
    path: "/icons",
    title: "Icons",
    icon: "icon-atom",
    class: "",
    children: []
  },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "icon-bell-55",
    class: "",
    children: []
  },

  {
    path: "",
    title: "Usuario",
    icon: "icon-minimal-down",
    class: "",
    children: [
      { path: "/user/create", title: "crear usuario", icon: "icon-single-02", },
      { path: "/user/view", title: "Lista de usuarios", icon: "icon-single-02", }
    ]
  },
  {
    path: "/tables",
    title: "Table List",
    icon: "icon-puzzle-10",
    class: "",
    children: []
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "icon-align-center",
    class: "",
    children: []
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
