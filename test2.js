import { log } from "console"
import { allusers, getUser,logout } from "./index.js"


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