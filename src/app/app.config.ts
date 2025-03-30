import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ecommerce-app-demo-project',
        appId: '1:378017185622:web:a08634f8001ac2efc5e0f7',
        storageBucket: 'ecommerce-app-demo-project.firebasestorage.app',
        apiKey: 'AIzaSyAn8vKY3glQQ4zgtV6APwEuUjbPU0MYeUM',
        authDomain: 'ecommerce-app-demo-project.firebaseapp.com',
        messagingSenderId: '378017185622',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
