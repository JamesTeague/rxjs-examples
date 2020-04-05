import { ConnectableObservable, defer, Observable, of, Subject } from 'rxjs';
import { createObserver } from './utility';
import { multicast } from 'rxjs/operators';

const factory$ = defer(() => of(Math.random()));

// const myMulticast = <T>(source$: Observable<T>) => {
//   const subject = new Subject<T>();
//
//   source$.subscribe(subject);
//
//   return subject;
// };
//
// const multicast$ = myMulticast(factory$);

const multicast$ = factory$.pipe(multicast(new Subject())) as ConnectableObservable<any>;
multicast$.subscribe(createObserver('1'));
multicast$.subscribe(createObserver('2'));
multicast$.connect();
