// js/data/rotations_data.js

// Cycle Start: 00:00:00 UT on 19 October 2026 (JS months are 0-indexed: 9 = October)
export const EPOCH_UTC = Date.UTC(2026, 9, 19, 0, 0, 0);

export const CYCLE_MS = {
    potd: 1 * 24 * 60 * 60 * 1000,   // 1 Day (24 hours)
    potw: 7 * 24 * 60 * 60 * 1000,   // 1 Week (7 days)
    potm: 28 * 24 * 60 * 60 * 1000   // 4 Weeks (28 days)
};

// ============================================================================
// 1. PROBLEM OF THE DAY (POTD) — 1-DAY CYCLE (10.0 POINTS EACH)
// ============================================================================
export const potdProblems = [
    // Day 01 — 19.10.2026
    {
        uniqueId: "potd_2026_10_19",
        dayNumber: 1,
        scheduledDate: "19.10.2026",
        title: "The Night of Two Stars",
        author: "Albert",
        module: "T1 · Positional Astronomy & Refraction",
        difficultyClass: "medium",
        difficultyText: "4.4 / 10.0",
        description: `<p>Albert, Mihai, and Alex are conducting astronomical observations on the night of <strong>June 2nd</strong> from an unknown location at longitude \\(\\lambda = 24.81^\\circ\\text{ E}\\).</p>
<p>At local standard time \\(t = 23^{\\text{h}}22^{\\text{m}}27^{\\text{s}}\\) (time zone \\(\\text{UTC}+2\\)), Albert observes the <strong>apparent (refracted) rising</strong> of the star Sadalmelik (\\(\\alpha_1 = 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}}\\), \\(\\delta_1 = -0^\\circ 19' 14''\\)), taking into account standard atmospheric refraction at the horizon (\\(R_0 = 34'\\)). The equation of time is assumed to be negligible.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the exact latitude \\(\\phi\\) of the observer's location, accounting for standard atmospheric refraction. <em>(4.5 points)</em></li>
    <li>Mihai claims that the system \\(\\zeta\\) Lyrae (\\(\\alpha_2 = 18^{\\text{h}}44^{\\text{m}}50^{\\text{s}}\\), \\(\\delta_2 = +37^\\circ 35' 34''\\)) will set before Sadalmelik. Albert disagrees. Alex is asked to settle the debate by calculating the exact time difference \\(\\Delta t = t_{\\text{set},\\,\\zeta\\text{ Lyrae}} - t_{\\text{set},\\,\\text{Sadalmelik}}\\). What should Alex answer, and what is the exact value of the interval \\(\\Delta t\\)? Determine whether either of the two setting events occurs during astronomical night (when the Sun's altitude \\(h_\\odot \\le -18^\\circ\\)). <em>(5.5 points)</em></li>
</ol>`
    },

    // Day 02 — 20.10.2026
    {
        uniqueId: "potd_2026_10_20",
        dayNumber: 2,
        scheduledDate: "20.10.2026",
        title: "A Morning Comet",
        author: "Mihai",
        module: "T1 · Positional & Celestial Mechanics",
        difficultyClass: "medium",
        difficultyText: "4.8 / 10.0",
        description: `<p>An astronomer located at \\(44.84^\\circ\\text{ N}\\) and \\(24.88^\\circ\\text{ E}\\) observes a bright comet before sunrise, on the morning of the spring equinox. The comet orbits the Sun on an elliptical orbit, with semi-major axis \\(a = 35\\text{ AU}\\) and eccentricity \\(e = 0.98\\). The observation takes place when the comet is at \\(d = 0.2\\text{ AU}\\) away from Earth. The last recorded coordinates of the comet from that day are zenith distance \\(z = 83.47^\\circ\\) and azimuth \\(A = 92.42^\\circ\\).</p>
<p>Assume that the comet is bright enough to be visible during twilight, but dim enough to be invisible in daylight. Also assume that the observations ended when the comet became invisible.</p>
<div style="background: rgba(53, 230, 255, 0.08); border-left: 3px solid var(--accent-blue); padding: 12px 16px; border-radius: 6px; margin-top: 12px;">
    <strong>Find the date when the comet will reach perihelion. Neglect atmospheric effects.</strong> <em>(10.0 points)</em>
</div>`
    },

    // Day 03 — 21.10.2026
    {
        uniqueId: "potd_2026_10_21",
        dayNumber: 3,
        scheduledDate: "21.10.2026",
        title: "The Eccentric Binary",
        author: "Albert",
        module: "T4 · Stellar Parameters & Binaries",
        difficultyClass: "easy",
        difficultyText: "2.9 / 10.0",
        description: `<p>A double-lined spectroscopic binary consists of two stars moving in eccentric orbits around their common center of mass. Its orbital period is \\(P = 8.00\\text{ days}\\), eccentricity is \\(e = 0.30\\), and orbital inclination is \\(i = 60.0^\\circ\\). The measured radial-velocity semi-amplitudes are:</p>
<p>$$ K_1 = 120\\ \\mathrm{km\\,s^{-1}}, \\qquad K_2 = 180\\ \\mathrm{km\\,s^{-1}} $$</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the mass ratio \\(M_1/M_2\\). <em>(1.0 point)</em></li>
    <li>Calculate the semimajor axes \\(a_1\\) and \\(a_2\\) of the individual orbits around the center of mass. <em>(2.0 points)</em></li>
    <li>Determine the individual stellar masses in solar masses. <em>(2.0 points)</em></li>
    <li>Calculate the minimum and maximum separation between the two stars during their orbit. <em>(1.5 points)</em></li>
    <li>Calculate the orbital speed of each star at periastron. <em>(1.5 points)</em></li>
    <li>A student analyzes the same system assuming a circular, edge-on orbit and uses the measured values of \\(K_1\\), \\(K_2\\), and \\(P\\). Determine the total mass inferred by the student and the percentage error relative to the true total mass. <em>(2.0 points)</em></li>
</ol>`
    },

    // Day 04 — 22.10.2026
    {
        uniqueId: "potd_2026_10_22",
        dayNumber: 4,
        scheduledDate: "22.10.2026",
        title: "Exposure Time (Comet 3I/ATLAS)",
        author: "Mihai",
        module: "T3 · Astronomical Instrumentation",
        difficultyClass: "medium",
        difficultyText: "4.0 / 10.0",
        description: `<p>You are given an image of the interstellar comet 3I/ATLAS, taken on 13-12-2025, captured with an ASI2600MC Pro (pixel size of \\(3.76\\ \\mu\\text{m}\\)) camera mounted on a \\(200\\text{ mm},\\ f/5\\) telescope. The image is \\(4455\\text{ pixels}\\) long and \\(3277\\text{ pixels}\\) wide. On the image, 4 celestial objects have been annotated: the comet, 2 asteroids, and a galaxy. <strong>Find the exposure time of the image.</strong> <em>(10.0 points)</em></p>
<img src="assets/img/potd/exposure_time_3i_atlas.png" alt="3I/ATLAS Annotated Field" class="user-diagram" onclick="window.openImageModal(this)">
<table style="width:100%; border-collapse:collapse; margin-top:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Parameter</th>
            <th style="padding:8px;">1737 Severny</th>
            <th style="padding:8px;">3906 Chao</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">Relative velocity</td>
            <td style="padding:8px;">34.6 km/s</td>
            <td style="padding:8px;">35.1 km/s</td>
        </tr>
        <tr>
            <td style="padding:8px;">Distance from Earth</td>
            <td style="padding:8px;">3.1 AU</td>
            <td style="padding:8px;">2.92 AU</td>
        </tr>
    </tbody>
</table>`
    },

    // Day 05 — 23.10.2026
    {
        uniqueId: "potd_2026_10_23",
        dayNumber: 5,
        scheduledDate: "23.10.2026",
        title: "Starlight Behind Dust",
        author: "Albert",
        module: "T6 · Interstellar Medium & Extinction",
        difficultyClass: "easy",
        difficultyText: "1.4 / 10.0",
        description: `<p>A star has apparent visual magnitude \\(m_V = 12.40\\) and absolute visual magnitude \\(M_V = +2.10\\). Its measured colour excess is \\(E(B-V) = 0.35\\). For this line of sight, the visual extinction is \\(A_V = 3.1 E(B-V)\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the distance to the star in parsecs. <em>(3.0 points)</em></li>
    <li>Determine the distance that would be inferred if interstellar extinction were ignored. <em>(2.5 points)</em></li>
    <li>Calculate the ratio of the incorrect distance to the correct distance. <em>(2.0 points)</em></li>
    <li>Determine the apparent magnitude the star would have if placed at a distance of \\(100\\text{ pc}\\), with the same extinction. <em>(2.5 points)</em></li>
</ol>`
    },

    // Day 06 — 24.10.2026
    {
        uniqueId: "potd_2026_10_24",
        dayNumber: 6,
        scheduledDate: "24.10.2026",
        title: "The Fuel Gauge of a Massive Star",
        author: "Albert",
        module: "T7 · Stellar Evolution",
        difficultyClass: "easy",
        difficultyText: "1.2 / 10.0",
        description: `<p>A main-sequence star has mass \\(4M_\\odot\\) and luminosity \\(64L_\\odot\\). Assume that \\(12\\%\\) of its total mass is available as nuclear fuel during its main-sequence lifetime. For the Sun, assume that \\(10\\%\\) of its mass is available as fuel and that its main-sequence lifetime is \\(10^{10}\\text{ years}\\). The amount of energy released per unit mass of fuel is the same for both stars.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Estimate the main-sequence lifetime of the star. <em>(3.0 points)</em></li>
    <li>If the star has already consumed \\(70\\%\\) of its available main-sequence fuel, estimate its remaining main-sequence lifetime. <em>(2.0 points)</em></li>
    <li>Recalculate the total lifetime if the fraction of mass available as fuel is assumed to be \\(10\\%\\), as for the Sun. <em>(2.5 points)</em></li>
    <li>Calculate the percentage difference between the two lifetime estimates. <em>(2.5 points)</em></li>
</ol>`
    },

    // Day 07 — 25.10.2026
    {
        uniqueId: "potd_2026_10_25",
        dayNumber: 7,
        scheduledDate: "25.10.2026",
        title: "The Aberrated Star",
        author: "Albert",
        module: "T1 · Positional Astronomy",
        difficultyClass: "easy",
        difficultyText: "1.8 / 10.0",
        description: `<p>The Earth moves around the Sun on a circular orbit with orbital speed \\(v = 29.8\\ \\mathrm{km\\,s^{-1}}\\). A distant star lies exactly in the ecliptic plane. Take \\(c = 3.00 \\times 10^5\\ \\mathrm{km\\,s^{-1}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>At what two orbital configurations during the year is the apparent angular displacement of the star due to annual aberration largest? <em>(3.0 points)</em></li>
    <li>Calculate the maximum angular displacement using the small-angle approximation \\(\\tan\\theta \\simeq \\theta \\simeq \\frac{v}{c}\\). <em>(3.0 points)</em></li>
    <li>Suppose the star is instead observed at an ecliptic latitude of \\(30^\\circ\\). Determine the maximum aberrational displacement and express it in arcseconds. <em>(4.0 points)</em></li>
</ol>`
    },

    // Day 08 — 26.10.2026
    {
        uniqueId: "potd_2026_10_26",
        dayNumber: 8,
        scheduledDate: "26.10.2026",
        title: "The Unequal Solar Days",
        author: "Albert",
        module: "T1 · Positional Astronomy & Timekeeping",
        difficultyClass: "easy",
        difficultyText: "2.5 / 10.0",
        description: `<p>The Earth's sidereal rotation period is \\(T_{\\mathrm{rot}} = 23\\text{ h } 56\\text{ min } 4.09\\text{ s}\\). Its orbital period is \\(365.256\\text{ days}\\) and its orbital eccentricity is \\(e = 0.0167\\). For calculations at perihelion and aphelion, assume that the Earth's instantaneous orbital angular velocity remains constant over the duration of one solar day.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the mean solar day, treating the Earth's orbit as circular. <em>(1.5 points)</em></li>
    <li>Calculate the approximate instantaneous solar-day length at perihelion. <em>(2.0 points)</em></li>
    <li>Calculate the approximate instantaneous solar-day length at aphelion. <em>(2.0 points)</em></li>
    <li>Determine the difference between the solar-day lengths obtained in parts (b) and (c). <em>(1.0 point)</em></li>
    <li>If the Earth's orbital eccentricity were increased while its orbital period and sidereal rotation period remained unchanged, how would the difference between the solar-day lengths at perihelion and aphelion change? <em>(1.5 points)</em></li>
    <li>Suppose the Earth rotates in the opposite direction, with the same sidereal rotation period in magnitude. Calculate the resulting mean interval between successive noons. <em>(2.0 points)</em></li>
</ol>`
    },

    // Day 09 — 27.10.2026
    {
        uniqueId: "potd_2026_10_27",
        dayNumber: 9,
        scheduledDate: "27.10.2026",
        title: "The Planet's Retrograde Wander",
        author: "Albert",
        module: "T1 · Celestial Mechanics",
        difficultyClass: "easy",
        difficultyText: "3.3 / 10.0",
        description: `<p>A planet moves on an elliptical orbit around the Sun with semimajor axis \\(a = 2.20\\text{ AU}\\) and eccentricity \\(e = 0.30\\). At a particular instant, the planet is observed at opposition with true anomaly \\(f = 60.0^\\circ\\), measured from periastron in the direction of orbital motion. The Earth moves on a circular orbit of radius \\(1.00\\text{ AU}\\) and period \\(365.25\\text{ days}\\). The two orbital planes coincide.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the planet's orbital period in years and days. <em>(1.0 point)</em></li>
    <li>Calculate its heliocentric distance at the instant of observation. <em>(1.5 points)</em></li>
    <li>Determine the planet's transverse orbital velocity and its instantaneous angular velocity around the Sun. <em>(2.0 points)</em></li>
    <li>Calculate the planet's instantaneous apparent angular velocity relative to the background stars as seen from Earth. Give its magnitude in degrees per day and identify the direction of apparent motion. <em>(2.5 points)</em></li>
    <li>Determine the mean synodic period of the planet as observed from Earth. <em>(1.0 point)</em></li>
    <li>Compare the instantaneous apparent angular velocity with the value obtained by treating the planet's orbit as circular with the same semimajor axis. <em>(2.0 points)</em></li>
</ol>`
    },

    // Day 10 — 28.10.2026
    {
        uniqueId: "potd_2026_10_28",
        dayNumber: 10,
        scheduledDate: "28.10.2026",
        title: "Colour, Luminosity, and Angular Size",
        author: "Albert",
        module: "T2 · Radiation Physics & Stellar Parameters",
        difficultyClass: "easy",
        difficultyText: "1.6 / 10.0",
        description: `<p>Two stars, A and B, radiate as ideal blackbodies. Their peak emission wavelengths are \\(\\lambda_{\\max,A} = 400\\text{ nm}\\) and \\(\\lambda_{\\max,B} = 800\\text{ nm}\\). Their bolometric fluxes measured at Earth satisfy \\(f_A / f_B = 3.0\\), and their distances from Earth are \\(d_A = 100\\text{ pc}\\) and \\(d_B = 200\\text{ pc}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the ratio of their surface temperatures. <em>(1.5 points)</em></li>
    <li>Calculate the luminosity ratio \\(L_A / L_B\\). <em>(2.0 points)</em></li>
    <li>Determine the radius ratio \\(R_A / R_B\\). <em>(2.5 points)</em></li>
    <li>Calculate the ratio of their apparent angular diameters. <em>(2.0 points)</em></li>
    <li>Which star has the greater mean surface brightness? Determine the ratio of their bolometric surface fluxes. <em>(2.0 points)</em></li>
</ol>`
    },

    // Day 11 — 29.10.2026
    {
        uniqueId: "potd_2026_10_29",
        dayNumber: 11,
        scheduledDate: "29.10.2026",
        title: "The Perfect Einstein Ring",
        author: "Albert",
        module: "T8 · General Relativity & Gravitational Lensing",
        difficultyClass: "easy",
        difficultyText: "2.1 / 10.0",
        description: `<p>A distant galaxy lies exactly behind a foreground galaxy cluster. The cluster is approximated as a point mass \\(M = 5.0 \\times 10^{14} M_\\odot\\). The distances from the observer to the cluster and source, and from the cluster to the source, are:</p>
<p>$$ D_L = 1.0\\text{ Gpc}, \\qquad D_S = 2.0\\text{ Gpc}, \\qquad D_{LS} = 1.0\\text{ Gpc} $$</p>
<p>In the weak-field approximation, the deflection angle of a light ray passing a point mass with impact parameter \\(b\\) is \\(\\alpha = \\frac{4GM}{c^2 b}\\). Assume small angles and Euclidean lens geometry.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the angular radius of the Einstein ring in arcseconds. <em>(4.0 points)</em></li>
    <li>Calculate the angular diameter of the ring. <em>(1.5 points)</em></li>
    <li>Determine the physical radius of the ring in the plane of the lens. <em>(2.5 points)</em></li>
    <li>How would the angular radius change if the cluster mass were increased by a factor of four? <em>(2.0 points)</em></li>
</ol>`
    },

    // Day 12 — 30.10.2026
    {
        uniqueId: "potd_2026_10_30",
        dayNumber: 12,
        scheduledDate: "30.10.2026",
        title: "Recovering an Asteroid's Orbit",
        author: "Albert",
        module: "T1 · Celestial Mechanics",
        difficultyClass: "easy",
        difficultyText: "3.6 / 10.0",
        description: `<p>An asteroid is observed at opposition while moving in a prograde heliocentric orbit in the Earth's orbital plane. Its geocentric distance is \\(1.20\\text{ AU}\\). Its apparent motion relative to the background stars is retrograde, with angular speed \\(\\omega_{\\mathrm{obs}} = 0.30^\\circ\\text{ day}^{-1}\\). Its measured line-of-sight velocity relative to Earth is \\(v_{\\mathrm{los}} = +5.0\\ \\mathrm{km\\,s^{-1}}\\), where a positive value indicates that the distance between the asteroid and Earth is increasing.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the asteroid's heliocentric distance at the instant of observation. <em>(1.0 point)</em></li>
    <li>Calculate the asteroid's heliocentric transverse velocity. <em>(2.0 points)</em></li>
    <li>Determine its heliocentric radial velocity and total orbital speed. <em>(1.5 points)</em></li>
    <li>Calculate the asteroid's specific orbital energy, semimajor axis, and eccentricity. <em>(2.5 points)</em></li>
    <li>Determine its orbital period and perihelion distance. <em>(1.5 points)</em></li>
    <li>Calculate its true anomaly and determine whether it is moving toward or away from perihelion. <em>(1.5 points)</em></li>
</ol>`
    },

    // Day 13 — 31.10.2026
    {
        uniqueId: "potd_2026_10_31",
        dayNumber: 13,
        scheduledDate: "31.10.2026",
        title: "The Radius and Mass of a Transiting Giant",
        author: "Albert",
        module: "T9 · Planetary Systems & Exoplanets",
        difficultyClass: "easy",
        difficultyText: "3.1 / 10.0",
        description: `<p>An exoplanet transits a star with mass \\(M_\\star = M_\\odot\\) and radius \\(R_\\star = R_\\odot\\). The transit depth is \\(0.81\\%\\). The total transit duration from first to fourth contact is \\(T_{14} = 4.03\\text{ hours}\\), and the duration from first to second contact is \\(T_{12} = 0.433\\text{ hours}\\). The orbital period is \\(P = 12.0\\text{ days}\\), and the measured radial-velocity semi-amplitude of the star is \\(K = 40.0\\ \\mathrm{m\\,s^{-1}}\\). Assume a circular orbit and uniform stellar surface brightness.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the planet's radius in Jupiter radii. <em>(1.5 points)</em></li>
    <li>Determine the transit impact parameter in units of the stellar radius. <em>(2.0 points)</em></li>
    <li>Calculate the orbital semimajor axis and the orbital inclination. <em>(2.0 points)</em></li>
    <li>Determine the planet's mass in Jupiter masses. <em>(2.0 points)</em></li>
    <li>Calculate the planet's mean density in \\(\\mathrm{g\\,cm^{-3}}\\). <em>(1.5 points)</em></li>
    <li>Determine the planet's surface gravitational acceleration relative to Jupiter's. <em>(1.0 point)</em></li>
</ol>`
    },

    // Day 14 — 01.11.2026
    {
        uniqueId: "potd_2026_11_01",
        dayNumber: 14,
        scheduledDate: "01.11.2026",
        title: "The Fate of MiAstroONF27: Escape or Collapse?",
        author: "Alex Barbu",
        module: "T12 · Cosmology & Friedmann Expansion",
        difficultyClass: "easy",
        difficultyText: "1.7 / 10.0",
        description: `<p>Consider a simplified model of the Universe: homogeneous, isotropic, matter-dominated, and without dark energy (\\(\\Lambda = 0\\)). Imagine a giant sphere of radius \\(R\\) and total mass \\(M\\), uniformly filled with matter of density \\(\\rho\\). On its surface lies a small galaxy named MiAstroONF27 of mass \\(m\\) (\\(m \\ll M\\)).</p>
<p>Due to the expansion of the Universe, MiAstroONF27 recedes from the center following Hubble's Law. Assuming intergalactic space is a perfect vacuum, the only force opposing this expansion is the gravitational pull of the enclosed mass \\(M\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Write the equations for the expansion velocity \\(v\\) and the total mechanical energy \\(E\\) of the galaxy in terms of \\(m\\), \\(H\\), \\(R\\), \\(M\\), and \\(G\\). <em>(2.0 points)</em></li>
    <li>Find the critical mass \\(M_c\\) of the sphere required for the galaxy to barely escape the gravitational pull (where total mechanical energy is zero). <em>(2.5 points)</em></li>
    <li>Derive the critical density \\(\\rho_c\\) of the sphere in terms of \\(H\\) and \\(G\\). <em>(2.5 points)</em></li>
    <li>Find the gravitational acceleration \\(\\ddot{R}\\) of the galaxy. Then, calculate the deceleration parameter defined as \\(q \\equiv -\\frac{\\ddot{R}R}{\\dot{R}^2}\\) in terms of the density ratio \\(\\frac{\\rho}{\\rho_c}\\). What is the value of \\(q\\) when \\(\\rho = \\rho_c\\)? <em>(3.0 points)</em></li>
</ol>`
    }
];

// ============================================================================
// 2. PROBLEM OF THE WEEK (POTW) — 7-DAY CYCLE (10.0 POINTS EACH)
// ============================================================================
export const potwProblems = [
    // Week 01 — 19.10.2026 – 25.10.2026
    {
        uniqueId: "potw_2026_w1",
        weekNumber: 1,
        scheduledDate: "19.10.2026 – 25.10.2026",
        title: "Planets and Coordinates",
        author: "Mihai",
        module: "T1 · Positional Astronomy & Orbital Elements",
        difficultyClass: "medium",
        difficultyText: "5.4 / 10.0",
        description: `<p>Alex the astrophotographer arrives in the Astrobin stellar system to take the photo that will help him win the Image of the Day contest. The system consists of an Earth-like planet (at \\(1\\text{ AU}\\) from the central star \\(1\\ M_\\odot\\)) and 4 outer planets on circular orbits. Alex plans to image the next planetary alignment, and he memorized the orbital parameters of the four outer planets (where \\(\\Omega\\) is the longitude of the ascending node, \\(\\phi = u\\) is the argument of latitude in the orbital plane measured from the ascending node, \\(i\\) is the inclination relative to the ecliptic, and \\(T\\) is the orbital period). The Earth-like planet has axial tilt \\(\\varepsilon = 23.44^\\circ\\).</p>
<p><strong>Part I — Calculating Coordinates (5.0 Points):</strong></p>
<ol style="padding-left: 20px; line-height: 1.8;">
    <li>Find expressions for the heliocentric Cartesian coordinates \\((x_{\\text{ecl}}, y_{\\text{ecl}}, z_{\\text{ecl}})\\) of a planet \\(P\\) in the <em>ecliptic frame</em> in terms of its orbital radius \\(r = T^{2/3}\\text{ AU}\\), \\(\\Omega\\), \\(\\phi\\), and \\(i\\). <em>(1.5 points)</em></li>
    <li>Find the heliocentric Cartesian coordinates \\((x_{\\text{eq}}, y_{\\text{eq}}, z_{\\text{eq}})\\) of \\(P\\) in the <em>equatorial frame</em> in terms of the ecliptic coordinates and axial tilt \\(\\varepsilon\\). <em>(1.5 points)</em></li>
    <li>Find the geocentric Cartesian coordinates \\((X, Y, Z)\\) of \\(P\\) given Earth's heliocentric ecliptic longitude \\(\\lambda_\\oplus\\). <em>(1.0 point)</em></li>
    <li>Convert \\((X, Y, Z)\\) into spherical equatorial coordinates \\((\\alpha, \\delta)\\). <em>(1.0 point)</em></li>
</ol>
<p><strong>Part II — Planetary Alignment (5.0 Points):</strong></p>
<ol style="padding-left: 20px; line-height: 1.8;">
    <li>Given 3 points \\(P_1, P_2, P_3\\) on the celestial sphere with coordinates \\((\\alpha_k, \\delta_k)\\), find the mathematical condition that all 3 lie on a single great circle. <em>(2.0 points)</em></li>
    <li>Which 3 of the 4 given planets are aligned on a great circle? <em>(1.5 points)</em></li>
    <li>Find the angular distances between the 3 aligned planets. <em>(1.5 points)</em></li>
</ol>
<table style="width:100%; border-collapse:collapse; margin-top:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Parameter</th>
            <th style="padding:8px;">AstrobinA</th>
            <th style="padding:8px;">AstrobinB</th>
            <th style="padding:8px;">AstrobinC</th>
            <th style="padding:8px;">AstrobinD</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">\\(\\Omega\\)</td>
            <td style="padding:8px;">\\(45^\\circ\\)</td>
            <td style="padding:8px;">\\(50^\\circ\\)</td>
            <td style="padding:8px;">\\(48^\\circ\\)</td>
            <td style="padding:8px;">\\(55^\\circ\\)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">\\(\\phi\\)</td>
            <td style="padding:8px;">\\(60.5^\\circ\\)</td>
            <td style="padding:8px;">\\(65.1^\\circ\\)</td>
            <td style="padding:8px;">\\(63.0^\\circ\\)</td>
            <td style="padding:8px;">\\(68.3^\\circ\\)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border-subtle);">
            <td style="padding:8px;">\\(i\\)</td>
            <td style="padding:8px;">\\(4.2^\\circ\\)</td>
            <td style="padding:8px;">\\(5.8^\\circ\\)</td>
            <td style="padding:8px;">\\(2.1^\\circ\\)</td>
            <td style="padding:8px;">\\(7.1^\\circ\\)</td>
        </tr>
        <tr>
            <td style="padding:8px;">\\(T\\)</td>
            <td style="padding:8px;">\\(2.0\\text{ yrs}\\)</td>
            <td style="padding:8px;">\\(4.0\\text{ yrs}\\)</td>
            <td style="padding:8px;">\\(12.0\\text{ yrs}\\)</td>
            <td style="padding:8px;">\\(8.0\\text{ yrs}\\)</td>
        </tr>
    </tbody>
</table>`
    },

    // Week 02 — 25.10.2026 – 01.11.2026
    {
        uniqueId: "potw_2026_w2",
        weekNumber: 2,
        scheduledDate: "25.10.2026 – 01.11.2026",
        title: "The Solar Sail Telescope — A Non-Collinear Radiative Equilibrium",
        author: "Albert",
        module: "T1 · Non-Keplerian Three-Body & Radiation Mechanics",
        difficultyClass: "hard",
        difficultyText: "7.5 / 10.0",
        description: `<p>A scientific agency proposes to place an automated telescope of mass \\(m = 100\\text{ kg}\\) in a stationary position relative to the Earth, on the Sun-facing side of the Earth, equipped with a perfectly reflecting flat solar sail of area \\(A\\). Unlike the usual collinear \\(L_1\\) problem, the sail normal \\(\\bm{n}\\) is tilted by a fixed angle \\(\\theta\\) relative to the radial vector \\(\\bm{e}_r\\) from the Sun, creating both radial and transverse radiation-pressure acceleration components.</p>
<p><strong>Part I — Calibration of the Solar Sail (2.0 Points):</strong> Starting from rest at \\(r = R_\\odot = 6.96 \\times 10^8\\text{ m}\\) with normal incidence (\\(\\alpha = 0\\)), the test telescope reaches \\(r_f = 1.392 \\times 10^9\\text{ m} = 2R_\\odot\\) in \\(t_f = 3656\\text{ s}\\).<br>
(a) Show that \\(\\beta \\equiv \\frac{F_{\\text{rad}}}{F_{g,\\odot}} = \\frac{L_\\odot A}{2\\pi c G M_\\odot m}\\). (b) Derive the exact analytic flight time \\(t_f\\) from \\(R_\\odot\\) to \\(r_f\\). (c) Determine \\(\\beta\\) and \\(A/m\\). (d) Verify solar escape.</p>
<p><strong>Part II — Non-Collinear Equilibrium in the Rotating Frame (3.0 Points):</strong> The sail is tilted so that \\(\\bm{a}_{\\text{rad}}\\cdot\\bm{e}_r = 0.10\\frac{GM_\\odot}{\\rho_\\odot^2}\\).<br>
(a) Show \\(\\beta\\cos^3\\theta = 0.10\\) and find \\(\\theta\\). (b)–(e) Explain why the equilibrium lies off the Sun–Earth line, write the coupled \\((x,y)\\) equilibrium equations in the rotating barycentric frame, and compute \\(x, y,\\) and the Earth distance \\(d_E\\) to 3 significant figures.</p>
<p><strong>Part III — Linear Stability (2.5 Points):</strong> Linearize \\(\\ddot{\\bm{\\xi}} + 2\\omega\\hat{\\bm{z}}\\times\\dot{\\bm{\\xi}} = \\mathbf{J}\\bm{\\xi}\\), obtain the quartic characteristic polynomial in \\(\\lambda\\), compute all 4 eigenvalues, and determine the e-folding instability timescale.</p>
<p><strong>Part IV &amp; V — Control Sensitivity &amp; Physical Limits (2.5 Points):</strong> Compute \\(\\left.\\frac{dd_E}{d\\varepsilon}\\right|_{\\varepsilon=0}\\), find the displacement for a \\(1.0\\%\\) radial control error, and analyze the limits \\(\\theta \\to 0\\) and \\(\\theta \\to \\pi/2\\).</p>`
    }
];

// ============================================================================
// 3. PROBLEM OF THE MONTH (POTM) — 28-DAY CYCLE (10.0 POINTS: 3 + 3 + 4)
// ============================================================================
export const potmProblems = [
    {
        uniqueId: "potm_2026_m1",
        monthNumber: 1,
        scheduledDate: "19.10.2026 – 15.11.2026",
        title: "The Chimera Flash: Non-Linear Gravothermal Catastrophe, Subcritical Canards & Symbolic Chaos in AGB Helium Shells",
        author: "Matei",
        module: "T5 & T7 · Theoretical & Computational Astrophysics",
        difficultyClass: "hard",
        difficultyText: "9.8 / 10.0",
        hasChimeraSimulator: true,
        description: `
<div class="task-box" style="border-left-color: var(--accent-blue);">
    <div class="task-box-header">
        <span>Physical &amp; Mathematical Preamble</span>
        <span class="task-pts">Total Score: 10.0 Points (3.0 + 3.0 + 4.0)</span>
    </div>
    <p>In late Asymptotic Giant Branch (AGB) stars, nuclear helium burning occurs in a geometrically thin shell of fixed mass \\(\\Delta M_s\\) sandwiched between a degenerate carbon-oxygen (C-O) core of mass \\(M_c\\) and rigid radius \\(r_0\\) (\\(\\delta r_0 = 0\\)), and an extended hydrogen-rich convective envelope.</p>
    <p>Unlike idealized plane-parallel models, a physical helium shell has a finite dimensionless thickness \\(\\epsilon(t) \\equiv \\frac{r_s(t) - r_0}{r_0} > 0\\), where \\(r_s(t) = r_0[1 + \\epsilon(t)]\\) is the outer boundary radius of the shell. The shell supports both its own internal hydrostatic weight and the pressure \\(P_s(t)\\) exerted by the base of the overlying envelope. Throughout this problem, assume:</p>
    <ul style="padding-left: 20px; line-height: 1.7;">
        <li>The core mass dominates the gravitational field within the shell (\\(\\Delta M_s \\ll M_c\\)).</li>
        <li>The shell has a spatially uniform density \\(\\rho(t)\\) across \\(r \\in [r_0, r_s(t)]\\), base pressure \\(P_0(t)\\) at \\(r = r_0\\), and outer boundary pressure \\(P_s(t)\\) at \\(r = r_s(t)\\).</li>
        <li>In the unperturbed hydrostatic equilibrium state, the boundary-to-base pressure ratio is \\(f_p \\equiv (P_s / P_0)_{\\mathrm{eq}} \\in (0, 1)\\).</li>
    </ul>
</div>

<h3>Part A: Finite-Curvature Gravothermal Elasticity &amp; Linear Stability (3.0 Points)</h3>

<div class="task-box">
    <div class="task-box-header"><span>A1. Exact Spherical Hydrostatic Elasticity</span><span class="task-pts">0.8 pts</span></div>
    <p>As the shell expands or contracts at constant mass \\(\\Delta M_s\\) above the rigid core radius \\(r_0\\), the base of the overlying convective envelope adjusts homologously with exponent \\(\\gamma_{\\mathrm{env}} = 4\\):</p>
    <p>$$ \\frac{\\delta P_s}{P_s} = -\\gamma_{\\mathrm{env}} \\frac{\\delta r_s}{r_s} = -4 \\frac{\\delta r_s}{r_s} $$</p>
    <p>By integrating the exact spherical hydrostatic equilibrium equation \\(\\frac{dP}{dr} = -\\frac{G M_c \\rho}{r^2}\\) across \\(r \\in [r_0, r_0(1+\\epsilon)]\\) and relating \\(\\delta \\rho / \\rho\\) to \\(\\delta \\epsilon / \\epsilon\\) via exact spherical volume conservation:</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Derive the closed-form <strong>mechanical barotropic elasticity</strong> \\(\\alpha_{\\mathrm{mech}}(\\epsilon, f_p) \\equiv \\left(\\frac{\\delta \\ln P_0}{\\delta \\ln \\rho}\\right)_{\\mathrm{hydro}}\\) purely as a function of \\(\\epsilon\\) and \\(f_p\\).</li>
        <li>Compute the exact Taylor expansion of \\(\\alpha_{\\mathrm{mech}}(\\epsilon, f_p)\\) around \\(\\epsilon = 0\\) up to order \\(\\mathcal{O}(\\epsilon^2)\\) for arbitrary \\(f_p \\in (0,1)\\), and explain physically why \\(\\alpha_{\\mathrm{mech}}\\) does not reduce to \\(4 f_p \\epsilon\\) at first order in \\(\\epsilon\\).</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>A2. Gravothermal Specific Heat &amp; The Spherical Ceiling Paradox</span><span class="task-pts">1.0 pt</span></div>
    <p>The shell matter obeys a general equation of state characterized at the shell base by the logarithmic derivatives \\(\\chi_\\rho \\equiv \\left(\\frac{\\partial \\ln P_0}{\\partial \\ln \\rho}\\right)_T\\), \\(\\chi_T \\equiv \\left(\\frac{\\partial \\ln P_0}{\\partial \\ln T}\\right)_\\rho\\), \\(c_V \\equiv \\left(\\frac{\\partial u_{\\mathrm{int}}}{\\partial T}\\right)_\\rho\\), and \\(\\Gamma_3 - 1 \\equiv \\left(\\frac{\\partial \\ln T}{\\partial \\ln \\rho}\\right)_s = \\frac{P_0 \\chi_T}{\\rho T c_V}\\).</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Derive the exact expression for the <strong>effective gravothermal specific heat</strong> \\(c_{\\mathrm{grav}} \\equiv T\\left(\\frac{ds}{dT}\\right)_{\\mathrm{hydro}}\\) in terms of \\(c_V, \\chi_\\rho, \\chi_T, \\Gamma_3\\), and \\(\\alpha_{\\mathrm{mech}}(\\epsilon, f_p)\\).</li>
        <li>Consider a radiation-plus-ideal-gas shell where \\(\\chi_\\rho = \\beta\\), \\(\\chi_T = 4 - 3\\beta\\), and \\(\\Gamma_3 - 1 = \\frac{2(4-3\\beta)}{3(8-7\\beta)}\\), with gas pressure fraction \\(\\beta = 0.6000\\) and boundary fraction \\(f_p = 0.8500\\). Calculate to 4 significant figures the critical thickness \\(\\epsilon_{\\mathrm{sing}}\\) at which \\(c_{\\mathrm{grav}}\\) diverges (\\(c_{\\mathrm{grav}}^{-1} = 0\\)).</li>
        <li>Prove that under homologous envelope adjustment with \\(\\gamma_{\\mathrm{env}} = 4\\), \\(\\alpha_{\\mathrm{mech}}(\\epsilon, f_p)\\) is bounded above for all \\(\\epsilon \\in (0, \\infty)\\) by a finite ceiling \\(\\alpha_\\infty(f_p) < \\Gamma_1 \\equiv \\chi_\\rho + (\\Gamma_3 - 1)\\chi_T\\). Determine the minimum envelope homology exponent \\(\\gamma_{\\mathrm{env,min}}\\) required for the shell to recover negative gravothermal specific heat (\\(c_{\\mathrm{grav}} < 0\\)) at large thickness for \\(\\beta = 0.6000\\) and \\(f_p = 0.8500\\).</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>A3. Non-Instantaneous Hydrostatic Damping &amp; Oscillatory Instability</span><span class="task-pts">1.2 pts</span></div>
    <p>Suppose the shell relaxes toward mechanical balance over a finite inertial-viscous damping timescale \\(\\tau_{\\mathrm{mech}}\\), while thermal perturbations evolve on the nuclear heating timescale \\(\\tau_{\\mathrm{th}} \\gg \\tau_{\\mathrm{mech}}\\). Let \\(x \\equiv \\delta \\ln T\\) and \\(y \\equiv \\delta \\ln \\rho\\). The linearized perturbation equations are:</p>
    <p>$$ \\tau_{\\mathrm{th}}\\frac{dx}{dt} = \\Theta_T x + \\Theta_\\rho y, \\qquad \\tau_{\\mathrm{mech}}\\frac{dy}{dt} = -\\chi_T x - \\big[\\chi_\\rho - \\alpha_{\\mathrm{mech}}(\\epsilon, f_p)\\big]y $$</p>
    <p>where the net thermal response derivatives \\(\\Theta_T\\) and \\(\\Theta_\\rho\\) arise from the competition between triple-alpha burning (\\(\\epsilon_{3\\alpha} \\propto \\rho^2 T^\\nu\\)), radiative diffusion cooling across the shell thickness (\\(\\epsilon_{\\mathrm{rad}} \\propto \\rho^{-1-\\kappa_\\rho} T^{4-\\kappa_T} \\epsilon^{-2}\\)), and plasma neutrino losses (\\(\\epsilon_\\nu \\propto \\rho^{-1} T^{\\nu_\\nu}\\)), with equilibrium neutrino loss fraction \\(f_\\nu \\equiv (\\epsilon_\\nu / \\epsilon_{3\\alpha})_{\\mathrm{eq}} \\in (0,1)\\).</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Derive the explicit expressions for \\(\\Theta_T\\) and \\(\\Theta_\\rho\\) in terms of \\((\\nu, \\kappa_T, \\kappa_\\rho, \\nu_\\nu, f_\\nu)\\) and the spherical volume function \\(\\Phi(\\epsilon) \\equiv -\\left(\\frac{\\partial \\ln \\rho}{\\partial \\ln \\epsilon}\\right)_{\\Delta M_s}\\).</li>
        <li>In dimensionless time \\(\\tau = t/\\tau_{\\mathrm{th}}\\) with stiffness parameter \\(\\delta \\equiv \\tau_{\\mathrm{mech}}/\\tau_{\\mathrm{th}}\\), find the exact conditions on the Jacobian matrix \\(\\mathbf{J}\\) for the shell to undergo an <strong>Andronov–Hopf oscillatory instability</strong>, and express the critical stiffness ratio \\(\\delta_{\\mathrm{crit}}\\) in terms of the structural parameters.</li>
    </ol>
</div>

<h3>Part B: Non-Linear Bifurcation Topology, Bautin Point &amp; Canard Quenching (3.0 Points)</h3>
<p>When finite-amplitude excursions are retained up to fifth order in the dimensionless temperature perturbation \\(u(\\tau)\\) and coupled to the slow hydrostatic restoring variable \\(v(\\tau)\\) in dimensionless time \\(\\tau = t/\\tau_{\\mathrm{th}}\\), the shell flash is governed by the generalized Liénard–FitzHugh–Nagumo system:</p>
<p>$$ \\delta \\frac{du}{d\\tau} = v - \\mathcal{N}(u), \\qquad \\mathcal{N}(u) \\equiv -\\mu u + \\sigma u^2 + \\frac{1}{3}u^3 - \\gamma u^4 + \\frac{1}{5}\\gamma u^5 $$</p>
<p>$$ \\frac{dv}{d\\tau} = -(u - u_0) - \\beta_d v + \\kappa u^2 $$</p>

<div class="task-box">
    <div class="task-box-header"><span>B1. The Linearization Trap: First Lyapunov Coefficient &amp; Bautin Point</span><span class="task-pts">1.0 pt</span></div>
    <p>Set \\(u_0 = 0\\) and \\(\\gamma = 0\\) near the origin \\((u,v) = (0,0)\\).</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Determine the exact linear Hopf bifurcation threshold \\(\\mu_{\\mathrm{Hopf}}(\\delta, \\beta_d)\\) and the linear oscillation frequency \\(\\omega_0(\\delta, \\beta_d)\\) at \\((0,0)\\).</li>
        <li>By reducing the system at \\(\\mu = \\mu_{\\mathrm{Hopf}}\\) to a single second-order Liénard differential equation for \\(u(\\tau)\\) and applying the Poincaré–Andronov–Hopf normal form reduction \\(\\frac{dr}{d\\tau} = \\frac{\\mu - \\mu_{\\mathrm{Hopf}}}{2\\delta} r + \\ell_1 r^3 + \\mathcal{O}(r^5)\\), derive the exact closed-form analytical formula for the <strong>first Lyapunov (focal) coefficient</strong> \\(\\ell_1(\\delta, \\beta_d, \\sigma, \\kappa)\\).</li>
        <li>Find the exact <strong>Bautin codimension-2 curve</strong> \\(\\sigma_{\\mathrm{Bautin}}(\\kappa, \\delta, \\beta_d)\\) where \\(\\ell_1 = 0\\), and write the algebraic inequality for the <strong>subcritical hard-excitation regime</strong> (\\(\\ell_1 > 0\\)).</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>B2. Singular Relaxation Oscillations &amp; The Hysteresis Action Integral</span><span class="task-pts">1.0 pt</span></div>
    <p>Consider the symmetric baseline \\(\\sigma = 0, \\kappa = 0, \\gamma = 0, u_0 = 0\\) with \\(\\mu > 0\\) in the singular relaxation limit \\(\\delta \\to 0^+\\).</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Determine the exact coordinates \\((u_{\\pm}, v_{\\pm})\\) of the local fold extrema of the slow manifold \\(v = \\mathcal{N}(u) = -\\mu u + \\frac{1}{3}u^3\\) where fast horizontal jumps occur, and find the landing coordinates \\((u_{\\mathrm{land},\\pm}, v_{\\pm})\\) on the opposite attracting slow branches.</li>
        <li>Write down the closed-loop integral for the dimensionless <strong>Inter-Pulse Period</strong> \\(\\mathcal{T}_{\\mathrm{IP}}(\\mu, \\beta_d)\\) along the two attracting branches of the slow manifold. Evaluate \\(\\mathcal{T}_{\\mathrm{IP}}(\\mu, \\beta_d)\\) analytically in closed form in the limit \\(\\beta_d \\to 0^+\\), and derive the exact first-order correction to \\(\\mathcal{O}(\\beta_d \\mu)\\) for small finite \\(\\beta_d \\mu\\).</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>B3. Singular Perturbation Theory of the Canard Explosion</span><span class="task-pts">1.0 pt</span></div>
    <p>Set \\(\\mu = 0\\) and \\(\\gamma = 0\\) with \\(\\sigma > 0\\), so that the slow manifold \\(v = \\mathcal{N}(u) = \\sigma u^2 + \\frac{1}{3}u^3\\) has its non-degenerate fold extremum at the origin \\((u_f, v_f) = (0,0)\\). Using a matched asymptotic expansion of the invariant slow manifold \\(v(u) = \\mathcal{N}(u) + \\delta v_1(u) + \\delta^2 v_2(u) + \\mathcal{O}(\\delta^3)\\) and \\(u_{0,\\mathrm{canard}}(\\delta) = u_{0,0} + \\delta u_{0,1} + \\mathcal{O}(\\delta^2)\\), require \\(v_1(u)\\) and \\(v_2(u)\\) to be non-singular at \\(u = 0\\) to derive the exact closed-form expressions for \\(u_{0,0}\\) and \\(u_{0,1}\\) in terms of \\((\\sigma, \\kappa, \\beta_d)\\).</p>
</div>

<h3>Part C: Convective-Overshoot Proton Ingestion, Symbolic Kneading &amp; Simulation Challenge (4.0 Points)</h3>
<p>When \\(u(\\tau)\\) exceeds the convective entropy barrier \\(u_{\\mathrm{conv}} = 1.5000\\), turbulent plumes ingest a dimensionless proton catalyst concentration \\(w(\\tau) \\in [0,1]\\), coupling a third ODE implemented in the interactive simulator below:</p>
<p>$$ \\delta \\frac{du}{d\\tau} = v - \\mathcal{N}(u) + \\Lambda_{\\mathrm{ov}} w u^2, \\qquad \\frac{dv}{d\\tau} = -u - \\beta_d v + \\kappa u^2 - \\eta_{\\mathrm{dredge}} w, \\qquad \\frac{dw}{d\\tau} = \\Gamma_{\\mathrm{ing}} H_\\varepsilon(u - u_{\\mathrm{conv}})(1 - w) - \\Gamma_{\\mathrm{burn}} w e^{\\alpha_p u} $$</p>
<p>Every pulse is assigned a discrete topological symbol \\(S_n \\in \\{\\texttt{0}, \\texttt{1}, \\texttt{2}\\}\\): <strong>Symbol 0</strong> (\\(u_{\\max,n} < 1.5000\\)), <strong>Symbol 1</strong> (\\(1.5000 \\le u_{\\max,n} < 2.4000\\)), and <strong>Symbol 2</strong> (\\(u_{\\max,n} \\ge 2.4000\\)).</p>

<div class="task-box">
    <div class="task-box-header"><span>C1. Symbolic Dynamics, Forbidden Words &amp; Topological Entropy</span><span class="task-pts">1.2 pts</span></div>
    <p>At the canonical Markov kneading point where \\(a + b = 1\\) (\\(0 < a < b < 1\\)), the singular return map \\(z_{n+1} = F(z_n)\\) on \\(z \\in [0,1]\\) partitions into three disjoint intervals \\(I_{\\texttt{0}} = [0, a)\\), \\(I_{\\texttt{1}} = [a, b)\\), and \\(I_{\\texttt{2}} = [b, 1]\\):</p>
    <p>$$ F(z) = \\begin{cases} \\dfrac{b}{a}z + a, & z \\in I_{\\texttt{0}} = [0, a) \\\\[6pt] \\dfrac{1-b}{b-a}(z-a) + b, & z \\in I_{\\texttt{1}} = [a, b) \\\\[6pt] \\dfrac{b}{1-b}(1-z), & z \\in I_{\\texttt{2}} = [b, 1] \\end{cases} $$</p>
    <ol type="a" style="padding-left: 20px;">
        <li>Construct the \\(3 \\times 3\\) topological Markov transition matrix \\(\\mathbf{A}\\).</li>
        <li>Prove why two consecutive Deep Dredge-Up Super-Flashes (\\(\\texttt{22}\\)) are dynamically impossible, and list all admissible 3-symbol words (\\(S_n S_{n+1} S_{n+2}\\)) of length 3.</li>
        <li>Derive the characteristic polynomial of \\(\\mathbf{A}\\) and compute the exact <strong>topological entropy</strong> \\(h_{\\mathrm{top}} = \\lim_{N\\to\\infty} \\frac{1}{N}\\ln \\mathcal{W}(N)\\) in closed radical form and to 5 significant figures.</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>C2. Adversarial Simulation Challenge: Crisis Ghost vs. Superstable Period-3 Window</span><span class="task-pts">1.4 pts</span></div>
    <p>In the simulator, the unimodal return map core governing the stroboscopic inter-pulse entropy coordinate \\(z_n \\in [0,1]\\) as a function of the overshoot slider \\(\\Lambda_{\\mathrm{ov}} \\in [2.8000, 3.9500]\\) is given by \\(z_{n+1} = g_{\\Lambda}(z_n) = \\Lambda_{\\mathrm{ov}} z_n (1 - z_n)\\).</p>
    <ol type="a" style="padding-left: 20px;">
        <li><strong>The Crisis Ghost Trap:</strong> When \\(\\Lambda_{\\mathrm{ov}}\\) is tuned just below the tangent bifurcation at \\(\\Lambda_c = 1 + \\sqrt{8} \\approx 3.82843\\), derive the asymptotic scaling law \\(\\langle N_{\\mathrm{laminar}} \\rangle \\propto |\\Lambda_c - \\Lambda_{\\mathrm{ov}}|^{-\\nu_{\\mathrm{ghost}}}\\) for the mean number of laminar pulses inside the narrow tangent channel, and find the exact exponent \\(\\nu_{\\mathrm{ghost}}\\).</li>
        <li>Using the simulator's long-horizon Poincaré stroboscope (\\(N_{\\mathrm{trans}} = 500\\) discarded pulses) and the exact superstability conditions \\(g_\\Lambda^3(z_c) = z_c\\) and \\(g_\\Lambda'(z_c) = 0\\), determine the exact parameter value \\(\\Lambda_{\\mathrm{ov}}^*\\) to <strong>5 significant figures</strong> at which the <strong>Superstable Period-3 Window</strong> \\((\\texttt{012})^\\infty\\) occurs, together with the three orbit coordinates \\((z_1^*, z_2^*, z_3^*)\\) ordered such that \\(z_1^* = z_c\\).</li>
    </ol>
</div>

<div class="task-box">
    <div class="task-box-header"><span>C3. Thermodynamic Clausius Invariant &amp; Final Verification Vector</span><span class="task-pts">1.4 pts</span></div>
    <ol type="a" style="padding-left: 20px;">
        <li>Prove from the coupled 3D ODEs that around any exact closed periodic orbit \\(\\mathcal{C}_3\\):
        $$ \\oint_{\\mathcal{C}_3} \\Big[ \\big(u + \\beta_d \\mathcal{N}(u) - \\kappa u^2\\big)du + \\big(\\eta_{\\mathrm{dredge}} - \\beta_d \\Lambda_{\\mathrm{ov}} u^2\\big) w\\,du + \\delta \\dot{u}\\,dv \\Big] = -(1 + \\delta \\beta_d)\\mathcal{A}_{uv} $$
        where \\(\\mathcal{A}_{uv} \\equiv \\oint_{\\mathcal{C}_3} v\\,du\\), and express the time-averaged proton concentration \\(\\langle w \\rangle_3\\) purely in terms of \\(\\langle u \\rangle_3, \\langle u^2 \\rangle_3\\), and \\(\\langle v \\rangle_3\\).</li>
        <li>Compute the exact linear multiplier \\(\\Lambda_3 \\equiv \\frac{d}{dz}[g_{\\Lambda_{\\mathrm{ov}}^*}^3(z)]\\big|_{z=z_1^*}\\) and report the 3-component verification vector \\(\\mathbf{V} = (\\Lambda_{\\mathrm{ov}}^*, z_2^*, z_3^*)\\) to 5 significant figures.</li>
    </ol>
</div>
        `
    }
];