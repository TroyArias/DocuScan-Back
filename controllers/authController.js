export const login = async function (req, res) {
    try {

        if ( req.body.email === "docuScan" && req.body.password === "1111"){
            res.send({ token: 'test123'})
        } else {
            throw "Incorrect login or password"
        }

    } catch (error) {
        return res.status(500).send({message: error});
    }
};


export const logout = async function (req, res) {
    try {

        res.send({ token: null})

    } catch (error) {
        return res.status(500).send({message: error});
    }
};