export class Speaker {
    name: string;
}

export class Talk {
    speakers: Speaker[];
    lang: string;
    summary: string;
    summaryAsHtml: string;
    talkType: string;
    track: string;
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
