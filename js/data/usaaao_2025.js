// js/data/usaaao_2025.js
export const usaaao_2025 = [
    {
        uniqueId: "q1_usaaao_2025",
        id: "Q1",
        competition: "USAAAO",
        year: 2025,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2/10",
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
        uniqueId: "q4_usaaao_2025",
        id: "Q4",
        competition: "USAAAO",
        year: 2025,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        title: "Hohmann Transfer Coefficient",
        description: `Suppose a rocket around a star of mass \\(M\\) wishes to execute an orbital transfer from a circular orbit with radius \\(R\\) to a larger one with that of radius \\(8R\\). One common way to do this is known as a Hohmann transfer, which has an intermediate elliptical orbit. This process requires two burns, with total delta-v \\(\\Delta v = k \\sqrt{\\frac{GM}{R}}\\) for some \\(k\\). Assuming instantaneous burns, compute \\(k\\).<br><br>
(a) \\( 1 - \\frac{1}{2\\sqrt{2}} \\) <br>
(b) \\( \\frac{1}{2} - \\frac{1}{2\\sqrt{2}} \\) <br>
(c) \\( \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\) <br>
(d) \\( 3\\sqrt{10} - \\frac{1}{2} \\) <br>
(e) \\( 3\\sqrt{10} - \\frac{1}{4} \\)`,
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
<p>$$ v_{c1} = \\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ v_{c2} = \\sqrt{\\frac{GM}{8R}} = \\frac{1}{2\\sqrt{2}}\\sqrt{\\frac{GM}{R}} $$</p>
<p>Using the vis-viva equation \\( v = \\sqrt{GM \\left(\\frac{2}{r} - \\frac{1}{a}\\right)} \\), compute the velocities at perihelion (\\(v_p\\)) and aphelion (\\(v_a\\)) of the transfer ellipse:</p>
<p>$$ v_p = \\sqrt{GM \\left(\\frac{2}{R} - \\frac{2}{9R}\\right)} = \\sqrt{\\frac{16GM}{9R}} = \\frac{4}{3}\\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ v_a = \\sqrt{GM \\left(\\frac{2}{8R} - \\frac{2}{9R}\\right)} = \\sqrt{GM \\left(\\frac{1}{4R} - \\frac{2}{9R}\\right)} = \\sqrt{\\frac{GM}{36R}} = \\frac{1}{6}\\sqrt{\\frac{GM}{R}} $$</p>
<p>Calculate the required \\(\\Delta v\\) for both burns:</p>
<p>$$ \\Delta v_1 = v_p - v_{c1} = \\left(\\frac{4}{3} - 1\\right)\\sqrt{\\frac{GM}{R}} = \\frac{1}{3}\\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ \\Delta v_2 = v_{c2} - v_a = \\left(\\frac{1}{2\\sqrt{2}} - \\frac{1}{6}\\right)\\sqrt{\\frac{GM}{R}} $$</p>
<p>The total delta-v is the sum of the absolute values of both burns:</p>
<p>$$ \\Delta v_{total} = \\Delta v_1 + \\Delta v_2 = \\left( \\frac{1}{3} - \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\right) \\sqrt{\\frac{GM}{R}} $$</p>
<p>$$ \\Delta v_{total} = \\left( \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\right) \\sqrt{\\frac{GM}{R}} $$</p>
<p>Therefore, \\( k = \\frac{1}{6} + \\frac{1}{2\\sqrt{2}} \\).</p>
<p><strong>Answer: (c)</strong></p>`
    },
    {
        uniqueId: "q5_usaaao_2025",
        id: "Q5",
        competition: "USAAAO",
        year: 2025,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "2/10",
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
<p>We are given that the semi-latus rectum is nearly a hundred times smaller than the semi-major axis:</p>
<p>$$ \\frac{l}{a} \\approx \\frac{1}{100} = 0.01 $$</p>
<p>Substitute this ratio into the formula and solve for the eccentricity \\(e\\):</p>
<p>$$ 0.01 = 1 - e^2 $$</p>
<p>$$ e^2 = 0.99 $$</p>
<p>$$ e = \\sqrt{0.99} \\approx 0.994987 $$</p>
<p>The closest value provided in the options is 0.995.</p>
<p><strong>Answer: (b)</strong></p>`
    },
    {
        uniqueId: "q11_12_usaaao_2025",
        id: "Q11-12",
        competition: "USAAAO",
        year: 2025,
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "3/10",
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
<p>According to Kepler's Third Law:</p>
<p>$$ T^2 = \\frac{4\\pi^2}{GM} a^3 $$</p>
<p>For the Solar System, using units of Earth years and Astronomical Units (AU), the constant \\(\\frac{4\\pi^2}{GM_\\odot}\\) is exactly equal to 1. For a system with a central star of mass \\(M = 10 M_\\odot\\), the relation scales as:</p>
<p>$$ T^2 = \\frac{1}{10} a^3 = 0.1 a^3 $$</p>
<p>Take the base-10 logarithm of both sides to linearize the equation:</p>
<p>$$ \\log_{10}(T^2) = \\log_{10}(0.1 \\cdot a^3) $$</p>
<p>$$ 2 \\log_{10} T = \\log_{10}(0.1) + 3 \\log_{10} a $$</p>
<p>$$ 2 \\log_{10} T = -1 + 3 \\log_{10} a $$</p>
<p>$$ \\log_{10} T = \\frac{3}{2} \\log_{10} a - \\frac{1}{2} $$</p>
<p>This is the equation of a line (\\(y = mx + c\\)) where \\(y = \\log_{10} T\\) and \\(x = \\log_{10} a\\).</p>
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
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
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
<p>Calculate the semi-major axis of the satellite (\\(a_s\\)) using the minimum and maximum heights above the planet's surface and the planet's radius (\\(R_p = 3000 \\text{ km}\\)):</p>
<ul>
    <li>\\( r_{min} = 3000 + 1000 = 4000 \\text{ km} \\)</li>
    <li>\\( r_{max} = 3000 + 7000 = 10000 \\text{ km} \\)</li>
</ul>
<p>$$ a_s = \\frac{r_{min} + r_{max}}{2} = \\frac{4000 + 10000}{2} = 7000 \\text{ km} $$</p>
<p>Write Kepler's Third Law for both orbital systems:</p>
<ol>
    <li>Satellite around planet: \\( T_s^2 = \\frac{4\\pi^2}{GM_p} a_s^3 \\)</li>
    <li>Planet around star: \\( T_p^2 = \\frac{4\\pi^2}{GM_*} a_p^3 \\)</li>
</ol>
<p>Divide the two equations to isolate the ratio of the semi-major axes:</p>
<p>$$ \\left( \\frac{T_p}{T_s} \\right)^2 = \\frac{M_p}{M_*} \\left( \\frac{a_p}{a_s} \\right)^3 $$</p>
<p>$$ a_p = a_s \\cdot \\left( \\frac{T_p}{T_s} \\right)^{2/3} \\cdot \\left( \\frac{M_*}{M_p} \\right)^{1/3} $$</p>
<p>Convert the given periods into compatible units (minutes):</p>
<ul>
    <li>\\( T_s = 100 \\text{ minutes} \\)</li>
    <li>\\( T_p = 90 \\text{ days} = 90 \\times 24 \\times 60 = 129,600 \\text{ minutes} \\)</li>
</ul>
<p>Substitute the values, including the mass ratio \\(\\frac{M_*}{M_p} = 10^5\\):</p>
<p>$$ a_p = 7000 \\cdot \\left( \\frac{129600}{100} \\right)^{2/3} \\cdot (10^5)^{1/3} $$</p>
<p>$$ a_p = 7000 \\cdot (1296)^{2/3} \\cdot 10^{5/3} $$</p>
<p>Since \\( 1296 = 36^2 \\), \\( (1296)^{2/3} \\approx 118.84 \\). Also, \\( (10^5)^{1/3} \\approx 46.416 \\).</p>
<p>$$ a_p \\approx 7000 \\cdot 118.84 \\cdot 46.416 \\approx 38,612,416 \\text{ km} \\approx 3.86 \\times 10^7 \\text{ km} $$</p>
<p><strong>Answer: (e)</strong></p>`
    },
    {
        uniqueId: "q19_usaaao_2025",
        id: "Q19",
        competition: "USAAAO",
        year: 2025,
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
        uniqueId: "q26_usaaao_2025",
        id: "Q26",
        competition: "USAAAO",
        year: 2025,
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
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
<p>Since both planets are in circular orbits starting at the ascending node simultaneously, their true anomalies as a function of time \\(t\\) (in years) are:</p>
<ul>
    <li>Planet 1 (\\(T_1 = 2 \\text{ yr}\\)): \\(\\theta_1(t) = \\frac{2\\pi}{2} t = \\pi t\\)</li>
    <li>Planet 2 (\\(T_2 = 1 \\text{ yr}\\)): \\(\\theta_2(t) = \\frac{2\\pi}{1} t = 2\\pi t\\)</li>
</ul>
<p>Notice that \\(\\theta_2 = 2\\theta_1\\).</p>
<p>For the two planets to share an equal ecliptic longitude, \\(\\lambda_1 = \\lambda_2\\), which implies \\(\\tan(\\lambda_1) = \\tan(\\lambda_2)\\):</p>
<p>$$ \\cos(30^\\circ) \\tan(\\theta_1) = \\cos(70^\\circ) \\tan(\\theta_2) $$</p>
<p>$$ \\cos(30^\\circ) \\tan(\\theta_1) = \\cos(70^\\circ) \\tan(2\\theta_1) $$</p>
<p>Use the double-angle tangent identity \\(\\tan(2\\theta_1) = \\frac{2\\tan(\\theta_1)}{1 - \\tan^2(\\theta_1)}\\):</p>
<p>$$ \\cos(30^\\circ) \\tan(\\theta_1) = \\cos(70^\\circ) \\frac{2\\tan(\\theta_1)}{1 - \\tan^2(\\theta_1)} $$</p>
<p>Assuming \\(t > 0\\) (so \\(\\tan(\\theta_1) \\neq 0\\)), divide both sides by \\(\\tan(\\theta_1)\\):</p>
<p>$$ \\cos(30^\\circ) = \\frac{2\\cos(70^\\circ)}{1 - \\tan^2(\\theta_1)} $$</p>
<p>$$ 1 - \\tan^2(\\theta_1) = \\frac{2\\cos(70^\\circ)}{\\cos(30^\\circ)} $$</p>
<p>Calculate the numerical values:</p>
<p>$$ 1 - \\tan^2(\\theta_1) = \\frac{2 \\cdot 0.3420}{0.8660} \\approx \\frac{0.6840}{0.8660} \\approx 0.7898 $$</p>
<p>$$ \\tan^2(\\theta_1) = 1 - 0.7898 = 0.2102 $$</p>
<p>$$ \\tan(\\theta_1) = \\sqrt{0.2102} \\approx 0.4585 $$</p>
<p>Solve for \\(\\theta_1\\):</p>
<p>$$ \\theta_1 = \\arctan(0.4585) \\approx 0.4299 \\text{ radians} $$</p>
<p>Convert the angle back to time \\(t\\):</p>
<p>$$ t = \\frac{\\theta_1}{\\pi} = \\frac{0.4299}{\\pi} \\approx 0.1368 \\text{ years} $$</p>
<p>Convert years into days (assuming 365.25 days/year):</p>
<p>$$ t_{days} = 0.1368 \\times 365.25 \\approx 49.97 \\text{ days} $$</p>
<p>This is approximately 50 days.</p>
<p><strong>Answer: (e)</strong></p>`
    }
];