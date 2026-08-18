// js/data/usaaao_2023.js
export const usaaao_2023 = [
    {
        uniqueId: "q8_usaaao_2023",
        id: "Q8",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Comet Fragmentation Escape",
        description: `A comet passes near the Sun on a parabolic orbit. While it's passing near the Sun with orbital velocity \\(V\\), the Sun's heat causes the comet to melt, and it shatters into many small fragments. The fragments move away uniformly in all directions (in the comet's reference frame) with velocity \\(v \\ll V\\). What fraction of the fragments will escape the solar system? Ignore any forces other than the Sun's gravity.<br><br>
(a) 0% <br>
(b) 50% <br>
(c) 100% <br>
(d) \\( \\frac{v}{V} \\) <br>
(e) \\( 1 - \\frac{v}{V} \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: For a comet on a parabolic orbit, its velocity \\(V\\) is exactly equal to the local escape velocity. For fragments to escape the solar system, their new total velocity relative to the Sun must be greater than or equal to \\(V\\).</p>
<p><strong>Step 1: Apply the Law of Cosines</strong></p>
<p>Let \\(\\theta\\) be the angle between the comet's original velocity vector \\(\\vec{V}\\) and the fragment's ejection velocity vector \\(\\vec{v}\\). Using the law of cosines for vector addition, the new squared speed \\(v_{new}^2\\) is:</p>
<p>$$ v_{new}^2 = V^2 + v^2 + 2vV \\cos\\theta $$</p>
<p><strong>Step 2: Solve the Escape Inequality</strong></p>
<p>For the fragment to escape, we require \\(v_{new}^2 \\ge V^2\\):</p>
<p>$$ V^2 + v^2 + 2vV \\cos\\theta \\ge V^2 $$</p>
<p>$$ v^2 + 2vV \\cos\\theta \\ge 0 $$</p>
<p>$$ \\cos\\theta \\ge -\\frac{v}{2V} $$</p>
<p><strong>Step 3: Analyze the Limit</strong></p>
<p>Since the problem states that \\(v \\ll V\\), the term \\(-\\frac{v}{2V}\\) is infinitesimally close to 0. The escape condition becomes:</p>
<p>$$ \\cos\\theta \\ge 0 \\implies -90^\\circ \\le \\theta \\le 90^\\circ $$</p>
<p>This physically means that exactly the forward-facing hemisphere of fragments receives enough of a velocity boost to escape. Thus, exactly 50% of the fragments escape.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q9_usaaao_2023",
        id: "Q9",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        title: "Galaxy Mass Calculation",
        description: `Consider Galaxies A and B, both of which have radius \\(R\\). At a distance \\(R\\) from its center, Galaxy A's rotational velocity is equal to \\(v\\). Meanwhile, Galaxy B's radial velocity dispersion is also equal to \\(v\\). However, galaxy A is spiral while galaxy B is spherical elliptical and composed of uniform, evenly-spaced stars. Calculate the masses of both galaxies. (Answer choices are listed as \\(m_A\\); \\(m_B\\)).<br><br>
(a) \\( v^2R/G \\) ; \\( v^2R/G \\) <br>
(b) \\( v^2R/G \\) ; \\( 5/6 v^2R/G \\) <br>
(c) \\( v^2R/G \\) ; \\( 5/4 v^2R/G \\) <br>
(d) \\( v^2R/G \\) ; \\( 5v^2R/G \\) <br>
(e) \\( 5/2 v^2R/G \\) ; \\( v^2R/G \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Mass derivation from dynamics. For a spiral galaxy, the mass is derived using circular motion. For an elliptical galaxy, the mass is derived using the Virial Theorem.</p>
<p><strong>Step 1: Mass of Galaxy A (Spiral)</strong></p>
<p>The stars are in circular orbits at radius \\(R\\) with rotational velocity \\(v\\). Balancing centripetal acceleration and gravity:</p>
<p>$$ \\frac{v^2}{R} = \\frac{GM_A}{R^2} \\implies M_A = \\frac{v^2 R}{G} $$</p>
<p><strong>Step 2: Mass of Galaxy B (Elliptical)</strong></p>
<p>The galaxy is a uniform spherical cluster supported by velocity dispersion. We use the Virial Theorem: \\(2K + U = 0\\).</p>
<p>The total kinetic energy \\(K\\) relies on the 3D velocity dispersion. Since the radial velocity dispersion is \\(v\\), and assuming isotropy, the 3D velocity dispersion is \\(\\sigma^2 = 3v^2\\).</p>
<p>$$ K = \\frac{1}{2} M_B (3v^2) = \\frac{3}{2} M_B v^2 $$</p>
<p>The gravitational potential energy \\(U\\) of a uniform sphere of radius \\(R\\) is:</p>
<p>$$ U = -\\frac{3}{5} \\frac{GM_B^2}{R} $$</p>
<p>Applying the Virial Theorem:</p>
<p>$$ 2 \\left( \\frac{3}{2} M_B v^2 \\right) - \\frac{3}{5} \\frac{GM_B^2}{R} = 0 $$</p>
<p>$$ 3 M_B v^2 = \\frac{3}{5} \\frac{GM_B^2}{R} \\implies M_B = \\frac{5 v^2 R}{G} $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q10_usaaao_2023",
        id: "Q10",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        title: "Free-Fall to Venus",
        description: `Consider a satellite that has a circular orbit with a radius of \\(6.0 \\times 10^8\\) m around Venus. Due to a failure in its ignition system, the satellite's orbital velocity was suddenly decreased to zero during a maneuver. How long does the satellite take to hit the surface of the planet? Consider that the mass of Venus is \\(4.67 \\times 10^{24}\\) kg and neglect any gravitational effects on the satellite other than that from Venus.<br><br>
(a) 15 hours.<br>
(b) 3 days.<br>
(c) 11 days.<br>
(d) 25 days.<br>
(e) 37 days.`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Free-fall time to a massive body. When the orbital velocity drops to zero, the object essentially enters a highly degenerate elliptical orbit (a straight line) where the apocenter is the initial radius, and the pericenter is 0.</p>
<p><strong>Step 1: Identify Degenerate Orbit Parameters</strong></p>
<p>The semi-major axis \\(a\\) of this degenerate ellipse is half of the initial radius \\(R_0\\):</p>
<p>$$ a = \\frac{R_0}{2} = \\frac{6.0 \\times 10^8}{2} = 3.0 \\times 10^8 \\text{ m} $$</p>
<p><strong>Step 2: Calculate the Fall Time</strong></p>
<p>The time it takes to fall to the center is exactly half of the orbital period of this degenerate ellipse (from apocenter to pericenter). Since the radius of Venus is tiny compared to \\(R_0\\), the time to hit the surface is practically identical to the time to hit the center.</p>
<p>$$ t_{fall} = \\frac{P}{2} = \\frac{1}{2} \\sqrt{\\frac{4\\pi^2 a^3}{GM}} = \\pi \\sqrt{\\frac{a^3}{GM}} $$</p>
<p>We are given the mass of Venus \\(M = 4.67 \\times 10^{24} \\text{ kg}\\) and \\(G = 6.674 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2\\).</p>
<p>$$ GM \\approx 3.117 \\times 10^{14} \\text{ m}^3\\text{s}^{-2} $$</p>
<p>$$ a^3 = (3.0 \\times 10^8)^3 = 2.7 \\times 10^{26} \\text{ m}^3 $$</p>
<p>$$ t_{fall} = \\pi \\sqrt{\\frac{2.7 \\times 10^{26}}{3.117 \\times 10^{14}}} = \\pi \\sqrt{8.66 \\times 10^{11}} \\approx \\pi \\times 9.307 \\times 10^5 \\approx 2.92 \\times 10^6 \\text{ s} $$</p>
<p>Convert seconds to days:</p>
<p>$$ t_{days} = \\frac{2.92 \\times 10^6}{86400} \\approx 10.7 \\text{ days} $$</p>
<p>This rounds to 11 days.</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q12_usaaao_2023",
        id: "Q12",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "hard",
        icon: "skull",
        difficultyText: "8/10",
        title: "Time Segment of an Elliptical Orbit",
        description: `A planet is in an elliptical orbit around a star. Let \\(r_{min}\\) be the minimum distance between the planet and star, and let \\(r_{max}\\) be the maximum distance between the planet and star. Suppose that \\(r_{max} = 4r_{min}\\). During what percentage of the time period of each orbit is the planet at least \\(\\frac{5}{2}r_{min}\\) away from the star?<br><br>
(a) 23% <br>
(b) 50% <br>
(c) 57% <br>
(d) 69% <br>
(e) 77%`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Time spent on a segment of an elliptical orbit, which requires relating the true/eccentric anomaly to the mean anomaly via Kepler's Equation.</p>
<p><strong>Step 1: Find Eccentricity and Semi-Major Axis</strong></p>
<p>We are given \\(r_{max} = 4 r_{min}\\). Since \\(r_{max} = a(1+e)\\) and \\(r_{min} = a(1-e)\\):</p>
<p>$$ a(1+e) = 4a(1-e) \\implies 1+e = 4 - 4e \\implies 5e = 3 \\implies e = 0.6 $$</p>
<p>The threshold distance is \\(r \\ge \\frac{5}{2}r_{min}\\). In terms of \\(a\\):</p>
<p>$$ r_{min} = a(1 - 0.6) = 0.4a $$</p>
<p>$$ \\frac{5}{2} r_{min} = 2.5(0.4a) = a $$</p>
<p>We need to find the fraction of the period where \\(r \\ge a\\).</p>
<p><strong>Step 2: Relate distance to Eccentric Anomaly</strong></p>
<p>The distance \\(r\\) in terms of the eccentric anomaly \\(E\\) is \\(r = a(1 - e\\cos E)\\). We want \\(r \\ge a\\):</p>
<p>$$ a(1 - e\\cos E) \\ge a \\implies 1 - e\\cos E \\ge 1 \\implies \\cos E \\le 0 $$</p>
<p>This occurs when \\(E\\) is between \\(\\pi/2\\) and \\(3\\pi/2\\).</p>
<p><strong>Step 3: Calculate Mean Anomaly Change</strong></p>
<p>The time fraction is given by the change in the mean anomaly \\(M\\), where \\(M = E - e\\sin E\\).</p>
<p>$$ M_{end} = \\frac{3\\pi}{2} - e\\sin\\left(\\frac{3\\pi}{2}\\right) = \\frac{3\\pi}{2} - e(-1) = \\frac{3\\pi}{2} + e $$</p>
<p>$$ M_{start} = \\frac{\\pi}{2} - e\\sin\\left(\\frac{\\pi}{2}\\right) = \\frac{\\pi}{2} - e(1) = \\frac{\\pi}{2} - e $$</p>
<p>The change in mean anomaly is:</p>
<p>$$ \\Delta M = M_{end} - M_{start} = \\left(\\frac{3\\pi}{2} + e\\right) - \\left(\\frac{\\pi}{2} - e\\right) = \\pi + 2e $$</p>
<p><strong>Step 4: Percentage of Orbital Period</strong></p>
<p>The percentage of the total orbital period (\\(2\\pi\\)) is:</p>
<p>$$ \\text{Fraction} = \\frac{\\Delta M}{2\\pi} = \\frac{\\pi + 2(0.6)}{2\\pi} = 0.5 + \\frac{0.6}{\\pi} \\approx 0.5 + 0.191 = 0.691 $$</p>
<p>This is 69%.</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2023",
        id: "Q19",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "7/10",
        title: "Radial Velocity and Exoplanet Mass",
        description: `In 1995, researchers at the University of Geneva discovered an exoplanet in the main-sequence star 51 Pegasi. This was the first-ever discovery of an exoplanet orbiting a Sun-like star! When they observed the star, a periodic Doppler shifting of its stellar spectrum indicated that its radial velocity was varying sinusoidally; this wobbling could be explained if the star was being pulled in a circle by the gravity of an exoplanet. The radial velocity sinusoid of 51 Pegasi was measured to have a semi-amplitude of 56 m/s with a period of 4.2 days, and the mass of the star is known to be \\(1.1 M_\\odot\\). Assuming that the researchers at Geneva viewed the planet's orbit edge-on and that the orbit was circular, what is the mass of the exoplanet in Jupiter masses?<br><br>
(a) \\( 0.81 M_J \\) <br>
(b) \\( 0.75 M_J \\) <br>
(c) \\( 0.69 M_J \\) <br>
(d) \\( 0.47 M_J \\) <br>
(e) \\( 0.33 M_J \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Exoplanet mass determination using the radial velocity method, where the star is pulled into a small reflex orbit.</p>
<p><strong>Step 1: The Radial Velocity Equation</strong></p>
<p>For a circular orbit viewed edge-on (\\(i = 90^\\circ\\)), the semi-amplitude \\(K\\) of the star's radial velocity is:</p>
<p>$$ K = \\left(\\frac{2\\pi G}{P}\\right)^{1/3} \\frac{m_p}{(M_* + m_p)^{2/3}} $$</p>
<p>Assuming the mass of the exoplanet is much smaller than the star (\\(m_p \\ll M_*\\)), this simplifies to:</p>
<p>$$ K \\approx \\left(\\frac{2\\pi G}{P}\\right)^{1/3} m_p M_*^{-2/3} \\implies m_p = K M_*^{2/3} \\left(\\frac{P}{2\\pi G}\\right)^{1/3} $$</p>
<p><strong>Step 2: Plug in standard constants and variables</strong></p>
<p>We are given:</p>
<ul>
    <li>\\( K = 56 \\text{ m/s} \\)</li>
    <li>\\( P = 4.2 \\text{ days} = 362880 \\text{ s} \\)</li>
    <li>\\( M_* = 1.1 M_\\odot = 1.1 \\times 1.989 \\times 10^{30} \\text{ kg} \\approx 2.188 \\times 10^{30} \\text{ kg} \\)</li>
</ul>
<p>Calculate the components:</p>
<ul>
    <li>\\( \\frac{P}{2\\pi G} = \\frac{362880}{2\\pi \\times 6.674 \\times 10^{-11}} \\approx 8.653 \\times 10^{14} \\text{ kg}\\cdot\\text{s}^2/\\text{m}^3 \\)</li>
    <li>\\( (P / 2\\pi G)^{1/3} \\approx 9.529 \\times 10^4 \\)</li>
    <li>\\( M_*^{2/3} = (2.188 \\times 10^{30})^{2/3} \\approx 1.685 \\times 10^{20} \\)</li>
</ul>
<p>Now calculate \\(m_p\\):</p>
<p>$$ m_p = 56 \\times 1.685 \\times 10^{20} \\times 9.529 \\times 10^4 \\approx 8.99 \\times 10^{26} \\text{ kg} $$</p>
<p><strong>Step 3: Convert to Jupiter Masses</strong></p>
<p>Convert to Jupiter masses (\\(M_J \\approx 1.898 \\times 10^{27} \\text{ kg}\\)):</p>
<p>$$ m_p \\text{ (in } M_J\\text{)} = \\frac{8.99 \\times 10^{26}}{1.898 \\times 10^{27}} \\approx 0.474 M_J $$</p>
<p><strong>Answer: (d)</strong></p>`
    },
    {
        uniqueId: "q21_usaaao_2023",
        id: "Q21",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Binary Mass from Astrometry",
        description: `Consider the binary system Kepler-16, which has the primary star Kepler-16A and the secondary star Kepler-16B. It has an orbital period \\(P = 41.08\\) days and the measured parallax is \\(p = 13.29\\) mas. Calculate the total mass of the stars, using the fact that their maximum angular separation measured from Earth is \\(\\theta = 2.98\\) mas and they are on an edge-on orbit.<br><br>
(a) \\( 0.756 M_\\odot \\) <br>
(b) \\( 0.803 M_\\odot \\) <br>
(c) \\( 0.891 M_\\odot \\) <br>
(d) \\( 0.987 M_\\odot \\) <br>
(e) \\( 1.326 M_\\odot \\)`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Determining the total mass of a binary system using Kepler's Third Law combined with visual binary astrometry (angular separation and parallax).</p>
<p><strong>Step 1: Calculate the Physical Semi-Major Axis</strong></p>
<p>First, we find the physical semi-major axis \\(a\\) of the system in Astronomical Units (AU). The angular separation \\(\\theta\\) and parallax \\(p\\) (both in arcseconds or milliarcseconds) relate to the physical separation by:</p>
<p>$$ a \\text{ (in AU)} = \\frac{\\theta}{p} $$</p>
<p>Given \\(\\theta = 2.98 \\text{ mas}\\) and \\(p = 13.29 \\text{ mas}\\):</p>
<p>$$ a = \\frac{2.98}{13.29} \\approx 0.2242 \\text{ AU} $$</p>
<p><strong>Step 2: Convert Orbital Period</strong></p>
<p>Next, convert the orbital period into years:</p>
<p>$$ P = \\frac{41.08 \\text{ days}}{365.25 \\text{ days/year}} \\approx 0.1125 \\text{ years} $$</p>
<p><strong>Step 3: Apply Kepler's Third Law</strong></p>
<p>Using Kepler's Third Law in solar system units (\\(a\\) in AU, \\(P\\) in years, \\(M\\) in \\(M_\\odot\\)):</p>
<p>$$ M_{tot} = \\frac{a^3}{P^2} $$</p>
<p>$$ M_{tot} = \\frac{(0.2242)^3}{(0.1125)^2} = \\frac{0.01127}{0.01266} \\approx 0.891 M_\\odot $$</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q22_usaaao_2023",
        id: "Q22",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        title: "Habitable Zone Eccentricity",
        description: `The habitable zone of a star is defined as the one where water in the liquid state can exist in the surface of a planet. Therefore, considering that the planets are ideal black bodies with fast rotation, determine the maximum eccentricity that the orbit of a planet can have so that it can be home to life. Ignore any thermodynamic effects that might happen in the atmosphere or the sidereal space. Consider that the melting point of water is 273 K and the boiling point is 373 K.<br><br>
(a) 0.274 <br>
(b) 0.302 <br>
(c) 0.316 <br>
(d) 0.328 <br>
(e) 0.540`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Planetary equilibrium temperature and evaluating orbital eccentricity constraints to remain within the Habitable Zone.</p>
<p><strong>Step 1: Set up Proportionalities</strong></p>
<p>The equilibrium temperature \\(T\\) of a fast-rotating ideal blackbody planet scales with distance \\(r\\) from the star as \\(T \\propto \\frac{1}{\\sqrt{r}}\\). Therefore, the orbital distance scales as \\(r \\propto \\frac{1}{T^2}\\).</p>
<p><strong>Step 2: Evaluate Temperature Extremes</strong></p>
<p>To maintain liquid water, the planet's temperature must stay within \\(T_{max} = 373 \\text{ K}\\) and \\(T_{min} = 273 \\text{ K}\\) at all points in its orbit. This means the perihelion (\\(r_{min}\\)) must not be hotter than 373 K, and the aphelion (\\(r_{max}\\)) must not be colder than 273 K.</p>
<p>$$ \\frac{r_{max}}{r_{min}} = \\frac{1 / T_{min}^2}{1 / T_{max}^2} = \\left(\\frac{T_{max}}{T_{min}}\\right)^2 = \\left(\\frac{373}{273}\\right)^2 \\approx (1.3663)^2 \\approx 1.8668 $$</p>
<p><strong>Step 3: Solve for Eccentricity</strong></p>
<p>In an elliptical orbit, \\(r_{max} = a(1+e)\\) and \\(r_{min} = a(1-e)\\). Equating the ratio:</p>
<p>$$ \\frac{1+e}{1-e} = 1.8668 $$</p>
<p>$$ 1+e = 1.8668 - 1.8668e $$</p>
<p>$$ 2.8668e = 0.8668 \\implies e = \\frac{0.8668}{2.8668} \\approx 0.302 $$</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q26_usaaao_2023",
        id: "Q26",
        competition: "USAAAO",
        year: 2023,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "7/10",
        title: "Grazing Comet Hyperbola",
        description: `A comet is approaching our solar system from the depths of space with a velocity of 10000 m/s, and if it continues moving in a straight line on its current trajectory, it will just barely graze the surface of the Sun! What is the eccentricity of the comet's orbit?<br><br>
(a) 1.00014 <br>
(b) 1.000014 <br>
(c) 1.0000014 <br>
(d) 1.00000014 <br>
(e) 1.000000014`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 20px;">Concept: Hyperbolic orbit geometry based on impact parameters and asymptotes.</p>
<p><strong>Step 1: Identify Parameters</strong></p>
<p>The phrase "if it continues moving in a straight line on its current trajectory, it will just barely graze the surface of the Sun" describes the incoming asymptote of the hyperbolic orbit. The distance from the focus (the Sun) to the asymptote is the impact parameter \\(b\\). Thus, \\(b = R_\\odot\\).</p>
<p>For a hyperbolic orbit:</p>
<ol>
    <li>The semi-major axis is \\(a = \\frac{\\mu}{v_\\infty^2}\\), where \\(v_\\infty\\) is the excess velocity at infinity.</li>
    <li>The impact parameter relates to \\(a\\) and eccentricity \\(e\\) by \\(b = a\\sqrt{e^2 - 1}\\).</li>
</ol>
<p><strong>Step 2: Algebraic Manipulation</strong></p>
<p>Substitute \\(a\\) into the impact parameter equation:</p>
<p>$$ R_\\odot = \\left(\\frac{\\mu}{v_\\infty^2}\\right) \\sqrt{e^2 - 1} $$</p>
<p>$$ \\sqrt{e^2 - 1} = \\frac{R_\\odot v_\\infty^2}{\\mu} $$</p>
<p>$$ e^2 = 1 + \\left( \\frac{R_\\odot v_\\infty^2}{\\mu} \\right)^2 $$</p>
<p><strong>Step 3: Calculation with Binomial Approximation</strong></p>
<p>We are given \\(v_\\infty = 10,000 \\text{ m/s}\\). Using standard solar parameters:</p>
<ul>
    <li>\\( \\mu = GM_\\odot \\approx 1.327 \\times 10^{20} \\text{ m}^3\\text{s}^{-2} \\)</li>
    <li>\\( R_\\odot \\approx 6.957 \\times 10^8 \\text{ m} \\)</li>
</ul>
<p>Let \\(x = \\frac{R_\\odot v_\\infty^2}{\\mu}\\):</p>
<p>$$ x = \\frac{(6.957 \\times 10^8)(10^4)^2}{1.327 \\times 10^{20}} = \\frac{6.957 \\times 10^{16}}{1.327 \\times 10^{20}} \\approx 5.24 \\times 10^{-4} $$</p>
<p>Since \\(x \\ll 1\\), we can use the binomial approximation \\(\\sqrt{1 + x^2} \\approx 1 + \\frac{x^2}{2}\\):</p>
<p>$$ e = \\sqrt{1 + x^2} \\approx 1 + \\frac{(5.24 \\times 10^{-4})^2}{2} $$</p>
<p>$$ e \\approx 1 + \\frac{2.74 \\times 10^{-7}}{2} = 1 + 1.37 \\times 10^{-7} $$</p>
<p>$$ e \\approx 1.00000014 $$</p>
<p><strong>Answer: (d)</strong></p>`
    }
];