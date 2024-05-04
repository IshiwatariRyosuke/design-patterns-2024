interface Observer{
    update(): void;
}

interface Observable{
    attach(observer:Observer):void;
    detach(observer:Observer):void;
    notify(): void;
}

class Twitch implements Observable{
    private subscribers:Observer[] = [];

    attach(observer: Observer): void {
        this.subscribers.push(observer);
    }
    detach(observer: Observer): void {
        const index = this.subscribers.indexOf(observer);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    }

    notify(): void {
        for(let subscriber of this.subscribers){
            subscriber.update();
        }
    }
}

class Subscriber implements Observer{
    private observable:Observable;
    constructor (observable:Observable){
        this.observable=observable;
    }

    update(): void {
        console.log('Notificacion Recibida');
        console.log(this.observable);
        
    }

    
}

const twitch = new Twitch();

const s1 = new Subscriber(twitch);
const s2 = new Subscriber(twitch);
const s3 = new Subscriber(twitch);

twitch.attach(s1);
twitch.attach(s2);
twitch.attach(s3);

twitch.detach(s2);

twitch.notify();