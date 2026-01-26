import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ContentService, Project } from '../../core/services/content.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
    projects$: Observable<Project[]> | undefined;
    logo$: Observable<string> | undefined;

    constructor(private contentService: ContentService, private router: Router) { }

    ngOnInit(): void {
        this.projects$ = this.contentService.getProjects();
        this.logo$ = this.contentService.getProjectData().pipe(map((data: any) => data.logo));
    }

    openProject(link: string) {
        this.router.navigate(['/project', link]);
    }
}
