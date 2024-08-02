module.exports.toSuperScript = function toSuperScript(num) {
  const lastDig = num % 10;
  if (lastDig === 2) {
    return num.toString() + "nd";
  } else if (lastDig === 3) {
    return num.toString() + "rd";
  } else {
    return num.toString() + "th";
  }
};
