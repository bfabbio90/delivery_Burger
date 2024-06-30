const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

// ARRAY DE PRODUTOS:

let listCart = [];

//ABRIR O MODAL
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
  updateCartModal();
});

//FECHAR MODAL QUANDO CLICAR FORA
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

menu.addEventListener("click", (event) => {
  let parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price")).toFixed(
      2
    );
    addToCart(name, price);
  }
});

//FUNÇÃO PARA ADICIONAR O CARRINHO
function addToCart(name, price) {
  const existingItem = listCart.find((item) => item.name === name);

  if (existingItem) {
    //Se o item já existe, soma a quantity + 1 (aumenta o número de items)
    existingItem.quantity += 1;
  } else {
    listCart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
}

//FUNÇÃO PARA ATUALIZAR O CARRINHO (CART)
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  listCart.forEach((item) => {
    const cartItemElement = document.createElement("div");

    // Estilizando os items manipulados dentro do modal
    cartItemElement.classList.add(
      "flex",
      "justify-between",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium mt-2"> ${item.name}</p>
        <p class="font-medium mt-2"> Qtde: ${item.quantity}</p>
        <p class="font-medium mt-2"> R$${item.price}</p>
      </div>

      <button class="bg-zinc-200 text-red font-bold py-2 px-4 rounded remove-from-cart-btn" data-name="${item.name}">
         Remover
      </button>
      
    </div>
    `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  //Atualizando e formatando o valor de total para moeda
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //Adicionando a quantilidade de items no footer
  cartCounter.innerHTML = listCart.length;
}

//Função para remover o item do Cart
cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = listCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = listCart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    listCart.splice(index, 1);
    updateCartModal();
  }
}
