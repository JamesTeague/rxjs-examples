import { from, interval, Observable, of, range, timer } from 'rxjs';
import { take } from 'rxjs/operators';

const observer1 = {
  next: value => console.log(`Observer 1: ${value}`),
  complete: () => console.log('Observable complete.'),
};

const demonstrateCreateByClass = () => {
  const observable = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
  });

  observable.subscribe(observer1);
};

const demonstrateCreateByFrom = () => {
  from([1,2,3,4,5]).subscribe(observer1);
};

const demonstrateCreateByOf = () => {
  of([1,2,3,4,5]).subscribe(observer1);
};

const demonstrateCreateByRange = () => {
  range(1, 10).subscribe(observer1);
};

const demonstrateCreateByInterval = () => {
  interval(1000).pipe(take(3)).subscribe(observer1);
};

const demonstrateCreateByTimer = () => {
  timer(3000, 1000).pipe(take(3)).subscribe(observer1);
};

demonstrateCreateByTimer();
