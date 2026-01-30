import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService, Project } from '../../core/services/content.service';

declare var instgrm: any;

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
    project: Project | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contentService: ContentService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const title = params.get('title');
            if (title) {
                this.contentService.getProject(title).subscribe(project => {
                    this.project = project;
                    if (!this.project) {
                        this.router.navigate(['/projects']);
                    } else {
                        // Wait for DOM to update then process Instagram embeds
                        setTimeout(() => {
                            if (typeof instgrm !== 'undefined') {
                                instgrm.Embeds.process();
                            }
                        }, 100);
                    }
                });
            }
        });
    }

    goBack() {
        this.router.navigate(['/projects']);
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.goBack();
        }
    }
}
