const experimentForm = document.getElementById("experiment-form");
const resultsContainer = document.getElementById(
  "experiment-results-container",
);
const experimentButton = document.getElementById("experiment-button");

const promptVersions = ["A", "B", "C"];

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.textContent = text;
  return element;
}

function renderExperimentResult(version, data) {
  const card = createElement("article", "experiment-result-card");

  const header = createElement("div", "experiment-result-header");
  header.appendChild(createElement("span", "version-letter", version));
  header.appendChild(createElement("h3", "", `Prompt ${version}`));
  card.appendChild(header);

  const outputHeading = createElement("p", "output-label", "ACTUAL OUTPUT");
  card.appendChild(outputHeading);

  const output = createElement(
    "pre",
    "experiment-output",
    JSON.stringify(data.actual_output, null, 2),
  );
  card.appendChild(output);

  return card;
}

function showExperimentError(version, message) {
  const card = createElement("article", "experiment-result-card error-card");

  card.appendChild(createElement("h3", "", `Prompt ${version} — Gagal`));

  card.appendChild(createElement("p", "", message));

  return card;
}

async function runExperiment(version, requestData) {
  const response = await fetch(
    `/experiment?prompt_version=${encodeURIComponent(version)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Eksperimen gagal dijalankan.");
  }

  return data;
}

experimentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const budget = Number(document.getElementById("budget").value);
  const peopleCount = Number(document.getElementById("people-count").value);
  const menuType = document.getElementById("menu-type").value;

  const tastePreferences = Array.from(
    document.querySelectorAll('input[name="taste"]:checked'),
  ).map((input) => input.value);

  const selectedVersions = Array.from(
    document.querySelectorAll('input[name="prompt-version"]:checked'),
  ).map((input) => input.value);

  if (selectedVersions.length === 0) {
    alert("Pilih minimal satu versi prompt untuk diuji.");
    return;
  }

  const requestData = {
    budget: budget,
    people_count: peopleCount,
    taste_preferences: tastePreferences,
    menu_type: menuType,
  };

  experimentButton.disabled = true;
  experimentButton.querySelector("span").textContent =
    "Menjalankan eksperimen...";

  resultsContainer.className = "experiment-loading";
  resultsContainer.replaceChildren(
    createElement("h3", "", "Eksperimen sedang berjalan..."),
    createElement("p", "", "Mohon tunggu hingga seluruh versi selesai diuji."),
  );

  const resultsGrid = createElement("div", "experiment-results-grid");

  resultsContainer.replaceChildren(resultsGrid);
  resultsContainer.className = "experiment-results-grid";

  for (const version of promptVersions) {
    if (!selectedVersions.includes(version)) {
      continue;
    }

    try {
      const data = await runExperiment(version, requestData);
      resultsGrid.appendChild(renderExperimentResult(version, data));
    } catch (error) {
      resultsGrid.appendChild(showExperimentError(version, error.message));
    }
  }

  if (resultsGrid.children.length === 0) {
    resultsContainer.replaceChildren(
      createElement("p", "", "Tidak ada hasil yang dapat ditampilkan."),
    );
  }

  experimentButton.disabled = false;
  experimentButton.querySelector("span").textContent = "Jalankan Eksperimen";
});
