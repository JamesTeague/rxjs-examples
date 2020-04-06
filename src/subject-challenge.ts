import { Observable, Observer, Subscriber } from 'rxjs';

export default class Notifier {
  private readonly subscribers: Map<string, Array<Subscriber<any>>>;

  constructor() {
    this.subscribers = new Map();
  }

  public topic(key: string) {
    return new Observable(observer => {
      if (!this.subscribers.get(key)) {
        this.subscribers.set(key, []);
      }

      (this.subscribers.get(key) as Array<Subscriber<any>>).push(observer);

      return () => {
        const subs = this.subscribers.get(key) as Array<Subscriber<any>>;
        const index = subs.indexOf(observer);

        if (index !==-1) {
          subs.splice(index, 1);
        }

        if (subs.length === 0) {
          this.subscribers.delete(key);
        }
      }
    })
  }

  public broadcast(topic, message) {
    const subs = this.subscribers.get(topic);
    if (subs) {
      subs.forEach(subscription => subscription.next(message || ''));
    }
  }
}
