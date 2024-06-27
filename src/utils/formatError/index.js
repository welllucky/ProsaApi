export const formatError = (error, attr) => {
    Object.values(error.errors)
        .map((err) => err[attr])
        .join("; ");
};
