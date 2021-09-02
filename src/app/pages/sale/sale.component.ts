import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar, NgbDate, NgbDateParserFormatter,
  NgbModal, NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  readonly DELIMITER = '-';

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  date1: any;
  date2: any;

  closeResult = '';

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private modalService: NgbModal
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.date1 = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.date2 = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.date1 = date.year + this.DELIMITER + date.month + this.DELIMITER + date.day;
    }
  }

  // toModel(date: NgbDate | null): string | null {
  //   return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  // }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  open(content) {
    this.modalService.open(content, { size: 'sm' });
  }

}
