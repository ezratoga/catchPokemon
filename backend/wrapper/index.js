const data = (success, message, code = 200) => ({success, message, code});

const error = (success = false, message, code = 400) => {
    if (code < 299) code = 400;
    return { success, message, code }
};

module.exports = {
    data,
    error
};
