import { Observable } from 'rxjs';
import { ContentService, Contact } from '../../core/services/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contact$: Observable<Contact> | undefined;

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        this.contact$ = this.contentService.getContact();
    }
}
