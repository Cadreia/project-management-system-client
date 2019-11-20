import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { SnotifyService } from 'ng-snotify';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  submitted = false;
  loading = false;
  public form: NgForm;
  model = {
    email: null,
    password: null,
    confirmPassword: null,
    reset_token: null
  };

  constructor(
    private user_service: UserService,
    private snotify_service: SnotifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.model.reset_token = params['token'];
    });
  }

  onSubmit(form: NgForm) {
    this.form = form;
    this.loading = true;
    this.snotify_service.info("Wait...", {
      showProgressBar: false,
      timeout: 2000
    })
    this.user_service.updatePassword(this.model).subscribe(data => {
    }, error => {
      this.loading = false;
      this.snotify_service.error(error.error.error);
    }, () => {
      this.loading = false;
      this.submitted = true;
      this.handleResponse();
    });
  }

  handleResponse() {
    this.model.password, this.model.confirmPassword = null;
    this.snotify_service.confirm('Done! Now, Login with new Password', {
      buttons: [
        {
          text: 'Ok', action: (toast) => {
            this.router.navigateByUrl('/login');
            this.snotify_service.remove(toast.id);
          }
        }
      ],

    });

  }
}
