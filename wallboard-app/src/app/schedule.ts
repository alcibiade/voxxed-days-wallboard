export class Link {
    href: string;
}

export class SpeakerDetails {
    firstName: string;
    lastName: string;
    twitter: string;
    company: string;
    avatarURL: string;
}

export class Speaker {
    name: string;
    link: Link;
    details: SpeakerDetails;
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
