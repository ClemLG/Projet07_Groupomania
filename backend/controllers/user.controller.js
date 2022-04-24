const db = require('../config/db')

// Implementation des routes
//Créer un compte
exports.register = (req, res, next) => {
    //Récuperation des données des champs du formulaire envoyé dans la requete par l'utlisateur
    const requestPayload = req.body

    //Verification de la conformité des données
    //Vérification de la présence des champs obligatoires
    if (
        requestPayload.username === undefined
        || requestPayload.email === undefined
        || requestPayload.password === undefined
        || requestPayload.confirm === undefined
    ) {
        throw "Missing field"
    }
    //Vérification du format/TYPE de chaque champs
    if(
        typeof requestPayload.username !== "string"
        || requestPayload.username.length > 255
        || requestPayload.username.length === 0
    ){
        throw "Invalid username"
    }

    if(
        typeof requestPayload.email !== "string"
        || requestPayload.email.length > 255
        || requestPayload.email.length === 0
        || requestPayload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null
    ){
        throw "Invalid email"
    }

    if(
        typeof requestPayload.password !== "string"
        || requestPayload.password.length > 255
        || requestPayload.password.length < 4
    ){
        throw "Invalid password"
    }

    if(requestPayload.confirm !== requestPayload.password){
        throw "Confirm doesn't match password"
    }

    //Création de l'utilisateur dans la base de données
    //Création de la requête d'insertion
    const insertQuery = `INSERT INTO user (email, password, roles, username) VALUES ('${requestPayload.email}', '${requestPayload.password}', '${JSON.stringify(['ROLE_USER'])}', '${requestPayload.username}')`
    // Execution de la requête
    db.query(insertQuery, (error, results) => {
        // Si erreur, on renvoit une erreur
        if(error) throw 'Injection error'
        // Sinon on récupère la ligne contenant l'id généré par la base de données
        const selectQuery = `SELECT * FROM user WHERE id = ${results.insertId}`
        // On execute la requête de récupération
        db.query(selectQuery, (error, results) => {
            if(error) throw 'Select error'
            // Sinon on renvoie à l'utlisateur, l'utilisateur récupéré
            const user = results[0]


            user.roles = JSON.parse(user.roles)



            res.json(user)
        })
    })

}





exports.login = (req, res, next) => {}
exports.forgotPassword = (req, res, next) => {}
exports.logout = (req, res, next) => {}
exports.unregister = (req, res, next) => {}
exports.updateProfile = (req, res, next) => {}
