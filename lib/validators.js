export const Validator = {
  required: msg => x => {
    if (!x) return msg
  },

  phone: msg => x => {
    if (!isPhone(x)) return msg;
  },

  iban: msg => x => {
    if (!isIBAN(x)) return msg;
  },

  bic: msg => x => {
    if (!isBIC(x)) return msg;
  },

  cardNumber: msg => x => {
    if (!isCardNumber(x)) return msg;
  },

  cvv: msg => x => {
    if (!isCVV(x)) return msg;
  },

  int: msg => x => {
    if (isNaN(x)) return msg
  },

  max: (msg, max) => x => {
    if (isNaN(x) || x > max) return msg
  },

  siren: msg => siren => {
    if (siren && !checkLuhnAlgorithm(siren.replace(/\s/g,''), 9))
      return msg
  },

  siret: msg => siret => {
    if (siret && !checkLuhnAlgorithm(siret.replace(/\s/g,''), 14))
      return msg;
  },
};


function checkLuhnAlgorithm(number, size) {
  if (isNaN(number) || number.length !== size) return false;
  let bal = 0;
  let total = 0;
  for (let i = size - 1; i >= 0; i--) {
    let step = (number.charCodeAt(i) - 48) * (bal + 1);
    total += (step > 9) ? step - 9 : step;
    bal = 1 - bal;
  }
  return total % 10 === 0;
}

function isIBAN(iban) {
  const regex = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/;
  return regex.test((iban || '').replace(/\s/g, ''));
}

function isBIC(bic) {
  const regex = /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/;
  return regex.test((bic || '').replace(/\s/g, ''));
}

function isPhone(phone) {
  const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return regex.test(phone);
}

function isCardNumber(number) {
  return /^[0-9]{16}$/.test(number) && checkLuhnAlgorithm(number);
}

function isCVV(code) {
  return /^\d\d\d$/.test(code);
}