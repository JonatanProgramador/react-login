


export default function UserServices() {

    const ENV = import.meta.env.VITE_URL_API;

    async function register(data) {
        let response = await fetch(ENV+"user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: data.name, password: data.password, message:data.message})
        })
        return await response.json();
    }

    async function login(data) {
        let response = await fetch(ENV+"auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: data.name, password: data.password})
        })
        return await response.json();
    }
    return {register, login};
} 