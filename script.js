/* ==========================================================
   Lewis Spence Portfolio
   Generic Carousel
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Ensure the page has defined slides
    if (typeof slides === "undefined") {
        console.error("No slides array found.");
        return;
    }

    const title = document.getElementById("feature-title");
    const image = document.getElementById("feature-image");
    const description = document.getElementById("feature-description");
    const dotsContainer = document.getElementById("carousel-dots");
    const previousButton = document.getElementById("previous-button");
    const nextButton = document.getElementById("next-button");

    // Check everything exists
    if (!title || !image || !description || !dotsContainer || !previousButton || !nextButton) {
        console.error("Carousel HTML elements are missing.");
        return;
    }

    let current = 0;

    // ----------------------------
    // Build dots
    // ----------------------------

    slides.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.className = "dot";

        dot.addEventListener("click", () => {

            show(index);

        });

        dotsContainer.appendChild(dot);

    });

    const dots = document.querySelectorAll(".dot");

    // ----------------------------
    // Display slide
    // ----------------------------

    function show(index) {

        current = index;

        title.style.opacity = 0;
        image.style.opacity = 0;
        description.style.opacity = 0;

        setTimeout(() => {

            title.textContent = slides[index].title;
            image.src = slides[index].image;
            image.alt = slides[index].title;
            description.textContent = slides[index].description;

            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");

            title.style.opacity = 1;
            image.style.opacity = 1;
            description.style.opacity = 1;

        }, 180);

    }

    // ----------------------------
    // Buttons
    // ----------------------------

    nextButton.addEventListener("click", () => {

        current++;

        if (current >= slides.length)
            current = 0;

        show(current);

    });

    previousButton.addEventListener("click", () => {

        current--;

        if (current < 0)
            current = slides.length - 1;

        show(current);

    });

    // ----------------------------
    // Click image halves
    // ----------------------------

    image.addEventListener("click", (event) => {

        const half = image.clientWidth / 2;

        if (event.offsetX < half) {

            previousButton.click();

        } else {

            nextButton.click();

        }

    });

    // ----------------------------
    // Keyboard
    // ----------------------------

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight")
            nextButton.click();

        if (event.key === "ArrowLeft")
            previousButton.click();

    });

    // ----------------------------
    // First slide
    // ----------------------------

    show(0);

});
