import { signup, login, getUser, allusers } from "./index.js";


signup("yog34", "er1@gmail.com", "12345678")
    .then((res) => {
        console.log("Signup Success", res)
    })
    .catch((err) => {
        console.log("Signup Failed", err)
    })


    login("er@gmail.com", "12345678")
    .then(async (res) => {
        console.log("Login Success", res);
        
    })
    .catch((err) => {
        console.log("Login Failed", err);
    });



getUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUyZjdlMGY5MWNjYTViOTBlODA5ZSIsImlhdCI6MTc0MzA5NjIxNiwiZXhwIjoxNzQzMjY5MDE2fQ.7g4oXvNfOZGbo9PXu7xZdhn6uYa7LnMr-ncXUl_bpx4')
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