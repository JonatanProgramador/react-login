import UserServices from "../services/UserServices.js";

const { login } = UserServices();
const TESTLOGIN = [
    {
        data: { name: "battusay", password: "1234" },
        result: 200,
        message: "Login correcto "
    },
    {
        data: { name: "asd", password: "1234" },
        result: 204,
        message: "Usuario no existe "
    },
    {
        data: { name: "battusay", password: "12" },
        result: 205,
        message: "Contraseña incorrecta "
    }
];


    async function testLogin (data) {
        let response = await login(data.data);
        let exit = data.message;
        if (response.code === data.result) {
            exit += "PASS"
            console.log("\x1b[32m"+exit+"\x1b[0m");
        } else {
            exit += "ERROR"
            console.log("\x1b[31m"+exit+"\x1b[0m");
        }
    }

    function runLogin()  {
        TESTLOGIN.forEach((value)=> {
            testLogin(value);
        })
    };

    export {runLogin};