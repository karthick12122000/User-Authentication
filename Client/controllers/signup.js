import API_URI from "../config/global.js";
async function signup(name, email, password) {
  try {
    try {
      const response = await fetch(API_URI + "/signup/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error:", err);
    }
  } catch (error) {
    console.log(error);
  }
  return "error";
}
export default signup;
