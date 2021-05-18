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

    result = parseFloat(num1) / parseFloat(num2);

    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    
    switch(result){
      case "gal":
        return "gal";
        break;
      case "l":
        return "L";
        break;
      case "mi":
        return "mi";
        break;
      case "km":
        return "km";
        break;
      case "lbs":
        return "lbs";
        break;
      case "kg":
        return "kg";
        break;
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();
    
    switch(unit){
      case "gal":
        return "L";
        break;
      case "l":
        return "gal";
        break;
      case "mi":
        return "km";
        break;
      case "km":
        return "mi";
        break;
      case "lbs":
        return "kg";
        break;
      case "kg":
        return "lbs";
        break;
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let unit_l = unit.toLowerCase();
    
    switch(unit_l){
      case "gal":
        return "gallons";
        break;
      case "l":
        return "liters";
        break;
      case "mi":
        return "miles";
        break;
      case "km":
        return "kilometers";
        break;
      case "lbs":
        return "pounds";
        break;
      case "kg":
        return "kilograms";
        break;
      default:
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch(unit){
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
