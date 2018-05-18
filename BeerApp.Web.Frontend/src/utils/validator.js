function validateEmail(email) {

}

function validatePassword(password) {

}

function isValidDate(date) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    return day <= monthLength[month];
}

export default {
    validateEmail,
    validatePassword,
    isValidDate
};
