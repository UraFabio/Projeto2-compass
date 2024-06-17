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
let products = [];
sessionStorage.setItem('limit', '16');
sessionStorage.setItem('page', '1');
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield buscarProdutos();
        carregarBotoes(products.length);
        mostrarProdutos(products);
        setupPageButtons();
    });
}
function buscarProdutos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./produtos.json');
        const data = yield response.json();
        return data;
    });
}
function carregarBotoes(pl) {
    const limit = Number(sessionStorage.getItem('limit'));
    const qtdBtn = Math.ceil(pl / limit);
    sessionStorage.setItem('maxPage', qtdBtn.toString());
    const element = document.getElementById('pages-buttons');
    if (!element)
        return;
    element.innerHTML = '';
    for (let i = 0; i < qtdBtn; i++) {
        const buttonElement = document.createElement('span');
        buttonElement.className = 'page-button';
        if (i == 0) {
            buttonElement.classList.add('current-page');
        }
        buttonElement.innerHTML = `${i + 1}`;
        element.appendChild(buttonElement);
    }
    const buttonElement = document.createElement('span');
    buttonElement.id = 'next-button';
    buttonElement.innerHTML = `Next`;
    element.appendChild(buttonElement);
    setupPageButtons();
}
function mostrarProdutos(produtos, limit = 16, page = 1) {
    limit = limit == 0 ? 16 : limit;
    console.log(limit);
    const quantity = produtos.length;
    const element = document.getElementById('showing');
    if (element) {
        element.innerHTML = `Showing ${((limit * (page - 1)) + 1)}-${Math.min(limit * page, quantity)} of ${quantity} results`;
    }
    const container = document.getElementById('products-container');
    if (!container)
        return;
    container.innerHTML = '';
    const start = (page - 1) * limit;
    const end = Math.min(start + limit, produtos.length);
    for (let i = start; i < end; i++) {
        const produto = produtos[i];
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
                    <span><img src="./assets/icons/share.svg"/>Share</span>
                    <span><img src="./assets/icons/compare.svg"/>Compare</span>
                    <span><img src="./assets/icons/like.svg"/>Like</span>
                </div>
            </div>
        `;
        container.appendChild(productElement);
    }
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
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}
function sortAlphabetically() {
    console.log('Ordenar por ordem alfabética');
    products = products.slice().sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase())
            return 1;
        return -1;
    });
    mostrarProdutos(products, Number(sessionStorage.getItem('limit')), Number(sessionStorage.getItem('page')));
}
function sortByPrice() {
    console.log('Ordenar por preço (maior para menor)');
    products = products.slice().sort((a, b) => {
        const precoA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
        const precoB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
        return precoB - precoA;
    });
    mostrarProdutos(products, Number(sessionStorage.getItem('limit')), Number(sessionStorage.getItem('page')));
}
(_a = document.getElementById('filterID')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', toggleDropdown);
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
    toggleDropdown();
    const element = event.currentTarget;
    element.style.backgroundColor = 'lightblue';
    const element2 = document.getElementById('sort-alphabetically');
    element2.style.backgroundColor = 'white';
});
const inputNumero = document.getElementById('input-number');
inputNumero === null || inputNumero === void 0 ? void 0 : inputNumero.addEventListener('input', () => {
    const valor = Number(inputNumero.value) == 0 ? 16 : Number(inputNumero.value);
    sessionStorage.setItem('limit', valor.toString());
    setTimeout(() => {
        if (sessionStorage.getItem('limit') == valor.toString()) {
            console.log('Novo valor do input:', valor);
            mostrarProdutos(products, valor, Number(sessionStorage.getItem('page')));
            carregarBotoes(products.length);
        }
    }, 800);
});
function setupPageButtons() {
    const pageButtons = document.querySelectorAll('#pages-buttons .page-button');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            pageButtons.forEach(btn => btn.classList.remove('current-page'));
            button.classList.add('current-page');
            sessionStorage.setItem('page', button.innerHTML);
            mostrarProdutos(products, Number(sessionStorage.getItem('limit')), Number(sessionStorage.getItem('page')));
        });
    });
    const nextButton = document.getElementById('next-button');
    nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener('click', () => {
        const currentPage = document.querySelector('#pages-buttons .current-page');
        if (currentPage) {
            const nextPage = currentPage.nextElementSibling;
            if (nextPage && nextPage.classList.contains('page-button')) {
                nextPage.classList.add('current-page');
                currentPage.classList.remove('current-page');
                nextPage.click();
            }
        }
    });
}
window.onload = init;
