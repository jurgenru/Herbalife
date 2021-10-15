import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentaryService } from 'src/app/services/commentary.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  article: any = {};
  annotation: any = {};
  comments: any = [];
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  rant: any;
  userIdBlog: any;
  validateAdmin: boolean = false;

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
    private notificationService: NotificationService,
    private blogService: BlogService
  ) {
    this.get();
  }

  ngOnInit() {
    this.initValidate();
    this.createCommentForm();
  }

  createCommentForm() {
    this.annotation = this.formBuilder.group({
      comment: ["", Validators.required]
    });
  }

  get comment() {
    return this.annotation.get("comment");
  }

  initValidate(){
    this.userService.me().subscribe((user:any) => {
      const filter = `{"fields": {"id": true}}`;
      this.userService.getById(user.id, filter).subscribe((admin: any) => {
        if(admin.role == 'admin'){
          this.validateAdmin = true;
        }else{
          this.validateAdmin = false;
        }
      });
    })
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
        this.blogService.getById(data.blogId).subscribe((blg: any) => {
          this.userIdBlog = blg.userId;
        });
      }, error => {
        this.spinner.stop();
      });
    });
  }

  getComments() {
    const filter = `{"fields": {"id": true, "content": true, "comment": true, "userId": true, "created": true}, "order":["id DESC"]}`;
    this.articleService.getCommentaryById(this.article.id, filter).subscribe((comen: any) => {
      comen.forEach(element => {
        this.userService.getProfileById(element.userId).subscribe((pro: any) => {
          element.userImage = pro.image;
          element.userName = pro.names;
          this.comments.push(element);
        }, error => {
          this.userService.getManagerById(element.userId).subscribe((man: any) => {
            element.userImage = man.image;
            element.userName = man.names;
            this.comments.push(element);
          });
        });
      });
    });
  }

  postComment() {
    this.userService.me().subscribe(user => {
      if (user) {
        this.annotation.value.articleId = this.article.id;
        this.userService.me().subscribe((user: any) => {
          this.annotation.value.userId = parseInt(user.id, 10);
          this.commentaryService.post(this.annotation.value).subscribe((com: any) => {
            this.postNotification(this.article.id, 'Acaban de comentar en tu articulo', 'article');
            this.userService.getProfileById(com.userId).subscribe((use: any) => {
              if (use) {
                const newComment = {
                  comment: com.comment,
                  userImage: use.image,
                  userName: use.names,
                  created: com.created
                }
                this.comments.unshift(newComment);
                this.annotation.reset();
              }
            }, error => {
              this.userService.getManagerById(com.userId).subscribe((man: any) => {
                if (man) {
                  const newComment = {
                    comment: com.comment,
                    userImage: man.image,
                    userName: man.names,
                    created: com.created
                  }
                  this.comments.unshift(newComment);
                  this.annotation.reset();
                }
              });
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
              this.postNotification(this.article.id, 'Acaban de calificar tu articulo', 'article')
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

  postNotification(content, description, reason) {
    const notif = {
      userId: this.userIdBlog,
      content: content.toString(),
      description: description,
      reason: reason
    }
    this.notificationService.post(notif).subscribe(not => {
    });
  }

}
