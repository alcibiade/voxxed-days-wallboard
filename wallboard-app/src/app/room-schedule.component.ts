import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Slot} from "./schedule";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/Rx";
import {ClockService} from "./clock.service";

@Component({
    selector: 'app-room-schedule',
    templateUrl: './room-schedule.component.html',
    styleUrls: ['./room-schedule.component.sass']
})
export class RoomScheduleComponent implements OnInit, OnDestroy {
    mode: string = 'talk';
    roomName: string = '';
    currentSlot: Slot;
    nextSlot: Slot;
    slots: Slot[] = [];
    dayStart: string;
    dayEnd: string;
    timerSubscription: Subscription;
    currentTime: string = '00:00';

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
    }

    ngOnDestroy(): void {
        this.timerSubscription.unsubscribe();
    }

    tick(): void {
        let updatedTime = this.clockService.getTime();

        if (updatedTime != this.currentTime) {
            this.updateSlots(updatedTime);
        }
    }

    private updateSlots(updatedTime: string) {
        this.currentTime = updatedTime;

        this.mode = 'talk';
        let nextSlot = undefined;
        let currentSlot = undefined;

        this.slots.forEach(slot => {
            if (slot.fromTime <= this.currentTime && slot.toTime > this.currentTime) {
                currentSlot = slot;
            }

            if (slot.fromTime > this.currentTime && (!nextSlot || nextSlot.fromTime > slot.fromTime)) {
                nextSlot = slot;
            }
        });

        console.log(currentSlot, nextSlot);

        this.nextSlot = nextSlot;
        this.currentSlot = currentSlot;
        this.roomName = nextSlot.roomName;

        if (updatedTime < this.dayStart) {
            this.mode = 'opening';
        }

        if (updatedTime > this.dayEnd) {
            this.mode = 'closing';
        }
    }

    private loadRoom(roomId: string): void {
        this.scheduleService.getSchedule().subscribe(s => {
            let slots = s.slots;
            let localslots = [];
            let dayStart = undefined;
            let dayEnd = undefined;

            for (let slot of slots) {
                if (slot.roomId == roomId) {
                    localslots.push(slot);
                }

                if (slot.roomId != 'b_hall') {
                    if (!dayStart || dayStart > slot.fromTime) {
                        dayStart = slot.fromTime;
                    }

                    if (!dayEnd || dayEnd < slot.toTime) {
                        dayEnd = slot.toTime;
                    }
                }
            }

            console.log('Slots for room', roomId, 'are', localslots);

            this.slots = localslots;
            this.dayStart = dayStart;
            this.dayEnd = dayEnd;
            this.timerSubscription = Observable.timer(2000, 1000).subscribe(() => this.tick());
        });
    }

}
