import {Relay, Board, Led} from 'johnny-five';

export class Light {
    private board = new Board({port: 'COM3'});
    private relay1: Relay;
    private relay2: Relay;
    private led: Led;

    constructor() {
        this.board.on('ready', () => {
            this.relay1 = new Relay({pin: 10, type: 'NC'});
            this.relay2 = new Relay({pin: 9, type: 'NC'});
            this.led = new Led(11);

            setInterval(() => {
                this.relay1.toggle();
                this.relay2.toggle();
                this.led.toggle();
            }, 500)
        });
    }
}
