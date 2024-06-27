class ErrorBase extends Error {
    constructor(
        message = "Erro interno no servidor. Por favor, tente novamente mais tarde",
        status = 500,
        error = {},
    ) {
        super();
        this.message = message;
        this.status = status;
        this.error = error;
    }

    send(res) {
        console.log(this.error);
        res.status(this.status).json({
            message: this.message,
            error: this.error,
        });
    }
}

export { ErrorBase };
