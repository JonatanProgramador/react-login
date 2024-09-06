


export default function UserServices() {

    //const ENV = import.meta.env.VITE_URL_API;
    const ENV = "http://localhost/"

    async function register(data) {
        let response = await fetch(ENV+"user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: data.name, password: data.password, message:data.message})
        })
        return await response.json();
    }

    async function login(name, password) {
        let response = await fetch(ENV+"auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic "+ btoa(name+":"+password)
            },
    })
        return await response.json();
    }

    async function showUser(id, token) {
        let response = await fetch(ENV+"user/"+id, {
            method: "GET",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            }
        })
        return await response.json();
    }

    async function getUsers(token) {
        let response = await fetch(ENV+"user", {
            method: "GET",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            }
        })
        return await response.json();
    }

    return {register, login, getUsers, showUser};
} 