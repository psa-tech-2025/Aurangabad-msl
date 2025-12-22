import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css']
})
export class OFFICERSComponent implements OnInit {

  officers: any[] = [];

  // 🔐 login-only controls
  isAdmin = false;

  // form model
  form = {
    id: null as string | null,
    name: '',
    post: '',
    phone: ''
  };

  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    // 📖 Public read
    this.gp.getOfficers().subscribe(data => {
      this.officers = data.map((o, i) => ({
        ...o,
        idDisplay: i + 1   // for Sr No column
      }));
    });

    // 🔐 Logged-in check only
    this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  save() {
    if (!this.isAdmin) return;

    const payload = {
      name: this.form.name,
      post: this.form.post,
      phone: this.form.phone
    };

    if (this.form.id) {
      this.gp.updateOfficer(this.form.id, payload);
    } else {
      this.gp.addOfficer(payload);
    }

    this.reset();
  }

  edit(officer: any) {
    if (!this.isAdmin) return;

    this.form = {
      id: officer.id,
      name: officer.name,
      post: officer.post,
      phone: officer.phone
    };
  }

  delete(id: string) {
    if (!this.isAdmin) return;
    if (confirm('Delete this officer?')) {
      this.gp.deleteOfficer(id);
    }
  }

  reset() {
    this.form = { id: null, name: '', post: '', phone: '' };
  }
}
