/**
 * Formats a date to a string
 * @param {Date} date, the Date object to be formatted
 * @returns a formatted String.
 */
export function formatDate(date) {
  let realDate = new Date(date);
	if(!realDate)
		return "";

    var mm = realDate.getMonth() + 1; // getMonth() is zero-based
    var dd = realDate.getDate();

    return [realDate.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
}

/**
 * Formats an location to a string
 * @param {?} location, the location to be formatted
 * @returns a formatted String.
 */
export function formatLocation(location) {
	if(!location)
		return "";
	
	return location;
}