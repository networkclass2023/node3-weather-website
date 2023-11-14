import request from "request";

const geocode = (address, callback) => {
  const geocodeURL =
    "https://ipgeolocation.abstractapi.com/v1/?api_key=d7cb47ed952b4cb18012a3a36eebe3f1";

  request({ url: geocodeURL, json: true }, (error, {body}) => {
    if (error) {
      callback("This is error", undefined);
    } else {
      callback(undefined, {
        longitude: body.longitude,
        latitude: body.latitude,
        location: body.country,
      });
    }
  });
};
export default geocode;
