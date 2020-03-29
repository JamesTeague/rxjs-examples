import { createColdObservable, createHotObservable, createWarmObservable } from './utility';

const demonstrateColdObservable = () => {
  const cold$ = createColdObservable();

  cold$.subscribe(value => console.log(value));
};

const demonstrateWarmObservable = () => {
  const warm$ = createWarmObservable();

  setTimeout(() => {
    warm$.subscribe(value => console.log(value));
  } ,2000)
};

const demonstrateHotObservable = () => {
  const hot$ = createHotObservable();

  setTimeout(() => {
    hot$.subscribe(value => console.log(value))
  }, 1000)
};
