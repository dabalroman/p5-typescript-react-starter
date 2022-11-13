import p5 from 'p5';
import { Ref } from 'react';

export default abstract class CanvasRenderer {
    p: p5;

    protected constructor (p: p5) {
        this.p = p;

        this.p.draw = this.draw.bind(this);
        this.p.setup = this.setup.bind(this);
    }

    static create (htmlRef: Ref<HTMLDivElement> | any, ...args: any): CanvasRenderer {
        let renderer: CanvasRenderer | any;

        // eslint-disable-next-line new-cap,no-new
        new p5((p: p5) => {
            // @ts-ignore
            renderer = new this(p, ...args);
        }, htmlRef.current);

        return renderer;
    }

    teardown (): void {
        this.p.remove();
    }

    setup (): void {
        this.p.disableFriendlyErrors = true;
        this.p.ellipseMode(this.p.CENTER);
        this.p.createCanvas(1280, 720, this.p.P2D);
        this.p.noStroke();
    }

    resize (width: number, height: number): void {
        if (width === 0 || height === 0) {
            return;
        }

        this.p.resizeCanvas(width, height);
    }

    draw (): void {
        this.p.background(0, 0, 0);
        this.p.fill(255);
        this.p.text('Hello world!', 0, 0);
    }
}
