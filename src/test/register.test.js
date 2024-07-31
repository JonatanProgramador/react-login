import UserServices from "../services/UserServices.js";

const { register } = UserServices();

const TESTREGISTER = [
    {
        data: { name: "battusay", password: "1234", message: "Hola battusay" },
        result: 200,
        message: "Registro completo correcto "
    },
    {
        data: { name: "kenshin", password: "1234" },
        result: 200,
        message: "Registro sin mensaje correcto "
    }
];

async function testRegister (data) {
    let response = await register (data.data);
    let exit = data.message;
    if (response.code === data.result) {
        exit += "PASS"
        console.log("\x1b[32m"+exit+"\x1b[0m");
    } else {
        exit += "ERROR"
        console.log("\x1b[31m"+exit+"\x1b[0m");
    }
}


function runRegister()  {
    TESTREGISTER.forEach((value)=> {
        testRegister(value);
    })
};

export {runRegister};