import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContentService, Video } from '../../core/services/content.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    videos: Video[] = [];
    currentVideo: Video | null = null;
    hoveredVideo: Video | null = null;
    baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, '');

    constructor(
        private contentService: ContentService,
        private modalService: NzModalService
    ) { }

    ngOnInit(): void {
        this.contentService.getVideos().subscribe((videos) => {
            this.videos = videos;
        });
    }

    onMouseEnter(video: Video, videoElement: HTMLVideoElement): void {
        this.hoveredVideo = video;
        videoElement.muted = true; // Extra safety
        videoElement.play().catch(err => {
            console.warn('Preview auto-play failed:', err);
        });
    }

    onMouseLeave(videoElement: HTMLVideoElement): void {
        this.hoveredVideo = null;
        videoElement.pause();
        // Do NOT reset currentTime to 0 to keep it as a "thumbnail" of the last frame seen,
        // OR reset to 0 if the user prefers. Let's reset to 0 for a consistent "YouTube" restart experience.
        videoElement.currentTime = 0;
    }

    openVideo(video: Video, tplContent: TemplateRef<{}>): void {
        this.currentVideo = video;
        this.modalService.create({
            nzTitle: video.title,
            nzContent: tplContent,
            nzFooter: null,
            nzWidth: '80%',
            nzCentered: true,
            nzBodyStyle: { padding: '0' },
            nzOnCancel: () => {
                this.currentVideo = null;
            }
        });
    }

    getShareUrl(videoUrl: string): string {
        return `${window.location.origin}/${videoUrl}`;
    }

    copyUrl(url: string): void {
        navigator.clipboard.writeText(url).then(() => {
            // You could add a toast notification here if needed
            console.log('URL copied to clipboard');
        });
    }
}
