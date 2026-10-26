// js/data/usaaao_2022.js
export const usaaao_2022 = [
    {
        uniqueId: "q1_usaaao_2022",
        id: "Q1",
        competition: "USAAAO",
        year: 2022,
        module: "T11",
        moduleName: "Galactic Evolution and Active Galaxies",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "1.1 / 10.0",
        title: "Hubble Galaxy Classification",
        description: `Classify the following galaxies according to the Hubble galaxies classification:<br><br>
<img src="../assets/img/USAAAO_2022/Q01_1_USAAAO_2022.jpeg" alt="Figure 1: Galaxy 1" class="user-diagram" onclick="window.openImageModal(this)"><br>
<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Figure 1: Galaxy 1</div>
<img src="../assets/img/USAAAO_2022/Q01_2_USAAAO_2022.jpeg" alt="Figure 2: Galaxy 2" class="user-diagram" onclick="window.openImageModal(this)"><br>
<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Figure 2: Galaxy 2</div>
<img src="../assets/img/USAAAO_2022/Q01_3_USAAAO_2022.jpeg" alt="Figure 3: Galaxy 3" class="user-diagram" onclick="window.openImageModal(this)"><br>
<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Figure 3: Galaxy 3</div>
<img src="../assets/img/USAAAO_2022/Q01_4_USAAAO_2022.jpeg" alt="Figure 4: Galaxy 4" class="user-diagram" onclick="window.openImageModal(this)"><br>
<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">Figure 4: Galaxy 4</div>
<img src="../assets/img/USAAAO_2022/Q01_5_USAAAO_2022.jpeg" alt="Figure 5: Galaxy 5" class="user-diagram" onclick="window.openImageModal(this)"><br>
<div style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">Figure 5: Galaxy 5</div>
(a) Sb, Sc, Peculiar, E2, Irregular <br>
(b) Sbc, E4, Irregular, Sb, Peculiar <br>
(c) E3, Sbc, Sa, Peculiar, Irregular <br>
(d) Sc, Sba, Sbc, E2, Peculiar <br>
(e) Sa, Sbb, E3, Irregular, Peculiar`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Morphological galaxy classification along the Hubble tuning-fork diagram based on bulge-to-disk ratio, spiral arm pitch angle, central bars, ellipticity, and tidal distortion.</p>
<p><strong>Step-by-Step Morphological Breakdown:</strong></p>
<ul>
    <li><strong>Galaxy 1 (NGC 488):</strong> Displays a dominant, luminous central bulge with very tightly wound, smooth spiral arms and no central bar, characteristic of an early-type spiral <strong>Sa</strong>.</li>
    <li><strong>Galaxy 2 (NGC 1365):</strong> Exhibits a prominent central stellar bar cutting across the nucleus with two moderately wound spiral arms emerging from the ends of the bar, classifying it as a barred spiral <strong>SBb</strong> (written as <em>Sbb</em> in the exam choices).</li>
    <li><strong>Galaxy 3 (Elliptical):</strong> Smooth, featureless spheroidal light distribution with no spiral disk and an apparent axial ratio \\(b/a \\approx 0.7\\), giving an elliptical class \\(n = 10(1 - b/a) \\approx 3 \\implies\\) <strong>E3</strong>.</li>
    <li><strong>Galaxy 4 (NGC 1427A):</strong> Lacks both rotational symmetry and a central nucleus, showing patchy blue star-forming clumps typical of an <strong>Irregular</strong> galaxy.</li>
    <li><strong>Galaxy 5 (NGC 1316 / Fornax A):</strong> Displays chaotic dust lanes, tidal shells, and asymmetric loops from a recent galactic merger, classifying it as a <strong>Peculiar</strong> galaxy.</li>
</ul>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q2_usaaao_2022",
        id: "Q2",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Comet Velocity at Aphelion",
        description: `A comet's orbit has the following characteristics: eccentricity \\(e = 0.995\\); aphelion distance \\(r_a = 5 \\cdot 10^4\\) AU. Assume we know the mass of the Sun \\(M_S = 1.98 \\cdot 10^{30}\\) kg, and gravitational constant \\(G = 6.67 \\cdot 10^{-11}\\) Nm\\(^2\\)/kg\\(^2\\). Determine the velocity of the comet at its aphelion.<br><br>
(a) 34.76 m/s <br>
(b) 20.57 m/s <br>
(c) 187.91 m/s <br>
(d) 63.38 m/s <br>
(e) 9.19 m/s`,
        solutionHtml: `<img src="../assets/img/USAAAO_2022/Q02_USAAAO_2022.jpeg" alt="Comet Velocity at Aphelion Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -12px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Orbital velocity at aphelion using the vis-viva equation. For an elliptical orbit, the velocity at any point is given by \\(v = \\sqrt{GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)}\\).</p>
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
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Area Swept by an Elliptical Orbit",
        description: `Consider the following elliptical orbit of a comet around a star:<br><br>
<img src="../assets/img/USAAAO_2022/Q03_USAAAO_2022.jpeg" alt="Elliptical Orbit Diagram" class="user-diagram" onclick="window.openImageModal(this)"><br>
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
        uniqueId: "q4_usaaao_2022",
        id: "Q4",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.2 / 10.0",
        title: "Terrestrial Great-Circle Geodesic Distance",
        description: `What is the shortest distance (along the surface of the Earth) between two points on the Equator separated by \\(30^\\circ\\) of longitude? What is the shortest distance (along the surface of the Earth) between them if both the two points lie on the \\(60^\\circ\\) latitude while still separated by \\(30^\\circ\\) of longitude? (For simplicity, assume that the Earth is a sphere)<br><br>
(a) 3336 km, 1668 km <br>
(b) 3336 km, 1654 km <br>
(c) 6672 km, 3336 km <br>
(d) 3298 km, 1649 km <br>
(e) 3298 km, 1668 km`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spherical trigonometry and great-circle geodesics on a sphere of radius \\(R_\\oplus = 6371\\text{ km}\\).</p>
<p><strong>Step 1: Distance Along the Equator (\\(\\phi = 0^\\circ\\))</strong></p>
<p>The Equator is itself a great circle. For an angular separation of \\(\\Delta\\lambda = 30^\\circ = \\frac{\\pi}{6}\\text{ rad}\\), the shortest surface distance is:</p>
<p>$$ d_1 = R_\\oplus \\Delta\\lambda = 6371\\text{ km} \\times \\frac{\\pi}{6} \\approx 3335.85\\text{ km} \\approx 3336\\text{ km} $$</p>
<p><strong>Step 2: Great-Circle Distance at Latitude \\(\\phi = 60^\\circ\\)</strong></p>
<p>The parallel of latitude at \\(\\phi = 60^\\circ\\) is a small circle (which would give \\(d_{\\text{parallel}} = 3336 \\cos 60^\\circ = 1668\\text{ km}\\)), whereas the <em>shortest</em> surface path is the great-circle arc \\(\\theta\\) connecting the two points. Using the spherical law of cosines with colatitudes \\(90^\\circ - \\phi = 30^\\circ\\):</p>
<p>$$ \\cos\\theta = \\sin^2\\phi + \\cos^2\\phi \\cos(\\Delta\\lambda) = \\sin^2(60^\\circ) + \\cos^2(60^\\circ)\\cos(30^\\circ) $$</p>
<p>$$ \\cos\\theta = 0.75 + 0.25 \\left(\\frac{\\sqrt{3}}{2}\\right) \\approx 0.966506 \\implies \\theta \\approx 0.259555\\text{ rad} \\ (14.87^\\circ) $$</p>
<p>Multiplying by Earth's radius gives the true geodesic distance:</p>
<p>$$ d_2 = R_\\oplus \\theta = 6371\\text{ km} \\times 0.259555 \\approx 1653.6\\text{ km} \\approx 1654\\text{ km} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2022",
        id: "Q5",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.7 / 10.0",
        title: "Angular Momentum in a Binary System",
        description: `Two (spherical) asteroids, Ek and Do, are orbiting in free space around their stationary center of mass. Ek has mass \\(7M_{\\text{Moon}}\\) and Do has mass \\(1.4M_{\\text{Moon}}\\), where \\(M_{\\text{Moon}}\\) is the mass of the Moon. What is the ratio of the angular momentum of the whole system to the angular momentum of Do about the center of mass of the system?<br><br>
(a) 26 <br>
(b) 6 <br>
(c) 1.2 <br>
(d) 1.04 <br>
(e) 0.1667`,
        solutionHtml: `<img src="../assets/img/USAAAO_2022/Q05_USAAAO_2022.jpeg" alt="Binary Asteroid Angular Momentum Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -12px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Angular momentum in a binary two-body system orbiting a common center of mass (COM).</p>
<p><strong>Step 1: Define the Mass Ratio</strong></p>
<p>Let the mass of Ek be \\(m_1 = 7 M_{\\text{Moon}}\\) and the mass of Do be \\(m_2 = 1.4 M_{\\text{Moon}}\\). The mass ratio is \\(q = \\frac{m_1}{m_2} = \\frac{7}{1.4} = 5\\). Thus, \\(m_1 = 5m_2\\).</p>
<p><strong>Step 2: Formulate Angular Momenta</strong></p>
<p>Both asteroids orbit the COM with the same angular velocity \\(\\omega\\). Their respective distances from the COM are inversely proportional to their masses:</p>
<p>$$ r_1 = \\frac{m_2}{m_1 + m_2} d, \\quad r_2 = \\frac{m_1}{m_1 + m_2} d $$</p>
<p>The angular momentum of Do (\\(m_2\\)) around the COM is \\( L_2 = m_2 r_2^2 \\omega \\).</p>
<p>The angular momentum of Ek (\\(m_1\\)) around the COM is \\( L_1 = m_1 r_1^2 \\omega \\).</p>
<p><strong>Step 3: Calculate the Ratio</strong></p>
<p>The total angular momentum of the system is \\(L_{tot} = L_1 + L_2\\). We want the ratio \\(\\frac{L_{tot}}{L_2}\\):</p>
<p>$$ \\frac{L_{tot}}{L_2} = \\frac{L_1 + L_2}{L_2} = 1 + \\frac{L_1}{L_2} $$</p>
<p>Find the ratio \\(\\frac{L_1}{L_2}\\):</p>
<p>$$ \\frac{L_1}{L_2} = \\frac{m_1 r_1^2}{m_2 r_2^2} = \\frac{m_1 \\left( \\frac{m_2 d}{m_1 + m_2} \\right)^2}{m_2 \\left( \\frac{m_1 d}{m_1 + m_2} \\right)^2} = \\frac{m_1 m_2^2}{m_2 m_1^2} = \\frac{m_2}{m_1} = \\frac{1}{5} = 0.2 $$</p>
<p>Therefore, the ratio of the total angular momentum to Do's angular momentum is:</p>
<p>$$ \\frac{L_{tot}}{L_2} = 1 + 0.2 = 1.2 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q6_usaaao_2022",
        id: "Q6",
        competition: "USAAAO",
        year: 2022,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Diffraction-Limited Resolution of an Open Cluster",
        description: `Consider an \\(f/9\\) telescope with focal length \\(f = 1.0\\text{ m}\\) that operates at visible wavelength \\(\\lambda = 5000\\text{ \\AA}\\). What is the farthest distance at which an open cluster of radius \\(R_C = 4.1\\text{ pc}\\) can be resolved by this telescope?<br><br>
(a) \\(1.2 \\times 10^6\\text{ pc}\\) <br>
(b) \\(1.5 \\times 10^6\\text{ pc}\\) <br>
(c) \\(3.0 \\times 10^6\\text{ pc}\\) <br>
(d) \\(4.2 \\times 10^6\\text{ pc}\\) <br>
(e) \\(5.8 \\times 10^6\\text{ pc}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Rayleigh diffraction limit \\(\\theta = 1.22 \\frac{\\lambda}{D}\\) and small-angle relationship between linear diameter and distance.</p>
<p><strong>Step 1: Determine Telescope Aperture Diameter</strong></p>
<p>Given a focal length \\(f = 1.0\\text{ m}\\) and focal ratio \\(f/D = 9\\), the primary aperture diameter is:</p>
<p>$$ D = \\frac{f}{9} = \\frac{1.0\\text{ m}}{9} \\approx 0.1111\\text{ m} $$</p>
<p><strong>Step 2: Calculate Angular Resolution</strong></p>
<p>Using the Rayleigh criterion at \\(\\lambda = 5000\\text{ \\AA} = 5.0 \\times 10^{-7}\\text{ m}\\):</p>
<p>$$ \\theta = 1.22 \\frac{\\lambda}{D} = 1.22 \\times \\frac{5.0 \\times 10^{-7}\\text{ m}}{(1/9)\\text{ m}} = 5.49 \\times 10^{-6}\\text{ rad} $$</p>
<p><strong>Step 3: Solve for Maximum Distance</strong></p>
<p>The linear diameter of the open cluster is \\(2R_C = 2 \\times 4.1\\text{ pc} = 8.2\\text{ pc}\\). Setting the angular diameter equal to the diffraction limit \\(\\theta = \\frac{2R_C}{d}\\):</p>
<p>$$ d = \\frac{2R_C}{\\theta} = \\frac{8.2\\text{ pc}}{5.49 \\times 10^{-6}\\text{ rad}} \\approx 1.494 \\times 10^6\\text{ pc} \\approx 1.5 \\times 10^6\\text{ pc} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2022",
        id: "Q7",
        competition: "USAAAO",
        year: 2022,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Earth Transit Duration",
        description: `Imagine that you observe transits of Earth across the Sun from a far away exoplanet. Assuming Earth's orbit has 0 eccentricity and it transits directly across the Sun's diameter (the impact parameter is 0), what is the duration of Earth's transit?<br><br>
(a) 3.24 hrs <br>
(b) 25.93 hrs <br>
(c) 6.48 hrs <br>
(d) 1.62 hrs <br>
(e) 12.97 hrs`,
        solutionHtml: `<img src="../assets/img/USAAAO_2022/Q07_USAAAO_2022.jpeg" alt="Earth Transit Duration Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -12px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Transit duration of an exoplanet. A central transit means the planet crosses the full diameter of the star (impact parameter \\(b = 0\\)).</p>
<p><strong>Step 1: Determine Distance Traveled</strong></p>
<p>During a central transit, the Earth must travel a distance equal to the Sun's diameter, \\(d = 2R_\\odot\\), from the perspective of the distant observer.</p>
<p><strong>Step 2: Calculate Velocity</strong></p>
<p>The Earth's orbital velocity \\(v\\) (assuming a circular orbit with \\(e=0\\)) is:</p>
<p>$$ v = \\frac{2\\pi a}{T} = \\frac{2\\pi (1.496 \\times 10^{11} \\text{ m})}{365.25 \\times 24 \\times 3600 \\text{ s}} \\approx 29,780 \\text{ m/s} $$</p>
<p><strong>Step 3: Calculate Duration</strong></p>
<p>The duration of the transit \\(t\\) is simply the distance divided by the velocity:</p>
<p>$$ t = \\frac{2R_\\odot}{v} = \\frac{2 \\times (6.957 \\times 10^8 \\text{ m})}{29,780 \\text{ m/s}} \\approx 46,722 \\text{ s} \\approx 12.97 \\text{ hours} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q8_usaaao_2022",
        id: "Q8",
        competition: "USAAAO",
        year: 2022,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Apparent Magnitude Drop During Exoplanet Transit",
        description: `An exoplanet was observed during its transit across the surface of a bright star. Estimate the variation of the apparent magnitude (\\(\\Delta m\\)) of the star caused by the exoplanet's transit. During the transit, assume an Earth-based astronomer observes that the area covered by the exoplanet on the projected surface of the star represents \\(\\eta = 2\\%\\) of the star's projected surface.<br><br>
(a) \\(-4.247\\) <br>
(b) \\(0.003\\) <br>
(c) \\(0.022\\) <br>
(d) \\(0.679\\) <br>
(e) \\(-0.003\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Pogson's magnitude-flux relation \\(\\Delta m = -2.5 \\log_{10}(F / F_0)\\) applied to exoplanet transit photometry.</p>
<p><strong>Step 1: Relate Blocked Area to Observed Flux</strong></p>
<p>Assuming uniform stellar surface brightness, blocking a fraction \\(\\eta = 0.02\\) of the stellar disk reduces the received flux from \\(F_0\\) to:</p>
<p>$$ F = (1 - \\eta) F_0 = 0.98 F_0 $$</p>
<p><strong>Step 2: Compute the Magnitude Variation</strong></p>
<p>Applying Pogson's formula:</p>
<p>$$ \\Delta m = m_{\\text{transit}} - m_0 = -2.5 \\log_{10}\\left(\\frac{F}{F_0}\\right) = -2.5 \\log_{10}(0.98) \\approx -2.5 \\times (-0.008774) \\approx +0.022 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2022",
        id: "Q9",
        competition: "USAAAO",
        year: 2022,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.1 / 10.0",
        title: "Virial Mass of a Globular Cluster",
        description: `Estimate the mass of a globular cluster with a radial velocity dispersion \\(\\sigma_r = 16.2\\text{ km/s}\\). The cluster has an angular diameter of \\(\\theta = 3.56'\\) and is a distance \\(d = 9630\\text{ pc}\\) away from us.<br><br>
(a) \\(6.05 \\times 10^{35}\\text{ kg}\\) <br>
(b) \\(9.71 \\times 10^{35}\\text{ kg}\\) <br>
(c) \\(1.01 \\times 10^{36}\\text{ kg}\\) <br>
(d) \\(3.03 \\times 10^{36}\\text{ kg}\\) <br>
(e) \\(5.96 \\times 10^{36}\\text{ kg}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Virial theorem \\(2K + U = 0\\) for a self-gravitating spherical stellar system with isotropic 3D velocity dispersion \\(\\langle v^2 \\rangle = 3\\sigma_r^2\\).</p>
<p><strong>Step 1: Calculate the Physical Radius of the Cluster</strong></p>
<p>Converting the angular diameter \\(\\theta = 3.56'\\) to radians:</p>
<p>$$ \\theta = \\frac{3.56}{60} \\times \\frac{\\pi}{180}\\text{ rad} \\approx 1.0356 \\times 10^{-3}\\text{ rad} $$</p>
<p>The physical radius \\(R = \\frac{1}{2} d \\theta\\) of the cluster is:</p>
<p>$$ R = \\frac{1}{2} (9630\\text{ pc})(1.0356 \\times 10^{-3}\\text{ rad}) \\approx 4.986\\text{ pc} \\approx 1.539 \\times 10^{17}\\text{ m} $$</p>
<p><strong>Step 2: Apply the Virial Theorem</strong></p>
<p>For a uniform sphere of mass \\(M\\) and radius \\(R\\), the gravitational potential energy is \\(U = -\\frac{3}{5}\\frac{GM^2}{R}\\) and the total kinetic energy is \\(K = \\frac{1}{2}M\\langle v^2 \\rangle = \\frac{3}{2}M\\sigma_r^2\\). By the virial theorem \\(2K + U = 0\\):</p>
<p>$$ 3M\\sigma_r^2 = \\frac{3}{5}\\frac{GM^2}{R} \\implies M = \\frac{5 R \\sigma_r^2}{G} $$</p>
<p>Substituting \\(\\sigma_r = 1.62 \\times 10^4\\text{ m/s}\\) and \\(G = 6.674 \\times 10^{-11}\\text{ m}^3\\text{ kg}^{-1}\\text{ s}^{-2}\\):</p>
<p>$$ M = \\frac{5 (1.539 \\times 10^{17}\\text{ m})(1.62 \\times 10^4\\text{ m/s})^2}{6.674 \\times 10^{-11}} \\approx 3.03 \\times 10^{36}\\text{ kg} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2022",
        id: "Q10",
        competition: "USAAAO",
        year: 2022,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Atmospheric Scale Height of Jupiter",
        description: `Jupiter's deep atmosphere is very warm due to convection leading to an adiabatic temperature profile that increases with increasing pressure. Assuming (for simplicity) that this outer layer of Jupiter has a temperature of \\(500\\text{ K}\\), perform a back-of-the-envelope estimate of the characteristic thickness (or e-folding scale) of the envelope of Jupiter (you may find that this is independent of pressure level). You may further use that the specific gas constant in Jupiter's atmosphere is \\(3600\\text{ J kg}^{-1}\\text{ K}^{-1}\\).<br><br>
(a) 20 km <br>
(b) 73 km <br>
(c) 568 km <br>
(d) 3,120 km <br>
(e) 10,233 km`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Hydrostatic equilibrium and the isothermal atmospheric pressure scale height \\(H = \\frac{R_{\\text{spec}} T}{g}\\).</p>
<p><strong>Step 1: Compute Jupiter's Surface Gravity</strong></p>
<p>Using Jupiter's mass \\(M_J \\approx 1.898 \\times 10^{27}\\text{ kg}\\) and mean radius \\(R_J \\approx 6.991 \\times 10^7\\text{ m}\\):</p>
<p>$$ g_J = \\frac{GM_J}{R_J^2} = \\frac{(6.674 \\times 10^{-11})(1.898 \\times 10^{27})}{(6.991 \\times 10^7)^2} \\approx 25.9\\text{ m/s}^2 \\quad (\\text{or } 24.79\\text{ m/s}^2 \\text{ at 1 bar}) $$</p>
<p><strong>Step 2: Evaluate the Scale Height</strong></p>
<p>From hydrostatic balance \\(\\frac{dP}{dz} = -\\rho g = -\\frac{P g}{R_{\\text{spec}} T}\\), the characteristic e-folding thickness is:</p>
<p>$$ H = \\frac{R_{\\text{spec}} T}{g_J} = \\frac{(3600\\text{ J kg}^{-1}\\text{ K}^{-1})(500\\text{ K})}{24.79\\text{ m/s}^2} \\approx 7.26 \\times 10^4\\text{ m} \\approx 73\\text{ km} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q11_usaaao_2022",
        id: "Q11",
        competition: "USAAAO",
        year: 2022,
        module: "O1",
        moduleName: "Blind Map & Sky Charts",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.0 / 10.0",
        title: "Observer Latitude from Night Sky Field",
        description: `An astronomer took the following picture while observing the night sky:<br><br>
<img src="../assets/img/USAAAO_2022/Q11_USAAAO_2022.jpeg" alt="Night Sky Horizon Field" class="user-diagram" onclick="window.openImageModal(this)"><br>
What is the latitude of the place where the astronomer took the picture?<br><br>
(a) \\(70^\\circ\\text{ S}\\) <br>
(b) \\(20^\\circ\\text{ S}\\) <br>
(c) \\(2^\\circ\\text{ N}\\) <br>
(d) \\(20^\\circ\\text{ N}\\) <br>
(e) \\(70^\\circ\\text{ N}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Identifying circumpolar northern constellations (Ursa Major and Cassiopeia) and estimating observer latitude from the altitude of Polaris (\\(h_{\\text{NCP}} = \\phi\\)).</p>
<p><strong>Step 1: Identify Key Asterisms in the Field</strong></p>
<ul>
    <li>Near the lower-right horizon, the seven bright stars of the <strong>Big Dipper (Ursa Major)</strong> are clearly visible.</li>
    <li>In the upper-left portion of the frame, the five bright stars of <strong>Cassiopeia</strong> form their characteristic "W" shape.</li>
</ul>
<p><strong>Step 2: Locate Polaris and Measure Its Altitude</strong></p>
<p>Following the pointer stars of the Big Dipper (Dubhe and Merak) toward the center-bottom of the frame—halfway toward Cassiopeia—we find <strong>Polaris (\\(\\alpha\\text{ UMi}\\))</strong> sitting just barely above the green horizon line at an altitude of \\(h \\approx 2^\\circ\\).</p>
<p>Since the altitude of the North Celestial Pole equals the observer's northern geographic latitude (\\(\\phi \\approx h_{\\text{Polaris}}\\)), the picture was taken at approximately \\(2^\\circ\\text{ N}\\).</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q12_usaaao_2022",
        id: "Q12",
        competition: "USAAAO",
        year: 2022,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "1.1 / 10.0",
        title: "Chronological Order of Solar Evolution",
        description: `Order the following phases of the Sun's evolution from first to last chronologically.<br>
1. Helium flash<br>
2. White dwarf<br>
3. Red giant branch<br>
4. Asymptotic giant branch<br>
5. End of hydrogen fusion in the core<br><br>
(a) 5, 4, 1, 3, 2 <br>
(b) 5, 3, 1, 4, 2 <br>
(c) 1, 5, 3, 4, 2 <br>
(d) 5, 2, 4, 1, 3 <br>
(e) 3, 5, 1, 4, 2`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Post-main-sequence evolutionary track of a \\(1\\,M_\\odot\\) low-mass star on the Hertzsprung-Russell diagram.</p>
<p><strong>Chronological Sequence for a Solar-Mass Star:</strong></p>
<ol>
    <li><strong>5. End of hydrogen fusion in the core:</strong> The Sun exhausts central hydrogen at the Terminal Age Main Sequence (TAMS), leaving an inert helium core surrounded by a hydrogen-burning shell.</li>
    <li><strong>3. Red giant branch (RGB):</strong> The core contracts and becomes electron-degenerate while the convective envelope expands and cools enormously.</li>
    <li><strong>1. Helium flash:</strong> At the tip of the RGB (\\(T_c \\approx 10^8\\text{ K}\\)), triple-alpha helium fusion ignites explosively in the degenerate core, lifting degeneracy and moving the star onto the Horizontal Branch.</li>
    <li><strong>4. Asymptotic giant branch (AGB):</strong> After core helium exhaustion, the star ascends the AGB with double shell burning (hydrogen and helium shells around an inert carbon-oxygen core).</li>
    <li><strong>2. White dwarf:</strong> Thermal pulses eject the outer envelope as a planetary nebula, leaving behind the hot degenerate carbon-oxygen core as a white dwarf.</li>
</ol>
<p>This gives the sequence <strong>5, 3, 1, 4, 2</strong>.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2022",
        id: "Q13",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Perihelion-to-Aphelion Distance Ratio",
        description: `The orbit of some planet to its star has an eccentricity of \\(0.086\\). What is the ratio of the planet's closest distance to its star to the farthest on its orbit?<br><br>
(a) 0.842 <br>
(b) 0.188 <br>
(c) 1.188 <br>
(d) 0.158 <br>
(e) None of the above`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Perihelion \\(r_p = a(1-e)\\) and aphelion \\(r_a = a(1+e)\\) distances of an elliptical orbit.</p>
<p><strong>Direct Evaluation:</strong></p>
<p>For an orbital eccentricity \\(e = 0.086\\), the ratio of closest approach (perihelion) to farthest distance (aphelion) is:</p>
<p>$$ \\frac{r_p}{r_a} = \\frac{a(1 - e)}{a(1 + e)} = \\frac{1 - 0.086}{1 + 0.086} = \\frac{0.914}{1.086} \\approx 0.8416 \\approx 0.842 $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q14_usaaao_2022",
        id: "Q14",
        competition: "USAAAO",
        year: 2022,
        module: "D2",
        moduleName: "Observational Data Sets",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.9 / 10.0",
        title: "Kepler CDPP Noise & Transit Detectability",
        description: `Figure 6 shows a 6-hr root-mean-square (rms) Combined Differential Photometric Precision (CDPP) curve for 150,000 stars observed by the Kepler space telescope. CDPP is a measure of the white noise contained in a light curve, so for a target with 6-hour CDPP of 100 parts per million (ppm), a 6-hour transit with depth 100 ppm would be considered a \\(1\\text{-}\\sigma\\) detection.<br><br>
<img src="../assets/img/USAAAO_2022/Q14_USAAAO_2022.jpeg" alt="Kepler 6-hr rms CDPP Distribution" class="user-diagram" onclick="window.openImageModal(this)"><br>
Consider a \\(1R_\\odot\\) target with Kepler magnitude \\(K_p = 13.5\\) that's among the best targets for its magnitude with respect to noise in Figure 6. Also consider three independent exoplanet scenarios for exoplanets with radii:<br>
• I. \\(0.5 R_\\oplus\\)<br>
• II. \\(1 R_\\oplus\\)<br>
• III. \\(10 R_\\oplus\\)<br><br>
Using a \\(1\\text{-}\\sigma\\) detection threshold (and assuming 6-hour transit durations), which planet(s) transits would we likely fail to observe due to noise?<br><br>
(a) I <br>
(b) III <br>
(c) I and II <br>
(d) II and III <br>
(e) I, II, and III`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Reading photometric precision floors from observational scatter plots and comparing transit depth \\(\\delta = (R_p/R_*)^2\\) against instrumental noise in parts per million (ppm).</p>
<p><strong>Step 1: Read the 6-Hour CDPP Noise Floor at \\(K_p = 13.5\\)</strong></p>
<p>Inspecting Figure 6 at \\(K_p = 13.5\\), the lower envelope ("among the best targets for its magnitude with respect to noise") lies at a 6-hour rms CDPP of approximately:</p>
<p>$$ \\sigma_{\\text{CDPP}} \\approx 40\\text{–}45\\text{ ppm} $$</p>
<p><strong>Step 2: Calculate Transit Depths for Each Scenario</strong></p>
<p>For a \\(1\\,R_\\odot\\) host star, an Earth-radius planet (\\(R_\\oplus / R_\\odot \\approx 6371 / 695700 \\approx 0.00916\\)) produces a fractional transit depth of \\((R_\\oplus / R_\\odot)^2 \\approx 8.4 \\times 10^{-5} = 84\\text{ ppm}\\):</p>
<ul>
    <li><strong>Scenario I (\\(0.5\\,R_\\oplus\\)):</strong> \\(\\delta_{\\text{I}} = (0.5)^2 \\times 84\\text{ ppm} \\approx 21\\text{ ppm} < 40\\text{ ppm}\\) (Below the \\(1\\text{-}\\sigma\\) noise threshold \\(\\implies\\) <strong>fails detection</strong>).</li>
    <li><strong>Scenario II (\\(1\\,R_\\oplus\\)):</strong> \\(\\delta_{\\text{II}} \\approx 84\\text{ ppm} > 40\\text{ ppm}\\) (Exceeds the \\(1\\text{-}\\sigma\\) threshold \\(\\implies\\) detectable).</li>
    <li><strong>Scenario III (\\(10\\,R_\\oplus\\)):</strong> \\(\\delta_{\\text{III}} = 10^2 \\times 84\\text{ ppm} \\approx 8400\\text{ ppm} \\gg 40\\text{ ppm}\\) (High-SNR detection).</li>
</ul>
<p>Thus, only planet <strong>I</strong> falls below the \\(1\\text{-}\\sigma\\) detection threshold.</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q15_usaaao_2022",
        id: "Q15",
        competition: "USAAAO",
        year: 2022,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Main-Sequence Hydrogen Burning Lifetime",
        description: `A star with mass \\(M\\) goes through an energy generating nuclear reaction \\(4\\,^1\\text{H} \\rightarrow \\,^4\\text{He} + \\text{Energy}\\). Here, the burning efficiency of the p-p (proton-proton) chain is \\(0.007\\), meaning that each mass \\(m\\) yields \\(0.007mc^2\\) of energy. Assuming that the star has a total available hydrogen mass for nuclear reaction amounting to half of its original mass, and the luminosity (\\(L\\)) stays constant throughout the burning phase, get an expression of the hydrogen burning lifetime of the star.<br><br>
(a) \\(1.625 \\times 10^{18}\\text{ s} \\left(\\frac{M}{M_\\odot}\\right)^{-2}\\) <br>
(b) \\(3.15 \\times 10^{14}\\text{ s} \\left(\\frac{M}{M_\\odot}\\right)^{-2}\\) <br>
(c) \\(1.625 \\times 10^{18}\\text{ s} \\left(\\frac{M}{M_\\odot}\\right)^{2}\\) <br>
(d) \\(3.15 \\times 10^{14}\\text{ s} \\left(\\frac{M}{M_\\odot}\\right)^{2}\\) <br>
(e) None of the above`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Nuclear timescale \\(\\tau_{\\text{nuc}} = \\frac{\\eta f M c^2}{L}\\) combined with the empirical main-sequence mass-luminosity relation \\(L \\propto M^3\\).</p>
<p><strong>Step 1: Calculate the Total Nuclear Energy Reservoir</strong></p>
<p>With a core fuel fraction \\(f = 0.5\\) and p-p chain mass-to-energy conversion efficiency \\(\\eta = 0.007\\), the total energy radiated over the main sequence is:</p>
<p>$$ E_{\\text{tot}} = \\eta f M c^2 = 0.007 \\times 0.5 M c^2 = 0.0035 M c^2 $$</p>
<p><strong>Step 2: Evaluate the Solar Baseline & Mass Scaling</strong></p>
<p>For \\(M = M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\) and \\(L_\\odot \\approx 3.846 \\times 10^{26}\\text{ W}\\):</p>
<p>$$ t_\\odot = \\frac{0.0035 M_\\odot c^2}{L_\\odot} = \\frac{0.0035 (1.989 \\times 10^{30}\\text{ kg})(2.998 \\times 10^8\\text{ m/s})^2}{3.846 \\times 10^{26}\\text{ W}} \\approx 1.625 \\times 10^{18}\\text{ s} $$</p>
<p>Using the standard main-sequence mass-luminosity scaling \\(\\frac{L}{L_\\odot} \\approx \\left(\\frac{M}{M_\\odot}\\right)^3\\), the lifetime scales as:</p>
<p>$$ t = \\frac{E_{\\text{tot}}}{L} = t_\\odot \\frac{M / M_\\odot}{(M / M_\\odot)^3} = 1.625 \\times 10^{18}\\text{ s} \\left(\\frac{M}{M_\\odot}\\right)^{-2} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2022",
        id: "Q16",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Parker Solar Probe Perihelion Velocity",
        description: `In 2025, the Parker Solar Probe will pass just \\(6.9 \\times 10^6\\text{ km}\\) from the Sun, becoming the closest man-made object to the Sun in history. It will make five orbits, passing close to the Sun once every 89 days, before the planned end of the mission in 2026. How fast will the Parker Solar Probe be traveling at its closest approach to the Sun?<br><br>
(a) 38 km/s <br>
(b) 48 km/s <br>
(c) 139 km/s <br>
(d) 190 km/s <br>
(e) 196 km/s`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Kepler's Third Law \\(a^3 = P^2\\) and the vis-viva equation at perihelion.</p>
<p><strong>Step 1: Find the Semi-Major Axis from the Orbital Period</strong></p>
<p>Converting the orbital period \\(P = 89\\text{ days}\\) into years:</p>
<p>$$ P = \\frac{89}{365.25}\\text{ yr} \\approx 0.24367\\text{ yr} $$</p>
<p>By Kepler's Third Law around the Sun:</p>
<p>$$ a = P^{2/3}\\text{ AU} = (0.24367)^{2/3}\\text{ AU} \\approx 0.3905\\text{ AU} \\approx 5.842 \\times 10^{10}\\text{ m} $$</p>
<p><strong>Step 2: Apply the Vis-Viva Equation at Perihelion</strong></p>
<p>At closest approach \\(r_p = 6.9 \\times 10^6\\text{ km} = 6.9 \\times 10^9\\text{ m}\\), the speed of the probe is:</p>
<p>$$ v_p = \\sqrt{GM_\\odot \\left(\\frac{2}{r_p} - \\frac{1}{a}\\right)} = \\sqrt{1.327 \\times 10^{20}\\text{ m}^3/\\text{s}^2 \\left(\\frac{2}{6.9 \\times 10^9\\text{ m}} - \\frac{1}{5.842 \\times 10^{10}\\text{ m}}\\right)} $$</p>
<p>$$ v_p = \\sqrt{3.619 \\times 10^{10}\\text{ m}^2/\\text{s}^2} \\approx 1.902 \\times 10^5\\text{ m/s} \\approx 190\\text{ km/s} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q17_18_usaaao_2022",
        id: "Q17-18",
        competition: "USAAAO",
        year: 2022,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.5 / 10.0",
        title: "Eclipsing Binary Mass & Stellar Radius Ratio",
        description: `An astronomer observes an eclipsing binary star system from Earth, and he plots the following light curve.<br><br>
<img src="../assets/img/USAAAO_2022/Q17_USAAAO_2022.jpeg" alt="Eclipsing Binary Light Curve" class="user-diagram" onclick="window.openImageModal(this)"><br>
<strong>17.</strong> Suppose that both stars have circular orbits and the distance between the stars is \\(14.8\\text{ AU}\\). What is the total mass of the binary star system in terms of solar masses?<br>
(a) \\(2.3\\,M_\\odot\\) <br>
(b) \\(5.7\\,M_\\odot\\) <br>
(c) \\(6.8\\,M_\\odot\\) <br>
(d) \\(23\\,M_\\odot\\) <br>
(e) \\(46\\,M_\\odot\\)<br><br>
<strong>18.</strong> Assume that the smaller star in the above binary star system is brighter than the larger star. What is the ratio of the radius of the smaller star to the radius of the larger star?<br>
(a) 0.21 <br>
(b) 0.76 <br>
(c) 0.82 <br>
(d) 0.95 <br>
(e) 0.98`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Extracting orbital period and fractional flux depths from an eclipsing binary light curve to determine total dynamical mass via Kepler's Third Law and the stellar radius ratio \\(R_S / R_L\\).</p>
<p><strong>Part 1 (Question 17 — Total System Mass):</strong></p>
<p>From the light curve, the primary (deepest) eclipse occurs at \\(t_1 = 2014.8\\) and the secondary (shallower) eclipse occurs at \\(t_2 = 2019.0\\). For circular orbits, the interval between primary and secondary eclipses is half an orbital period:</p>
<p>$$ \\frac{P}{2} = 2019.0 - 2014.8 = 4.2\\text{ years} \\implies P = 8.4\\text{ years} $$</p>
<p>Applying Kepler's Third Law in solar units (\\(a = 14.8\\text{ AU}\\), \\(P = 8.4\\text{ yr}\\)):</p>
<p>$$ M_{\\text{tot}} = \\frac{a^3}{P^2}\\,M_\\odot = \\frac{(14.8)^3}{(8.4)^2}\\,M_\\odot = \\frac{3241.79}{70.56}\\,M_\\odot \\approx 45.94\\,M_\\odot \\approx 46\\,M_\\odot $$</p>
<p><strong>Part 2 (Question 18 — Radius Ratio \\(R_S / R_L\\)):</strong></p>
<p>Let \\(F_0 = F_L + F_S\\) be the baseline out-of-eclipse flux at magnitude \\(m_0 = 6.0\\):</p>
<ul>
    <li><strong>Primary minimum (\\(m_1 = 7.5\\)):</strong> The smaller, brighter star is totally eclipsed behind the larger star, so only the flux of the larger star \\(F_1 = F_L\\) is observed:
    $$ \\frac{F_L}{F_0} = 10^{-(m_1 - m_0)/2.5} = 10^{-(7.5 - 6.0)/2.5} = 10^{-0.6} \\approx 0.25119 $$</li>
    <li><strong>Secondary minimum (\\(m_2 = 6.2\\)):</strong> The smaller star transits across the disk of the larger star, blocking a fraction \\((R_S / R_L)^2\\) of the larger star's flux \\(F_L\\):
    $$ \\frac{F_2}{F_0} = 10^{-(m_2 - m_0)/2.5} = 10^{-(6.2 - 6.0)/2.5} = 10^{-0.08} \\approx 0.83176 $$</li>
</ul>
<p>The fractional flux drop during the secondary eclipse is:</p>
<p>$$ \\frac{F_0 - F_2}{F_0} = \\frac{F_L (R_S / R_L)^2}{F_0} \\implies \\left(\\frac{R_S}{R_L}\\right)^2 = \\frac{1 - 10^{-0.08}}{10^{-0.6}} = \\frac{0.16824}{0.25119} \\approx 0.6698 $$</p>
<p>$$ \\frac{R_S}{R_L} = \\sqrt{0.6698} \\approx 0.818 \\approx 0.82 $$</p>
<p><strong>Answers: Q17: (e) | Q18: (c)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2022",
        id: "Q19",
        competition: "USAAAO",
        year: 2022,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Diffraction Limit Comparison: HST vs. JWST",
        description: `The resolution of a space telescope is theoretically limited by diffraction from its primary mirror. In this problem, we will compare the diffraction limit of the Hubble Space Telescope (HST) (primary mirror diameter \\(d = 2.4\\text{ m}\\)) and the James Webb Space Telescope (JWST) (\\(d = 6.5\\text{ m}\\)). The operating wavelengths for the two telescopes are \\(500\\text{ nm}\\) and \\(10\\,\\mu\\text{m}\\) respectively. Calculate the ratio of the diffraction-limited angular resolution \\(\\frac{\\theta_{\\text{HST}}}{\\theta_{\\text{JWST}}}\\). Which telescope can resolve smaller angular features if limited only by diffraction?<br><br>
(a) 0.014, JWST <br>
(b) 0.14, HST <br>
(c) 1.4, JWST <br>
(d) 14, HST <br>
(e) 140, JWST`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Rayleigh diffraction criterion \\(\\theta = 1.22 \\frac{\\lambda}{d}\\).</p>
<p><strong>Step 1: Compute the Ratio of Angular Resolutions</strong></p>
<p>Since \\(\\theta \\propto \\frac{\\lambda}{d}\\), the ratio of the diffraction-limited angular resolution of HST (\\(\\lambda_{\\text{HST}} = 0.5\\,\\mu\\text{m}\\), \\(d_{\\text{HST}} = 2.4\\text{ m}\\)) to JWST (\\(\\lambda_{\\text{JWST}} = 10\\,\\mu\\text{m}\\), \\(d_{\\text{JWST}} = 6.5\\text{ m}\\)) is:</p>
<p>$$ \\frac{\\theta_{\\text{HST}}}{\\theta_{\\text{JWST}}} = \\frac{\\lambda_{\\text{HST}}}{\\lambda_{\\text{JWST}}} \\times \\frac{d_{\\text{JWST}}}{d_{\\text{HST}}} = \\frac{0.5\\,\\mu\\text{m}}{10\\,\\mu\\text{m}} \\times \\frac{6.5\\text{ m}}{2.4\\text{ m}} = 0.05 \\times 2.7083 \\approx 0.1354 \\approx 0.14 $$</p>
<p><strong>Step 2: Identify Which Telescope Resolves Smaller Features</strong></p>
<p>Because \\(\\theta_{\\text{HST}} = 0.14\\,\\theta_{\\text{JWST}} < \\theta_{\\text{JWST}}\\), the <strong>Hubble Space Telescope (HST)</strong> has a smaller diffraction angle at \\(500\\text{ nm}\\) and therefore resolves smaller angular features.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2022",
        id: "Q20",
        competition: "USAAAO",
        year: 2022,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Maximum Apparent Magnitude Variation of Pluto",
        description: `The eccentricity of Pluto's orbit is \\(0.25\\). Estimate the maximum change in magnitude of Pluto as seen from Earth in one orbit of Pluto. You may assume that the semi-major axis of Pluto's orbit is much greater than \\(1\\text{ AU}\\).<br><br>
(a) 0.2 <br>
(b) 1.2 <br>
(c) 2.2 <br>
(d) 3.2 <br>
(e) 4.2`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Inverse-fourth-power reflected flux scaling \\(F \\propto r^{-2}\\Delta^{-2} \\approx r^{-4}\\) for a distant outer Solar System body (\\(r \\gg 1\\text{ AU}\\)).</p>
<p><strong>Step 1: Relate Observed Flux to Heliocentric Distance</strong></p>
<p>The solar flux incident on Pluto at heliocentric distance \\(r\\) scales as \\(F_{\\text{inc}} \\propto r^{-2}\\). Since \\(a_{\\text{Pluto}} \\gg 1\\text{ AU}\\), Pluto's geocentric distance to Earth is approximately equal to its heliocentric distance (\\(\\Delta \\approx r\\)). Thus, the reflected flux received at Earth scales as:</p>
<p>$$ F_{\\text{obs}} \\propto \\frac{1}{r^2 \\Delta^2} \\approx \\frac{1}{r^4} $$</p>
<p><strong>Step 2: Calculate the Magnitude Variation Between Perihelion and Aphelion</strong></p>
<p>Between perihelion \\(r_p = a(1-e)\\) and aphelion \\(r_a = a(1+e)\\) with \\(e = 0.25\\), the ratio of maximum to minimum flux is:</p>
<p>$$ \\frac{F_{\\max}}{F_{\\min}} = \\left(\\frac{r_a}{r_p}\\right)^4 = \\left(\\frac{1 + e}{1 - e}\\right)^4 = \\left(\\frac{1.25}{0.75}\\right)^4 = \\left(\\frac{5}{3}\\right)^4 $$</p>
<p>By Pogson's law, the maximum change in apparent magnitude is:</p>
<p>$$ \\Delta m = 2.5 \\log_{10}\\left(\\frac{F_{\\max}}{F_{\\min}}\\right) = 2.5 \\times 4 \\log_{10}\\left(\\frac{5}{3}\\right) = 10 \\log_{10}(1.6667) \\approx 2.22 \\approx 2.2 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q21_22_usaaao_2022",
        id: "Q21-22",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "2.9 / 10.0",
        title: "Orbital Impulse Maneuvers: Perigee & Apogee Ranking",
        description: `A satellite is in a circular, equatorial orbit, and can fire its engines to accelerate in any of the following directions:<br>
1. In the direction of motion<br>
2. Against the direction of motion<br>
3. Towards Earth, perpendicular to direction of motion (against radial vector)<br>
4. Away from Earth, perpendicular to direction of motion (along radial vector)<br>
5. Towards the North Celestial Pole (perpendicular to both direction of motion and radial vector)<br><br>
<strong>21.</strong> Consider a small change of velocity in each of these directions. For how many of these maneuvers will the perigee of the orbit decrease?<br>
(a) 1 <br>
(b) 2 <br>
(c) 3 <br>
(d) 4 <br>
(e) 5<br><br>
<strong>22.</strong> For the five maneuvers described above, rank the resulting apogees from lowest to highest. Assume the change in velocity is small relative to orbital velocity, but not negligible.<br>
(a) \\(2 < 3 = 4 = 5 < 1\\) <br>
(b) \\(2 = 3 < 5 < 4 = 1\\) <br>
(c) \\(2 < 3 = 4 < 5 < 1\\) <br>
(d) \\(2 < 5 < 3 = 4 < 1\\) <br>
(e) \\(2 < 3 < 5 < 4 < 1\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Perturbative orbital mechanics under impulsive velocity changes \\(\\Delta v = \\epsilon v_0\\) (\\(0 < \\epsilon \\ll 1\\)) from a circular orbit of radius \\(r_0\\) and speed \\(v_0 = \\sqrt{GM/r_0}\\).</p>
<p><strong>Step 1: Analyze Semi-Major Axis \\(a\\) and Eccentricity \\(e\\) for Each Maneuver</strong></p>
<p>Using the vis-viva relation \\(\\frac{r_0}{a} = 2 - \\left(\\frac{v}{v_0}\\right)^2\\) and specific angular momentum \\(h = |\\vec{r}_0 \\times \\vec{v}| = \\sqrt{GMa(1-e^2)}\\):</p>
<ul>
    <li><strong>Maneuver 1 (Prograde tangential):</strong> \\(v = v_0(1 + \\epsilon)\\) and \\(\\vec{r}_0 \\perp \\vec{v}\\). The burn point is the new perigee, so \\(r_p(1) = r_0\\) (unchanged). The apogee increases to first order:
    $$ r_a(1) = r_0 \\frac{(1+\\epsilon)^2}{1 - 2\\epsilon - \\epsilon^2} \\approx r_0(1 + 2\\epsilon + 3\\epsilon^2) $$</li>
    <li><strong>Maneuver 2 (Retrograde tangential):</strong> \\(v = v_0(1 - \\epsilon)\\) and \\(\\vec{r}_0 \\perp \\vec{v}\\). The burn point becomes the new apogee, so \\(r_a(2) = r_0\\), while the perigee decreases to:
    $$ r_p(2) \\approx r_0(1 - 2\\epsilon + 3\\epsilon^2) < r_0 $$</li>
    <li><strong>Maneuvers 3 & 4 (Inward and outward radial):</strong> A radial impulse \\(v_r = \\mp \\epsilon v_0\\) leaves the transverse velocity \\(v_\\theta = v_0\\) and specific angular momentum \\(h = r_0 v_0\\) unchanged, while increasing total speed to \\(v^2 = v_0^2(1 + \\epsilon^2)\\). By vis-viva, \\(a = \\frac{r_0}{1 - \\epsilon^2}\\), and from \\(h^2 = GMa(1-e^2) = GMr_0\\) we find \\(1 - e^2 = 1 - \\epsilon^2 \\implies e = \\epsilon\\) for both! Thus both maneuvers yield identical perigees and apogees:
    $$ r_p(3) = r_p(4) = a(1 - e) = \\frac{r_0}{1 + \\epsilon} \\approx r_0(1 - \\epsilon + \\epsilon^2) < r_0 $$
    $$ r_a(3) = r_a(4) = a(1 + e) = \\frac{r_0}{1 - \\epsilon} \\approx r_0(1 + \\epsilon + \\epsilon^2) > r_0 $$</li>
    <li><strong>Maneuver 5 (Out-of-plane normal):</strong> The velocity vector remains strictly perpendicular to \\(\\vec{r}_0\\) with magnitude \\(v = v_0\\sqrt{1 + \\epsilon^2} > v_0\\). Because \\(\\vec{r}_0 \\cdot \\vec{v} = 0\\) and \\(v > v_0\\), the burn point is the new <strong>perigee</strong>:
    $$ r_p(5) = r_0 \\quad (\\text{unchanged}), \\qquad r_a(5) = r_0 \\frac{1 + \\epsilon^2}{1 - \\epsilon^2} \\approx r_0(1 + 2\\epsilon^2) $$</li>
</ul>
<p><strong>Step 2: Answer Question 21 & Question 22</strong></p>
<ul>
    <li><strong>Q21 (Perigee decreases):</strong> Perigee decreases below \\(r_0\\) for Maneuvers <strong>2, 3, and 4</strong> (a total of <strong>3</strong> maneuvers).</li>
    <li><strong>Q22 (Apogee ranking from lowest to highest):</strong> Comparing the expansions in \\(\\epsilon \\ll 1\\):
    $$ r_a(2) = r_0 < r_a(5) \\approx r_0(1 + 2\\epsilon^2) < r_a(3) = r_a(4) \\approx r_0(1 + \\epsilon) < r_a(1) \\approx r_0(1 + 2\\epsilon) $$
    giving the ordering <strong>\\(2 < 5 < 3 = 4 < 1\\)</strong>.</li>
</ul>
<p><strong>Answers: Q21: (c) | Q22: (d)</strong></p>`
    },
    {
        uniqueId: "q23_usaaao_2022",
        id: "Q23",
        competition: "USAAAO",
        year: 2022,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Exoplanet Equilibrium Temperature",
        description: `An exoplanet discovered by the radial velocity method is found to have an orbital period of \\(2.45\\text{ days}\\) around a Sun-like star. Assuming the planet has zero albedo (i.e., absorbs all incoming starlight) and perfectly transports heat across its surface, estimate the temperature at the photosphere of the planet.<br><br>
(a) 395 K <br>
(b) 954 K <br>
(c) 1231 K <br>
(d) 1476 K <br>
(e) 2071 K`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Planetary radiative equilibrium temperature \\(T_{\\text{eq}} = T_* (1 - A)^{1/4} \\sqrt{\\frac{R_*}{2a}}\\) coupled with Kepler's Third Law.</p>
<p><strong>Step 1: Find the Orbital Semi-Major Axis</strong></p>
<p>For an orbital period \\(P = 2.45\\text{ days} = \\frac{2.45}{365.25}\\text{ yr} \\approx 6.7077 \\times 10^{-3}\\text{ yr}\\) around a \\(1\\,M_\\odot\\) star:</p>
<p>$$ a = P^{2/3}\\text{ AU} = (6.7077 \\times 10^{-3})^{2/3}\\text{ AU} \\approx 0.03557\\text{ AU} \\approx 5.321 \\times 10^9\\text{ m} $$</p>
<p><strong>Step 2: Calculate the Equilibrium Temperature</strong></p>
<p>For zero Bond albedo (\\(A = 0\\)) and uniform heat redistribution across the full \\(4\\pi R_p^2\\) spherical surface around a Sun-like star (\\(T_\\odot = 5778\\text{ K}\\), \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\)):</p>
<p>$$ T_{\\text{eq}} = T_\\odot \\sqrt{\\frac{R_\\odot}{2a}} = 5778\\text{ K} \\sqrt{\\frac{6.957 \\times 10^8\\text{ m}}{2 (5.321 \\times 10^9\\text{ m})}} \\approx 5778\\text{ K} \\times 0.25568 \\approx 1476\\text{ K} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q24_25_usaaao_2022",
        id: "Q24-25",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.0 / 10.0",
        title: "3D Separation of Deneb & Albireo and Solar Hour Angle",
        description: `Deneb is a very important star in the Northern hemisphere as it is one of the three stars in the Summer Triangle. Deneb (\\(\\alpha\\text{ Cyg}\\)) is also the brightest star in the Cygnus constellation. Use the following table for Questions 24 and 25:<br><br>
<table style="width: 100%; border-collapse: collapse; margin: 12px 0; text-align: center; border: 1px solid rgba(255,255,255,0.15);">
    <thead>
        <tr style="background: rgba(255,255,255,0.06);">
            <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Parameter</th>
            <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Deneb</th>
            <th style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Albireo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Parallax (\\(\\pi\\))</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">2.29 mas</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">7.51 mas</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Declination (\\(\\delta\\))</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">\\(45^\\circ 17'\\)</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">\\(27^\\circ 57'\\)</td>
        </tr>
        <tr>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">Right Ascension (\\(\\alpha\\))</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">20h 41min</td>
            <td style="padding: 8px; border: 1px solid rgba(255,255,255,0.15);">19h 31min</td>
        </tr>
    </tbody>
</table><br>
<strong>24.</strong> Knowing the information above, calculate the distance between Deneb and Albireo (\\(\\beta\\text{ Cyg}\\)).<br>
(a) 569 pc <br>
(b) 102 pc <br>
(c) 432 pc <br>
(d) 317 pc <br>
(e) 459 pc<br><br>
<strong>25.</strong> Suppose you are in Houston (\\(29^\\circ 46'\\text{ N},\\, 95^\\circ 23'\\text{ W}\\)) on the fall equinox and you just observed Deneb culminating (upper culmination). Knowing the data in the table of exercise 24, what is the hour angle of the Sun?<br>
(a) 8h 41min <br>
(b) 20h 41min <br>
(c) 12h 00min <br>
(d) 14h 19min <br>
(e) 18h 22min`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: 3D astrometric distance via spherical and Euclidean laws of cosines, and sidereal time relation \\(\\text{LST} = \\alpha + H\\).</p>
<p><strong>Part 1 (Question 24 — 3D Distance Between Deneb and Albireo):</strong></p>
<p>First, find the radial distances from Earth using \\(d(\\text{pc}) = \\frac{1000}{\\pi(\\text{mas})}\\):</p>
<p>$$ d_1 = \\frac{1000}{2.29} \\approx 436.68\\text{ pc}, \\qquad d_2 = \\frac{1000}{7.51} \\approx 133.16\\text{ pc} $$</p>
<p>Next, compute the angular separation \\(\\theta\\) on the celestial sphere using \\(\\delta_1 = 45.2833^\\circ\\), \\(\\delta_2 = 27.95^\\circ\\), and \\(\\Delta\\alpha = 20^{\\text{h}}41^{\\text{m}} - 19^{\\text{h}}31^{\\text{m}} = 1^{\\text{h}}10^{\\text{m}} = 17.5^\\circ\\):</p>
<p>$$ \\cos\\theta = \\sin\\delta_1 \\sin\\delta_2 + \\cos\\delta_1 \\cos\\delta_2 \\cos(\\Delta\\alpha) $$</p>
<p>$$ \\cos\\theta = \\sin(45.2833^\\circ)\\sin(27.95^\\circ) + \\cos(45.2833^\\circ)\\cos(27.95^\\circ)\\cos(17.5^\\circ) \\approx 0.33305 + 0.59272 = 0.92577 $$</p>
<p>Applying the Euclidean law of cosines to the triangle formed by Earth, Deneb, and Albireo:</p>
<p>$$ D = \\sqrt{d_1^2 + d_2^2 - 2 d_1 d_2 \\cos\\theta} = \\sqrt{(436.68)^2 + (133.16)^2 - 2(436.68)(133.16)(0.92577)} \\approx 317.4\\text{ pc} \\approx 317\\text{ pc} $$</p>
<p><strong>Part 2 (Question 25 — Solar Hour Angle at Deneb Upper Culmination):</strong></p>
<p>When Deneb is at upper culmination on the local meridian, its hour angle is \\(H_{\\text{Deneb}} = 0^{\\text{h}}\\), so the Local Sidereal Time is:</p>
<p>$$ \\text{LST} = \\alpha_{\\text{Deneb}} = 20^{\\text{h}}41^{\\text{m}} $$</p>
<p>On the fall (autumnal) equinox, the Sun's right ascension is \\(\\alpha_\\odot = 12^{\\text{h}}00^{\\text{m}}\\). Therefore, the hour angle of the Sun is:</p>
<p>$$ H_\\odot = \\text{LST} - \\alpha_\\odot = 20^{\\text{h}}41^{\\text{m}} - 12^{\\text{h}}00^{\\text{m}} = 8^{\\text{h}}41^{\\text{m}} $$</p>
<p><strong>Answers: Q24: (d) | Q25: (a)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2022",
        id: "Q26",
        competition: "USAAAO",
        year: 2022,
        module: "O1",
        moduleName: "Blind Map & Sky Charts",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Solar Ecliptic Constellation from Midnight Sky",
        description: `Knowing that the following image was taken at 11:59 pm, determine the name of which constellation the Sun was passing in front of on that same day.<br><br>
<img src="../assets/img/USAAAO_2022/Q26_USAAAO_2022.jpeg" alt="11:59 PM Sky Chart" class="user-diagram" onclick="window.openImageModal(this)"><br>
(a) Scorpius <br>
(b) Virgo <br>
(c) Big Dipper <br>
(d) Cancer <br>
(e) Taurus`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Identifying zodiacal constellations culminating near local midnight (\\(11:59\\text{ pm}\\)) to find the Sun's ecliptic longitude \\(180^\\circ\\) (\\(12^{\\text{h}}\\)) opposite on the celestial sphere.</p>
<p><strong>Step 1: Identify the Constellations Above the Horizon at Midnight</strong></p>
<p>Inspecting the sky map taken at \\(11:59\\text{ pm}\\), the zodiacal constellations visible above the horizon spanning the southern sky are <strong>Libra, Scorpius, Sagittarius, Capricornus, Aquarius, and Pisces</strong>, with the Sagittarius/Capricornus boundary culminating near the local meridian (\\(\\alpha \\approx 19^{\\text{h}}\\text{–}20^{\\text{h}}\\)).</p>
<p><strong>Step 2: Locate the Sun \\(12^{\\text{h}}\\) Opposite in Right Ascension</strong></p>
<p>Since the image is taken at local midnight (\\(11:59\\text{ pm}\\)), the Sun lies on the opposite side of the celestial sphere (\\(\\alpha_\\odot \\approx \\text{LST} - 12^{\\text{h}} \\approx 7^{\\text{h}}\\text{–}8^{\\text{h}}\\)), corresponding to the zodiacal constellations <strong>Gemini / Cancer</strong>. Since Gemini is not among the choices, <strong>Cancer</strong> is the unique matching constellation.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2022",
        id: "Q27",
        competition: "USAAAO",
        year: 2022,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Signal-to-Noise Ratio Exposure Time Scaling",
        description: `An astronomer observes a galaxy in very foggy weather. So far, she has an image of signal-to-noise ratio of approximately 1, imaging for about 5 seconds. If she wants to reach a signal-to-noise ratio of 10, how long, in total, must she observe the galaxy for?<br><br>
(a) 15 seconds <br>
(b) 20 seconds <br>
(c) 25 seconds <br>
(d) 50 seconds <br>
(e) 500 seconds`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Poisson photon statistics and Signal-to-Noise Ratio scaling \\(\\text{SNR} \\propto \\sqrt{t}\\).</p>
<p><strong>Direct Derivation:</strong></p>
<p>In photon-counting and background-limited astronomical imaging, the collected signal grows linearly with exposure time (\\(S \\propto t\\)) while Poisson noise grows as the square root of the counts (\\(N \\propto \\sqrt{t}\\)). Consequently:</p>
<p>$$ \\text{SNR} = \\frac{S}{N} \\propto \\frac{t}{\\sqrt{t}} = \\sqrt{t} $$</p>
<p>To increase the SNR by a factor of \\(\\frac{\\text{SNR}_2}{\\text{SNR}_1} = \\frac{10}{1} = 10\\), the total integration time must increase by a factor of \\(10^2 = 100\\):</p>
<p>$$ t_2 = t_1 \\left(\\frac{\\text{SNR}_2}{\\text{SNR}_1}\\right)^2 = 5\\text{ s} \\times 10^2 = 500\\text{ seconds} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q28_usaaao_2022",
        id: "Q28",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Circumpolar Condition for Dubhe",
        description: `Dubhe (declination \\(\\delta = 61.75^\\circ\\)) is a star in the constellation of Ursa Major. Is it circumpolar from the city of San Francisco (latitude \\(\\lambda = 37.7^\\circ\\text{ N}\\))? How about from the city of Miami (latitude \\(\\lambda = 25.8^\\circ\\text{ N}\\))?<br><br>
(a) Yes, Yes <br>
(b) Yes, No <br>
(c) No, Yes <br>
(d) No, No <br>
(e) Need more information`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Circumpolarity condition \\(\\delta > 90^\\circ - \\phi\\) in the Northern Hemisphere.</p>
<p><strong>Step 1: Formulate the Minimum Latitude for Circumpolarity</strong></p>
<p>A star in the Northern Hemisphere never sets (its lower culmination altitude \\(h_{\\min} = \\phi + \\delta - 90^\\circ > 0^\\circ\\)) if and only if:</p>
<p>$$ \\phi > 90^\\circ - \\delta = 90^\\circ - 61.75^\\circ = 28.25^\\circ\\text{ N} $$</p>
<p><strong>Step 2: Test Both Cities</strong></p>
<ul>
    <li><strong>San Francisco (\\(\\phi = 37.7^\\circ\\text{ N}\\)):</strong> Since \\(37.7^\\circ > 28.25^\\circ\\), Dubhe is circumpolar (<strong>Yes</strong>).</li>
    <li><strong>Miami (\\(\\phi = 25.8^\\circ\\text{ N}\\)):</strong> Since \\(25.8^\\circ < 28.25^\\circ\\), Dubhe dips below the northern horizon (<strong>No</strong>).</li>
</ul>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q29_usaaao_2022",
        id: "Q29",
        competition: "USAAAO",
        year: 2022,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Proper Distance from H-Alpha Cosmological Redshift",
        description: `An astronomer takes a spectrum of a galaxy and observes that the hydrogen-alpha emission line is at a wavelength of \\(721.9\\text{ nanometers}\\). In a laboratory on Earth, this same emission line is observed at a wavelength of \\(656.3\\text{ nanometers}\\). Approximately what is the (proper) distance to this galaxy?<br><br>
(a) 66 Mpc <br>
(b) 430 Mpc <br>
(c) 480 Mpc <br>
(d) 3900 Mpc <br>
(e) 4700 Mpc`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spectral redshift \\(z = \\frac{\\lambda_{\\text{obs}} - \\lambda_0}{\\lambda_0}\\) and the Hubble-Lemaître Law \\(v = c z = H_0 d\\).</p>
<p><strong>Step 1: Compute the Cosmological Redshift \\(z\\)</strong></p>
<p>$$ z = \\frac{\\lambda_{\\text{obs}} - \\lambda_0}{\\lambda_0} = \\frac{721.9\\text{ nm} - 656.3\\text{ nm}}{656.3\\text{ nm}} = \\frac{65.6}{656.3} \\approx 0.100 $$</p>
<p><strong>Step 2: Apply Hubble's Law</strong></p>
<p>Using \\(H_0 \\approx 70\\text{ km s}^{-1}\\text{ Mpc}^{-1}\\) and \\(c = 3.0 \\times 10^5\\text{ km/s}\\):</p>
<p>$$ d \\approx \\frac{c z}{H_0} = \\frac{(3.0 \\times 10^5\\text{ km/s})(0.100)}{70\\text{ km s}^{-1}\\text{ Mpc}^{-1}} \\approx 428.6\\text{ Mpc} \\approx 430\\text{ Mpc} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q30_usaaao_2022",
        id: "Q30",
        competition: "USAAAO",
        year: 2022,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.9 / 10.0",
        title: "Solstice Daylight Duration Difference in San Francisco",
        description: `What is the time difference between the longest day of the year and the shortest day of the year in San Francisco (\\(37.7^\\circ\\text{ N},\\, 122.4^\\circ\\text{ W}\\))?<br>
Neglect atmospheric refraction.<br><br>
(a) 2h 30min <br>
(b) 3h 32min <br>
(c) 4h 08min <br>
(d) 5h 12min <br>
(e) 6h 25min`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Semi-diurnal arc and sunrise/sunset hour angle \\(\\cos H_0 = -\\tan\\phi \\tan\\delta\\) at the summer and winter solstices.</p>
<p><strong>Step 1: Compute the Sunset Hour Angle at Both Solstices</strong></p>
<p>Neglecting refraction, the Sun sets when its altitude is \\(h = 0^\\circ\\), giving \\(\\cos H_0 = -\\tan\\phi \\tan\\delta\\).</p>
<ul>
    <li><strong>Summer Solstice (\\(\\delta = +\\varepsilon = +23.44^\\circ\\)) at \\(\\phi = 37.7^\\circ\\text{ N}\\):</strong>
    $$ \\cos H_{\\text{summer}} = -\\tan(37.7^\\circ)\\tan(23.44^\\circ) \\approx -(0.77289)(0.43357) \\approx -0.33510 \\implies H_{\\text{summer}} \\approx 109.58^\\circ $$</li>
    <li><strong>Winter Solstice (\\(\\delta = -\\varepsilon = -23.44^\\circ\\)):</strong>
    $$ \\cos H_{\\text{winter}} = +\\tan(37.7^\\circ)\\tan(23.44^\\circ) \\approx +0.33510 \\implies H_{\\text{winter}} = 180^\\circ - 109.58^\\circ = 70.42^\\circ $$</li>
</ul>
<p><strong>Step 2: Calculate the Daylight Time Difference</strong></p>
<p>Since total daylight duration is \\(T = \\frac{2 H_0}{15^\\circ / \\text{hr}}\\), the time difference between the longest and shortest days of the year is:</p>
<p>$$ \\Delta T = \\frac{2(H_{\\text{summer}} - H_{\\text{winter}})}{15^\\circ / \\text{hr}} = \\frac{2(109.58^\\circ - 70.42^\\circ)}{15^\\circ / \\text{hr}} = \\frac{78.32^\\circ}{15^\\circ / \\text{hr}} \\approx 5.22\\text{ hours} \\approx 5^{\\text{h}}13^{\\text{m}} $$</p>
<p>The closest choice is <strong>5h 12min</strong>.</p>
<p><strong>Answer: (d)</strong></p>`
    }
];