/**
* Converts file size from bytes to megabytes.
*
* @param {number} bytes - The file size in bytes.
* @return {string} - The file size in megabytes formatted to two decimal places.
*/
export const convertBytesToMB = (bytes) => {
    const MB = bytes / (1024 * 1024);
    return MB.toFixed(2) + ' MB';
}

/**
 * Converts a UNIX timestamp to a readable date format.
 *
 * @param {number} timestamp - The UNIX timestamp.
 * @return {string} - The formatted date.
 */
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}