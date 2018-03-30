import {Injectable} from '@angular/core';
import {Schedule} from './schedule';
import {HttpClient} from "@angular/common/http";
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class ScheduleService {

    private schedule: ReplaySubject<Schedule>;

    constructor(private http: HttpClient) {
        this.schedule = new ReplaySubject(1);
        this.http.get<Schedule>(environment.fullScheduleUrl, {observe: 'response'})
            .subscribe(
                response => {
                    this.schedule.next(response.body)
                },
                () => {
                },
                () => {
                    this.schedule.complete()
                });
    }

    getSlots(): Observable<Schedule> {
        return this.schedule;
    }

}
