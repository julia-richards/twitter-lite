const signUpForm = document.querySelector('.sign-up-form')
signUpForm.addEventListener("submit", async (e) =>{
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const email = formData.get("email")
  const password = formData.get("password")
  const username = formData.get("username")

  const body = { email, password, username };

  try{
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    if(!res.ok){
      throw res
      }
  } catch (err){

  }
  
})