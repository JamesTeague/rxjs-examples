import { from, interval, Observable, of, range, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { createObserver } from './utility';

const demonstrateCreateByClass = () => {
  const observable$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  });

  observable$.subscribe(createObserver('1'));
};

const demonstrateCreateByFrom = () => {
  from([1, 2, 3, 4, 5]).subscribe(createObserver('1'));
};

const demonstrateCreateByOf = () => {
  of([1, 2, 3, 4, 5]).subscribe(createObserver('1'));
};

const demonstrateCreateByRange = () => {
  range(1, 10).subscribe(createObserver('1'));
};

const demonstrateCreateByInterval = () => {
  interval(1000)
    .pipe(take(3))
    .subscribe(createObserver('1'));
};

const demonstrateCreateByTimer = () => {
  timer(3000, 1000)
    .pipe(take(3))
    .subscribe(createObserver('1'));
};

demonstrateCreateByTimer();
