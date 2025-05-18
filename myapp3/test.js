import { signup, login, getUser, allusers, logout } from "authmate-js";

const email = "3434@gmail.com";
const name = "Test User";
const password = "password123";

signup(name, email, password)
    .then(s =>{
        console.log("Signup result:", s);
    })
    .catch(error => {
        console.error("Signup failed:", error);
    })


    login(email, password)
    .then(lr => {
        console.log("Login result:", lr.message)

        getUser(lr.userId)
        .then(userResult => {
            console.log("Get User result:", userResult);
        })
        .catch(error => {
            console.error("Get User failed:", error);
        })

        })
        .catch(error =>{
            console.error("Login failed:", error);  
        })          


   allusers()
    .then(allUsersResult => {
        console.log("All Users result:", allUsersResult);
    })
    .catch(error => {
        console.error("All Users failed:", error);
    })
  
