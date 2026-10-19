// js/data/usaaao_2024.js
export const usaaao_2024 = [
    {
        uniqueId: "q1_usaaao_2024",
        id: "Q1",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.2 / 10.0",
        title: "MIThenge Corridor Solar Alignment",
        description: `David is walking down MIT's Infinite Corridor (latitude \\(42^\\circ 21' 33''\\text{ N}\\)) when he suddenly sees the Sun aligning with the window at the end of the corridor. Being the observational master he is, David immediately pulls out his compass and measures the Sun to be at an azimuth of \\(245.81^\\circ\\). Forgetting to bring his jacket, he is painfully reminded as he walks outside that it has been less than 6 months since the previous winter solstice. Which of the following choices is closest to the current date? Assume the corridor is parallel to the surface of the Earth.<br><br>
(a) January 15 <br>
(b) January 30 <br>
(c) February 15 <br>
(d) March 20 <br>
(e) April 1`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Horizon coordinate spherical trigonometry (MIThenge); determining solar declination from sunset azimuth at zero altitude.</p>
<p><strong>Solution:</strong></p>
<p>Because the corridor is horizontal (parallel to the surface of the Earth), the Sun is on the local horizon (altitude \\(h = 0^\\circ\\)) at azimuth \\(A = 245.81^\\circ\\). Applying the spherical law of cosines to the navigational triangle:</p>
<p>$$ \\sin\\delta = \\sin\\phi\\sin h + \\cos\\phi\\cos h\\cos A = \\cos\\phi\\cos A $$</p>
<p>Substituting \\(\\phi = 42^\\circ 21' 33'' = 42.3592^\\circ\\) and \\(A = 245.81^\\circ\\):</p>
<p>$$ \\sin\\delta = \\cos(42.3592^\\circ)\\cos(245.81^\\circ) = (0.73894)(-0.40976) \\approx -0.30279 $$</p>
<p>$$ \\delta = \\arcsin(-0.30279) \\approx -17.63^\\circ $$</p>
<p>Using the solar declination relation \\(\\sin\\delta \\approx -\\sin(23.44^\\circ)\\cos\\left(\\frac{360^\\circ}{365.25}\\Delta t\\right)\\), where \\(\\Delta t\\) is the number of days after the winter solstice (December 21):</p>
<p>$$ \\cos\\left(\\frac{360^\\circ}{365.25}\\Delta t\\right) = \\frac{-0.30279}{-\\sin(23.44^\\circ)} \\approx 0.7612 \\implies \\Delta t \\approx \\frac{40.43^\\circ}{360^\\circ / 365.25} \\approx 41\\text{ days} $$</p>
<p>Counting \\(41\\text{ days}\\) after December 21 gives <strong>January 31</strong>, which is closest to <strong>January 30</strong>.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q2_usaaao_2024",
        id: "Q2",
        competition: "USAAAO",
        year: 2024,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "theory",
        icon: "brain",
        difficultyText: "THEORY",
        title: "Main-Sequence Blackbody Peak & Metallicity",
        description: `Abhay looks at the spectra for two main sequence stars A and B, which you can assume are blackbodies. A has its peak at a frequency two times as high as that of B. By looking at the depth of spectral lines, Abhay can also determine that A has higher metallicity than B. Abhay makes the following statements:<br><br>
<strong>P:</strong> A has higher absolute magnitude than B.<br>
<strong>Q:</strong> A is older than B.<br><br>
Which of the following is true?<br><br>
(a) P and Q are true. <br>
(b) P and Q are false. <br>
(c) P is true and Q is false. <br>
(d) P is false and Q is true. <br>
(e) We don't have sufficient information for one or more of these statements.`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Wien's displacement law on the main sequence, the inverse logarithmic scale of absolute magnitudes, and stellar population metallicity-age correlations.</p>
<p><strong>Solution:</strong></p>
<ul>
    <li><strong>Statement P is False:</strong> By Wien's Law, \\(f_{\\max} \\propto T\\), so \\(T_A = 2T_B\\). Because both stars lie on the main sequence, the hotter star (Star A) has a much larger radius and higher luminosity (\\(L_A > L_B\\)). Because the magnitude scale is inverted (brighter stars have <em>smaller</em> or more negative absolute magnitudes), \\(M_A < M_B\\). Thus, Star A has a <em>lower</em> absolute magnitude than Star B.</li>
    <li><strong>Statement Q is False:</strong> Higher metallicity in Star A indicates that it formed out of interstellar gas enriched by later generations of supernovae (a younger Population I star), and its higher main-sequence mass/temperature also gives it a much shorter main-sequence lifetime than Star B. Thus, Star A is younger than Star B.</li>
</ul>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q3_usaaao_2024",
        id: "Q3",
        competition: "USAAAO",
        year: 2024,
        module: "T9",
        moduleName: "Planetary Systems and Formation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Geometric Transit Probability of Earth",
        description: `Aliens in a nearby star system (located in a random direction from Earth) are looking for nearby planets using the transit method. What is the probability that they can see the Earth transit across the Sun? (Assume they observe our Sun over multiple years and their instruments are sensitive enough to detect any transit that occurs.)<br><br>
(a) 100% <br>
(b) 5.8% <br>
(c) 0.93% <br>
(d) 0.47% <br>
(e) 0.15%`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Solid-angle geometric transit probability for a planet at semi-major axis \\(a\\) orbiting a star of radius \\(R_*\\).</p>
<p><strong>Solution:</strong></p>
<p>A distant observer sees Earth transit the solar disk if their line of sight lies within an angle \\(|\\beta| \\le \\arcsin\\left(\\frac{R_\\odot + R_\\oplus}{a}\\right) \\approx \\frac{R_\\odot}{a}\\) of the ecliptic plane. Integrating over the unit celestial sphere, the fraction of solid angle swept out by this band is:</p>
<p>$$ P_{\\text{transit}} = \\frac{2\\pi \\int_{-R_\\odot/a}^{+R_\\odot/a} d(\\sin\\beta)}{4\\pi} = \\frac{R_\\odot}{a} $$</p>
<p>Substituting \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\) and \\(a = 1\\text{ AU} = 1.496 \\times 10^{11}\\text{ m}\\):</p>
<p>$$ P_{\\text{transit}} = \\frac{6.957 \\times 10^8\\text{ m}}{1.496 \\times 10^{11}\\text{ m}} \\approx 0.00465 = 0.465\\% \\approx 0.47\\% $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q4_usaaao_2024",
        id: "Q4",
        competition: "USAAAO",
        year: 2024,
        module: "O2",
        moduleName: "Telescope Practice",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Telescope Magnification & Field of View Comparison",
        description: `Orion is observing the sky with two telescopes that he just made. Orion wrote down that the first telescope has a primary mirror with focal length \\(F_p = 2\\text{ m}\\) and an eyepiece with focal length \\(F_e = 30\\text{ mm}\\). However, he does not know the specifications of his second telescope. Given that the full-field image from the second telescope shows the same pair of reference star groups (marked with a red circle and a green oval) separated by 3 times the linear distance across the frame compared to the first telescope, which of the following choices could be the specifications of the second telescope?<br><br>
(a) \\(F_p = 1\\text{ m},\\ F_e = 15\\text{ mm}\\) <br>
(b) \\(F_p = 1\\text{ m},\\ F_e = 30\\text{ mm}\\) <br>
(c) \\(F_p = 1\\text{ m},\\ F_e = 90\\text{ mm}\\) <br>
(d) \\(F_p = 6\\text{ m},\\ F_e = 30\\text{ mm}\\) <br>
(e) \\(F_p = 6\\text{ m},\\ F_e = 15\\text{ mm}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Angular magnification of a visual telescope (\\(M = F_p / F_e\\)) and its inverse relationship with true field of view.</p>
<p><strong>Solution:</strong></p>
<p>The angular magnification of the first telescope is:</p>
<p>$$ M_1 = \\frac{F_{p1}}{F_{e1}} = \\frac{2000\\text{ mm}}{30\\text{ mm}} = \\frac{200}{3} \\approx 66.7\\times $$</p>
<p>In the second image, the angular separation between the red-circled star and the green-circled asterism spans \\(3\\) times the fraction of the field of view compared to the first image, meaning the second telescope has \\(3\\times\\) the angular magnification of the first telescope:</p>
<p>$$ M_2 = 3 M_1 = 3 \\times \\frac{200}{3} = 200\\times $$</p>
<p>Testing the candidate focal length pairs gives:</p>
<p>$$ M_2 = \\frac{F_{p2}}{F_{e2}} = \\frac{6000\\text{ mm}}{30\\text{ mm}} = 200\\times $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2024",
        id: "Q5",
        competition: "USAAAO",
        year: 2024,
        module: "T8",
        moduleName: "Stellar Remnants and General Relativity",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Core-Collapse Supernova Neutrino Yield",
        description: `A supernova is triggered largely by neutrinos. In fact, 99% of the energy coming from the supernova is released in the form of neutrinos. Over a time span of about three months, the supernova outputs visible light with power equivalent to 10 billion Suns. Assuming supernova neutrinos have a mean energy of around 10 MeV, that all the power of the supernova is released during the time it is visible, and that all of the power released is in the form of either visible light or neutrinos, estimate the number of neutrinos released.<br><br>
(a) \\(10^{54}\\) <br>
(b) \\(10^{55}\\) <br>
(c) \\(10^{50}\\) <br>
(d) \\(10^{57}\\) <br>
(e) \\(10^{60}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Core-collapse supernova energetics; partitioning total gravitational binding energy between optical photons (1%) and 10 MeV neutrinos (99%).</p>
<p><strong>Solution:</strong></p>
<p>First, calculate the total optical energy \\(E_{\\text{vis}}\\) radiated over \\(\\Delta t = 3\\text{ months} \\approx 0.25\\text{ yr} \\approx 7.89 \\times 10^6\\text{ s}\\):</p>
<p>$$ E_{\\text{vis}} = L_{\\text{vis}} \\Delta t = (10^{10} L_\\odot) \\Delta t = (10^{10} \\times 3.828 \\times 10^{26}\\text{ W})(7.89 \\times 10^6\\text{ s}) \\approx 3.02 \\times 10^{43}\\text{ J} $$</p>
<p>Since visible light accounts for \\(1\\%\\) of the total energy and neutrinos account for \\(99\\%\\):</p>
<p>$$ E_{\\nu,\\text{tot}} = 99 E_{\\text{vis}} \\approx 3.0 \\times 10^{45}\\text{ J} $$</p>
<p>Each neutrino carries an average energy of \\(\\langle E_\\nu \\rangle = 10\\text{ MeV} = 10^7\\text{ eV} \\times 1.602 \\times 10^{-19}\\text{ J/eV} = 1.602 \\times 10^{-12}\\text{ J}\\). The total number of neutrinos emitted is:</p>
<p>$$ N_\\nu = \\frac{E_{\\nu,\\text{tot}}}{\\langle E_\\nu \\rangle} \\approx \\frac{3.0 \\times 10^{45}\\text{ J}}{1.602 \\times 10^{-12}\\text{ J}} \\approx 1.87 \\times 10^{57} \\approx 10^{57} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q6_usaaao_2024",
        id: "Q6",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.3 / 10.0",
        title: "Angular Momentum of Intersecting Orbits",
        description: `Newly discovered planets DDP and CJ are found to orbit a nearby star. Planet CJ has a circular orbit with a radius of \\(2d\\), while planet DDP moves in an elliptical orbit with an aphelion of \\(5d\\) and a perihelion of \\(d\\). Their orbits intersect at location B. Additionally, through external analysis, planet DDP is found to be three times more massive than planet CJ. From the perspective of the star, what is the ratio of the angular momentum of planet DDP when it passes through point B to the angular momentum of planet CJ when it passes through point B? You may assume that the masses of both planets are significantly smaller than the mass of the star they orbit.<br><br>
(a) \\(\\frac{3\\sqrt{3}}{2}\\) <br>
(b) \\(\\sqrt{\\frac{15}{2}}\\) <br>
(c) \\(2\\sqrt{3}\\) <br>
(d) \\(\\sqrt{30}\\) <br>
(e) \\(\\sqrt{\\frac{10}{3}}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Conservation of angular momentum. The orbital angular momentum \\(L\\) of a planet is constant throughout its orbit and depends on the mass of the body and the semi-latus rectum \\(p\\) of its orbit.</p>
<p><strong>Step 1: Angular Momentum of the Circular Orbit</strong></p>
<p>For planet CJ (circular orbit), the radius is \\(r_c = 2d\\). For a circular orbit, the semi-latus rectum is equal to the radius: \\(p_c = 2d\\). Its angular momentum is:</p>
<p>$$ L_{CJ} = m_{CJ} \\sqrt{GM p_c} = m_{CJ} \\sqrt{2GMd} $$</p>
<p><strong>Step 2: Angular Momentum of the Elliptical Orbit</strong></p>
<p>For planet DDP (elliptical orbit), we have perihelion \\(r_p = d\\) and aphelion \\(r_a = 5d\\). The semi-major axis \\(a_e\\) and eccentricity \\(e\\) are:</p>
<p>$$ a_e = \\frac{r_p + r_a}{2} = 3d, \\qquad e = \\frac{r_a - r_p}{r_a + r_p} = \\frac{4}{6} = \\frac{2}{3} $$</p>
<p>The semi-latus rectum \\(p_e\\) is:</p>
<p>$$ p_e = a_e(1 - e^2) = 3d\\left(1 - \\frac{4}{9}\\right) = \\frac{5}{3}d $$</p>
<p>Since \\(m_{DDP} = 3m_{CJ}\\), its angular momentum is:</p>
<p>$$ L_{DDP} = m_{DDP} \\sqrt{GM p_e} = 3m_{CJ} \\sqrt{\\frac{5}{3}GMd} $$</p>
<p><strong>Step 3: Calculate the Ratio</strong></p>
<p>$$ \\frac{L_{DDP}}{L_{CJ}} = \\frac{3m_{CJ} \\sqrt{\\frac{5}{3}GMd}}{m_{CJ} \\sqrt{2GMd}} = 3\\sqrt{\\frac{5}{6}} = \\sqrt{\\frac{45}{6}} = \\sqrt{\\frac{15}{2}} \\approx 2.74 $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q7_usaaao_2024",
        id: "Q7",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.6 / 10.0",
        title: "Rocket Periapsis from Orbital Area",
        description: `Arjun launches a 50 kg rocket with speed 10,405 m/s from the surface of the Earth and redirects it into a stable elliptical orbit. Upon analysis, he finds the area of the orbit to be \\(1.438 \\times 10^{15} \\text{ m}^2\\). What is the approximate distance between the periapsis of the orbit and the center of the Earth? Assume no energy was lost in the redirection of the rocket into its new orbit.<br><br>
(a) 10000 km <br>
(b) 5000 km <br>
(c) 2000 km <br>
(d) 39000 km <br>
(e) 15000 km`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Orbital energy, the vis-viva equation, and the geometric properties of an ellipse.</p>
<p><strong>Step 1: State Standard Parameters</strong></p>
<ul>
    <li>\\( \\mu = GM_\\oplus \\approx 3.986 \\times 10^{14} \\text{ m}^3\\text{s}^{-2} \\)</li>
    <li>\\( R_\\oplus \\approx 6.378 \\times 10^6 \\text{ m} \\)</li>
</ul>
<p><strong>Step 2: Specific Orbital Energy and Semi-Major Axis</strong></p>
<p>Calculate the specific orbital energy \\(\\epsilon\\) at launch:</p>
<p>$$ \\epsilon = \\frac{v_0^2}{2} - \\frac{\\mu}{R_\\oplus} \\approx \\frac{10405^2}{2} - \\frac{3.986 \\times 10^{14}}{6.378 \\times 10^6} \\approx -8.37 \\times 10^6 \\text{ J/kg} $$</p>
<p>Using the specific energy, find the semi-major axis \\(a\\):</p>
<p>$$ a = -\\frac{\\mu}{2\\epsilon} \\approx \\frac{3.986 \\times 10^{14}}{2 \\times 8.37 \\times 10^6} \\approx 2.38 \\times 10^7 \\text{ m} $$</p>
<p><strong>Step 3: Finding Geometric Components</strong></p>
<p>From the area of an ellipse \\(A = \\pi a b\\), isolate the semi-minor axis \\(b\\) and focal distance \\(c\\):</p>
<p>$$ b = \\frac{A}{\\pi a} \\approx \\frac{1.438 \\times 10^{15}}{\\pi \\times 2.38 \\times 10^7} \\approx 1.92 \\times 10^7 \\text{ m} $$</p>
<p>$$ c = \\sqrt{a^2 - b^2} = \\sqrt{(2.38 \\times 10^7)^2 - (1.92 \\times 10^7)^2} \\approx 1.41 \\times 10^7 \\text{ m} $$</p>
<p>The periapsis distance \\(r_p\\) from the center of the Earth is:</p>
<p>$$ r_p = a - c \\approx 2.38 \\times 10^7 - 1.41 \\times 10^7 = 9.7 \\times 10^6 \\text{ m} = 9700\\text{ km} \\approx 10000\\text{ km} $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q8_usaaao_2024",
        id: "Q8",
        competition: "USAAAO",
        year: 2024,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Orbital Velocity in a Uniform Disk",
        description: `The mass density of the Milky Way galaxy determines the orbital velocity of planets, stars, and other objects orbiting around its center. Assuming a constant surface mass density \\(\\sigma\\) for the Milky Way and modeling it as a perfect circular disk, identify the dependence of the circular orbital velocity \\(v(r)\\) of a point mass at radius \\(r\\) from the galaxy's center.<br><br>
(a) \\( 1/\\sqrt{r} \\) <br>
(b) \\( 1/r \\) <br>
(c) \\( \\sqrt{r} \\) <br>
(d) \\( r \\) <br>
(e) \\( r^{3/2} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Dimensional analysis and enclosed mass scaling in a uniform 2D surface-density disk.</p>
<p><strong>Solution:</strong></p>
<p>The mass enclosed within a radius \\(r\\) of a uniform disk with constant surface mass density \\(\\sigma\\) scales as \\(M_{enc} = \\pi r^2 \\sigma\\). Using the circular velocity scaling \\(v(r) \\sim \\sqrt{\\frac{GM_{enc}}{r}}\\):</p>
<p>$$ v(r) \\sim \\sqrt{\\frac{G(\\pi r^2 \\sigma)}{r}} = \\sqrt{G \\pi \\sigma r} \\propto \\sqrt{r} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2024",
        id: "Q9",
        competition: "USAAAO",
        year: 2024,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Trigonometric Parallax Volume on Mars vs. Earth",
        description: `Let's assume that on an expedition mission to Mars, we take a telescope with 0.01 arcsecond angular resolution from Earth. What is the ratio of the number of stars we can measure the parallax distance to using this telescope on Mars compared to Earth? The semimajor axis of Mars is 1.524 AU.<br><br>
(a) 0.25 <br>
(b) 0.5 <br>
(c) 1 <br>
(d) 4 <br>
(e) 8`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Trigonometric parallax distance horizon (\\(d_{\\max} = a / p_{\\min}\\)) and spherical volume scaling for uniform stellar density.</p>
<p><strong>Solution:</strong></p>
<p>For a fixed minimum measurable parallax angle \\(p_{\\min} = 0.01''\\), the maximum distance \\(d_{\\max}\\) to which stellar parallax can be resolved is directly proportional to the orbital baseline \\(a\\):</p>
<p>$$ d_{\\max} = \\frac{a}{p_{\\min}} \\propto a $$</p>
<p>Assuming a uniform spatial number density of stars in the local solar neighborhood, the total number of stars \\(N\\) within the measurable sphere of radius \\(d_{\\max}\\) scales with the volume \\(V = \\frac{4}{3}\\pi d_{\\max}^3 \\propto a^3\\):</p>
<p>$$ \\frac{N_{\\text{Mars}}}{N_{\\text{Earth}}} = \\left(\\frac{a_{\\text{Mars}}}{a_{\\text{Earth}}}\\right)^3 = (1.524)^3 \\approx 3.54 \\approx 4 $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2024",
        id: "Q10",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3.2 / 10.0",
        title: "Observing M52 on a Zero-Obliquity Planet",
        description: `Ben Chen is an alien living on a system identical to Earth, except his planet's obliquity is \\(0^\\circ\\). Located at latitude \\(42.20^\\circ\\text{ N}\\), he wants to observe M52. Due to the open cluster being so dim, Ben needs perfect conditions to observe M52. Due to atmospheric effects, M52 can only be observed above an altitude of \\(30^\\circ\\). Additionally, it must be during astronomical night (when the Sun is more than \\(18^\\circ\\) below the horizon). Of the following dates, which is the earliest after the vernal equinox that Ben can observe the cluster? The coordinates of M52 are approximately \\(\\alpha = 0^{\\text{h}}\\) and \\(\\delta = 60^\\circ\\).<br><br>
(a) April 21st <br>
(b) June 21st <br>
(c) August 21st <br>
(d) October 21st <br>
(e) December 21st`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Coupled altitude constraints for target observability and astronomical twilight (\\(h_\\odot \\le -18^\\circ\\)) using spherical trigonometry.</p>
<p><strong>Solution:</strong></p>
<p><strong>1. Hour Angle Window for M52 (\\(h_{\\text{M52}} \\ge 30^\\circ\\)):</strong></p>
<p>With \\(\\phi = 42.20^\\circ\\) and \\(\\delta_{\\text{M52}} = 60^\\circ\\):</p>
<p>$$ \\sin h_{\\text{M52}} = \\sin(42.20^\\circ)\\sin(60^\\circ) + \\cos(42.20^\\circ)\\cos(60^\\circ)\\cos H_{\\text{M52}} \\ge \\sin(30^\\circ) = 0.5 $$</p>
<p>$$ 0.5817 + 0.3704\\cos H_{\\text{M52}} \\ge 0.5 \\implies \\cos H_{\\text{M52}} \\ge -0.2206 \\implies |H_{\\text{M52}}| \\le 102.74^\\circ = 6.85^{\\text{h}} $$</p>
<p>Since \\(\\alpha_{\\text{M52}} = 0^{\\text{h}}\\), the Local Sidereal Time is \\(\\text{LST} = H_{\\text{M52}}\\), so M52 is above \\(30^\\circ\\) altitude whenever \\(\\text{LST} \\in [-6.85^{\\text{h}}, +6.85^{\\text{h}}]\\).</p>
<p><strong>2. Hour Angle Window for Astronomical Night (\\(h_\\odot \\le -18^\\circ\\)):</strong></p>
<p>Because the planet's obliquity is \\(0^\\circ\\), the Sun always has \\(\\delta_\\odot = 0^\\circ\\):</p>
<p>$$ \\sin h_\\odot = \\cos(42.20^\\circ)\\cos H_\\odot \\le \\sin(-18^\\circ) = -0.3090 \\implies \\cos H_\\odot \\le -0.4171 \\implies |H_\\odot| \\ge 114.65^\\circ = 7.64^{\\text{h}} $$</p>
<p><strong>3. Earliest Date After the Vernal Equinox:</strong></p>
<p>Just before morning astronomical twilight ends (\\(H_\\odot = -7.64^{\\text{h}}\\)), M52 reaches \\(h = 30^\\circ\\) in the eastern sky (\\(\\text{LST} = -6.85^{\\text{h}}\\)) as soon as the Sun's Right Ascension reaches:</p>
<p>$$ \\alpha_\\odot = \\text{LST} - H_\\odot = -6.85^{\\text{h}} - (-7.64^{\\text{h}}) = +0.79^{\\text{h}} \\approx 11.9^\\circ \\approx 12\\text{ days after March 21 (April 2)} $$</p>
<p>Among the listed choices, the earliest valid date is <strong>April 21st</strong>.</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q11_12_usaaao_2024",
        id: "Q11-12",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.9 / 10.0",
        title: "Zenith Passage & Sunlight Duration in a Deep Shaft",
        description: `Joe lives at the bottom of a vertical cylindrical hole with a radius of \\(10\\text{ m}\\) at a depth of \\(10\\text{ km}\\) below the surface. He sees the Sun directly through the opening of the hole for a couple days twice a year, around November 2nd and February 9th.<br><br>
<strong>11.</strong> Which of the following is Joe's latitude?<br>
(a) \\(42^\\circ 22'\\text{ N}\\) &nbsp; (b) \\(19^\\circ 27'\\text{ N}\\) &nbsp; (c) \\(4^\\circ 43'\\text{ N}\\) &nbsp; (d) \\(14^\\circ 38'\\text{ S}\\) &nbsp; (e) \\(34^\\circ 36'\\text{ S}\\)<br><br>
<strong>12.</strong> In the same scenario as the question above, what is the longest possible time interval that direct sunlight reaches anywhere in the bottom of the hole in a single day?<br>
(a) 28 sec &nbsp; (b) 2 min 8 sec &nbsp; (c) 2 min 26 sec &nbsp; (d) 2 min 35 sec &nbsp; (e) 2 min 41 sec`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Subsolar zenith passage declination and diurnal transit time of the finite solar disk across a narrow vertical collimator.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 11:</strong> Because the vertical shaft has an aspect ratio of \\(10^{-3}\\text{ rad}\\), the Sun is visible at the bottom only when it transits the local zenith at solar noon (\\(\\phi = \\delta_\\odot\\)). November 2nd and February 9th lie \\(\\Delta t \\approx 49.5\\text{ days}\\) from the December 21st southern solstice. Accounting for the solar declination:</p>
<p>$$ \\sin\\phi = \\sin\\delta_\\odot \\approx -\\sin(23.44^\\circ)\\cos\\left(\\frac{360^\\circ}{365.25}\\times 49.5\\right) \\implies \\phi \\approx -14^\\circ 38' = 14^\\circ 38'\\text{ S} $$</p>
<p><strong>Part 12:</strong> The angular diameter of the shaft opening from the bottom is \\(\\theta_{\\text{hole}} = \\frac{2R_h}{D} = \\frac{20\\text{ m}}{10,000\\text{ m}} = 2.00 \\times 10^{-3}\\text{ rad}\\), and the angular diameter of the Sun is \\(\\theta_\\odot = \\frac{2R_\\odot}{1\\text{ AU}} \\approx 9.31 \\times 10^{-3}\\text{ rad}\\). Direct rays from the solar disk enter the shaft over a total angular span of:</p>
<p>$$ \\Delta\\theta = \\theta_{\\text{hole}} + \\theta_\\odot = 1.131 \\times 10^{-2}\\text{ rad} $$</p>
<p>At declination \\(\\delta = -14^\\circ 38'\\), the Sun's diurnal motion across the sky occurs at angular rate \\(\\dot{\\theta} = \\omega_\\oplus \\cos\\delta\\), where \\(\\omega_\\oplus = \\frac{2\\pi}{86400\\text{ s}} = 7.272 \\times 10^{-5}\\text{ rad/s}\\). The duration of direct sunlight is:</p>
<p>$$ \\Delta t = \\frac{\\Delta\\theta}{\\omega_\\oplus \\cos\\delta} = \\frac{1.131 \\times 10^{-2}}{(7.272 \\times 10^{-5})\\cos(14^\\circ 38')} = \\frac{155.5\\text{ s}}{0.9676} \\approx 160.7\\text{ s} = 2\\text{ min } 41\\text{ sec} $$</p>
<p><strong>Answers:</strong><br>11. <strong>(d)</strong><br>12. <strong>(e)</strong></p>`
    },
    {
        uniqueId: "q13_usaaao_2024",
        id: "Q13",
        competition: "USAAAO",
        year: 2024,
        module: "T4",
        moduleName: "Stellar Parameters and Spectral Classification",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.5 / 10.0",
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
<p>Assume the center of mass is situated at the left focus, \\((-c, 0)\\). At the given instant, \\(M_1\\) is at \\((0, b)\\). Checking option (d), where \\(M_2 = M_1\\) and \\(\\vec{r}_2 = (-2c, -b)\\):</p>
<p>$$ \\vec{R}_{CM} = \\frac{M_1(0, b) + M_1(-2c, -b)}{M_1 + M_1} = \\frac{(-2c, 0)}{2} = (-c, 0) $$</p>
<p>This places the system's center of mass exactly at the focus \\((-\\sqrt{a^2-b^2}, 0)\\).</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q14_usaaao_2024",
        id: "Q14",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.8 / 10.0",
        title: "Solar Differential Rotation Synodic Lap Period",
        description: `The surface of the Sun exhibits differential rotation, with different rotational periods at different latitudes. If the rotation speed of the Sun's surface at the equator is \\(2021\\text{ m/s}\\), and at \\(60^\\circ\\text{ South}\\) is \\(809\\text{ m/s}\\), how long would it take for a sunspot at the equator to do a full extra lap around the Sun compared to a sunspot at \\(60^\\circ\\text{ South}\\)?<br><br>
(a) 6.2 days <br>
(b) 25.0 days <br>
(c) 31.2 days <br>
(d) 41.7 days <br>
(e) 126 days`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Differential rotation periods across parallels of heliographic latitude (\\(r(\\phi) = R_\\odot\\cos\\phi\\)) and synodic lap period.</p>
<p><strong>Solution:</strong></p>
<p>At the solar equator (\\(\\phi = 0^\\circ\\), radius \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\)), the rotational period is:</p>
<p>$$ T_0 = \\frac{2\\pi R_\\odot}{v_0} = \\frac{2\\pi (6.957 \\times 10^8\\text{ m})}{2021\\text{ m/s}} \\approx 2.163 \\times 10^6\\text{ s} \\approx 25.03\\text{ days} $$</p>
<p>At latitude \\(\\phi = 60^\\circ\\text{ S}\\), the radius of the parallel circle is \\(r_{60} = R_\\odot \\cos(60^\\circ) = 0.5 R_\\odot\\). Its rotational period is:</p>
<p>$$ T_{60} = \\frac{2\\pi (0.5 R_\\odot)}{v_{60}} = \\frac{\\pi (6.957 \\times 10^8\\text{ m})}{809\\text{ m/s}} \\approx 2.702 \\times 10^6\\text{ s} \\approx 31.27\\text{ days} $$</p>
<p>The synodic period \\(T_{\\text{lap}}\\) required for the equatorial sunspot to complete one full extra lap is:</p>
<p>$$ \\frac{1}{T_{\\text{lap}}} = \\frac{1}{T_0} - \\frac{1}{T_{60}} \\implies T_{\\text{lap}} = \\frac{T_0 T_{60}}{T_{60} - T_0} = \\frac{25.03 \\times 31.27}{31.27 - 25.03} \\approx 125.4\\text{ days} \\approx 126\\text{ days} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q15_usaaao_2024",
        id: "Q15",
        competition: "USAAAO",
        year: 2024,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.1 / 10.0",
        title: "Relativistic Proton Classical Turning Point",
        description: `Two protons A and B lie in the solar interior. In the rest frame of proton A, proton B approaches it radially from a large distance with speed \\(0.9c\\). In the rest frame of proton A, identify the radius of the "classically forbidden" region for proton B (i.e. the region into which proton B cannot enter).<br><br>
(a) \\(6.6 \\times 10^{-12}\\text{ m}\\) <br>
(b) \\(4.1 \\times 10^{-15}\\text{ m}\\) <br>
(c) \\(2.3 \\times 10^{-15}\\text{ m}\\) <br>
(d) \\(3.8 \\times 10^{-18}\\text{ m}\\) <br>
(e) \\(1.2 \\times 10^{-18}\\text{ m}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Relativistic kinetic energy (\\(K = (\\gamma - 1)m_p c^2\\)) equated to the electrostatic Coulomb potential barrier.</p>
<p><strong>Solution:</strong></p>
<p>For proton B moving at \\(v = 0.9c\\), the Lorentz factor is:</p>
<p>$$ \\gamma = \\frac{1}{\\sqrt{1 - (0.9)^2}} = \\frac{1}{\\sqrt{0.19}} \\approx 2.2942 $$</p>
<p>Its relativistic kinetic energy at large separation is:</p>
<p>$$ K = (\\gamma - 1)m_p c^2 = (1.2942)(1.6726 \\times 10^{-27}\\text{ kg})(2.9979 \\times 10^8\\text{ m/s})^2 \\approx 1.946 \\times 10^{-10}\\text{ J} $$</p>
<p>Equating \\(K\\) to the electrostatic potential energy \\(U(r_{\\min}) = \\frac{e^2}{4\\pi\\varepsilon_0 r_{\\min}}\\) at the classical turning point:</p>
<p>$$ r_{\\min} = \\frac{e^2}{4\\pi\\varepsilon_0 K} = \\frac{(8.988 \\times 10^9)(1.602 \\times 10^{-19})^2}{1.946 \\times 10^{-10}} = \\frac{2.307 \\times 10^{-28}\\text{ J}\\cdot\\text{m}}{1.946 \\times 10^{-10}\\text{ J}} \\approx 1.19 \\times 10^{-18}\\text{ m} \\approx 1.2 \\times 10^{-18}\\text{ m} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q16_usaaao_2024",
        id: "Q16",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.3 / 10.0",
        title: "Synodic Lunar Month",
        description: `Consider a sun-planet-moon system. The rotation period of the planet is 2 days. The period of revolution of the moon around the planet is 42 days while that of the planet around the sun is 420 days. What is the length of the lunar cycle as seen from the planet? You can assume the direction of planetary rotation, planetary revolution, and lunar revolution is the same.<br><br>
(a) 42.1 days <br>
(b) 44.3 days <br>
(c) 46.7 days <br>
(d) 50.5 days <br>
(e) 53.1 days`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Synodic period calculation. The length of a lunar cycle (the time between consecutive identical phases, such as full moons) is the synodic period of the moon.</p>
<p><strong>Solution:</strong></p>
<p>Let \\(T_m = 42\\text{ days}\\) be the sidereal period of the moon around the planet and \\(T_p = 420\\text{ days}\\) be the sidereal period of the planet around the star. For prograde orbits, the synodic period \\(T_{syn}\\) is:</p>
<p>$$ \\frac{1}{T_{syn}} = \\frac{1}{T_m} - \\frac{1}{T_p} = \\frac{1}{42} - \\frac{1}{420} = \\frac{9}{420} \\implies T_{syn} = \\frac{420}{9} \\approx 46.67 \\text{ days} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q17_usaaao_2024",
        id: "Q17",
        competition: "USAAAO",
        year: 2024,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "ELT Direct Imaging Resolution Limit",
        description: `The Extremely Large Telescope (ELT) is an optical telescope under construction in Chile. The primary mirror has been planned to have a diameter of \\(39.3\\text{ m}\\), making it the largest optical telescope ever built. One of the goals for this telescope is the direct imaging of exoplanets. Consider an exoplanet at a distance of \\(1\\text{ AU}\\) from a star. What is the maximum distance from Earth of such a star-exoplanet system in which the ELT can resolve the exoplanet separately from the star? Ignore atmospheric seeing and assume optical wavelength to be \\(500\\text{ nm}\\).<br><br>
(a) 112 pc <br>
(b) 212 pc <br>
(c) 312 pc <br>
(d) 412 pc <br>
(e) 512 pc`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Diffraction-limited angular resolution (Rayleigh criterion) and parsec baseline definition.</p>
<p><strong>Solution:</strong></p>
<p>By the Rayleigh criterion, the minimum resolvable angular separation \\(\\theta\\) of a circular aperture of diameter \\(D = 39.3\\text{ m}\\) at wavelength \\(\\lambda = 500 \\times 10^{-9}\\text{ m}\\) is:</p>
<p>$$ \\theta = 1.22 \\frac{\\lambda}{D} = 1.22 \\times \\frac{500 \\times 10^{-9}\\text{ m}}{39.3\\text{ m}} \\approx 1.552 \\times 10^{-8}\\text{ rad} $$</p>
<p>Converting \\(\\theta\\) to arcseconds (\\(1\\text{ rad} = 206,265''\\)):</p>
<p>$$ \\theta('') = 1.552 \\times 10^{-8} \\times 206,265'' \\approx 0.003202'' $$</p>
<p>Since a projected separation of \\(a = 1\\text{ AU}\\) at distance \\(d\\) (in parsecs) subtends an angle \\(\\theta('') = \\frac{1\\text{ AU}}{d(\\text{pc})}\\):</p>
<p>$$ d_{\\max} = \\frac{1}{0.003202} \\approx 312.3\\text{ pc} \\approx 312\\text{ pc} $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q18_19_usaaao_2024",
        id: "Q18-19",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Sundial Shadow Azimuths & Polar Gnomon Tilt",
        description: `At 6am on March 20th, as the Sun is rising, Leo, who is at \\((40^\\circ\\text{ N}, 75^\\circ\\text{ W})\\), plants a stick vertically on the ground. Every hour on the hour, he marks out a line in the current direction of the shadow until the Sun sets at 6pm. Three months later (on the summer solstice), Leo returns to the same spot and marks out the hourly shadow lines again.<br><br>
<strong>18.</strong> Let \\(\\alpha_{12}\\) and \\(\\alpha_6\\) be the azimuths of the shadow lines drawn in the spring at 12pm and 6pm, and \\(\\beta_{12}\\) and \\(\\beta_6\\) be the azimuths of the shadow lines drawn in the summer at 12pm and 6pm. Which of the following statements is true? Ignore atmospheric effects and the equation of time.<br>
(a) \\(\\alpha_{12} = \\beta_{12},\\ \\alpha_6 = \\beta_6\\) &nbsp; (b) \\(\\alpha_{12} > \\beta_{12},\\ \\alpha_6 = \\beta_6\\) &nbsp; (c) \\(\\alpha_{12} < \\beta_{12},\\ \\alpha_6 = \\beta_6\\) &nbsp; (d) \\(\\alpha_{12} = \\beta_{12},\\ \\alpha_6 > \\beta_6\\) &nbsp; (e) \\(\\alpha_{12} = \\beta_{12},\\ \\alpha_6 < \\beta_6\\)<br><br>
<strong>19.</strong> In order for a single set of hour markings to accurately describe the time over the course of an entire year, the stick must be tilted so that the shadow at a fixed time of day always lies on the same line regardless of the date. Measured as an angle from the vertical, how much does the stick need to be tilted, and in which direction?<br>
(a) \\(0^\\circ\\) (no tilt needed) &nbsp; (b) \\(40^\\circ\\) towards the North &nbsp; (c) \\(50^\\circ\\) towards the North &nbsp; (d) \\(40^\\circ\\) towards the South &nbsp; (e) \\(50^\\circ\\) towards the South`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Horizontal sundial geometry; seasonal variation of solar azimuth at Hour Angle \\(H = 90^\\circ\\) and polar alignment of a sundial gnomon.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 18:</strong></p>
<ul>
    <li><strong>At 12pm (Local Solar Noon, \\(H = 0^\\circ\\)):</strong> Because \\(\\phi = 40^\\circ\\text{ N} > 23.44^\\circ\\text{ N}\\), the Sun transits the southern meridian (\\(A_\\odot = 180^\\circ\\)) in both spring and summer, so the noon shadow points due North on both dates (\\(\\alpha_{12} = \\beta_{12}\\)).</li>
    <li><strong>At 6pm (\\(H = +90^\\circ\\)):</strong> On the vernal equinox (\\(\\delta = 0^\\circ\\)), the Sun sets due West (\\(A_\\odot = 270^\\circ\\)), so the shadow points due East (\\(\\alpha_6 = 90^\\circ\\)). On the summer solstice (\\(\\delta = +23.44^\\circ\\)), at \\(H = 90^\\circ\\) the Sun is still above the horizon and located North of West (\\(A_\\odot > 270^\\circ\\) because \\(\\cos A_\\odot \\cos h = \\sin\\delta\\cos\\phi > 0\\)). Consequently, the shadow points South of East, meaning \\(\\beta_6 > 90^\\circ = \\alpha_6\\) (so \\(\\alpha_6 < \\beta_6\\)).</li>
</ul>
<p><strong>Part 19:</strong> For the shadow azimuth at any given Hour Angle \\(H\\) to be independent of the Sun's declination \\(\\delta\\), the gnomon (stick) must be aligned parallel to Earth's rotational axis, pointing toward the North Celestial Pole. At latitude \\(\\phi = 40^\\circ\\text{ N}\\), the North Celestial Pole has an altitude of \\(40^\\circ\\) above the northern horizon, which corresponds to a zenith angle (tilt from the vertical) of:</p>
<p>$$ z = 90^\\circ - \\phi = 90^\\circ - 40^\\circ = 50^\\circ\\text{ towards the North} $$</p>
<p><strong>Answers:</strong><br>18. <strong>(e)</strong><br>19. <strong>(c)</strong></p>`
    },
    {
        uniqueId: "q20_usaaao_2024",
        id: "Q20",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.1 / 10.0",
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
<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Applying Gauss's Law for gravity to an infinite cylinder and equating the radial gravitational field to centripetal acceleration.</p>
<p><strong>Step 1: Gravitational Field of a Cylinder</strong></p>
<p>Using Gauss's Law for gravity (\\(\\oint \\vec{g} \\cdot d\\vec{A} = -4\\pi G M_{enc}\\)) for a coaxial Gaussian cylinder of radius \\(d\\) and length \\(L\\) enclosing mass \\(M_{enc} = \\rho \\pi R^2 L\\):</p>
<p>$$ g \\cdot 2\\pi d L = 4\\pi G (\\rho \\pi R^2 L) \\implies g = \\frac{2\\pi G \\rho R^2}{d} $$</p>
<p><strong>Step 2: Centripetal Acceleration & Period</strong></p>
<p>Equating \\(g\\) to the centripetal acceleration \\(\\omega^2 d = \\frac{4\\pi^2 d}{P^2}\\):</p>
<p>$$ \\frac{4\\pi^2 d}{P^2} = \\frac{2\\pi G \\rho R^2}{d} \\implies P = \\frac{d}{R} \\sqrt{\\frac{2\\pi}{G\\rho}} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q21_usaaao_2024",
        id: "Q21",
        competition: "USAAAO",
        year: 2024,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2.4 / 10.0",
        title: "Primordial Magnetic Monopole Dilution by Inflation",
        description: `The problem of magnetic monopoles arises from the fact that Grand Unified Theories predict that the number density of magnetic monopoles at the time of their creation was \\(n_M(t_{\\text{GUT}}) \\approx 10^{82}\\text{ m}^{-3}\\). Cosmic inflation provides a solution to this problem, as the exponential expansion of the primordial universe dilutes the monopoles. Calculate, approximately, how much the universe expanded linearly during the inflationary period so that today the probability of a single magnetic monopole existing in the observable universe is 1%. Assume the universe is flat, the diameter of the observable universe today is \\(28.5\\text{ Gpc}\\), and between the end of inflation and today the universe has linearly expanded by a factor of \\(5 \\times 10^{26}\\).<br><br>
(a) \\(e^{40}\\) <br>
(b) \\(e^{50}\\) <br>
(c) \\(e^{55}\\) <br>
(d) \\(e^{65}\\) <br>
(e) \\(e^{85}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Cosmological number density dilution (\\(n \\propto a^{-3}\\)) across inflationary e-foldings and post-inflationary expansion.</p>
<p><strong>Solution:</strong></p>
<p>The radius of the observable universe today is \\(R_0 = \\frac{28.5\\text{ Gpc}}{2} = 14.25\\text{ Gpc} \\approx 4.40 \\times 10^{26}\\text{ m}\\), giving a present Euclidean volume of:</p>
<p>$$ V_0 = \\frac{4}{3}\\pi R_0^3 = \\frac{4}{3}\\pi (4.40 \\times 10^{26}\\text{ m})^3 \\approx 3.56 \\times 10^{80}\\text{ m}^3 $$</p>
<p>For an expected number of \\(N_0 = 0.01\\) monopoles inside \\(V_0\\) today, the present number density must be:</p>
<p>$$ n_0 = \\frac{N_0}{V_0} = \\frac{0.01}{3.56 \\times 10^{80}\\text{ m}^3} \\approx 2.81 \\times 10^{-83}\\text{ m}^{-3} $$</p>
<p>Since monopole number density scales inversely with volume (\\(n \\propto a^{-3}\\)), the total linear expansion factor from \\(t_{\\text{GUT}}\\) to today is:</p>
<p>$$ \\frac{a_0}{a_{\\text{GUT}}} = \\left(\\frac{n_M(t_{\\text{GUT}})}{n_0}\\right)^{1/3} = \\left(\\frac{10^{82}}{2.81 \\times 10^{-83}}\\right)^{1/3} \\approx 7.09 \\times 10^{54} $$</p>
<p>Dividing out the post-inflationary expansion factor \\(\\frac{a_0}{a_{\\text{end}}} = 5 \\times 10^{26}\\) gives the inflationary expansion factor \\(e^N\\):</p>
<p>$$ e^N = \\frac{7.09 \\times 10^{54}}{5 \\times 10^{26}} \\approx 1.42 \\times 10^{28} \\implies N = \\ln(1.42 \\times 10^{28}) \\approx 64.8 \\approx 65 $$</p>
<p>Thus, the universe expanded by a factor of approximately \\(e^{65}\\) during inflation.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q22_usaaao_2024",
        id: "Q22",
        competition: "USAAAO",
        year: 2024,
        module: "T5",
        moduleName: "Stellar Structure and Atmospheres",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.5 / 10.0",
        title: "Central Temperature Scaling of Polytropic X-Stars",
        description: `Tara is investigating a new type of stars she calls X-stars. She observes that in an X-star of mass \\(M\\) and radius \\(R\\), the gas pressure in the center of the star is proportional to \\(\\frac{M^3}{R^5}\\). What is the temperature at the center of the star proportional to?<br><br>
(a) \\(MR\\) <br>
(b) \\(\\frac{M}{R}\\) <br>
(c) \\(M^2 R^2\\) <br>
(d) \\(\\frac{M^2}{R^2}\\) <br>
(e) \\(\\text{const}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Ideal gas law scaling in homologous stellar interiors (\\(P_c \\propto \\rho_c T_c\\)).</p>
<p><strong>Solution:</strong></p>
<p>For a star of mass \\(M\\) and radius \\(R\\), the central density scales with the mean density as \\(\\rho_c \\propto \\frac{M}{R^3}\\). By the ideal gas law, the gas pressure at the center satisfies \\(P_c = \\frac{\\rho_c k_B T_c}{\\mu m_H} \\propto \\rho_c T_c\\). Solving for the central temperature \\(T_c\\):</p>
<p>$$ T_c \\propto \\frac{P_c}{\\rho_c} \\propto \\frac{M^3 / R^5}{M / R^3} = \\frac{M^2}{R^2} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q23_usaaao_2024",
        id: "Q23",
        competition: "USAAAO",
        year: 2024,
        module: "T2",
        moduleName: "Radiation Physics and Relativity Fundamentals",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Peak Emission Frequency of Star Recentus (Voided)",
        description: `<em>[VOIDED ON OFFICIAL EXAM]</em> A recently discovered star Recentus in a nearby galaxy has been confirmed to have a luminosity of \\(4L_\\odot\\) with a radius of \\(4R_\\odot\\). What is the approximate frequency of peak emission of Recentus?<br><br>
(a) \\(2 \\times 10^{14}\\text{ Hz}\\) <br>
(b) \\(4 \\times 10^{14}\\text{ Hz}\\) <br>
(c) \\(6 \\times 10^{14}\\text{ Hz}\\) <br>
(d) \\(8 \\times 10^{14}\\text{ Hz}\\) <br>
(e) \\(10 \\times 10^{14}\\text{ Hz}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Stefan-Boltzmann Law and Wien's Displacement Law in frequency space (\\(B_\\nu\\)) vs. wavelength space (\\(B_\\lambda\\)).</p>
<p><strong>Solution:</strong></p>
<p>From the Stefan-Boltzmann Law \\(L = 4\\pi R^2 \\sigma T^4\\), we find the surface temperature of Recentus relative to the Sun (\\(T_\\odot = 5778\\text{ K}\\)):</p>
<p>$$ \\frac{L}{L_\\odot} = \\left(\\frac{R}{R_\\odot}\\right)^2 \\left(\\frac{T}{T_\\odot}\\right)^4 \\implies 4 = 16 \\left(\\frac{T}{T_\\odot}\\right)^4 \\implies T = \\frac{T_\\odot}{\\sqrt{2}} \\approx 4086\\text{ K} $$</p>
<p><strong>Why this question was voided:</strong></p>
<ul>
    <li><strong>Rigorous Frequency-Space Peak (\\(B_\\nu\\)):</strong> Maximizing Planck's law per unit frequency \\(B_\\nu(T)\\) gives \\(\\nu_{\\max} = \\frac{2.8214 k_B T}{h} \\approx (5.879 \\times 10^{10}\\text{ Hz/K})(4086\\text{ K}) \\approx 2.40 \\times 10^{14}\\text{ Hz}\\), which rounds to <strong>(a) \\(2 \\times 10^{14}\\text{ Hz}\\)</strong>.</li>
    <li><strong>Wavelength-Space Conversion (\\(c / \\lambda_{\\max}\\)):</strong> Finding the wavelength peak \\(\\lambda_{\\max} = \\frac{2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{4086\\text{ K}} \\approx 709.3\\text{ nm}\\) and computing \\(f = \\frac{c}{\\lambda_{\\max}}\\) gives \\(4.23 \\times 10^{14}\\text{ Hz}\\), which rounds to <strong>(b) \\(4 \\times 10^{14}\\text{ Hz}\\)</strong>.</li>
</ul>
<p><strong>Answer: VOIDED — (a) in \\(B_\\nu\\) / (b) via \\(c/\\lambda_{\\max}\\)</strong></p>`
    },
    {
        uniqueId: "q24_usaaao_2024",
        id: "Q24",
        competition: "USAAAO",
        year: 2024,
        module: "T10",
        moduleName: "Galactic Structure",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Galactic Mass from Outer Rotation Speed",
        description: `Tara observes an X-star on the edge of a galaxy with radius \\(r = 15 \\times 10^3\\text{ pc}\\). She estimates that the star is moving at a speed of \\(v = 270\\text{ km/s}\\). What is a good estimate for the mass of the galaxy in units of the mass of the Sun (\\(M_\\odot\\))?<br><br>
(a) \\(1 \\times 10^6\\) <br>
(b) \\(1 \\times 10^{11}\\) <br>
(c) \\(1 \\times 10^{18}\\) <br>
(d) \\(1 \\times 10^{28}\\) <br>
(e) \\(1 \\times 10^{41}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Dynamical mass of a galaxy enclosed within radius \\(r\\) from circular orbital speed.</p>
<p><strong>Solution:</strong></p>
<p>Equating gravitational and centripetal acceleration for a circular orbit of radius \\(r = 1.5 \\times 10^4\\text{ pc} \\times 3.086 \\times 10^{16}\\text{ m/pc} = 4.629 \\times 10^{20}\\text{ m}\\) and speed \\(v = 2.70 \\times 10^5\\text{ m/s}\\):</p>
<p>$$ M = \\frac{r v^2}{G} = \\frac{(4.629 \\times 10^{20}\\text{ m})(2.70 \\times 10^5\\text{ m/s})^2}{6.674 \\times 10^{-11}\\text{ m}^3\\text{kg}^{-1}\\text{s}^{-2}} \\approx 5.06 \\times 10^{41}\\text{ kg} $$</p>
<p>Dividing by the solar mass \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\):</p>
<p>$$ \\frac{M}{M_\\odot} \\approx \\frac{5.06 \\times 10^{41}}{1.989 \\times 10^{30}} \\approx 2.54 \\times 10^{11} \\sim 1 \\times 10^{11} $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q25_usaaao_2024",
        id: "Q25",
        competition: "USAAAO",
        year: 2024,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.6 / 10.0",
        title: "Galaxy Bolometric Luminosity from Luminosity Distance",
        description: `There is a galaxy at redshift \\(0.5\\) for which we have a measurement of apparent bolometric magnitude \\(m = 22\\). With a standard candle in that galaxy, we have found its luminosity distance to Earth to be \\(2.8\\text{ Gpc}\\). Estimate the luminosity of this galaxy.<br><br>
(a) \\(10^{10}\\ L_\\odot\\) <br>
(b) \\(10^{12}\\ L_\\odot\\) <br>
(c) \\(10^{11}\\ L_\\odot\\) <br>
(d) \\(10^{13}\\ L_\\odot\\) <br>
(e) \\(10^{15}\\ L_\\odot\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Cosmological distance modulus using luminosity distance \\(d_L\\) to determine absolute bolometric magnitude.</p>
<p><strong>Solution:</strong></p>
<p>By definition of the luminosity distance \\(d_L = 2.8\\text{ Gpc} = 2.8 \\times 10^9\\text{ pc}\\), the bolometric distance modulus is:</p>
<p>$$ m - M_{\\text{bol}} = 5\\log_{10}\\left(\\frac{d_L}{10\\text{ pc}}\\right) = 5\\log_{10}(2.8 \\times 10^8) \\approx 42.24 $$</p>
<p>Thus, the galaxy's absolute bolometric magnitude is \\(M_{\\text{bol}} = 22 - 42.24 = -20.24\\). Comparing to the Sun's absolute bolometric magnitude \\(M_{\\text{bol},\\odot} = 4.74\\):</p>
<p>$$ \\frac{L}{L_\\odot} = 10^{0.4(M_{\\text{bol},\\odot} - M_{\\text{bol}})} = 10^{0.4(4.74 - (-20.24))} = 10^{9.99} \\approx 10^{10}\\ L_\\odot $$</p>
<p><strong>Answer: (a)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2024",
        id: "Q26",
        competition: "USAAAO",
        year: 2024,
        module: "T3",
        moduleName: "Astronomical Instrumentation",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.1 / 10.0",
        title: "Telescope Focal Length for Full-Moon Field of View",
        description: `An astronomer wants to design a telescope so that the full Moon fills the entire field of view (FOV) of the telescope. She uses an eyepiece with an apparent FOV of \\(60^\\circ\\). If the focal length of the eyepiece is \\(25\\text{ mm}\\), what will the focal length of the chosen telescope be? Note that the angular diameter of the Moon is \\(0.5^\\circ\\).<br><br>
(a) 2000 mm <br>
(b) 1500 mm <br>
(c) 6000 mm <br>
(d) 3000 mm <br>
(e) 1000 mm`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Relating true field of view (TFOV), eyepiece apparent field of view (AFOV), and telescope magnification.</p>
<p><strong>Solution:</strong></p>
<p>The angular magnification \\(M\\) required for the \\(\\text{TFOV} = 0.5^\\circ\\) full Moon to fill an eyepiece with \\(\\text{AFOV} = 60^\\circ\\) is:</p>
<p>$$ M = \\frac{\\text{AFOV}}{\\text{TFOV}} = \\frac{60^\\circ}{0.5^\\circ} = 120\\times $$</p>
<p>Using \\(M = \\frac{f_{\\text{scope}}}{f_{\\text{eyepiece}}}\\):</p>
<p>$$ f_{\\text{scope}} = M \\cdot f_{\\text{eyepiece}} = 120 \\times 25\\text{ mm} = 3000\\text{ mm} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q27_usaaao_2024",
        id: "Q27",
        competition: "USAAAO",
        year: 2024,
        module: "T12",
        moduleName: "Cosmology and the Structure of the Universe",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "1.4 / 10.0",
        title: "Matter Density Ratio at Recombination vs. Today",
        description: `The Cosmic Microwave Background is made of light that was released when the Universe first became transparent. It is a blackbody spectrum with temperature equal to the current temperature of the Universe. We observe the peak wavelength of the CMB to be at \\(1.063\\text{ millimeters}\\). When the CMB was released, we can theoretically predict the temperature of the Universe to be \\(3000\\text{ Kelvins}\\). How much larger was the density of matter when the CMB was released than now? Select the closest answer.<br><br>
(a) \\(10^3\\) <br>
(b) \\(10^6\\) <br>
(c) \\(10^9\\) <br>
(d) \\(10^{12}\\) <br>
(e) \\(10^{15}\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Wien's displacement law for the present CMB temperature and cosmological matter density scaling \\(\\rho_m \\propto (1+z)^3 \\propto T^3\\).</p>
<p><strong>Solution:</strong></p>
<p>Using Wien's displacement law, the current temperature of the CMB is:</p>
<p>$$ T_0 = \\frac{b}{\\lambda_{\\max}} = \\frac{2.8978 \\times 10^{-3}\\text{ m}\\cdot\\text{K}}{1.063 \\times 10^{-3}\\text{ m}} \\approx 2.726\\text{ K} $$</p>
<p>Since the CMB temperature scales inversely with the scale factor (\\(T \\propto a^{-1}\\)), and non-relativistic matter density scales inversely with volume (\\(\\rho_m \\propto a^{-3} \\propto T^3\\)):</p>
<p>$$ \\frac{\\rho_m(t_{\\text{rec}})}{\\rho_{m,0}} = \\left(\\frac{T_{\\text{rec}}}{T_0}\\right)^3 = \\left(\\frac{3000\\text{ K}}{2.726\\text{ K}}\\right)^3 \\approx (1100.5)^3 \\approx 1.33 \\times 10^9 \\approx 10^9 $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q28_usaaao_2024",
        id: "Q28",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3.1 / 10.0",
        title: "Great-Circle Flight Geodesic Navigation Error",
        description: `Moving into MIT for the start of the spring semester, Austin is flying from Lubbock, Texas (\\(33.58^\\circ\\text{ N}, 101.84^\\circ\\text{ W}\\)) to Boston, MA (\\(42.36^\\circ\\text{ N}, 71.06^\\circ\\text{ W}\\)). However, when he lands he finds that he is not in Boston. The pilots entered the destination latitude coordinate incorrectly (while keeping the destination longitude \\(71.06^\\circ\\text{ W}\\) correct)! Austin remembers that the plane left Lubbock at a bearing of \\(63^\\circ\\) (east of north) and followed the shortest great-circle path to the current destination. Where is Austin now?<br><br>
(a) \\((51.46^\\circ\\text{ N}, 71.06^\\circ\\text{ W})\\) <br>
(b) \\((48.46^\\circ\\text{ N}, 71.06^\\circ\\text{ W})\\) <br>
(c) \\((45.46^\\circ\\text{ N}, 71.06^\\circ\\text{ W})\\) <br>
(d) \\((41.46^\\circ\\text{ N}, 71.06^\\circ\\text{ W})\\) <br>
(e) \\((39.46^\\circ\\text{ N}, 71.06^\\circ\\text{ W})\\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Spherical trigonometry on the terrestrial globe; applying the four-parts cotangent formula to a great-circle geodesic.</p>
<p><strong>Solution:</strong></p>
<p>Consider the spherical triangle formed by the North Pole, Lubbock (\\(\\phi_1 = 33.58^\\circ\\text{ N}\\), colatitude \\(c_1 = 90^\\circ - \\phi_1\\)), and the destination (\\(\\phi_2\\), colatitude \\(c_2 = 90^\\circ - \\phi_2\\)). The longitude difference at the North Pole vertex is:</p>
<p>$$ \\Delta\\lambda = 101.84^\\circ - 71.06^\\circ = 30.78^\\circ $$</p>
<p>The initial bearing at Lubbock is the interior angle \\(\\alpha_1 = 63^\\circ\\). Applying the spherical four-parts cotangent formula relating \\(c_1, \\Delta\\lambda, \\alpha_1,\\) and \\(c_2\\):</p>
<p>$$ \\cos c_1 \\cos(\\Delta\\lambda) = \\sin c_1 \\cot c_2 - \\sin(\\Delta\\lambda)\\cot\\alpha_1 $$</p>
<p>Rewriting in terms of latitudes \\(\\phi_1\\) and \\(\\phi_2\\):</p>
<p>$$ \\sin\\phi_1 \\cos(\\Delta\\lambda) = \\cos\\phi_1 \\tan\\phi_2 - \\sin(\\Delta\\lambda)\\cot\\alpha_1 \\implies \\tan\\phi_2 = \\tan\\phi_1 \\cos(\\Delta\\lambda) + \\frac{\\sin(\\Delta\\lambda)\\cot\\alpha_1}{\\cos\\phi_1} $$</p>
<p>Substituting \\(\\phi_1 = 33.58^\\circ\\), \\(\\Delta\\lambda = 30.78^\\circ\\), and \\(\\alpha_1 = 63^\\circ\\):</p>
<p>$$ \\tan\\phi_2 = \\tan(33.58^\\circ)\\cos(30.78^\\circ) + \\frac{\\sin(30.78^\\circ)\\cot(63^\\circ)}{\\cos(33.58^\\circ)} = 0.57037 + 0.31298 = 0.88335 $$</p>
<p>$$ \\phi_2 = \\arctan(0.88335) \\approx 41.46^\\circ\\text{ N} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q29_30_usaaao_2024",
        id: "Q29-30",
        competition: "USAAAO",
        year: 2024,
        module: "T1",
        moduleName: "Positional Astronomy and Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3.0 / 10.0",
        title: "LARES Satellite Topocentric Altitude & Photometry",
        description: `Austin is back at MIT in Boston (\\(42.36^\\circ\\text{ N}, 71.06^\\circ\\text{ W}\\)) observing the LARES satellite, a sphere of diameter \\(36.4\\text{ cm}\\) made of THA-18N tungsten alloy. It orbits at an altitude of \\(1450\\text{ km}\\) above the surface of the Earth at an inclination of \\(69.49^\\circ\\) relative to the equatorial plane.<br><br>
<strong>29.</strong> What is the highest altitude angle Austin can point his telescope if he wants to observe LARES when it is at its highest latitude?<br>
(a) \\(9.4^\\circ\\) &nbsp; (b) \\(14.4^\\circ\\) &nbsp; (c) \\(18.4^\\circ\\) &nbsp; (d) \\(23.4^\\circ\\) &nbsp; (e) \\(33.4^\\circ\\)<br><br>
<strong>30.</strong> <em>[VOIDED ON OFFICIAL EXAM]</em> Austin is now allowed to observe LARES at any declination. Assume that LARES is a uniform spherical ball that acts as a perfect blackbody (albedo \\(= 0\\)). What is the brightest apparent magnitude at which Austin can observe LARES? Use \\(m_\\odot = -26.74\\).<br>
(a) 6.78 &nbsp; (b) 7.77 &nbsp; (c) 8.76 &nbsp; (d) 9.75 &nbsp; (e) 10.74`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Topocentric satellite altitude via planar triangle trigonometry (Law of Cosines) and thermal/bolometric satellite photometry.</p>
<p><strong>Solution:</strong></p>
<p><strong>Part 29:</strong> LARES reaches its highest sub-satellite latitude of \\(\\phi_S = 69.49^\\circ\\text{ N}\\). Its altitude in Boston's sky is maximized when LARES lies directly on Boston's meridian (\\(\\Delta\\lambda = 0^\\circ\\)), where the geocentric central angle between Boston (\\(\\phi_B = 42.36^\\circ\\text{ N}\\)) and LARES is:</p>
<p>$$ \\theta = \\phi_S - \\phi_B = 69.49^\\circ - 42.36^\\circ = 27.13^\\circ $$</p>
<p>With \\(R_E = 6371\\text{ km}\\) and satellite orbital radius \\(r = R_E + 1450\\text{ km} = 7821\\text{ km}\\), the slant range \\(d\\) from Boston to LARES is:</p>
<p>$$ d = \\sqrt{R_E^2 + r^2 - 2R_E r\\cos\\theta} = \\sqrt{6371^2 + 7821^2 - 2(6371)(7821)\\cos(27.13^\\circ)} \\approx 3615\\text{ km} $$</p>
<p>Projecting the line-of-sight vector onto Boston's local zenith vector gives the topocentric altitude \\(h\\):</p>
<p>$$ \\sin h = \\frac{r\\cos\\theta - R_E}{d} = \\frac{7821\\cos(27.13^\\circ) - 6371}{3615} \\approx 0.16296 \\implies h \\approx 9.38^\\circ \\approx 9.4^\\circ $$</p>
<p><strong>Part 30 (Voided):</strong> LARES is brightest when passing directly through Boston's zenith at minimum distance \\(d_{\\min} = 1450\\text{ km} = 1.45 \\times 10^6\\text{ m}\\). With radius \\(R_L = 0.182\\text{ m}\\), a sphere intercepting solar flux \\(F_\\odot\\) absorbs power \\(L_L = \\pi R_L^2 F_\\odot\\) and re-emits isotropically over \\(4\\pi d_{\\min}^2\\):</p>
<ul>
    <li><strong>Exact Bolometric Re-radiation:</strong> \\(\\frac{F_L}{F_\\odot} = \\frac{\\pi R_L^2}{4\\pi d_{\\min}^2} = \\left(\\frac{R_L}{2d_{\\min}}\\right)^2 \\implies m_L = -26.74 - 5\\log_{10}\\left(\\frac{0.182}{2.90 \\times 10^6}\\right) = 9.27\\).</li>
    <li><strong>Keyed Formula (omitting the \\(1/4\\) geometric redistribution factor):</strong> \\(m_L = -26.74 - 5\\log_{10}\\left(\\frac{0.182}{1.45 \\times 10^6}\\right) = 7.77\\) (choice <strong>(b)</strong>). Because a zero-albedo blackbody at \\(T \\approx 279\\text{ K}\\) emits in the mid-infrared rather than optical wavelengths and the \\(1/4\\) factor was omitted in the answer choices, Question 30 was voided.</li>
</ul>
<p><strong>Answers:</strong><br>29. <strong>(a)</strong><br>30. <strong>VOIDED — Keyed (b) 7.77 (Exact bolometric: 9.27)</strong></p>`
    }
];