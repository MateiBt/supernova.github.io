// js/data/usaaao_2026.js
export const usaaao_2026 = [
    {
        uniqueId: "q1_usaaao_2026",
        id: "Q1",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3/10",
        title: "Circular Orbit Kinematics",
        description: `A planet moves in a circular orbit in a fixed plane with angular velocity \\(\\omega\\), and let \\(\\hat{n}\\) be a unit vector perpendicular to the orbital plane. Let the planet's velocity vector as a function of time be given by
$$ \\vec{v}(t) = v_0(\\cos(\\omega t)\\hat{i} + \\sin(\\omega t)\\hat{j}) $$
Define \\(\\vec{a}(t) = \\frac{d\\vec{v}}{dt}\\). Which of the following statements is correct? (Here, \\(\\hat{i}\\) and \\(\\hat{j}\\) are orthogonal unit vectors in the orbital plane.)<br><br>
(a) \\(\\vec{a}\\) is always parallel to \\(\\vec{v}\\) <br>
(b) \\(\\vec{a}\\) has a magnitude \\(v_0\\omega\\) and is perpendicular to \\(\\vec{v}\\) <br>
(c) \\(\\vec{a}\\) is zero since the magnitude of \\(\\vec{v}\\) is constant <br>
(d) \\(\\vec{v} \\cdot \\vec{a} = v_0^2\\omega\\) <br>
(e) \\(\\vec{a}\\) is parallel to \\(\\hat{n}\\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2026/Q01_USAAAO_2026.png" alt="Circular Orbit Kinematics Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Kinematics of uniform circular motion utilizing vector calculus. The acceleration vector of a particle is defined as the first time derivative of its velocity vector. In a uniform circular orbit, the acceleration is purely centripetal, meaning it must be orthogonal to the tangential velocity vector at all times.</p>
<p><strong>Solution:</strong></p>
<p>Given the velocity vector in the orbital plane:</p>
<p>$$ \\vec{v}(t) = v_0(\\cos(\\omega t)\\hat{i} + \\sin(\\omega t)\\hat{j}) $$</p>
<p>We differentiate with respect to time to find the acceleration vector \\(\\vec{a}(t)\\):</p>
<p>$$ \\vec{a}(t) = \\frac{d\\vec{v}}{dt} = v_0(-\\omega\\sin(\\omega t)\\hat{i} + \\omega\\cos(\\omega t)\\hat{j}) = v_0\\omega(-\\sin(\\omega t)\\hat{i} + \\cos(\\omega t)\\hat{j}) $$</p>
<p>First, we determine the magnitude of the acceleration vector:</p>
<p>$$ |\\vec{a}| = \\sqrt{(-v_0\\omega\\sin(\\omega t))^2 + (v_0\\omega\\cos(\\omega t))^2} $$</p>
<p>$$ |\\vec{a}| = v_0\\omega \\sqrt{\\sin^2(\\omega t) + \\cos^2(\\omega t)} = v_0\\omega $$</p>
<p>Next, we evaluate the geometric relationship between \\(\\vec{v}\\) and \\(\\vec{a}\\) by computing their dot product:</p>
<p>$$ \\vec{v} \\cdot \\vec{a} = (v_0\\cos(\\omega t))(-v_0\\omega\\sin(\\omega t)) + (v_0\\sin(\\omega t))(v_0\\omega\\cos(\\omega t)) $$</p>
<p>$$ \\vec{v} \\cdot \\vec{a} = -v_0^2\\omega\\cos(\\omega t)\\sin(\\omega t) + v_0^2\\omega\\sin(\\omega t)\\cos(\\omega t) = 0 $$</p>
<p>Since the dot product is exactly zero, the acceleration vector is strictly perpendicular to the velocity vector at all times.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q2_usaaao_2026",
        id: "Q2",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Orbital Mechanics Concepts",
        description: `A planet of mass \\(m\\) orbits a star of mass \\(M\\) in an elliptical orbit with semi-major axis \\(a\\) and eccentricity \\(e\\) where \\(M \\gg m\\). Which of the following statements is true?<br><br>
(a) The orbital speed is maximized at aphelion due to conservation of energy <br>
(b) The planet moves in a perfect circle around the star regardless of eccentricity <br>
(c) The orbital period depends on eccentricity through Kepler's Third Law <br>
(d) The Roche limit increases if the planet's density decreases <br>
(e) All five Lagrange points correspond to stable equilibria`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Fundamental principles of orbital mechanics, including Kepler's Laws, Lagrangian points stability, and tidal disruption (Roche limit).</p>
<p><strong>Solution:</strong></p>
<p>We evaluate the physical validity of each statement:</p>
<ul>
    <li><strong>(a) Incorrect.</strong> By Kepler's Second Law (conservation of specific angular momentum, \\(h = r \\times v\\)), the orbital speed is maximized when the radial distance is minimized. Thus, speed is maximized at <em>perihelion</em>, not aphelion.</li>
    <li><strong>(b) Incorrect.</strong> An orbit is only a perfect circle if the eccentricity \\(e\\) is exactly \\(0\\). For any \\(0 < e < 1\\), the trajectory is strictly elliptical.</li>
    <li><strong>(c) Incorrect.</strong> Kepler's Third Law states that \\(T^2 \\propto a^3\\). The orbital period is entirely independent of the eccentricity.</li>
    <li><strong>(d) Correct.</strong> The Roche limit \\(d\\) is the critical distance within which a celestial body held together by its own gravity will shatter due to the tidal forces of the primary body. It is approximated by:
    $$ d \\approx 2.44 R_M \\left(\\frac{\\rho_M}{\\rho_m}\\right)^{1/3} $$
    where \\(\\rho_M\\) is the primary's density and \\(\\rho_m\\) is the satellite's (planet's) density. Since \\(\\rho_m\\) is in the denominator, a decrease in the planet's density causes the Roche limit to increase (the planet becomes structurally more fragile to tidal shearing).</li>
    <li><strong>(e) Incorrect.</strong> Only the triangular Lagrangian points (\\(L_4\\) and \\(L_5\\)) represent stable equilibria. The collinear points (\\(L_1\\), \\(L_2\\), \\(L_3\\)) are saddle points in the effective potential and represent unstable equilibria.</li>
</ul>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2026",
        id: "Q9",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1/10",
        title: "Asteroid Orbital Period",
        description: `The asteroid Pallas orbits the Sun with a semi-major axis of 2.77 AU. What is its orbital period around the Sun in years?<br><br>
(a) \\( (2.77)^{1/2} \\)<br>
(b) \\( (2.77)^{3/2} \\)<br>
(c) \\( (2.77)^{5/2} \\)<br>
(d) \\( (2.77)^{2/3} \\)<br>
(e) \\( (2.77)^{2/5} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Application of Kepler's Third Law of Planetary Motion simplified for the Solar System.</p>
<p><strong>Solution:</strong></p>
<p>The generalized form of Kepler's Third Law is:</p>
<p>$$ T^2 = \\frac{4\\pi^2}{GM_\\odot} a^3 $$</p>
<p>By expressing the orbital period \\(T\\) in Earth years and the semi-major axis \\(a\\) in Astronomical Units (AU), the constants normalize such that \\(\\frac{4\\pi^2}{GM_\\odot} = 1\\). The relation simplifies directly to:</p>
<p>$$ T^2 = a^3 $$</p>
<p>$$ T = a^{3/2} $$</p>
<p>Given that the semi-major axis of Pallas is \\(a = 2.77\\) AU, the period is:</p>
<p>$$ T = (2.77)^{3/2} \\text{ years} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2026",
        id: "Q10",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3/10",
        title: "Geostationary Satellite Altitude",
        description: `A small satellite orbits the Earth so it stays directly above a fixed point on the equator. Using \\(5.97 \\times 10^{24}\\) kg for Earth's mass and \\(6.37 \\times 10^6\\) m for its radius, how far is the satellite from the surface of the Earth? Assume its mass is 300 kg and an orbital period of 86164 s. (Find the distance above the Earth's surface, not orbital radius.)<br><br>
(a) \\( 3.58 \\times 10^6 \\) m <br>
(b) 1.56 m <br>
(c) \\( 4.22 \\times 10^7 \\) m <br>
(d) \\( 3.58 \\times 10^7 \\) m <br>
(e) None of the above`,
        solutionHtml: `<img src="assets/img/USAAAO_2026/Q10_USAAAO_2026.png" alt="Geostationary Satellite Orbit Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Newtonian gravitation applied to a geostationary orbit. A satellite in a geostationary orbit has a period equal to the Earth's sidereal rotation period, allowing it to remain fixed relative to a point on the equator.</p>
<p><strong>Solution:</strong></p>
<p>Using Kepler's Third Law, we first solve for the orbital radius \\(r\\) (distance from the center of the Earth):</p>
<p>$$ T^2 = \\frac{4\\pi^2}{GM_E} r^3 \\implies r = \\left( \\frac{G M_E T^2}{4\\pi^2} \\right)^{1/3} $$</p>
<p>We are provided with the following parameters:</p>
<ul>
    <li>\\( G = 6.674 \\times 10^{-11} \\text{ m}^3\\text{kg}^{-1}\\text{s}^{-2} \\)</li>
    <li>\\( M_E = 5.97 \\times 10^{24} \\text{ kg} \\)</li>
    <li>\\( T = 86164 \\text{ s} \\)</li>
    <li>\\( R_E = 6.37 \\times 10^6 \\text{ m} \\)</li>
</ul>
<p>Calculating the standard gravitational parameter for Earth:</p>
<p>$$ \\mu = GM_E = (6.674 \\times 10^{-11})(5.97 \\times 10^{24}) \\approx 3.984 \\times 10^{14} \\text{ m}^3\\text{s}^{-2} $$</p>
<p>Computing the orbital radius:</p>
<p>$$ r = \\left( \\frac{(3.984 \\times 10^{14})(86164)^2}{4\\pi^2} \\right)^{1/3} $$</p>
<p>$$ r = \\left( \\frac{(3.984 \\times 10^{14})(7.424 \\times 10^9)}{39.478} \\right)^{1/3} \\approx (7.49 \\times 10^{22})^{1/3} \\approx 4.22 \\times 10^7 \\text{ m} $$</p>
<p>The question requests the distance from the <em>surface</em> of the Earth (altitude \\(h\\)):</p>
<p>$$ h = r - R_E $$</p>
<p>$$ h = (4.22 \\times 10^7) - (0.637 \\times 10^7) = 3.583 \\times 10^7 \\text{ m} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q15_usaaao_2026",
        id: "Q15",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Lunar Recession",
        description: `Lunar laser ranging experiments show that, due to tidal effects, the semi-major axis of the Moon's orbit increases by around 38 mm per year. Assuming that the recession rate is constant, by approximately how much does this recession increase the Moon's sidereal orbital period each year? The mass of the Moon is \\(7.3 \\times 10^{22}\\) kg. <em>Hint: \\((1 + x)^\\beta \\approx 1 + \\beta x\\) for \\(|x| \\ll 1\\).</em><br><br>
(a) \\( 230 \\ \\mu\\text{s} \\) <br>
(b) \\( 350 \\ \\mu\\text{s} \\) <br>
(c) \\( 380 \\ \\mu\\text{s} \\) <br>
(d) \\( 690 \\ \\mu\\text{s} \\) <br>
(e) \\( 230 \\ \\text{ms} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Use Kepler's Third Law and the binomial approximation to find the small change in period (\\(\\Delta T\\)) caused by a small change in the semi-major axis (\\(\\Delta a\\)). Note: The mass of the Moon is a distractor.</p>
<p><strong>Solution:</strong></p>
<p>From Kepler's Third Law, \\(T^2 \\propto a^3\\), which means \\(T = C \\cdot a^{3/2}\\) (where \\(C\\) is a constant).</p>
<p>If the semi-major axis increases by \\(\\Delta a\\), the new period is:</p>
<p>$$ T + \\Delta T = C(a + \\Delta a)^{3/2} = C \\cdot a^{3/2} \\left(1 + \\frac{\\Delta a}{a}\\right)^{3/2} $$</p>
<p>Since \\(\\Delta a\\) is extremely small compared to \\(a\\), let \\(x = \\frac{\\Delta a}{a}\\) and \\(\\beta = \\frac{3}{2}\\). Using the hint:</p>
<p>$$ T + \\Delta T \\approx T \\left(1 + \\frac{3}{2}\\frac{\\Delta a}{a}\\right) = T + \\frac{3}{2}T\\frac{\\Delta a}{a} $$</p>
<p>Subtracting \\(T\\) from both sides leaves us with the formula for the change in period:</p>
<p>$$ \\Delta T = \\frac{3}{2} T \\frac{\\Delta a}{a} $$</p>
<p>Plug in standard Lunar constants:</p>
<ul>
    <li>\\( a \\approx 3.84 \\times 10^8 \\text{ m} \\) (Moon's semi-major axis)</li>
    <li>\\( T \\approx 27.32 \\text{ days} = 2.36 \\times 10^6 \\text{ s} \\) (Moon's sidereal period)</li>
    <li>\\( \\Delta a = 38 \\text{ mm} = 0.038 \\text{ m} \\)</li>
</ul>
<p>$$ \\Delta T = 1.5 \\cdot (2.36 \\times 10^6) \\cdot \\frac{0.038}{3.84 \\times 10^8} $$</p>
<p>$$ \\Delta T \\approx 3.5 \\times 10^6 \\cdot 10^{-10} = 3.5 \\times 10^{-4} \\text{ s} = 350 \\ \\mu\\text{s} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2026",
        id: "Q16",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        title: "Synodic Lunar Month on Exoplanet",
        description: `Kepler-22b is an exoplanet discovered by transiting with an orbital period of 290 days. Suppose it has a mass of \\(4.84 \\times 10^{25}\\) kg and a moon similar to Earth's, with a prograde orbit near the ecliptic plane of the Kepler-22 system and a semi-major axis of \\(7.70 \\times 10^8\\) m. What is the length of a synodic lunar month, i.e., the time between successive full moons, for an observer on Kepler-22b? You can neglect the mass of the moon.<br><br>
(a) 25.0 days <br>
(b) 27.3 days <br>
(c) 29.5 days <br>
(d) 30.2 days <br>
(e) 33.6 days`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Derivation of the sidereal period of a satellite using Newtonian gravity, followed by the calculation of the synodic period for a prograde orbit to determine the phase cycle.</p>
<p><strong>Solution:</strong></p>
<p>First, we determine the sidereal period \\(T_{sid}\\) of the moon around Kepler-22b.</p>
<p>$$ T_{sid} = 2\\pi \\sqrt{\\frac{a^3}{GM_p}} $$</p>
<p>Given the parameters:</p>
<ul>
    <li>\\( a = 7.70 \\times 10^8 \\text{ m} \\)</li>
    <li>\\( M_p = 4.84 \\times 10^{25} \\text{ kg} \\)</li>
    <li>\\( G = 6.674 \\times 10^{-11} \\text{ m}^3\\text{kg}^{-1}\\text{s}^{-2} \\)</li>
</ul>
<p>$$ T_{sid} = 2\\pi \\sqrt{\\frac{(7.70 \\times 10^8)^3}{(6.674 \\times 10^{-11})(4.84 \\times 10^{25})}} $$</p>
<p>$$ T_{sid} = 2\\pi \\sqrt{\\frac{4.565 \\times 10^{26}}{3.230 \\times 10^{15}}} = 2\\pi \\sqrt{1.413 \\times 10^{11}} \\approx 2,361,860 \\text{ s} $$</p>
<p>Convert the sidereal period to days:</p>
<p>$$ T_{sid} = \\frac{2,361,860}{86400} \\approx 27.336 \\text{ days} $$</p>
<p>Next, we calculate the synodic period \\(T_{syn}\\). Because the moon is in a prograde orbit, it must travel slightly more than 360 degrees to reach the same phase (e.g., full moon) relative to the central star, due to the planet's progression along its own orbit. The governing relation is:</p>
<p>$$ \\frac{1}{T_{syn}} = \\frac{1}{T_{sid}} - \\frac{1}{T_{plan}} \\implies T_{syn} = \\frac{T_{sid} T_{plan}}{T_{plan} - T_{sid}} $$</p>
<p>Using the planet's orbital period \\( T_{plan} = 290 \\text{ days} \\):</p>
<p>$$ T_{syn} = \\frac{27.336 \\times 290}{290 - 27.336} = \\frac{7927.44}{262.664} \\approx 30.18 \\text{ days} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2026",
        id: "Q27",
        competition: "USAAAO",
        year: 2026,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1/10",
        title: "Kirkwood Gaps and Orbital Resonance",
        description: `When plotting the distribution of asteroids in the asteroid belt by their semi-major axis, we can see several regions, known as "Kirkwood gaps," where asteroids' orbits are unstable due to an orbital resonance with Jupiter (\\(a = 5.20\\) AU). What orbital resonance is responsible for the gap marked with the arrow?<br><br>
<img src="assets/img/USAAAO_2026/Q27_USAAAO_2026.png" alt="Kirkwood Gaps Histogram" style="max-width: 100%; border-radius: 2px; margin: 15px 0;"><br>
(a) 8:5 <br>
(b) 11:6 <br>
(c) 9:4 <br>
(d) 5:2 <br>
(e) 3:1`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Orbital resonance within the asteroid belt (Kirkwood Gaps). The gaps occur at specific semi-major axes where the orbital period of an asteroid forms a simple integer ratio with the orbital period of Jupiter, causing periodic gravitational perturbations that clear the region.</p>
<p><strong>Solution:</strong></p>
<p>From Kepler's Third Law, \\(T \\propto a^{3/2}\\). For an asteroid in an orbital resonance \\(p:q\\) with Jupiter (where \\(p\\) is the number of asteroid orbits for every \\(q\\) Jupiter orbits), the periods are related by:</p>
<p>$$ \\frac{T_{ast}}{T_J} = \\frac{q}{p} $$</p>
<p>Substituting Kepler's Third Law:</p>
<p>$$ \\left( \\frac{a_{ast}}{a_J} \\right)^{3/2} = \\frac{q}{p} \\implies a_{ast} = a_J \\left( \\frac{q}{p} \\right)^{2/3} $$</p>
<p>Jupiter's semi-major axis is given as \\(a_J = 5.20 \\text{ AU}\\). We test the provided resonance ratios to match the visual position of the indicated gap on the histogram. The arrow points slightly past 2.8 AU.</p>
<ul>
    <li>For a <strong>3:1</strong> resonance (\\(p=3, q=1\\)): \\(a_{ast} = 5.20 \\times (1/3)^{2/3} \\approx 2.50 \\text{ AU}\\)</li>
    <li>For a <strong>5:2</strong> resonance (\\(p=5, q=2\\)): \\(a_{ast} = 5.20 \\times (2/5)^{2/3} \\approx 2.82 \\text{ AU}\\)</li>
    <li>For a <strong>9:4</strong> resonance (\\(p=9, q=4\\)): \\(a_{ast} = 5.20 \\times (4/9)^{2/3} \\approx 3.03 \\text{ AU}\\)</li>
</ul>
<p>The gap at roughly 2.82 AU corresponds perfectly to the 5:2 mean-motion resonance.</p>
<p><strong>Answer: (d)</strong></p>`
    }
];