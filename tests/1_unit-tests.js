const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)', function() {
    test('read a whole number input.', function(done) {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    })
    test('read a decimal number input.', function(done) {
      let input = '32.25L';
      assert.equal(convertHandler.getNum(input), 32.25);
      done();
    })
    test('read a fractional input.', function(done) {
      let input = '13/36L';
      assert.equal(convertHandler.getNum(input), 13/36);
      done();
    })
    test('read a fractional input with a decimal.', function(done) {
      let input = '13.5/36L';
      assert.equal(convertHandler.getNum(input), 13.5/36);
      done();
    })
    test('return an error on a double-fraction (i.e. 3/2/3).', function(done) {
      let input = '4/13/36L';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    })
    test('default to a numerical input of 1 when no numerical input is provided.', function(done) {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
  })

  suite('Function convertHandler.getUnit(input)', function() {
    test('read each valid input unit.', function(done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
      let output = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];

      input.forEach((ele, index) => {
          assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    })
    test('return an error for an invalid input unit', function(done) {
      let input = '32kkg';
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    })
  })

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('return the correct return unit for each valid input unit.', function(done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let output = ["L", "gal", "km", "mi", "kg", "lbs"];

      input.forEach((ele, index) => {
          assert.equal(convertHandler.getReturnUnit(ele), output[index]);
      });
      done();
    })
  })

  suite('Function convertHandler.spellOutUnit(input)', function() {
    test('return the spelled-out string unit for each valid input unit.', function(done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let output = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];

      input.forEach((ele, index) => {
          assert.equal(convertHandler.spellOutUnit(ele), output[index]);
      });
      done();
    })
  })

  suite('Function convertHandler.convert(initNum, initUnit)', function() {
    test('gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test('L to gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test('mi to km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test('km to mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10685;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test('lbs to kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test('kg to lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.02311;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
  })
});