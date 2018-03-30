import {Component, Input, OnInit} from '@angular/core';
import {Slot} from "./schedule";

@Component({
    selector: 'app-slot-details',
    templateUrl: './slot-details.component.html',
    styleUrls: ['./slot-details.component.sass']
})
export class SlotDetailsComponent implements OnInit {
    @Input() public slot: Slot;

    constructor() {
    }

    ngOnInit() {
    }

}
