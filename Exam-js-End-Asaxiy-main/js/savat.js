let savatga = JSON.parse(localStorage.getItem("shop")) || [];
let savatContainer = document.getElementById("savatContainer");
let summary = document.getElementById("summary");

function renderCart() {
  savatContainer.innerHTML = "";
  let jami = 0;

  for (let i = 0; i < savatga.length; i++) {
    let item = savatga[i];

    if (!item.quantity) {
      item.quantity = 1;
    }

    jami += item.price * item.quantity;

    let div = document.createElement("div");
    div.className =
      "flex flex-col sm:flex-row items-center gap-4 border-b pb-4 mb-4";

    div.innerHTML =
      '<img src="' +
      item.img +
      '" class="w-24 h-24 object-contain">' +
      '<div class="flex-1">' +
      "<h2 class='font-semibold'>" +
      item.title +
      "</h2>" +
      '<span class="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">' +
      (item.brand ? item.brand : "Brand") +
      "</span>" +
      "</div>" +
      '<div class="flex items-center gap-3">' +
      '<button class="minus w-8 h-8 border rounded-full">-</button>' +
      '<span class="quantity">' +
      item.quantity +
      "</span>" +
      '<button class="plus w-8 h-8 border rounded-full">+</button>' +
      "</div>" +
      '<div class="text-right">' +
      '<p class="text-gray-400 line-through text-sm">' +
      (item.old_price ? item.old_price.toLocaleString() + " сум" : "") +
      "</p>" +
      '<p class="text-blue-600 font-bold">' +
      (item.price * item.quantity).toLocaleString() +
      " сум</p>" +
      '<p class="text-orange-500 text-xs">' +
      (item.rasrochka
        ? (item.rasrochka * item.quantity).toLocaleString() + " сум x 12 мес"
        : "") +
      "</p>" +
      "</div>" +
      '<button class="delete text-gray-400 hover:text-red-500">' +
      '<i class="fa-solid fa-trash"></i>' +
      "</button>";

    div.querySelector(".delete").onclick = function () {
      savatga = savatga.filter(function (el) {
        return el.id !== item.id;
      });
      localStorage.setItem("shop", JSON.stringify(savatga));
      renderCart();
    };

    div.querySelector(".plus").onclick = function () {
      item.quantity++;
      localStorage.setItem("shop", JSON.stringify(savatga));
      renderCart();
    };

    div.querySelector(".minus").onclick = function () {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        savatga = savatga.filter(function (el) {
          return el.id !== item.id;
        });
      }
      localStorage.setItem("shop", JSON.stringify(savatga));
      renderCart();
    };

    savatContainer.appendChild(div);
  }

  summary.innerHTML =
    "<p class='text-sm text-orange-600 mb-2'>В корзине " +
    savatga.length +
    " товара</p>" +
    "<p class='text-sm text-gray-400 line-through'>" +
    (jami + 200000).toLocaleString() +
    " сум</p>" +
    "<p class='text-xl font-bold text-blue-600 mb-4'>" +
    jami.toLocaleString() +
    " сум</p>" +
    '<button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">ОФОРМИТЬ</button>';
}

renderCart();
