export class Slot {
    roomId: string;
    roomName: string;
}

export class Schedule {
    slots: Slot[];
}

export class Room {
    constructor(public roomId: string,
                public roomName: string) {
    }
}
