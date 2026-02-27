import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface GalleryItem {
  image?: string;
  caption: string;
  type?: 'image' | 'instagram';
  instagramUrl?: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
  link: string;
  gallery: GalleryItem[];
}

export interface Video {
  title: string;
  videoUrl: string;
  link: string;
}

export interface Profile {
  bio: string[];
  books: { title: string; imageUrl: string }[];
}

export interface Contact {
  address: string[];
  phone: string;
  fax: string;
  emails: { label: string; email: string }[];
  wechat: string;
  imageUrl: string;
}

export interface ProjectData {
  title: string;
  logo: string;
  projectList: Project[];
  profile: Profile;
  contact: Contact;
  familyPhotos: string[];
  videoList: Video[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private dataUrl = 'data/project.json'; // Angular static asset path

  constructor(private http: HttpClient) { }

  getProjectData(): Observable<ProjectData> {
    return this.http.get<ProjectData>(this.dataUrl);
  }

  getProjects(): Observable<Project[]> {
    return this.getProjectData().pipe(
      map((data: ProjectData) => data.projectList)
    );
  }

  getProject(link: string): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map((projects: Project[]) => projects.find((p: Project) => p.link === link))
    );
  }

  getProfile(): Observable<Profile> {
    return this.getProjectData().pipe(
      map((data: ProjectData) => data.profile)
    );
  }

  getContact(): Observable<Contact> {
    return this.getProjectData().pipe(
      map((data: ProjectData) => data.contact)
    );
  }

  getFamilyPhotos(): Observable<string[]> {
    return this.getProjectData().pipe(
      map((data: ProjectData) => data.familyPhotos)
    );
  }

  getVideos(): Observable<Video[]> {
    return this.getProjectData().pipe(
      map((data: ProjectData) => data.videoList)
    );
  }
}
