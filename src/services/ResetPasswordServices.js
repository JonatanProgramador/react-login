


export default function ResetPasswordServices() {

    //const ENV = import.meta.env.VITE_URL_API;
    const ENV = "http://localhost/"

    async function resetPassword(email) {
        let response = await fetch(ENV+"resetpassword", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email:email})
        })
        return await response.json();
    }

    async function confirmPassword(code, password) {
        let response = await fetch(ENV+"resetpassword/"+code, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password: password})
        })
        return await response.json();
    }
    return {resetPassword, confirmPassword};
} 