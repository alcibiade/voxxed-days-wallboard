import {Component, Input, OnChanges} from '@angular/core';
import {Room, Slot} from "./schedule";

@Component({
    selector: 'app-rooms-list',
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnChanges {
    @Input() slots: Slot[];
    rooms: Set<Room>;

    constructor() {
    }

    ngOnChanges() {
        let rooms = new Map();

        for (let slot of this.slots) {
            rooms.set(slot.roomId, new Room(slot.roomId, slot.roomName));
        }

        console.log('Rooms are now', rooms);
        this.rooms = new Set(rooms.values());
    }
}
