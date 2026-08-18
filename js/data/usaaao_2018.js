// js/data/usaaao_2021.js
export const usaaao_2021 = [
    {
        uniqueId: "q1_usaaao_2021",
        id: "Q1",
        competition: "USAAAO",
        year: 2021,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1/10",
        title: "Kepler's Third Law",
        description: `A planet's orbit around a star has a semimajor axis of 16 AU. What is the period of the planet's orbit?<br><br>
(a) 6 years <br>
(b) 32 years <br>
(c) 64 years <br>
(d) 256 years <br>
(e) 4096 years`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Use the simplified form of Kepler's Third Law for a system where distances are in Astronomical Units (AU), time is in years, and the central mass is implicitly assumed to be 1 Solar Mass.</p>
<p><strong>Step 1: Recall Kepler's Third Law</strong></p>
<p>The general form is:</p>
<p>$$ T^2 = \\frac{4\\pi^2}{GM} a^3 $$</p>
<p><strong>Step 2: Simplify the equation</strong></p>
<p>When using Solar System units (\\(T\\) in Earth years, \\(a\\) in AU, and \\(M = 1 \\ M_\\odot\\)), the constant \\(\\frac{4\\pi^2}{GM}\\) simplifies to exactly 1. The equation becomes:</p>
<p>$$ T^2 = a^3 \\implies T = a^{3/2} $$</p>
<p><strong>Step 3: Calculate the Period</strong></p>
<p>Plug in the given semi-major axis, \\(a = 16\\) AU:</p>
<p>$$ T = 16^{3/2} = (\\sqrt{16})^3 = 4^3 = 64 \\text{ years} $$</p>
<p><strong>Answer: (c)</strong></p>`
    }
];