import moment from 'moment';

/**
 * Formats a date to a string
 * @param {Date} date, the Date object to be formatted
 * @returns {string} a formatted String.
 */
export function formatDate(date) {
  let realDate = moment(date);

  return realDate.isValid() ? realDate.format('YYYY-MM-DD') : '';
}

/**
 * Formats a date to a unix ms timestamp
 * @param {Date} date, the Date object to be formatted
 * @returns {Integer} a formatted unix ms timestamp.
 */
export function formatDateUnix(date) {
  let realDate = moment(date);

  return realDate.isValid() ? parseInt(realDate.format('x'), 10) : '';
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