import { Observable } from 'rxjs';
import Notifier from './subject-challenge';

describe('Notifier', () => {
  let notifier;

  beforeEach(() => {
    notifier = new Notifier();
  });

  it('returns a new observable', () => {
    const observable$ = notifier.topic('test');

    expect(observable$).toBeInstanceOf(Observable);
  });

  it('emits a message to the subscriber', done => {
    const observable$ = notifier.topic('test');

    observable$.subscribe(data => {
      expect(data).toEqual({ payload: 'test' });
      done();
    });

    notifier.broadcast('test', { payload: 'test' });
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

    const observable$ = notifier.topic('test');

    observable$.subscribe(recordData);
    observable$.subscribe(recordData);

    notifier.broadcast('test', { payload: 'test' });
  });
});