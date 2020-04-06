import { Observable } from 'rxjs';
import Notifier from './subject-challenge';

describe('Notifier', () => {
  let memoryNotifier;

  beforeEach(() => {
    memoryNotifier = new Notifier();
  });

  it('returns a new observable', () => {
    const observable$ = memoryNotifier.topic('test');

    expect(observable$).toBeInstanceOf(Observable);
  });

  it('emits a message to the subscriber', done => {
    const observable$ = memoryNotifier.topic('test');

    observable$.subscribe(data => {
      expect(data).toEqual({ payload: 'test' });
      done();
    });

    memoryNotifier.broadcast('test', { payload: 'test' });
  });

  it('is multicasted', done => {
    let calls = 0;
    const callLimit = 2;
    const emittedData: any[] = [];

    const recordData = (data: any) => {
      calls++;
      emittedData.push(data);

      if (calls === callLimit) {
        expect(emittedData).toHaveLength(2);
        expect(emittedData[0]).toMatchObject(emittedData[1]);
        done();
      }
    };

    const observable$ = memoryNotifier.topic('test');

    observable$.subscribe(recordData);
    observable$.subscribe(recordData);

    memoryNotifier.broadcast('test', { payload: 'test' });
  });
});