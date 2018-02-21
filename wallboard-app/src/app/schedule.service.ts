import {Injectable} from '@angular/core';
import {Slot} from './schedule';

@Injectable()
export class ScheduleService {

    constructor() {
    }

    getSlots(): Slot[] {
        return [];
    }

}
