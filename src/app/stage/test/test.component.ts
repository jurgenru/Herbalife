import { Component, OnInit, } from '@angular/core';
import * as $ from 'jquery';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  test: any;
  res: any;
  currentTest = 0;
  result: boolean = false;
  btnBlock: boolean = false;
  currentA = 0;
  currentB = 0;
  currentC = 0;

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.test = this.testService;
    console.log(this.test);
  }

  transition(option: any) {
    $("#test").slideUp(0, this.nextQuestion(option)).fadeIn(1000);
  }

  nextQuestion(option: any) {

    this.btnBlock = true;
    this.currentTest++;

    if (this.currentTest > 11) {
      this.result = true;
      // console.log(this.currentTest);
      // console.log('respuesta', option);
    } else {
      setTimeout(() => {
        this.btnBlock = false;
      }, 1000);
    }
    switch (option) {
      case 'A':
        this.currentA++
        break;
      case 'B':
        this.currentB++
        break;
      case 'C':
        this.currentC++
        break;
      default:
        break;
    }
    console.log(this.currentA, this.currentB, this.currentC);
  }
}
