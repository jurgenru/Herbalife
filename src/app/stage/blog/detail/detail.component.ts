import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { ArticleService } from 'src/app/services/article.service';
import { CommentaryService } from 'src/app/services/commentary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: any = {};
  content: any = {};
  comments: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  rant: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private spinner: NgxUiLoaderService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commentaryService: CommentaryService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private simpleModalService: SimpleModalService,
  ) {
    this.get();
  }

  ngOnInit() {
    this.createCommentForm();
  }

  get() {
    const start = new Date();
    this.spinner.start();
    this.route.params.subscribe(val => {
      this.articleService.getById(val.id).subscribe((data: any) => {
        const end = new Date();
        const elapsed = (end.getSeconds() - start.getSeconds()) * 1000;
        setTimeout(() => {
          this.article = data;
          if (JSON.parse(data.rating) == 0) {
            this.rant = 0;
          } else {
            const ratingArray = JSON.parse(data.rating);
            this.rant = this.MediaRating(ratingArray.reduce(this.Reduce, 0), (ratingArray.length));
          }
          this.getComments();
          this.spinner.stop();
        }, elapsed);
      });
    });
  }

  createCommentForm() {
    this.content = this.formBuilder.group({
      comment: ["", Validators.required]
    });
  }

  get comment() {
    return this.content.get("comment");
  }

  getComments() {
    const filter = `{"fields": {"id": true, "content": true, "comment": true, "userId": true, "created": true}, "order":["id DESC"]}`;
    this.articleService.getCommentaryById(this.article.id, filter).subscribe((comen: any) => {
      comen.forEach(element => {
        this.userService.getProfileById(element.userId).subscribe((pro: any) => {
          element.userImage = pro.image;
          element.userName = pro.names;
          this.comments.push(element);
        });
      });
    });
  }

  postComment() {
    this.userService.me().subscribe(user => {
      if (user) {
        this.content.value.articleId = this.article.id;
        this.userService.me().subscribe((user: any) => {
          this.content.value.userId = parseInt(user.id, 10);
          this.commentaryService.post(this.content.value).subscribe((com: any) => {
            this.userService.getProfileById(com.userId).subscribe((use: any) => {
              const newComment = {
                comment: com.comment,
                userImage: use.image,
                userName: use.names,
                created: com.created
              }
              this.comments.unshift(newComment);
            });
          });
        });
      }
    }, error => {
      this.showRegister();
    });
  }

  sendRating(num) {
    this.userService.me().subscribe(user => {
      if (user) {
        this.modalService.open(num, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          if (this.selectedValue === undefined) {
            this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Debe seleccionar el numero de estrellas antes de calificar', '5000', 'danger', 'top', 'center');
          } else {
            const rating = JSON.parse(this.article.rating);
            rating.push(this.selectedValue);
            const update = {
              rating: JSON.stringify(rating)
            }
            this.articleService.update(this.article.id, update).subscribe(up => {
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha calificado exitosamente', '5000', 'success', 'top', 'center');
              this.selectedValue = 0;
            }, error => {
              this.notification('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>Hubo un error al calificar, intente nuevamente', '5000', 'danger', 'top', 'center');
            });
          }
        }, (reason) => {
          
        });
      }
    }, error => {
      this.showRegister();
    });

  }

  countStar(star) {
    this.selectedValue = star;
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

  Reduce(rating, num) {
    return rating + num;
  }

  MediaRating(total, media) {
    return Math.round(total / media);
  }

  showRegister() {
    this.simpleModalService.addModal(RegisterModalComponent, {}, { closeOnClickOutside: true }).subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }

}
