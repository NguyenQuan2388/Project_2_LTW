"use strict";

// eslint-disable-next-line no-unused-vars
function makeMultiFilter(originalArray) {

  let currentArray = [...originalArray];

  const arrayFilterer = (filterCriteria, callback) => {
    if (typeof filterCriteria !== "function") {
      return currentArray;
    }
    
    currentArray = currentArray.filter(filterCriteria);

    if (typeof callback === "function") {
      callback.call(originalArray, currentArray);
    }
    return arrayFilterer;
  };
  
  return arrayFilterer;
}
