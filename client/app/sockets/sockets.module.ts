import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { NotificationModule } from './notifications/notifications.module';

// import { ChatComponent } from './chat.component';
// import { SocketsComponent } from './sockets.component';

// import { WebSocketService } from './notifications/websocket.service';
// import { AuthService } from './auth.service';

@NgModule({
  imports:      [ CommonModule,
                  BrowserModule,
                  FormsModule,
                  HttpModule,
                  // NotificationModule 
                  ],
  declarations: [ 
                  // ChatComponent,
                  // SocketsComponent
                   ],
  providers: [ 
                // WebSocketService,
                // AuthService 
               ],
  exports: [
    // ChatComponent, 
    // SocketsComponent
  ]
})

export class SocketsModule { }