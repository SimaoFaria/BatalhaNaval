import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';

@NgModule({
  // imports: [ RouterModule.forRoot(ROUTES) ],
  imports: [ RouterModule.forRoot(ROUTES, {useHash: true}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}