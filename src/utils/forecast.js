import request from "request";
function forecast(latitude, longitude, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=3a75eddcfd77d2ace8e2d197c8d13e80&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.feelslike +
          "% chance of rain."
      );
    }
  });
}
export default forecast;
