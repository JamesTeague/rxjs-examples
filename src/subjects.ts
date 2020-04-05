import { Subject } from 'rxjs';
import { createColdObservable, createObserver } from './utility';

const demonstrateSubjectAsObservable = () => {
  const subject = new Subject();

  subject.subscribe(createObserver('1'));
  subject.subscribe(createObserver('2'));

  subject.next('Subjects are Multicast.');

  subject.subscribe(createObserver('3'));

  subject.next('Subjects by definition are hot.');
};

const demonstrateSubjectAsObserver = () => {
  const cold$ = createColdObservable();
  const subject = new Subject();

  subject.subscribe(createObserver('1'));
  subject.subscribe(createObserver('2'));
  subject.subscribe(createObserver('3'));

  cold$.subscribe(subject);
};

demonstrateSubjectAsObservable();
