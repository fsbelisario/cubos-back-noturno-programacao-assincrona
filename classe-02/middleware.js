function checkLocalAddressList(req, res, next) {
    //REVISAR TODA A FUNÇÃO
    if (req.method === "GET" || req.query.senha === "cubos123") {
        next();
    } else {
        res.status(401);
        res.json({ mensagem: "Senha inválida." });
    }
}

module.exports = { checkLocalAddressList };