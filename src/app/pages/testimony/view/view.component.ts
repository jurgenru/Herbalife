import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatementService } from "src/app/services/statement.service";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  statements: any ={};
  constructor(
    private route: ActivatedRoute,
    private statementService: StatementService
  ) {
    this.route.params.subscribe(val => {
      this.statementService.getStatementById(val.id).subscribe(data => {
        this.statements=data
      });
    });
  }

  ngOnInit(): void {}
}
