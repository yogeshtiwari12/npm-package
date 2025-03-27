import { signup, login, getUser, allusers } from "./index.js";


signup("temp_user", "temp@gmail.com", "12345678")
    .then((res) => {
        console.log("Signup Success", res)
    })
    .catch((err) => {
        console.log("Signup Failed", err)
    })


login("temp@gmail.com", "12345678")
    .then(async (res) => {
        console.log("Login Success", res);
        
    })
    .catch((err) => {
        console.log("Login Failed", err);
    });



getUser('pass_the_token_here') // Replace with the actual token you get from login
    .then((res) => {
        console.log("Get User Success", res)
    })
    .catch((err) => {
        console.log("Get User Failed", err)
    })



allusers()
    .then((res) => {
        console.log("All Users Success", res)
    })
    .catch((err) => {
        console.log("All Users Failed", err)
    })