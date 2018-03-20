import {Injectable} from "@angular/core";
import moment = require("moment");

@Injectable()
export class ClockService {
    private accelerationFactor: number;

    constructor() {
        this.accelerationFactor = 60;
    }

    getTime(): string {
        return moment.unix(moment().unix() * this.accelerationFactor).format('hh:mm');
    }

}
