import { Observable } from 'rxjs';
import { ContentService, Profile } from '../../core/services/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile$: Observable<Profile> | undefined;

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        this.profile$ = this.contentService.getProfile();
    }
}
