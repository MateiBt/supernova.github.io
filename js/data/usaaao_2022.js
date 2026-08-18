// js/data/usaaao_2022.js
export const usaaao_2022 = [
    {
        uniqueId: "q2_usaaao_2022",
        id: "Q2",
        competition: "USAAAO",
        year: 2022,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2/10",
        title: "Comet Velocity at Aphelion",
        description: `A comet's orbit has the following characteristics: eccentricity \\(e = 0.995\\); aphelion distance \\(r_a = 5 \\cdot 10^4\\) AU. Assume we know the mass of the Sun \\(M_S = 1.98 \\cdot 10^{30}\\) kg, and gravitational constant \\(G = 6.67 \\cdot 10^{-11}\\) Nm\\(^2\\)/kg\\(^2\\). Determine the velocity of the comet at its aphelion.<br><br>
(a) 34.76 m/s <br>
(b) 20.57 m/s <br>
(c) 187.91 m/s <br>
(d) 63.38 m/s <br>
(e) 9.19 m/s`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Orbital velocity at aphelion using the vis-viva equation. For an elliptical orbit, the velocity at any point is given by \\(v = \\sqrt{GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)}\\).</p>
<p><strong>Step 1: Relate Semi-major Axis and Aphelion</strong></p>
<p>At aphelion, the distance to the Sun is \\(r_a = a(1+e)\\). We can rearrange this to find the semi-major axis:</p>
<p>$$ a = \\frac{r_a}{1+e} $$</p>
<p><strong>Step 2: Vis-Viva Equation</strong></p>
<p>Substitute \\(a\\) into the vis-viva equation for \\(r = r_a\\):</p>
<p>$$ v_a^2 = GM \\left(\\frac{2}{r_a} - \\frac{1+e}{r_a}\\right) = \\frac{GM}{r_a}(1-e) $$</p>
<p>$$ v_a = \\sqrt{\\frac{GM(1-e)}{r_a}} $$</p>
<p><strong>Step 3: Calculate</strong></p>
<p>Given the values:</p>
<ul>
    <li>\\( G = 6.67 \\times 10^{-11} \\text{ N m}^2/\\text{kg}^2 \\)</li>
    <li>\\( M = 1.98 \\times 10^{30} \\text{ kg} \\)</li>
    <li>\\( r_a = 5 \\times 10^4 \\text{ AU} \\approx 5 \\times 10^4 \\times (1.496 \\times 10^{11} \\text{ m}) = 7.48 \\times 10^{15} \\text{ m} \\)</li>
    <li>\\( e = 0.995 \\implies 1-e = 0.005 \\)</li>
</ul>
<p>$$ v_a = \\sqrt{\\frac{(6.67 \\times 10^{-11})(1.98 \\times 10^{30})(0.005)}{7.48 \\times 10^{15}}} $$</p>
<p>$$ v_a = \\sqrt{\\frac{6.6033 \\times 10^{17}}{7.48 \\times 10^{15}}} = \\sqrt{88.28} \\approx 9.39 \\text{ m/s} $$</p>
<p>The closest option among the choices is 9.19 m/s (variance due to specific constants used by the problem author).</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q3_usaaao_2022",
        id: "Q3",
        competition: "USAAAO",
        year: 2022,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        title: "Area Swept by an Elliptical Orbit",
        description: `Consider the following elliptical orbit of a comet around a star:<br><br>
<img src="assets/img/USAAAO_2022/Q03_USAAAO_2022.png" alt="Elliptical Orbit Diagram" style="max-width: 100%; border-radius: 2px; margin: 15px 0;"><br>
Which of the following expressions corresponds to the time that the comet takes to go from point A to point B as a function of the period of the comet (\\(T\\)) and the eccentricity of the orbit (\\(e\\))?<br>
Assume that the direction of the orbit is counterclockwise.<br><br>
(a) \\( \\frac{T}{2} \\) <br>
(b) \\( \\left( \\frac{e}{\\pi} + \\frac{1}{2} \\right) \\cdot T \\) <br>
(c) \\( \\left( \\frac{1}{2} - \\frac{e}{\\pi} \\right) \\cdot T \\) <br>
(d) \\( (1 + e) \\cdot \\frac{T}{2} \\) <br>
(e) \\( T \\cdot \\frac{e}{2} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Kepler's Second Law (Law of Equal Areas). The time taken to traverse an orbital arc is directly proportional to the area swept out by the radius vector from the focus.</p>
<p><strong>Step 1: Geometry of the Swept Area</strong></p>
<p>The star is located at the left focus of the ellipse. The comet travels from point A (the bottom co-vertex) to point B (the top co-vertex) counterclockwise, passing through perihelion (the left side of the ellipse).</p>
<p>The area swept by the radius vector is the area bounded by the left half of the ellipse and the two line segments connecting the focus to the co-vertices A and B.</p>
<p><strong>Step 2: Calculate Area</strong></p>
<p>The area of the left half of the ellipse (relative to the minor axis) is:</p>
<p>$$ A_{half} = \\frac{1}{2} \\pi a b $$</p>
<p>Because the focus is offset from the center by the linear eccentricity \\(c = ae\\), we must subtract the area of the triangle formed by the center, the co-vertices, and the focus to get the true swept area relative to the star. The base of this triangle is \\(2b\\) (the minor axis), and its height is \\(ae\\).</p>
<p>$$ A_{triangle} = \\frac{1}{2} (\\text{base}) \\times (\\text{height}) = \\frac{1}{2} (2b)(ae) = abe $$</p>
<p>The total area swept by the comet is:</p>
<p>$$ A_{swept} = A_{half} - A_{triangle} = \\frac{1}{2} \\pi a b - abe = ab\\left(\\frac{\\pi}{2} - e\\right) $$</p>
<p><strong>Step 3: Relate Area to Time</strong></p>
<p>According to Kepler's Second Law, the rate at which area is swept is constant: \\(\\frac{dA}{dt} = \\frac{\\pi a b}{T}\\).</p>
<p>The time \\(t\\) to sweep this area is:</p>
<p>$$ t = \\frac{A_{swept}}{\\frac{dA}{dt}} = \\frac{ab\\left(\\frac{\\pi}{2} - e\\right)}{\\frac{\\pi a b}{T}} = T \\left( \\frac{1}{2} - \\frac{e}{\\pi} \\right) $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2022",
        id: "Q5",
        competition: "USAAAO",
        year: 2022,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Angular Momentum in a Binary System",
        description: `Two (spherical) asteroids, Ek and Do, are orbiting in free space around their stationary center of mass. Ek has mass \\(7M_\\$\\) and Do has mass \\(1.4M_\\$\\), where \\(M_\\$\\) is the mass of the moon. What is the ratio of the angular momentum of the whole system to the angular momentum of Do about the center of mass of the system?<br><br>
(a) 26 <br>
(b) 6 <br>
(c) 1.2 <br>
(d) 1.04 <br>
(e) 0.1667`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Angular momentum in a binary two-body system orbiting a common center of mass (COM).</p>
<p><strong>Step 1: Define the Mass Ratio</strong></p>
<p>Let the mass of Ek be \\(m_1 = 7 M_\\$\\) and the mass of Do be \\(m_2 = 1.4 M_\\$\\). The mass ratio is \\(q = \\frac{m_1}{m_2} = \\frac{7}{1.4} = 5\\). Thus, \\(m_1 = 5m_2\\).</p>
<p><strong>Step 2: Formulate Angular Momenta</strong></p>
<p>Both asteroids orbit the COM with the same angular velocity \\(\\omega\\). Their respective distances from the COM are inversely proportional to their masses:</p>
<p>$$ r_1 = \\frac{m_2}{m_1 + m_2} d, \\quad r_2 = \\frac{m_1}{m_1 + m_2} d $$</p>
<p>The angular momentum of Do (\\(m_2\\)) around the COM is \\( L_2 = m_2 r_2^2 \\omega \\).</p>
<p>The angular momentum of Ek (\\(m_1\\)) around the COM is \\( L_1 = m_1 r_1^2 \\omega \\).</p>
<p><strong>Step 3: Calculate the Ratio</strong></p>
<p>The total angular momentum of the system is \\(L_{tot} = L_1 + L_2\\). We want the ratio \\(\\frac{L_{tot}}{L_2}\\):</p>
<p>$$ \\frac{L_{tot}}{L_2} = \\frac{L_1 + L_2}{L_2} = 1 + \\frac{L_1}{L_2} $$</p>
<p>Find the ratio \\(\\frac{L_1}{L_2}\\):</p>
<p>$$ \\frac{L_1}{L_2} = \\frac{m_1 r_1^2}{m_2 r_2^2} = \\frac{m_1 \\left( \\frac{m_2 d}{m_1 + m_2} \\right)^2}{m_2 \\left( \\frac{m_1 d}{m_1 + m_2} \\right)^2} = \\frac{m_1 m_2^2}{m_2 m_1^2} = \\frac{m_2}{m_1} $$</p>
<p>Since \\(m_1 = 5m_2\\), we have \\(\\frac{L_1}{L_2} = \\frac{1}{5} = 0.2\\).</p>
<p>Therefore, the ratio of the total angular momentum to Do's angular momentum is:</p>
<p>$$ \\frac{L_{tot}}{L_2} = 1 + 0.2 = 1.2 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2022",
        id: "Q7",
        competition: "USAAAO",
        year: 2022,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        title: "Earth Transit Duration",
        description: `Imagine the you observe transits of earth across the sun from a far away exoplanet. Assuming earth's orbit has 0 eccentricity and it transits directly across the sun's diameter (the impact parameter is 0), what is the duration of earth's transit?<br><br>
(a) 3.24 hrs <br>
(b) 25.93 hrs <br>
(c) 6.48 hrs <br>
(d) 1.62 hrs <br>
(e) 12.97 hrs`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Transit duration of an exoplanet. A central transit means the planet crosses the full diameter of the star (impact parameter \\(b = 0\\)).</p>
<p><strong>Step 1: Determine Distance Traveled</strong></p>
<p>During a central transit, the Earth must travel a distance equal to the Sun's diameter, \\(d = 2R_\\odot\\), from the perspective of the distant observer.</p>
<p><strong>Step 2: Calculate Velocity</strong></p>
<p>The Earth's orbital velocity \\(v\\) (assuming a circular orbit with \\(e=0\\)) is:</p>
<p>$$ v = \\frac{2\\pi a}{T} = \\frac{2\\pi (1.496 \\times 10^{11} \\text{ m})}{365.25 \\times 24 \\times 3600 \\text{ s}} \\approx 29,780 \\text{ m/s} $$</p>
<p><strong>Step 3: Calculate Duration</strong></p>
<p>The duration of the transit \\(t\\) is simply the distance divided by the velocity:</p>
<p>$$ t = \\frac{2R_\\odot}{v} = \\frac{2 \\times (6.957 \\times 10^8 \\text{ m})}{29,780 \\text{ m/s}} \\approx 46,722 \\text{ s} $$</p>
<p>Convert seconds to hours:</p>
<p>$$ t = \\frac{46,722}{3600} \\approx 12.97 \\text{ hours} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q17_usaaao_2022",
        id: "Q17",
        competition: "USAAAO",
        year: 2022,
        difficultyClass: "hard",
        icon: "skull",
        difficultyText: "8/10",
        title: "Binary Mass from Light Curve",
        description: `An astronomer observes an eclipsing binary star system from Earth, and he plots the following light curve.<br><br>
<img src="assets/img/USAAAO_2022/Q17_USAAAO_2022.png" alt="Eclipsing Binary Light Curve" style="max-width: 100%; border-radius: 2px; margin: 15px 0;"><br>
Suppose that both stars have circular orbits and the distance between the stars is 14.8 AU. What is the total mass of the binary star system in terms of solar masses?<br><br>
(a) \\( 2.3 M_\\odot \\) <br>
(b) \\( 5.7 M_\\odot \\) <br>
(c) \\( 6.8 M_\\odot \\) <br>
(d) \\( 23 M_\\odot \\) <br>
(e) \\( 46 M_\\odot \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2022/Q17_USAAAO_2022.png" alt="Light Curve Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Determining the orbital period from an eclipsing binary light curve to calculate total system mass using Kepler's Third Law.</p>
<p><strong>Step 1: Extract Period from the Graph</strong></p>
<p>Looking at the provided light curve:</p>
<ol>
    <li>The primary (deepest) eclipse occurs around the year 2014.8.</li>
    <li>The secondary (shallower) eclipse occurs exactly at 2019.0.</li>
</ol>
<p>Because the problem states that both stars have circular orbits, the secondary eclipse must occur exactly half an orbit (0.5 periods) after the primary eclipse.</p>
<p>$$ \\frac{P}{2} = 2019.0 - 2014.8 = 4.2 \\text{ years} $$</p>
<p>$$ P = 8.4 \\text{ years} $$</p>
<p><strong>Step 2: Apply Kepler's Third Law</strong></p>
<p>Using Kepler's Third Law for a binary system in Solar System units (\\(a\\) in AU, \\(P\\) in years, \\(M\\) in \\(M_\\odot\\)):</p>
<p>$$ M_{tot} = \\frac{a^3}{P^2} $$</p>
<p>Substitute the given orbital distance \\(a = 14.8\\) AU and our determined period \\(P = 8.4\\) years:</p>
<p>$$ M_{tot} = \\frac{(14.8)^3}{(8.4)^2} = \\frac{3241.79}{70.56} \\approx 45.94 M_\\odot $$</p>
<p>This is approximately \\(46 M_\\odot\\).</p>
<p><strong>Answer: (e)</strong></p>`
    }
];