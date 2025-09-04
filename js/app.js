let API_URL = "https://68b7a79873b3ec66cec5256c.mockapi.io/asaxiyuz/Asaxiy";
let cardsContainer = document.getElementById("cards");
let cardlar = document.getElementById("swiper-cards");
let shopCartEl = document.getElementById("shop_cart");
let searchInput = document.querySelector("input[type='text']");
let cart__count = document.querySelector(".cart__count");
let allData = [];

function getShop() {
  try {
    return JSON.parse(localStorage.getItem("shop")) || [];
  } catch (e) {
    return [];
  }
}

function setShop(arr) {
  localStorage.setItem("shop", JSON.stringify(arr));
}

function yulduzcha() {
  return (
    '<div class="flex text-orange-500 text-sm mb-1">' +
    '<i class="fa-solid fa-star"></i>' +
    '<i class="fa-solid fa-star"></i>' +
    '<i class="fa-solid fa-star"></i>' +
    '<i class="fa-solid fa-star"></i>' +
    '<i class="fa-solid fa-star"></i>' +
    "</div>"
  );
}

function updateShopBadge() {
  let count = getShop().length;
  let badge = document.querySelector('a[href="#"] .absolute');
  if (badge) badge.textContent = count;
  cart__count.textContent = count;
}

function renderShopMini() {
  if (!shopCartEl) return;
  let shop = getShop();
  if (shop.length === 0) {
    shopCartEl.innerHTML = '<p class="text-sm text-gray-500">Savat bo‘sh</p>';
    return;
  }
  let html = "";
  for (let i = 0; i < shop.length; i++) {
    let p = shop[i];
    html +=
      '<div class="flex items-center justify-between py-1 border-b">' +
      '<span class="text-sm line-clamp-1">' +
      p.title +
      "</span>" +
      '<span class="text-sm font-medium">' +
      Number(p.price).toLocaleString() +
      " so‘m</span>" +
      "</div>";
  }
  shopCartEl.innerHTML = html;
}

function fetchData() {
  fetch(API_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      allData = data;
      renderSwiper(allData);
      renderGrid(allData);
      updateShopBadge();
      renderShopMini();
    })
    .catch(function (err) {
      console.log("API dan xato:", err);
    });
}

function renderSwiper(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    html +=
      '<div class="swiper-slide">' +
      '<div class="bg-white rounded-xl shadow-md overflow-hidden relative p-2 flex flex-col border border-blue-400 h-full">' +
      '<img src="' +
      item.img +
      '" class="w-full h-40 object-contain mb-3">' +
      '<h2 class="text-xs sm:text-sm md:text-base font-semibold text-gray-800 leading-tight mb-2 truncate sm:line-clamp-2">' +
      item.title +
      "</h2>" +
      '<div class="flex items-center gap-2 mb-1">' +
      '<span class="text-gray-400 line-through text-xs sm:text-sm">' +
      (item.old_price ? Number(item.old_price).toLocaleString() + " сум" : "") +
      "</span>" +
      '<span class="text-red-500 text-xs sm:text-sm font-semibold">' +
      (item.discount ? item.discount + "%" : "") +
      "</span>" +
      "</div>" +
      '<p class="text-lg sm:text-xl font-bold text-blue-600 mb-1">' +
      Number(item.price).toLocaleString() +
      " сум</p>" +
      yulduzcha() +
      '<div class="mt-auto">' +
      '<button class="bg-blue-600 text-white text-center w-full rounded-md py-2 font-medium shop-btn" data-id="' +
      item.id +
      '">Купить</button>' +
      "</div></div></div>";
  }

  cardlar.innerHTML = html;

  if (window.Swiper) {
    new Swiper(".swiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  }
}

function renderGrid(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    html +=
      '<div class="bg-white rounded-xl shadow-md overflow-hidden relative p-2 sm:p-4 flex flex-col">' +
      '<div class="relative mb-2 sm:mb-3">' +
      '<img src="' +
      item.img +
      '" class="w-full h-32 sm:h-40 object-contain rounded-md">' +
      '<div class="absolute top-0 right-0 flex flex-col gap-1">' +
      '<button class="text-red-500 text-lg sm:text-2xl hover:text-red-600"><i class="fa-regular fa-heart"></i></button>' +
      '<button class="text-gray-700 text-lg sm:text-2xl hover:text-gray-900"><i class="fa-solid fa-balance-scale"></i></button>' +
      "</div></div>" +
      '<h2 class="text-xs sm:text-sm font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">' +
      item.title +
      "</h2>" +
      yulduzcha() +
      '<p class="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2">0 отзывов</p>' +
      '<p class="text-lg sm:text-xl font-bold text-blue-600 mb-1">' +
      Number(item.price).toLocaleString() +
      " сум</p>" +
      '<p class="text-[11px] sm:text-sm text-orange-600 border border-orange-400 rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 w-full mb-2 sm:mb-3">' +
      (item.rasrochka
        ? Number(item.rasrochka).toLocaleString() + " сум x 6 мес"
        : "Рассрочка недоступна") +
      "</p>" +
      '<div class="mt-auto flex items-center justify-between gap-1 sm:gap-2">' +
      '<button class="flex-1 bg-blue-600 text-white text-[11px] sm:text-sm py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 sm:gap-2">Купить в один клик</button>' +
      '<button class="shop-btn bg-green-500 text-white p-1.5 sm:p-2 rounded-lg hover:bg-green-600" data-id="' +
      item.id +
      '" title="Добавить в корзину"><i class="fa-solid fa-cart-shopping pointer-events-none"></i></button>' +
      "</div></div>";
  }
  cardsContainer.innerHTML = html;
}

function addToShopById(id) {
  let item = allData.find(function (x) {
    return String(x.id) === String(id);
  });
  if (!item) return;
  let shop = getShop();
  let exists = shop.some(function (p) {
    return String(p.id) === String(item.id);
  });
  if (exists) {
    console.log("allaqachon savatda:", item.title);
  } else {
    shop.push({
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
      brand: item.brand,
      rasrochka: item.rasrochka,
      old_price: item.old_price,
      discount: item.discount,
      quantity: 1,
    });
    setShop(shop);
    console.log("Qoshildi:", item.title);
  }
  updateShopBadge();
  renderShopMini();
}

cardsContainer.onclick = function (e) {
  let btn = e.target.closest(".shop-btn");
  if (!btn) return;
  let id = btn.getAttribute("data-id");
  addToShopById(id);
};

document.onclick = function (e) {
  let btn = e.target.closest(".shop-btn");
  if (!btn) return;
  if (!cardsContainer.contains(btn)) {
    let id = btn.getAttribute("data-id");
    addToShopById(id);
  }
};

if (searchInput) {
  searchInput.oninput = function (e) {
    let q = e.target.value.toLowerCase();
    let filtered = allData.filter(function (item) {
      return (
        String(item.title || "")
          .toLowerCase()
          .indexOf(q) > -1
      );
    });
    renderGrid(filtered);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
  let user = JSON.parse(localStorage.getItem("user"));
  let modal = document.getElementById("profileModal");
  let usernameEl = document.getElementById("profileUsername");
  let emailEl = document.getElementById("profileEmail");
  let logoutBtn = document.getElementById("logoutBtn");
  let closeModal = document.getElementById("closeModal");

  let links = document.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let span = link.querySelector("span");
    if (span && span.textContent.trim() === "Войти" && user) {
      span.textContent = "Профиль";
      link.href = "#";
      link.onclick = function () {
        if (!modal) return;
        if (usernameEl) usernameEl.textContent = user.username || "---";
        if (emailEl) emailEl.textContent = user.email || "---";
        modal.classList.remove("hidden");
      };
    }
  }

  if (logoutBtn) {
    logoutBtn.onclick = function () {
      localStorage.removeItem("user");
      if (modal) modal.classList.add("hidden");
      let links2 = document.querySelectorAll("a");
      for (let j = 0; j < links2.length; j++) {
        let l = links2[j];
        let sp = l.querySelector("span");
        if (sp && sp.textContent.trim() === "Профиль") {
          sp.textContent = "Войти";
          l.href = "login.html";
        }
      }
    };
  }

  if (closeModal) {
    closeModal.onclick = function () {
      modal.classList.add("hidden");
    };
  }
});
