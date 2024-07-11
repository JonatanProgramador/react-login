import env from "../../env";


export default function UserServices() {

    const ENV = env();

    async function register(data) {
        let response = await fetch(ENV.URL_API+"user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: data.name, password: data.password, message:data.message})
        })
        return await response.json();
    }

    async function login(data) {
        let response = await fetch(ENV.URL_API+"auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: data.name, password: data.password})
        })
        return await response.json();
    }
    return {register, login};
} 