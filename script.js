const sections = document.querySelectorAll(".distro");
const navItems = document.querySelectorAll(".side-item");

const counter = document.querySelector("#current");

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");


// ==========================================
// CUSTOM CURSOR
// ==========================================

document.addEventListener("mousemove", e => {

    cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;

    cursorRing.style.transform =
        `translate(${e.clientX - 17}px, ${e.clientY - 17}px)`;

});


// Cursor interaction

document.querySelectorAll("button, a").forEach(el => {

    el.addEventListener("mouseenter", () => {

        cursorRing.style.width = "55px";
        cursorRing.style.height = "55px";

        cursorRing.style.borderColor =
            "rgba(255,255,255,.8)";

    });

    el.addEventListener("mouseleave", () => {

        cursorRing.style.width = "35px";
        cursorRing.style.height = "35px";

        cursorRing.style.borderColor =
            "rgba(255,255,255,.4)";

    });

});


// ==========================================
// NAVIGATION
// ==========================================

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const target =
            document.getElementById(
                item.dataset.target
            );

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ==========================================
// ACTIVE SECTION
// ==========================================

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting)
                return;

            const index =
                entry.target.dataset.index;

            counter.textContent = index;

            navItems.forEach(item => {

                item.classList.toggle(
                    "active",
                    item.dataset.target ===
                    entry.target.id
                );

            });

        });

    },
    {
        threshold: .6
    }
);

sections.forEach(section =>
    observer.observe(section)
);


// ==========================================
// MOUSE PARALLAX
// ==========================================

sections.forEach(section => {

    section.addEventListener(
        "mousemove",
        e => {

            const rect =
                section.getBoundingClientRect();

            const x =
                (e.clientX - rect.left)
                / rect.width - .5;

            const y =
                (e.clientY - rect.top)
                / rect.height - .5;

            const content =
                section.querySelector(".content");

            if (!content)
                return;

            content.style.setProperty(
                "--mx",
                `${x * 12}px`
            );

            content.style.setProperty(
                "--my",
                `${y * 12}px`
            );

        }
    );

    section.addEventListener(
        "mouseleave",
        () => {

            const content =
                section.querySelector(".content");

            if (!content)
                return;

            content.style.setProperty(
                "--mx",
                "0px"
            );

            content.style.setProperty(
                "--my",
                "0px"
            );

        }
    );

});


// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener("keydown", e => {

    const current =
        [...sections].findIndex(
            section =>
                section.getBoundingClientRect().top >= -10 &&
                section.getBoundingClientRect().top <= 10
        );

    if (e.key === "ArrowDown") {

        const next =
            Math.min(
                current + 1,
                sections.length - 1
            );

        sections[next].scrollIntoView({
            behavior: "smooth"
        });

    }

    if (e.key === "ArrowUp") {

        const prev =
            Math.max(current - 1, 0);

        sections[prev].scrollIntoView({
            behavior: "smooth"
        });

    }

});


// ==========================================
// GENTOO COMPILE RANDOMIZATION
// ==========================================

const progress =
    document.querySelector(".progress-bar");

setInterval(() => {

    if (!progress)
        return;

    const value =
        Math.floor(
            Math.random() * 45 + 50
        );

    progress.style.width =
        `${value}%`;

}, 3000);


// ==========================================
// VOID TERMINAL GLITCH
// ==========================================

const voidTerminal =
    document.querySelector(".void-terminal");

setInterval(() => {

    if (!voidTerminal)
        return;

    voidTerminal.style.transform =
        `translateX(${Math.random() * 2 - 1}px)`;

    setTimeout(() => {

        voidTerminal.style.transform =
            "translateX(0)";

    }, 80);

}, 5000);