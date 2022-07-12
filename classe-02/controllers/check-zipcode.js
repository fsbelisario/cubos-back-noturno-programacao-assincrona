const fs = require("fs/promises");
const axios = require("axios");

let addressEnrolled;
let zipCode;

function checkZipCode(req, res) {
    let addressList = [];
    addressEnrolled = false;
    zipCode = req.params.zipCode;
    const readAddressFile = fs.readFile("./data/enderecos.json");
    const verifyZipCodeInFile = readAddressFile.then(data => {
        addressList = JSON.parse(data);
        for (const item of addressList) {
            if (item.cep.replace("-", "") === zipCode) {
                addressEnrolled = true;
                break;
            }
        }
    });
    verifyZipCodeInFile.then(data => {
        let formattedZipCode = [zipCode.slice(0, 2), ".", zipCode.slice(2, 5), "-", zipCode.slice(5)].join('');
        if (!addressEnrolled) {
            const searchAddress = axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
            searchAddress.then((response) => {
                if (!response.data.erro) {
                    addressList.push(response.data);
                    fs.writeFile("./data/enderecos.json", JSON.stringify(addressList));
                    res.json(`O CEP ${formattedZipCode} foi incluído com sucesso na lista de endereços.`);
                } else {
                    res.json(`O CEP ${formattedZipCode} não foi encontrado.`);
                }
            })
        } else {
            res.json(`O CEP ${formattedZipCode} já se encontra cadastrado na lista de endereços.`);
        }
    });
}

module.exports = { checkZipCode };