import {Injectable} from '@angular/core';
import {Schedule} from './schedule';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ScheduleService {

    constructor(private http: HttpClient) {
    }

    getSlots(): Observable<HttpResponse<Schedule>> {
        return this.http.get<Schedule>(environment.fullScheduleUrl, {observe: 'response'});
    }

}
