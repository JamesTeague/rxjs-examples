import { Subscription } from 'rxjs';
import {
  createColdObservable,
  createHotObservable,
  createObserver,
  createWarmObservable
} from './utility';

const demonstrateColdObservable = () => {
  const cold$ = createColdObservable();

  cold$.subscribe(createObserver('1'));
};

const demonstrateWarmObservable = () => {
  let subscriber1: Subscription;
  const warm$ = createWarmObservable();

  setTimeout(() => {
    subscriber1 = warm$.subscribe(createObserver('1'));
  }, 2000);

  setTimeout(() => {
    subscriber1.unsubscribe();
  }, 10000);
};

const demonstrateHotObservable = () => {
  let subscriber1: Subscription;
  const hot$ = createHotObservable();

  setTimeout(() => {
    subscriber1 = hot$.subscribe(createObserver('1'));
  }, 1000);

  setTimeout(() => {
    subscriber1.unsubscribe();
  }, 5000);
};
