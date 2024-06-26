export const formatError = (error, attr) => {
    console.log({ error });
    Object.values(error.errors)
        .map((err) => err[attr])
        .join("; ");
};
