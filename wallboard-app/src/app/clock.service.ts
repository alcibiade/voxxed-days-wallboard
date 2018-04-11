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

}
