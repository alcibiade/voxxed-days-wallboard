import {Component} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Slot} from "./schedule";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private slots: Slot[];

    constructor(private scheduleService: ScheduleService) {
    }

    ngOnInit() {
        this.getSlots();
    }

    getSlots(): void {
        this.slots = this.scheduleService.getSlots();
    }
}
