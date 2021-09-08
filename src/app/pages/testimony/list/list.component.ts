import { Component, OnInit } from "@angular/core";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  lists: any = [];

  constructor(private statementService: StatementService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    const filter = `{"order":["id DESC"]}`;
    this.statementService.get(filter).subscribe((data) => {
      this.lists = data;
      console.log(this.lists);
    });
  }
}
