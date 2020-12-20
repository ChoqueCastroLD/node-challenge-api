const Validator = require('validatorjs'); // https://www.npmjs.com/package/validatorjs

Validator.useLang(process.env.VALIDATION_LANGUAGE || 'en');

const validate = (object, rules, customMessages) => new Promise((resolve, reject) => {
    const validation = new Validator(object, rules, customMessages);
    validation.passes(() => resolve({status: true, errors: null}));
    validation.fails(() => resolve({status: false, errors: validation.errors.errors}));
});

module.exports = {
    validate
};