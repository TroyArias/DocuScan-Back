export const login = async function (req, res) {
    try {

        if ( req.body.email === "AriasLLC" && req.body.password === "Coors1955."){
            res.send({ token: 'user1'})
        } else if (req.body.email === "docuscan.aadmv2" && req.body.password === "2700FtJ"){
            res.send({ token: 'user2'})
        } else if (req.body.email === "docuscan.aadmv3" && req.body.password === "2700FtJ"){
            res.send({ token: 'user3'})
        } else if (req.body.email === "docuscan.aadmv4" && req.body.password === "2700FtJ"){
            res.send({ token: 'user4'})
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