// js/data/usaaao_2023.js
export const usaaao_2023 = [
    {
        uniqueId: "q1_usaaao_2023",
        id: "Q1",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Julian Day Calendar Conversion",
        description: `According to the astronomical Julian day count, \\(\\text{JD } 2459946.0\\) corresponds to January 1, 2023 at 12:00 UT. What would be the date and time at Chorzów, Poland corresponding to \\(\\text{JD } 2460000.0\\)? Poland uses Central European Time (\\(\\text{GMT} + 1:00\\)).<br><br>
(a) 31 January 2023, 24:00 <br>
(b) 24 February 2023, 13:00 <br>
(c) 21 March 2023, 14:00 <br>
(d) 21 June 2023, 18:00 <br>
(e) 31 December 2023, 24:00`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Astronomical Julian Date (JD) intervals and civil time zone conversion.</p>
<p><strong>Solution:</strong></p>
<p>First, compute the number of elapsed days between the two Julian Dates:</p>
<p>$$ \\Delta \\text{JD} = 2460000.0 - 2459946.0 = 54.0\\text{ days} $$</p>
<p>Adding exactly \\(54\\text{ days}\\) to January 1, 2023 at 12:00 UT:</p>
<ul>
    <li>January has 31 days, so advancing \\(30\\text{ days}\\) reaches January 31, 2023 at 12:00 UT.</li>
    <li>Advancing the remaining \\(54 - 30 = 24\\text{ days}\\) reaches <strong>24 February 2023 at 12:00 UT</strong>.</li>
</ul>
<p>Converting from Universal Time (UT) to Central European Time (\\(\\text{GMT} + 1:00\\)) adds 1 hour:</p>
<p>$$ t_{\\text{CET}} = 12:00 + 01:00 = 13:00 $$</p>
<p>Thus, the local date and time in Chorzów is <strong>24 February 2023, 13:00</strong>.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q2_usaaao_2023",
        id: "Q2",
        competition: "USAAAO",
        year: 2023,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.0 / 10.0",
        title: "Star Cluster Distance Modulus & Objective Focal Length",
        description: `A cluster has a radius of 2 parsecs. A Sun-like star in the cluster has an apparent magnitude of 10. When we look at the cluster with a telescope that has an eyepiece with an apparent field of view of 30 degrees, the cluster just fits within the eyepiece. If this telescope has an eyepiece of focal length 20 mm, what is the focal length of its objective lens?<br><br>
(a) 570 mm <br>
(b) 283 mm <br>
(c) 144 mm <br>
(d) 425 mm <br>
(e) 301 mm`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Combining photometric distance modulus with small-angle geometry and visual telescope magnification.</p>
<p><strong>Solution:</strong></p>
<p><strong>1. Distance to the Cluster (\\(d\\)):</strong></p>
<p>A Sun-like star has an absolute visual magnitude of \\(M_V \\approx 4.83\\). Using the distance modulus for \\(m = 10\\):</p>
<p>$$ m - M_V = 5\\log_{10}\\left(\\frac{d}{10\\text{ pc}}\\right) \\implies 10 - 4.83 = 5.17 = 5\\log_{10}\\left(\\frac{d}{10\\text{ pc}}\\right) $$</p>
<p>$$ d = 10 \\times 10^{5.17/5} \\approx 108.1\\text{ pc} $$</p>
<p><strong>2. True Angular Diameter of the Cluster (\\(\\theta\\)):</strong></p>
<p>With cluster radius \\(R = 2\\text{ pc}\\), its linear diameter is \\(D = 4\\text{ pc}\\). Subtended at distance \\(d = 108.1\\text{ pc}\\):</p>
<p>$$ \\theta = \\frac{D}{d} = \\frac{4\\text{ pc}}{108.1\\text{ pc}} \\approx 0.0370\\text{ rad} \\approx 2.12^\\circ $$</p>
<p><strong>3. Telescope Magnification & Objective Focal Length (\\(f_{\\text{obj}}\\)):</strong></p>
<p>For the cluster to just fill the eyepiece's apparent field of view (\\(\\text{AFOV} = 30^\\circ\\)):</p>
<p>$$ M = \\frac{\\text{AFOV}}{\\theta} = \\frac{f_{\\text{obj}}}{f_{\\text{eye}}} \\implies f_{\\text{obj}} = f_{\\text{eye}} \\frac{\\text{AFOV}}{\\theta} = 20\\text{ mm} \\times \\frac{30^\\circ}{2.12^\\circ} \\approx 283\\text{ mm} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q3_usaaao_2023",
        id: "Q3",
        competition: "USAAAO",
        year: 2023,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Earth-Moon Albedo & Brightness Ratio from Mars",
        description: `The radius of the Moon is about 4 times smaller than the radius of the Earth. The mean albedos of the Moon and the Earth are 0.12 and 0.36, respectively. The Mars Reconnaissance Orbiter took a picture of the Earth-Moon system. How many times brighter than the Moon did the Earth appear in the image?<br><br>
(a) \\(4/9\\) <br>
(b) \\(4/3\\) <br>
(c) \\(16/3\\) <br>
(d) 12 <br>
(e) 48`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Planetary reflected light flux scaling with geometric cross-section (\\(\\pi R^2\\)) and albedo (\\(A\\)).</p>
<p><strong>Solution:</strong></p>
<p>Because the Earth and the Moon are at virtually the same distance from the Sun and from the Mars Reconnaissance Orbiter (and share the same illumination phase angle), the reflected flux received from each body is directly proportional to the product of its albedo \\(A\\) and cross-sectional area \\(\\pi R^2\\):</p>
<p>$$ \\frac{F_{\\text{Earth}}}{F_{\\text{Moon}}} = \\frac{A_{\\text{Earth}}}{A_{\\text{Moon}}} \\left(\\frac{R_{\\text{Earth}}}{R_{\\text{Moon}}}\\right)^2 = \\frac{0.36}{0.12} \\times 4^2 = 3 \\times 16 = 48 $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q4_usaaao_2023",
        id: "Q4",
        competition: "USAAAO",
        year: 2023,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Solar Corona X-Ray Blackbody Peak",
        description: `The Sun has a surface temperature of about 6000 K and its blackbody emission peaks in the visible spectrum. Around the 1940s, astronomers found out that the Sun is a strong X-ray emitter. Today, it is understood that this emission comes from the solar corona where temperatures can reach on the order of \\(10^6\\text{ K}\\). Assuming the corona is a blackbody emitter, what wavelength would that emission peak at?<br><br>
(a) 2.9 nm <br>
(b) 2.9 \\(\\mu\\text{m}\\) <br>
(c) 2.9 mm <br>
(d) 2.9 m <br>
(e) 2.9 km`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Wien's Displacement Law for thermal blackbody radiation.</p>
<p><strong>Solution:</strong></p>
<p>By Wien's Displacement Law, the peak wavelength \\(\\lambda_{\\max}\\) of a blackbody at temperature \\(T = 10^6\\text{ K}\\) is:</p>
<p>$$ \\lambda_{\\max} = \\frac{b}{T} = \\frac{2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{10^6\\text{ K}} = 2.898 \\times 10^{-9}\\text{ m} \\approx 2.9\\text{ nm} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2023",
        id: "Q5",
        competition: "USAAAO",
        year: 2023,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Stellar Parallax of 61 Cygni",
        description: `Friedrich Bessel was the first person to quantitatively measure the annual change in stellar positions due to the motion of the Earth around the Sun. This change is known as stellar parallax. Bessel determined the stellar parallax for 61 Cygni to be about \\(1/3\\) arc-seconds. What is the distance to 61 Cygni from Earth?<br><br>
(a) \\(1/3\\) light years <br>
(b) 3 light years <br>
(c) \\(1/3\\) parsec <br>
(d) 3 parsecs <br>
(e) 3 kiloparsecs`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Definition of the parsec from annual trigonometric parallax.</p>
<p><strong>Solution:</strong></p>
<p>By definition, the distance \\(d\\) in parsecs is the reciprocal of the annual trigonometric parallax \\(p\\) in arcseconds:</p>
<p>$$ d(\\text{pc}) = \\frac{1}{p('')} = \\frac{1}{1/3} = 3\\text{ parsecs} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q6_usaaao_2023",
        id: "Q6",
        competition: "USAAAO",
        year: 2023,
        module: "T8",
        moduleName: "Stellar Remnants and General Relativity",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Neutron Star Blackbody Luminosity",
        description: `Compute the blackbody luminosity of a neutron star with its surface temperature at \\(10^6\\text{ K}\\) and radius \\(10^4\\text{ m}\\).<br><br>
(a) \\(0.1\\ L_\\odot\\) <br>
(b) \\(0.2\\ L_\\odot\\) <br>
(c) \\(0.3\\ L_\\odot\\) <br>
(d) \\(0.4\\ L_\\odot\\) <br>
(e) \\(0.5\\ L_\\odot\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Applying the Stefan-Boltzmann Law to a spherical compact remnant.</p>
<p><strong>Solution:</strong></p>
<p>Using the Stefan-Boltzmann Law with \\(R = 10^4\\text{ m}\\), \\(T = 10^6\\text{ K}\\), and \\(\\sigma = 5.670 \\times 10^{-8}\\text{ W m}^{-2}\\text{K}^{-4}\\):</p>
<p>$$ L = 4\\pi R^2 \\sigma T^4 = 4\\pi (10^4\\text{ m})^2 (5.670 \\times 10^{-8}\\text{ W m}^{-2}\\text{K}^{-4})(10^6\\text{ K})^4 \\approx 7.125 \\times 10^{25}\\text{ W} $$</p>
<p>Expressing this in terms of the solar luminosity \\(L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\):</p>
<p>$$ \\frac{L}{L_\\odot} = \\frac{7.125 \\times 10^{25}\\text{ W}}{3.828 \\times 10^{26}\\text{ W}} \\approx 0.186\\ L_\\odot \\approx 0.2\\ L_\\odot $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2023",
        id: "Q7",
        competition: "USAAAO",
        year: 2023,
        module: "T6",
        moduleName: "Interstellar Medium and Star Formation",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Absence of Balmer Absorption in the Cold ISM",
        description: `Fill in the blanks:<br>
The Balmer lines are a series of spectral lines of hydrogen. In the low-temperature interstellar medium, despite hydrogen being the most commonly occurring element in such an environment, the Balmer series is not observed as absorption lines. That happens because the transitions that require such a spectrum to appear as absorption lines correspond to transitions from the <strong>(1)</strong> ____ hydrogen level to higher states. In low-temperature environments, the <strong>(1)</strong> ____ level is <strong>(2)</strong> ____.<br><br>
(a) (1) \\(n = 1\\), (2) always occupied <br>
(b) (1) \\(n = 1\\), (2) never occupied <br>
(c) (1) \\(n = 2\\), (2) always occupied <br>
(d) (1) \\(n = 2\\), (2) never occupied <br>
(e) (1) \\(n = 3\\), (2) never occupied`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Boltzmann excitation equilibrium and atomic hydrogen energy levels in the cold interstellar medium.</p>
<p><strong>Solution:</strong></p>
<p>The Balmer series corresponds to electronic transitions between the first excited state (\\(n = 2\\)) and higher principal quantum levels (\\(n \\ge 3\\)). For Balmer <em>absorption</em> lines to form, hydrogen atoms must already have their electrons in the \\(n = 2\\) energy level (\\(10.2\\text{ eV}\\) above the \\(n = 1\\) ground state). In the cold interstellar medium (\\(T \\sim 10\\text{--}100\\text{ K}\\), where thermal energy \\(k_B T \\lesssim 10^{-2}\\text{ eV} \\ll 10.2\\text{ eV}\\)), the Boltzmann factor \\(e^{-\\Delta E / k_B T}\\) is vanishingly small, so virtually all neutral hydrogen atoms reside in the ground state (\\(n = 1\\)) and the \\(n = 2\\) level is effectively <strong>never occupied</strong>.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q8_usaaao_2023",
        id: "Q8",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.9 / 10.0",
        title: "Comet Fragmentation Escape",
        description: `A comet passes near the Sun on a parabolic orbit. While it's passing near the Sun with orbital velocity \\(V\\), the Sun's heat causes the comet to melt, and it shatters into many small fragments. The fragments move away uniformly in all directions (in the comet's reference frame) with velocity \\(v \\ll V\\). What fraction of the fragments will escape the solar system? Ignore any forces other than the Sun's gravity.<br><br>
(a) 0% <br>
(b) 50% <br>
(c) 100% <br>
(d) \\( \\frac{v}{V} \\) <br>
(e) \\( 1 - \\frac{v}{V} \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q08_USAAAO_2023.png" alt="Comet Fragmentation Escape Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: For a comet on a parabolic orbit, its velocity \\(V\\) is exactly equal to the local escape velocity. For fragments to escape the solar system, their new total velocity relative to the Sun must be greater than or equal to \\(V\\).</p>
<p><strong>Step 1: Apply the Law of Cosines</strong></p>
<p>Let \\(\\theta\\) be the angle between the comet's original velocity vector \\(\\vec{V}\\) and the fragment's ejection velocity vector \\(\\vec{v}\\). Using the law of cosines for vector addition, the new squared speed \\(v_{new}^2\\) is:</p>
<p>$$ v_{new}^2 = V^2 + v^2 + 2vV \\cos\\theta $$</p>
<p><strong>Step 2: Solve the Escape Inequality</strong></p>
<p>For the fragment to escape, we require \\(v_{new}^2 \\ge V^2\\):</p>
<p>$$ V^2 + v^2 + 2vV \\cos\\theta \\ge V^2 \\implies \\cos\\theta \\ge -\\frac{v}{2V} $$</p>
<p><strong>Step 3: Analyze the Limit</strong></p>
<p>Since \\(v \\ll V\\), the ratio \\(-\\frac{v}{2V} \\to 0\\), so \\(\\cos\\theta \\ge 0\\) (the forward-facing hemisphere). Thus, 50% of the fragments escape.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2023",
        id: "Q9",
        competition: "USAAAO",
        year: 2023,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Galaxy Mass Calculation",
        description: `Consider Galaxies A and B, both of which have radius \\(R\\). At a distance \\(R\\) from its center, Galaxy A's rotational velocity is equal to \\(v\\). Meanwhile, Galaxy B's radial velocity dispersion is also equal to \\(v\\). However, galaxy A is spiral while galaxy B is spherical elliptical and composed of uniform, evenly-spaced stars. Calculate the masses of both galaxies. (Answer choices are listed as \\(m_A\\); \\(m_B\\)).<br><br>
(a) \\( v^2R/G \\) ; \\( v^2R/G \\) <br>
(b) \\( v^2R/G \\) ; \\( 5/6 v^2R/G \\) <br>
(c) \\( v^2R/G \\) ; \\( 5/4 v^2R/G \\) <br>
(d) \\( v^2R/G \\) ; \\( 5v^2R/G \\) <br>
(e) \\( 5/2 v^2R/G \\) ; \\( v^2R/G \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q09_USAAAO_2023.png" alt="Galaxy Mass Calculation Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Mass derivation from dynamics. For a spiral galaxy, the mass is derived using circular motion. For an elliptical galaxy, the mass is derived using the Virial Theorem.</p>
<p><strong>Step 1: Mass of Galaxy A (Spiral)</strong></p>
<p>$$ \\frac{v^2}{R} = \\frac{GM_A}{R^2} \\implies M_A = \\frac{v^2 R}{G} $$</p>
<p><strong>Step 2: Mass of Galaxy B (Elliptical)</strong></p>
<p>For an isotropic 3D velocity dispersion \\(\\sigma_{3D}^2 = 3v^2\\), the total kinetic energy is \\(K = \\frac{1}{2}M_B(3v^2) = \\frac{3}{2}M_B v^2\\), and the self-gravitational potential energy of a uniform sphere is \\(U = -\\frac{3}{5}\\frac{GM_B^2}{R}\\). By the Virial Theorem (\\(2K + U = 0\\)):</p>
<p>$$ 3 M_B v^2 = \\frac{3}{5} \\frac{GM_B^2}{R} \\implies M_B = \\frac{5 v^2 R}{G} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2023",
        id: "Q10",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.1 / 10.0",
        title: "Free-Fall to Venus",
        description: `Consider a satellite that has a circular orbit with a radius of \\(6.0 \\times 10^8\\) m around Venus. Due to a failure in its ignition system, the satellite's orbital velocity was suddenly decreased to zero during a maneuver. How long does the satellite take to hit the surface of the planet? Consider that the mass of Venus is \\(4.67 \\times 10^{24}\\) kg and neglect any gravitational effects on the satellite other than that from Venus.<br><br>
(a) 15 hours.<br>
(b) 3 days.<br>
(c) 11 days.<br>
(d) 25 days.<br>
(e) 37 days.`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q10_USAAAO_2023.png" alt="Free-Fall to Venus Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Radial free-fall time modeled as half the period of a degenerate Keplerian ellipse with semi-major axis \\(a = R_0 / 2\\).</p>
<p><strong>Step 1: Identify Degenerate Orbit Parameters</strong></p>
<p>$$ a = \\frac{R_0}{2} = \\frac{6.0 \\times 10^8\\text{ m}}{2} = 3.0 \\times 10^8 \\text{ m} $$</p>
<p><strong>Step 2: Calculate the Fall Time</strong></p>
<p>$$ t_{fall} = \\frac{P}{2} = \\pi \\sqrt{\\frac{a^3}{GM}} = \\pi \\sqrt{\\frac{(3.0 \\times 10^8)^3}{(6.674 \\times 10^{-11})(4.67 \\times 10^{24})}} \\approx 2.92 \\times 10^6 \\text{ s} \\approx 33.8\\text{ days} $$</p>
<p><em>(Note: In the official USAAAO key, the factor of \\(\\pi\\) was omitted when evaluating \\(\\sqrt{a^3/GM} \\approx 9.31 \\times 10^5\\text{ s} \\approx 10.8\\text{ days} \\approx 11\\text{ days}\\), choice (c).)</em></p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q11_usaaao_2023",
        id: "Q11",
        competition: "USAAAO",
        year: 2023,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Main-Sequence Proton-Proton Chain Lifetime",
        description: `Consider a main-sequence star with mass \\(M = 9.1 \\times 10^{29}\\text{ kg}\\), which is sustained through the proton-proton chain reaction operating with \\(\\epsilon = 0.7\\%\\) mass-to-energy efficiency. The hydrogen and helium mass fractions of this star are \\(f_{\\text{H}} = 0.71\\) and \\(f_{\\text{He}} = 0.22\\) at the beginning of its lifetime. Assume this star has solar luminosity and that all hydrogen can be used for fusion. Calculate the lifetime of this star.<br><br>
(a) \\(3.3 \\times 10^{17}\\text{ s}\\) <br>
(b) \\(1.1 \\times 10^{18}\\text{ s}\\) <br>
(c) \\(1.5 \\times 10^{18}\\text{ s}\\) <br>
(d) \\(1.5 \\times 10^{20}\\text{ s}\\) <br>
(e) \\(2.2 \\times 10^{22}\\text{ s}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Nuclear timescale of a star derived from total available fusion rest-mass energy divided by bolometric luminosity.</p>
<p><strong>Solution:</strong></p>
<p>The total initial mass of hydrogen available for fusion is \\(M_{\\text{H}} = f_{\\text{H}} M\\). With mass-energy conversion efficiency \\(\\epsilon = 0.007\\), the total nuclear energy reservoir is:</p>
<p>$$ E_{\\text{nuc}} = \\epsilon f_{\\text{H}} M c^2 = (0.007)(0.71)(9.1 \\times 10^{29}\\text{ kg})(2.998 \\times 10^8\\text{ m/s})^2 \\approx 4.065 \\times 10^{44}\\text{ J} $$</p>
<p>Dividing by the solar luminosity \\(L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\):</p>
<p>$$ \\tau = \\frac{E_{\\text{nuc}}}{L_\\odot} = \\frac{4.065 \\times 10^{44}\\text{ J}}{3.828 \\times 10^{26}\\text{ W}} \\approx 1.06 \\times 10^{18}\\text{ s} \\approx 1.1 \\times 10^{18}\\text{ s} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q12_usaaao_2023",
        id: "Q12",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.8 / 10.0",
        title: "Time Segment of an Elliptical Orbit",
        description: `A planet is in an elliptical orbit around a star. Let \\(r_{min}\\) be the minimum distance between the planet and star, and let \\(r_{max}\\) be the maximum distance between the planet and star. Suppose that \\(r_{max} = 4r_{min}\\). During what percentage of the time period of each orbit is the planet at least \\(\\frac{5}{2}r_{min}\\) away from the star?<br><br>
(a) 23% <br>
(b) 50% <br>
(c) 57% <br>
(d) 69% <br>
(e) 77%`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q12_USAAAO_2023.png" alt="Time Segment of an Elliptical Orbit Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Time spent on a segment of an elliptical orbit via Eccentric Anomaly (\\(E\\)) and Kepler's Equation (\\(M = E - e\\sin E\\)).</p>
<p><strong>Step 1: Find Eccentricity and Semi-Major Axis</strong></p>
<p>From \\(a(1+e) = 4a(1-e)\\), we find \\(e = 0.6\\) and \\(r_{min} = 0.4a\\), so \\(\\frac{5}{2}r_{min} = a\\).</p>
<p><strong>Step 2: Eccentric and Mean Anomaly</strong></p>
<p>Since \\(r = a(1 - e\\cos E) \\ge a \\iff \\cos E \\le 0\\), this corresponds to \\(E \\in [\\pi/2, 3\\pi/2]\\). By Kepler's Equation, the elapsed mean anomaly is:</p>
<p>$$ \\Delta M = \\left(\\frac{3\\pi}{2} + e\\right) - \\left(\\frac{\\pi}{2} - e\\right) = \\pi + 2e $$</p>
<p>$$ \\text{Fraction} = \\frac{\\pi + 2(0.6)}{2\\pi} = 0.5 + \\frac{0.6}{\\pi} \\approx 0.691 = 69\\% $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2023",
        id: "Q13",
        competition: "USAAAO",
        year: 2023,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Exoplanet Radius from Transit Magnitude Depth",
        description: `The apparent magnitude of a star of radius \\(0.41R_\\odot\\) as observed from Earth appears to fluctuate by 0.037. That is, the difference between the maximum and minimum apparent magnitudes is 0.037. This fluctuation is caused by an exoplanet that orbits the star. Determine the radius of the exoplanet.<br><br>
(a) \\(0.075R_\\odot\\) <br>
(b) \\(0.079R_\\odot\\) <br>
(c) \\(0.085R_\\odot\\) <br>
(d) \\(0.098R_\\odot\\) <br>
(e) \\(0.12R_\\odot\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Exoplanet transit photometry; relating apparent magnitude drop \\(\\Delta m\\) to the planet-to-star radius ratio.</p>
<p><strong>Solution:</strong></p>
<p>Using Pogson's relation for the fractional flux drop during transit:</p>
<p>$$ \\Delta m = -2.5\\log_{10}\\left[1 - \\left(\\frac{R_p}{R_*}\\right)^2\\right] = 0.037 $$</p>
<p>$$ 1 - \\left(\\frac{R_p}{R_*}\\right)^2 = 10^{-0.037 / 2.5} = 10^{-0.0148} \\approx 0.96650 $$</p>
<p>$$ \\frac{R_p}{R_*} = \\sqrt{1 - 0.96650} \\approx 0.1830 $$</p>
<p>Multiplying by the stellar radius \\(R_* = 0.41 R_\\odot\\):</p>
<p>$$ R_p = 0.1830 \\times 0.41 R_\\odot \\approx 0.075 R_\\odot $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q14_usaaao_2023",
        id: "Q14",
        competition: "USAAAO",
        year: 2023,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Maximum Mass of First-Generation Stars Alive Today",
        description: `An empirically determined approximate formula for the lifetime of a star is given by:
$$ T = \\left(\\frac{M_\\odot}{M}\\right)^{2.5} \\cdot 10^{10}\\text{ years} $$
where \\(T\\) is the stellar lifetime and \\(M\\) is the mass of the star. If the very first stars in the universe formed approximately 400 million years after the Big Bang, what is the most massive such star that could still exist today?<br><br>
(a) \\(3.6M_\\odot\\) <br>
(b) \\(2.0M_\\odot\\) <br>
(c) \\(1.3M_\\odot\\) <br>
(d) \\(0.89M_\\odot\\) <br>
(e) \\(0.75M_\\odot\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Main-sequence stellar lifetime scaling and cosmic lookback time.</p>
<p><strong>Solution:</strong></p>
<p>Taking the age of the universe as \\(t_0 \\approx 13.8 \\times 10^9\\text{ years}\\), a star formed \\(400\\text{ Myr}\\) after the Big Bang must have a lifetime of at least:</p>
<p>$$ T = 13.8 \\times 10^9 - 0.4 \\times 10^9 = 13.4 \\times 10^9\\text{ years} = 1.34 \\times 10^{10}\\text{ years} $$</p>
<p>Solving the lifetime relation for \\(M\\):</p>
<p>$$ \\left(\\frac{M_\\odot}{M}\\right)^{2.5} = 1.34 \\implies M = (1.34)^{-1/2.5} M_\\odot = (1.34)^{-0.4} M_\\odot \\approx 0.89 M_\\odot $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q15_usaaao_2023",
        id: "Q15",
        competition: "USAAAO",
        year: 2023,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Relativistic Light Sail Proper Time to Alpha Centauri",
        description: `With the technology currently available, it would take hundreds of millennia to send a human-made object to other stars. A possible solution to this problem is to use relativistic light sails, which consist of very small probes propelled by radiation pressure. It is estimated that in the reference frame of an Earth observer, these sails would take 20.0 years to reach Alpha Centauri, which is 4.37 light-years away from the Solar System. The velocity of a light sail can be assumed to be constant throughout the entire trip. How long would this trip be in the reference frame of the light sail?<br><br>
(a) 18.5 years <br>
(b) 19.0 years <br>
(c) 19.5 years <br>
(d) 20.0 years <br>
(e) 20.5 years`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Special relativistic time dilation and spacetime interval invariance.</p>
<p><strong>Solution:</strong></p>
<p>In the Earth observer's inertial frame, the coordinate travel time is \\(\\Delta t = 20.0\\text{ years}\\) over a distance \\(\\Delta x = 4.37\\text{ ly}\\), giving a speed of \\(\\beta = \\frac{v}{c} = \\frac{4.37}{20.0} = 0.2185\\). By invariance of the spacetime interval (or time dilation \\(\\Delta\\tau = \\Delta t / \\gamma\\)), the proper time elapsed on the light sail is:</p>
<p>$$ \\Delta\\tau = \\Delta t \\sqrt{1 - \\beta^2} = \\sqrt{(20.0\\text{ yr})^2 - (4.37\\text{ yr})^2} = \\sqrt{400 - 19.097} = \\sqrt{380.903} \\approx 19.52\\text{ years} \\approx 19.5\\text{ years} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2023",
        id: "Q16",
        competition: "USAAAO",
        year: 2023,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.7 / 10.0",
        title: "Blind Sky Map Constellation Identification",
        description: `A wide-field southern/equatorial star chart displays the Milky Way running through Centaurus (with \\(\\alpha\\) and \\(\\beta\\) Centauri prominent near the right), Crux at the bottom-right, Lupus and Libra in the upper-right/center, and Virgo (with Spica) toward the left. Which of the following constellations is NOT on this sky map?<br><br>
(a) Virgo <br>
(b) Crux <br>
(c) Lupus <br>
(d) Libra <br>
(e) Corona Borealis`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Naked-eye constellation recognition and southern/equatorial celestial coordinates.</p>
<p><strong>Solution:</strong></p>
<p>Inspecting the star field:</p>
<ul>
    <li>Along the Milky Way band on the right are the two bright pointer stars <strong>\\(\\alpha\\) and \\(\\beta\\) Centauri</strong>, pointing directly toward <strong>Crux</strong> at the bottom right.</li>
    <li>North-east (above and to the left) of Centaurus lie <strong>Lupus</strong> and <strong>Libra</strong>, while <strong>Virgo</strong> (anchored by first-magnitude Spica, \\(\\alpha\\) Vir, at \\(\\delta \\approx -11^\\circ\\)) occupies the left side of the chart.</li>
    <li><strong>Corona Borealis</strong> is a northern hemisphere constellation located at declination \\(\\delta \\approx +26^\\circ\\text{ to }+39^\\circ\\) between Boötes and Hercules, well outside the southern declination bounds of this chart.</li>
</ul>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q17_18_usaaao_2023",
        id: "Q17-18",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3.3 / 10.0",
        title: "Spherical Excess & Conic Gnomon Shadow Paths",
        description: `<strong>17.</strong> The fictional towns of Baia and Caia are located at \\((66.56^\\circ\\text{ N}, 67.55^\\circ\\text{ E})\\) and \\((\\phi, 18.95^\\circ\\text{ E})\\), respectively. It is known that the spherical triangle with vertices at Baia, Caia, and the North Pole covers \\(6.75\\%\\) of Earth's surface. Compute \\(\\phi\\).<br>
(a) \\(66.56^\\circ\\text{ N}\\) &nbsp; (b) \\(55.25^\\circ\\text{ N}\\) &nbsp; (c) \\(23.44^\\circ\\text{ N}\\) &nbsp; (d) \\(55.25^\\circ\\text{ S}\\) &nbsp; (e) \\(66.56^\\circ\\text{ S}\\)<br><br>
<strong>18.</strong> Now suppose that Lucas is standing still in Baia (from the previous question), and Justin is standing still on the equator. Let \\(P_{L1}\\) and \\(P_{J1}\\) be the paths of Lucas's and Justin's shadows on the summer solstice, respectively. Let \\(P_{L2}\\) and \\(P_{J2}\\) be the paths of Lucas's and Justin's shadows on the vernal equinox, respectively. Given Earth's obliquity \\(\\epsilon = 23.44^\\circ\\), which of the following is the most specific accurate description of the shapes of each path?<br>
(a) \\(P_{L1}\\): Parabola, \\(P_{J1}\\): Hyperbola, \\(P_{L2}\\): Line, \\(P_{J2}\\): Line <br>
(b) \\(P_{L1}\\): Parabola, \\(P_{J1}\\): Hyperbola, \\(P_{L2}\\): Hyperbola, \\(P_{J2}\\): Line <br>
(c) \\(P_{L1}\\): Parabola, \\(P_{J1}\\): Parabola, \\(P_{L2}\\): Line, \\(P_{J2}\\): Line <br>
(d) \\(P_{L1}\\): Hyperbola, \\(P_{J1}\\): Parabola, \\(P_{L2}\\): Hyperbola, \\(P_{J2}\\): Line <br>
(e) \\(P_{L1}\\): Hyperbola, \\(P_{J1}\\): Parabola, \\(P_{L2}\\): Line, \\(P_{J2}\\): Line`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Girard's spherical excess theorem (Cagnoli's cotangent identity) and conic sections traced by a vertical gnomon's shadow across latitudes.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 17:</strong> By Girard's theorem, the fractional area of a spherical triangle with spherical excess \\(E\\) is \\(\\frac{E}{4\\pi} = \\frac{E^\\circ}{720^\\circ}\\). Setting this equal to \\(0.0675\\):</p>
<p>$$ E = 0.0675 \\times 720^\\circ = 48.60^\\circ $$</p>
<p>Notice that the interior angle at the North Pole vertex is \\(C = \\Delta\\lambda = 67.55^\\circ - 18.95^\\circ = 48.60^\\circ = E\\). Using Cagnoli's formula relating the spherical excess \\(E\\) to the two colatitude sides \\(a = 90^\\circ - \\phi_B\\), \\(b = 90^\\circ - \\phi_C\\), and included angle \\(C\\):</p>
<p>$$ \\cot\\left(\\frac{E}{2}\\right) = \\frac{\\cot(a/2)\\cot(b/2) + \\cos C}{\\sin C} $$</p>
<p>Since \\(E = C\\), multiplying by \\(\\sin C = 2\\sin(C/2)\\cos(C/2)\\) gives \\(2\\cos^2(C/2) - \\cos C = 1 = \\cot(a/2)\\cot(b/2)\\), which requires \\(a + b = 180^\\circ\\). Therefore:</p>
<p>$$ (90^\\circ - 66.56^\\circ) + (90^\\circ - \\phi) = 180^\\circ \\implies \\phi = -66.56^\\circ = 66.56^\\circ\\text{ S} $$</p>
<p><strong>Part 18:</strong> As the Sun moves along its diurnal circle of declination \\(\\delta\\), solar rays passing the tip of a vertical gnomon form a circular cone of half-angle \\(\\alpha = 90^\\circ - |\\delta|\\) whose axis is inclined at angle \\(|\\phi|\\) to the horizontal ground:</p>
<ul>
    <li><strong>On the Vernal Equinox (\\(\\delta = 0^\\circ\\)):</strong> The cone flattens into the equatorial plane, which intersects the horizontal ground plane in a straight <strong>Line</strong> at every non-polar latitude (\\(P_{L2} = \\text{Line},\\ P_{J2} = \\text{Line}\\)).</li>
    <li><strong>On the Summer Solstice (\\(\\delta = +23.44^\\circ\\)):</strong> In Baia (at the Arctic Circle, \\(\\phi_B = 66.56^\\circ\\text{ N} = 90^\\circ - \\delta\\)), the Sun grazes the horizon at midnight, so the horizontal ground plane is parallel to a generator of the cone and cuts it in a <strong>Parabola</strong> (\\(P_{L1} = \\text{Parabola}\\)). At the equator (\\(\\phi_J = 0^\\circ < 90^\\circ - \\delta\\)), the horizontal plane cuts both nappes of the cone, forming a <strong>Hyperbola</strong> (\\(P_{J1} = \\text{Hyperbola}\\)).</li>
</ul>
<p><strong>Answers:</strong><br>17. <strong>(e)</strong><br>18. <strong>(a)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2023",
        id: "Q19",
        competition: "USAAAO",
        year: 2023,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.2 / 10.0",
        title: "Radial Velocity and Exoplanet Mass",
        description: `In 1995, researchers at the University of Geneva discovered an exoplanet in the main-sequence star 51 Pegasi. This was the first-ever discovery of an exoplanet orbiting a Sun-like star! When they observed the star, a periodic Doppler shifting of its stellar spectrum indicated that its radial velocity was varying sinusoidally; this wobbling could be explained if the star was being pulled in a circle by the gravity of an exoplanet. The radial velocity sinusoid of 51 Pegasi was measured to have a semi-amplitude of 56 m/s with a period of 4.2 days, and the mass of the star is known to be \\(1.1 M_\\odot\\). Assuming that the researchers at Geneva viewed the planet's orbit edge-on and that the orbit was circular, what is the mass of the exoplanet in Jupiter masses?<br><br>
(a) \\( 0.81 M_J \\) <br>
(b) \\( 0.75 M_J \\) <br>
(c) \\( 0.69 M_J \\) <br>
(d) \\( 0.47 M_J \\) <br>
(e) \\( 0.33 M_J \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q19_USAAAO_2023.png" alt="Radial Velocity and Exoplanet Mass Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Exoplanet mass determination using the radial velocity method, where the star is pulled into a small reflex orbit.</p>
<p><strong>Step 1: The Radial Velocity Equation</strong></p>
<p>For a circular orbit viewed edge-on (\\(i = 90^\\circ\\)) with \\(m_p \\ll M_*\\), the semi-amplitude \\(K\\) of the star's radial velocity is:</p>
<p>$$ K \\approx \\left(\\frac{2\\pi G}{P}\\right)^{1/3} m_p M_*^{-2/3} \\implies m_p = K M_*^{2/3} \\left(\\frac{P}{2\\pi G}\\right)^{1/3} $$</p>
<p><strong>Step 2: Numerical Evaluation</strong></p>
<p>With \\(K = 56\\text{ m/s}\\), \\(P = 4.2\\text{ days} = 362,880\\text{ s}\\), and \\(M_* = 1.1 M_\\odot \\approx 2.188 \\times 10^{30}\\text{ kg}\\):</p>
<p>$$ m_p = 56 \\times (2.188 \\times 10^{30})^{2/3} \\times \\left(\\frac{362880}{2\\pi \\times 6.674 \\times 10^{-11}}\\right)^{1/3} \\approx 8.99 \\times 10^{26}\\text{ kg} $$</p>
<p>Dividing by \\(M_J \\approx 1.898 \\times 10^{27}\\text{ kg}\\) gives \\(m_p \\approx 0.474\\ M_J \\approx 0.47\\ M_J\\).</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2023",
        id: "Q20",
        competition: "USAAAO",
        year: 2023,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Electromagnetic Wave Intensity vs. Frequency",
        description: `Suppose that an astronomer detects an electromagnetic wave of frequency \\(\\nu\\). Some time later, another wave with the same amplitude is received, but now with a frequency \\(2\\nu\\). In order to calibrate the apparatus and do the necessary calculations, the astronomer decided to calculate the intensity of the second signal relative to the first. Considering that they both came from the same place, what value did the astronomer obtain?<br><br>
(a) \\(1/4\\) <br>
(b) \\(1/2\\) <br>
(c) 1 <br>
(d) 2 <br>
(e) 4`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Time-averaged Poynting flux of an electromagnetic wave vs. classical harmonic wave energy flux.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Classical Electrodynamics (Electric Field Amplitude \\(E_0\\)):</strong> The intensity (time-averaged Poynting vector magnitude) of a plane electromagnetic wave in vacuum is:
    $$ I = \\langle S \\rangle = \\frac{1}{2} c \\varepsilon_0 E_0^2 $$
    Because \\(I\\) depends strictly on the square of the electric field amplitude \\(E_0\\) and is independent of frequency \\(\\nu\\), two electromagnetic waves with the same electric field amplitude \\(E_0\\) have an intensity ratio of <strong>1</strong> (choice <strong>(c)</strong>).</li>
    <li><strong>Harmonic Displacement / Vector Potential Amplitude (\\(A_0\\)):</strong> If "amplitude" refers to a classical oscillator displacement or magnetic vector potential \\(A_0\\) (where \\(E_0 = \\omega A_0 = 2\\pi\\nu A_0\\)), then \\(I \\propto \\nu^2 A_0^2\\), which yields a ratio of \\(2^2 = 4\\) (choice <strong>(e)</strong>).</li>
</ul>
<p><strong>Answer: (c) [or (e) under displacement-amplitude convention]</strong></p>`
    },
    {
        uniqueId: "q21_usaaao_2023",
        id: "Q21",
        competition: "USAAAO",
        year: 2023,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Binary Mass from Astrometry",
        description: `Consider the binary system Kepler-16, which has the primary star Kepler-16A and the secondary star Kepler-16B. It has an orbital period \\(P = 41.08\\) days and the measured parallax is \\(p = 13.29\\) mas. Calculate the total mass of the stars, using the fact that their maximum angular separation measured from Earth is \\(\\theta = 2.98\\) mas and they are on an edge-on orbit.<br><br>
(a) \\( 0.756 M_\\odot \\) <br>
(b) \\( 0.803 M_\\odot \\) <br>
(c) \\( 0.891 M_\\odot \\) <br>
(d) \\( 0.987 M_\\odot \\) <br>
(e) \\( 1.326 M_\\odot \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q21_USAAAO_2023.png" alt="Binary Mass from Astrometry Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Determining the total mass of a binary system using Kepler's Third Law combined with visual binary astrometry (angular separation and parallax).</p>
<p><strong>Step 1: Calculate the Physical Semi-Major Axis</strong></p>
<p>$$ a \\text{ (in AU)} = \\frac{\\theta}{p} = \\frac{2.98\\text{ mas}}{13.29\\text{ mas}} \\approx 0.2242 \\text{ AU} $$</p>
<p><strong>Step 2: Apply Kepler's Third Law</strong></p>
<p>With \\(P = \\frac{41.08}{365.25} \\approx 0.1125\\text{ yr}\\):</p>
<p>$$ M_{tot} = \\frac{a^3}{P^2} = \\frac{(0.2242)^3}{(0.1125)^2} \\approx 0.891 M_\\odot $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q22_usaaao_2023",
        id: "Q22",
        competition: "USAAAO",
        year: 2023,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Habitable Zone Eccentricity",
        description: `The habitable zone of a star is defined as the one where water in the liquid state can exist on the surface of a planet. Therefore, considering that the planets are ideal black bodies with fast rotation, determine the maximum eccentricity that the orbit of a planet can have so that it can be home to life. Ignore any thermodynamic effects that might happen in the atmosphere or the sidereal space. Consider that the melting point of water is 273 K and the boiling point is 373 K.<br><br>
(a) 0.274 <br>
(b) 0.302 <br>
(c) 0.316 <br>
(d) 0.328 <br>
(e) 0.540`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q22_USAAAO_2023.png" alt="Habitable Zone Eccentricity Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Planetary equilibrium temperature (\\(T \\propto r^{-1/2}\\)) and orbital eccentricity bounds within the Habitable Zone.</p>
<p><strong>Solution:</strong></p>
<p>Since \\(T \\propto r^{-1/2} \\implies r \\propto T^{-2}\\), keeping the planet between \\(T_{min} = 273\\text{ K}\\) at aphelion and \\(T_{max} = 373\\text{ K}\\) at perihelion requires:</p>
<p>$$ \\frac{r_{max}}{r_{min}} = \\frac{1 + e}{1 - e} = \\left(\\frac{T_{max}}{T_{min}}\\right)^2 = \\left(\\frac{373}{273}\\right)^2 \\approx 1.8668 $$</p>
<p>Solving for \\(e\\):</p>
<p>$$ e = \\frac{1.8668 - 1}{1.8668 + 1} \\approx 0.302 $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q23_usaaao_2023",
        id: "Q23",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Polar Day Duration on a High-Obliquity Earth",
        description: `Billions of years from now, as the Moon moves farther away from the Earth, the Earth's axial tilt may become unstable. Imagine the Earth's tilt is such that the angle between the celestial equator and the ecliptic is \\(60^\\circ\\), rather than the current \\(23.44^\\circ\\), so the Arctic Circle is now as far south as \\(30^\\circ\\text{ North}\\). For an observer at \\(40^\\circ\\text{ North}\\), how many days out of the year would the Sun never set (also known as the "polar day")? (Ignore atmospheric refraction, and assume the Earth's orbit is circular and nothing else has changed from today.)<br><br>
(a) 28 <br>
(b) 56 <br>
(c) 61 <br>
(d) 67 <br>
(e) 113`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Circumpolar solar declination threshold (\\(\\delta_\\odot \\ge 90^\\circ - \\phi\\)) and spherical relation between ecliptic longitude and solar declination.</p>
<p><strong>Solution:</strong></p>
<p>At latitude \\(\\phi = 40^\\circ\\text{ N}\\), the Sun is circumpolar (never sets) whenever its declination satisfies:</p>
<p>$$ \\delta_\\odot \\ge 90^\\circ - \\phi = 50^\\circ $$</p>
<p>From the right spherical triangle formed by the ecliptic and celestial equator with obliquity \\(\\varepsilon = 60^\\circ\\), the Sun's declination as a function of ecliptic longitude \\(\\lambda_\\odot\\) is:</p>
<p>$$ \\sin\\delta_\\odot = \\sin\\varepsilon \\sin\\lambda_\\odot $$</p>
<p>Setting \\(\\delta_\\odot \\ge 50^\\circ\\):</p>
<p>$$ \\sin\\lambda_\\odot \\ge \\frac{\\sin(50^\\circ)}{\\sin(60^\\circ)} = \\frac{0.76604}{0.86603} \\approx 0.88455 \\implies \\lambda_1 = \\arcsin(0.88455) \\approx 62.20^\\circ $$</p>
<p>The Sun remains above \\(\\delta_\\odot = 50^\\circ\\) from \\(\\lambda_1 = 62.20^\\circ\\) to \\(\\lambda_2 = 180^\\circ - 62.20^\\circ = 117.80^\\circ\\), spanning an orbital angle of:</p>
<p>$$ \\Delta\\lambda = 117.80^\\circ - 62.20^\\circ = 55.60^\\circ $$</p>
<p>For a uniform circular orbit of period \\(365.25\\text{ days}\\), the number of polar days is:</p>
<p>$$ \\Delta t = \\frac{55.60^\\circ}{360^\\circ} \\times 365.25\\text{ days} \\approx 56.4\\text{ days} \\approx 56\\text{ days} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q24_usaaao_2023",
        id: "Q24",
        competition: "USAAAO",
        year: 2023,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Parabolic Mirror Newtonian Telescope Focal Ratio",
        description: `Erez is designing a Newtonian telescope! The equation of the primary mirror is \\(y = x^2 / 36\\text{ m} - 1\\text{ m}\\) and the telescope tube intersects the mirror at \\(y = 0\\). What is the f-number (focal ratio) of the telescope?<br><br>
(a) \\(f/0.75\\) <br>
(b) \\(f/1.00\\) <br>
(c) \\(f/1.25\\) <br>
(d) \\(f/1.33\\) <br>
(e) \\(f/1.75\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Parabolic reflector geometry (\\(y - y_0 = \\frac{x^2}{4f}\\)) and optical focal ratio (\\(N = f/D\\)).</p>
<p><strong>Solution:</strong></p>
<p>The standard equation of a parabola with focal length \\(f\\) and vertex at \\((0, -1\\text{ m})\\) is:</p>
<p>$$ y + 1 = \\frac{x^2}{4f} $$</p>
<p>Comparing this with \\(y + 1 = \\frac{x^2}{36\\text{ m}}\\) gives \\(4f = 36\\text{ m} \\implies f = 9\\text{ m}\\).</p>
<p>The rim of the mirror lies at \\(y = 0\\), where:</p>
<p>$$ \\frac{x^2}{36} - 1 = 0 \\implies x = \\pm 6\\text{ m} $$</p>
<p>Thus, the mirror's aperture diameter is \\(D = 2|x| = 12\\text{ m}\\). The focal ratio (f-number) is:</p>
<p>$$ N = \\frac{f}{D} = \\frac{9\\text{ m}}{12\\text{ m}} = 0.75 \\implies f/0.75 $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q25_usaaao_2023",
        id: "Q25",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Overlap of Tropical and Frigid Planetary Zones",
        description: `Consider a hypothetical planet orbiting the Sun with an obliquity angle \\(i\\) (angle between the axis of rotation and the normal to the orbital plane). Assume that a year is much longer than a day for this planet. Define a <em>tropical region</em> on the planet as one where the Sun reaches the zenith at some time in its revolution period. Define a <em>frigid region</em> on the planet as one where there is a day when the Sun never rises. What is the minimum value of \\(i\\) for which there is a location on the planet which is both tropical and frigid?<br><br>
(a) \\(0^\\circ\\) <br>
(b) \\(30^\\circ\\) <br>
(c) \\(45^\\circ\\) <br>
(d) \\(60^\\circ\\) <br>
(e) \\(90^\\circ\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Latitudinal boundaries of the Tropics (\\(|\\phi| \\le i\\)) and Polar Circles (\\(|\\phi| \\ge 90^\\circ - i\\)).</p>
<p><strong>Solution:</strong></p>
<ul>
    <li>A location is in the <strong>tropical region</strong> if its latitude \\(\\phi\\) satisfies \\(|\\phi| \\le i\\).</li>
    <li>A location is in the <strong>frigid region</strong> if its latitude \\(\\phi\\) lies poleward of the polar circle: \\(|\\phi| \\ge 90^\\circ - i\\).</li>
</ul>
<p>For a latitude \\(\\phi\\) to belong to both regions simultaneously, we require:</p>
<p>$$ 90^\\circ - i \\le |\\phi| \\le i \\implies 2i \\ge 90^\\circ \\implies i \\ge 45^\\circ $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2023",
        id: "Q26",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Grazing Comet Hyperbola",
        description: `A comet is approaching our solar system from the depths of space with a velocity of 10000 m/s, and if it continues moving in a straight line on its current trajectory, it will just barely graze the surface of the Sun! What is the eccentricity of the comet's orbit?<br><br>
(a) 1.00014 <br>
(b) 1.000014 <br>
(c) 1.0000014 <br>
(d) 1.00000014 <br>
(e) 1.000000014`,
        solutionHtml: `<img src="assets/img/USAAAO_2023/Q26_USAAAO_2023.png" alt="Grazing Comet Hyperbola Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Hyperbolic orbit geometry based on impact parameters and asymptotes.</p>
<p><strong>Solution:</strong></p>
<p>The impact parameter is \\(b = R_\\odot\\), and the hyperbolic semi-major axis is \\(a = \\frac{\\mu}{v_\\infty^2}\\). Using \\(b = a\\sqrt{e^2 - 1}\\):</p>
<p>$$ e = \\sqrt{1 + \\left(\\frac{R_\\odot v_\\infty^2}{GM_\\odot}\\right)^2} \\approx 1 + \\frac{1}{2}\\left(\\frac{(6.957 \\times 10^8)(10^4)^2}{1.327 \\times 10^{20}}\\right)^2 \\approx 1 + 1.37 \\times 10^{-7} \\approx 1.00000014 $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2023",
        id: "Q27",
        competition: "USAAAO",
        year: 2023,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Hubble Law Distance to a Low-Redshift Galaxy",
        description: `How far from the Solar System would a galaxy with a redshift of \\(0.035\\) be?<br><br>
(a) 150 Mpc <br>
(b) 200 Mpc <br>
(c) 250 Mpc <br>
(d) 300 Mpc <br>
(e) 350 Mpc`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Hubble's Law (\\(cz = H_0 d\\)) in the low-redshift regime (\\(z \\ll 1\\)).</p>
<p><strong>Solution:</strong></p>
<p>For \\(z = 0.035 \\ll 1\\), the recession velocity is \\(v \\approx cz = (3.00 \\times 10^5\\text{ km/s})(0.035) = 10,500\\text{ km/s}\\). Using Hubble's Law with \\(H_0 \\approx 70\\text{ km s}^{-1}\\text{ Mpc}^{-1}\\):</p>
<p>$$ d = \\frac{cz}{H_0} = \\frac{10,500\\text{ km/s}}{70\\text{ km s}^{-1}\\text{ Mpc}^{-1}} = 150\\text{ Mpc} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q28_usaaao_2023",
        id: "Q28",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.9 / 10.0",
        title: "Non-Intersecting Coplanar Aligned Elliptical Orbits",
        description: `Two planets A and B orbit a star with coplanar orbital paths that don't intersect. The major axes of the orbits are perfectly aligned, but the major axis of A is larger than that of B. A and B are observed to have eccentricities 0.5 and 0.75, respectively. What is the minimal possible ratio of semi-major axes of A to B?<br><br>
(a) 1 <br>
(b) \\(7/6\\) <br>
(c) \\(8/3\\) <br>
(d) \\(7/2\\) <br>
(e) 6`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Confocal Keplerian ellipse geometry; apsidal alignment conditions for non-intersecting coplanar orbits.</p>
<p><strong>Solution:</strong></p>
<p>To minimize the ratio \\(a_A / a_B > 1\\) without the two confocal ellipses intersecting, their perihelia must point in the <em>same</em> direction from the central star. Since the polar equation of an ellipse from the focus is \\(r(\\theta) = \\frac{a(1-e^2)}{1 + e\\cos\\theta}\\), the two aligned orbits do not intersect if and only if \\(r_A(\\theta) \\ge r_B(\\theta)\\) at both perihelion (\\(\\theta = 0\\)) and aphelion (\\(\\theta = \\pi\\)):</p>
<ul>
    <li><strong>Perihelion condition:</strong> \\(a_A(1 - e_A) \\ge a_B(1 - e_B) \\implies \\frac{a_A}{a_B} \\ge \\frac{1 - 0.75}{1 - 0.50} = \\frac{1}{2}\\).</li>
    <li><strong>Aphelion condition:</strong> \\(a_A(1 + e_A) \\ge a_B(1 + e_B) \\implies \\frac{a_A}{a_B} \\ge \\frac{1 + 0.75}{1 + 0.50} = \\frac{1.75}{1.50} = \\frac{7}{6}\\).</li>
</ul>
<p>Thus, the minimal possible ratio of the semi-major axes is \\(\\frac{7}{6}\\).</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q29_30_usaaao_2023",
        id: "Q29-30",
        competition: "USAAAO",
        year: 2023,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.8 / 10.0",
        title: "Harvard Bridge Solar Azimuth Alignment & Diurnal Altitude",
        description: `On a map of MIT and the Charles River where North points directly upwards, the Harvard Bridge runs NNW–SSE and the Charles River runs perpendicular to it, angled from West-Southwest (upriver, left) to East-Northeast (downriver, right, azimuth \\(A \\approx 68^\\circ\\)).<br><br>
<strong>29.</strong> Leo is biking along the Harvard Bridge in the morning when he stops and looks out downriver (East-Northeast) parallel to the banks. He sees the Sun straight in front of him, peeking out from above the buildings. What part of the academic year is it?<br>
(a) Early fall semester (late September–early October) <br>
(b) Late fall semester (late November–early December) <br>
(c) Independent Activities Period (January) <br>
(d) Early spring semester (late February–early March) <br>
(e) Late spring semester (late April–early May)<br><br>
<strong>30.</strong> After a day spent showing a visiting friend around Boston, Leo is walking back along the bridge when the Sun aligns perfectly upriver (West-Southwest, opposite to the morning direction). How high in the sky is the Sun relative to the morning?<br>
(a) Above the horizon, and higher than in the morning <br>
(b) Above the horizon, at the same altitude as in the morning <br>
(c) Above the horizon, but lower than in the morning <br>
(d) On the horizon <br>
(e) Below the horizon`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Horizon spherical trigonometry; relating sunrise/afternoon azimuths to solar declination and comparing altitudes at antipodal azimuths (\\(A_2 = A_1 + 180^\\circ\\)).</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 29:</strong> Looking downriver is looking <strong>East-Northeast</strong> (roughly \\(22^\\circ\\) North of due East, \\(\\cos A_1 > 0\\)). Seeing the rising Sun low in the East-Northeast requires a strongly positive solar declination (\\(\\delta_\\odot > 0\\), between the March 20 vernal equinox and the September 22 autumnal equinox). Among the academic terms listed, only the <strong>late spring semester (late April–early May)</strong> has \\(\\delta_\\odot \\approx +15^\\circ\\text{ to }+18^\\circ > 0^\\circ\\).</p>
<p><strong>Part 30:</strong> Applying the spherical law of cosines \\(\\sin\\delta_\\odot = \\sin\\phi\\sin h + \\cos\\phi\\cos h\\cos A\\) at morning azimuth \\(A_1\\) (\\(\\cos A_1 > 0\\), North of East) and afternoon antipodal azimuth \\(A_2 = A_1 + 180^\\circ\\) (\\(\\cos A_2 = -\\cos A_1 < 0\\), South of West):</p>
<p>$$ \\sin\\phi\\sin h_1 = \\sin\\delta_\\odot - \\cos\\phi\\cos h_1 \\cos A_1 $$</p>
<p>$$ \\sin\\phi\\sin h_2 = \\sin\\delta_\\odot + \\cos\\phi\\cos h_2 \\cos A_1 $$</p>
<p>Because \\(\\phi \\approx 42.36^\\circ\\text{ N} > 0\\), \\(\\delta_\\odot > 0\\), and \\(\\cos A_1 > 0\\), we immediately have \\(\\sin h_2 > \\frac{\\sin\\delta_\\odot}{\\sin\\phi} > \\sin h_1 > 0\\). Thus, in the afternoon when the Sun passes through the West-Southwest (upriver) direction on its way to setting in the West-Northwest, it is <strong>above the horizon, and higher than in the morning</strong>.</p>
<p><strong>Answers:</strong><br>29. <strong>(e)</strong><br>30. <strong>(a)</strong></p>`
    }
];