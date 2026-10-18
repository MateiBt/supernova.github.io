// js/data/usaaao_2026.js
export const usaaao_2026 = [
    {
        uniqueId: "q1_usaaao_2026",
        id: "Q1",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
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
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
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
        uniqueId: "q3_usaaao_2026",
        id: "Q3",
        competition: "USAAAO",
        year: 2026,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Flat Galactic Rotation Curve",
        description: `Astronomers in the United States observe a spiral galaxy and measure its rotation curve. They find that beyond a radius \\(r_0\\), the orbital speed of stars remains approximately constant at \\(v_0\\). Which of the following conclusions is most accurate?<br><br>
(a) The mass density of the galaxy must decrease faster than \\(1/r^2\\) <br>
(b) The total enclosed mass becomes constant for \\(r > r_0\\) <br>
(c) The luminosity profile directly traces the mass distribution <br>
(d) The enclosed mass within radius \\(r\\) grows approximately linearly with \\(r\\) <br>
(e) The galaxy cannot contain a central supermassive black hole`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Galactic rotation curves and dark matter halo mass profiles derived from Newtonian gravitation.</p>
<p><strong>Solution:</strong></p>
<p>For a star on a circular orbit of radius \\(r\\) with orbital speed \\(v(r)\\), the centripetal acceleration is provided by the gravitational attraction of the total mass \\(M(r)\\) enclosed within radius \\(r\\):</p>
<p>$$ \\frac{G M(r)}{r^2} = \\frac{v(r)^2}{r} $$</p>
<p>Solving for the enclosed mass \\(M(r)\\) in the region \\(r > r_0\\) where \\(v(r) \\approx v_0 = \\text{const}\\):</p>
<p>$$ M(r) = \\frac{v_0^2}{G} r \\propto r $$</p>
<p>Thus, the enclosed mass within radius \\(r\\) grows approximately linearly with \\(r\\) (which corresponds to a spherical mass density profile \\(\\rho(r) = \\frac{1}{4\\pi r^2}\\frac{dM}{dr} \\propto r^{-2}\\)).</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q4_usaaao_2026",
        id: "Q4",
        competition: "USAAAO",
        year: 2026,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.0 / 10.0",
        title: "Stranded Island: Latitude Estimation",
        description: `You are stranded on a remote island somewhere on Earth, at an unknown date and time (in the \\(21^{\\text{st}}\\) century). You look up and see the night sky (where the center of the chart is the zenith, the boundary is the horizon, and the illuminated side of the Moon is on the left). Which of the following is the best estimate of your latitude?<br><br>
(a) \\(40^\\circ\\text{ N}\\) <br>
(b) \\(20^\\circ\\text{ N}\\) <br>
(c) \\(0^\\circ\\) <br>
(d) \\(20^\\circ\\text{ S}\\) <br>
(e) \\(40^\\circ\\text{ S}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Naked-eye positional astronomy; determining observer latitude from the declination of the zenith (\\(\\delta_Z = \\phi\\)) and the altitude of the celestial pole.</p>
<p><strong>Solution:</strong></p>
<p>We identify the prominent bright stars near the center of the all-sky projection (the observer's zenith):</p>
<ul>
    <li>The brightest star on the chart, located just right of the center, is <strong>Sirius (\\(\\alpha\\) CMa)</strong> at declination \\(\\delta \\approx -16^\\circ 43'\\), with Orion's belt to its upper right and <strong>Canopus (\\(\\alpha\\) Car, \\(\\delta \\approx -52^\\circ 42'\\))</strong> directly below it.</li>
    <li>Near the bottom-left horizon (around 7 o'clock) are <strong>\\(\\alpha\\) and \\(\\beta\\) Centauri</strong> and <strong>Crux</strong> (\\(\\delta \\approx -60^\\circ\\)) at an altitude of roughly \\(20^\\circ\\).</li>
</ul>
<p>Because the declination of the zenith equals the observer's geographic latitude (\\(\\phi = \\delta_{\\text{zenith}}\\)), and the zenith lies just south of Sirius's declination (\\(-16.7^\\circ\\)) and well north of Canopus (\\(-52.7^\\circ\\)), the observer's latitude is approximately:</p>
<p>$$ \\phi \\approx -20^\\circ = 20^\\circ\\text{ S} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2026",
        id: "Q5",
        competition: "USAAAO",
        year: 2026,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.6 / 10.0",
        title: "Stranded Island: Month Estimation",
        description: `Using the same night sky map from Question 4 (where the illuminated side of the crescent Moon is on the left), which of the following is the best estimate of the month of the year?<br><br>
(a) January <br>
(b) April <br>
(c) July <br>
(d) September <br>
(e) November`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Determining the Sun's ecliptic longitude and Right Ascension from lunar elongation, phase orientation, and visible constellations.</p>
<p><strong>Solution:</strong></p>
<p>On the chart, Orion (\\(\\text{RA} \\approx 5.5^{\\text{h}}\\)) is to the right (West) of Sirius (\\(\\text{RA} \\approx 6.75^{\\text{h}}\\)), while Leo (\\(\\text{RA} \\approx 10^{\\text{h}}\\)) is to the left (East). The local meridian passes between Procyon (\\(\\text{RA} = 7^{\\text{h}}39^{\\text{m}}\\)) and Alphard (\\(\\text{RA} = 9^{\\text{h}}28^{\\text{m}}\\)), giving a Local Sidereal Time of:</p>
<p>$$ \\text{LST} = \\text{RA}_{\\text{zenith}} \\approx 8^{\\text{h}}00^{\\text{m}} $$</p>
<p>The crescent Moon is located in Leo at \\(\\text{RA}_{\\text{Moon}} \\approx 10^{\\text{h}}45^{\\text{m}}\\) at an altitude of \\(\\sim 43^\\circ\\) in the East, with its illuminated side facing <strong>left (East)</strong> toward the rising Sun below the eastern horizon. A crescent Moon with illuminated fraction \\(k \\approx 0.20\\text{--}0.25\\) has an elongation \\(\\psi\\) from the Sun given by:</p>
<p>$$ k = \\frac{1 - \\cos\\psi}{2} \\approx 0.23 \\implies \\psi \\approx 57^\\circ \\approx 3.8^{\\text{h}} \\text{ to } 4.5^{\\text{h}} \\text{ of RA} $$</p>
<p>Since the Sun lies to the East (higher RA) of the waning crescent Moon and must be below the eastern horizon (\\(\\text{RA}_{\\text{horizon}} \\approx 14^{\\text{h}}20^{\\text{m}}\\)) for the sky to be dark, the Sun's Right Ascension is:</p>
<p>$$ \\text{RA}_\\odot \\approx 10.7^{\\text{h}} + 4.5^{\\text{h}} \\approx 15.2^{\\text{h}} $$</p>
<p>Since \\(\\text{RA}_\\odot = 12^{\\text{h}}\\) on September 22 and increases by \\(2^{\\text{h}}\\) per month, \\(\\text{RA}_\\odot \\approx 15.2^{\\text{h}}\\) corresponds to mid-<strong>November</strong>.</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q6_usaaao_2026",
        id: "Q6",
        competition: "USAAAO",
        year: 2026,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Stranded Island: Local Solar Time",
        description: `Using the same night sky map from Questions 4 and 5, which of the following is the best estimate of the time of day (relative to local solar noon)?<br><br>
(a) 8:00 PM <br>
(b) 10:00 PM <br>
(c) 12:00 AM <br>
(d) 2:00 AM <br>
(e) 4:00 AM`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Relating Local Sidereal Time (LST), Solar Right Ascension (\\(\\text{RA}_\\odot\\)), and Local Solar Time via the Hour Angle of the Sun.</p>
<p><strong>Solution:</strong></p>
<p>From Questions 4 and 5, the Local Sidereal Time is \\(\\text{LST} \\approx 8^{\\text{h}}00^{\\text{m}}\\), and the waning crescent Moon is high in the eastern sky with its lit face pointing toward the eastern horizon (where the Sun is about to rise). In mid-November (\\(\\text{RA}_\\odot \\approx 15.5^{\\text{h}}\\text{--}16^{\\text{h}}\\)), the Hour Angle of the Sun is:</p>
<p>$$ \\text{HA}_\\odot = \\text{LST} - \\text{RA}_\\odot \\approx 8^{\\text{h}} - 16^{\\text{h}} = -8^{\\text{h}} $$</p>
<p>Converting the Sun's hour angle to Local Solar Time:</p>
<p>$$ t_{\\text{solar}} = 12^{\\text{h}}00^{\\text{m}} + \\text{HA}_\\odot \\approx 12^{\\text{h}}00^{\\text{m}} - 8^{\\text{h}}00^{\\text{m}} = 4:00\\text{ AM} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2026",
        id: "Q7",
        competition: "USAAAO",
        year: 2026,
        module: "T8",
        moduleName: "Stellar Remnants and General Relativity",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Hawking Radiation Power Scaling",
        description: `One of Stephen Hawking's most famous predictions was the existence of Hawking radiation. Specifically, black holes act like thermal blackbodies and thus must emit blackbody radiation. According to Hawking, a black hole radiates a blackbody spectrum with peak wavelength \\(\\lambda_{\\text{max}}\\) proportional to its Schwarzschild radius \\(R_s\\). Treat the surface of the blackbody as being at the black hole's event horizon. According to the laws of thermodynamics and blackbody radiation, under this model, how does the power \\(P\\) radiated by a black hole scale with its mass \\(M\\)?<br><br>
(a) \\(P \\propto M^{-5}\\) <br>
(b) \\(P \\propto M^{-4}\\) <br>
(c) \\(P \\propto M^{-3}\\) <br>
(d) \\(P \\propto M^{-2}\\) <br>
(e) \\(P \\propto M^{-1}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Combining the Schwarzschild radius, Wien's Displacement Law, and the Stefan-Boltzmann Law to derive Hawking luminosity scaling.</p>
<p><strong>Solution:</strong></p>
<p>The Schwarzschild radius of a black hole of mass \\(M\\) is:</p>
<p>$$ R_s = \\frac{2GM}{c^2} \\propto M $$</p>
<p>Since \\(\\lambda_{\\text{max}} \\propto R_s \\propto M\\), Wien's Displacement Law (\\(\\lambda_{\\text{max}} T = b\\)) gives the Hawking temperature scaling:</p>
<p>$$ T \\propto \\frac{1}{\\lambda_{\\text{max}}} \\propto M^{-1} $$</p>
<p>The surface area of the event horizon is \\(A = 4\\pi R_s^2 \\propto M^2\\). Applying the Stefan-Boltzmann Law:</p>
<p>$$ P = A \\sigma T^4 \\propto (M^2)(M^{-1})^4 = M^{-2} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q8_usaaao_2026",
        id: "Q8",
        competition: "USAAAO",
        year: 2026,
        module: "T8",
        moduleName: "Stellar Remnants and General Relativity",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Black Hole Mass Evaporation Curve",
        description: `Next, interpret the radiated power \\(P\\) from Question 7 as a gradual loss of the black hole's intrinsic mass-energy \\(E = Mc^2\\). Consider the graph of the black hole's mass versus time. Which of the following best describes the shape of the resulting graph?<br><br>
(a) Increasing and concave up <br>
(b) Constant <br>
(c) Decreasing and concave down <br>
(d) Linearly decreasing <br>
(e) Decreasing and concave up`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Differential analysis of black hole mass-energy loss (\\(dE/dt = -P\\)) to determine the signs of the first and second time derivatives of \\(M(t)\\).</p>
<p><strong>Solution:</strong></p>
<p>From mass-energy equivalence \\(E = Mc^2\\) and \\(P = k M^{-2}\\) (where \\(k > 0\\)):</p>
<p>$$ \\frac{dE}{dt} = c^2 \\frac{dM}{dt} = -P = -\\frac{k}{M^2} \\implies \\frac{dM}{dt} = -\\frac{k}{c^2 M^2} < 0 $$</p>
<p>Because \\(\\frac{dM}{dt} < 0\\), the mass \\(M(t)\\) is strictly <strong>decreasing</strong>. Differentiating a second time with respect to \\(t\\):</p>
<p>$$ \\frac{d^2M}{dt^2} = \\frac{d}{dt}\\left(-\\frac{k}{c^2} M^{-2}\\right) = \\frac{2k}{c^2 M^3} \\frac{dM}{dt} = -\\frac{2k^2}{c^4 M^5} < 0 $$</p>
<p>Since \\(\\frac{d^2M}{dt^2} < 0\\) for all \\(M > 0\\), the curve \\(M(t)\\) is <strong>concave down</strong> (the evaporation accelerates as the black hole shrinks).</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2026",
        id: "Q9",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
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
<p>$$ T^2 = a^3 \\implies T = a^{3/2} $$</p>
<p>Given that the semi-major axis of Pallas is \\(a = 2.77\\) AU, the period is:</p>
<p>$$ T = (2.77)^{3/2} \\text{ years} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2026",
        id: "Q10",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
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
<p>$$ r = \\left( \\frac{(3.984 \\times 10^{14})(86164)^2}{4\\pi^2} \\right)^{1/3} \\approx 4.22 \\times 10^7 \\text{ m} $$</p>
<p>The question requests the distance from the <em>surface</em> of the Earth (altitude \\(h\\)):</p>
<p>$$ h = r - R_E = (4.22 \\times 10^7) - (0.637 \\times 10^7) = 3.583 \\times 10^7 \\text{ m} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q11_usaaao_2026",
        id: "Q11",
        competition: "USAAAO",
        year: 2026,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.2 / 10.0",
        title: "Erased Bright Stars on Sky Map",
        description: `Four bright stars were erased from the sky map. All of these stars have magnitudes lower than 3.0. Select the alternative with the four stars that were erased from the sky map.<br><br>
(a) \\(\\alpha\\) And, \\(\\alpha\\) CrB, \\(\\beta\\) Her, and \\(\\alpha\\) PsA <br>
(b) \\(\\alpha\\) And, \\(\\alpha\\) Aql, \\(\\beta\\) Cet, and \\(\\alpha\\) Lyr <br>
(c) \\(\\alpha\\) Aql, \\(\\alpha\\) CrB, \\(\\beta\\) Her, and \\(\\alpha\\) Peg <br>
(d) \\(\\beta\\) Cet, \\(\\beta\\) Her, \\(\\alpha\\) Peg, and \\(\\alpha\\) Oph <br>
(e) \\(\\alpha\\) Aqr, \\(\\alpha\\) CrB, \\(\\alpha\\) Cyg, and \\(\\alpha\\) Her`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Naked-eye constellation recognition and bright star asterisms (Summer Triangle, Great Square of Pegasus, Keystone of Hercules, and Corona Borealis).</p>
<p><strong>Solution:</strong></p>
<p>By inspecting the major northern/equatorial asterisms on the star chart:</p>
<ul>
    <li><strong>Summer Triangle:</strong> Both <strong>Vega (\\(\\alpha\\) Lyr)</strong> and <strong>Deneb (\\(\\alpha\\) Cyg)</strong> are clearly plotted near the center, eliminating choices (b) and (e). However, at the third vertex in Aquila, the flanking stars \\(\\gamma\\) Aql (Tarazed) and \\(\\beta\\) Aql (Alshain) are present while <strong>Altair (\\(\\alpha\\) Aql)</strong> between them is missing.</li>
    <li><strong>Great Square of Pegasus:</strong> Three corners—\\(\\alpha\\) And (Alpheratz), \\(\\beta\\) Peg (Scheat), and \\(\\gamma\\) Peg (Algenib)—are present, whereas the southwestern corner <strong>Markab (\\(\\alpha\\) Peg)</strong> is missing.</li>
    <li><strong>Corona Borealis & Hercules:</strong> The brightest jewel of the Northern Crown, <strong>Alphecca (\\(\\alpha\\) CrB)</strong>, and the brightest star of Hercules, <strong>Kornephoros (\\(\\beta\\) Her)</strong>, have both been erased. (Meanwhile, southern stars \\(\\alpha\\) PsA and \\(\\beta\\) Cet are clearly visible near the left boundary.)</li>
</ul>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q12_usaaao_2026",
        id: "Q12",
        competition: "USAAAO",
        year: 2026,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.5 / 10.0",
        title: "Extraterrestrial Transit of Jupiter",
        description: `An extraterrestrial form of life from a distant planetary system observed a transit of Jupiter across the Sun. The transit was central, which means that the center of Jupiter's disk intersected with the center of the Sun's disk throughout the transit. Neglecting the effect of limb darkening, which of the light curves could correspond to the transit of Jupiter seen by the extraterrestrial? (The x-axis corresponds to time difference in hours from mid-transit, and the y-axis corresponds to the apparent bolometric magnitude of the star.)<br><br>
(a) Baseline \\(m \\approx 9.740\\), transit depth \\(\\Delta m \\approx 0.011\\), total duration \\(\\approx 32.6\\text{ h}\\) (from \\(-16.3\\text{ h}\\) to \\(+16.3\\text{ h}\\)) <br>
(b) Baseline \\(m \\approx 4.750\\), transit depth \\(\\Delta m \\approx 0.200\\), total duration \\(\\approx 16\\text{ h}\\) <br>
(c) Baseline \\(m \\approx 7.1255\\), transit depth \\(\\Delta m \\approx 0.0115\\), total duration \\(\\approx 46\\text{ h}\\) (from \\(-23\\text{ h}\\) to \\(+23\\text{ h}\\)) <br>
(d) Baseline \\(m \\approx 8.23485\\), transit depth \\(\\Delta m \\approx 0.00045\\), total duration \\(\\approx 34\\text{ h}\\) <br>
(e) Baseline \\(m \\approx 8.235\\), transit depth \\(\\Delta m \\approx 0.200\\), total duration \\(\\approx 38\\text{ h}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Exoplanet transit photometry; calculating bolometric magnitude depth from the planet-to-star radius ratio and transit duration from orbital speed.</p>
<p><strong>Solution:</strong></p>
<p><strong>1. Transit Depth (\\(\\Delta m\\)):</strong></p>
<p>With \\(R_J \\approx 7.149 \\times 10^7\\text{ m}\\) and \\(R_\\odot \\approx 6.957 \\times 10^8\\text{ m}\\), the fractional flux decrease during totality is:</p>
<p>$$ \\frac{\\Delta F}{F} = \\left(\\frac{R_J}{R_\\odot}\\right)^2 \\approx (0.1028)^2 \\approx 0.01056 $$</p>
<p>Using Pogson's relation, the increase in apparent bolometric magnitude is:</p>
<p>$$ \\Delta m = -2.5 \\log_{10}\\left(1 - \\frac{\\Delta F}{F}\\right) = -2.5 \\log_{10}(1 - 0.01056) \\approx 0.0115\\text{ mag} $$</p>
<p>This eliminates (b), (d), and (e), leaving only (a) and (c).</p>
<p><strong>2. Transit Duration (\\(t_{14}\\) and \\(t_{23}\\)):</strong></p>
<p>Jupiter's orbital speed at \\(a_J = 5.20\\text{ AU}\\) is:</p>
<p>$$ v_J = \\frac{v_\\oplus}{\\sqrt{5.20}} \\approx \\frac{29.78\\text{ km/s}}{2.280} \\approx 13.06\\text{ km/s} $$</p>
<p>The total duration from first to fourth contact (\\(t_{14}\\)) and the flat-bottom duration from second to third contact (\\(t_{23}\\)) are:</p>
<p>$$ t_{14} = \\frac{2(R_\\odot + R_J)}{v_J} \\approx \\frac{2(6.957 + 0.715)\\times 10^5\\text{ km}}{13.06\\text{ km/s}} \\approx 1.175 \\times 10^5\\text{ s} \\approx 32.6\\text{ hours} \\quad (\\pm 16.3\\text{ h}) $$</p>
<p>$$ t_{23} = \\frac{2(R_\\odot - R_J)}{v_J} \\approx \\frac{2(6.957 - 0.715)\\times 10^5\\text{ km}}{13.06\\text{ km/s}} \\approx 9.56 \\times 10^4\\text{ s} \\approx 26.5\\text{ hours} \\quad (\\pm 13.3\\text{ h}) $$</p>
<p>Light curve <strong>(a)</strong> matches both the \\(\\approx 0.011\\text{ mag}\\) depth and the \\(\\pm 16.3\\text{ h}\\) total duration (whereas (c) spans \\(\\pm 23\\text{ h}\\)).</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2026",
        id: "Q13",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Minimum Angular Separation of Algol and the Sun",
        description: `What is the smallest angular separation between Algol (\\(\\beta\\) Per) and the Sun throughout the year? Algol's declination is \\(+40^\\circ 57'\\) and its right ascension is \\(3^{\\text{h}}08^{\\text{min}}\\).<br><br>
(a) \\(11^\\circ 49'\\) <br>
(b) \\(15^\\circ 45'\\) <br>
(c) \\(22^\\circ 26'\\) <br>
(d) \\(26^\\circ 56'\\) <br>
(e) \\(29^\\circ 03'\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spherical coordinate transformation from equatorial coordinates \\((\\alpha, \\delta)\\) to ecliptic coordinates \\((\\lambda, \\beta)\\). Since the Sun travels along the ecliptic (\\(\\beta_\\odot = 0^\\circ\\)), the minimum angular separation between a star and the Sun is the star's ecliptic latitude \\(|\\beta|\\).</p>
<p><strong>Solution:</strong></p>
<p>First, convert Algol's equatorial coordinates into degrees:</p>
<ul>
    <li>\\( \\alpha = 3^{\\text{h}}08^{\\text{min}} = 3 \\times 15^\\circ + 8 \\times 0.25^\\circ = 47.0^\\circ \\)</li>
    <li>\\( \\delta = +40^\\circ 57' = 40.95^\\circ \\)</li>
    <li>Obliquity of the ecliptic: \\( \\varepsilon = 23^\\circ 26' = 23.439^\\circ \\)</li>
</ul>
<p>Applying the spherical law of cosines to the celestial triangle formed by the North Celestial Pole, the North Ecliptic Pole, and Algol:</p>
<p>$$ \\sin\\beta = \\sin\\delta\\cos\\varepsilon - \\cos\\delta\\sin\\varepsilon\\sin\\alpha $$</p>
<p>Substituting the numerical values:</p>
<p>$$ \\sin\\beta = \\sin(40.95^\\circ)\\cos(23.439^\\circ) - \\cos(40.95^\\circ)\\sin(23.439^\\circ)\\sin(47.0^\\circ) $$</p>
<p>$$ \\sin\\beta = (0.65540)(0.91748) - (0.75528)(0.39778)(0.73135) = 0.60132 - 0.21972 = 0.38160 $$</p>
<p>Solving for \\(\\beta\\):</p>
<p>$$ \\beta = \\arcsin(0.38160) = 22.433^\\circ = 22^\\circ 26' $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q14_usaaao_2026",
        id: "Q14",
        competition: "USAAAO",
        year: 2026,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Expanding Gas Cloud Optical Depth",
        description: `Consider a cloud of hot gas with radius \\(R\\) and total (electromagnetic) power emission rate \\(P\\). Keeping the average temperature of gas particles and average emissivity per particle constant, the cloud now expands to a radius \\(2R\\). How does the net total power \\(P\\) radiated away, observed from far away, change in the cases where the cloud is optically thin (optical depth \\(\\tau \\ll 1\\)) and optically thick (optical depth \\(\\tau \\gg 1\\)), respectively? Assume the total number of particles remains constant.<br><br>
(a) Remains approximately constant, remains approximately constant <br>
(b) Remains approximately constant, increases significantly <br>
(c) Increases significantly, decreases significantly <br>
(d) Increases significantly, remains approximately constant <br>
(e) Increases significantly, increases significantly`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Radiative transfer in optically thin (volumetric emission) versus optically thick (surface blackbody emission) media.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Optically Thin Case (\\(\\tau \\ll 1\\)):</strong> Nearly every photon emitted anywhere within the interior of the cloud escapes into space without being reabsorbed. Consequently, the total power radiated is simply the sum of the power emitted by all \\(N\\) individual particles: \\(P_{\\text{thin}} = N \\langle \\epsilon \\rangle\\). Since both \\(N\\) and the average emissivity per particle remain constant during the expansion, \\(P_{\\text{thin}}\\) <strong>remains approximately constant</strong>.</li>
    <li><strong>Optically Thick Case (\\(\\tau \\gg 1\\)):</strong> Photons from the interior are trapped, and the cloud radiates from its effective photospheric surface as a blackbody at temperature \\(T\\):
    $$ P_{\\text{thick}} = 4\\pi R^2 \\sigma T^4 $$
    When the radius expands from \\(R\\) to \\(2R\\) at constant temperature \\(T\\), the radiating surface area increases by a factor of \\(4\\), so \\(P_{\\text{thick}}\\) <strong>increases significantly</strong>.</li>
</ul>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q15_usaaao_2026",
        id: "Q15",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.9 / 10.0",
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
<p>$$ \\Delta T = 1.5 \\cdot (2.36 \\times 10^6) \\cdot \\frac{0.038}{3.84 \\times 10^8} \\approx 3.5 \\times 10^{-4} \\text{ s} = 350 \\ \\mu\\text{s} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2026",
        id: "Q16",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.7 / 10.0",
        title: "Synodic Lunar Month on Exoplanet",
        description: `Kepler-22b is an exoplanet discovered by transiting with an orbital period of 290 days. Suppose it has a mass of \\(4.84 \\times 10^{25}\\) kg and a moon similar to Earth's, with a prograde orbit near the ecliptic plane of the Kepler-22 system and a semi-major axis of \\(7.70 \\times 10^8\\) m. What is the length of a synodic lunar month, i.e., the time between successive full moons, for an observer on Kepler-22b? You can neglect the mass of the moon.<br><br>
(a) 25.0 days <br>
(b) 27.3 days <br>
(c) 29.5 days <br>
(d) 30.2 days <br>
(e) 33.6 days`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Derivation of the sidereal period of a satellite using Newtonian gravity, followed by the calculation of the synodic period for a prograde orbit to determine the phase cycle.</p>
<p><strong>Solution:</strong></p>
<p>First, we determine the sidereal period \\(T_{sid}\\) of the moon around Kepler-22b:</p>
<p>$$ T_{sid} = 2\\pi \\sqrt{\\frac{a^3}{GM_p}} = 2\\pi \\sqrt{\\frac{(7.70 \\times 10^8)^3}{(6.674 \\times 10^{-11})(4.84 \\times 10^{25})}} \\approx 2,361,860 \\text{ s} \\approx 27.336 \\text{ days} $$</p>
<p>Next, we calculate the synodic period \\(T_{syn}\\) for a prograde orbit:</p>
<p>$$ \\frac{1}{T_{syn}} = \\frac{1}{T_{sid}} - \\frac{1}{T_{plan}} \\implies T_{syn} = \\frac{T_{sid} T_{plan}}{T_{plan} - T_{sid}} $$</p>
<p>Using the planet's orbital period \\( T_{plan} = 290 \\text{ days} \\):</p>
<p>$$ T_{syn} = \\frac{27.336 \\times 290}{290 - 27.336} = \\frac{7927.44}{262.664} \\approx 30.18 \\text{ days} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q17_usaaao_2026",
        id: "Q17",
        competition: "USAAAO",
        year: 2026,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.8 / 10.0",
        title: "Dynamical Friction and Virialized Star Cluster",
        description: `A quickly-moving black hole passes through the center of a large star cluster. While the black hole does not experience any direct collisions with any stars in the cluster or significantly disrupt any stellar atmospheres, the black hole imparts a fraction of its momentum to several stars in the cluster close to the black hole's trajectory. Some time passes, and due to complex multi-body interactions, the additional energy and momentum get distributed over the entire star cluster. After a sufficiently long time, which of the following statements are likely TRUE regarding the system (compared to before the black hole event), assuming no further perturbations occur?<br><br>
(I) The average peak blackbody emission wavelength among stars in the cluster decreases significantly.<br>
(II) Stars are on average further apart from each other than they were before.<br>
(III) Stars have lower relative velocities with respect to each other than they had before.<br><br>
(a) I only <br>
(b) II only <br>
(c) III only <br>
(d) II and III <br>
(e) I and II`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: The Virial Theorem and the negative heat capacity of self-gravitating bound systems.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Statement (I) is False:</strong> The passage of the black hole does not alter the internal nuclear structure or surface temperatures \\(T_{\\text{eff}}\\) of individual stars, so their peak blackbody wavelengths \\(\\lambda_{\\text{max}}\\) remain unchanged.</li>
    <li><strong>Statement (II) is True:</strong> Through gravitational dynamical friction, the black hole injects positive mechanical energy into the cluster's internal degrees of freedom, increasing the total internal energy \\(E = K + U\\) (making \\(E < 0\\) less negative, \\(\\Delta E > 0\\)). Once the cluster relaxes back into virial equilibrium (\\(2\\langle K \\rangle + \\langle U \\rangle = 0\\)), the total energy satisfies \\(E = \\frac{1}{2}\\langle U \\rangle \\propto -\\frac{GM^2}{\\langle r \\rangle}\\). Because \\(E\\) becomes less negative, \\(|\\langle U \\rangle|\\) decreases, meaning the average inter-stellar separation \\(\\langle r \\rangle\\) <strong>increases</strong>.</li>
    <li><strong>Statement (III) is True:</strong> By the Virial Theorem, the internal kinetic energy in the cluster's center-of-mass frame is \\(\\langle K \\rangle = -E\\). Because adding energy increases \\(E\\) (\\(\\Delta E > 0\\)), the new equilibrium internal kinetic energy changes by \\(\\Delta \\langle K \\rangle = -\\Delta E < 0\\). Thus, after expanding into a more loosely bound state, the stars have <strong>lower relative velocities</strong> with respect to one another (negative heat capacity).</li>
</ul>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q18_usaaao_2026",
        id: "Q18",
        competition: "USAAAO",
        year: 2026,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "CMB Temperature at Galaxy MoM-z14",
        description: `The most distant known galaxy, MoM-z14, was recently observed by the James Webb Space Telescope and has a redshift of \\(z = 14.44\\). If the current cosmic microwave background (CMB) temperature is \\(2.725\\text{ K}\\), what was the CMB temperature at MoM-z14?<br><br>
(a) \\(0.1887\\text{ K}\\) <br>
(b) \\(39.35\\text{ K}\\) <br>
(c) \\(42.07\\text{ K}\\) <br>
(d) \\(568.2\\text{ K}\\) <br>
(e) \\(3208\\text{ K}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Cosmological scaling of the Cosmic Microwave Background temperature with redshift \\(z\\).</p>
<p><strong>Solution:</strong></p>
<p>As the universe expands, photon wavelengths stretch with the scale factor \\(a(t) = (1+z)^{-1}\\), so the temperature of the relic blackbody radiation scales as:</p>
<p>$$ T(z) = T_0(1 + z) $$</p>
<p>Substituting \\(T_0 = 2.725\\text{ K}\\) and \\(z = 14.44\\):</p>
<p>$$ T(14.44) = 2.725\\text{ K} \\times (1 + 14.44) = 2.725 \\times 15.44 = 42.074\\text{ K} \\approx 42.07\\text{ K} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2026",
        id: "Q19",
        competition: "USAAAO",
        year: 2026,
        module: "T5",
        moduleName: "Stellar Structure and Atmospheres",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Stellar Density Profile Integration",
        description: `Assume a spherical star has a density profile described by the equation below:
$$ \\rho(r) = \\left(1 - \\frac{r^3}{R^3}\\right)\\rho_c \\qquad 0 \\le r \\le R $$
Find \\(\\rho_c\\) in terms of the total mass, \\(M\\), and the radius of the star, \\(R\\).<br><br>
(a) \\(\\frac{3M}{\\pi R^3}\\) <br>
(b) \\(\\frac{15M}{8\\pi R^3}\\) <br>
(c) \\(\\frac{3M}{2\\pi R^3}\\) <br>
(d) \\(\\frac{21M}{16\\pi R^3}\\) <br>
(e) \\(\\frac{6M}{5\\pi R^3}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Conservation of mass in spherical stellar structure (integrating concentric spherical shells).</p>
<p><strong>Solution:</strong></p>
<p>The total mass \\(M\\) of a spherically symmetric star of radius \\(R\\) is obtained by integrating the mass continuity equation over the volume:</p>
<p>$$ M = \\int_0^R 4\\pi r^2 \\rho(r)\\,dr = 4\\pi \\rho_c \\int_0^R \\left(r^2 - \\frac{r^5}{R^3}\\right)dr $$</p>
<p>Evaluating the definite integral:</p>
<p>$$ M = 4\\pi \\rho_c \\left[ \\frac{r^3}{3} - \\frac{r^6}{6R^3} \\right]_0^R = 4\\pi \\rho_c \\left( \\frac{R^3}{3} - \\frac{R^3}{6} \\right) = 4\\pi \\rho_c \\left(\\frac{R^3}{6}\\right) = \\frac{2\\pi R^3}{3}\\rho_c $$</p>
<p>Solving for the central density \\(\\rho_c\\):</p>
<p>$$ \\rho_c = \\frac{3M}{2\\pi R^3} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2026",
        id: "Q20",
        competition: "USAAAO",
        year: 2026,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Early Universe Main-Sequence Stars",
        description: `Some stars formed in the early universe are still observable today. If an observer observed one and it is still in the main sequence phase, what would most likely be its mass?<br><br>
(a) \\(< 2\\ M_\\odot\\) <br>
(b) \\(2\\text{--}8\\ M_\\odot\\) <br>
(c) \\(8\\text{--}12\\ M_\\odot\\) <br>
(d) \\(12\\text{--}20\\ M_\\odot\\) <br>
(e) \\(> 20\\ M_\\odot\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Main-sequence stellar lifetime scaling with stellar mass (\\(\\tau_{\\text{MS}} \\propto M / L \\propto M^{-2.5}\\)).</p>
<p><strong>Solution:</strong></p>
<p>The age of the universe is approximately \\(13.8\\text{ Gyr}\\), and the Sun (\\(1\\ M_\\odot\\)) has a main-sequence lifetime of \\(\\tau_\\odot \\approx 10\\text{ Gyr}\\). For a star formed in the early universe to remain on the main sequence today, its main-sequence lifetime must exceed \\(\\sim 13\\text{ Gyr}\\):</p>
<p>$$ \\tau_{\\text{MS}} \\approx 10\\text{ Gyr} \\left(\\frac{M}{M_\\odot}\\right)^{-2.5} \\gtrsim 13\\text{ Gyr} \\implies M \\lesssim 0.9\\ M_\\odot < 2\\ M_\\odot $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q21_usaaao_2026",
        id: "Q21",
        competition: "USAAAO",
        year: 2026,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Inner Galactic Rotation Curve Power Law",
        description: `Consider orbital radii within the most luminous part of the galactic disk, at around \\(r \\le 5000\\text{ ly}\\). Let \\(M(r)\\) be the total mass (of all forms) enclosed within a distance \\(r\\) from the galactic center. Approximating the rotation curve by the low-radius best fit (dot-dash) straight line through the origin, we can infer that \\(M(r)\\) is roughly proportional to \\(r^n\\) for some value of \\(n\\) (over small \\(r\\)). In light of the value of \\(n\\), and for \\(r \\le 5000\\text{ ly}\\), which of the following hypotheses is MOST consistent with the data?<br><br>
(a) Near the galactic center, the mass is concentrated in and is nearly uniform over the 2D galactic plane. <br>
(b) The majority of the contribution to \\(M(r)\\) comes from the existence of a supermassive black hole at the galactic center. <br>
(c) Dark energy-based repulsion from the galactic center induces a mass distribution of the form \\(\\rho(r) \\propto r^2\\). <br>
(d) Complex gravitational interactions with the dark matter halo make such power laws impossible, with no single value of \\(n\\) being consistent with the best fit line. <br>
(e) Gas, dust, and stars are approximately uniformly distributed in 3D space near the galactic center with no significant radius dependence of density.`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Solid-body inner galactic rotation curve (\\(v \\propto r\\)) and its corresponding 3D spherical mass density distribution.</p>
<p><strong>Solution:</strong></p>
<p>For \\(r \\le 5000\\text{ ly}\\), the low-radius best fit line is linear through the origin: \\(v(r) \\propto r\\). Using Newtonian circular motion:</p>
<p>$$ \\frac{G M(r)}{r^2} = \\frac{v(r)^2}{r} \\implies M(r) = \\frac{r v(r)^2}{G} \\propto r \\cdot r^2 = r^3 \\quad (n = 3) $$</p>
<p>Since the volume of a sphere of radius \\(r\\) is \\(V(r) = \\frac{4}{3}\\pi r^3 \\propto r^3\\), an enclosed mass scaling of \\(M(r) \\propto r^3\\) implies a constant 3D mass density \\(\\rho(r) = \\text{const}\\). Thus, gas, dust, and stars are approximately uniformly distributed in 3D space near the galactic center (within the inner bulge/core).</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q22_usaaao_2026",
        id: "Q22",
        competition: "USAAAO",
        year: 2026,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Dark-to-Baryonic Enclosed Mass Ratio",
        description: `For larger values of \\(r\\), the discrepancy between the observed and expected rotation curves becomes significant. Assume that the expected rotation curve (dashed gray) is calculated from all baryonic matter, while the observed rotation curve (solid white) is due to the combination of baryonic matter and dark matter. Within a radius of \\(r = 40,000\\text{ ly}\\) from the galactic center, according to the graph (where \\(v_{\\text{obs}} \\approx 130\\text{ km s}^{-1}\\) and \\(v_{\\text{bary}} \\approx 38\\text{ km s}^{-1}\\)), which of the following is closest to the ratio between the dark matter mass and the baryonic matter mass enclosed?<br><br>
(a) 2 <br>
(b) 5 <br>
(c) 10 <br>
(d) 25 <br>
(e) 50`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Extracting the dark-to-baryonic mass ratio \\(M_{\\text{DM}}/M_{\\text{bary}}\\) from rotation curve velocities at a fixed galactocentric radius.</p>
<p><strong>Solution:</strong></p>
<p>At a fixed radius \\(r = 40,000\\text{ ly}\\), the enclosed mass is proportional to the square of the circular orbital velocity (\\(M(r) = r v^2 / G \\propto v^2\\)). Reading the values from the graph at \\(r = 40,000\\text{ ly}\\):</p>
<ul>
    <li>Observed total velocity: \\(v_{\\text{obs}} \\approx 130\\text{ km s}^{-1}\\)</li>
    <li>Expected baryonic velocity: \\(v_{\\text{bary}} \\approx 38\\text{ km s}^{-1}\\)</li>
</ul>
<p>Since \\(M_{\\text{tot}} = M_{\\text{DM}} + M_{\\text{bary}}\\), the ratio of dark matter mass to baryonic mass is:</p>
<p>$$ \\frac{M_{\\text{DM}}}{M_{\\text{bary}}} = \\frac{M_{\\text{tot}} - M_{\\text{bary}}}{M_{\\text{bary}}} = \\left(\\frac{v_{\\text{obs}}}{v_{\\text{bary}}}\\right)^2 - 1 \\approx \\left(\\frac{130}{38}\\right)^2 - 1 \\approx 11.7 - 1 = 10.7 \\approx 10 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q23_usaaao_2026",
        id: "Q23",
        competition: "USAAAO",
        year: 2026,
        module: "T6",
        moduleName: "Interstellar Medium and Star Formation",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Galactic Rotation Measurement Physics",
        description: `Consider the following three assertions related to the techniques used to measure the overall galactic rotation curve:<br><br>
(I) Interstellar dust is colder at lower values of \\(r\\), making the dust obscure less starlight.<br>
(II) O/B type stars in the spiral arms of galaxies emit significant quantities of UV light, ionizing nearby H-I clouds and thus inhibiting the emission of 21-cm radiation in their vicinities.<br>
(III) The lower star number density for higher values of \\(r\\) means that the stars that do exist typically move at relativistic speeds, complicating Doppler-based stellar velocity measurements.<br><br>
Which of the above are TRUE?<br><br>
(a) I only <br>
(b) II only <br>
(c) III only <br>
(d) I and II only <br>
(e) None of the above`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Physics of 21-cm neutral hydrogen hyperfine emission, H II photoionization regions, and interstellar dust extinction.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>(I) False:</strong> Interstellar dust near the galactic center is warmer (due to intense radiation fields) and denser, causing higher—not lower—optical extinction.</li>
    <li><strong>(II) True:</strong> The 21-cm line arises from the hyperfine spin-flip transition of the ground-state electron in neutral atomic hydrogen (\\(\\text{H I}\\)). Hot O and B stars emit copious Lyman-continuum UV photons (\\(E > 13.6\\text{ eV}\\)) that photoionize surrounding \\(\\text{H I}\\) clouds into \\(\\text{H II}\\) regions (free protons and electrons), preventing 21-cm spin-flip emission in their immediate vicinities.</li>
    <li><strong>(III) False:</strong> At large radii, orbital speeds are \\(v \\approx 130\\text{ km s}^{-1} \\approx 4.3 \\times 10^{-4}c\\), which is completely non-relativistic.</li>
</ul>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q24_usaaao_2026",
        id: "Q24",
        competition: "USAAAO",
        year: 2026,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Chained Supernova Redshifts",
        description: `Suppose the Honeyhive galaxy and the Gold Leaf galaxy are diametrically opposite when viewed from the Earth, and the following sequence of events happens:<br>
1. A type Ia supernova happens in the Honeyhive galaxy.<br>
2. Astronomers on Earth measure the redshift of the Honeyhive supernova to be \\(z = 0.5\\). At the same time, another supernova happens in the Milky Way galaxy.<br>
3. Aliens in the Gold Leaf galaxy measure the redshifts of the supernovae in the Honeyhive and Milky Way galaxies.<br><br>
If the alien astronomers measure the redshift of the Milky Way supernova to be \\(z = 0.8\\), what redshift would they measure for the Honeyhive supernova?<br><br>
(a) 0.2 <br>
(b) 0.4 <br>
(c) 1.3 <br>
(d) 1.7 <br>
(e) 2.7`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Multiplicative composition of cosmological scale factors \\(1 + z = a_{\\text{obs}}/a_{\\text{emit}}\\) along a shared light cone.</p>
<p><strong>Solution:</strong></p>
<p>Let \\(t_1\\) be the cosmic time when the Honeyhive supernova explodes, and \\(t_2\\) be the time when its light reaches the Milky Way (Earth) and the Milky Way supernova simultaneously explodes. Since Earth measures \\(z_{H \\to MW} = 0.5\\):</p>
<p>$$ \\frac{a(t_2)}{a(t_1)} = 1 + z_{H \\to MW} = 1.5 $$</p>
<p>Because Honeyhive and Gold Leaf are diametrically opposite from Earth, the light from the Honeyhive supernova passes Earth at \\(t_2\\) and travels alongside the light from the Milky Way supernova, arriving at the Gold Leaf galaxy at the exact same cosmic time \\(t_3\\). Since the aliens measure \\(z_{MW \\to GL} = 0.8\\):</p>
<p>$$ \\frac{a(t_3)}{a(t_2)} = 1 + z_{MW \\to GL} = 1.8 $$</p>
<p>Therefore, the redshift of the Honeyhive supernova measured at Gold Leaf is:</p>
<p>$$ 1 + z_{H \\to GL} = \\frac{a(t_3)}{a(t_1)} = \\frac{a(t_3)}{a(t_2)} \\cdot \\frac{a(t_2)}{a(t_1)} = 1.8 \\times 1.5 = 2.7 \\implies z_{H \\to GL} = 1.7 $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q25_usaaao_2026",
        id: "Q25",
        competition: "USAAAO",
        year: 2026,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Hydrogen Spectral Lines Ordering",
        description: `The Balmer-\\(\\alpha\\), H-I, and Lyman-\\(\\alpha\\) lines are important spectral lines in astronomy, all from hydrogen:<br>
- The Balmer-\\(\\alpha\\) line occurs when an electron goes from \\(n = 3\\) to \\(n = 2\\).<br>
- The H-I line occurs from an electron in the \\(1s\\) shell undergoing a spin-flip transition between two hyperfine levels.<br>
- The Lyman-\\(\\alpha\\) line occurs when an electron goes from \\(n = 2\\) to \\(n = 1\\).<br><br>
Order these lines from the shortest to longest wavelength.<br><br>
(a) Balmer-\\(\\alpha\\), H-I, Lyman-\\(\\alpha\\) <br>
(b) H-I, Balmer-\\(\\alpha\\), Lyman-\\(\\alpha\\) <br>
(c) Lyman-\\(\\alpha\\), H-I, Balmer-\\(\\alpha\\) <br>
(d) Lyman-\\(\\alpha\\), Balmer-\\(\\alpha\\), H-I <br>
(e) Balmer-\\(\\alpha\\), Lyman-\\(\\alpha\\), H-I`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Atomic transitions of hydrogen and the inverse relationship between transition energy \\(\\Delta E\\) and photon wavelength \\(\\lambda = hc/\\Delta E\\).</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Lyman-\\(\\alpha\\) (\\(n=2 \\to 1\\)):</strong> \\(\\Delta E = 10.2\\text{ eV} \\implies \\lambda \\approx 121.6\\text{ nm}\\) (Ultraviolet, shortest wavelength).</li>
    <li><strong>Balmer-\\(\\alpha\\) (\\(n=3 \\to 2\\)):</strong> \\(\\Delta E = 1.89\\text{ eV} \\implies \\lambda \\approx 656.3\\text{ nm}\\) (Optical red).</li>
    <li><strong>H-I Hyperfine Spin-Flip:</strong> \\(\\Delta E = 5.87 \\times 10^{-6}\\text{ eV} \\implies \\lambda \\approx 21.1\\text{ cm}\\) (Radio, longest wavelength).</li>
</ul>
<p>Ordered from shortest to longest wavelength: <strong>Lyman-\\(\\alpha\\), Balmer-\\(\\alpha\\), H-I</strong>.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2026",
        id: "Q26",
        competition: "USAAAO",
        year: 2026,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.5 / 10.0",
        title: "Eclipsing Binary Temperature Ratio",
        description: `Star X and star Y form an eclipsing binary system, where star X is larger, and fully blocks star Y during an eclipse. During the primary eclipse, the apparent magnitude of the binary system increases by 0.200, and during the secondary eclipse, the apparent magnitude only increases by 0.100. If \\(T_X\\) is the surface temperature of star X and \\(T_Y\\) is the surface temperature of star Y, which of the following is a possible value of \\(T_X / T_Y\\)? Ignore limb darkening.<br><br>
(a) 0.679 <br>
(b) 1.000 <br>
(c) 1.176 <br>
(d) 1.414 <br>
(e) 2.000`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Eclipsing binary light curves; relating the ratio of primary and secondary eclipse flux drops to effective surface temperatures via the Stefan-Boltzmann Law.</p>
<p><strong>Solution:</strong></p>
<p>Because Star X is larger and completely occults Star Y during one eclipse, during the other eclipse Star Y transits across Star X and blocks an identical cross-sectional area \\(A_{\\text{ecl}} = \\pi R_Y^2\\). By the Stefan-Boltzmann Law, the flux per unit area is \\(\\sigma T^4\\), so the ratio of flux lost during the two eclipses is:</p>
<p>$$ \\frac{\\Delta F_X}{\\Delta F_Y} = \\frac{\\pi R_Y^2 \\sigma T_X^4}{\\pi R_Y^2 \\sigma T_Y^4} = \\left(\\frac{T_X}{T_Y}\\right)^4 $$</p>
<p>Let \\(F_{\\text{tot}}\\) be the out-of-eclipse flux. From Pogson's equation, the fractional flux drops for \\(\\Delta m_1 = 0.200\\) and \\(\\Delta m_2 = 0.100\\) are:</p>
<p>$$ \\frac{\\Delta F_1}{F_{\\text{tot}}} = 1 - 10^{-0.200/2.5} = 1 - 10^{-0.08} \\approx 0.16824 $$</p>
<p>$$ \\frac{\\Delta F_2}{F_{\\text{tot}}} = 1 - 10^{-0.100/2.5} = 1 - 10^{-0.04} \\approx 0.08799 $$</p>
<p>If Star X has the higher surface temperature (so the primary eclipse \\(\\Delta F_1\\) occurs when Star Y transits Star X):</p>
<p>$$ \\frac{T_X}{T_Y} = \\left(\\frac{\\Delta F_1}{\\Delta F_2}\\right)^{1/4} = \\left(\\frac{0.16824}{0.08799}\\right)^{1/4} = (1.9120)^{1/4} \\approx 1.176 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2026",
        id: "Q27",
        competition: "USAAAO",
        year: 2026,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
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
<p>$$ \\frac{T_{ast}}{T_J} = \\frac{q}{p} \\implies a_{ast} = a_J \\left( \\frac{q}{p} \\right)^{2/3} $$</p>
<p>Jupiter's semi-major axis is given as \\(a_J = 5.20 \\text{ AU}\\). Testing the ratios near \\(2.82\\text{ AU}\\):</p>
<ul>
    <li>For a <strong>3:1</strong> resonance (\\(p=3, q=1\\)): \\(a_{ast} = 5.20 \\times (1/3)^{2/3} \\approx 2.50 \\text{ AU}\\)</li>
    <li>For a <strong>5:2</strong> resonance (\\(p=5, q=2\\)): \\(a_{ast} = 5.20 \\times (2/5)^{2/3} \\approx 2.82 \\text{ AU}\\)</li>
    <li>For a <strong>9:4</strong> resonance (\\(p=9, q=4\\)): \\(a_{ast} = 5.20 \\times (4/9)^{2/3} \\approx 3.03 \\text{ AU}\\)</li>
</ul>
<p>The gap at roughly 2.82 AU corresponds to the 5:2 mean-motion resonance.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q28_usaaao_2026",
        id: "Q28",
        competition: "USAAAO",
        year: 2026,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Globular Cluster Gaia DR3 CMD Regions",
        description: `An HR diagram (Color-Magnitude Diagram) for a globular cluster from Gaia DR3 data plots Absolute \\(G\\) Magnitude (from \\(-2\\) at the top to \\(+6\\) at the bottom) versus \\(\\text{BP} - \\text{RP}\\) color (from \\(-0.5\\) to \\(2.0\\)), with four labeled regions:<br>
- Region A: \\(M_G \\approx 1\\text{--}2\\), \\(\\text{BP}-\\text{RP} \\approx 0.0\\)<br>
- Region B: \\(M_G \\approx 4\\text{--}5\\), \\(\\text{BP}-\\text{RP} \\approx 0.8\\)<br>
- Region C: \\(M_G \\approx 2\\text{--}3\\), \\(\\text{BP}-\\text{RP} \\approx 1.1\\)<br>
- Region D: \\(M_G \\approx -2\\), \\(\\text{BP}-\\text{RP} \\approx 1.6\\)<br><br>
1) Identify the region where stars undergo hydrogen burning in their cores. 2) Identify the region where stars experience the Helium flash.<br><br>
(a) 1. Region A; 2. Region B <br>
(b) 1. Region A; 2. Region C <br>
(c) 1. Region B; 2. Region C <br>
(d) 1. Region B; 2. Region D <br>
(e) 1. Region C; 2. Region D`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Evolutionary tracks on a globular cluster Color-Magnitude Diagram (Main Sequence, Subgiant/Red Giant Branch, Tip of the RGB, and Horizontal Branch).</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Region A (Blue Horizontal Branch):</strong> Stars at \\(M_G \\approx 1\\) and \\(\\text{BP}-\\text{RP} \\approx 0.0\\) are undergoing stable core helium burning and shell hydrogen burning.</li>
    <li><strong>Region B (Main Sequence / Turnoff):</strong> Stars at \\(M_G \\approx 4\\text{--}5\\) and \\(\\text{BP}-\\text{RP} \\approx 0.8\\) lie on the upper main sequence, where they undergo <strong>core hydrogen burning</strong> (1 = Region B).</li>
    <li><strong>Region C (Lower Red Giant Branch):</strong> Stars ascending the RGB with an inert helium core and a hydrogen-burning shell.</li>
    <li><strong>Region D (Tip of the Red Giant Branch):</strong> At the luminous peak of the RGB (\\(M_G \\approx -2\\), \\(\\text{BP}-\\text{RP} \\approx 1.6\\)), the degenerate helium core reaches \\(T \\approx 10^8\\text{ K}\\) and ignites runaway triple-alpha fusion—the <strong>Helium flash</strong> (2 = Region D).</li>
</ul>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q29_usaaao_2026",
        id: "Q29",
        competition: "USAAAO",
        year: 2026,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.7 / 10.0",
        title: "Solar vs. CMB Photon Flux Ratio",
        description: `Which of the following is closest to the ratio of the number of photons from the Sun that strike the Earth each second to the number of photons from the Cosmic Microwave Background that strike the Earth each second? (Assume the Cosmic Microwave Background to be a uniform and isotropic blackbody signal at \\(T_c \\approx 2.725\\text{ K}\\). As a hint, you may approximate all photons from a given source as being at the peak emission energy.)<br><br>
(a) \\(5 \\times 10^4\\) <br>
(b) \\(2 \\times 10^5\\) <br>
(c) \\(3 \\times 10^7\\) <br>
(d) \\(1 \\times 10^8\\) <br>
(e) \\(4 \\times 10^8\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Blackbody photon number flux scaling (\\(\\Phi_{\\gamma} \\propto T^3\\)) and geometric interception of collimated solar radiation (\\(\\pi R_\\oplus^2\\)) versus isotropic background radiation (\\(4\\pi R_\\oplus^2\\)).</p>
<p><strong>Solution:</strong></p>
<p>By Wien's Law, the peak photon energy scales as \\(E_{\\text{ph}} = hc/\\lambda_{\\text{max}} \\propto T\\). Since blackbody energy flux scales as \\(F = \\sigma T^4\\), the photon flux scales as \\(F / E_{\\text{ph}} \\propto T^3\\).</p>
<ul>
    <li><strong>Solar Photons Intercepted by Earth:</strong> Collimated sunlight at \\(d = 1\\text{ AU}\\) strikes the Earth's cross-sectional disk \\(A_\\perp = \\pi R_\\oplus^2\\):
    $$ \\dot{N}_\\odot \\propto (\\pi R_\\oplus^2) T_\\odot^3 \\left(\\frac{R_\\odot}{d}\\right)^2 $$</li>
    <li><strong>CMB Photons Intercepted by Earth:</strong> Isotropic CMB radiation strikes the entire spherical surface area of the Earth \\(A_{\\text{sphere}} = 4\\pi R_\\oplus^2\\):
    $$ \\dot{N}_{\\text{CMB}} \\propto (4\\pi R_\\oplus^2) T_c^3 $$</li>
</ul>
<p>Taking the ratio with \\(T_\\odot = 5778\\text{ K}\\), \\(T_c = 2.725\\text{ K}\\), \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\), and \\(d = 1.496 \\times 10^{11}\\text{ m}\\):</p>
<p>$$ \\frac{\\dot{N}_\\odot}{\\dot{N}_{\\text{CMB}}} = \\frac{1}{4} \\left(\\frac{T_\\odot}{T_c}\\right)^3 \\left(\\frac{R_\\odot}{d}\\right)^2 = \\frac{1}{4} \\left(\\frac{5778}{2.725}\\right)^3 \\left(\\frac{6.957 \\times 10^8}{1.496 \\times 10^{11}}\\right)^2 $$</p>
<p>$$ \\frac{\\dot{N}_\\odot}{\\dot{N}_{\\text{CMB}}} \\approx 0.25 \\times (9.533 \\times 10^9) \\times (2.163 \\times 10^{-5}) \\approx 5.15 \\times 10^4 \\approx 5 \\times 10^4 $$</p>
<p><em>(Note: If comparing per unit area without the \\(1/4\\) cross-section-to-surface-area factor, the ratio is \\(2.06 \\times 10^5 \\approx 2 \\times 10^5\\), choice (b).)</em></p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q30_usaaao_2026",
        id: "Q30",
        competition: "USAAAO",
        year: 2026,
        module: "T11",
        moduleName: "Galactic Evolution and Active Galaxies",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Spiral vs. Elliptical Galaxy Populations",
        description: `Consider two galaxies:<br>
- Galaxy S is a spiral galaxy with blue spiral arms.<br>
- Galaxy E is an elliptical galaxy with no blue stars, only red stars.<br><br>
Which of the following statements are likely TRUE?<br>
(I) We can find planetary nebulae in both galaxies.<br>
(II) Galaxy S is likely to have ongoing star formation.<br>
(III) Galaxy E is likely to have ongoing star formation.<br>
(IV) Type II supernovae are more likely to be found in Galaxy S.<br>
(V) Type Ia supernovae are likely to be found only in Galaxy E.<br><br>
(a) (I), (II), (III) <br>
(b) (I), (II), (IV) <br>
(c) (I), (III), (IV) <br>
(d) (I), (IV), (V) <br>
(e) (II), (IV), (V)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Stellar populations, star formation histories, and supernova progenitor types in spiral versus elliptical galaxies.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>(I) True:</strong> Planetary nebulae are the ionized ejecta of low- and intermediate-mass AGB stars (\\(1\\text{--}8\\ M_\\odot\\)), which are abundant in both spiral and elliptical galaxies.</li>
    <li><strong>(II) True:</strong> Blue spiral arms are dominated by hot, massive, short-lived O and B stars, which require active, ongoing star formation.</li>
    <li><strong>(III) False:</strong> Elliptical galaxies containing only red, evolved Population II stars have exhausted their cold molecular gas reservoirs and exhibit negligible ongoing star formation.</li>
    <li><strong>(IV) True:</strong> Type II supernovae result from the core collapse of massive stars (\\(M \\gtrsim 8\\ M_\\odot\\)) with short lifetimes (\\(\\lesssim 30\\text{ Myr}\\)), so they occur predominantly in star-forming galaxies like Galaxy S.</li>
    <li><strong>(V) False:</strong> Type Ia supernovae arise from thermonuclear explosions of white dwarfs in binary systems and occur in <em>both</em> spiral and elliptical galaxies, not exclusively in Galaxy E.</li>
</ul>
<p><strong>Answer: (b)</strong></p>`
    }
];