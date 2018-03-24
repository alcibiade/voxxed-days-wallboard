import {Injectable} from "@angular/core";
import * as moment from "moment";
import {Moment} from "moment";

@Injectable()
export class ClockService {
    private baseTime: Moment;
    private accelerationFactor: number;

    constructor() {
        this.accelerationFactor = 60;
        this.baseTime = moment();
    }

    getTime(): string {
        let now = moment();
        let elapsed = now.unix() - this.baseTime.unix();

        return moment.unix(now.hour(8).unix() + elapsed * this.accelerationFactor).format('hh:mm');
    }

}
