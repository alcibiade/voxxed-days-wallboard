import {Injectable} from '@angular/core';
import {Schedule, SpeakerDetails} from './schedule';
import {HttpClient} from "@angular/common/http";
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class ScheduleService {

    private scheduleObservable: ReplaySubject<Schedule>;

    constructor(private http: HttpClient) {
        this.scheduleObservable = new ReplaySubject(1);
        this.callSlots();
    }

    getSchedule(): Observable<Schedule> {
        return this.scheduleObservable;
    }

    /**
     * Load the slots from the server API.
     */
    private callSlots() {
        this.http.get<Schedule>(environment.fullScheduleUrl, {observe: 'response'})
            .subscribe(
                response => {
                    let schedule: Schedule = response.body;
                    this.scheduleObservable.next(schedule);
                    this.feedSpeakers(schedule);
                },
                (err: any) => {
                    this.scheduleObservable.error(err);
                },
                () => {
                    this.scheduleObservable.complete();
                });
    }

    /**
     * Feed the speaker details in the speaker objects.
     *
     * @param {Schedule} schedule the schedule that contains the speakers to be loaded.
     */
    private feedSpeakers(schedule: Schedule) {
        schedule.slots.forEach(slot => {
            slot.talk && slot.talk.speakers.forEach(speaker => {
                this.http.get<SpeakerDetails>(speaker.link.href, {observe: 'response'})
                    .subscribe(speakerDetails => speaker.details = speakerDetails.body);
            });
        });
    }

}
