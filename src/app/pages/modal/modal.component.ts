import { Component } from "@angular/core";
import { ConfirmComponent } from './confirm/confirm.component';
import { SimpleModalService } from "ngx-simple-modal";

@Component({
  selector: "app-modal",
  template: ` <div class="content">
    <div class="row">
      <div class="col-md-5">
        <div class="card card-user">
          <div class="card-body">
            <div class="modal-content">
              <div class="modal-header">
                <h4>Confirm</h4>
              </div>
              <div class="modal-body">
                <p>Are you sure?</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  (click)="showConfirm()"
                >
                  Show confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class ModalComponent {
  constructor(private simpleModalService: SimpleModalService) {}
  showConfirm() {
    let disposable = this.simpleModalService
      .addModal(ConfirmComponent, {
        title: "Confirm title",
        message: "Confirm message",
      })
      .subscribe((isConfirmed) => {
        //We get modal result
        if (isConfirmed) {
          alert("accepted");
        } else {
          alert("declined");
        }
      });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }
}
