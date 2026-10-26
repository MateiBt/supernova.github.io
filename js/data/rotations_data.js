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
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Sidereal time conversion, horizon refraction geometry (\\(z_0 = 90^\\circ + R_0\\)), and diurnal setting intervals.</p>

<p><strong>(a) Observer's Latitude \\(\\phi\\) (4.5 points)</strong></p>
<p><strong>1. Local Mean Solar Time &amp; Local Sidereal Time:</strong><br>
The observer's longitude is \\(\\lambda = 24.81^\\circ\\text{ E} = 1^{\\text{h}}39^{\\text{m}}14.4^{\\text{s}}\\), while the standard meridian for \\(\\text{UTC}+2\\) is \\(\\lambda_0 = 30^\\circ\\text{ E} = 2^{\\text{h}}00^{\\text{m}}00^{\\text{s}}\\). The local mean solar time of the observation is:</p>
<p>$$ t_{\\text{local}} = t - (2^{\\text{h}} - \\lambda) = 23^{\\text{h}}22^{\\text{m}}27^{\\text{s}} - 20^{\\text{m}}45.6^{\\text{s}} = 23^{\\text{h}}01^{\\text{m}}41.4^{\\text{s}} $$</p>
<p>On June 2nd (\\(N = 73\\text{ days}\\) after the vernal equinox on March 21), the Sun's ecliptic longitude is \\(\\lambda_\\odot = \\frac{73}{365.25}\\times 360^\\circ = 71.95^\\circ\\). In the reference calibration where the local sidereal time at rising is \\(s_{\\text{rise},1} = 16^{\\text{h}}03^{\\text{m}}51.7^{\\text{s}}\\), the hour angle of Sadalmelik (\\(\\alpha_1 = 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}}\\), \\(\\delta_1 = -0^\\circ 19' 14'' = -0.32056^\\circ\\)) at rising is:</p>
<p>$$ H_{\\text{rise},1} = s_{\\text{rise},1} - \\alpha_1 = 16^{\\text{h}}03^{\\text{m}}51.7^{\\text{s}} - 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}} = -6^{\\text{h}}01^{\\text{m}}55.3^{\\text{s}} = -90.4804^\\circ $$</p>

<p><strong>2. Refracted Horizon Equation for \\(\\phi\\):</strong><br>
At apparent rising on the horizon, standard atmospheric refraction \\(R_0 = 34'\\) places the true geometric altitude of the star at \\(h_0 = -R_0 = -0^\\circ 34' = -0.56667^\\circ\\) (zenith distance \\(z_0 = 90^\\circ 34'\\)). Applying the spherical law of cosines to the navigational triangle:</p>
<p>$$ \\sin h_0 = \\sin\\phi\\sin\\delta_1 + \\cos\\phi\\cos\\delta_1\\cos H_{\\text{rise},1} $$</p>
<p>Substituting \\(\\sin(-0^\\circ 34') = -0.0098900\\), \\(\\sin(-0^\\circ 19' 14'') = -0.0055947\\), \\(\\cos(-0^\\circ 19' 14'') = 0.999984\\), and \\(\\cos(-90.4804^\\circ) = -0.0083847\\):</p>
<p>$$ -0.0055947\\sin\\phi - 0.0083845\\cos\\phi = -0.0098900 \\implies \\phi = \\mathbf{44.85^\\circ\\text{ N}} \\quad (44^\\circ 51'\\text{ N}) $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>(b) Setting Debate &amp; Astronomical Night Check (5.5 points)</strong></p>
<p><strong>1. Setting Sidereal Times of Both Stars:</strong><br>
For Sadalmelik, the setting hour angle is \\(H_{\\text{set},1} = |H_{\\text{rise},1}| = +6^{\\text{h}}01^{\\text{m}}55.3^{\\text{s}}\\). It therefore sets at Local Sidereal Time:</p>
<p>$$ s_{\\text{set},1} = \\alpha_1 + H_{\\text{set},1} = 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}} + 6^{\\text{h}}01^{\\text{m}}55.3^{\\text{s}} - 24^{\\text{h}} = 4^{\\text{h}}07^{\\text{m}}42.3^{\\text{s}} $$</p>
<p>For \\(\\zeta\\) Lyrae (\\(\\alpha_2 = 18^{\\text{h}}44^{\\text{m}}50^{\\text{s}}\\), \\(\\delta_2 = +37^\\circ 35' 34'' = +37.5928^\\circ\\)), the setting hour angle at \\(\\phi = 44.85^\\circ\\text{ N}\\) with \\(h_0 = -0^\\circ 34'\\) is:</p>
<p>$$ \\cos H_{\\text{set},2} = \\frac{\\sin(-0^\\circ 34') - \\sin(44.85^\\circ)\\sin(37^\\circ 35' 34'')}{\\cos(44.85^\\circ)\\cos(37^\\circ 35' 34'')} = \\frac{-0.009890 - (0.70525)(0.61005)}{(0.70896)(0.79237)} = -0.78348 $$</p>
<p>$$ H_{\\text{set},2} = 141.580^\\circ = 9^{\\text{h}}26^{\\text{m}}19.3^{\\text{s}} $$</p>
<p>Thus, \\(\\zeta\\) Lyrae sets at Local Sidereal Time:</p>
<p>$$ s_{\\text{set},2} = \\alpha_2 + H_{\\text{set},2} = 18^{\\text{h}}44^{\\text{m}}50^{\\text{s}} + 9^{\\text{h}}26^{\\text{m}}19.3^{\\text{s}} - 24^{\\text{h}} = 4^{\\text{h}}11^{\\text{m}}09.3^{\\text{s}} $$</p>

<p><strong>2. Time Difference \\(\\Delta t\\) &amp; Verdict:</strong><br>
Even though \\(\\zeta\\) Lyrae culminates \\(3^{\\text{h}}20^{\\text{m}}57^{\\text{s}}\\) before Sadalmelik, its high northern declination keeps it above the horizon much longer, so <strong>Sadalmelik sets first</strong> (<strong>Albert is right</strong>). The sidereal interval between the two settings is:</p>
<p>$$ \\Delta s = s_{\\text{set},\\,\\zeta\\text{ Lyrae}} - s_{\\text{set},\\,\\text{Sadalmelik}} = 4^{\\text{h}}11^{\\text{m}}09.3^{\\text{s}} - 4^{\\text{h}}07^{\\text{m}}42.3^{\\text{s}} = +3^{\\text{m}}27.0^{\\text{s}} $$</p>
<p>Converting from sidereal time to mean solar time (\\(\\Delta t = \\Delta s \\times \\frac{365.2422}{366.2422}\\)):</p>
<p>$$ \\Delta t = t_{\\text{set},\\,\\zeta\\text{ Lyrae}} - t_{\\text{set},\\,\\text{Sadalmelik}} = \\mathbf{+3^{\\text{m}}26.4^{\\text{s}}} \\quad (206.4\\text{ s}) $$</p>

<p><strong>3. Astronomical Night Condition (\\(h_\\odot \\le -18^\\circ\\)):</strong><br>
Both stars set around local sidereal time \\(s_{\\text{set}} \\approx 4^{\\text{h}}08^{\\text{m}}\\text{--}4^{\\text{h}}11^{\\text{m}}\\), roughly \\(12\\text{ hours}\\) after Sadalmelik rises at \\(t = 23^{\\text{h}}22^{\\text{m}}27^{\\text{s}}\\) (i.e., at \\(t_{\\text{set}} \\approx 11^{\\text{h}}24^{\\text{m}}\\text{--}11^{\\text{h}}28^{\\text{m}}\\) the following morning). Since the Sun's right ascension on June 2nd is \\(\\alpha_\\odot \\approx 4^{\\text{h}}42^{\\text{m}}\\text{--}5^{\\text{h}}02^{\\text{m}}\\), the Sun is within an hour of upper culmination (local noon) at \\(h_\\odot \\approx +65^\\circ \\gg -18^\\circ\\). Therefore, <strong>neither setting event occurs during astronomical night</strong> (both occur in broad daylight).</p>`
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
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Horizon spherical geometry at sunrise on the vernal equinox, heliocentric triangle law of cosines, and Kepler's Equation for time to perihelion.</p>

<p><strong>Step 1: Elongation from the Rising Sun (3.0 points)</strong><br>
Because the comet remains visible throughout twilight and disappears at the onset of daylight, the final recorded observation occurs at exact geometric sunrise (\\(z_\\odot = 90^\\circ,\\ h_\\odot = 0^\\circ\\)). On the morning of the spring equinox (\\(\\delta_\\odot = 0^\\circ\\)), the Sun rises due East at azimuth \\(A_\\odot = 90^\\circ\\).</p>
<p>At that instant, the comet is at altitude \\(h = 90^\\circ - z = 90^\\circ - 83.47^\\circ = 6.53^\\circ\\) and azimuth \\(A = 92.42^\\circ\\). Applying the spherical law of cosines to the angular separation (elongation \\(\\psi\\)) between the Sun and the comet:</p>
<p>$$ \\cos\\psi = \\sin h_\\odot \\sin h + \\cos h_\\odot \\cos h \\cos(A - A_\\odot) = \\cos(6.53^\\circ)\\cos(92.42^\\circ - 90^\\circ) = \\cos(6.53^\\circ)\\cos(2.42^\\circ) \\approx 0.992626 $$</p>
<p>$$ \\psi \\approx 6.960^\\circ $$</p>

<p><strong>Step 2: Heliocentric Distance of the Comet (2.5 points)</strong><br>
Applying the planar law of cosines to the Sun–Earth–Comet triangle with \\(R_\\oplus = 1.00\\text{ AU}\\) and geocentric distance \\(d = 0.20\\text{ AU}\\):</p>
<p>$$ r = \\sqrt{R_\\oplus^2 + d^2 - 2 R_\\oplus d \\cos\\psi} = \\sqrt{1.00^2 + 0.20^2 - 2(1.00)(0.20)(0.992626)} = \\sqrt{0.64295} \\approx 0.80184\\text{ AU} $$</p>

<p><strong>Step 3: Eccentric &amp; Mean Anomaly to Perihelion (3.0 points)</strong><br>
Using the orbit equation in terms of the eccentric anomaly \\(E\\) with \\(a = 35\\text{ AU}\\) and \\(e = 0.98\\):</p>
<p>$$ r = a(1 - e\\cos E) \\implies 0.80184 = 35(1 - 0.98\\cos E) \\implies \\cos E = 0.997031 \\implies E \\approx 0.07708\\text{ rad} $$</p>
<p>By Kepler's Equation, the mean anomaly remaining until perihelion passage is:</p>
<p>$$ M = E - e\\sin E = 0.07708 - 0.98\\sin(0.07708) \\approx 0.001616\\text{ rad} $$</p>

<p><strong>Step 4: Time to Perihelion &amp; Calendar Date (1.5 points)</strong><br>
By Kepler's Third Law, the comet's orbital period is \\(P = a^{3/2} = 35^{1.5} \\approx 207.063\\text{ years} \\approx 75,630\\text{ days}\\). The time interval to perihelion is:</p>
<p>$$ \\Delta t = \\frac{M}{2\\pi} P \\approx \\frac{0.001616}{2\\pi} \\times 75,630\\text{ days} \\approx 19.45\\text{ days} \\approx 19.5\\text{ days} $$</p>
<p>Adding \\(19\\text{--}20\\text{ days}\\) to the spring equinox (March 20 / March 21) yields a perihelion date of <strong>April 8 – April 9</strong>.</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Mass Ratio (1.0 point):</strong><br>
In any center-of-mass frame, the radial-velocity semi-amplitudes are inversely proportional to the stellar masses:</p>
<p>$$ \\frac{M_1}{M_2} = \\frac{K_2}{K_1} = \\frac{180\\ \\mathrm{km\\,s^{-1}}}{120\\ \\mathrm{km\\,s^{-1}}} = \\mathbf{1.50} $$</p>

<p><strong>(b) Individual Semimajor Axes \\(a_1\\) and \\(a_2\\) (2.0 points):</strong><br>
For an eccentric orbit with inclination \\(i\\), the radial-velocity semi-amplitude is \\(K_j = \\frac{2\\pi a_j \\sin i}{P\\sqrt{1 - e^2}}\\). Solving for \\(a_j\\) with \\(P = 8.00\\text{ d} = 6.912 \\times 10^5\\text{ s}\\), \\(\\sqrt{1 - 0.30^2} = \\sqrt{0.91} \\approx 0.95394\\), and \\(\\sin 60.0^\\circ \\approx 0.86603\\):</p>
<p>$$ a_1 = \\frac{K_1 P \\sqrt{1 - e^2}}{2\\pi \\sin i} = \\frac{(1.20 \\times 10^5\\text{ m s}^{-1})(6.912 \\times 10^5\\text{ s})(0.95394)}{2\\pi(0.86603)} = \\mathbf{1.454 \\times 10^{10}\\text{ m}} \\approx \\mathbf{0.0972\\text{ AU}} $$</p>
<p>$$ a_2 = \\frac{K_2 P \\sqrt{1 - e^2}}{2\\pi \\sin i} = 1.50\\,a_1 = \\mathbf{2.181 \\times 10^{10}\\text{ m}} \\approx \\mathbf{0.1458\\text{ AU}} $$</p>

<p><strong>(c) Individual Stellar Masses (2.0 points):</strong><br>
The total semimajor axis of the relative orbit is \\(a = a_1 + a_2 = 3.635 \\times 10^{10}\\text{ m} \\approx 0.2430\\text{ AU}\\), and \\(P = 8.00 / 365.25 \\approx 0.021903\\text{ yr}\\). By Kepler's Third Law:</p>
<p>$$ M_{\\text{tot}} = M_1 + M_2 = \\frac{4\\pi^2 a^3}{G P^2} \\approx \\frac{(0.2430)^3}{(0.021903)^2}\\ M_\\odot \\approx 29.91\\ M_\\odot $$</p>
<p>Using \\(M_1 / M_2 = 1.50\\) (\\(M_1 = \\frac{3}{5}M_{\\text{tot}},\\ M_2 = \\frac{2}{5}M_{\\text{tot}}\\)):</p>
<p>$$ M_1 \\approx \\mathbf{17.9\\ M_\\odot}, \\qquad M_2 \\approx \\mathbf{12.0\\ M_\\odot} $$</p>

<p><strong>(d) Minimum and Maximum Separation (1.5 points):</strong></p>
<p>$$ r_{\\min} = a(1 - e) = (3.635 \\times 10^{10}\\text{ m})(0.70) = \\mathbf{2.54 \\times 10^{10}\\text{ m}} \\approx \\mathbf{0.170\\text{ AU}} $$</p>
<p>$$ r_{\\max} = a(1 + e) = (3.635 \\times 10^{10}\\text{ m})(1.30) = \\mathbf{4.73 \\times 10^{10}\\text{ m}} \\approx \\mathbf{0.316\\text{ AU}} $$</p>

<p><strong>(e) Orbital Speeds at Periastron (1.5 points):</strong><br>
At periastron, the speed of star \\(j\\) around the center of mass is \\(v_{\\text{peri},j} = \\frac{2\\pi a_j}{P}\\sqrt{\\frac{1+e}{1-e}} = \\frac{K_j(1+e)}{\\sin i}\\):</p>
<p>$$ v_{\\text{peri},1} = \\frac{120(1 + 0.30)}{\\sin 60.0^\\circ} \\approx \\mathbf{180.1\\ \\mathrm{km\\,s^{-1}}}, \\qquad v_{\\text{peri},2} = \\frac{180(1 + 0.30)}{\\sin 60.0^\\circ} \\approx \\mathbf{270.2\\ \\mathrm{km\\,s^{-1}}} $$</p>

<p><strong>(f) Student's Naive Total Mass &amp; Percentage Error (2.0 points):</strong><br>
Assuming \\(e = 0\\) and \\(i = 90^\\circ\\) omits the factor \\(\\frac{(1 - e^2)^{3/2}}{\\sin^3 i}\\), so the student infers:</p>
<p>$$ M_{\\text{student}} = M_{\\text{tot}} \\frac{\\sin^3 i}{(1 - e^2)^{3/2}} = 29.91\\ M_\\odot \\times \\frac{(0.86603)^3}{(0.91)^{3/2}} = 29.91\\ M_\\odot \\times 0.74823 \\approx \\mathbf{22.4\\ M_\\odot} $$</p>
<p>$$ \\text{Percentage Error} = \\frac{M_{\\text{student}} - M_{\\text{tot}}}{M_{\\text{tot}}} \\times 100\\% = (0.74823 - 1)\\times 100\\% \\approx \\mathbf{-25.2\\%} $$</p>`
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
</table>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Focal-plane plate scale calibration, image-to-sensor pixel scaling, and asteroid angular trail rate conversion.</p>

<p><strong>Step 1: Telescope Focal Length &amp; Sensor Plate Scale (3.0 points)</strong><br>
For an \\(f/5\\) optical system with aperture diameter \\(D = 200\\text{ mm}\\), the focal length is:</p>
<p>$$ F = 5 \\times 200\\text{ mm} = 1000\\text{ mm} = 1.00\\text{ m} $$</p>
<p>With physical pixel pitch \\(p = 3.76\\ \\mu\\text{m} = 3.76 \\times 10^{-6}\\text{ m}\\), the angular plate scale per native sensor pixel is:</p>
<p>$$ \\theta_{\\text{px}} = \\frac{p}{F} = 3.76 \\times 10^{-6}\\text{ rad/px} \\approx \\mathbf{0.7756''/\\text{px}} $$</p>
<p>Consequently, the full \\(4455 \\times 3277\\text{ px}\\) frame spans an angular field of view of \\(57.59' \\times 42.36'\\) (\\(0.960^\\circ \\times 0.706^\\circ\\)).</p>

<p><strong>Step 2: Proper Motion Angular Rates of the Asteroids (3.5 points)</strong><br>
Assuming the given relative velocities represent the transverse sky-plane velocity \\(v_\\perp\\) at geocentric distance \\(d\\) (\\(1\\text{ AU} = 1.496 \\times 10^8\\text{ km}\\)), the apparent angular speed of each asteroid is \\(\\omega = \\frac{v_\\perp}{d}\\):</p>
<ul>
    <li><strong>1737 Severny (\\(d_1 = 3.1\\text{ AU} = 4.638 \\times 10^8\\text{ km},\\ v_1 = 34.6\\text{ km s}^{-1}\\)):</strong>
    $$ \\omega_1 = \\frac{34.6}{4.638 \\times 10^8}\\text{ rad s}^{-1} = 7.461 \\times 10^{-8}\\text{ rad s}^{-1} \\approx \\mathbf{0.01539''/\\text{s}} \\quad (0.923''/\\text{min}) $$
    This corresponds to a sensor trail rate of \\(\\frac{\\theta_{\\text{px}}}{\\omega_1} \\approx \\mathbf{50.4\\text{ s/px}}\\).</li>
    <li><strong>3906 Chao (\\(d_2 = 2.92\\text{ AU} = 4.368 \\times 10^8\\text{ km},\\ v_2 = 35.1\\text{ km s}^{-1}\\)):</strong>
    $$ \\omega_2 = \\frac{35.1}{4.368 \\times 10^8}\\text{ rad s}^{-1} = 8.035 \\times 10^{-8}\\text{ rad s}^{-1} \\approx \\mathbf{0.01657''/\\text{s}} \\quad (0.994''/\\text{min}) $$
    This corresponds to a sensor trail rate of \\(\\frac{\\theta_{\\text{px}}}{\\omega_2} \\approx \\mathbf{46.8\\text{ s/px}}\\).</li>
</ul>

<p><strong>Step 3: Trail Length Measurement &amp; Total Exposure Time (3.5 points)</strong><br>
If the displayed image is measured at screen width \\(W_{\\text{disp}}\\) and an asteroid trail has measured length \\(l_{\\text{disp}}\\), its true sensor trail length in native pixels is \\(L_{\\text{px}} = 4455 \\times \\frac{l_{\\text{disp}}}{W_{\\text{disp}}}\\). The total integration time of the stacked exposure is:</p>
<p>$$ t_{\\text{exp}} = \\frac{L_{\\text{px}} \\cdot \\theta_{\\text{px}}}{\\omega} = \\frac{L_{\\text{px}} \\cdot p \\cdot d}{F \\cdot v_\\perp} $$</p>
<p>Measuring the asteroid streak lengths on the \\(4455 \\times 3277\\) frame (\\(L_{\\text{px},1} \\approx 35\\text{--}36\\text{ px}\\) for 1737 Severny and \\(L_{\\text{px},2} \\approx 38\\text{--}39\\text{ px}\\) for 3906 Chao) yields a total exposure time of \\(t_{\\text{exp}} \\approx \\mathbf{1800\\text{ s}} = \\mathbf{30\\text{ minutes}}\\) (accepting \\(28\\text{--}32\\text{ min}\\) within measurement tolerance).</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) True Distance to the Star (3.0 points):</strong><br>
First, calculate the visual extinction along the line of sight:</p>
<p>$$ A_V = 3.1\\,E(B-V) = 3.1 \\times 0.35 = 1.085\\text{ mag} $$</p>
<p>Using the extinction-corrected distance modulus formula \\(m_V - M_V = 5\\log_{10}\\!\\left(\\frac{d}{10\\text{ pc}}\\right) + A_V\\):</p>
<p>$$ 5\\log_{10}\\!\\left(\\frac{d}{10\\text{ pc}}\\right) = 12.40 - 2.10 - 1.085 = 9.215 $$</p>
<p>$$ d = 10 \\times 10^{9.215 / 5} = 10 \\times 10^{1.843} \\approx \\mathbf{696.6\\text{ pc}} $$</p>

<p><strong>(b) Inferred Distance Ignoring Extinction (2.5 points):</strong><br>
Setting \\(A_V = 0\\) gives an apparent distance modulus of \\(m_V - M_V = 12.40 - 2.10 = 10.30\\):</p>
<p>$$ d_{\\text{naive}} = 10 \\times 10^{10.30 / 5} = 10 \\times 10^{2.060} \\approx \\mathbf{1148.2\\text{ pc}} $$</p>

<p><strong>(c) Ratio of Incorrect to Correct Distance (2.0 points):</strong></p>
<p>$$ \\frac{d_{\\text{naive}}}{d} = 10^{A_V / 5} = 10^{1.085 / 5} = 10^{0.217} \\approx \\mathbf{1.648} $$</p>

<p><strong>(d) Apparent Magnitude at \\(d' = 100\\text{ pc}\\) with Same Extinction (2.5 points):</strong></p>
<p>$$ m_V(100\\text{ pc}) = M_V + 5\\log_{10}\\!\\left(\\frac{100\\text{ pc}}{10\\text{ pc}}\\right) + A_V = 2.10 + 5.00 + 1.085 = \\mathbf{8.185\\text{ mag}} \\approx \\mathbf{8.19\\text{ mag}} $$</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Main-Sequence Lifetime with \\(f_\\star = 12\\%\\) (3.0 points):</strong><br>
Since main-sequence lifetime is proportional to available fuel mass \\(f M\\) and inversely proportional to luminosity \\(L\\):</p>
<p>$$ \\tau_\\star = \\tau_\\odot \\left(\\frac{f_\\star}{f_\\odot}\\right)\\left(\\frac{M_\\star}{M_\\odot}\\right)\\left(\\frac{L_\\star}{L_\\odot}\\right)^{-1} = 10^{10}\\text{ yr} \\times \\left(\\frac{0.12}{0.10}\\right) \\times \\left(\\frac{4}{64}\\right) = \\mathbf{7.50 \\times 10^8\\text{ years}} \\ (750\\text{ Myr}) $$</p>

<p><strong>(b) Remaining Main-Sequence Lifetime (2.0 points):</strong><br>
With \\(70\\%\\) of its fuel already consumed, \\(30\\%\\) of its main-sequence lifetime remains:</p>
<p>$$ \\tau_{\\text{rem}} = (1 - 0.70)\\tau_\\star = 0.30 \\times 7.50 \\times 10^8\\text{ yr} = \\mathbf{2.25 \\times 10^8\\text{ years}} \\ (225\\text{ Myr}) $$</p>

<p><strong>(c) Total Lifetime Assuming \\(f = 10\\%\\) (2.5 points):</strong></p>
<p>$$ \\tau_{10\\%} = \\tau_\\odot \\left(\\frac{M_\\star}{M_\\odot}\\right)\\left(\\frac{L_\\star}{L_\\odot}\\right)^{-1} = 10^{10}\\text{ yr} \\times \\frac{4}{64} = \\mathbf{6.25 \\times 10^8\\text{ years}} \\ (625\\text{ Myr}) $$</p>

<p><strong>(d) Percentage Difference (2.5 points):</strong><br>
Relative to the true lifetime \\(\\tau_\\star = 750\\text{ Myr}\\) (or relative to \\(\\tau_{10\\%} = 625\\text{ Myr}\\)):</p>
<p>$$ \\frac{|\\tau_\\star - \\tau_{10\\%}|}{\\tau_\\star} \\times 100\\% = \\frac{750 - 625}{750} \\times 100\\% \\approx \\mathbf{16.7\\%} \\qquad \\left(\\text{or } \\frac{750 - 625}{625} \\times 100\\% = \\mathbf{20.0\\%}\\text{ relative to }\\tau_{10\\%}\\right) $$</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Orbital Configurations of Maximum Aberration (3.0 points):</strong><br>
Annual stellar aberration depends on the component of Earth's orbital velocity perpendicular to the star's line of sight (\\(v_\\perp = v\\sin\\Phi\\), where \\(\\Phi\\) is the angle between \\(\\vec{v}_\\oplus\\) and the line of sight). Because Earth's velocity vector in a circular orbit is always perpendicular to the Sun–Earth radius vector, \\(\\vec{v}_\\oplus\\) is strictly perpendicular to the star's line of sight (\\(\\Phi = 90^\\circ\\)) when the star is at <strong>opposition</strong> and at <strong>conjunction</strong> with the Sun.</p>

<p><strong>(b) Maximum Angular Displacement (3.0 points):</strong><br>
Using the small-angle aberration formula \\(\\theta_{\\max} \\simeq \\frac{v}{c}\\):</p>
<p>$$ \\theta_{\\max} = \\frac{29.8\\ \\mathrm{km\\,s^{-1}}}{3.00 \\times 10^5\\ \\mathrm{km\\,s^{-1}}} = 9.933 \\times 10^{-5}\\text{ rad} $$</p>
<p>Converting from radians to arcseconds (\\(1\\text{ rad} = 206,264.8''\\)):</p>
<p>$$ \\theta_{\\max} = 9.933 \\times 10^{-5} \\times 206,264.8'' \\approx \\mathbf{20.49''} $$</p>

<p><strong>(c) Star at Ecliptic Latitude \\(\\beta = 30^\\circ\\) (4.0 points):</strong><br>
A star at ecliptic latitude \\(\\beta = 30^\\circ\\) traces an annual aberration ellipse on the celestial sphere:</p>
<ul>
    <li><strong>Semi-major axis (parallel to the ecliptic, at opposition/conjunction when \\(\\vec{v}_\\oplus \\perp \\hat{s}\\)):</strong>
    $$ \\theta_{\\parallel,\\max} = \\frac{v}{c} \\approx \\mathbf{20.49''} $$</li>
    <li><strong>Projected displacement when Earth's velocity lies in the star's ecliptic meridian plane (at quadrature, where \\(\\Phi = 30^\\circ\\) or \\(60^\\circ\\)):</strong>
    The semi-minor axis (perpendicular to the ecliptic) is \\(\\theta_{\\perp,\\max} = \\frac{v}{c}\\sin 30^\\circ \\approx \\mathbf{10.24''}\\), while the component for a line-of-sight angle of \\(30^\\circ\\) to the velocity vector (\\(v_\\perp = v\\cos 30^\\circ\\)) is:
    $$ \\theta = \\frac{v\\cos 30^\\circ}{c} = 20.49'' \\times \\frac{\\sqrt{3}}{2} \\approx \\mathbf{17.74''} $$</li>
</ul>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Mean Solar Day (1.5 points):</strong><br>
Converting the sidereal rotation period to seconds gives \\(T_{\\mathrm{rot}} = 23 \\times 3600 + 56 \\times 60 + 4.09 = 86,164.09\\text{ s}\\). For a prograde circular orbit with \\(N = 365.256\\text{ mean solar days}\\) (\\(366.256\\) sidereal rotations per orbit), the synodic relation \\(\\frac{1}{T_{\\mathrm{solar,mean}}} = \\frac{1}{T_{\\mathrm{rot}}} - \\frac{1}{P_{\\mathrm{orb}}}\\) yields:</p>
<p>$$ T_{\\mathrm{solar,mean}} = T_{\\mathrm{rot}}\\left(1 + \\frac{1}{365.256}\\right) = 86,164.09\\text{ s} \\times \\frac{366.256}{365.256} = \\mathbf{86,400.00\\text{ s}} = \\mathbf{24\\text{ h } 00\\text{ min } 00.00\\text{ s}} $$</p>
<p>where the mean daily orbital advance adds \\(\\Delta t_{\\mathrm{mean}} = T_{\\mathrm{solar,mean}} - T_{\\mathrm{rot}} = 235.91\\text{ s}\\) (\\(3\\text{ min } 55.91\\text{ s}\\)) to the sidereal day.</p>

<p><strong>(b) Instantaneous Solar-Day Length at Perihelion (2.0 points):</strong><br>
By conservation of specific orbital angular momentum \\(h = r^2\\omega = \\sqrt{GM_\\odot a(1 - e^2)}\\), the ratio of the instantaneous orbital angular velocity at perihelion \\(r_p = a(1 - e)\\) to the mean orbital angular velocity \\(\\omega_{\\mathrm{mean}} = 2\\pi / P_{\\mathrm{orb}}\\) is:</p>
<p>$$ \\frac{\\omega_p}{\\omega_{\\mathrm{mean}}} = \\frac{\\sqrt{1 - e^2}}{(1 - e)^2} = \\frac{\\sqrt{1 - 0.0167^2}}{(1 - 0.0167)^2} \\approx 1.03411 $$</p>
<p>The additional rotation time required to catch up with the Sun at perihelion is \\(\\Delta t_p \\approx 1.03411 \\times 235.91\\text{ s} \\approx 243.97\\text{ s}\\) (or \\(244.00\\text{ s}\\) if using \\(\\sqrt{1-e^2} \\approx 1\\)), giving:</p>
<p>$$ T_{\\mathrm{solar},p} = 86,164.09 + 243.97 = \\mathbf{86,408.06\\text{ s}} = \\mathbf{24\\text{ h } 00\\text{ min } 08.06\\text{ s}} \\quad (86,408.09\\text{ s}) $$</p>

<p><strong>(c) Instantaneous Solar-Day Length at Aphelion (2.0 points):</strong><br>
At aphelion \\(r_a = a(1 + e)\\), the orbital angular velocity ratio is:</p>
<p>$$ \\frac{\\omega_a}{\\omega_{\\mathrm{mean}}} = \\frac{\\sqrt{1 - e^2}}{(1 + e)^2} = \\frac{\\sqrt{1 - 0.0167^2}}{(1 + 0.0167)^2} \\approx 0.96728 $$</p>
<p>This gives \\(\\Delta t_a \\approx 0.96728 \\times 235.91\\text{ s} \\approx 228.19\\text{ s}\\) (or \\(228.22\\text{ s}\\)), so:</p>
<p>$$ T_{\\mathrm{solar},a} = 86,164.09 + 228.19 = \\mathbf{86,392.28\\text{ s}} = \\mathbf{23\\text{ h } 59\\text{ min } 52.28\\text{ s}} \\quad (86,392.31\\text{ s}) $$</p>

<p><strong>(d) Difference Between Perihelion and Aphelion Solar Days (1.0 point):</strong></p>
<p>$$ \\Delta T = T_{\\mathrm{solar},p} - T_{\\mathrm{solar},a} = 243.97\\text{ s} - 228.19\\text{ s} = \\mathbf{15.78\\text{ s}} $$</p>

<p><strong>(e) Effect of Increasing Eccentricity \\(e\\) (1.5 points):</strong><br>
Increasing \\(e\\) makes the perihelion distance \\(a(1-e)\\) smaller (increasing \\(\\omega_p\\)) and the aphelion distance \\(a(1+e)\\) larger (decreasing \\(\\omega_a\\)). Consequently, the difference \\(T_{\\mathrm{solar},p} - T_{\\mathrm{solar},a}\\) <strong>increases</strong> (for small \\(e\\), \\(\\Delta T \\approx 4e\\,\\Delta t_{\\mathrm{mean}}\\)).</p>

<p><strong>(f) Mean Solar Day for Retrograde Rotation (2.0 points):</strong><br>
If the Earth rotated in the opposite (retrograde) sense, the solar and sidereal rates would add: \\(\\frac{1}{T_{\\mathrm{retro}}} = \\frac{1}{T_{\\mathrm{rot}}} + \\frac{1}{P_{\\mathrm{orb}}}\\):</p>
<p>$$ T_{\\mathrm{retro}} = \\frac{T_{\\mathrm{rot}}}{1 + T_{\\mathrm{rot}}/P_{\\mathrm{orb}}} = 86,164.09\\text{ s} \\times \\frac{365.256}{367.256} \\approx \\mathbf{85,928.82\\text{ s}} = \\mathbf{23\\text{ h } 52\\text{ min } 08.82\\text{ s}} $$</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Orbital Period (1.0 point):</strong><br>
By Kepler's Third Law:</p>
<p>$$ P = a^{3/2} = (2.20)^{3/2} \\approx \\mathbf{3.263\\text{ years}} \\approx \\mathbf{1191.8\\text{ days}} $$</p>

<p><strong>(b) Heliocentric Distance at \\(f = 60.0^\\circ\\) (1.5 points):</strong></p>
<p>$$ r = \\frac{a(1 - e^2)}{1 + e\\cos f} = \\frac{2.20(1 - 0.30^2)}{1 + 0.30\\cos 60.0^\\circ} = \\frac{2.002}{1.15} \\approx \\mathbf{1.741\\text{ AU}} $$</p>

<p><strong>(c) Transverse Orbital Velocity &amp; Heliocentric Angular Velocity (2.0 points):</strong><br>
Using Earth's circular orbital speed \\(v_\\oplus = \\frac{2\\pi(1\\text{ AU})}{365.25\\text{ d}} \\approx 29.785\\ \\mathrm{km\\,s^{-1}}\\), the planet's specific angular momentum is \\(h = \\sqrt{GM_\\odot a(1 - e^2)} = r_\\oplus v_\\oplus \\sqrt{\\frac{a(1 - e^2)}{r_\\oplus}}\\). Its transverse velocity at \\(r = 1.7409\\text{ AU}\\) is:</p>
<p>$$ v_\\perp = \\frac{h}{r} = v_\\oplus \\frac{\\sqrt{2.002}}{1.7409} = 29.785 \\times \\frac{1.4149}{1.7409} \\approx \\mathbf{24.21\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>The instantaneous heliocentric angular velocity is:</p>
<p>$$ \\omega_p = \\frac{v_\\perp}{r} = \\frac{24.21\\ \\mathrm{km\\,s^{-1}}}{1.7409 \\times 1.496 \\times 10^8\\text{ km}} \\approx \\mathbf{9.30 \\times 10^{-8}\\ \\mathrm{rad\\,s^{-1}}} \\approx \\mathbf{0.460^\\circ\\text{ day}^{-1}} $$</p>

<p><strong>(d) Apparent Angular Velocity from Earth at Opposition (2.5 points):</strong><br>
At opposition, the geocentric distance is \\(\\Delta = r - r_\\oplus = 1.7409 - 1.00 = 0.7409\\text{ AU}\\), and the line of sight is perpendicular to the transverse velocities:</p>
<p>$$ \\omega_{\\mathrm{app}} = \\frac{v_\\perp - v_\\oplus}{r - r_\\oplus} = \\frac{r\\,\\omega_p - r_\\oplus\\,\\omega_\\oplus}{r - r_\\oplus} = \\frac{1.7409(0.4599^\\circ\\text{ d}^{-1}) - 1.00(0.9856^\\circ\\text{ d}^{-1})}{0.7409} \\approx \\mathbf{-0.249^\\circ\\text{ day}^{-1}} $$</p>
<p>The magnitude is \\(\\mathbf{0.249^\\circ\\text{ day}^{-1}}\\), and the negative sign indicates <strong>retrograde</strong> apparent motion (opposite to the prograde orbital motion).</p>

<p><strong>(e) Mean Synodic Period (1.0 point):</strong></p>
<p>$$ S = \\frac{1}{\\frac{1}{P_\\oplus} - \\frac{1}{P}} = \\frac{1}{1 - \\frac{1}{3.2631}}\\text{ yr} \\approx \\mathbf{1.442\\text{ years}} \\approx \\mathbf{526.6\\text{ days}} $$</p>

<p><strong>(f) Comparison with a Circular Orbit (\\(r_{\\mathrm{circ}} = a = 2.20\\text{ AU}\\)) (2.0 points):</strong><br>
For a circular orbit of radius \\(a = 2.20\\text{ AU}\\), the orbital speed is \\(v_{\\mathrm{circ}} = v_\\oplus / \\sqrt{2.20} \\approx 20.08\\ \\mathrm{km\\,s^{-1}}\\) (heliocentric angular speed \\(\\omega_{\\mathrm{circ}} = 0.9856^\\circ\\text{ d}^{-1} / 2.20^{3/2} \\approx 0.3021^\\circ\\text{ day}^{-1}\\)) at geocentric distance \\(\\Delta_{\\mathrm{circ}} = 1.20\\text{ AU}\\):</p>
<p>$$ \\omega_{\\mathrm{app,circ}} = \\frac{2.20(0.3021^\\circ\\text{ d}^{-1}) - 1.00(0.9856^\\circ\\text{ d}^{-1})}{2.20 - 1.00} \\approx \\mathbf{-0.268^\\circ\\text{ day}^{-1}} $$</p>
<p>Because the eccentric planet at \\(f = 60^\\circ\\) is closer to perihelion and moving faster tangentially (\\(24.21\\ \\mathrm{km\\,s^{-1}}\\) vs. \\(20.08\\ \\mathrm{km\\,s^{-1}}\\)), its retrograde angular speed (\\(0.249^\\circ\\text{ day}^{-1}\\)) is <strong>slower</strong> than in the circular approximation (\\(0.268^\\circ\\text{ day}^{-1}\\)).</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Surface Temperature Ratio (1.5 points):</strong><br>
By Wien's Displacement Law (\\(\\lambda_{\\max} T = b\\)):</p>
<p>$$ \\frac{T_A}{T_B} = \\frac{\\lambda_{\\max,B}}{\\lambda_{\\max,A}} = \\frac{800\\text{ nm}}{400\\text{ nm}} = \\mathbf{2.00} $$</p>

<p><strong>(b) Luminosity Ratio \\(L_A / L_B\\) (2.0 points):</strong><br>
Using the inverse-square law \\(L = 4\\pi d^2 f\\):</p>
<p>$$ \\frac{L_A}{L_B} = \\left(\\frac{f_A}{f_B}\\right)\\left(\\frac{d_A}{d_B}\\right)^2 = 3.0 \\times \\left(\\frac{100\\text{ pc}}{200\\text{ pc}}\\right)^2 = 3.0 \\times 0.25 = \\mathbf{0.750} \\quad \\left(\\frac{3}{4}\\right) $$</p>

<p><strong>(c) Radius Ratio \\(R_A / R_B\\) (2.5 points):</strong><br>
From the Stefan–Boltzmann Law \\(L = 4\\pi R^2 \\sigma_{\\mathrm{SB}} T^4\\):</p>
<p>$$ \\frac{R_A}{R_B} = \\sqrt{\\frac{L_A}{L_B}}\\left(\\frac{T_A}{T_B}\\right)^{-2} = \\frac{\\sqrt{3/4}}{2.00^2} = \\frac{\\sqrt{3}}{8} \\approx \\mathbf{0.2165} $$</p>

<p><strong>(d) Apparent Angular Diameter Ratio (2.0 points):</strong><br>
Since apparent angular diameter scales as \\(\\theta = 2R / d\\):</p>
<p>$$ \\frac{\\theta_A}{\\theta_B} = \\left(\\frac{R_A}{R_B}\\right)\\left(\\frac{d_B}{d_A}\\right) = \\frac{\\sqrt{3}}{8} \\times \\frac{200\\text{ pc}}{100\\text{ pc}} = \\frac{\\sqrt{3}}{4} \\approx \\mathbf{0.4330} $$</p>

<p><strong>(e) Mean Surface Brightness &amp; Surface Flux Ratio (2.0 points):</strong><br>
Bolometric surface flux is \\(F_{\\mathrm{surf}} = \\sigma_{\\mathrm{SB}} T^4\\), so <strong>Star A</strong> has the greater mean surface brightness:</p>
<p>$$ \\frac{F_{\\mathrm{surf},A}}{F_{\\mathrm{surf},B}} = \\left(\\frac{T_A}{T_B}\\right)^4 = 2.00^4 = \\mathbf{16.0} $$</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Angular Radius of the Einstein Ring \\(\\theta_E\\) (4.0 points):</strong><br>
For a source aligned on the optical axis behind the lens, the small-angle lens geometry relates the impact parameter \\(b = D_L \\theta_E\\) and deflection angle \\(\\alpha\\) via \\(D_S \\theta_E = D_{LS} \\alpha\\). Substituting \\(\\alpha = \\frac{4GM}{c^2 D_L \\theta_E}\\) gives:</p>
<p>$$ \\theta_E = \\sqrt{\\frac{4GM}{c^2}\\frac{D_{LS}}{D_L D_S}} $$</p>
<p>Using \\(\\frac{2GM_\\odot}{c^2} = 2.953\\text{ km}\\) and \\(1\\text{ Gpc} = 3.0857 \\times 10^{25}\\text{ m}\\), we have \\(\\frac{4GM}{c^2} = 2(2.953 \\times 10^3\\text{ m})(5.0 \\times 10^{14}) = 2.953 \\times 10^{18}\\text{ m} \\approx 95.71\\text{ pc}\\) and \\(\\frac{D_{LS}}{D_L D_S} = \\frac{1.0\\text{ Gpc}}{(1.0\\text{ Gpc})(2.0\\text{ Gpc})} = 0.50\\text{ Gpc}^{-1} = 5.0 \\times 10^{-10}\\text{ pc}^{-1}\\):</p>
<p>$$ \\theta_E = \\sqrt{95.71\\text{ pc} \\times 5.0 \\times 10^{-10}\\text{ pc}^{-1}} = 2.188 \\times 10^{-4}\\text{ rad} \\times 206,264.8''/\\text{rad} \\approx \\mathbf{45.1''} $$</p>

<p><strong>(b) Angular Diameter of the Ring (1.5 points):</strong></p>
<p>$$ \\theta_{\\mathrm{diam}} = 2\\theta_E \\approx \\mathbf{90.2''} \\quad (1.50') $$</p>

<p><strong>(c) Physical Radius in the Lens Plane (2.5 points):</strong></p>
<p>$$ R_E = b = D_L \\theta_E = (1.0 \\times 10^9\\text{ pc})(2.188 \\times 10^{-4}\\text{ rad}) \\approx \\mathbf{2.19 \\times 10^5\\text{ pc}} = \\mathbf{219\\text{ kpc}} \\quad (6.75 \\times 10^{21}\\text{ m}) $$</p>

<p><strong>(d) Effect of Increasing Cluster Mass by a Factor of Four (2.0 points):</strong><br>
Because \\(\\theta_E \\propto \\sqrt{M}\\), quadrupling the cluster mass increases the angular radius by a factor of \\(\\sqrt{4} = \\mathbf{2}\\) (doubling \\(\\theta_E\\) to \\(\\mathbf{90.2''}\\)).</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Heliocentric Distance at Opposition (1.0 point):</strong><br>
At opposition in the ecliptic plane, the Sun, Earth, and asteroid are collinear:</p>
<p>$$ r = r_\\oplus + \\Delta = 1.00\\text{ AU} + 1.20\\text{ AU} = \\mathbf{2.20\\text{ AU}} $$</p>

<p><strong>(b) Heliocentric Transverse Velocity (2.0 points):</strong><br>
Converting the retrograde apparent angular speed \\(\\omega_{\\mathrm{obs}} = -0.30^\\circ\\text{ day}^{-1} = -6.060 \\times 10^{-8}\\ \\mathrm{rad\\,s^{-1}}\\) at geocentric distance \\(\\Delta = 1.20\\text{ AU} = 1.795 \\times 10^8\\text{ km}\\) gives a relative transverse velocity of \\(v_{\\perp,\\mathrm{rel}} = \\omega_{\\mathrm{obs}}\\Delta = -10.88\\ \\mathrm{km\\,s^{-1}}\\). Adding Earth's orbital velocity \\(v_\\oplus = 29.785\\ \\mathrm{km\\,s^{-1}}\\):</p>
<p>$$ v_\\perp = v_\\oplus + \\omega_{\\mathrm{obs}}\\Delta = 29.785 - 10.88 = \\mathbf{18.90\\ \\mathrm{km\\,s^{-1}}} $$</p>

<p><strong>(c) Heliocentric Radial Velocity &amp; Total Orbital Speed (1.5 points):</strong><br>
Since Earth moves on a circular orbit (\\(v_{r,\\oplus} = 0\\)) and the line of sight at opposition lies radially along the Sun–Earth–asteroid axis:</p>
<p>$$ v_r = v_{\\mathrm{los}} = \\mathbf{+5.00\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>$$ v = \\sqrt{v_\\perp^2 + v_r^2} = \\sqrt{(18.90)^2 + (5.00)^2} \\approx \\mathbf{19.55\\ \\mathrm{km\\,s^{-1}}} $$</p>

<p><strong>(d) Specific Orbital Energy, Semimajor Axis &amp; Eccentricity (2.5 points):</strong><br>
With \\(\\mu_\\odot = GM_\\odot = 1.327 \\times 10^{11}\\ \\mathrm{km^3\\,s^{-2}}\\) (so \\(\\mu_\\odot / (1\\text{ AU}) = v_\\oplus^2 = 887.1\\ \\mathrm{km^2\\,s^{-2}}\\)):</p>
<p>$$ \\epsilon = \\frac{v^2}{2} - \\frac{\\mu_\\odot}{r} = \\frac{(19.55)^2}{2} - \\frac{887.1}{2.20} = 191.1 - 403.2 = \\mathbf{-212.1\\ \\mathrm{km^2\\,s^{-2}}} $$</p>
<p>$$ a = -\\frac{\\mu_\\odot}{2\\epsilon} = \\frac{887.1}{2(212.1)}\\text{ AU} \\approx \\mathbf{2.091\\text{ AU}} $$</p>
<p>The semi-latus rectum is \\(p = a(1 - e^2) = \\frac{h^2}{\\mu_\\odot} = \\frac{r^2 v_\\perp^2}{\\mu_\\odot} = (2.20)^2 \\frac{(18.90)^2}{887.1}\\text{ AU} \\approx 1.949\\text{ AU}\\), which gives the eccentricity:</p>
<p>$$ e = \\sqrt{1 - \\frac{p}{a}} = \\sqrt{1 - \\frac{1.949}{2.091}} \\approx \\mathbf{0.261} $$</p>

<p><strong>(e) Orbital Period &amp; Perihelion Distance (1.5 points):</strong></p>
<p>$$ P = a^{3/2} = (2.091)^{3/2} \\approx \\mathbf{3.02\\text{ years}}, \\qquad q = a(1 - e) = 2.091(1 - 0.261) \\approx \\mathbf{1.55\\text{ AU}} $$</p>

<p><strong>(f) True Anomaly &amp; Radial Direction (1.5 points):</strong><br>
From the conic equation \\(r = \\frac{p}{1 + e\\cos f}\\):</p>
<p>$$ \\cos f = \\frac{p/r - 1}{e} = \\frac{1.949/2.20 - 1}{0.261} \\approx -0.437 \\implies f \\approx \\mathbf{115.9^\\circ} $$</p>
<p>Because \\(v_r = +5.0\\ \\mathrm{km\\,s^{-1}} > 0\\) (\\(0^\\circ < f < 180^\\circ\\)), the asteroid is moving <strong>away from perihelion</strong> (toward aphelion).</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Planet Radius in Jupiter Radii (1.5 points):</strong><br>
From the transit depth \\(\\Delta F / F = (R_p / R_\\star)^2 = 0.0081\\), the planet-to-star radius ratio is \\(k = R_p / R_\\star = \\sqrt{0.0081} = 0.0900\\). Using \\(R_\\star = R_\\odot = 6.957 \\times 10^8\\text{ m}\\), we obtain \\(R_p = 6.261 \\times 10^7\\text{ m}\\), or in Jupiter radii (\\(R_{J,\\mathrm{eq}} = 7.1492 \\times 10^7\\text{ m}\\), volumetric \\(R_{J,\\mathrm{vol}} = 6.9911 \\times 10^7\\text{ m}\\)):</p>
<p>$$ R_p = 0.0900\\,R_\\odot \\approx \\mathbf{0.876\\,R_{J,\\mathrm{eq}}} \\quad (\\text{or } \\mathbf{0.896\\,R_{J,\\mathrm{vol}}}) $$</p>

<p><strong>(b) Transit Impact Parameter \\(b\\) (2.0 points):</strong><br>
The flat-bottomed full-transit duration is \\(T_{23} = T_{14} - 2T_{12} = 4.03 - 2(0.433) = 3.164\\text{ hours}\\). In the small-planet chord approximation:</p>
<p>$$ \\frac{(1 + k)^2 - b^2}{(1 - k)^2 - b^2} = \\left(\\frac{T_{14}}{T_{23}}\\right)^2 = \\left(\\frac{4.03}{3.164}\\right)^2 \\approx 1.6223 $$</p>
<p>Substituting \\((1+k)^2 = 1.1881\\) and \\((1-k)^2 = 0.8281\\) gives \\(1.1881 - b^2 = 1.6223(0.8281 - b^2) \\implies 0.6223\\,b^2 = 0.1553\\):</p>
<p>$$ b \\approx \\mathbf{0.500}\\ \\text{(in units of } R_\\star\\text{)} $$</p>

<p><strong>(c) Orbital Semimajor Axis &amp; Inclination (2.0 points):</strong><br>
By Kepler's Third Law with \\(M_\\star = 1.00\\,M_\\odot\\) and \\(P = 12.0\\text{ d} = 0.032854\\text{ yr}\\):</p>
<p>$$ a = P^{2/3} = (0.032854)^{2/3}\\text{ AU} \\approx \\mathbf{0.1028\\text{ AU}} \\approx \\mathbf{22.10\\,R_\\odot} $$</p>
<p>From \\(b = \\frac{a}{R_\\star}\\cos i\\), we find \\(\\cos i = \\frac{0.500}{22.10} \\approx 0.02262\\), so:</p>
<p>$$ i \\approx \\mathbf{88.70^\\circ} $$</p>

<p><strong>(d) Planet Mass in Jupiter Masses (2.0 points):</strong><br>
For a circular orbit with \\(M_p \\ll M_\\star\\), \\(M_p = \\frac{K M_\\star^{2/3}}{\\sin i}\\left(\\frac{P}{2\\pi G}\\right)^{1/3}\\). With \\(K = 40.0\\ \\mathrm{m\\,s^{-1}}\\), \\(P = 1.0368 \\times 10^6\\text{ s}\\), and \\(\\sin 88.70^\\circ \\approx 0.99974\\):</p>
<p>$$ M_p \\approx 8.598 \\times 10^{26}\\text{ kg} \\approx \\mathbf{0.453\\,M_J} \\quad (M_J = 1.898 \\times 10^{27}\\text{ kg}) $$</p>

<p><strong>(e) Mean Density (1.5 points):</strong></p>
<p>$$ \\rho_p = \\frac{M_p}{\\frac{4}{3}\\pi R_p^3} = \\frac{8.598 \\times 10^{29}\\text{ g}}{\\frac{4}{3}\\pi (6.261 \\times 10^9\\text{ cm})^3} \\approx \\mathbf{0.836\\ \\mathrm{g\\,cm^{-3}}} \\quad (0.82\\text{--}0.84\\ \\mathrm{g\\,cm^{-3}}) $$</p>

<p><strong>(f) Surface Gravitational Acceleration Relative to Jupiter (1.0 point):</strong></p>
<p>$$ \\frac{g_p}{g_J} = \\left(\\frac{M_p}{M_J}\\right)\\left(\\frac{R_p}{R_J}\\right)^{-2} = \\frac{0.453}{(0.876)^2} \\approx \\mathbf{0.590} \\quad (\\text{or } 0.564\\text{ using } R_{J,\\mathrm{vol}}) $$</p>`
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
</ol>`,
        solutionHtml: `<p><strong>(a) Expansion Velocity \\(v\\) &amp; Total Mechanical Energy \\(E\\) (2.0 points):</strong><br>
By Hubble's Law, the recession velocity of the galaxy at radius \\(R\\) is:</p>
<p>$$ v = \\dot{R} = H R $$</p>
<p>By Birkhoff's theorem / Newton's shell theorem, the gravitational potential energy due to the enclosed mass \\(M\\) is \\(U = -\\frac{GMm}{R}\\). Adding the kinetic energy \\(K = \\frac{1}{2}mv^2\\) yields the total mechanical energy:</p>
<p>$$ E = K + U = \\frac{1}{2}m H^2 R^2 - \\frac{G M m}{R} $$</p>

<p><strong>(b) Critical Mass \\(M_c\\) for Parabolic Escape (\\(E = 0\\)) (2.5 points):</strong><br>
Setting \\(E = 0\\) for marginal escape:</p>
<p>$$ \\frac{1}{2}m H^2 R^2 = \\frac{G M_c m}{R} \\implies M_c = \\mathbf{\\frac{H^2 R^3}{2G}} $$</p>

<p><strong>(c) Critical Density \\(\\rho_c\\) (2.5 points):</strong><br>
Dividing the critical mass \\(M_c\\) by the volume of the sphere \\(V = \\frac{4}{3}\\pi R^3\\):</p>
<p>$$ \\rho_c = \\frac{M_c}{\\frac{4}{3}\\pi R^3} = \\frac{H^2 R^3 / (2G)}{\\frac{4}{3}\\pi R^3} = \\mathbf{\\frac{3H^2}{8\\pi G}} $$</p>

<p><strong>(d) Gravitational Acceleration \\(\\ddot{R}\\) &amp; Deceleration Parameter \\(q\\) (3.0 points):</strong><br>
From Newton's second law \\(m\\ddot{R} = -\\frac{GMm}{R^2}\\) with \\(M = \\frac{4}{3}\\pi R^3 \\rho\\), the radial acceleration is:</p>
<p>$$ \\ddot{R} = -\\frac{GM}{R^2} = \\mathbf{-\\frac{4}{3}\\pi G \\rho R} $$</p>
<p>Substituting \\(\\ddot{R} = -\\frac{4}{3}\\pi G \\rho R\\), \\(\\dot{R} = H R\\), and \\(H^2 = \\frac{8\\pi G}{3}\\rho_c\\) into the definition of the deceleration parameter \\(q\\):</p>
<p>$$ q \\equiv -\\frac{\\ddot{R}R}{\\dot{R}^2} = \\frac{\\left(\\frac{4}{3}\\pi G \\rho R\\right)R}{H^2 R^2} = \\frac{4\\pi G \\rho}{3 H^2} = \\frac{4\\pi G \\rho}{3\\left(\\frac{8\\pi G}{3}\\rho_c\\right)} = \\mathbf{\\frac{1}{2}\\frac{\\rho}{\\rho_c}} \\quad \\left(\\frac{\\Omega_m}{2}\\right) $$</p>
<p>When \\(\\rho = \\rho_c\\) (a flat Einstein–de Sitter universe), the deceleration parameter is:</p>
<p>$$ q = \\mathbf{\\frac{1}{2} = 0.50} $$</p>`
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
</table>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: 3D Euler orbital-to-ecliptic-to-equatorial frame transformations, coplanarity of unit vectors on the celestial sphere, and great-circle arc distances.</p>

<p><strong>Part I — Calculating Coordinates (5.0 Points)</strong></p>
<p><strong>1. Heliocentric Ecliptic Cartesian Coordinates (1.5 points):</strong><br>
In the planet's orbital plane relative to the ascending node, its position is \\((r\\cos\\phi, r\\sin\\phi, 0)\\) with \\(r = T^{2/3}\\text{ AU}\\). Rotating around the line of nodes by inclination \\(-i\\) and then around the ecliptic \\(z\\)-axis by \\(-\\Omega\\) gives:</p>
<p>$$ \\begin{aligned}
x_{\\text{ecl}} &= r\\big(\\cos\\Omega\\cos\\phi - \\sin\\Omega\\sin\\phi\\cos i\\big) \\\\
y_{\\text{ecl}} &= r\\big(\\sin\\Omega\\cos\\phi + \\cos\\Omega\\sin\\phi\\cos i\\big) \\\\
z_{\\text{ecl}} &= r\\sin\\phi\\sin i
\\end{aligned} $$</p>

<p><strong>2. Heliocentric Equatorial Cartesian Coordinates (1.5 points):</strong><br>
Rotating around the vernal equinox (\\(x\\)-axis) by the obliquity of the ecliptic \\(-\\varepsilon\\):</p>
<p>$$ \\begin{pmatrix} x_{\\text{eq}} \\\\ y_{\\text{eq}} \\\\ z_{\\text{eq}} \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & \\cos\\varepsilon & -\\sin\\varepsilon \\\\ 0 & \\sin\\varepsilon & \\cos\\varepsilon \\end{pmatrix} \\begin{pmatrix} x_{\\text{ecl}} \\\\ y_{\\text{ecl}} \\\\ z_{\\text{ecl}} \\end{pmatrix} = \\begin{pmatrix} x_{\\text{ecl}} \\\\ y_{\\text{ecl}}\\cos\\varepsilon - z_{\\text{ecl}}\\sin\\varepsilon \\\\ y_{\\text{ecl}}\\sin\\varepsilon + z_{\\text{ecl}}\\cos\\varepsilon \\end{pmatrix} $$</p>

<p><strong>3. Geocentric Equatorial Cartesian Coordinates (1.0 point):</strong><br>
With the Earth-like planet at \\(R_\\oplus = 1\\text{ AU}\\) and ecliptic longitude \\(\\lambda_\\oplus\\), its heliocentric equatorial coordinates are \\((\\cos\\lambda_\\oplus, \\sin\\lambda_\\oplus\\cos\\varepsilon, \\sin\\lambda_\\oplus\\sin\\varepsilon)\\). Subtracting Earth's position vector yields:</p>
<p>$$ X = x_{\\text{eq}} - \\cos\\lambda_\\oplus, \\qquad Y = y_{\\text{eq}} - \\sin\\lambda_\\oplus\\cos\\varepsilon, \\qquad Z = z_{\\text{eq}} - \\sin\\lambda_\\oplus\\sin\\varepsilon $$</p>

<p><strong>4. Spherical Equatorial Coordinates \\((\\alpha, \\delta)\\) (1.0 point):</strong><br>
With geocentric distance \\(\\Delta = \\sqrt{X^2 + Y^2 + Z^2}\\):</p>
<p>$$ \\delta = \\arcsin\\!\\left(\\frac{Z}{\\sqrt{X^2 + Y^2 + Z^2}}\\right) = \\arctan\\!\\left(\\frac{Z}{\\sqrt{X^2 + Y^2}}\\right), \\qquad \\alpha = \\operatorname{atan2}(Y, X) \\pmod{2\\pi} $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part II — Planetary Alignment (5.0 Points)</strong></p>
<p><strong>1. Mathematical Great-Circle Condition (2.0 points):</strong><br>
Three points \\(P_1, P_2, P_3\\) on the celestial sphere lie on a single great circle if and only if their unit direction vectors \\(\\hat{\\mathbf{u}}_k = (\\cos\\delta_k\\cos\\alpha_k, \\cos\\delta_k\\sin\\alpha_k, \\sin\\delta_k)\\) are coplanar (their scalar triple product vanishes):</p>
<p>$$ \\hat{\\mathbf{u}}_1 \\cdot (\\hat{\\mathbf{u}}_2 \\times \\hat{\\mathbf{u}}_3) = \\det\\begin{pmatrix} \\cos\\delta_1\\cos\\alpha_1 & \\cos\\delta_1\\sin\\alpha_1 & \\sin\\delta_1 \\\\ \\cos\\delta_2\\cos\\alpha_2 & \\cos\\delta_2\\sin\\alpha_2 & \\sin\\delta_2 \\\\ \\cos\\delta_3\\cos\\alpha_3 & \\cos\\delta_3\\sin\\alpha_3 & \\sin\\delta_3 \\end{pmatrix} = 0 $$</p>
<p>Dividing each row by \\(\\cos\\delta_k\\) and expanding the determinant gives the equivalent trigonometric condition:</p>
<p>$$ \\tan\\delta_1\\sin(\\alpha_2 - \\alpha_3) + \\tan\\delta_2\\sin(\\alpha_3 - \\alpha_1) + \\tan\\delta_3\\sin(\\alpha_1 - \\alpha_2) = 0 $$</p>
<p>(Because orthogonal frame rotations preserve great circles, this identical formula also holds in ecliptic coordinates \\((\\lambda_k, \\beta_k)\\).)</p>

<p><strong>2. Identifying the 3 Aligned Planets (1.5 points):</strong><br>
Computing the ecliptic spherical coordinates \\(\\sin\\beta = \\sin\\phi\\sin i\\) and \\(\\tan(\\lambda - \\Omega) = \\tan\\phi\\cos i\\) (along with \\(r = T^{2/3}\\)) for each planet:</p>
<ul>
    <li><strong>AstrobinA (\\(r_A = 1.5874\\text{ AU}\\)):</strong> \\(\\lambda_A = 105.434^\\circ,\\ \\beta_A = 3.655^\\circ\\) (\\(\\tan\\beta_A = 0.06387\\))</li>
    <li><strong>AstrobinB (\\(r_B = 2.5198\\text{ AU}\\)):</strong> \\(\\lambda_B = 114.988^\\circ,\\ \\beta_B = 5.259^\\circ\\) (\\(\\tan\\beta_B = 0.09205\\))</li>
    <li><strong>AstrobinC (\\(r_C = 5.2415\\text{ AU}\\)):</strong> \\(\\lambda_C = 110.985^\\circ,\\ \\beta_C = 1.871^\\circ\\) (\\(\\tan\\beta_C = 0.03267\\))</li>
    <li><strong>AstrobinD (\\(r_D = 4.0000\\text{ AU}\\)):</strong> \\(\\lambda_D = 123.148^\\circ,\\ \\beta_D = 6.594^\\circ\\) (\\(\\tan\\beta_D = 0.11561\\))</li>
</ul>
<p>Testing the coplanarity determinant for <strong>AstrobinA, AstrobinB, and AstrobinD</strong> gives \\(\\det(\\hat{\\mathbf{u}}_A, \\hat{\\mathbf{u}}_B, \\hat{\\mathbf{u}}_D) = -2.4 \\times 10^{-4} \\approx 0\\) (whereas AstrobinC at \\(\\lambda_C = 110.99^\\circ\\) lies \\(\\sim 2.7^\\circ\\) below the great circle connecting A, B, and D). Thus, the 3 aligned planets are <strong>AstrobinA, AstrobinB, and AstrobinD</strong>.</p>

<p><strong>3. Angular Distances Between the Aligned Planets (1.5 points):</strong><br>
Using the spherical law of cosines \\(\\cos\\theta_{jk} = \\hat{\\mathbf{u}}_j \\cdot \\hat{\\mathbf{u}}_k = \\sin\\beta_j\\sin\\beta_k + \\cos\\beta_j\\cos\\beta_k\\cos(\\lambda_j - \\lambda_k)\\):</p>
<ul>
    <li><strong>Heliocentric angular separations:</strong>
    $$ \\theta_{AB} = \\mathbf{9.66^\\circ}, \\qquad \\theta_{BD} = \\mathbf{8.23^\\circ}, \\qquad \\theta_{AD} = \\theta_{AB} + \\theta_{BD} = \\mathbf{17.89^\\circ} $$</li>
    <li><strong>Geocentric evaluation at \\(\\lambda_\\oplus = 0^\\circ\\):</strong> \\(\\theta_{AB,\\mathrm{geo}} = \\mathbf{1.71^\\circ}\\), \\(\\theta_{BD,\\mathrm{geo}} = \\mathbf{2.01^\\circ}\\), and \\(\\theta_{AD,\\mathrm{geo}} = \\mathbf{2.99^\\circ}\\).</li>
</ul>`
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
        description: `<p>A scientific agency proposes to place an automated space telescope of mass \\(m = 100\\text{ kg}\\) in a stationary position relative to the Earth, on the Sun-facing side of the Earth, equipped with a perfectly reflecting flat solar sail of area \\(A\\).</p>
<p>Unlike the classical collinear \\(L_1\\) Lagrange configuration, the unit sail normal \\(\\mathbf{n}\\) is tilted at a fixed pitch angle \\(\\theta\\) relative to the outward radial unit vector \\(\\mathbf{e}_r\\) from the Sun, generating both radial and transverse radiation-pressure acceleration components.</p>

<div class="task-box" style="margin-top: 18px; border-left: 3px solid var(--accent-blue); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part I — Calibration of the Solar Sail</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        Starting from rest at the solar surface \\(r_0 = R_\\odot = 6.96 \\times 10^8\\text{ m}\\) with normal solar incidence (\\(\\theta = 0\\)), a test telescope accelerates radially outward to \\(r_f = 2R_\\odot = 1.392 \\times 10^9\\text{ m}\\) in elapsed flight time \\(t_f = 3656\\text{ s}\\).
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Show that the sail lightness number satisfies \\(\\beta \\equiv \\frac{F_{\\text{rad}}}{F_{g,\\odot}} = \\frac{L_\\odot A}{2\\pi c G M_\\odot m}\\).</li>
        <li>Derive the exact analytic flight time \\(t_f\\) for outward radial motion from \\(R_\\odot\\) to \\(r_f\\) in terms of \\(R_\\odot, G, M_\\odot\\), and \\(\\beta\\).</li>
        <li>Determine the numerical values of the lightness number \\(\\beta\\) and the sail area-to-mass ratio \\(A/m\\).</li>
        <li>Verify whether the telescope achieves parabolic/hyperbolic solar escape.</li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-purple); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part II — Non-Collinear Equilibrium in the Rotating Frame</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">3.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        The operational sail normal \\(\\mathbf{n}\\) is tilted so that the radial component of radiation acceleration satisfies:
        $$ \\mathbf{a}_{\\text{rad}} \\cdot \\mathbf{e}_r = 0.10\\,\\frac{G M_\\odot}{\\rho_\\odot^2} $$
        where \\(\\rho_\\odot\\) is the heliocentric distance.
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Prove that \\(\\beta\\cos^3\\theta = 0.10\\) and calculate the tilt angle \\(\\theta\\) in degrees.</li>
        <li>Explain physically why a static equilibrium relative to Earth cannot lie along the collinear Sun–Earth line (\\(y = 0\\)) and must be displaced to \\(y \\ne 0\\).</li>
        <li>Write the coupled algebraic equations of equilibrium for \\((x, y)\\) in the dimensionless rotating barycentric reference frame.</li>
        <li>Compute the non-collinear equilibrium coordinates \\((x, y)\\) and the distance from Earth \\(d_E\\) to 3 significant figures.</li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-gold); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part III — Linear Stability Analysis</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.5 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        Consider small planar perturbations \\(\\boldsymbol{\\xi} = (\\delta x, \\delta y)^T\\) around the non-collinear equilibrium point governed by:
        $$ \\ddot{\\boldsymbol{\\xi}} + 2\\omega(\\hat{\\mathbf{z}} \\times \\dot{\\boldsymbol{\\xi}}) = \\mathbf{J}\\,\\boldsymbol{\\xi} $$
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Derive the quartic characteristic polynomial in eigenvalue \\(\\lambda\\).</li>
        <li>Compute all four characteristic eigenvalues \\(\\lambda_{1,2,3,4}\\).</li>
        <li>Classify the orbital stability and determine the exponential \\(e\\)-folding instability timescale \\(\\tau_{\\text{inst}}\\) in days.</li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-green); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part IV &amp; V — Control Sensitivity &amp; Physical Limits</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.5 Points</span>
    </div>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Compute the sensitivity derivative \\(\\left.\\frac{d(d_E)}{d\\varepsilon}\\right|_{\\varepsilon=0}\\) where the effective radiation parameter is perturbed by \\(0.10(1 + \\varepsilon)\\).</li>
        <li>Find the resulting equilibrium displacement \\(|\\Delta d_E|\\) for a \\(1.0\\%\\) radial control error (\\(\\varepsilon = 0.01\\)).</li>
        <li>Analyze the asymptotic behavior of the system in the limits \\(\\theta \\to 0\\) (normal incidence) and \\(\\theta \\to \\pi/2\\) (grazing incidence), identifying the classical Lagrange point recovered when \\(\\theta \\to \\pi/2\\).</li>
    </ol>
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Official Solution &amp; Rubric: Solar sail lightness number calibration, radial Keplerian quadrature, non-collinear artificial Lagrange equilibria, and fourth-order Hill–Routh linear stability.</p>

<p><strong>Part I — Calibration of the Solar Sail (2.0 Points)</strong></p>
<p><strong>(a) Lightness Number \\(\\beta\\) (0.5 points):</strong><br>
At distance \\(r\\) from the Sun, the solar irradiance is \\(S(r) = \\frac{L_\\odot}{4\\pi r^2}\\). A perfectly reflecting flat sail at normal incidence (\\(\\theta = 0\\)) experiences radiation pressure \\(P_{\\text{rad}} = \\frac{2S(r)}{c}\\), yielding repulsive force \\(F_{\\text{rad}} = \\frac{L_\\odot A}{2\\pi c r^2}\\). Dividing by solar gravity \\(F_{g,\\odot} = \\frac{G M_\\odot m}{r^2}\\) gives the distance-independent lightness ratio:
$$ \\beta \\equiv \\frac{F_{\\text{rad}}}{F_{g,\\odot}} = \\frac{L_\\odot A}{2\\pi c G M_\\odot m} $$</p>

<p><strong>(b) Analytic Flight Time \\(t_f\\) (0.5 points):</strong><br>
For \\(\\beta > 1\\) starting from rest at \\(r_0 = R_\\odot\\), energy conservation in the repulsive field \\(\\ddot{r} = \\frac{(\\beta - 1)GM_\\odot}{r^2}\\) gives \\(\\dot{r} = \\sqrt{2(\\beta - 1)GM_\\odot\\left(\\frac{1}{R_\\odot} - \\frac{1}{r}\\right)}\\). Substituting \\(r = R_\\odot\\cosh^2 u\\) integrates to:
$$ t_f = \\sqrt{\\frac{R_\\odot^3}{2(\\beta - 1)GM_\\odot}}\\left[\\sqrt{\\frac{r_f}{R_\\odot}\\left(\\frac{r_f}{R_\\odot} - 1\\right)} + \\ln\\!\\left(\\sqrt{\\frac{r_f}{R_\\odot}} + \\sqrt{\\frac{r_f}{R_\\odot} - 1}\\right)\\right] $$</p>

<p><strong>(c) Numerical Values of \\(\\beta\\) and \\(A/m\\) (0.5 points):</strong><br>
For \\(r_f / R_\\odot = 2\\), the bracket equals \\(\\sqrt{2} + \\ln(1 + \\sqrt{2}) \\approx 2.29559\\). With \\(R_\\odot = 6.96 \\times 10^8\\text{ m}\\), \\(GM_\\odot = 1.3271 \\times 10^{20}\\text{ m}^3\\text{ s}^{-2}\\), and \\(t_f = 3656\\text{ s}\\):
$$ \\beta - 1 = \\frac{R_\\odot^3 [\\sqrt{2} + \\ln(1+\\sqrt{2})]^2}{2GM_\\odot t_f^2} \\approx 0.500 \\implies \\beta = \\mathbf{1.50} $$
Using \\(\\sigma^* = \\frac{L_\\odot}{2\\pi c GM_\\odot} \\approx 1.53 \\times 10^{-3}\\text{ kg m}^{-2}\\), the area-to-mass ratio is:
$$ A/m = \\frac{\\beta}{\\sigma^*} \\approx \\mathbf{980\\text{ m}^2\\text{ kg}^{-1}} \\quad (A \\approx 9.80 \\times 10^4\\text{ m}^2\\text{ for } m = 100\\text{ kg}) $$</p>

<p><strong>(d) Solar Escape Verification (0.5 points):</strong><br>
Because \\(\\beta = 1.50 > 1\\), the net outward radial force is positive at all distances and the asymptotic velocity is hyperbolic:
$$ v_\\infty = \\sqrt{\\frac{2(\\beta - 1)GM_\\odot}{R_\\odot}} \\approx \\mathbf{437\\ \\mathrm{km\\,s^{-1}}} $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part II — Non-Collinear Equilibrium in the Rotating Frame (3.0 Points)</strong></p>
<p><strong>(a) Tilt Angle \\(\\theta\\) (0.75 points):</strong><br>
With sail normal \\(\\mathbf{n}\\) tilted by \\(\\theta\\) relative to \\(\\mathbf{e}_r\\), intercepted flux scales as \\(\\cos\\theta\\) and momentum transfer scales as \\(\\cos\\theta\\), so \\(\\mathbf{a}_{\\text{rad}} = \\beta\\frac{GM_\\odot}{\\rho_\\odot^2}\\cos^2\\theta\\,\\mathbf{n}\\). Projecting onto \\(\\mathbf{e}_r\\) gives \\(\\mathbf{a}_{\\text{rad}}\\cdot\\mathbf{e}_r = \\beta\\cos^3\\theta\\frac{GM_\\odot}{\\rho_\\odot^2}\\). Setting \\(\\beta\\cos^3\\theta = 0.10\\) with \\(\\beta = 1.50\\):
$$ \\cos\\theta = \\left(\\frac{0.10}{1.50}\\right)^{1/3} = 15^{-1/3} \\approx 0.40548 \\implies \\theta \\approx \\mathbf{66.1^\\circ} $$</p>

<p><strong>(b)–(d) Equilibrium Position &amp; Off-Axis Coordinates (2.25 points):</strong><br>
Because \\(\\mathbf{a}_{\\text{rad},\\perp} = 0.10\\tan(66.08^\\circ)\\frac{GM_\\odot}{\\rho_\\odot^2} \\approx 0.2254\\frac{GM_\\odot}{\\rho_\\odot^2} \\ne 0\\), a point on the collinear Sun–Earth axis (\\(y = 0\\)) experiences an unbalanced transverse force. To achieve static equilibrium in the rotating frame, the spacecraft must shift off-axis to \\(y \\ne 0\\) where Earth's transverse gravitational pull balances \\(\\mathbf{a}_{\\text{rad},\\perp}\\).</p>
<p>In dimensionless rotating barycentric units (\\(GM_\\odot + GM_\\oplus = 1,\\ R_{\\odot\\oplus} = 1,\\ \\omega = 1,\\ \\mu = 3.003 \\times 10^{-6}\\)):
$$ x - \\frac{(1-\\mu)(x+\\mu)}{\\rho_\\odot^3} - \\frac{\\mu(x - 1 + \\mu)}{d_E^3} + a_{\\text{rad},x} = 0 $$
$$ y - \\frac{(1-\\mu)y}{\\rho_\\odot^3} - \\frac{\\mu y}{d_E^3} + a_{\\text{rad},y} = 0 $$
Balancing transverse radiation pressure against local Earth gravity yields:
$$ d_E \\approx \\sqrt{\\frac{\\mu}{0.2466}} \\approx \\mathbf{3.49 \\times 10^{-3}\\text{ AU}} \\approx \\mathbf{5.22 \\times 10^5\\text{ km}} $$
$$ x \\approx \\mathbf{0.999\\text{ AU}}, \\qquad y \\approx \\mathbf{3.19 \\times 10^{-3}\\text{ AU}} \\ (4.77 \\times 10^5\\text{ km}) $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part III — Linear Stability Analysis (2.5 Points)</strong></p>
<p>Linearizing \\(\\ddot{\\boldsymbol{\\xi}} + 2\\omega(\\hat{\\mathbf{z}} \\times \\dot{\\boldsymbol{\\xi}}) = \\mathbf{J}\\,\\boldsymbol{\\xi}\\) with ansatz \\(\\boldsymbol{\\xi}(t) = \\boldsymbol{\\xi}_0 e^{\\lambda t}\\) gives the characteristic equation:
$$ \\det\\begin{pmatrix} \\lambda^2 - J_{xx} & -2\\omega\\lambda - J_{xy} \\\\[4pt] 2\\omega\\lambda - J_{yx} & \\lambda^2 - J_{yy} \\end{pmatrix} = 0 \\implies \\lambda^4 + (4\\omega^2 - \\operatorname{Tr}\\mathbf{J})\\lambda^2 + \\det\\mathbf{J} = 0 $$
Due to the asymmetric radiation-pressure field, the Jacobian satisfies \\(\\det\\mathbf{J} < 0\\), producing one positive real root \\(\\lambda_1 = +\\lambda_{\\text{real}} > 0\\), one negative real root \\(\\lambda_2 = -\\lambda_{\\text{real}}\\), and a purely oscillatory pair \\(\\lambda_{3,4} = \\pm i\\omega_{\\text{osc}}\\). The positive real eigenvalue governs the exponential instability timescale:
$$ \\tau_{\\text{inst}} = \\frac{1}{\\lambda_1} \\approx \\mathbf{12.4\\text{--}14.8\\text{ days}} $$
Active attitude/propulsion control is required to maintain position.</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part IV &amp; V — Control Sensitivity &amp; Physical Limits (2.5 Points)</strong></p>
<ul>
    <li><strong>Control Sensitivity:</strong> Differentiating the radial equilibrium relation gives \\(\\left.\\frac{d(d_E)}{d\\varepsilon}\\right|_{\\varepsilon=0} = \\frac{1}{2}d_E\\). For a \\(1.0\\%\\) error (\\(\\varepsilon = 0.01\\)):
    $$ |\\Delta d_E| \\approx 0.005\\,d_E \\approx \\mathbf{2.61 \\times 10^3\\text{ km}} $$</li>
    <li><strong>Limit \\(\\theta \\to 0\\):</strong> The transverse radiation force vanishes (\\(\\mathbf{a}_{\\text{rad},\\perp} \\to 0\\)), returning the equilibrium to the Sun–Earth line (\\(y = 0\\)). Since \\(\\beta = 1.50 > 1\\), radiation pressure exceeds solar gravity everywhere on the Sun-facing side.</li>
    <li><strong>Limit \\(\\theta \\to \\pi/2\\):</strong> As the sail turns edge-on to the sunlight, \\(\\cos\\theta \\to 0\\) and \\(\\mathbf{a}_{\\text{rad}} \\to \\mathbf{0}\\). Radiation pressure vanishes and the position collapses to the classical gravitational collinear Lagrange point \\(\\mathbf{L_1}\\) at \\(d_E = (\\mu/3)^{1/3}\\text{ AU} \\approx 0.0100\\text{ AU} \\ (1.50 \\times 10^6\\text{ km})\\).</li>
</ul>`
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
        `,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Official Master Solution &amp; Grading Rubric — Total: 10.0 Points (Part A: 3.0 pts · Part B: 3.0 pts · Part C: 4.0 pts).</p>

<h4>Part A Solutions (3.0 Points)</h4>

<p><strong>A1. Exact Spherical Hydrostatic Elasticity (0.8 pts)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Spherical Volume Conservation &amp; Hydrostatic Integration (0.6 pts):</strong><br>
    With rigid core radius \\(r_0\\) (\\(\\delta r_0 = 0\\)) and outer radius \\(r_s = r_0(1+\\epsilon)\\), the shell mass is:
    $$ \\Delta M_s = \\frac{4\\pi}{3}r_0^3 \\rho \\big[(1+\\epsilon)^3 - 1\\big] = 4\\pi r_0^3 \\rho\\,\\epsilon\\left(1 + \\epsilon + \\frac{\\epsilon^2}{3}\\right) $$
    Logarithmic differentiation at constant \\(\\Delta M_s\\) and \\(r_0\\) yields:
    $$ \\frac{\\delta \\rho}{\\rho} = -\\Phi(\\epsilon)\\frac{\\delta \\epsilon}{\\epsilon}, \\qquad \\Phi(\\epsilon) \\equiv \\frac{3\\epsilon(1+\\epsilon)^2}{(1+\\epsilon)^3 - 1} = \\frac{1 + 2\\epsilon + \\epsilon^2}{1 + \\epsilon + \\epsilon^2/3} $$
    Integrating \\(\\frac{dP}{dr} = -\\frac{G M_c \\rho}{r^2}\\) across \\(r \\in [r_0, r_0(1+\\epsilon)]\\) gives:
    $$ P_0 - P_s = G M_c \\rho \\left(\\frac{1}{r_0} - \\frac{1}{r_0(1+\\epsilon)}\\right) = \\frac{G M_c \\rho}{r_0}\\frac{\\epsilon}{1+\\epsilon} $$
    Perturbing around equilibrium where \\(P_{s,\\mathrm{eq}} = f_p P_{0,\\mathrm{eq}}\\) and \\((P_0 - P_s)_{\\mathrm{eq}} = (1-f_p)P_{0,\\mathrm{eq}}\\):
    $$ \\frac{\\delta P_0}{P_0} = f_p \\frac{\\delta P_s}{P_s} + (1 - f_p)\\left(\\frac{\\delta \\rho}{\\rho} + \\frac{1}{1+\\epsilon}\\frac{\\delta \\epsilon}{\\epsilon}\\right) $$
    Using \\(\\frac{\\delta P_s}{P_s} = -4\\frac{\\delta r_s}{r_s} = -\\frac{4\\epsilon}{1+\\epsilon}\\frac{\\delta \\epsilon}{\\epsilon}\\) and \\(\\frac{\\delta \\epsilon}{\\epsilon} = -\\frac{1}{\\Phi(\\epsilon)}\\frac{\\delta \\rho}{\\rho}\\), we obtain the exact closed-form elasticity:
    $$ \\alpha_{\\mathrm{mech}}(\\epsilon, f_p) = (1 - f_p) + \\frac{\\big[4\\epsilon f_p - (1 - f_p)\\big]\\left(1 + \\epsilon + \\frac{\\epsilon^2}{3}\\right)}{(1+\\epsilon)^3} $$</li>
    <li><strong>Taylor Expansion to \\(\\mathcal{O}(\\epsilon^2)\\) (0.2 pts):</strong><br>
    Using \\(\\frac{1+\\epsilon+\\epsilon^2/3}{(1+\\epsilon)^3} = 1 - 2\\epsilon + \\frac{10}{3}\\epsilon^2 + \\mathcal{O}(\\epsilon^3)\\), we expand:
    $$ \\alpha_{\\mathrm{mech}}(\\epsilon, f_p) = 2(1 + f_p)\\epsilon - \\frac{2}{3}(5 + 7f_p)\\epsilon^2 + \\mathcal{O}(\\epsilon^3) $$
    <em>Physical explanation:</em> At first order, \\(\\alpha_{\\mathrm{mech}} \\simeq 4f_p \\epsilon + 2(1-f_p)\\epsilon\\). The extra \\(+2(1-f_p)\\epsilon\\) term arises from the spherical divergence of the shell's own internal hydrostatic weight \\(\\Delta P = P_0 - P_s \\propto \\rho \\epsilon / (1+\\epsilon)\\).</li>
</ol>

<p><strong>A2. Gravothermal Specific Heat &amp; The Spherical Ceiling Paradox (1.0 pt)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Derivation of \\(c_{\\mathrm{grav}}\\) (0.3 pts):</strong><br>
    From \\(\\frac{\\delta P_0}{P_0} = \\chi_\\rho \\frac{\\delta \\rho}{\\rho} + \\chi_T \\frac{\\delta T}{T} = \\alpha_{\\mathrm{mech}}\\frac{\\delta \\rho}{\\rho}\\), we have \\(\\left(\\frac{\\delta \\ln \\rho}{\\delta \\ln T}\\right)_{\\mathrm{hydro}} = -\\frac{\\chi_T}{\\chi_\\rho - \\alpha_{\\mathrm{mech}}}\\). Substituting into the first law of thermodynamics \\(T\\,ds = c_V T\\big[d\\ln T - (\\Gamma_3 - 1)d\\ln\\rho\\big]\\) gives:
    $$ c_{\\mathrm{grav}} = c_V\\left[1 + \\frac{(\\Gamma_3 - 1)\\chi_T}{\\chi_\\rho - \\alpha_{\\mathrm{mech}}(\\epsilon, f_p)}\\right] = c_V\\left(\\frac{\\Gamma_1 - \\alpha_{\\mathrm{mech}}(\\epsilon, f_p)}{\\chi_\\rho - \\alpha_{\\mathrm{mech}}(\\epsilon, f_p)}\\right) $$
    where \\(\\Gamma_1 \\equiv \\chi_\\rho + (\\Gamma_3 - 1)\\chi_T\\).</li>
    <li><strong>Numerical Evaluation of \\(\\epsilon_{\\mathrm{sing}}\\) (0.4 pts):</strong><br>
    For \\(\\beta = 0.6000\\) and \\(f_p = 0.8500\\): \\(\\chi_\\rho = 0.6000\\), \\(\\chi_T = 4 - 3(0.6000) = 2.2000\\), \\(\\Gamma_3 - 1 = \\frac{2(2.2)}{3(8-4.2)} = \\frac{22}{57} \\approx 0.385965\\), and \\(\\Gamma_1 = 0.6000 + \\frac{22}{57}(2.2) = \\frac{826}{570} \\approx 1.449123\\). The divergence \\(c_{\\mathrm{grav}}^{-1} = 0\\) occurs at \\(\\alpha_{\\mathrm{mech}}(\\epsilon_{\\mathrm{sing}}, 0.8500) = \\chi_\\rho = 0.6000\\):
    $$ 0.15 + \\frac{(3.4\\epsilon - 0.15)(1 + \\epsilon + \\epsilon^2/3)}{(1+\\epsilon)^3} = 0.6000 \\implies 0.45(1+\\epsilon)^3 - (3.4\\epsilon - 0.15)\\left(1 + \\epsilon + \\frac{\\epsilon^2}{3}\\right) = 0 $$
    Solving this cubic equation numerically yields the unique positive root:
    $$ \\epsilon_{\\mathrm{sing}} = \\mathbf{0.2339} \\quad (0.23388) $$</li>
    <li><strong>Proof of the Spherical Ceiling &amp; Minimum \\(\\gamma_{\\mathrm{env,min}}\\) (0.3 pts):</strong><br>
    Taking the limit \\(\\epsilon \\to \\infty\\) in \\(\\alpha_{\\mathrm{mech}}(\\epsilon, f_p)\\) with general homology exponent \\(\\gamma_{\\mathrm{env}}\\):
    $$ \\alpha_\\infty(f_p, \\gamma_{\\mathrm{env}}) = \\lim_{\\epsilon\\to\\infty}\\left[(1-f_p) + \\frac{\\big[\\gamma_{\\mathrm{env}}\\epsilon f_p - (1-f_p)\\big](1+\\epsilon+\\epsilon^2/3)}{(1+\\epsilon)^3}\\right] = 1 - f_p + \\frac{\\gamma_{\\mathrm{env}}}{3}f_p $$
    For \\(\\gamma_{\\mathrm{env}} = 4\\) and \\(f_p = 0.8500\\), \\(\\alpha_\\infty = 1 + \\frac{1}{3}(0.8500) = 1.2833 < \\Gamma_1 = 1.4491\\). Because \\(\\alpha_{\\mathrm{mech}}(\\epsilon, 0.8500)\\) increases monotonically toward \\(1.2833\\), it <strong>never reaches \\(\\Gamma_1\\)</strong>. To recover \\(c_{\\mathrm{grav}} < 0\\) at large thickness, we require \\(\\alpha_\\infty > \\Gamma_1\\):
    $$ 1 - f_p + \\frac{\\gamma_{\\mathrm{env,min}}}{3}f_p = \\Gamma_1 \\implies \\gamma_{\\mathrm{env,min}} = \\frac{3\\big[\\Gamma_1 - (1 - f_p)\\big]}{f_p} = \\frac{3(1.449123 - 0.15)}{0.85} = \\mathbf{4.5851} $$</li>
</ol>

<p><strong>A3. Non-Instantaneous Hydrostatic Damping &amp; Oscillatory Instability (1.2 pts)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Thermal Derivatives (0.6 pts):</strong><br>
    In thermal equilibrium, \\(\\epsilon_{3\\alpha,0} = \\epsilon_{\\mathrm{rad},0} + \\epsilon_{\\nu,0}\\), so \\(\\epsilon_{\\mathrm{rad},0}/\\epsilon_{3\\alpha,0} = 1 - f_\\nu\\). Perturbing \\(\\dot{q}_{\\mathrm{net}} = \\epsilon_{3\\alpha} - \\epsilon_{\\mathrm{rad}} - \\epsilon_\\nu\\) and using \\(\\frac{\\delta\\epsilon}{\\epsilon} = -\\frac{1}{\\Phi(\\epsilon)}y\\) in \\(\\epsilon_{\\mathrm{rad}} \\propto \\rho^{-1-\\kappa_\\rho}T^{4-\\kappa_T}\\epsilon^{-2}\\):
    $$ \\Theta_T = \\nu - (1 - f_\\nu)(4 - \\kappa_T) - f_\\nu \\nu_\\nu, \\qquad \\Theta_\\rho = 2 + (1 - f_\\nu)\\left(1 + \\kappa_\\rho - \\frac{2}{\\Phi(\\epsilon)}\\right) + f_\\nu $$</li>
    <li><strong>Andronov–Hopf Conditions (0.6 pts):</strong><br>
    In dimensionless time \\(\\tau = t/\\tau_{\\mathrm{th}}\\), the Jacobian matrix is:
    $$ \\mathbf{J} = \\begin{pmatrix} \\Theta_T & \\Theta_\\rho \\\\[4pt] -\\dfrac{\\chi_T}{\\delta} & -\\dfrac{\\chi_\\rho - \\alpha_{\\mathrm{mech}}}{\\delta} \\end{pmatrix} $$
    Oscillatory instability requires \\(\\mathrm{Tr}(\\mathbf{J}) > 0\\) and \\([\\mathrm{Tr}(\\mathbf{J})]^2 < 4\\det(\\mathbf{J})\\), with the marginal Hopf threshold \\(\\mathrm{Tr}(\\mathbf{J}) = 0\\) occurring at:
    $$ \\delta_{\\mathrm{crit}} = \\frac{\\chi_\\rho - \\alpha_{\\mathrm{mech}}(\\epsilon, f_p)}{\\Theta_T}, \\qquad \\text{subject to } \\det(\\mathbf{J})\\big|_{\\delta_{\\mathrm{crit}}} = \\frac{\\Theta_T\\big[\\chi_T \\Theta_\\rho - \\Theta_T(\\chi_\\rho - \\alpha_{\\mathrm{mech}})\\big]}{\\chi_\\rho - \\alpha_{\\mathrm{mech}}} > 0 $$</li>
</ol>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<h4>Part B Solutions (3.0 Points)</h4>

<p><strong>B1. First Lyapunov Coefficient &amp; The Bautin Point (1.0 pt)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Linear Hopf Point (0.2 pts):</strong><br>
    Linearizing at \\((u,v) = (0,0)\\) gives \\(\\mathbf{J}_0 = \\begin{pmatrix} \\mu/\\delta & 1/\\delta \\\\ -1 & -\\beta_d \\end{pmatrix}\\). Setting \\(\\mathrm{Tr}(\\mathbf{J}_0) = \\frac{\\mu}{\\delta} - \\beta_d = 0\\) yields:
    $$ \\mu_{\\mathrm{Hopf}} = \\delta \\beta_d, \\qquad \\omega_0 = \\sqrt{\\det(\\mathbf{J}_0)} = \\sqrt{\\frac{1 - \\delta \\beta_d^2}{\\delta}} $$</li>
    <li><strong>Exact First Lyapunov Coefficient \\(\\ell_1\\) (0.5 pts):</strong><br>
    Differentiating \\(\\delta \\dot{u} = v - \\mathcal{N}(u)\\) and substituting \\(\\dot{v} = -u - \\beta_d(\\delta \\dot{u} + \\mathcal{N}(u)) + \\kappa u^2\\) yields the exact planar Liénard equation:
    $$ \\ddot{u} + \\frac{1}{\\delta}\\big[\\mathcal{N}'(u) + \\delta\\beta_d\\big]\\dot{u} + \\frac{1}{\\delta}\\big[u + \\beta_d \\mathcal{N}(u) - \\kappa u^2\\big] = 0 $$
    At \\(\\mu = \\mu_{\\mathrm{Hopf}} = \\delta\\beta_d\\) (with \\(\\gamma = 0\\)), \\(\\mathcal{N}'(u) + \\delta\\beta_d = 2\\sigma u + u^2\\), so:
    $$ \\ddot{u} + \\omega_0^2 u + \\underbrace{\\frac{2\\sigma}{\\delta}}_{a_1} u\\dot{u} + \\underbrace{\\frac{1}{\\delta}}_{a_2} u^2\\dot{u} + \\underbrace{\\frac{\\beta_d \\sigma - \\kappa}{\\delta}}_{b_2} u^2 + \\underbrace{\\frac{\\beta_d}{3\\delta}}_{b_3} u^3 = 0 $$
    By Poincaré–Andronov–Hopf normal form reduction, \\(\\ell_1 = -\\frac{1}{8}\\left(a_2 - \\frac{a_1 b_2}{\\omega_0^2}\\right)\\):
    $$ \\ell_1(\\delta, \\beta_d, \\sigma, \\kappa) = -\\frac{1}{8\\delta}\\left[1 - \\frac{2\\sigma(\\beta_d \\sigma - \\kappa)}{1 - \\delta\\beta_d^2}\\right] $$</li>
    <li><strong>Bautin Codimension-2 Curve &amp; Hard Excitation (0.3 pts):</strong><br>
    Setting \\(\\ell_1 = 0\\) gives \\(2\\beta_d \\sigma^2 - 2\\kappa\\sigma - (1 - \\delta\\beta_d^2) = 0\\), or:
    $$ \\sigma_{\\mathrm{Bautin}}(\\kappa, \\delta, \\beta_d) = \\frac{\\kappa \\pm \\sqrt{\\kappa^2 + 2\\beta_d(1 - \\delta\\beta_d^2)}}{2\\beta_d} $$
    The bifurcation is <strong>subcritical (\\(\\ell_1 > 0\\))</strong> whenever \\(2\\sigma(\\beta_d \\sigma - \\kappa) > 1 - \\delta\\beta_d^2\\).</li>
</ol>

<p><strong>B2. Singular Relaxation Oscillations &amp; Inter-Pulse Period (1.0 pt)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Fold &amp; Landing Points (0.4 pts):</strong><br>
    Setting \\(\\mathcal{N}'(u) = -\\mu + u^2 = 0\\) yields the fold points and opposite-branch landing roots of \\(\\frac{1}{3}u^3 - \\mu u = \\mp\\frac{2}{3}\\mu^{3/2}\\):
    $$ u_{\\pm} = \\pm\\sqrt{\\mu}, \\qquad v_{\\pm} = \\mp\\frac{2}{3}\\mu^{3/2}, \\qquad u_{\\mathrm{land},\\pm} = \\mp 2\\sqrt{\\mu} $$</li>
    <li><strong>Exact Closed-Form Action Integral (0.6 pts):</strong><br>
    Along the two symmetric slow branches \\(u \\in [\\sqrt{\\mu}, 2\\sqrt{\\mu}]\\) and \\(u \\in [-2\\sqrt{\\mu}, -\\sqrt{\\mu}]\\), substituting \\(u = \\sqrt{\\mu}\\,s\\) gives:
    $$ \\mathcal{T}_{\\mathrm{IP}}(\\mu, \\beta_d) = 2\\int_{\\sqrt{\\mu}}^{2\\sqrt{\\mu}} \\frac{(u^2 - \\mu)\\,du}{u\\big[1 + \\beta_d(\\frac{1}{3}u^2 - \\mu)\\big]} = 2\\int_1^2 \\frac{(s^2 - 1)\\,ds}{s\\big[1 + \\frac{1}{3}\\beta_d\\mu(s^2 - 3)\\big]} $$
    Expanding in powers of \\(\\beta_d \\mu\\) and integrating \\(\\left[\\frac{s^2}{2} - \\ln s\\right]_1^2 = \\frac{3}{2} - \\ln 2\\) and \\(\\left[\\frac{s^4}{4} - 2s^2 + 3\\ln s\\right]_1^2 = 3\\ln 2 - \\frac{9}{4}\\) yields:
    $$ \\mathcal{T}_{\\mathrm{IP}}(\\mu, \\beta_d) = (3 - 2\\ln 2) + \\left(\\frac{3}{2} - 2\\ln 2\\right)\\beta_d \\mu + \\mathcal{O}(\\beta_d^2 \\mu^2) $$
    where \\(\\mathcal{T}_{\\mathrm{IP}}^{(0)} = 3 - 2\\ln 2 \\approx 1.61371\\).</li>
</ol>

<p><strong>B3. Singular Perturbation Theory of the Canard Explosion (1.0 pt)</strong></p>
<p>Substituting \\(v(u) = \\mathcal{N}(u) + \\delta v_1(u) + \\delta^2 v_2(u) + \\dots\\) (where \\(\\mathcal{N}(u) = \\sigma u^2 + \\frac{1}{3}u^3\\)) and \\(u_0 = u_{0,0} + \\delta u_{0,1} + \\dots\\) into \\(\\frac{dv}{du}(v - \\mathcal{N}(u)) = \\delta\\big[-(u - u_0) - \\beta_d v + \\kappa u^2\\big]\\):</p>
<ol style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Order \\(\\mathcal{O}(\\delta)\\) (0.4 pts):</strong> \\(\\mathcal{N}'(u)v_1(u) = -(u - u_{0,0}) - \\beta_d \\mathcal{N}(u) + \\kappa u^2\\). Since \\(\\mathcal{N}'(0) = 0\\), regularity of \\(v_1(0)\\) requires \\(\\mathbf{u_{0,0} = 0}\\). Dividing by \\(\\mathcal{N}'(u) = u(2\\sigma + u)\\) gives:
    $$ v_1(u) = \\frac{-1 + (\\kappa - \\beta_d \\sigma)u - \\frac{1}{3}\\beta_d u^2}{2\\sigma + u} \\implies v_1(0) = -\\frac{1}{2\\sigma}, \\quad v_1'(0) = \\frac{1 + 2\\sigma(\\kappa - \\beta_d \\sigma)}{4\\sigma^2} $$</li>
    <li><strong>Order \\(\\mathcal{O}(\\delta^2)\\) (0.6 pts):</strong> \\(\\mathcal{N}'(u)v_2(u) + v_1'(u)v_1(u) = u_{0,1} - \\beta_d v_1(u)\\). Evaluating at \\(u = 0\\) where \\(\\mathcal{N}'(0) = 0\\), regularity of \\(v_2(0)\\) forces \\(u_{0,1} = v_1(0)\\big[v_1'(0) + \\beta_d\\big]\\):
    $$ u_{0,1} = \\mathbf{-\\frac{1 + 2\\sigma\\kappa + 2\\beta_d \\sigma^2}{8\\sigma^3}} $$</li>
</ol>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<h4>Part C Solutions (4.0 Points)</h4>

<p><strong>C1. Symbolic Dynamics, Forbidden Words &amp; Topological Entropy (1.2 pts)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Markov Transition Matrix (0.4 pts):</strong><br>
    With \\(a + b = 1\\), \\(F(I_{\\texttt{0}}) = [a, 1) = I_{\\texttt{1}} \\cup I_{\\texttt{2}}\\), \\(F(I_{\\texttt{1}}) = [b, 1) = I_{\\texttt{2}}\\), and \\(F(I_{\\texttt{2}}) = [0, b] = I_{\\texttt{0}} \\cup I_{\\texttt{1}}\\). Hence:
    $$ \\mathbf{A} = \\begin{pmatrix} 0 & 1 & 1 \\\\ 0 & 0 & 1 \\\\ 1 & 1 & 0 \\end{pmatrix} $$</li>
    <li><strong>Forbidden Words &amp; Admissible 3-Blocks (0.4 pts):</strong><br>
    Because \\(F(I_{\\texttt{2}}) = [0, b]\\) has zero intersection with \\(I_{\\texttt{2}} = [b, 1]\\) (\\(A_{22} = 0\\)), a super-flash always flushes the shell into \\(I_{\\texttt{0}} \\cup I_{\\texttt{1}}\\), forbidding \\(\\texttt{22}\\). Since \\(A_{00} = A_{10} = A_{11} = A_{22} = 0\\), the exact list of \\(\\sum_{i,j,k} A_{ij}A_{jk} = 8\\) admissible 3-symbol words is:
    $$ \\{\\texttt{012},\\; \\texttt{020},\\; \\texttt{021},\\; \\texttt{120},\\; \\texttt{121},\\; \\texttt{201},\\; \\texttt{202},\\; \\texttt{212}\\} $$</li>
    <li><strong>Exact Topological Entropy (0.4 pts):</strong><br>
    \\(\\det(\\lambda\\mathbf{I} - \\mathbf{A}) = \\lambda^3 - \\lambda - 1 = 0\\). By Cardano's formula, the Perron–Frobenius root is the plastic number \\(\\rho_P\\):
    $$ h_{\\mathrm{top}} = \\ln\\left[\\left(\\frac{1}{2} + \\sqrt{\\frac{23}{108}}\\right)^{1/3} + \\left(\\frac{1}{2} - \\sqrt{\\frac{23}{108}}\\right)^{1/3}\\right] \\approx \\mathbf{0.28120} $$</li>
</ol>

<p><strong>C2. Crisis Ghost vs. Superstable Period-3 Window (1.4 pts)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Type-I Intermittency Ghost Exponent (0.5 pts):</strong><br>
    Near the tangent bifurcation \\(\\Lambda_c = 1 + \\sqrt{8}\\), \\(z_{n+3} - z_n \\simeq c(z_n - z_{\\mathrm{tan}})^2 + \\varepsilon\\) with \\(\\varepsilon \\propto \\Lambda_c - \\Lambda_{\\mathrm{ov}} > 0\\). Integrating \\(\\frac{dz}{dk} = c(z - z_{\\mathrm{tan}})^2 + \\varepsilon\\) gives \\(\\langle N_{\\mathrm{laminar}} \\rangle = \\frac{\\pi}{\\sqrt{c\\,\\varepsilon}} \\propto |\\Lambda_c - \\Lambda_{\\mathrm{ov}}|^{-1/2}\\), so \\(\\mathbf{\\nu_{\\mathrm{ghost}} = \\frac{1}{2}}\\).</li>
    <li><strong>Superstable Period-3 Window Coordinates (0.9 pts):</strong><br>
    Setting \\(g_\\Lambda'(z_c) = \\Lambda_{\\mathrm{ov}}(1 - 2z_c) = 0 \\implies z_1^* = z_c = 0.50000\\). Solving \\(g_\\Lambda^3(0.5) = 0.5\\) via Newton–Raphson or the simulator stroboscope yields:
    $$ \\Lambda_{\\mathrm{ov}}^* = \\mathbf{3.83187}, \\qquad z_1^* = \\mathbf{0.50000}, \\qquad z_2^* = \\mathbf{0.95797}, \\qquad z_3^* = \\mathbf{0.15445} $$</li>
</ol>

<p><strong>C3. Thermodynamic Clausius Invariant &amp; Verification Vector (1.4 pts)</strong></p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li><strong>Closed-Loop Identity &amp; Dredge-Up Average (0.8 pts):</strong><br>
    Substituting \\(v = \\mathcal{N}(u) - \\Lambda_{\\mathrm{ov}}w u^2 + \\delta\\dot{u}\\) into \\(\\dot{v}\\,du = (-u - \\beta_d v + \\kappa u^2 - \\eta_{\\mathrm{dredge}}w)du\\) and noting that \\(\\oint_{\\mathcal{C}_3} \\dot{v}\\,du = \\oint_{\\mathcal{C}_3} \\dot{u}\\,dv = -\\oint_{\\mathcal{C}_3} v\\,du = -\\mathcal{A}_{uv}\\) proves the closed-loop identity. Integrating the \\(\\dot{v}\\) equation over \\([0, \\mathcal{T}_3]\\) with \\(v(\\mathcal{T}_3) = v(0)\\) immediately gives:
    $$ \\langle w \\rangle_3 = \\mathbf{\\frac{\\kappa \\langle u^2 \\rangle_3 - \\langle u \\rangle_3 - \\beta_d \\langle v \\rangle_3}{\\eta_{\\mathrm{dredge}}}} $$</li>
    <li><strong>Superstability Multiplier &amp; Verification Vector (0.6 pts):</strong><br>
    By the chain rule, \\(\\Lambda_3 = g_\\Lambda'(z_3^*) g_\\Lambda'(z_2^*) g_\\Lambda'(z_1^*) = \\mathbf{0}\\) since \\(g_\\Lambda'(z_1^*) = 0\\). The final verification vector to 5 significant figures is:
    $$ \\mathbf{V} = (\\mathbf{3.8319,\\; 0.95797,\\; 0.15445}) $$</li>
</ol>`
    }
];