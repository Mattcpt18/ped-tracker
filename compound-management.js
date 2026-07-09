// Locked compound list – edit only here
const PRIVATE_COMPOUND_LIST = [
  "Testosterone Enanthate",
  "Testosterone Cypionate",
  "Testosterone Propionate",
  "Nandrolone Decanoate",
  "Boldenone Undecylenate",
  "Trenbolone Acetate",
  "Trenbolone Enanthate",
  "Drostanolone Propionate",
  "Oxandrolone",
  "Stanozolol",
  "Methenolone Enanthate",
  "Mesterolone",
  "Metandienone",
  "Turinabol",
  "Clenbuterol",
  "HCG",
  "Anastrozole",
  "HGH",
  "Retatrutide",
  "Clomiphene"
];

// Update all dropdowns using this locked list
function updateDropdown(targetDropdown = null) {
  const list = PRIVATE_COMPOUND_LIST;

  const fill = (dropdown) => {
    dropdown.innerHTML = `<option value="">Select a compound</option>`;
    list.forEach(c => {
      const option = document.createElement("option");
      option.value = c;
      option.textContent = c;
      dropdown.appendChild(option);
    });
  };

  if (targetDropdown) {
    fill(targetDropdown);
    return;
  }

  const dropdowns = document.querySelectorAll(".compoundDropdown");
  dropdowns.forEach(fill);
}

document.addEventListener("DOMContentLoaded", () => {
  updateDropdown();
});
