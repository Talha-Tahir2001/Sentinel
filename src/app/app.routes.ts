import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'analyze',
        loadComponent: () => import('./pages/analyze/analyze.component').then(m => m.AnalyzeComponent),
    },
    {
        path: '**', 
        redirectTo: ''
    }
];
