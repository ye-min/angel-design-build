import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

@Component({
    selector: 'app-family',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {
    photos: string[] = [];

    constructor(private contentService: ContentService) { }

    ngOnInit(): void {
        this.contentService.getFamilyPhotos().subscribe((photoUrls: string[]) => {
            this.photos = photoUrls;
        });
    }
}
