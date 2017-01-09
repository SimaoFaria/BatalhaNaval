import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [ CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
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