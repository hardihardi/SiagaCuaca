import * as admin from 'firebase-admin';

let app: admin.app.App;
let firestore: admin.firestore.Firestore;

/**
 * Initializes the Firebase Admin SDK.
 * This is safe to call multiple times, as it will only initialize once.
 * It relies on default credentials provided by the environment (e.g., App Hosting).
 */
export function initializeAdmin() {
  if (admin.apps.length === 0) {
    // This will automatically use the credentials provided by the App Hosting environment
    // or connect to the emulator if GOOGLE_APPLICATION_CREDENTIALS is not set.
    app = admin.initializeApp();
  } else {
    app = admin.apps[0]!;
  }
  
  firestore = admin.firestore();

  return { app, firestore };
}
