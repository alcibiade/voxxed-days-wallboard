import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Slot} from "./schedule";
import {ScheduleService} from "./schedule.service";

@Component({
    selector: 'coming-next',
    templateUrl: './coming-next.component.html',
    styleUrls: ['./coming-next.component.sass']
})
export class ComingNextComponent implements OnChanges {
    @Input() timeNow: string;
    public nextSlots: Slot[] = [];
    entries: number = 5;

    constructor(private scheduleService: ScheduleService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.scheduleService.getSchedule().subscribe(s => {
            let next: Slot[] = [];

            s.slots.forEach(slot => {
                if (slot.fromTime >= this.timeNow && next.length < this.entries && slot.talk) {
                    next.push(slot);
                }
            });

            this.nextSlots = next;
        })
    }
}
