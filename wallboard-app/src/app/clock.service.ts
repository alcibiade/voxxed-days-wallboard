import {Injectable} from "@angular/core";
import * as moment from "moment";
import {Moment} from "moment";
import {environment} from "../environments/environment";

@Injectable()
export class ClockService {
    private dateFormat: string;
    private baseTime: Moment;
    private accelerationFactor: number;
    private mappedHour: number;

    constructor() {
        this.dateFormat = 'hh:mm';
        this.accelerationFactor = 60;
        this.baseTime = moment();
        this.mappedHour = 10;
    }

    getTime(): string {
        if (environment.shiftClock) {
            let now = moment();
            let elapsed = now.unix() - this.baseTime.unix();
            return moment
                .unix(now.hour(this.mappedHour).unix() + elapsed * this.accelerationFactor)
                .format(this.dateFormat);
        } else {
            return moment().format(this.dateFormat);
        }
    }

    calculateProgress(timeFrom: string, timeTo: string, timeNow: string) {
        let mFrom: Moment = moment(timeFrom, this.dateFormat);
        let mTo: Moment = moment(timeTo, this.dateFormat);
        let mNow: Moment = moment(timeNow, this.dateFormat);

        let progress = moment.duration(mNow.diff(mFrom));
        let total = moment.duration(mTo.diff(mFrom));

        let percent = 100 * progress.asMinutes() / total.asMinutes();

        return percent + '%';
    }
}
