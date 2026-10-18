// js/data/usaaao_2025.js
export const usaaao_2025 = [
    {
        uniqueId: "q1_usaaao_2025",
        id: "Q1",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Escape from Deimos",
        description: `Imagine you are on Deimos right now and you want to escape Mars because you are bored. If Deimos is currently at 23,460 km away from the center of Mars and its speed is currently around 1.35 km/s, how much more speed do you and Deimos need to escape Mars? The mass of Mars is 6.39 × 10<sup>23</sup> kg.<br><br>
(a) 557 m/s <br>
(b) 427 m/s <br>
(c) 377 m/s <br>
(d) 207 m/s <br>
(e) None`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q01_USAAAO_2025.png" alt="User Solution Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Escape velocity calculation from a specific orbital distance compared to the current orbital velocity.</p>
<p><strong>Solution:</strong></p>
<p>The required escape velocity from a distance \\(r\\) is given by:</p>
<p>$$ v_{esc} = \\sqrt{\\frac{2GM}{r}} $$</p>
<p>We are given the following parameters:</p>
<ul>
    <li>\\( G = 6.674 \\times 10^{-11} \\text{ m}^3 \\text{ kg}^{-1} \\text{ s}^{-2} \\)</li>
    <li>\\( M = 6.39 \\times 10^{23} \\text{ kg} \\)</li>
    <li>\\( r = 23,460 \\text{ km} = 2.346 \\times 10^7 \\text{ m} \\)</li>
    <li>\\( v_{orb} = 1.35 \\text{ km/s} = 1350 \\text{ m/s} \\)</li>
</ul>
<p>Calculating the escape velocity:</p>
<p>$$ v_{esc} = \\sqrt{\\frac{2 \\times (6.674 \\times 10^{-11}) \\times (6.39 \\times 10^{23})}{2.346 \\times 10^7}} $$</p>
<p>$$ v_{esc} = \\sqrt{\\frac{8.529 \\times 10^{13}}{2.346 \\times 10^7}} \\approx \\sqrt{3.635 \\times 10^6} \\approx 1907 \\text{ m/s} $$</p>
<p>The additional speed required (\\(\\Delta v\\)) is the difference between the escape velocity and the current speed:</p>
<p>$$ \\Delta v = v_{esc} - v_{orb} = 1907 \\text{ m/s} - 1350 \\text{ m/s} = 557 \\text{ m/s} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q2_3_usaaao_2025",
        id: "Q2-3",
        competition: "USAAAO",
        year: 2025,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.2 / 10.0",
        title: "Gas Giant Radiative Cooling & Thermal Evolution",
        description: `Suppose a spherical gas giant has radius \\(R\\), temperature \\(T\\), uniform density and composition, and fixed volumetric heat capacity.<br><br>
<strong>2.</strong> Assuming heat leaves solely through blackbody radiation, calculate how the planet's cooling rate \\(-dT/dt\\) depends on \\(R\\) and \\(T\\).<br>
(a) \\( T^2 / R \\) <br>
(b) \\( T^4 / R \\) <br>
(c) \\( T^4 / R^3 \\) <br>
(d) \\( T^2 R \\) <br>
(e) \\( T^4 R^3 \\) <br><br>
<strong>3.</strong> Let \\(T(t)\\) be the temperature of the planet after time \\(t\\) and let \\(T_0\\) be the temperature at time \\(t = 0\\). Calculate the dependence of \\(T/T_0\\) on \\(t\\) assuming \\(T_{env} = 0\\) is the temperature of the planet's environment. Below, \\(\\alpha\\) is a constant.<br>
(a) \\( (1 + \\alpha t)^{-1/3} \\) <br>
(b) \\( (1 + \\alpha t)^{-1/2} \\) <br>
(c) \\( 1 - \\alpha t \\) <br>
(d) \\( (1 - \\alpha t)^2 \\) <br>
(e) \\( 1 - e^{-\\alpha t} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Coupling the Stefan-Boltzmann radiative power law with volumetric thermal energy storage, followed by separable differential integration.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 2:</strong> Let \\(c_V\\) be the constant volumetric heat capacity. The total internal thermal energy of the spherical planet of volume \\(V = \\frac{4}{3}\\pi R^3\\) is:</p>
<p>$$ E_{\\text{th}} = \\frac{4}{3}\\pi R^3 c_V T $$</p>
<p>Equating the rate of thermal energy loss \\(-dE_{\\text{th}}/dt\\) to the blackbody luminosity \\(L = 4\\pi R^2 \\sigma T^4\\):</p>
<p>$$ -\\frac{4}{3}\\pi R^3 c_V \\frac{dT}{dt} = 4\\pi R^2 \\sigma T^4 \\implies -\\frac{dT}{dt} = \\frac{3\\sigma}{c_V} \\frac{T^4}{R} \\propto \\frac{T^4}{R} $$</p>
<p><strong>Part 3:</strong> Writing the differential equation as \\(\\frac{dT}{dt} = -k T^4\\) (where \\(k = \\frac{3\\sigma}{c_V R}\\)) and separating variables from \\(t' = 0\\) to \\(t\\):</p>
<p>$$ \\int_{T_0}^T T^{-4}\\,dT = -k \\int_0^t dt' \\implies -\\frac{1}{3}\\left(T^{-3} - T_0^{-3}\\right) = -kt $$</p>
<p>$$ T^{-3} = T_0^{-3}(1 + 3k T_0^3 t) $$</p>
<p>Defining the positive constant \\(\\alpha = 3k T_0^3\\) and taking the \\(-1/3\\) power yields:</p>
<p>$$ \\frac{T(t)}{T_0} = (1 + \\alpha t)^{-1/3} $$</p>
<p><strong>Answers:</strong><br>2. <strong>(b)</strong><br>3. <strong>(a)</strong></p>`
    },
    {
        uniqueId: "q4_usaaao_2025",
        id: "Q4",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Hohmann Transfer Coefficient",
        description: `Suppose a rocket around a star of mass \\(M\\) wishes to execute an orbital transfer from a circular orbit with radius \\(R\\) to a larger one with that of radius \\(8R\\). One common way to do this is known as a Hohmann transfer, which has an intermediate elliptical orbit. This process requires two burns, with total delta-v \\(\\Delta v = k \\sqrt{\\frac{GM}{R}}\\) for some \\(k\\). Assuming instantaneous burns, compute \\(k\\).<br><br>
(a) \\( 1 - \\frac{1}{2\\sqrt{2}} \\) <br>
(b) \\( \\frac{1}{2} - \\frac{1}{2\\sqrt{2}} \\) <br>
(c) \\( \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\) <br>
(d) \\( \\frac{3}{\\sqrt{10}} - \\frac{1}{2} \\) <br>
(e) \\( \\frac{3}{\\sqrt{10}} - \\frac{1}{4} \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q04_USAAAO_2025.png" alt="Hohmann Transfer Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: A Hohmann transfer involves two instantaneous impulse burns. The first burn transitions the spacecraft from the initial circular orbit to an elliptical transfer orbit. The second burn circularizes the orbit at the target radius.</p>
<p><strong>Solution:</strong></p>
<p>Identify the orbital parameters:</p>
<ul>
    <li>Initial circular radius: \\( r_1 = R \\)</li>
    <li>Final circular radius: \\( r_2 = 8R \\)</li>
    <li>Transfer ellipse perihelion: \\( r_p = R \\)</li>
    <li>Transfer ellipse aphelion: \\( r_a = 8R \\)</li>
    <li>Transfer semi-major axis: \\( a = \\frac{R + 8R}{2} = 4.5R = \\frac{9}{2}R \\)</li>
</ul>
<p>The velocities in the initial and final circular orbits are:</p>
<p>$$ v_{c1} = \\sqrt{\\frac{GM}{R}}, \\qquad v_{c2} = \\sqrt{\\frac{GM}{8R}} = \\frac{1}{2\\sqrt{2}}\\sqrt{\\frac{GM}{R}} $$</p>
<p>Using the vis-viva equation \\( v = \\sqrt{GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)} \\), compute the velocities at perihelion (\\(v_p\\)) and aphelion (\\(v_a\\)) of the transfer ellipse:</p>
<p>$$ v_p = \\sqrt{GM \\left(\\frac{2}{R} - \\frac{2}{9R}\\right)} = \\sqrt{\\frac{16GM}{9R}} = \\frac{4}{3}\\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ v_a = \\sqrt{GM \\left(\\frac{2}{8R} - \\frac{2}{9R}\\right)} = \\sqrt{\\frac{GM}{36R}} = \\frac{1}{6}\\sqrt{\\frac{GM}{R}} $$</p>
<p>Calculate the required \\(\\Delta v\\) for both burns:</p>
<p>$$ \\Delta v_1 = v_p - v_{c1} = \\left(\\frac{4}{3} - 1\\right)\\sqrt{\\frac{GM}{R}} = \\frac{1}{3}\\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ \\Delta v_2 = v_{c2} - v_a = \\left(\\frac{1}{2\\sqrt{2}} - \\frac{1}{6}\\right)\\sqrt{\\frac{GM}{R}} $$</p>
<p>The total delta-v is the sum of both burns:</p>
<p>$$ \\Delta v_{total} = \\Delta v_1 + \\Delta v_2 = \\left( \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\right) \\sqrt{\\frac{GM}{R}} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2025",
        id: "Q5",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Eccentricity from Semi-latus Rectum",
        description: `It may be useful to know the <em>semi-latus rectum</em> of an ellipse is the distance between one of its foci and the point on the ellipse immediately above or below it. Consider a highly eccentric planet with a semi-latus rectum that is nearly a hundred times smaller than its semi-major axis. What is its eccentricity?<br><br>
(a) 0.99 <br>
(b) 0.995 <br>
(c) 0.9999 <br>
(d) 0.99995 <br>
(e) 0.999999`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q05_USAAAO_2025.png" alt="Semi-latus Rectum Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: The geometric properties of an ellipse. The semi-latus rectum \\(l\\) is geometrically related to the semi-major axis \\(a\\) and the eccentricity \\(e\\).</p>
<p><strong>Solution:</strong></p>
<p>The standard formula for the semi-latus rectum is:</p>
<p>$$ l = a(1 - e^2) $$</p>
<p>Given \\(\\frac{l}{a} \\approx \\frac{1}{100} = 0.01\\):</p>
<p>$$ 0.01 = 1 - e^2 \\implies e = \\sqrt{0.99} \\approx 0.994987 \\approx 0.995 $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q6_usaaao_2025",
        id: "Q6",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.8 / 10.0",
        title: "Galileo's Satellite Celestial Equator",
        description: `Galileo the Tyrant has conquered the Earth. In his madness, he launched many bright satellites into space because he thought that the celestial equator should be visible from Earth, and not just be an imaginary line. These satellites all orbit around Earth \\(3R_E\\) from the surface, where \\(R_E\\) is the radius of Earth. However, there was a major mistake made in the plan — the satellites now orbit in a circle on Earth's orbital plane instead of directly above the equator. Nevertheless, Galileo still forces all astronomers to use these satellites as the new Celestial Equator. They must calculate the declination for any star by finding the angle to the satellite at the same Right Ascension. What is the maximum absolute difference between the new declination and the old declination of bodies throughout the sky experienced by astronomers around the Earth? (Choose the closest value.)<br><br>
(a) \\(38^\\circ\\) <br>
(b) \\(0^\\circ\\) <br>
(c) \\(23.5^\\circ\\) <br>
(d) \\(47^\\circ\\) <br>
(e) \\(14.5^\\circ\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Superposition of the obliquity of the ecliptic (\\(\\varepsilon\\)) and maximum diurnal geocentric parallax (\\(p_{\\max}\\)) for near-Earth satellites.</p>
<p><strong>Solution:</strong></p>
<p>Two distinct geometric effects shift the apparent declination of the reference satellite at a given Right Ascension:</p>
<ol>
    <li><strong>Ecliptic Obliquity (\\(\\varepsilon\\)):</strong> Because the satellites orbit in Earth's orbital plane (the ecliptic) rather than the equatorial plane, the geocentric declination of the satellite ring reaches a maximum offset of \\(\\varepsilon \\approx 23.44^\\circ \\approx 23.5^\\circ\\) at the solstices (\\(\\text{RA} = 6^{\\text{h}}\\) and \\(18^{\\text{h}}\\)).</li>
    <li><strong>Diurnal Geocentric Parallax (\\(p_{\\max}\\)):</strong> The satellites orbit at an altitude \\(h = 3R_E\\) above the surface, corresponding to an orbital radius \\(r = R_E + 3R_E = 4R_E\\) from Earth's center. For an astronomer on Earth's surface (at distance \\(R_E\\) from the center), the maximum parallax angle between the geocentric and topocentric directions to a satellite occurs when the line of sight is tangent to the Earth (horizontal parallax):
    $$ \\sin p_{\\max} = \\frac{R_E}{r} = \\frac{R_E}{4R_E} = 0.25 \\implies p_{\\max} = \\arcsin(0.25) \\approx 14.48^\\circ \\approx 14.5^\\circ $$</li>
</ol>
<p>When both offsets act in the same direction along the meridian, the maximum absolute difference between the old and new declinations is:</p>
<p>$$ |\\Delta \\delta|_{\\max} = \\varepsilon + p_{\\max} \\approx 23.5^\\circ + 14.5^\\circ = 38^\\circ $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2025",
        id: "Q7",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Geodesic Distance: Boston to Mumbai",
        description: `What is the geodesic distance between Boston (\\(42^\\circ 21' 37''\\text{ N}\\), \\(71^\\circ 3' 28''\\text{ W}\\)) and Mumbai (\\(19^\\circ 04' 34''\\text{ N}\\), \\(72^\\circ 52' 39''\\text{ E}\\))? Assume that the Earth is perfectly spherical.<br><br>
(a) 2250 km <br>
(b) 6250 km <br>
(c) 10250 km <br>
(d) 12250 km <br>
(e) 15250 km`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Great-circle geodesic distance on a sphere using the spherical law of cosines.</p>
<p><strong>Solution:</strong></p>
<p>Convert the geographic coordinates of both cities to decimal degrees:</p>
<ul>
    <li>Boston: \\(\\phi_1 = 42.3603^\\circ\\text{ N}\\), \\(\\lambda_1 = -71.0578^\\circ\\)</li>
    <li>Mumbai: \\(\\phi_2 = 19.0761^\\circ\\text{ N}\\), \\(\\lambda_2 = +72.8775^\\circ\\)</li>
    <li>Longitude difference: \\(\\Delta\\lambda = 72.8775^\\circ - (-71.0578^\\circ) = 143.9353^\\circ\\)</li>
</ul>
<p>Using the spherical law of cosines to find the central angle \\(\\theta\\) subtended at the center of the Earth:</p>
<p>$$ \\cos\\theta = \\sin\\phi_1\\sin\\phi_2 + \\cos\\phi_1\\cos\\phi_2\\cos(\\Delta\\lambda) $$</p>
<p>$$ \\cos\\theta = \\sin(42.3603^\\circ)\\sin(19.0761^\\circ) + \\cos(42.3603^\\circ)\\cos(19.0761^\\circ)\\cos(143.9353^\\circ) $$</p>
<p>$$ \\cos\\theta = (0.6738)(0.3268) + (0.7389)(0.9451)(-0.8084) = 0.2202 - 0.5645 = -0.3443 $$</p>
<p>$$ \\theta = \\arccos(-0.3443) = 110.14^\\circ = 1.9223\\text{ rad} $$</p>
<p>Multiplying by Earth's mean radius \\(R_E \\approx 6371\\text{ km}\\):</p>
<p>$$ d = R_E \\theta = 6371\\text{ km} \\times 1.9223 \\approx 12,247\\text{ km} \\approx 12250\\text{ km} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q8_usaaao_2025",
        id: "Q8",
        competition: "USAAAO",
        year: 2025,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Spectral Line Broadening Mechanisms",
        description: `Which of the following statements are correct regarding spectral broadening?<br><br>
- <strong>P:</strong> In the limit of zero temperature, spectral lines have infinitesimally narrow linewidth.<br>
- <strong>Q:</strong> Consider two hypothetical spectral lines: line I has central frequency 
\\(f_0\\) and full width at half maximum (FWHM) \\(w \\ll f_0\\) with only homogeneous broadening; line II has identical central frequency and FWHM but only has inhomogeneous broadening. Let \\(P_{\\text{I, II}}(f)\\Delta f\\) denote the probability of measuring frequency \\(f\\) for each line within some bandwidth \\(\\Delta f \\ll w\\). Then, \\(P_{\\text{I}}(2f_0)\\Delta f < P_{\\text{II}}(2f_0)\\Delta f\\).<br>
- <strong>R:</strong> The same spectral line of two ideal gases, one with temperature 
\\(T\\) and the other with temperature \\(2T\\), are probed. The gases are otherwise identical. The linewidth of the hotter gas under thermal Doppler broadening is twice that of the cooler gas.<br><br>
(a) None <br>
(b) P only <br>
(c) Q only <br>
(d) Both P and Q <br>
(e) Both Q and R`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Quantum natural broadening, Lorentzian (homogeneous) vs. Gaussian (inhomogeneous) wing profiles, and thermal Doppler linewidth scaling.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Statement P is False:</strong> Even at \\(T = 0\\text{ K}\\) (where thermal Doppler and pressure broadening vanish), excited atomic states have a finite spontaneous-emission lifetime \\(\\Delta t\\), which by the Heisenberg uncertainty principle (\\(\\Delta E \\Delta t \\ge \\hbar/2\\)) produces a non-zero <em>natural linewidth</em>.</li>
    <li><strong>Statement Q is False:</strong> Homogeneous broadening produces a <strong>Lorentzian</strong> profile \\(P_{\\text{I}}(f) \\propto [(f-f_0)^2 + (w/2)^2]^{-1}\\) with heavy power-law wings, whereas inhomogeneous (Doppler) broadening produces a <strong>Gaussian</strong> profile \\(P_{\\text{II}}(f) \\propto \\exp[-4\\ln 2(f-f_0)^2/w^2]\\) whose wings decay exponentially. Far from line center at \\(f = 2f_0\\) (\\(f - f_0 = f_0 \\gg w\\)), the Lorentzian tail exceeds the Gaussian tail, so \\(P_{\\text{I}}(2f_0) > P_{\\text{II}}(2f_0)\\).</li>
    <li><strong>Statement R is False:</strong> Thermal Doppler broadening scales with the RMS thermal speed of the gas particles, \\(\\Delta f_{\\text{FWHM}} \\propto v_{\\text{th}} \\propto \\sqrt{T}\\). Doubling the temperature from \\(T\\) to \\(2T\\) increases the linewidth by a factor of \\(\\sqrt{2}\\), not \\(2\\).</li>
</ul>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2025",
        id: "Q9",
        competition: "USAAAO",
        year: 2025,
        module: "T7",
        moduleName: "Stellar Evolution",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Main-Sequence Star Cluster Properties",
        description: `Which of the following statements are true about a cluster of main sequence stars:<br><br>
- <strong>A:</strong> For two star clusters of the same total mass, the one with the larger number of stars will be brighter as measured by luminosity per unit mass.<br>
- <strong>B:</strong> The main-sequence turnoff point for star clusters is at higher temperatures if they are older.<br>
- <strong>C:</strong> The main-sequence turnoff point for star clusters is at lower luminosities if they are older.<br><br>
Assume the mass-luminosity relationship \\(L \\propto M^{3.5}\\) for main-sequence stars.<br><br>
(a) A and C <br>
(b) A only <br>
(c) C only <br>
(d) A, B, and C <br>
(e) A and B`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Main-sequence mass-luminosity scaling (\\(L \\propto M^{3.5}\\)), stellar lifetimes (\\(\\tau_{\\text{MS}} \\propto M/L \\propto M^{-2.5}\\)), and cluster turnoff evolution.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Statement A is False:</strong> Since \\(L \\propto m^{3.5}\\) for an individual star of mass \\(m\\), the luminosity per unit mass of a star scales as \\(L/m \\propto m^{2.5}\\). For a fixed total cluster mass \\(M_{\\text{tot}} = N m\\), a cluster divided into a larger number of stars \\(N\\) has a smaller average stellar mass \\(m\\) and therefore a much <em>lower</em> total luminosity (\\(L_{\\text{tot}}/M_{\\text{tot}} \\propto N^{-2.5}\\)).</li>
    <li><strong>Statement B is False:</strong> Massive, hot, blue main-sequence stars exhaust their core hydrogen first. As a cluster ages, its main-sequence turnoff shifts toward lower-mass, <em>cooler</em> (lower temperature) stars.</li>
    <li><strong>Statement C is True:</strong> Because older clusters only retain lower-mass stars on the main sequence (\\(M_{\\text{TO}} \\propto t_{\\text{age}}^{-0.4}\\)), and \\(L \\propto M^{3.5}\\), the turnoff luminosity decreases with age (\\(L_{\\text{TO}} \\propto t_{\\text{age}}^{-1.4}\\)).</li>
</ul>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2025",
        id: "Q10",
        competition: "USAAAO",
        year: 2025,
        module: "O1",
        moduleName: "Blind Map Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Sky Map Principal Great Circles",
        description: `On an all-sky northern hemisphere star chart, three reference curves are drawn:<br>
- <strong>Line 1:</strong> A straight vertical line passing through the zenith (center of the chart), Polaris, and the North and South horizon points.<br>
- <strong>Line 2:</strong> A curved arc passing north of Orion through Taurus and Gemini.<br>
- <strong>Line 3:</strong> A curved arc intersecting the exact East and West horizon points and passing directly through Orion's Belt (Mintaka, 
\\(\\delta \\approx 0^\\circ\\)).<br><br>
Match each imaginary line (1, 2, 3) to its label:<br><br>
(a) 1 - Ecliptic; 2 - Celestial Equator; 3 - Local Meridian <br>
(b) 1 - Local Meridian; 2 - Ecliptic; 3 - Galactic Equator <br>
(c) 1 - Galactic Equator; 2 - Celestial Equator; 3 - Ecliptic <br>
(d) 1 - Local Meridian; 2 - Ecliptic; 3 - Celestial Equator <br>
(e) 1 - Local Meridian; 2 - Celestial Equator; 3 - Ecliptic`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Identifying the Local Meridian, Celestial Equator, and Ecliptic on a stereographic all-sky star chart using constellation landmarks.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Line 1 (Local Meridian):</strong> The straight vertical line connecting the North and South cardinal points through the zenith and the North Celestial Pole (Polaris) is the observer's <strong>Local Meridian</strong>.</li>
    <li><strong>Line 3 (Celestial Equator):</strong> By definition, the <strong>Celestial Equator</strong> (\\(\\delta = 0^\\circ\\)) intersects the horizon at due East and due West and passes directly through <strong>Mintaka (\\(\\delta\\) Ori)</strong>, the westernmost star of Orion's Belt.</li>
    <li><strong>Line 2 (Ecliptic):</strong> The <strong>Ecliptic</strong> intersects the Celestial Equator at the vernal and autumnal equinoxes at an angle of \\(23.5^\\circ\\), reaching its northernmost declination (\\(+23.5^\\circ\\)) near the border of Taurus and Gemini, just north of Orion.</li>
</ul>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q11_12_usaaao_2025",
        id: "Q11-12",
        competition: "USAAAO",
        year: 2025,
        module: "D1",
        moduleName: "Methods & Plotting",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Log-Log Plots & Kepler's Third Law",
        description: `An astronomer was studying the exoplanets orbiting a star with a mass of \\(10M_\\odot\\). The astronomer decided to draw a \\(\\log T\\) vs. \\(\\log a\\) plot for the exoplanet orbits, where \\(T\\) corresponds to the period in years and \\(a\\) corresponds to the semi-major axis in AU. Note that \\(\\log\\) represents the base 10 logarithm.<br><br>
<strong>11.</strong> What would be the slope of the best fit line to this plot?<br>
(a) \\( 4/3 \\) <br>
(b) \\( 3/2 \\) <br>
(c) \\( 1/10 \\) <br>
(d) \\( 1 \\) <br>
(e) \\( 1/2 \\) <br><br>
<strong>12.</strong> What would be the \\(y\\)-intercept of the best fit line to this plot?<br>
(a) \\( 1 \\) <br>
(b) \\( -4/3 \\) <br>
(c) \\( -1/2 \\) <br>
(d) \\( 0 \\) <br>
(e) \\( -2/3 \\)`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q11-12_USAAAO_2025.png" alt="Log-Log Plot Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Linearization of Kepler's Third Law using logarithms to find the slope and y-intercept of a power-law relationship.</p>
<p><strong>Solution:</strong></p>
<p>According to Kepler's Third Law, with \\(T\\) in years, \\(a\\) in AU, and central star mass \\(M = 10 M_\\odot\\):</p>
<p>$$ T^2 = \\frac{M_\\odot}{M} a^3 = 0.1 a^3 $$</p>
<p>Taking the base-10 logarithm of both sides:</p>
<p>$$ 2 \\log_{10} T = \\log_{10}(0.1) + 3 \\log_{10} a = -1 + 3 \\log_{10} a $$</p>
<p>$$ \\log_{10} T = \\frac{3}{2} \\log_{10} a - \\frac{1}{2} $$</p>
<ul>
    <li>The slope (\\(m\\)) of the best fit line is \\(\\frac{3}{2}\\).</li>
    <li>The y-intercept (\\(c\\)) is \\(-\\frac{1}{2}\\).</li>
</ul>
<p><strong>Answers:</strong><br>11. <strong>(b)</strong><br>12. <strong>(c)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2025",
        id: "Q13",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Triple System Kepler's Law",
        description: `A recently observed exosolar system consists of a star, a planet, and the planet's satellite. The satellite has a revolution period of 100 minutes around the planet, and the planet has a 90 day revolution period around the star. The satellite approaches the surface of the planet to a minimum height of 1000 km and recedes to a maximum height of 7000 km. The radius of the planet is 3000 km. If the ratio of the mass of the star to the mass of the planet is \\(1 \\times 10^5\\), what is the semi-major axis of the planet's revolution around the star? Assume that the mass of the satellite is much smaller than the mass of the planet.<br><br>
(a) \\( 1.86 \\times 10^7 \\) km <br>
(b) \\( 2.36 \\times 10^7 \\) km <br>
(c) \\( 2.86 \\times 10^7 \\) km <br>
(d) \\( 3.36 \\times 10^7 \\) km <br>
(e) \\( 3.86 \\times 10^7 \\) km`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q13_USAAAO_2025.png" alt="Triple System Orbit Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Applying Kepler's Third Law to two different systems (the planet-satellite system and the star-planet system) and using proportional reasoning to eliminate constants.</p>
<p><strong>Solution:</strong></p>
<p>Calculate the semi-major axis of the satellite (\\(a_s\\)) using \\(R_p = 3000 \\text{ km}\\):</p>
<ul>
    <li>\\( r_{min} = 3000 + 1000 = 4000 \\text{ km} \\)</li>
    <li>\\( r_{max} = 3000 + 7000 = 10000 \\text{ km} \\)</li>
    <li>\\( a_s = \\frac{4000 + 10000}{2} = 7000 \\text{ km} \\)</li>
</ul>
<p>Dividing Kepler's Third Law for the star-planet system by that of the planet-satellite system:</p>
<p>$$ a_p = a_s \\cdot \\left( \\frac{T_p}{T_s} \\right)^{2/3} \\cdot \\left( \\frac{M_*}{M_p} \\right)^{1/3} $$</p>
<p>With \\(T_s = 100\\text{ min}\\), \\(T_p = 90 \\times 24 \\times 60 = 129,600\\text{ min}\\), and \\(M_*/M_p = 10^5\\):</p>
<p>$$ a_p = 7000 \\cdot (1296)^{2/3} \\cdot (10^5)^{1/3} \\approx 7000 \\cdot 118.84 \\cdot 46.416 \\approx 3.86 \\times 10^7 \\text{ km} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q14_16_usaaao_2025",
        id: "Q14-16",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.5 / 10.0",
        title: "Rotating Space Station Artificial Gravity & Coriolis Dynamics",
        description: `A cylindrical space station rotating about its primary axis could create artificial "spin gravity," allowing people to live on the inner surface of the cylinder.<br><br>
<strong>14.</strong> For such a station with a radius of \\(50\\text{ m}\\), what rotational period is needed for inhabitants to experience spin gravity equal to Earth's gravity \\(g = 9.81\\text{ m/s}^2\\)?<br>
(a) \\(2.3\\text{ s}\\) &nbsp; (b) \\(5.1\\text{ s}\\) &nbsp; (c) \\(7.1\\text{ s}\\) &nbsp; (d) \\(14.2\\text{ s}\\) &nbsp; (e) \\(32.0\\text{ s}\\)<br><br>
<strong>15.</strong> Inhabitants experience the Coriolis force on moving objects: \\(\\vec{F} = -2m\\vec{\\omega} \\times \\vec{v}\\), where \\(\\vec{\\omega}\\) is the angular velocity vector of the space station and \\(\\vec{v}\\) is the velocity of the object in the rotating reference frame. For a space station with spin gravity equal to Earth's gravity, what is the minimum radius needed so that a person walking at \\(1\\text{ m/s}\\) in any direction experiences negligible Coriolis force (\\(< 1\\%\\) of Earth's gravity)?<br>
(a) \\(10\\text{ m}\\) &nbsp; (b) \\(20\\text{ m}\\) &nbsp; (c) \\(41\\text{ m}\\) &nbsp; (d) \\(1.0\\text{ km}\\) &nbsp; (e) \\(4.1\\text{ km}\\)<br><br>
<strong>16.</strong> You are standing inside the space station, facing in the direction of the cylinder's rotation. You throw a ball directly upward (toward the central rotation axis). Where does it land?<br>
(a) Right back in your hand &nbsp; (b) In front of you &nbsp; (c) Behind you &nbsp; (d) To your right &nbsp; (e) To your left`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Centripetal acceleration and non-inertial Coriolis kinematics in a rotating cylindrical reference frame.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 14:</strong> Setting the centripetal acceleration at radius \\(R = 50\\text{ m}\\) equal to \\(g = 9.81\\text{ m/s}^2\\):</p>
<p>$$ \\omega^2 R = \\left(\\frac{2\\pi}{T}\\right)^2 R = g \\implies T = 2\\pi\\sqrt{\\frac{R}{g}} = 2\\pi\\sqrt{\\frac{50}{9.81}} \\approx 14.185\\text{ s} \\approx 14.2\\text{ s} $$</p>
<p><strong>Part 15:</strong> Since \\(\\omega = \\sqrt{g/R}\\), the maximum Coriolis acceleration for walking speed \\(v = 1\\text{ m/s}\\) is \\(a_{\\text{Cor}} = 2\\omega v = 2v\\sqrt{g/R}\\). Requiring \\(a_{\\text{Cor}} < 0.01g\\):</p>
<p>$$ 2v\\sqrt{\\frac{g}{R}} < 0.01g \\implies R > \\frac{40000 v^2}{g} = \\frac{40000(1)^2}{9.81} \\approx 4077\\text{ m} \\approx 4.1\\text{ km} $$</p>
<p><strong>Part 16:</strong> Let the cylinder rotate counterclockwise so \\(\\vec{\\omega} = \\omega\\hat{z}\\) points out of the page, and you stand at the bottom facing right (\\(+\\hat{x}\\), the direction of rotation) and throw the ball upward (\\(+\\hat{y}\\), toward the central axis). As the ball rises (\\(\\vec{v} = v_y\\hat{y}\\) with \\(v_y > 0\\)), the Coriolis force is:</p>
<p>$$ \\vec{F}_{\\text{Cor}} = -2m(\\vec{\\omega} \\times \\vec{v}) = -2m(\\omega\\hat{z} \\times v_y\\hat{y}) = +2m\\omega v_y \\hat{x} $$</p>
<p>Equivalently, in the inertial frame, the ball retains the floor's tangential speed \\(v_t = \\omega R\\) while moving to smaller radii \\(r < R\\), so its angular speed \\(\\dot{\\theta} > \\omega\\) exceeds the rotation rate of the floor throughout its flight. Thus, the ball advances ahead of the thrower in the direction of rotation and lands <strong>in front of you</strong>.</p>
<p><strong>Answers:</strong><br>14. <strong>(d)</strong><br>15. <strong>(e)</strong><br>16. <strong>(b)</strong></p>`
    },
    {
        uniqueId: "q17_usaaao_2025",
        id: "Q17",
        competition: "USAAAO",
        year: 2025,
        module: "T5",
        moduleName: "Stellar Structure and Atmospheres",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.9 / 10.0",
        title: "Radiative vs. Conductive Stellar Core Radius",
        description: `Consider a giant star with radius \\(R\\). The core has temperature \\(T_c\\) and the surface has temperature \\(T_s \\ll T_c\\). Given \\(R, T_c,\\) and \\(T_s\\), Alice and Bob estimate the core's radius in two different ways, both assuming that the star is in thermal equilibrium:<br>
- <strong>Alice:</strong> The core radiates energy.<br>
- <strong>Bob:</strong> The inside of the star conducts heat with constant uniform thermal conductivity 
\\(\\kappa\\) such that \\(\\kappa \\gg \\frac{R\\sigma T_s^4}{T_c}\\).<br><br>
Let \\(R_A\\) and \\(R_B\\) be the core radii estimated by Alice and Bob. Which of the following is the ratio \\(R_A / R_B\\) proportional to?<br><br>
(a) \\( T_s / T_c \\) <br>
(b) \\( T_s^2 / T_c^2 \\) <br>
(c) \\( 1 / (R T_c T_s^2) \\) <br>
(d) \\( R^2 / (T_s^4 T_c^2) \\) <br>
(e) \\( T_s^4 T_c^2 / R \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Thermal equilibrium in stellar interiors; comparing direct blackbody core emission against spherical Fourier heat conduction.</p>
<p><strong>Solution:</strong></p>
<p>In thermal equilibrium, the net power leaving the star's surface of radius \\(R\\) is fixed by the Stefan-Boltzmann Law:</p>
<p>$$ L = 4\\pi R^2 \\sigma T_s^4 $$</p>
<p><strong>1. Alice's Estimate (\\(R_A\\)):</strong></p>
<p>Alice models the core as a blackbody radiator of radius \\(R_A\\) and temperature \\(T_c\\) whose luminosity equals \\(L\\):</p>
<p>$$ 4\\pi R_A^2 \\sigma T_c^4 = 4\\pi R^2 \\sigma T_s^4 \\implies R_A = R \\left(\\frac{T_s}{T_c}\\right)^2 $$</p>
<p><strong>2. Bob's Estimate (\\(R_B\\)):</strong></p>
<p>Bob models heat transport from \\(r = R_B\\) (at \\(T_c\\)) to \\(r = R\\) (at \\(T_s\\)) via Fourier's law of thermal conduction across spherical shells:</p>
<p>$$ L = -4\\pi r^2 \\kappa \\frac{dT}{dr} \\implies \\int_{R_B}^R \\frac{dr}{r^2} = -\\frac{4\\pi\\kappa}{L} \\int_{T_c}^{T_s} dT $$</p>
<p>$$ \\frac{1}{R_B} - \\frac{1}{R} = \\frac{4\\pi\\kappa(T_c - T_s)}{4\\pi R^2 \\sigma T_s^4} = \\frac{\\kappa(T_c - T_s)}{R^2 \\sigma T_s^4} $$</p>
<p>Since \\(T_s \\ll T_c\\) and \\(\\kappa \\gg \\frac{R\\sigma T_s^4}{T_c}\\), we have \\(\\frac{\\kappa T_c}{R^2\\sigma T_s^4} \\gg \\frac{1}{R}\\), which implies \\(R_B \\ll R\\) and:</p>
<p>$$ R_B \\approx \\frac{R^2 \\sigma T_s^4}{\\kappa T_c} $$</p>
<p><strong>3. Ratio \\(R_A / R_B\\):</strong></p>
<p>$$ \\frac{R_A}{R_B} = \\frac{R (T_s / T_c)^2}{\\frac{R^2 \\sigma T_s^4}{\\kappa T_c}} = \\frac{\\kappa}{\\sigma} \\frac{1}{R T_c T_s^2} \\propto \\frac{1}{R T_c T_s^2} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q18_usaaao_2025",
        id: "Q18",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.6 / 10.0",
        title: "Sunrise and Sunset Shadow Azimuths",
        description: `Connor is stranded on an island and wishes to determine his latitude, but he only wakes up at sunrise and sunset. He constructs a vertical stick in the ground. On some day, he measures the angle between the shadows made at sunrise and sunset as \\(105^\\circ\\). Which of the following intervals of latitudes could Connor be in?<br><br>
(a) \\((0^\\circ\\text{ N}, 10^\\circ\\text{ N})\\) <br>
(b) \\((10^\\circ\\text{ N}, 20^\\circ\\text{ N})\\) <br>
(c) \\((20^\\circ\\text{ N}, 30^\\circ\\text{ N})\\) <br>
(d) \\((30^\\circ\\text{ N}, 40^\\circ\\text{ N})\\) <br>
(e) \\((40^\\circ\\text{ N}, 50^\\circ\\text{ N})\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Horizon spherical trigonometry; relating the sunrise/sunset azimuth amplitude to solar declination and observer latitude.</p>
<p><strong>Solution:</strong></p>
<p>At sunrise and sunset, the Sun's altitude is \\(h = 0^\\circ\\). Applying the spherical law of cosines to the navigational triangle:</p>
<p>$$ \\sin\\delta = \\sin\\phi\\sin h + \\cos\\phi\\cos h\\cos A = \\cos\\phi\\cos A $$</p>
<p>Because the shadows point directly opposite the Sun, the angle between the sunrise and sunset shadows equals the angle between the sunrise and sunset azimuths. Let \\(\\theta\\) be the angle North (or South) of due East/West at which the Sun rises and sets (\\(|\\cos A| = \\sin\\theta\\)). Since the sunrise and sunset vectors are symmetric across the meridian and separated by \\(105^\\circ\\):</p>
<p>$$ 180^\\circ - 2\\theta = 105^\\circ \\implies \\theta = 37.5^\\circ $$</p>
<p>Substituting \\(|\\cos A| = \\sin(37.5^\\circ)\\) into the horizon relation:</p>
<p>$$ \\cos\\phi = \\frac{|\\sin\\delta|}{\\sin(37.5^\\circ)} $$</p>
<p>Since the Sun's declination cannot exceed the obliquity of the ecliptic (\\(|\\delta| \\le 23.44^\\circ\\)), we obtain an upper bound on \\(\\cos\\phi\\) (and thus a minimum bound on latitude \\(\\phi\\)):</p>
<p>$$ \\cos\\phi \\le \\frac{\\sin(23.44^\\circ)}{\\sin(37.5^\\circ)} = \\frac{0.3978}{0.6088} \\approx 0.6534 \\implies \\phi \\ge \\arccos(0.6534) \\approx 49.2^\\circ\\text{ N} $$</p>
<p>Among the given intervals, only \\((40^\\circ\\text{ N}, 50^\\circ\\text{ N})\\) contains latitudes \\(\\phi \\ge 49.2^\\circ\\text{ N}\\).</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2025",
        id: "Q19",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Limits of Kepler's Laws",
        description: `Which of the following statements CANNOT be inferred from Kepler's laws of motion?<br><br>
<ul>
    <li><strong>I:</strong> A planet moves in an elliptical orbit around the Sun.</li>
    <li><strong>II:</strong> The eccentricities of the orbits of all solar system planets are small.</li>
    <li><strong>III:</strong> A solar system planet has its highest tangential velocity when it is closest to the Sun.</li>
    <li><strong>IV:</strong> All planets move in elliptical orbits in roughly the same plane around the Sun.</li>
</ul>
<br>
(a) I only <br>
(b) IV only <br>
(c) II, III, and IV <br>
(d) II and IV <br>
(e) II and III`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Theoretical constraints and explicit statements formulated by Kepler's Laws of Planetary Motion.</p>
<p><strong>Solution:</strong></p>
<p>Evaluate each statement against Kepler's Laws:</p>
<ul>
    <li><strong>Statement I:</strong> A planet moves in an elliptical orbit around the Sun. This is exactly Kepler's First Law and CAN be inferred.</li>
    <li><strong>Statement II:</strong> The eccentricities of the orbits of all solar system planets are small. Kepler's laws state that the orbits are ellipses, but they place no mathematical constraints on the magnitude of the eccentricity. This CANNOT be inferred.</li>
    <li><strong>Statement III:</strong> A solar system planet has its highest tangential velocity when it is closest to the Sun. This derives directly from Kepler's Second Law (the law of equal areas), which guarantees conservation of angular momentum. This CAN be inferred.</li>
    <li><strong>Statement IV:</strong> All planets move in elliptical orbits in roughly the same plane around the Sun. Kepler's laws analyze each two-body system independently and make no claims regarding the coplanarity of multiple planetary orbits. This CANNOT be inferred.</li>
</ul>
<p>Statements II and IV cannot be inferred from the laws.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2025",
        id: "Q20",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.7 / 10.0",
        title: "Celestial Navigation & Equation of Time",
        description: `Just before dawn of the summer solstice, Christopher the sailor begins sailing due West from \\(50^\\circ\\text{ N } 5^\\circ\\text{ W}\\). His watch is set to UTC. On seeing his 91st sunrise at sea, his watch reads 3:00am. What is his longitude? (The equation of time, in the convention solar time minus mean time, is \\(-3\\text{ minutes}\\) on the summer solstice and \\(8\\text{ minutes}\\) on the autumnal equinox.)<br><br>
(a) \\(43^\\circ\\text{ W}\\) <br>
(b) \\(45^\\circ\\text{ W}\\) <br>
(c) \\(48^\\circ 15'\\text{ W}\\) <br>
(d) \\(50^\\circ\\text{ W}\\) <br>
(e) \\(53^\\circ 15'\\text{ W}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Timekeeping and celestial navigation; using the Equation of Time (\\(\\text{EoT} = t_{\\text{solar}} - t_{\\text{mean}}\\)) on the equinox to determine geographic longitude.</p>
<p><strong>Solution:</strong></p>
<p>Because Christopher departs just before dawn on the summer solstice, his 1st sunrise at sea occurs on the summer solstice, and his 91st sunrise at sea occurs \\(90\\text{ days}\\) later (one-quarter of a tropical year), which is the <strong>autumnal equinox</strong>.</p>
<p>On the autumnal equinox (\\(\\delta_\\odot = 0^\\circ\\)), sunrise occurs at exactly \\(t_{\\text{solar}} = 6:00\\text{ AM}\\) Local Apparent Solar Time at any non-polar latitude. Using the Equation of Time on the autumnal equinox (\\(\\text{EoT} = +8\\text{ min}\\)):</p>
<p>$$ t_{\\text{mean}} = t_{\\text{solar}} - \\text{EoT} = 6^{\\text{h}}00^{\\text{m}} - 0^{\\text{h}}08^{\\text{m}} = 5^{\\text{h}}52^{\\text{m}} $$</p>
<p>Comparing this local mean time to the \\(3^{\\text{h}}00^{\\text{m}}\\) reference time on his watch gives a time difference of:</p>
<p>$$ |\\Delta t| = 5^{\\text{h}}52^{\\text{m}} - 3^{\\text{h}}00^{\\text{m}} = 2^{\\text{h}}52^{\\text{m}} $$</p>
<p>Converting \\(2^{\\text{h}}52^{\\text{m}}\\) into degrees of longitude at \\(15^\\circ/\\text{hour}\\) (\\(0.25^\\circ/\\text{min}\\)):</p>
<p>$$ \\lambda = 2 \\times 15^\\circ + 52 \\times 0.25^\\circ = 30^\\circ + 13^\\circ = 43^\\circ\\text{ W} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q21_usaaao_2025",
        id: "Q21",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3.1 / 10.0",
        title: "Vertical Alignment of Rigel and Betelgeuse",
        description: `What is the largest range of latitudes for which, at some time during the day, the line between Rigel (\\(\\alpha_R = 5^{\\text{h}}14^{\\text{m}}32^{\\text{s}}, \\delta_R = -8^\\circ 12' 5.9''\\)) and Betelgeuse (\\(\\alpha_B = 5^{\\text{h}}56^{\\text{m}}33^{\\text{s}}, \\delta_B = 7^\\circ 24' 40.3''\\)) appears vertical? Answer to within 5 degree accuracy.<br><br>
(a) \\(-15^\\circ < \\phi < 15^\\circ\\) <br>
(b) \\(-25^\\circ < \\phi < 25^\\circ\\) <br>
(c) \\(-35^\\circ < \\phi < 35^\\circ\\) <br>
(d) \\(-45^\\circ < \\phi < 45^\\circ\\) <br>
(e) \\(-55^\\circ < \\phi < 55^\\circ\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spherical geometry of vertical circles; two stars appear vertically aligned (sharing the same azimuth) when the great circle connecting them passes through the observer's zenith.</p>
<p><strong>Solution:</strong></p>
<p>For the great circle through Rigel and Betelgeuse to pass through the zenith at some point during Earth's diurnal rotation, the observer's latitude \\(|\\phi|\\) must not exceed the maximum declination \\(\\delta_{\\max} = i\\) (inclination to the celestial equator) of that great circle.</p>
<p>We convert the coordinates to degrees:</p>
<ul>
    <li>\\(\\Delta\\alpha = \\alpha_B - \\alpha_R = 42^{\\text{m}}01^{\\text{s}} = 10.504^\\circ\\)</li>
    <li>\\(\\delta_R = -8.2016^\\circ\\), \\(\\delta_B = +7.4112^\\circ\\)</li>
</ul>
<p>The angular separation \\(\\theta\\) between Rigel and Betelgeuse is given by the spherical law of cosines:</p>
<p>$$ \\cos\\theta = \\sin\\delta_R\\sin\\delta_B + \\cos\\delta_R\\cos\\delta_B\\cos(\\Delta\\alpha) \\approx (-0.1427)(0.1290) + (0.9898)(0.9916)(0.9832) = 0.9466 $$</p>
<p>$$ \\sin\\theta = \\sqrt{1 - 0.9466^2} \\approx 0.3224 $$</p>
<p>By the spherical law of sines, the inclination \\(i = \\delta_{\\max}\\) of the great circle satisfies:</p>
<p>$$ \\cos\\delta_{\\max} = \\frac{\\cos\\delta_R\\cos\\delta_B\\sin(\\Delta\\alpha)}{\\sin\\theta} = \\frac{(0.9898)(0.9916)\\sin(10.504^\\circ)}{0.3224} \\approx 0.5549 $$</p>
<p>$$ \\delta_{\\max} = \\arccos(0.5549) \\approx 56.3^\\circ $$</p>
<p>Thus, the line between Rigel and Betelgeuse can appear vertical for any latitude in the range \\(-55^\\circ < \\phi < 55^\\circ\\) (to within \\(5^\\circ\\) accuracy).</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q22_usaaao_2025",
        id: "Q22",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Maximum Evening Visibility of Venus",
        description: `Observed from the equator, what is the maximum duration over which Venus can be observed (continuously) after sunset? Assume that the orbits of Venus and Earth are circular of radius \\(0.723\\text{ AU}\\) and \\(1\\text{ AU}\\) and lie on the ecliptic plane.<br><br>
(a) \\(2^{\\text{h}}50^{\\text{m}}\\) <br>
(b) \\(3^{\\text{h}}5^{\\text{m}}\\) <br>
(c) \\(3^{\\text{h}}20^{\\text{m}}\\) <br>
(d) \\(3^{\\text{h}}40^{\\text{m}}\\) <br>
(e) \\(12^{\\text{h}}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Inferior planet greatest elongation geometry and equatorial diurnal setting time.</p>
<p><strong>Solution:</strong></p>
<p>For an inferior planet in a circular coplanar orbit of radius \\(r_V = 0.723\\text{ AU}\\) viewed from Earth at \\(r_\\oplus = 1.000\\text{ AU}\\), the greatest eastern elongation \\(\\varepsilon_{\\max}\\) occurs when the line of sight is tangent to Venus's orbit:</p>
<p>$$ \\sin\\varepsilon_{\\max} = \\frac{r_V}{r_\\oplus} = 0.723 \\implies \\varepsilon_{\\max} = \\arcsin(0.723) \\approx 46.30^\\circ $$</p>
<p>From the equator, the sky rotates perpendicular to the horizon at \\(\\omega_\\oplus = 15^\\circ/\\text{hour}\\), so the maximum time Venus remains above the western horizon after sunset is:</p>
<p>$$ \\Delta t = \\frac{\\varepsilon_{\\max}}{15^\\circ/\\text{h}} = \\frac{46.30^\\circ}{15^\\circ/\\text{h}} \\approx 3.087\\text{ hours} \\approx 3^{\\text{h}}05^{\\text{m}} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q23_usaaao_2025",
        id: "Q23",
        competition: "USAAAO",
        year: 2025,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Solar Irradiance Variation (Perihelion vs. Aphelion)",
        description: `The Earth orbits the Sun with orbital eccentricity \\(e = 0.0167\\). What percent more total solar irradiance does the Earth receive at perihelion compared to aphelion?<br><br>
(a) 0.028% <br>
(b) 0.056% <br>
(c) 1.7% <br>
(d) 3.4% <br>
(e) 6.9%`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Inverse-square law of radiative flux combined with perihelion and aphelion distances of an elliptical orbit.</p>
<p><strong>Solution:</strong></p>
<p>Total solar irradiance \\(F = \\frac{L_\\odot}{4\\pi r^2}\\) is inversely proportional to the square of the heliocentric distance \\(r\\). Using \\(r_p = a(1 - e)\\) and \\(r_a = a(1 + e)\\):</p>
<p>$$ \\frac{F_p}{F_a} = \\left(\\frac{r_a}{r_p}\\right)^2 = \\left(\\frac{1 + e}{1 - e}\\right)^2 = \\left(\\frac{1 + 0.0167}{1 - 0.0167}\\right)^2 = \\left(\\frac{1.0167}{0.9833}\\right)^2 \\approx 1.0691 $$</p>
<p>Thus, Earth receives approximately \\(6.9\\%\\) more total solar irradiance at perihelion than at aphelion.</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q24_usaaao_2025",
        id: "Q24",
        competition: "USAAAO",
        year: 2025,
        module: "T5",
        moduleName: "Stellar Structure and Atmospheres",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Internal Structure of a Low-Luminosity Red Dwarf",
        description: `Consider a main sequence star 500 times less luminous than the Sun. This star must have a ______ core and a ______ envelope.<br><br>
(a) convective, convective <br>
(b) convective, radiative <br>
(c) radiative, convective <br>
(d) radiative, radiative <br>
(e) static, static`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Energy transport regimes (convection vs. radiation) across the main sequence as a function of stellar mass.</p>
<p><strong>Solution:</strong></p>
<p>Using the main-sequence mass-luminosity relation, a star with \\(L = 0.002\\ L_\\odot\\) has a mass of approximately \\(M \\approx 0.15\\text{--}0.20\\ M_\\odot\\). Main-sequence stars split into three internal structure regimes:</p>
<ul>
    <li><strong>Very Low-Mass Stars (\\(M \\lesssim 0.35\\ M_\\odot\\)):</strong> High interior opacity and steep temperature gradients make the star <strong>fully convective</strong> (both a convective core and a convective envelope).</li>
    <li><strong>Solar-Type Stars (\\(0.35\\ M_\\odot \\lesssim M \\lesssim 1.3\\ M_\\odot\\)):</strong> Radiative core and convective envelope.</li>
    <li><strong>Massive Stars (\\(M \\gtrsim 1.3\\ M_\\odot\\)):</strong> Convective core (driven by the temperature-sensitive CNO cycle) and radiative envelope.</li>
</ul>
<p>Because a star \\(500\\) times less luminous than the Sun lies well below the \\(0.35\\ M_\\odot\\) threshold, it has a <strong>convective</strong> core and a <strong>convective</strong> envelope.</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q25_usaaao_2025",
        id: "Q25",
        competition: "USAAAO",
        year: 2025,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Stellar Effective Temperature from CCD Image Size",
        description: `Evan uses a telescope of focal distance \\(f = 1000\\text{ mm}\\) to observe a star known to have a parallax \\(p = 50\\text{ mas}\\). Observing the CCD of the telescope, Evan notices that the star has a diameter \\(D = 0.1\\ \\mu\\text{m}\\). Furthermore, he measures its apparent magnitude to be \\(m = 1\\). What is the approximate temperature of this star? Please neglect atmospheric seeing in your calculations.<br><br>
(a) 3000 K <br>
(b) 3500 K <br>
(c) 4000 K <br>
(d) 4500 K <br>
(e) 5000 K`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Focal-plane plate scale geometry combined with the Stefan-Boltzmann relation for angular diameter and bolometric flux (note that the parallax \\(p = 50\\text{ mas}\\) is a distractor since surface flux depends only on angular diameter and apparent magnitude).</p>
<p><strong>Solution:</strong></p>
<p><strong>1. Angular Diameter (\\(\\theta\\)):</strong></p>
<p>From the focal length \\(f = 1000\\text{ mm} = 1.0\\text{ m}\\) and image diameter \\(D = 0.1\\ \\mu\\text{m} = 10^{-7}\\text{ m}\\), the angular diameter of the star is:</p>
<p>$$ \\theta = \\frac{D}{f} = 10^{-7}\\text{ rad} \\implies \\alpha = \\frac{\\theta}{2} = 5 \\times 10^{-8}\\text{ rad} $$</p>
<p><strong>2. Observed Bolometric Flux (\\(F\\)):</strong></p>
<p>Comparing \\(m = 1\\) to the Sun (\\(m_\\odot = -26.74\\), \\(F_\\odot = 1361\\text{ W m}^{-2}\\)):</p>
<p>$$ F = F_\\odot \\cdot 10^{-0.4(m - m_\\odot)} = 1361 \\cdot 10^{-0.4(1 + 26.74)} \\approx 1.09 \\times 10^{-8}\\text{ W m}^{-2} $$</p>
<p><strong>3. Effective Temperature (\\(T\\)):</strong></p>
<p>Since \\(F = \\frac{L}{4\\pi d^2} = \\sigma T^4 \\left(\\frac{R}{d}\\right)^2 = \\sigma T^4 \\alpha^2\\):</p>
<p>$$ T = \\left(\\frac{F}{\\sigma \\alpha^2}\\right)^{1/4} = \\left(\\frac{1.09 \\times 10^{-8}}{(5.670 \\times 10^{-8})(5 \\times 10^{-8})^2}\\right)^{1/4} \\approx 2961\\text{ K} \\approx 3000\\text{ K} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2025",
        id: "Q26",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.7 / 10.0",
        title: "Ecliptic Longitude & Orbital Inclination",
        description: `Two exoplanets, A and B, have circular orbits around the same central star. Suppose that the ascending nodes of the orbits are located at the same ecliptic longitude, defined analogously as the one for the solar system, and that both planets are at that point in the beginning. How long will it take for the planets to have an equal, common ecliptic longitude again, knowing that the inclinations of their orbits are \\(i_1 = 30^\\circ\\) and \\(i_2 = 70^\\circ\\), and that their periods are \\(T_1 = 2 \\text{ yr}\\) and \\(T_2 = 1 \\text{ yr}\\)?<br><br>
(a) 42 days <br>
(b) 44 days <br>
(c) 46 days <br>
(d) 48 days <br>
(e) 50 days`,
        solutionHtml: `<img src="assets/img/USAAAO_2025/Q26_USAAAO_2025.png" alt="Ecliptic Longitude Projection Diagram" class="user-diagram" onclick="window.openImageModal(this)">
<div style="text-align: center; font-size: 0.8rem; color: #888; margin-top: -20px; margin-bottom: 20px;">(Click image to enlarge)</div>
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spherical trigonometry applied to orbital planes. The ecliptic longitude (\\(\\lambda\\)) is the projection of the planet's true anomaly (\\(\\theta\\)) onto the reference ecliptic plane, adjusted by the orbital inclination (\\(i\\)).</p>
<p><strong>Solution:</strong></p>
<p>The relationship between ecliptic longitude \\(\\lambda\\), true anomaly \\(\\theta\\), and inclination \\(i\\) for an orbit originating at the ascending node is:</p>
<p>$$ \\tan(\\lambda) = \\cos(i) \\tan(\\theta) $$</p>
<p>Since both planets are in circular orbits starting at the ascending node simultaneously, their true anomalies as a function of time \\(t\\) (in years) are \\(\\theta_1 = \\pi t\\) and \\(\\theta_2 = 2\\pi t = 2\\theta_1\\). Setting \\(\\tan(\\lambda_1) = \\tan(\\lambda_2)\\):</p>
<p>$$ \\cos(30^\\circ) \\tan(\\theta_1) = \\cos(70^\\circ) \\tan(2\\theta_1) = \\cos(70^\\circ) \\frac{2\\tan(\\theta_1)}{1 - \\tan^2(\\theta_1)} $$</p>
<p>Dividing by \\(\\tan(\\theta_1) \\neq 0\\):</p>
<p>$$ 1 - \\tan^2(\\theta_1) = \\frac{2\\cos(70^\\circ)}{\\cos(30^\\circ)} \\approx 0.7898 \\implies \\tan(\\theta_1) \\approx 0.4585 \\implies \\theta_1 \\approx 0.4299\\text{ rad} $$</p>
<p>Converting back to time \\(t\\):</p>
<p>$$ t = \\frac{0.4299}{\\pi} \\times 365.25\\text{ days} \\approx 49.97\\text{ days} \\approx 50\\text{ days} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2025",
        id: "Q27",
        competition: "USAAAO",
        year: 2025,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Matter-Dominated Friedmann Scale Factor",
        description: `Cosmologists consider three possible universes: universes dominated by baryonic matter (i.e. ordinary matter), universes dominated by radiation, and universes dominated by dark energy. An equation written by Alexander Friedmann implies that for a matter-dominated universe, the Hubble parameter is proportional to the square root of that universe's matter density. In a matter-dominated universe, how does the size of the universe evolve with time \\(t\\)?<br><br>
(a) constant <br>
(b) \\(\\sqrt{t}\\) <br>
(c) \\(t^{2/3}\\) <br>
(d) \\(t\\) <br>
(e) \\(e^t\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Integrating the first Friedmann equation for a flat, matter-dominated (Einstein-de Sitter) universe.</p>
<p><strong>Solution:</strong></p>
<p>Let \\(a(t)\\) represent the cosmological scale factor ("size" of the universe). Because total non-relativistic matter mass is conserved as volume expands as \\(a^3\\), the matter density scales as \\(\\rho_m \\propto a^{-3}\\). Using the definition of the Hubble parameter \\(H = \\frac{\\dot{a}}{a}\\) and the Friedmann relation \\(H \\propto \\sqrt{\\rho_m}\\):</p>
<p>$$ \\frac{1}{a}\\frac{da}{dt} \\propto a^{-3/2} \\implies a^{1/2}\\,da \\propto dt $$</p>
<p>Integrating both sides with respect to \\(t\\):</p>
<p>$$ \\frac{2}{3} a^{3/2} \\propto t \\implies a(t) \\propto t^{2/3} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q28_usaaao_2025",
        id: "Q28",
        competition: "USAAAO",
        year: 2025,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.2 / 10.0",
        title: "Tropical Year Drift Without Leap Days",
        description: `Suppose leap days were removed from the calendar, so that each calendar year has exactly 365 days. In the first year of this calendar change, summer solstice is on June 21st. After 100 years of this calendar, what is the date of summer solstice?<br><br>
(a) May 28th <br>
(b) June 13th <br>
(c) June 21st <br>
(d) June 29th <br>
(e) July 15th`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Calendar drift relative to the tropical year (\\(T_{\\text{trop}} \\approx 365.2422\\text{ days}\\)).</p>
<p><strong>Solution:</strong></p>
<p>The cycle of the seasons is governed by the tropical year of \\(365.2422\\text{ days}\\). If each calendar year has only \\(365\\text{ days}\\), the calendar finishes \\(0.2422\\text{ days}\\) before Earth completes its seasonal orbit, so the summer solstice occurs \\(0.2422\\text{ days}\\) <em>later</em> in the calendar each year. Over 100 years, the accumulated forward shift is:</p>
<p>$$ \\Delta t = 100 \\times 0.2422\\text{ days} \\approx 24.22\\text{ days} \\approx 24\\text{ days} $$</p>
<p>Counting 24 days forward from June 21st (with 30 days in June): \\(21 + 24 = 45 = 30 + 15\\), which lands on <strong>July 15th</strong>.</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q29_usaaao_2025",
        id: "Q29",
        competition: "USAAAO",
        year: 2025,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Exoplanet Transit Depth Radius Ratio",
        description: `It is observed that a planet orbiting a star increases the observed magnitude of the system by 0.005 when it transits across the star. Assuming that the system is viewed edge-on and is orthogonal to the line of sight, determine the radius of the planet \\(R_p\\) in terms of the radius of the star \\(R\\).<br><br>
(a) \\(0.056R\\) <br>
(b) \\(0.067R\\) <br>
(c) \\(0.089R\\) <br>
(d) \\(0.12R\\) <br>
(e) \\(0.15R\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Exoplanet transit photometry; relating magnitude increase \\(\\Delta m\\) to the blocked stellar disk area fraction \\((R_p/R)^2\\).</p>
<p><strong>Solution:</strong></p>
<p>During transit totality, the fractional decrease in flux equals the ratio of the cross-sectional areas of the planet and star:</p>
<p>$$ \\frac{F_{\\text{transit}}}{F_0} = 1 - \\left(\\frac{R_p}{R}\\right)^2 $$</p>
<p>Substituting into Pogson's magnitude relation for \\(\\Delta m = 0.005\\):</p>
<p>$$ \\Delta m = -2.5\\log_{10}\\left[1 - \\left(\\frac{R_p}{R}\\right)^2\\right] = 0.005 $$</p>
<p>$$ 1 - \\left(\\frac{R_p}{R}\\right)^2 = 10^{-0.005/2.5} = 10^{-0.002} \\approx 0.995405 $$</p>
<p>$$ \\frac{R_p}{R} = \\sqrt{1 - 0.995405} = \\sqrt{0.004595} \\approx 0.0678 \\approx 0.067 $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q30_usaaao_2025",
        id: "Q30",
        competition: "USAAAO",
        year: 2025,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.0 / 10.0",
        title: "Telescope Focal Ratio",
        description: `What is the focal ratio of a telescope with \\(1.2\\text{ m}\\) in focal length and \\(12\\text{ cm}\\) in aperture?<br><br>
(a) \\(f/1000\\) <br>
(b) \\(f/100\\) <br>
(c) \\(f/10\\) <br>
(d) \\(f/1\\) <br>
(e) \\(f/0.1\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Definition of the optical focal ratio (f-number) of a telescope.</p>
<p><strong>Solution:</strong></p>
<p>The focal ratio (\\(N\\)) is the ratio of the telescope's focal length \\(f\\) to its entrance pupil (aperture) diameter \\(D\\) expressed in identical units:</p>
<p>$$ N = \\frac{f}{D} = \\frac{120\\text{ cm}}{12\\text{ cm}} = 10 $$</p>
<p>In standard optical notation, this is written as \\(f/10\\).</p>
<p><strong>Answer: (c)</strong></p>`
    }
];