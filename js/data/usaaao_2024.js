// js/data/usaaao_2024.js
export const usaaao_2024 = [
    {
        uniqueId: "q6_usaaao_2024",
        id: "Q6",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        title: "Angular Momentum of Intersecting Orbits",
        description: `Newly discovered planets DDP and CJ are found to orbit a nearby star. Planet CJ has a circular orbit with a radius of \\(2d\\), while planet DDP moves in an elliptical orbit with an aphelion of \\(5d\\) and a perihelion of \\(d\\). Their orbits intersect at location B. Additionally, through external analysis, planet DDP is found to be three times more massive than planet CJ. From the perspective of the star, what is the ratio of the angular momentum of planet DDP when it passes through point B to the angular momentum of planet CJ when it passes through point B? You may assume that the masses of both planets are significantly smaller than the mass of the star they orbit.`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Conservation of angular momentum. The orbital angular momentum \\(L\\) of a planet is constant throughout its orbit and depends on the mass of the body and the semi-latus rectum \\(p\\) of its orbit.</p>
<p><strong>Step 1: Angular Momentum of the Circular Orbit</strong></p>
<p>For planet CJ (circular orbit), the radius is \\(r_c = 2d\\). For a circular orbit, the semi-latus rectum is equal to the radius: \\(p_c = 2d\\).</p>
<p>Its angular momentum is:</p>
<p>$$ L_{CJ} = m_{CJ} \\sqrt{GM p_c} = m_{CJ} \\sqrt{2GMd} $$</p>
<p><strong>Step 2: Angular Momentum of the Elliptical Orbit</strong></p>
<p>For planet DDP (elliptical orbit), we have perihelion \\(r_p = d\\) and aphelion \\(r_a = 5d\\).</p>
<p>The semi-major axis \\(a_e\\) is:</p>
<p>$$ a_e = \\frac{r_p + r_a}{2} = \\frac{d + 5d}{2} = 3d $$</p>
<p>The eccentricity \\(e\\) is:</p>
<p>$$ e = \\frac{r_a - r_p}{r_a + r_p} = \\frac{5d - d}{5d + d} = \\frac{4}{6} = \\frac{2}{3} $$</p>
<p>The semi-latus rectum \\(p_e\\) is:</p>
<p>$$ p_e = a_e(1 - e^2) = 3d\\left(1 - \\frac{4}{9}\\right) = 3d\\left(\\frac{5}{9}\\right) = \\frac{5}{3}d $$</p>
<p>Knowing the mass of DDP is three times that of CJ (\\(m_{DDP} = 3m_{CJ}\\)), its angular momentum is:</p>
<p>$$ L_{DDP} = m_{DDP} \\sqrt{GM p_e} = 3m_{CJ} \\sqrt{\\frac{5}{3}GMd} $$</p>
<p><strong>Step 3: Calculate the Ratio</strong></p>
<p>To find the ratio of their angular momenta at intersection point B (or any point, as \\(L\\) is conserved):</p>
<p>$$ \\frac{L_{DDP}}{L_{CJ}} = \\frac{3m_{CJ} \\sqrt{\\frac{5}{3}GMd}}{m_{CJ} \\sqrt{2GMd}} = 3\\sqrt{\\frac{5}{6}} = \\sqrt{\\frac{45}{6}} = \\sqrt{7.5} \\approx 2.74 $$</p>`
    },
    {
        uniqueId: "q7_usaaao_2024",
        id: "Q7",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "7/10",
        title: "Rocket Periapsis from Orbital Area",
        description: `Arjun launches a 50 kg rocket with speed 10,405 m/s from the surface of the Earth and redirects it into a stable elliptical orbit. Upon analysis, he finds the area of the orbit to be \\(1.438 \\times 10^{15} \\text{ m}^2\\). What is the approximate distance between the periapsis of the orbit and the center of the Earth?`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Orbital energy, the vis-viva equation, and the geometric properties of an ellipse.</p>
<p><strong>Step 1: State Standard Parameters</strong></p>
<ul>
    <li>\\( \\mu = GM_\\oplus \\approx 3.986 \\times 10^{14} \\text{ m}^3\\text{s}^{-2} \\)</li>
    <li>\\( R_\\oplus \\approx 6.378 \\times 10^6 \\text{ m} \\)</li>
</ul>
<p><strong>Step 2: Specific Orbital Energy and Semi-Major Axis</strong></p>
<p>Calculate the specific orbital energy \\(\\epsilon\\) at launch:</p>
<p>$$ \\epsilon = \\frac{v_0^2}{2} - \\frac{\\mu}{R_\\oplus} $$</p>
<p>$$ \\epsilon \\approx \\frac{10405^2}{2} - \\frac{3.986 \\times 10^{14}}{6.378 \\times 10^6} \\approx 5.413 \\times 10^7 - 6.250 \\times 10^7 = -8.37 \\times 10^6 \\text{ J/kg} $$</p>
<p>Using the specific energy, find the semi-major axis \\(a\\):</p>
<p>$$ a = -\\frac{\\mu}{2\\epsilon} \\approx \\frac{3.986 \\times 10^{14}}{2 \\times 8.37 \\times 10^6} \\approx 2.38 \\times 10^7 \\text{ m} $$</p>
<p><strong>Step 3: Finding Geometric Components</strong></p>
<p>The area of an ellipse is \\(A = \\pi a b\\). Isolate the semi-minor axis \\(b\\):</p>
<p>$$ b = \\frac{A}{\\pi a} \\approx \\frac{1.438 \\times 10^{15}}{\\pi \\times 2.38 \\times 10^7} \\approx 1.92 \\times 10^7 \\text{ m} $$</p>
<p>Next, calculate the focal distance \\(c\\):</p>
<p>$$ c = \\sqrt{a^2 - b^2} = \\sqrt{(2.38 \\times 10^7)^2 - (1.92 \\times 10^7)^2} \\approx 1.41 \\times 10^7 \\text{ m} $$</p>
<p>The periapsis distance \\(r_p\\) (from the center of the Earth) is:</p>
<p>$$ r_p = a - c \\approx 2.38 \\times 10^7 - 1.41 \\times 10^7 = 9.7 \\times 10^6 \\text{ m} $$</p>`
    },
    {
        uniqueId: "q8_usaaao_2024",
        id: "Q8",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        title: "Orbital Velocity in a Uniform Disk",
        description: `The mass density of the Milky Way galaxy determines the orbital velocity of planets, stars, and other objects orbiting around its center. Assuming a constant surface mass density \\(\\sigma\\) for the Milky Way and modeling it as a perfect circular disk, identify the dependence of the circular orbital velocity \\(v(r)\\) of a point mass at radius \\(r\\) from the galaxy's center.<br><br>
(a) \\( 1/\\sqrt{r} \\) <br>
(b) \\( 1/r \\) <br>
(c) \\( \\sqrt{r} \\) <br>
(d) \\( r \\) <br>
(e) \\( r^{3/2} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Dimensional analysis and the mass distribution of a uniform disk.</p>
<p><strong>Solution:</strong></p>
<p>The mass enclosed within a radius \\(r\\) of a uniform disk with surface mass density \\(\\sigma\\) scales as \\(M_{enc} = \\pi r^2 \\sigma\\).</p>
<p>Using the standard approximation for circular orbital velocity \\(v(r) = \\sqrt{\\frac{GM_{enc}}{r}}\\), we substitute the enclosed mass:</p>
<p>$$ v(r) = \\sqrt{\\frac{G(\\pi r^2 \\sigma)}{r}} = \\sqrt{G \\pi \\sigma r} $$</p>
<p>Therefore, the velocity scales proportionally to the square root of the radius, \\(v(r) \\propto \\sqrt{r}\\).</p>
<p><em>(Note: A rigorous derivation for a finite disk yields an elliptical integral, but dimensional analysis confirms that because \\(G\\sigma\\) carries units of acceleration, we must have \\(v^2/r \\propto G\\sigma \\implies v \\propto \\sqrt{r}\\).)</em></p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2024",
        id: "Q13",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "7/10",
        title: "Binary Star Kinematics Snapshot",
        description: `Samvit observes a binary star system of masses \\(M_1\\) and \\(M_2\\). Unfortunately, the star with mass \\(M_2\\) is too dim for him to observe it, leading to the following snapshot below.<br><br>
<img src="assets/img/USAAAO_2024/Q13_USAAAO_2024.png" alt="Binary System Snapshot Diagram" style="max-width: 100%; border-radius: 2px; margin: 15px 0;"><br>
What could Samvit hypothesize to be the position and mass of the other star at this instant that would be consistent with the laws of physics and the orbit snapshot that he sees? To be clear, he has no knowledge of the value of \\(M_2\\) or the period of the binary system.<br><br>
(a) At \\(\\left(\\sqrt{a^2-b^2}, 0\\right)\\) with mass \\(M_1+M_2\\)<br>
(b) At \\((0,-b)\\) with mass \\(M_1\\)<br>
(c) At \\(\\left(\\sqrt{a^2-b^2}, 0\\right)\\) with mass \\(\\frac{M_1M_2}{M_1+M_2}\\)<br>
(d) At \\(\\left(-2\\sqrt{a^2-b^2}, -b\\right)\\) with mass \\(M_1\\)<br>
(e) At \\(\\left(\\frac{M_2}{M_1}\\sqrt{a^2-b^2}, 0\\right)\\) with mass \\(M_2\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Binary star systems orbit their common center of mass (barycenter). For a star orbiting the center of mass, the barycenter must be strictly located at one of the foci of its elliptical orbit.</p>
<p><strong>Solution:</strong></p>
<p>The snapshot shows the absolute orbit of \\(M_1\\) as an ellipse centered at \\((0,0)\\) with semi-major axis \\(a\\) and semi-minor axis \\(b\\). The foci of this ellipse are located at \\((\\pm c, 0)\\), where \\(c = \\sqrt{a^2 - b^2}\\).</p>
<p>Let's assume the center of mass is situated at the left focus, \\((-c, 0)\\).</p>
<p>The position vector of the center of mass is governed by:</p>
<p>$$ \\vec{R}_{CM} = \\frac{M_1 \\vec{r}_1 + M_2 \\vec{r}_2}{M_1 + M_2} = (-c, 0) $$</p>
<p>At the given instant, \\(M_1\\) is at \\((0, b)\\). We evaluate the given options to see which places the center of mass perfectly at the focus \\((-c, 0)\\).</p>
<p>Checking option (d): \\(M_2 = M_1\\) and \\(\\vec{r}_2 = (-2c, -b)\\).</p>
<p>$$ \\vec{R}_{CM} = \\frac{M_1(0, b) + M_1(-2c, -b)}{M_1 + M_1} = \\frac{(-2c, 0)}{2} = (-c, 0) $$</p>
<p>This perfectly aligns the system's center of mass with the focus of the ellipse. Therefore, \\(M_2\\) must have mass \\(M_1\\) and be located at \\((-2\\sqrt{a^2-b^2}, -b)\\).</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2024",
        id: "Q16",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        title: "Synodic Lunar Month",
        description: `Consider a sun-planet-moon system. The rotation period of the planet is 2 days. The period of revolution of the moon around the planet is 42 days while that of the planet around the sun is 420 days. What is the length of the lunar cycle as seen from the planet? You can assume the direction of planetary rotation, planetary revolution, and lunar revolution is the same.<br><br>
(a) 42.1 days <br>
(b) 44.3 days <br>
(c) 46.7 days <br>
(d) 50.5 days <br>
(e) 53.1 days`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Synodic period calculation. The length of a lunar cycle (the time between consecutive identical phases, such as full moons) is the synodic period of the moon.</p>
<p><strong>Solution:</strong></p>
<p>Let \\(T_m\\) be the sidereal period of the moon around the planet (\\(T_m = 42\\) days) and \\(T_p\\) be the sidereal period of the planet around the star (\\(T_p = 420\\) days).</p>
<p>Because both orbits are prograde (revolving in the same direction), the moon has to travel more than 360 degrees to realign with the sun and the planet. The governing relation for the synodic period \\(T_{syn}\\) is:</p>
<p>$$ \\frac{1}{T_{syn}} = \\frac{1}{T_m} - \\frac{1}{T_p} $$</p>
<p>Substituting the given values:</p>
<p>$$ \\frac{1}{T_{syn}} = \\frac{1}{42} - \\frac{1}{420} = \\frac{10}{420} - \\frac{1}{420} = \\frac{9}{420} $$</p>
<p>$$ T_{syn} = \\frac{420}{9} \\approx 46.667 \\text{ days} $$</p>
<p>This maps perfectly to option (c), 46.7 days.</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2024",
        id: "Q20",
        competition: "USAAAO",
        year: 2024,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Orbital Period Around a Cylindrical Planet",
        description: `<p>Imagine a very long cylindrical planet that has a satellite orbiting around it. Considering that the average density of the planet is \\(\\rho\\) and the radius is \\(R\\), find the expression that relates the period \\(P\\) of the satellite with its distance \\(d\\) to the center of the planet.</p>
<ul style="list-style-type: none; padding-left: 0;">
    <li>(a) \\( \\frac{2d}{R} \\sqrt{\\frac{2\\pi}{G\\rho}} \\)</li>
    <li>(b) \\( \\frac{d}{R} \\sqrt{\\frac{2\\pi}{G\\rho}} \\)</li>
    <li>(c) \\( \\frac{d}{2R} \\sqrt{\\frac{4\\pi}{G\\rho}} \\)</li>
    <li>(d) \\( \\frac{d}{R} \\sqrt{\\frac{4\\pi}{G\\rho}} \\)</li>
    <li>(e) \\( \\frac{d}{R} \\sqrt{\\frac{\\pi}{G\\rho}} \\)</li>
</ul>`,
        solutionHtml: `<img src="assets/img/USAAAO_2024/Q20_USAAAO_2024.png" alt="Solution Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Note: The solution relies on using Gauss's Law for gravity to find the field of an infinite cylinder, then setting it equal to the centripetal acceleration.</p>
<p><strong>Step 1: Gravitational Field of a Cylinder</strong></p>
<p>Using Gauss's Law for gravity (\\(\\oint g \\cdot dA = 4\\pi G M_{enc}\\)), we draw a Gaussian cylinder of radius \\(d\\) and length \\(L\\). The mass enclosed is \\(M_{enc} = \\rho \\cdot V = \\rho \\cdot \\pi R^2 L\\).</p>
<p>The flux is \\(g \\cdot 2\\pi d L\\). Equating the two:</p>
<p>$$ g \\cdot 2\\pi d L = 4\\pi G (\\rho \\pi R^2 L) $$</p>
<p>Solving for the gravitational field \\(g\\), we get:</p>
<p>$$ g = \\frac{2\\pi G \\rho R^2}{d} $$</p>
<p><strong>Step 2: Centripetal Acceleration</strong></p>
<p>For a circular orbit, the gravitational acceleration provides the centripetal acceleration. In terms of the orbital period \\(P\\):</p>
<p>$$ g = \\omega^2 d = \\left(\\frac{2\\pi}{P}\\right)^2 d = \\frac{4\\pi^2 d}{P^2} $$</p>
<p><strong>Step 3: Solve for Period (\\(P\\))</strong></p>
<p>Equate the two expressions for \\(g\\):</p>
<p>$$ \\frac{4\\pi^2 d}{P^2} = \\frac{2\\pi G \\rho R^2}{d} $$</p>
<p>$$ P^2 = \\frac{4\\pi^2 d^2}{2\\pi G \\rho R^2} $$</p>
<p>$$ P^2 = \\frac{2\\pi d^2}{G \\rho R^2} $$</p>
<p>Taking the square root gives the final expression:</p>
<p>$$ P = \\frac{d}{R} \\sqrt{\\frac{2\\pi}{G\\rho}} $$</p>
<p><strong>Answer: (b)</strong></p>`
    }
];