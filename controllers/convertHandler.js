function ConvertHandler() {

  function numberStringSplitter(input) {
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let string = input.match(/[a-zA-Z]+/g)[0];

    return [number[0], string];
  }

  function checkDiv(possibleFraction) {
    // 9/4/2 return false

    // 25 return ["25"]

    // 3/5 return ["3", "5"]
    let nums = possibleFraction.split("/");
    if (nums.length > 2) {
      return false;
    }
    return nums;
  }
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) {
      return undefined;
    }

    num1 = nums[0];
    num2 = nums[1] || "1";

    if (isNaN(num1) || isNaN(num2)) { // 會先將 x 轉換成數字類型 → .isNaN(Number(x))，再進行比對是否為 NaN(Not a number)
      return undefined;
    }

    result = (parseFloat(num1) / parseFloat(num2)).toFixed(5);

    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1];
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
