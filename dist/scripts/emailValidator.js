"use strict";
var _a;
function validarEmail(email) {
    const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}
(_a = document.getElementById('subscribe-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const emailInput = document.getElementById('email-input').value;
    const messageElement = document.getElementById('email-msg');
    if (validarEmail(emailInput)) {
        messageElement.textContent = 'E-mail válido!';
        messageElement.style.color = 'green';
    }
    else {
        messageElement.textContent = 'E-mail inválido!';
        messageElement.style.color = 'red';
    }
});
