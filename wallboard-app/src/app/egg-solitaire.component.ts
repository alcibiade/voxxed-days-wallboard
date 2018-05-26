import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

@Component({
    selector: 'egg-solitaire',
    templateUrl: './egg-solitaire.component.html',
    styleUrls: ['./egg-solitaire.component.sass']
})
export class EggSolitaireComponent implements AfterViewInit, OnDestroy {
    @ViewChild('egg') eggCanvas: ElementRef;
    private king: HTMLImageElement = new Image();
    private active: boolean = false;
    private posX: number = undefined;
    private posY: number = undefined;
    private spdX: number = undefined;
    private spdY: number = undefined;

    ngAfterViewInit() {
        this.king.src = 'assets/ms-king-hearts.png';
        this.active = true;
        this.draw();
    }

    ngOnDestroy(): void {
        this.active = false;
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

        if (this.active) {
            requestAnimationFrame(() => this.draw());
        }
    }

}
