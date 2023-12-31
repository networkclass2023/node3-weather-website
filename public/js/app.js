console.log("Client side is up");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
// messageOne.textContent='Loading. . .'
// messageTwo.textContent=' '

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location)
///http://localhost:3000
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent=data.error
        } else {
          messageOne.textContent=data.location
          messageTwo.textContent=data.forecast
        }
      });
    }
  );
});
