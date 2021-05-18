const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
// Convert a valid input such as 10L: GET request to /api/convert.
// Convert an invalid input such as 32g: GET request to /api/convert.
// Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
// Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
// Convert with no number such as kg: GET request to /api/convert.
suite('Functional Tests', function() {
  suite('Routing Tests', function() {
    suite('GET api/convert => conversion object', function() {
      test('Convert 10L (valid input)', function(done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        })
      })
      test('Convert 32g (invalid input)', function(done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initUnit, undefined);
          done();
        })
      })
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, undefined);
          done();
        })
      })
      test('Convert 3/7.2/4kilomegagram (invalid number AND unit)', function(done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, undefined);
          assert.equal(res.body.initUnit, undefined);
          done();
        })
      })
      test('Convert kg (no number)', function(done) {
        chai
        .request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          done();
        })
      })
    })
  })
});
