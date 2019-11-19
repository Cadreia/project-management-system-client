import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  private submitted = false;
  private loading = false;
  private successAction: Observable<any>;
  errorAction;

  constructor(
    private user_service: UserService,
    private snotify_service: SnotifyService,
  ) { }

  ngOnInit() {
  }

  public form = {
    email: null,
  }

  onSubmit() {
    this.snotify_service.info("Wait...", {
      showProgressBar: false,
      timeout: 2000
    });
    this.loading = true;
    this.user_service.sendPasswordResetLink(this.form).subscribe(data => {
      this.snotify_service.async('Processing...', this.handleResponse(data));
      console.log(data);
    }, error => {
      this.snotify_service.async('Processing...', this.handleError(error));
      this.loading = false;
      //this.snotify_service.error(error.error.error);
    }, () => {
      this.loading = false;
      this.submitted = true;
      //this.snotify_service.success("Email Successfully Sent!", {
      //  timeout: 0
      //});
    });
  }

  handleResponse(data) {
    this.form.email = null;

    return this.successAction = Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          title: 'Success',
          body: data.data,
          config: {
            closeOnClick: true,
            timeout: 5000,
          }
        });
        observer.complete();
      }, 5000);
    });
  }

  handleError(error) {
    return this.errorAction = Observable.create(observer => {
      setTimeout(() => {
        observer.error({
          title: 'Error',
          body: error.error.error,
          config: {
            closeOnClick: true,
            timeout: 5000
          }
        });
      }, 3000);
    });

  }

  onReset(form) {
    form.reset();
  }
}
