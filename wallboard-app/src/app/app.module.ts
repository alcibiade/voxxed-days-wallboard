import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {ScheduleService} from "./schedule.service";
import {RoomScheduleComponent} from './room-schedule.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RoomsListComponent} from './rooms-list.component';


@NgModule({
    declarations: [
        AppComponent,
        RoomScheduleComponent,
        RoomsListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule.forRoot()
    ],
    providers: [ScheduleService, HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
