const recommendationForm = document.getElementById("recommendation-form");
const resultContainer = document.getElementById("result-container");
const submitButton = document.getElementById("submit-button");

const formatRupiah = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
};

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.textContent = text;
  return element;
}

function showMessage(title, message, type = "error") {
  resultContainer.replaceChildren();

  const wrapper = createElement("div", `result-message ${type}`);
  wrapper.appendChild(createElement("h3", "", title));
  wrapper.appendChild(createElement("p", "", message));

  resultContainer.className = "result-message-container";
  resultContainer.appendChild(wrapper);
}

function renderMenus(menus, container) {
  if (!Array.isArray(menus) || menus.length === 0) {
    return;
  }

  menus.forEach((menu) => {
    const card = createElement("article", "menu-card");

    card.appendChild(
      createElement("h4", "menu-name", menu.name || "Nama menu"),
    );

    const details = createElement("div", "menu-details");

    if (menu.size) {
      details.appendChild(
        createElement("span", "menu-tag", `Ukuran: ${menu.size}`),
      );
    }

    if (menu.quantity !== undefined) {
      details.appendChild(
        createElement("span", "menu-tag", `Jumlah: ${menu.quantity}`),
      );
    }

    card.appendChild(details);

    if (menu.unit_price !== undefined) {
      card.appendChild(
        createElement(
          "p",
          "menu-price",
          `Harga satuan: ${formatRupiah(menu.unit_price)}`,
        ),
      );
    }

    if (menu.subtotal !== undefined) {
      card.appendChild(
        createElement(
          "p",
          "menu-subtotal",
          `Subtotal: ${formatRupiah(menu.subtotal)}`,
        ),
      );
    }

    container.appendChild(card);
  });
}

function renderRecommendation(data) {
  resultContainer.replaceChildren();
  resultContainer.className = "recommendation-results";

  const mainResult = createElement("div", "main-result");

  mainResult.appendChild(
    createElement("span", "step-label", "REKOMENDASI MENU"),
  );

  mainResult.appendChild(
    createElement("h3", "result-title", "Pilihan untukmu"),
  );

  if (data.recommendation_reason) {
    mainResult.appendChild(
      createElement("p", "recommendation-reason", data.recommendation_reason),
    );
  }

  const menusContainer = createElement("div", "menu-list");
  renderMenus(data.recommended_menus, menusContainer);
  mainResult.appendChild(menusContainer);

  if (data.estimated_total !== undefined) {
    mainResult.appendChild(
      createElement(
        "div",
        "total-price",
        `Total perkiraan: ${formatRupiah(data.estimated_total)}`,
      ),
    );
  }

  if (data.budget_status) {
    mainResult.appendChild(
      createElement(
        "p",
        "budget-status",
        `Status budget: ${data.budget_status}`,
      ),
    );
  }

  resultContainer.appendChild(mainResult);

  if (Array.isArray(data.alternatives) && data.alternatives.length > 0) {
    const alternativesSection = createElement(
      "section",
      "alternatives-section",
    );

    alternativesSection.appendChild(
      createElement("h3", "result-title", "Alternatif lainnya"),
    );

    data.alternatives.forEach((alternative, index) => {
      const alternativeCard = createElement("article", "alternative-card");

      alternativeCard.appendChild(
        createElement("h4", "", `Alternatif ${index + 1}`),
      );

      if (alternative.reason) {
        alternativeCard.appendChild(createElement("p", "", alternative.reason));
      }

      const alternativeMenus = createElement("div", "menu-list");
      renderMenus(alternative.menus, alternativeMenus);
      alternativeCard.appendChild(alternativeMenus);

      if (alternative.estimated_total !== undefined) {
        alternativeCard.appendChild(
          createElement(
            "p",
            "total-price",
            `Total perkiraan: ${formatRupiah(alternative.estimated_total)}`,
          ),
        );
      }

      if (alternative.budget_status) {
        alternativeCard.appendChild(
          createElement(
            "p",
            "budget-status",
            `Status budget: ${alternative.budget_status}`,
          ),
        );
      }

      alternativesSection.appendChild(alternativeCard);
    });

    resultContainer.appendChild(alternativesSection);
  }
}

recommendationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const budget = Number(document.getElementById("budget").value);
  const peopleCount = Number(document.getElementById("people-count").value);
  const menuType = document.getElementById("menu-type").value;

  const tastePreferences = Array.from(
    document.querySelectorAll('input[name="taste"]:checked'),
  ).map((input) => input.value);

  const requestData = {
    budget: budget,
    people_count: peopleCount,
    taste_preferences: tastePreferences,
    menu_type: menuType,
  };

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Sedang memproses...";

  resultContainer.className = "empty-state";
  resultContainer.replaceChildren(
    createElement("h3", "", "Sedang mencari rekomendasi..."),
    createElement("p", "", "Mohon tunggu sebentar."),
  );

  try {
    const response = await fetch("/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Gagal mendapatkan rekomendasi.");
    }

    renderRecommendation(data);
  } catch (error) {
    showMessage(
      "Rekomendasi belum berhasil dibuat",
      error.message || "Terjadi kesalahan. Silakan coba kembali.",
    );
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Buat Rekomendasi";
  }
});
