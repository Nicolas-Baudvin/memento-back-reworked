const createError = (errorType, missingParams = "") => {
    switch (errorType)
    {
        case "required": {
            return {
                statusCode: 422,
                message: this.errorMessages.missingParams(missingParams)
            }
        }
        case "credentials": {
            return {
                statusCode: 403,
                message: this.errorMessages.wrongCredentials()
            }
        }
        default: {
            return {
                statusCode: 500,
                message: "Une erreur est survenue sur le serveur"
            }
        }
    }

};

exports.errorMessages = {
    missingParams: (missingParams) => `Le champs ${missingParams} est manquant mais obligatoire !`,
    wrongCredentials: () => `Les identifiants sont incorrects.`,
};

module.exports = createError;