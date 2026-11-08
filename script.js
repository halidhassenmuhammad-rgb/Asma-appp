
/* =====================================
   ASMA APP — MADE WITH ❤️ BY KHALID
   STEP 3: JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // SAVE AND LOAD DATA
    function saveData(key, value) {
        localStorage.setItem("asma_" + key, JSON.stringify(value));
    }

    function loadData(key, fallback) {
        try {
            const saved = localStorage.getItem("asma_" + key);
            return saved ? JSON.parse(saved) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    // 1. PRAYER TRACKER
    const prayerChecks = document.querySelectorAll(
        '#prayers input[type="checkbox"]'
    );

    const progressBar = document.querySelector(".progress-bar");
    const progressText = document.getElementById("prayerPercentage");

    function updatePrayerProgress() {
        const total = prayerChecks.length;
        const completed = [...prayerChecks].filter(
            checkbox => checkbox.checked
        ).length;

        const percentage = total ? Math.round((completed / total) * 100) : 0;

        if (progressBar) {
            progressBar.style.background =
                `linear-gradient(to right, #0b7655 ${percentage}%, #e5ebe7 ${percentage}%)`;
        }

        if (progressText) {
            progressText.textContent = percentage + "%";
        }

        saveData("prayers",
            [...prayerChecks].map(check => check.checked)
        );
    }

    const savedPrayers = loadData("prayers", []);

    prayerChecks.forEach((checkbox, index) => {
        checkbox.checked = savedPrayers[index] || false;
        checkbox.addEventListener("change", updatePrayerProgress);
    });

    updatePrayerProgress();


    // 2. DIGITAL TASBIH
    const dhikrSelect = document.getElementById("dhikrSelect");
    const dhikrText = document.getElementById("dhikrText");
    const counter = document.getElementById("counter");
    const countButton = document.getElementById("countButton");
    const resetButton = document.getElementById("resetButton");

    let count = loadData("tasbihCount", 0);

    const dhikrNames = {
        subhanallah: "سُبْحَانَ اللَّهِ",
        alhamdulillah: "الْحَمْدُ لِلَّهِ",
        allahuakbar: "اللَّهُ أَكْبَرُ",
        astaghfirullah: "أَسْتَغْفِرُ اللَّهَ"
    };

    function updateCounter() {
        if (counter) counter.textContent = count;
        saveData("tasbihCount", count);
    }

    function updateDhikr() {
        if (!dhikrSelect || !dhikrText) return;

        dhikrText.textContent =
            dhikrNames[dhikrSelect.value] || "سُبْحَانَ اللَّهِ";
    }

    if (dhikrSelect) {
        dhikrSelect.addEventListener("change", updateDhikr);
        updateDhikr();
    }

    if (countButton) {
        countButton.addEventListener("click", () => {
            count++;
            updateCounter();
        });
    }

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            count = 0;
            updateCounter();
        });
    }

    updateCounter();


    // 3. FASTING CHECKLIST
    const fastingChecks = document.querySelectorAll(
        '#fasting input[type="checkbox"]'
    );

    const savedFasting = loadData("fasting", []);

    fastingChecks.forEach((checkbox, index) => {
        checkbox.checked = savedFasting[index] || false;

        checkbox.addEventListener("change", () => {
            saveData("fasting",
                [...fastingChecks].map(check => check.checked)
            );
        });
    });


    // 4. SUNNAH CHECKLIST
    const sunnahChecks = document.querySelectorAll(
        '.sunnah-list input[type="checkbox"]'
    );

    const savedSunnah = loadData("sunnah", []);

    sunnahChecks.forEach((checkbox, index) => {
        checkbox.checked = savedSunnah[index] || false;

        checkbox.addEventListener("change", () => {
            saveData("sunnah",
                [...sunnahChecks].map(check => check.checked)
            );
        });
    });


    // 5. QURAN SURAH SELECTOR
    const surahSelect = document.getElementById("surahSelect");
    const loadSurahButton = document.getElementById("loadSurah");
    const quranContent = document.getElementById("quranContent");

    if (loadSurahButton) {
        loadSurahButton.addEventListener("click", () => {
            if (!surahSelect || !quranContent) return;

            const selectedSurah = surahSelect.value;

            quranContent.textContent =
                "Surah " + selectedSurah +
                "\n\nTo display verified Arabic Quran text and Amharic translation, connect a trusted Quran data source.";
        });
    }


    // 6. ISLAMIC QUIZ
    const quizOptions = document.querySelectorAll(".quiz-option");
    const quizResult = document.getElementById("quizResult");

    const correctAnswers = {
        0: "B",
        1: "A",
        2: "C"
    };

    quizOptions.forEach(option => {
        option.addEventListener("click", () => {
            const question = option.dataset.question;
            const answer = option.dataset.answer;

            if (!quizResult) return;

            if (correctAnswers[question] === answer) {
                quizResult.textContent = "Correct answer! MashaAllah!";
                quizResult.style.color = "#0b7655";
            } else {
                quizResult.textContent = "Try again. Keep learning!";
                quizResult.style.color = "#b45309";
            }
        });
    });


    // APP READY
    console.log("Asma App is ready!");
});
