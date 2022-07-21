function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, [delay]);
  };
}

// calling funtion
function sendUserData() {
  console.log("Sending user data", username, password);
}

debounce(sendUserData, 2000)((username = "Mohit"), (password = "12345"));
