export class Talk {

}

export class Slot {
    roomId: string;
    roomName: string;

    // Time is in hh:mm string format
    fromTime: string;
    toTime: string;

    talk: Talk
}

export class Schedule {
    slots: Slot[];
}

export class Room {
    constructor(public roomId: string,
                public roomName: string) {
    }
}
