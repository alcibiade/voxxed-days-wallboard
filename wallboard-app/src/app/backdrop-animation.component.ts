import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as boids from 'boids';

@Component({
    selector: 'backdrop-animation',
    templateUrl: './backdrop-animation.component.html',
    styleUrls: ['./backdrop-animation.component.sass']
})
export class BackdropAnimationComponent implements OnInit, OnDestroy {

    @ViewChild('animatedCanvas') canvasRef: ElementRef;
    private running: boolean;
    private flock: any;

    ngOnInit() {
        this.flock = boids({
            boids: 50,               // The amount of boids to use
            speedLimit: 20,         // Max steps to take per tick
            accelerationLimit: 1,   // Max acceleration per tick
            separationDistance: 60, // Radius at which boids avoid others
            alignmentDistance: 500, // Radius at which boids align with others
            choesionDistance: 500,  // Radius at which boids approach others
            separationForce: 0.15,  // Speed to avoid at
            alignmentForce: 0.25,   // Speed to align with other boids
            choesionForce: 0.1,     // Speed to move towards other boids
            attractors: [
                [-100, 340, 1000, 1],
                [1200, 740, 1000, 1],
                [800, 205, 1000, 1],
                [1000, 847, 1000, 1]
            ]
        });
        this.running = true;
        this.paint();
    }

    ngOnDestroy() {
        this.running = false;
    }

    private paint() {
        // Check that we're still running.
        if (!this.running) {
            return;
        }

        // Paint current frame
        let ctx: CanvasRenderingContext2D =
            this.canvasRef.nativeElement.getContext('2d');

        // Draw background (which also effectively clears any previous drawing)
        ctx.fillStyle = 'rgb(12, 94, 9)';
        ctx.fillRect(0, 0, 1920, 1080);

        // Advance flock. This updates the positions of all objects.
        this.flock.tick();

        // Draw flock
        ctx.beginPath();
        ctx.fillStyle = `rgb(30,128,40)`;
        for (const [x, y, speedX, speedY] of this.flock.boids) {
            const angle = Math.atan2(speedY, speedX) + 0.5 * Math.PI;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.scale(0.4, 0.4);
            ctx.fillRect(0, 0, 100, 100);
            ctx.restore();
        }

        // Schedule next
        requestAnimationFrame(() => this.paint());
    }
}
