var expect = chai.expect;

// Testing the main file
describe("pagex()", function() {
  it("should be defined", function() {
    expect(!!pagex).to.equal(true);
  });

  it("can handle fake urls", function(done) {
    pagex(/hi/, false, done, '/hi');
  });
});



describe("Regex", function(){

  it("can handle a simple regex", function(done) {
    pagex(/./, false, function () {
      done();
    }, '/');
  });

  it('Can retrieve a root variable', function(done){
    pagex(/^\/([0-9]+)/, false, function (number) {
      expect(number).to.equal('42');
      done();
    }, '/42');
  });

  it('Can retrieve a sub variable', function(done){
    pagex(/^\/users\/([0-9]+)/, false, function (number) {
      expect(number).to.equal('42');
      done();
    }, '/users/42');
  });

  it("can load recursively", function(done) {
    pagex(/test/, false, function () {
      pagex(/test/, false, function(){
        done();
      }, '/test');
    }, '/test');
  });
});



describe("Paths", function(){
  it("can handle a simple path", function(done) {
    pagex('*', false, function () {
      done();
    }, '/');
  });

  it("can retrieve a root variable", function(done) {
    pagex('/:id', false, function (id) {
      expect(id).to.equal('42');
      done();
    }, '/42');
  });

  it("can retrieve a sub variable", function(done) {
    pagex('/users/:id', false, function (id) {
      expect(id).to.equal('42');
      done();
    }, '/users/42');
  });

  it("can load recursively", function(done) {
    pagex('/test', false, function () {
      pagex('/test', false, function(){
        done();
      }, '/test');
    }, '/test');
  });
});
