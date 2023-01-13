// jshint esversion:6

// returns weekday, day, moth and year
exports.getDate = function() {
  const today = new Date();

  const option = {
    weekday: "long",
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return  today.toLocaleDateString('en-US', option);

}

// returns day
exports.getDay = function () {

  const today = new Date();

  const option = {
    weekday: "long"

  };

  return  today.toLocaleDateString('en-US', option);

}
