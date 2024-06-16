"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function buscarProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./produtos.json');
        const data = yield response.json();
        return data;
    });
}
function mostrarProdutos(produtos) {
    const container = document.getElementById('products-container');
    if (!container)
        return;
    container.innerHTML = '';
    produtos.forEach(produto => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        const precoComDesconto = formatarPreco(produto.discount ? (produto.price * (1 - produto.discount / 100)) : produto.price);
        productElement.innerHTML = `
            <div class="image-container">
                <img src="${produto.image}" alt="${produto.name}" />
                ${produto.discount ? `<div class="discount-badge">-${produto.discount}%</div>` : ''}
            </div>
            <div class="details">
                <h2>${produto.name}</h2>
                <p>${produto.description}</p>
                <div class="prices">
                    <p class="price">Rp ${precoComDesconto}</p>
                    ${produto.discount ? `<p class="discount">Rp ${formatarPreco(produto.price)}</p>` : ''}
                </div>
            </div>
            <div class="card-overlay">
                <button class="details-btn">See Details</button>
                <div class="actions">
                    <span>Share</span>
                    <span>Compare</span>
                    <span>Like</span>
                </div>
            </div>
        `;
        container.appendChild(productElement);
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield buscarProdutos();
        mostrarProdutos(products);
    });
}
function formatarPreco(numero) {
    let partes = numero.toString().split('');
    let resultado = [];
    let contador = 0;
    for (let i = partes.length - 1; i >= 0; i--) {
        resultado.unshift(partes[i]);
        contador++;
        // Adiciona um ponto a cada 3 dígitos, exceto no início do número
        if (contador % 3 === 0 && i !== 0) {
            resultado.unshift('.');
        }
    }
    // Junta o array resultado em uma única string
    return resultado.join('');
}
window.onload = init;
