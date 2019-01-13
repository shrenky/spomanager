
import 'jest';
 
import { MockDataService } from './MockDataService';
 
let sut: MockDataService;
 
beforeEach(() => {
  this.sut = new MockDataService();
});
 
test('getTenantUrl() returns the correct result', () => {
  const result = MockDataService.getTenantUrl();
  expect(result).toEqual('https://contoso.sharepoint.com');
});
 
/*
test('addAsync() returns the correct result', (done) => {
  this.sut.addAsync(5,2, (result) => {
    expect(result).toEqual(7);
    done();
  });
});
 
test('addPromise() returns correct result', () => {
  expect.assertions(1);
 
  return this.sut.addPromise(5,6)
    .then((result: number) => {
      expect(result).toEqual(11);
    });
});
 
test('addPromise() catches expected exception', () => {
  expect.assertions(1);
 
  return this.sut.addPromise(5,4)
    .then((result: number) => {
      expect(result).toEqual(11);
    })
    .catch((e:Error) => {
      expect(e.message).toEqual('Forced reject when result =9');
    });
});*/