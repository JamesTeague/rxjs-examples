import { ConnectableObservable, Observable } from 'rxjs';
import { publish, take } from 'rxjs/operators';
import {
  createColdObservable,
  createHotObservable,
  createObserver
} from './utility';

const demonstrateUnicast = () => {
  const unicast$ = createColdObservable();

  unicast$.subscribe(createObserver('1'));
  unicast$.subscribe(createObserver('2'));
};

const demonstrateMulticast = () => {
  const multicast$ = createHotObservable().pipe(take(20));

  const subscriber1 = multicast$.subscribe(createObserver('1'));
  const subscriber2 = multicast$.subscribe(createObserver('2'));

  setTimeout(() => {
    subscriber1.unsubscribe();
  }, 1000);
};

const makeHotByExtractingProducer = () => {
  // Cold implementation
  // const observable$ = new Observable(observer => {
  //   observer.next(Math.random());
  // });

  // Turned hot
  const random = Math.random();
  const observable$ = new Observable(observer => {
    observer.next(random)
  });

  observable$.subscribe(createObserver('1'));
  observable$.subscribe(createObserver('2'));
};

const makeHotByPublish = () => {
  const cold$ = createColdObservable();

  const hot$ = cold$.pipe(publish()) as ConnectableObservable<any>;

  hot$.subscribe(createObserver('1'));
  hot$.subscribe(createObserver('2'));

  // Connecting subscribes to inner Subscription, starting emissions of hot$
  hot$.connect();
};
