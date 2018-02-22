import {Component} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Slot} from "./schedule";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    slots: Slot[];

    constructor(private scheduleService: ScheduleService) {
        this.slots = []
    }

    ngOnInit() {
        this.getSlots();
    }

    getSlots(): void {
        this.scheduleService.getSlots().subscribe(s => this.slots = s.body.slots)
    }
}
