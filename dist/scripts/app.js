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
var _a, _b, _c;
function buscarProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./produtos.json');
        const data = yield response.json();
        return data;
    });
}
function mostrarProdutos(produtos, limit = 16, page = 1) {
    limit == 0 ? 16 : limit;
    const quantity = produtos.length;
    const element = document.getElementById('showing');
    if (element) {
        element.innerHTML = 'Showing {show-min}-{show-max} of {total} results';
        element.innerHTML = element.innerHTML.replace('{total}', quantity.toString());
        element.innerHTML = element.innerHTML.replace('{show-min}', ((limit * (page - 1)) + 1).toString());
        element.innerHTML = element.innerHTML.replace('{show-max}', (limit * page).toString());
    }
    var carregados = 0;
    const container = document.getElementById('products-container');
    if (!container)
        return;
    container.innerHTML = '';
    produtos.forEach(produto => {
        if (carregados >= limit)
            return;
        const productElement = document.createElement('div');
        productElement.className = 'product';
        const precoComDesconto = formatarPreco(produto.discount ? (produto.price * (1 - produto.discount / 100)) : produto.price);
        productElement.innerHTML = `
            <div class="image-container">
                <img src="${produto.image}" alt="${produto.name}" />
                ${produto.discount ? `<div class="discount-badge">-${produto.discount}%</div>` : ''}
                ${produto.condition ? `<div class="condition-badge">${produto.condition}</div>` : ''}
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
        carregados++;
    });
}
function formatarPreco(numero) {
    let partes = numero.toString().split('');
    let resultado = [];
    let contador = 0;
    for (let i = partes.length - 1; i >= 0; i--) {
        resultado.unshift(partes[i]);
        contador++;
        if (contador % 3 === 0 && i !== 0) {
            resultado.unshift('.');
        }
    }
    return resultado.join('');
}
var products;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield buscarProdutos();
        mostrarProdutos(products);
    });
}
window.onload = init;
const inputNumero = document.getElementById('input-number');
var limit;
inputNumero ? addEventListener('input', () => {
    const valor = Number(inputNumero.value);
    limit = valor;
    setTimeout(() => {
        if (limit == valor) {
            console.log('Novo valor do input:', valor);
            mostrarProdutos(products, valor);
        }
    }, 800);
}) : "";
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}
function sortAlphabetically() {
    console.log('Ordenar por ordem alfabética');
    products = products.slice().sort((a, b) => {
        const nomeA = a.name.toUpperCase();
        const nomeB = b.name.toUpperCase();
        if (nomeA < nomeB) {
            return -1;
        }
        if (nomeA > nomeB) {
            return 1;
        }
        return 0;
    });
    mostrarProdutos(products, limit);
}
function sortByPrice() {
    console.log('Ordenar por preço (maior para menor)');
    products = products.slice().sort((a, b) => {
        const precoA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const precoB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        if (precoA > precoB) {
            return -1;
        }
        if (precoA < precoB) {
            return 1;
        }
        return 0;
    });
    mostrarProdutos(products, limit);
}
(_a = document.getElementById('filterID')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    toggleDropdown();
});
(_b = document.getElementById('sort-alphabetically')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (event) => {
    event.preventDefault();
    sortAlphabetically();
    toggleDropdown();
    const element = event.currentTarget;
    element.style.backgroundColor = 'lightblue';
    const element2 = document.getElementById('sort-by-price');
    element2.style.backgroundColor = 'white';
});
(_c = document.getElementById('sort-by-price')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (event) => {
    event.preventDefault();
    sortByPrice();
    const element = event.currentTarget;
    element.style.backgroundColor = 'lightblue';
    const element2 = document.getElementById('sort-alphabetically');
    element2.style.backgroundColor = 'white';
});
