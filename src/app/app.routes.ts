import { Routes } from '@angular/router';

import { Example1Component } from './components/example1/example1.component';
import { Example2Component } from './components/example2/example2.component';
import { AppComponent } from './app.component';
import { MainComponent } from './screen/main/main.component';


export const routes: Routes = [
    { 
        path: '', 
        component: MainComponent,
        children: [
            {
                path: 'example1',
                component: Example1Component
            },
            {
                path: 'example2',
                component: Example2Component
            },
            { 
                path: '', 
                redirectTo: 'example1', 
                pathMatch: 'full' 
            }
        ]
    },
   
];
