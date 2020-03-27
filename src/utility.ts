import { interval, Observable, Observer, Subscriber } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

export const createHotObservable = () => {
  let observers: Subscriber<any>[] = [];
  let tick = 0;
  setInterval(() => {
    tick++;
    observers.forEach( o => o.next(tick));
  }, 100);

  return new Observable(observer => {
    observers.push(observer);

    return () => {
      let i = observers.indexOf(observer);
      observers.splice( i, 1 );
    }
  });
};

export const createColdObservable = () =>
  new Observable(observer => {
    observer.next(Math.random());
    observer.next(Math.random());
    observer.next(Math.random());
  });

export const createWarmObservable = () => interval(1000).pipe(publish(), refCount());

export const createObserver = (id: string): Observer<any> => ({
  next: value => console.log(`Observer ${id}: ${value}`),
  complete: () => console.log(`Observer ${id}: complete`),
  error: err => console.log(`Observer ${id}: ${err}`),
});