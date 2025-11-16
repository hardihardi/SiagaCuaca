import * as admin from 'firebase-admin';
import { firebaseConfig } from './config';

let app: admin.app.App;
let firestore: admin.firestore.Firestore;

/**
 * Initializes the Firebase Admin SDK.
 * This is safe to call multiple times, as it will only initialize once.
 */
export function initializeAdmin() {
  if (admin.apps.length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Running in a server environment (e.g., Firebase App Hosting)
      // The service account key is provided as an environment variable
      app = admin.initializeApp();
    } else {
      // Running in a local development environment
      // Fallback to using the service account key from a local file if needed
      // or using the client config for basic operations if applicable.
      // Note: For full admin privileges locally, you'd typically use a service account file.
      // For this Genkit flow, using the project ID from the client config is sufficient
      // to connect to the emulators or the correct cloud project.
      app = admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
    }
  } else {
    app = admin.apps[0]!;
  }
  
  firestore = admin.firestore();

  return { app, firestore };
}
