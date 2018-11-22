import pagex from './pagex';

// Testing the main file
describe("pagex()", () => {
  it("should be defined", () => {
    expect(pagex).toBeDefined();
  });

  it("can handle fake urls", () => {
    const cb = jest.fn();
    pagex(/hi/, false, cb, '/hi');
    expect(cb).toBeCalled();
  });
});



describe("Regex", () => {
  it("can handle a simple regex", () => {
    const cb = jest.fn();
    pagex(/./, false, cb, '/');
    expect(cb).toBeCalled();
  });

  it('can match a path', () => {
    const cb = jest.fn();
    pagex(/^\/hello/, false, cb, '/hello');
    expect(cb).toBeCalled();
  });

  it('will not match strict paths', () => {
    const cb = jest.fn();
    pagex(/^\/hello$/, false, cb, '/hello/world');
    expect(cb).not.toBeCalled();
  });

  it('can match a partial path if RegExp is right', () => {
    const cb = jest.fn();
    pagex(/^\/hello/, false, cb, '/hello/world');
    expect(cb).toBeCalled();
  });

  it('will ignore unmatched paths', () => {
    const cb = jest.fn();
    pagex(/^\/hello/, false, cb, '/world');
    expect(cb).not.toBeCalled();
  });

  it('can negate a path', () => {
    const cb = jest.fn();
    pagex(/^\/hello/, true, cb, '/hello');
    expect(cb).not.toBeCalled();
  });

  it('can negate a path', () => {
    const cb = jest.fn();
    pagex(/^\/bye/, true, cb, '/hello');
    expect(cb).toBeCalled();
  });

  it('Can retrieve a root variable', () => {
    pagex(/^\/([0-9]+)/, false, number => expect(number).toBe('42'), '/42');
    expect(pagex(/^\/([0-9]+)/, false, false, '/42')).toEqual(['42']);
  });

  it('Can retrieve a sub variable', () => {
    pagex(/^\/users\/([0-9]+)/, false, number => expect(number).toBe('42'), '/users/42');
    expect(pagex(/^\/([0-9]+)/, false, false, '/42')).toEqual(['42']);
  });

  it("can load recursively", () => {
    const cb = jest.fn();
    pagex(/test/, false, () => pagex(/test/, false, cb, '/test'), '/test');
    expect(cb).toBeCalled();
  });
});



describe("Paths", () => {
  it("can handle a simple path", () => {
    const cb = jest.fn();
    pagex('*', false, cb, '/');
    expect(cb).toBeCalled();
  });

  it('can match a path', () => {
    const cb = jest.fn();
    pagex('/hello', false, cb, '/hello');
    expect(cb).toBeCalled();
  });

  it('is strict with what it matches', () => {
    const cb = jest.fn();
    pagex('/hello', false, cb, '/hello/world');
    expect(cb).not.toBeCalled();
  });

  it('will ignore unmatched paths', () => {
    const cb = jest.fn();
    pagex('/hello', false, cb, '/world');
    expect(cb).not.toBeCalled();
  });

  it("can retrieve a root variable", () => {
    pagex('/:id', false, (id) => expect(id).toBe('42'), '/42');
    expect(pagex('/:id', false, false, '/42')).toEqual(['42']);
  });

  it("can retrieve a sub variable", () => {
    pagex('/users/:id', false, (id) => expect(id).toBe('42'), '/users/42');
    expect(pagex('/users/:id', false, false, '/users/42')).toEqual(['42']);
  });

  it("optional parameter is undefined if not there", () => {
    pagex('/users/:id?', false, (id) => {
      expect(id).toBe(undefined);
    }, '/users');
  });

  it("can load recursively", () => {
    const cb = jest.fn();
    pagex('/test', false, () => pagex('/test', false, cb, '/test'), '/test');
    expect(cb).toBeCalled();
  });
});
