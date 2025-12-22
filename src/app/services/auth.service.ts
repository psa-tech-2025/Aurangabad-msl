import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
     this.checkSession();
  }

    // ✅ expose auth state safely
  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
  // ✅ REGISTER + SEND EMAIL VERIFICATION
  async register(name: string, email: string, mobile: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(email, password);

    if (!cred.user) {
      throw new Error('User creation failed');
    }

    // 🔔 SEND VERIFICATION EMAIL (THIS IS THE KEY LINE)
    await cred.user.sendEmailVerification();

    // 💾 SAVE USER DATA
    await this.firestore.collection('gp-users').doc(cred.user.uid).set({
      uid: cred.user.uid,
      name,
      email,
      mobile,
      emailVerified: false,
      createdAt: new Date()
    });

    // 🚫 LOGOUT UNTIL EMAIL VERIFIED
    await this.afAuth.signOut();
  }

  // ❌ BLOCK LOGIN IF EMAIL NOT VERIFIED
  async login(email: string, password: string) {
  const cred = await this.afAuth.signInWithEmailAndPassword(email, password);

  if (!cred.user?.emailVerified) {
    await this.afAuth.signOut();
    throw new Error('EMAIL_NOT_VERIFIED');
  }

  return cred;
}


  async resendVerification() {
    const user = await this.afAuth.currentUser;
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
    }
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // ✅ Call after successful login
  async setSession() {
    const loginTime = Date.now();
    localStorage.setItem('loginTime', loginTime.toString());
    this.loggedIn$.next(true);
  }

  // ⏱️ Check 1-hour expiry
  checkSession() {
    const loginTime = localStorage.getItem('loginTime');

    if (!loginTime) {
      this.loggedIn$.next(false);
      return;
    }

    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (now - +loginTime > oneHour) {
      this.logout();
    } else {
      this.loggedIn$.next(true);
    }
  }

  // 🚪 Logout
  async logout() {
    localStorage.removeItem('loginTime');
    this.loggedIn$.next(false);
    await this.afAuth.signOut();
  }
}
