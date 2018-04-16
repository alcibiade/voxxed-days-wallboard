import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClockService} from "./clock.service";

@Component({
    selector: 'talk-progress',
    templateUrl: './talk-progress.component.html',
    styleUrls: ['./talk-progress.component.sass']
})
export class TalkProgressComponent implements OnChanges {
    @Input() public timeFrom: string;
    @Input() public timeTo: string;
    @Input() public timeNow: string;
    public progress: string;

    constructor(private clockService: ClockService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.progress = this.clockService.calculateProgress(this.timeFrom, this.timeTo, this.timeNow);
    }

}
