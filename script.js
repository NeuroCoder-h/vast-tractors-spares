const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("requestForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const machine = data.get("machine") || "Not specified";
  const part = data.get("part");

  const message =
`Hello Vast Tractors Spares,

I would like to enquire about a spare part.

Name: ${name}
Phone: ${phone}
Machine/Brand: ${machine}
Part required: ${part}`;

  // The phone numbers on the business card are displayed for calls.
  // We deliberately do not assume that any of them is a WhatsApp number.
  navigator.clipboard?.writeText(message).catch(() => {});

  alert(
    "Your enquiry has been prepared. The message has been copied when your browser allows it. " +
    "For now, please call one of the numbers shown on the Contact section. " +
    "We can connect this form to WhatsApp or email in the next step."
  );
});

/* VAST TRACTORS SPARES: CATEGORY IMAGE GALLERIES */

const partsCategories = {
  engine: {
    title: "Engine Parts",
    description: "Engine components and replacement parts.",
    folder: "engine parts",
    images: [10, 12, 13, 14]
  },

  hydraulic: {
    title: "Hydraulic Parts",
    description: "Hydraulic seals, cylinders and related components.",
    folder: "hydraulic parts",
    images: [11, 15, 21, 28]
  },

  transmission: {
    title: "Transmission and Clutch",
    description: "Gears, shafts, bearings and clutch components.",
    folder: "transmission and clutch",
    images: [
      16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27,
      29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 45, 46
    ]
  },

  electrical: {
    title: "Electrical Parts",
    description: "Starting, charging and related components.",
    folder: "electrical parts",
    images: [1, 3, 4, 7]
  },

  steering: {
    title: "Steering and Braking",
    description: "Shafts, joints and related components.",
    folder: "steering and braking",
    images: [2, 5, 6, 8, 9]
  },

  tlb: {
    title: "TLB Components",
    description: "Components for backhoe and loader machinery.",
    folder: "tlb components",
    images: [43, 44]
  }
};

const partsModal = document.getElementById("partsGallery");
const partsGalleryTitle = document.getElementById("galleryTitle");
const partsGalleryDescription =
  document.getElementById("galleryDescription");
const partsGalleryImages = document.getElementById("galleryImages");
const partsGalleryClose = document.getElementById("galleryClose");

function getPartImagePath(folder, imageNumber) {
  return `assets/parts/${encodeURIComponent(folder)}/${imageNumber}.jpeg`;
}

function openPartsGallery(categoryKey) {
  const category = partsCategories[categoryKey];

  if (!category || !partsModal) return;

  partsGalleryTitle.textContent = category.title;
  partsGalleryDescription.textContent = category.description;
  partsGalleryImages.replaceChildren();

  category.images.forEach((number) => {
    const image = document.createElement("img");

    image.src = getPartImagePath(category.folder, number);
    image.alt = `${category.title} — image ${number}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      console.warn("Could not load spare-parts image:", image.src);
      image.classList.add("image-error");
    });

    partsGalleryImages.appendChild(image);
  });

  partsModal.classList.add("is-open");
  partsModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  partsGalleryClose?.focus();
}

function closePartsGallery() {
  if (!partsModal) return;

  partsModal.classList.remove("is-open");
  partsModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("#parts .part-card[data-category]")
  .forEach((card) => {
    const categoryKey = card.dataset.category;
    const category = partsCategories[categoryKey];

    if (!category) return;

    // Use the first image in each group as its card background.
    const firstImage = getPartImagePath(
      category.folder,
      category.images[0]
    );

    card.style.setProperty(
      "--part-image",
      `url("${firstImage}")`
    );

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      `View ${category.title} image gallery`
    );

    card.addEventListener("click", () => {
      openPartsGallery(categoryKey);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPartsGallery(categoryKey);
      }
    });
  });

partsGalleryClose?.addEventListener("click", closePartsGallery);

partsModal?.addEventListener("click", (event) => {
  if (event.target === partsModal) {
    closePartsGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && partsModal?.classList.contains("is-open")) {
    closePartsGallery();
  }
});
