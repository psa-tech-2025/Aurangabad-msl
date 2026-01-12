import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// const API = 'http://192.168.126.130:3000/api';const API = environment.apiUrl;

const API = environment.apiUrl;
@Injectable({ providedIn: 'root' })
export class GpContentService {

  constructor(private http: HttpClient) {}
   /* ================= OFFICERS ================= */
getOfficers() {
  return this.http.get<any[]>(`${API}/officers`);
}

addOfficer(data: any) {
  return this.http.post(`${API}/officers`, data).toPromise();
}

updateOfficer(id: string, data: any) {
  return this.http.put(`${API}/officers/${id}`, data).toPromise();
}

deleteOfficer(id: string) {
  return this.http.delete(`${API}/officers/${id}`).toPromise();
}

  /* ================= REPORTS ================= */

/* ================= REPORTS ================= */

getReports() {
  return this.http.get<any[]>(`${API}/reports`);
}

addReport(data: any) {
  return this.http.post(`${API}/reports`, data);
}

updateReport(id: string, data: any) {
  return this.http.put(`${API}/reports/${id}`, data);
}

deleteReport(id: string) {
  return this.http.delete(`${API}/reports/${id}`);
}
  /* ================= SCHEMES ================= */

getSchemes() {
  return this.http.get<any[]>(`${API}/schemes`);
}

addScheme(data: any) {
  return this.http.post(`${API}/schemes`, data).toPromise();
}

updateScheme(id: string, data: any) {
  return this.http.put(`${API}/schemes/${id}`, data).toPromise();
}

deleteScheme(id: string) {
  return this.http.delete(`${API}/schemes/${id}`).toPromise();
}
getSchemeById(id: string) {
  return this.http.get<any>(`${API}/schemes/${id}`);
}

/* ================= ABOUT US ================= */

getAbout() {
  return this.http.get<any>(`${API}/about`);
}

updateAbout(data: any) {
  return this.http.put(`${API}/about`, data).toPromise();
}


  /* ================= FILE UPLOAD ================= */

  uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);

    return this.http
      .post<any>(`${API}/upload`, fd)
      .toPromise()
      .then(res => res.url);
  }

  /* ================= GALLERY ================= */

  getGallery() {
    return this.http.get<any[]>(`${API}/gallery`);
  }

  addGallery(data: any) {
    return this.http.post(`${API}/gallery`, data).toPromise();
  }

  updateGallery(id: string, data: any) {
    return this.http.put(`${API}/gallery/${id}`, data).toPromise();
  }

  deleteGallery(id: string) {
    return this.http.delete(`${API}/gallery/${id}`).toPromise();
  }

  /* ================= HOME NOTICES ================= */

  getHomeNotices() {
    return this.http.get<any[]>(`${API}/home-notices`);
  }

  addHomeNotice(text: string) {
    return this.http.post(`${API}/home-notices`, { text }).toPromise();
  }

  updateHomeNotice(id: string, text: string) {
    return this.http.put(`${API}/home-notices/${id}`, { text }).toPromise();
  }

  deleteHomeNotice(id: string) {
    return this.http.delete(`${API}/home-notices/${id}`).toPromise();
  }

  /* ================= HOME ANNOUNCEMENTS ================= */

  getHomeAnnouncements() {
    return this.http.get<any[]>(`${API}/home-announcements`);
  }

  addHomeAnnouncement(text: string) {
    return this.http.post(`${API}/home-announcements`, { text }).toPromise();
  }

  updateHomeAnnouncement(id: string, text: string) {
    return this.http.put(`${API}/home-announcements/${id}`, { text }).toPromise();
  }

  deleteHomeAnnouncement(id: string) {
    return this.http.delete(`${API}/home-announcements/${id}`).toPromise();
  }

 



  /* ================= HOME INTRO ================= */

  getHomeIntro() {
    return this.http.get<any[]>(`${API}/home-intro`);
  }

  addHomeIntro(data: any, uid: string) {
    return this.http.post(`${API}/home-intro`, { ...data, uid }).toPromise();
  }

  updateHomeIntro(id: string, data: any) {
    return this.http.put(`${API}/home-intro/${id}`, data).toPromise();
  }

deleteHomeIntro(id: string) {
  return this.http.delete(`${API}/home-intro/${id}`);
}



  /* ================= MAP ================= */

  getHomeMap() {
    return this.http.get<any[]>(`${API}/home-map`);
  }

  addHomeMap(data: any) {
    return this.http.post(`${API}/home-map`, data).toPromise();
  }

  updateHomeMap(id: string, data: any) {
    return this.http.put(`${API}/home-map/${id}`, data).toPromise();
  }

deleteHomeMap(id: string) {
  return this.http.delete(`${API}/home-map/${id}`).toPromise();
}


/* ================= CITIZEN INFO ================= */

getCitizenInfo() {
  return this.http.get<any>(`${API}/citizen-info`);
}

updateCitizenInfo(data: any) {
  return this.http.put(`${API}/citizen-info`, data).toPromise();
}

}
