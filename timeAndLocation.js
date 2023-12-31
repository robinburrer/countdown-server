const Reader = require('@maxmind/geoip2-node').Reader;

// LOCATION
//https://maxmind.github.io/GeoIP2-node/index.html
let reader;
const initReader = async () => {
  reader = await Reader.open(
    '/Users/robinburrer/git-syzygy/team-2/countdown-server/GeoLite2-City.mmdb',
    {}
  );
};
initReader();

const readLocation = (req) => {
  if (!reader) return;
  const response = reader.city('109.192.195.211');

  console.log('country:', response.country.isoCode);
  console.log('city:', response.city.names.en);
  console.log('potal code:', response.postal.code);
  console.log('timezone:', response.location.timeZone);
};

module.exports = readLocation;
