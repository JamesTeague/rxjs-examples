import { AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { createObserver } from '../utility';

const demonstrateBehaviorSubject = () => {
  const subject = new BehaviorSubject(26);

  subject.subscribe(createObserver('1'));

  subject.next(27);
  subject.next(28);

  subject.subscribe(createObserver('2'));

  subject.next(29);
};

const demonstrateReplaySubject = () => {
  const subject = new ReplaySubject(2);

  subject.subscribe(createObserver('1'));

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);

  subject.subscribe(createObserver('2'));
};

const demonstrateAsyncSubject = () => {
  const subject = new AsyncSubject();

  subject.subscribe(createObserver('1'));

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);

  subject.subscribe(createObserver('2'));

  subject.next(5);
  subject.complete();
};


demonstrateAsyncSubject();