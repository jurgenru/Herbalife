import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  statements: any = {};
  description: any;
  constructor(
    private route: ActivatedRoute,
    private statementService: StatementService
  ) {
    this.route.params.subscribe((val) => {
      this.statementService.getById(val.id).subscribe((data) => {
        this.statements = data;
      });
      this.statementService.getStatementsById(val.id).subscribe((des) => {
        this.description = des;
      });
    });
  }

  ngOnInit(): void {}
}
