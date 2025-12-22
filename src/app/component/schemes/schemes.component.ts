import { Component, OnInit } from '@angular/core';
import { GpContentService } from 'src/app/services/gp-content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SCHEMESComponent implements OnInit {

  schemes: any[] = [];

  isAdmin = false;

  form = {
    id: null as string | null,
    name: '',
    desc: '',
    link: ''
  };

  constructor(
    private gp: GpContentService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // 🔓 Public read
    this.gp.getSchemes().subscribe(data => {
      this.schemes = data;
    });

    // 🔐 Role check
   this.auth.getAuthState().subscribe(user => {
      this.isAdmin = !!user;
    });
  }

  save() {
    if (!this.isAdmin) return;

    if (this.form.id) {
      this.gp.updateScheme(this.form.id, this.form);
    } else {
      this.gp.addScheme(this.form);
    }

    this.reset();
  }

  edit(scheme: any) {
    this.form = { ...scheme };
  }

  delete(id: string) {
    if (confirm('Delete this scheme?')) {
      this.gp.deleteScheme(id);
    }
  }

  reset() {
    this.form = { id: null, name: '', desc: '', link: '' };
  }
}
