import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Slot} from "./schedule";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/Rx";
import {ClockService} from "./clock.service";

@Component({
    selector: 'app-room-schedule',
    templateUrl: './room-schedule.component.html',
    styleUrls: ['./room-schedule.component.css']
})
export class RoomScheduleComponent implements OnInit, OnDestroy {
    currentTalk: Slot;
    nextTalk: Slot;
    slots: Slot[];
    timerSubscription: Subscription;
    currentTime: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private scheduleService: ScheduleService,
                private clockService: ClockService) {
    }

    ngOnInit(): void {
        console.log('Registering route parameters');
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                let id = params['id'];
                this.loadRoom(id);
            }
        });

        this.timerSubscription = Observable.timer(2000, 1000).subscribe(() => this.tick());
    }

    ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
    }

    tick(): void {
        this.currentTime = this.clockService.getTime();
        console.log('Tick, this is', this.currentTime);
    }

    loadRoom(roomId: string): void {
        this.scheduleService.getSlots().subscribe(s => {
            let slots = s.body.slots;
            let localslots = [];

            for (let slot of slots) {
                if (slot.roomId == roomId) {
                    localslots.push(slot);
                }
            }

            console.log('Slots for room', roomId, 'are', localslots);

            this.slots = localslots;
        });
    }

}
