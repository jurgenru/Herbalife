import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { TrainerService } from 'src/app/services/trainer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filterPost = '';
  pageActual = 1;
  lists: any;

  constructor(
    private trainerService: TrainerService,
    private userService: UserService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.get();
  }

  get() {
    const filter = `{"fields": {"id": true, "names": true, "description": true, "created": true}, "order":["id DESC"]}`;
    this.userService.me().subscribe((data: any) => {
      this.userService.getTrainersById(data.id, filter).subscribe(trainer => {
        console.log(trainer);
        this.lists = trainer;
      });
    });
  }

  showDelete(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.trainerService.delete(result).subscribe((blog) => {
        this.lists = [];
        this.get();
        this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Ha eliminado al entrenador exitosamente', '5000', 'success', 'top', 'center');
      });
    });
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

}
