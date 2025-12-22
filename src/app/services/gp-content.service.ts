import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GpContentService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  /* -------------------- STORAGE -------------------- */

  uploadFile(folder: string, file: File) {
    const path = `gp/${folder}/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    return this.storage.upload(path, file).then(() => ref.getDownloadURL());
  }

  /* -------------------- FIRESTORE CRUD -------------------- */

  // CREATE
  addItem(collection: string, data: any) {
    return this.firestore.collection(collection).add({
      ...data,
      createdAt: new Date()
    });
  }

  // READ
  getItems(collection: string) {
    return this.firestore.collection(collection, ref =>
      ref.orderBy('createdAt', 'desc')
    ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({
          id: a.payload.doc.id,
          ...a.payload.doc.data() as any
        }))
      )
    );
  }

  // UPDATE
  updateItem(collection: string, id: string, data: any) {
    return this.firestore.collection(collection).doc(id).update(data);
  }

  // DELETE
  deleteItem(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }
  // 📤 Upload image
  async uploadImage(file: File) {
    const path = `gp/gallery/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);
    await this.storage.upload(path, file);
    return ref.getDownloadURL().toPromise();
  }

  // ➕ Create
  addGallery(data: any) {
    return this.firestore.collection('gallery').add({
      ...data,
      createdAt: new Date()
    });
  }

  // 📥 Read (PUBLIC)
  getGallery() {
    return this.firestore.collection('gallery', ref =>
      ref.orderBy('createdAt', 'desc')
    ).snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({
          id: a.payload.doc.id,
          ...a.payload.doc.data() as any
        }))
      )
    );
  }

  // ✏️ Update
  updateGallery(id: string, data: any) {
    return this.firestore.collection('gallery').doc(id).update(data);
  }

  // ❌ Delete
  deleteGallery(id: string) {
    return this.firestore.collection('gallery').doc(id).delete();
  }

  getOfficers() {
  return this.firestore.collection('officers', ref =>
    ref.orderBy('createdAt')
  ).snapshotChanges().pipe(
    map(actions =>
      actions.map(a => ({
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }))
    )
  );
}

addOfficer(data: any) {
  return this.firestore.collection('officers').add({
    ...data,
    createdAt: new Date()
  });
}

updateOfficer(id: string, data: any) {
  return this.firestore.collection('officers').doc(id).update(data);
}

deleteOfficer(id: string) {
  return this.firestore.collection('officers').doc(id).delete();
}
// gp-content.service.ts
getSchemes() {
  return this.firestore
    .collection('schemes', ref => ref.orderBy('createdAt', 'desc'))
    .valueChanges({ idField: 'id' });
}

addScheme(data: any) {
  return this.firestore.collection('schemes').add({
    ...data,
    createdAt: new Date()
  });
}

updateScheme(id: string, data: any) {
  return this.firestore.collection('schemes').doc(id).update(data);
}

deleteScheme(id: string) {
  return this.firestore.collection('schemes').doc(id).delete();
}

}
