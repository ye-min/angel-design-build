import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContentService } from '../core/services/content.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    siteTitle$: Observable<string> | undefined;
    logo$: Observable<string> | undefined;
    isDrawerVisible = false;

    constructor(private contentService: ContentService) { }

    toggleDrawer(): void {
        this.isDrawerVisible = !this.isDrawerVisible;
    }

    ngOnInit(): void {
        const data$ = this.contentService.getProjectData();
        this.siteTitle$ = data$.pipe(map(data => data.title));
        this.logo$ = data$.pipe(map(data => data.logo));
    }
}
