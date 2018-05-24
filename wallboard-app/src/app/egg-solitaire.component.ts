import {AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
    selector: 'egg-solitaire',
    templateUrl: './egg-solitaire.component.html',
    styleUrls: ['./egg-solitaire.component.sass']
})
export class EggSolitaireComponent implements AfterViewInit, OnChanges {
    @ViewChild('egg') eggCanvas: ElementRef;
    private king: HTMLImageElement = new Image();
    private posX: number = undefined;
    private posY: number = undefined;
    private spdX: number = undefined;
    private spdY: number = undefined;

    constructor() {
    }

    ngAfterViewInit() {
        this.king.src = 'assets/ms-king-hearts.png';
        this.draw();
    }

    draw(): void {
        if (this.posX == undefined) {
            this.posX = 1500 + 300 * Math.random();
            this.posY = 200 + 300 * Math.random();
            this.spdX = -5;
            this.spdY = 0;
        }

        let context: CanvasRenderingContext2D = this.eggCanvas.nativeElement.getContext('2d');
        context.drawImage(this.king, this.posX, this.posY, 71 * 2, 96 * 2);

        if (this.posY > 900) {
            this.spdY = -this.spdY * 0.9;
        }

        this.posX += this.spdX;
        this.posY += this.spdY;

        this.spdY += 1;

        if (this.posX < -150) {
            this.posX = undefined;
        }

        requestAnimationFrame(() => this.draw());
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

}
