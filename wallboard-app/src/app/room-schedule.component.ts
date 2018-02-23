import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Slot} from "./schedule";
import {ActivatedRoute, Params, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    selector: 'app-room-schedule',
    templateUrl: './room-schedule.component.html',
    styleUrls: ['./room-schedule.component.css']
})
export class RoomScheduleComponent implements OnInit {
    currentTalk: Slot;
    nextTalk: Slot;
    slots: Slot[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private scheduleService: ScheduleService) {
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

    loadRoom(roomId: string): void {
        console.log('Loading room ' + roomId);

        this.scheduleService.getSlots().subscribe(s => {
            let slots = s.body.slots;
            let localslots = [];

            for (let slot of slots) {
                if (slot.roomId == roomId) {
                    localslots.push(slot);
                }
            }

            this.slots = localslots;
        });
    }

}
