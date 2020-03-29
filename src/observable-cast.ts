import { take } from 'rxjs/operators';
import { createColdObservable, createHotObservable, createObserver } from './utility';

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
  }, 1000)
};

const makeColdObservableHot = () => {
  // TODO - Live Demo
};

demonstrateUnicast();