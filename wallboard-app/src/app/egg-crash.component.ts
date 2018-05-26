import {Component, Input} from '@angular/core';

@Component({
    selector: 'egg-crash',
    templateUrl: './egg-crash.component.html',
    styleUrls: ['./egg-crash.component.sass']
})
export class EggCrashComponent {
    @Input() roomId: string;
}
