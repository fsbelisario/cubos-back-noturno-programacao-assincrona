const fs = require("fs/promises");
const axios = require("axios");

let addressList = [];
let addressEnrolled;
let zipCode;

function checkZipCode(req, res) {
    addressEnrolled = false;
    zipCode = req.params.zipCode;
    const readAddressFile = fs.readFile("./data/enderecos.json");
    const verifyZipCodeInFile = readAddressFile.then(data => {
        addressList.push(JSON.parse(data)); //Problema: arquivo inicial ok. A partir da inclusão de novo endereço, os 2 endereços entram como 1 array dentro do array addressList.
        console.log(addressList);
        console.log(addressList.length);
        for (const item of addressList) {
            if (item.cep.replace("-", "") === zipCode) {
                addressEnrolled = true;
                break;
            }
        }
    });
    verifyZipCodeInFile.then(data => {
        if (!addressEnrolled) {
            const searchAddress = axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
            searchAddress.then((response) => {
                addressList.push(response.data);
                fs.writeFile("./data/teste.json", JSON.stringify(addressList));
                res.json(`O CEP ${zipCode} foi incluído com sucesso na lista de endereços.`);
            })
        } else {
            res.json(`O CEP ${zipCode} já se encontra cadastrado na lista de endereços.`);
        }
    });
}

module.exports = { checkZipCode };