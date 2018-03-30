import {Component, OnInit} from '@angular/core';
import {Room} from "./schedule";
import {ScheduleService} from "./schedule.service";

@Component({
    selector: 'app-rooms-list',
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
    rooms: Set<Room>;

    constructor(private scheduleService: ScheduleService) {
        this.rooms = new Set();
    }

    ngOnInit() {
        this.scheduleService.getSchedule().subscribe(s => {
            let slots = s.slots;
            let rooms = new Map();

            for (let slot of slots) {
                rooms.set(slot.roomId, new Room(slot.roomId, slot.roomName));
            }

            console.log('Rooms are now', rooms);
            this.rooms = new Set(rooms.values());
        });
    }
}
