const ITUNES_URL = 'https://itunes.apple.com/search?';
const PARAM_TERM = 'term=';
const PARAM_COUNTRY = 'country=CA';
const PARAM_MEDIA = 'media=software';
const PARAM_LIMIT = 'limit=1'

function getITunesLink() {
  return `${ITUNES_URL}${PARAM_LIMIT}&${PARAM_MEDIA}&${PARAM_COUNTRY}&${PARAM_TERM}`;
}
function getITunesTermLink(term) {
  return `${getITunesLink()}${term}`;
}

module.exports.getITunesLink = getITunesLink;
module.exports.getITunesTermLink = getITunesTermLink;