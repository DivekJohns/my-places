import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {apiUrl} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    constructor(private router: Router,
                private accountService: AccountService,
                private http: HttpClient) {
    }

    hide = false;
    formData: FormData;
    default = 'https://www.materialui.co/materialIcons/social/person_grey_192x192.png';
    userProfile: string;


    ngOnInit(): void {
    }


    profile(event): void {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file = fileList[0];
            this.formData = new FormData();
            this.formData.append('files', file, file.name);
            this.formData.append('files', file, file.name);
        }
        this.http.post(`${apiUrl}/upload`, this.formData)
            .subscribe(
                data => {
                    this.userProfile = data['0'].fileUrl;
                },
                error => console.log(error)
            );
    }


    saveRegister(registerForm) {
        if (registerForm.valid) {
            this.accountService.registerUser(registerForm.value).subscribe(async data => {
                alert('Account created! :)');
                await this.router.navigate(['login']);
            }, err => {
                console.warn('failed to create into the database');
                alert(err.error.message);
            });
        }
    }

}
