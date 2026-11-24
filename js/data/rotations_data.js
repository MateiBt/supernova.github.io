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
    },

    // Day 15 — 02.11.2026
    {
        uniqueId: "potd_2026_11_02",
        dayNumber: 15,
        scheduledDate: "02.11.2026",
        title: "Hydrostatic Balance and Virial Temperature of a Uniform Star",
        author: "Matei",
        module: "T5 · Stellar Structure & Hydrostatic Equilibrium",
        difficultyClass: "easy",
        difficultyText: "2.6 / 10.0",
        description: `<p>In a first-order structural model, a star of mass \\(M = 1.50\\,M_\\odot\\) and radius \\(R = 1.20\\,R_\\odot\\) is approximated as an incompressible sphere of uniform mass density \\(\\rho_0\\), composed entirely of fully ionized pure hydrogen (mean molecular weight \\(\\mu = 0.50\\)).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the uniform mass density \\(\\rho_0\\) of the star in \\(\\mathrm{kg\\,m^{-3}}\\) and \\(\\mathrm{g\\,cm^{-3}}\\). <em>(1.5 points)</em></li>
    <li>By integrating the equation of hydrostatic equilibrium \\(\\frac{dP}{dr} = -\\frac{G M(r)\\rho(r)}{r^2}\\) from the surface (\\(P(R) = 0\\)) to the center, derive the exact symbolic formula for the central pressure \\(P_c\\) in terms of \\(G, M\\), and \\(R\\), and calculate its numerical value in \\(\\mathrm{Pa}\\) and \\(\\mathrm{atm}\\). <em>(3.0 points)</em></li>
    <li>Using the ideal gas law \\(P = \\frac{\\rho k_B T}{\\mu m_H}\\) (neglecting radiation pressure), determine the central temperature \\(T_c\\) in Kelvin. <em>(2.0 points)</em></li>
    <li>Derive the total gravitational potential energy \\(\\Omega = -\\frac{3}{5}\\frac{GM^2}{R}\\) of the uniform sphere and apply the Virial Theorem (\\(2K + \\Omega = 0\\)) to determine the volume-averaged internal temperature \\(\\bar{T}\\), finding the exact ratio \\(\\bar{T} / T_c\\). <em>(2.0 points)</em></li>
    <li>Calculate the radiation pressure \\(P_{\\mathrm{rad}} = \\frac{1}{3}a T_c^4\\) at the stellar center and the ratio \\(P_{\\mathrm{rad}} / P_c\\) to verify whether neglecting radiation pressure was justified. <em>(1.5 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Uniform Mass Density \\(\\rho_0\\) (1.5 points):</strong><br>
With \\(M = 1.50 \\times 1.989 \\times 10^{30}\\text{ kg} = 2.984 \\times 10^{30}\\text{ kg}\\) and \\(R = 1.20 \\times 6.957 \\times 10^8\\text{ m} = 8.348 \\times 10^8\\text{ m}\\):</p>
<p>$$ \\rho_0 = \\frac{M}{\\frac{4}{3}\\pi R^3} = \\frac{2.984 \\times 10^{30}\\text{ kg}}{\\frac{4}{3}\\pi (8.348 \\times 10^8\\text{ m})^3} \\approx \\mathbf{1224\\ \\mathrm{kg\\,m^{-3}}} = \\mathbf{1.224\\ \\mathrm{g\\,cm^{-3}}} $$</p>

<p><strong>(b) Derivation &amp; Calculation of Central Pressure \\(P_c\\) (3.0 points):</strong><br>
At interior radius \\(r\\), the enclosed mass is \\(M(r) = \\frac{4}{3}\\pi r^3 \\rho_0 = M\\left(\\frac{r}{R}\\right)^3\\). Substituting into the hydrostatic equilibrium equation:</p>
<p>$$ \\frac{dP}{dr} = -\\frac{G}{r^2}\\left(\\frac{4}{3}\\pi r^3 \\rho_0\\right)\\rho_0 = -\\frac{4}{3}\\pi G \\rho_0^2\\,r $$</p>
<p>Integrating from \\(r = 0\\) (\\(P = P_c\\)) to \\(r = R\\) (\\(P = 0\\)) and substituting \\(\\rho_0 = \\frac{3M}{4\\pi R^3}\\):</p>
<p>$$ P_c = \\frac{2}{3}\\pi G \\rho_0^2 R^2 = \\mathbf{\\frac{3}{8\\pi}\\frac{G M^2}{R^4}} $$</p>
<p>Evaluating numerically (\\(1\\text{ atm} = 1.01325 \\times 10^5\\text{ Pa}\\)):</p>
<p>$$ P_c = \\frac{3}{8\\pi}\\frac{(6.674 \\times 10^{-11})(2.984 \\times 10^{30})^2}{(8.348 \\times 10^8)^4} \\approx \\mathbf{1.46 \\times 10^{14}\\text{ Pa}} \\approx \\mathbf{1.44 \\times 10^9\\text{ atm}} $$</p>

<p><strong>(c) Central Temperature \\(T_c\\) (2.0 points):</strong><br>
Applying the ideal gas equation of state at \\(r = 0\\) with \\(\\mu = 0.50\\), \\(m_H = 1.6736 \\times 10^{-27}\\text{ kg}\\), and \\(k_B = 1.3806 \\times 10^{-23}\\ \\mathrm{J\\,K^{-1}}\\):</p>
<p>$$ T_c = \\frac{\\mu m_H P_c}{\\rho_0 k_B} = \\frac{1}{2}\\frac{G M \\mu m_H}{k_B R} \\approx \\mathbf{7.23 \\times 10^6\\text{ K}} $$</p>

<p><strong>(d) Gravitational Potential Energy &amp; Virial Mean Temperature \\(\\bar{T}\\) (2.0 points):</strong><br>
Bringing spherical mass shells \\(dM(r) = 4\\pi r^2 \\rho_0\\,dr\\) from infinity onto the enclosed core \\(M(r) = \\frac{4}{3}\\pi r^3 \\rho_0\\):</p>
<p>$$ \\Omega = -\\int_0^R \\frac{G M(r)\\,dM(r)}{r} = -\\frac{16}{3}\\pi^2 G \\rho_0^2 \\int_0^R r^4\\,dr = -\\frac{16}{15}\\pi^2 G \\rho_0^2 R^5 = -\\frac{3}{5}\\frac{G M^2}{R} \\approx \\mathbf{-4.27 \\times 10^{41}\\text{ J}} $$</p>
<p>By the Virial Theorem for a monatomic ideal gas, \\(K = \\frac{3}{2}\\frac{M}{\\mu m_H}k_B \\bar{T} = -\\frac{1}{2}\\Omega = \\frac{3}{10}\\frac{G M^2}{R}\\), yielding:</p>
<p>$$ \\bar{T} = \\frac{1}{5}\\frac{G M \\mu m_H}{k_B R} \\approx \\mathbf{2.89 \\times 10^6\\text{ K}}, \\qquad \\frac{\\bar{T}}{T_c} = \\frac{1/5}{1/2} = \\mathbf{\\frac{2}{5} = 0.40} $$</p>

<p><strong>(e) Radiation Pressure Ratio at the Center (1.5 points):</strong><br>
With radiation constant \\(a = \\frac{4\\sigma_{\\mathrm{SB}}}{c} = 7.5657 \\times 10^{-16}\\ \\mathrm{J\\,m^{-3}\\,K^{-4}}\\):</p>
<p>$$ P_{\\mathrm{rad}} = \\frac{1}{3}a T_c^4 = \\frac{1}{3}(7.5657 \\times 10^{-16})(7.228 \\times 10^6\\text{ K})^4 \\approx \\mathbf{6.88 \\times 10^{11}\\text{ Pa}} $$</p>
<p>$$ \\frac{P_{\\mathrm{rad}}}{P_c} = \\frac{6.88 \\times 10^{11}\\text{ Pa}}{1.46 \\times 10^{14}\\text{ Pa}} \\approx \\mathbf{4.72 \\times 10^{-3}} \\ (0.47\\%) $$</p>
<p>Because radiation pressure contributes less than \\(0.5\\%\\) of the total central pressure, neglecting it in the hydrostatic gas model is <strong>well justified</strong>.</p>`
    },

    // Day 16 — 03.11.2026
    {
        uniqueId: "potd_2026_11_03",
        dayNumber: 16,
        scheduledDate: "03.11.2026",
        title: "Flat Rotation Curve and the Dark Matter Halo",
        author: "Matei",
        module: "T10 · Galactic Structure & Dark Matter",
        difficultyClass: "easy",
        difficultyText: "2.8 / 10.0",
        description: `<p>Neutral hydrogen \\(21\\text{-cm}\\) radio observations of an external spiral galaxy show that its circular rotation curve remains strictly flat at \\(v_c = 220\\ \\mathrm{km\\,s^{-1}}\\) from galactocentric radius \\(r = 4.0\\text{ kpc}\\) out to \\(r = 30.0\\text{ kpc}\\). Photometric surface-brightness mapping indicates that the total luminous mass (stars plus interstellar gas) enclosed within \\(r = 25.0\\text{ kpc}\\) is \\(M_{\\mathrm{lum}} = 6.50 \\times 10^{10}\\,M_\\odot\\). Assume a spherically symmetric total mass distribution at large radii.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the orbital period of a star at galactocentric radius \\(R_0 = 8.0\\text{ kpc}\\) (in millions of years) and the total dynamical mass enclosed within \\(R_0 = 8.0\\text{ kpc}\\) (in solar masses). <em>(2.0 points)</em></li>
    <li>Determine the total dynamical mass \\(M_{\\mathrm{tot}}(25\\text{ kpc})\\) enclosed within \\(r = 25.0\\text{ kpc}\\), and calculate the dark matter mass fraction \\(f_{\\mathrm{DM}} = \\frac{M_{\\mathrm{DM}}}{M_{\\mathrm{tot}}}\\) inside this radius. <em>(2.0 points)</em></li>
    <li>Derive the radial mass density profile \\(\\rho(r)\\) required to sustain a constant circular speed \\(v_c\\), and calculate the total mass density at \\(R_0 = 8.0\\text{ kpc}\\) in both \\(\\mathrm{kg\\,m^{-3}}\\) and \\(M_\\odot\\,\\mathrm{pc^{-3}}\\). <em>(2.5 points)</em></li>
    <li>Evaluate the Oort constants \\(A\\) and \\(B\\) (in \\(\\mathrm{km\\,s^{-1}\\,kpc^{-1}}\\)) at \\(R_0 = 8.0\\text{ kpc}\\). <em>(2.0 points)</em></li>
    <li>If the galaxy contained no dark matter beyond \\(r = 8.0\\text{ kpc}\\) (so that all mass were concentrated inside \\(8.0\\text{ kpc}\\)), what circular orbital speed would be observed at \\(r = 25.0\\text{ kpc}\\)? <em>(1.5 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Orbital Period &amp; Enclosed Mass at \\(R_0 = 8.0\\text{ kpc}\\) (2.0 points):</strong><br>
With \\(R_0 = 8.0\\text{ kpc} = 2.469 \\times 10^{20}\\text{ m}\\) and \\(v_c = 2.20 \\times 10^5\\ \\mathrm{m\\,s^{-1}}\\):</p>
<p>$$ P(R_0) = \\frac{2\\pi R_0}{v_c} = \\frac{2\\pi(2.469 \\times 10^{20}\\text{ m})}{2.20 \\times 10^5\\ \\mathrm{m\\,s^{-1}}} \\approx 7.050 \\times 10^{15}\\text{ s} \\approx \\mathbf{223\\text{ Myr}} $$</p>
<p>Setting centripetal acceleration equal to gravitational attraction \\(\\frac{v_c^2}{r} = \\frac{G M(r)}{r^2}\\) gives \\(M(r) = \\frac{v_c^2 r}{G}\\):</p>
<p>$$ M(8.0\\text{ kpc}) = \\frac{(2.20 \\times 10^5)^2 (2.469 \\times 10^{20})}{6.674 \\times 10^{-11}} \\approx 1.790 \\times 10^{41}\\text{ kg} \\approx \\mathbf{9.00 \\times 10^{10}\\,M_\\odot} $$</p>

<p><strong>(b) Dynamical Mass &amp; Dark Matter Fraction within \\(25.0\\text{ kpc}\\) (2.0 points):</strong><br>
Because \\(M(r) \\propto r\\) in the flat-rotation regime:</p>
<p>$$ M_{\\mathrm{tot}}(25.0\\text{ kpc}) = M(8.0\\text{ kpc})\\times \\frac{25.0}{8.0} = 9.00 \\times 10^{10}\\,M_\\odot \\times 3.125 \\approx \\mathbf{2.81 \\times 10^{11}\\,M_\\odot} $$</p>
<p>The dark matter mass is \\(M_{\\mathrm{DM}} = M_{\\mathrm{tot}} - M_{\\mathrm{lum}} = (2.813 - 0.650)\\times 10^{11}\\,M_\\odot = 2.163 \\times 10^{11}\\,M_\\odot\\), yielding a dark matter fraction of:</p>
<p>$$ f_{\\mathrm{DM}} = \\frac{2.163 \\times 10^{11}}{2.813 \\times 10^{11}} \\approx \\mathbf{0.769} \\quad (\\mathbf{76.9\\%}) $$</p>

<p><strong>(c) Radial Halo Density Profile \\(\\rho(r)\\) (2.5 points):</strong><br>
Differentiating \\(M(r) = \\frac{v_c^2 r}{G}\\) with respect to \\(r\\) using spherical shell conservation \\(\\frac{dM}{dr} = 4\\pi r^2 \\rho(r)\\):</p>
<p>$$ 4\\pi r^2 \\rho(r) = \\frac{v_c^2}{G} \\implies \\mathbf{\\rho(r) = \\frac{v_c^2}{4\\pi G r^2} \\propto r^{-2}} $$</p>
<p>At \\(R_0 = 8.0\\text{ kpc} = 8000\\text{ pc}\\):</p>
<p>$$ \\rho(8.0\\text{ kpc}) = \\frac{(2.20 \\times 10^5)^2}{4\\pi(6.674 \\times 10^{-11})(2.469 \\times 10^{20})^2} \\approx \\mathbf{9.47 \\times 10^{-22}\\ \\mathrm{kg\\,m^{-3}}} \\approx \\mathbf{0.0140\\,M_\\odot\\,\\mathrm{pc^{-3}}} $$</p>

<p><strong>(d) Oort Constants \\(A\\) and \\(B\\) at \\(R_0 = 8.0\\text{ kpc}\\) (2.0 points):</strong><br>
For a flat rotation curve where \\(\\left.\\frac{dv_c}{dr}\\right|_{R_0} = 0\\):</p>
<p>$$ A = \\frac{1}{2}\\left(\\frac{v_c}{R_0} - \\left.\\frac{dv_c}{dr}\\right|_{R_0}\\right) = \\frac{220\\ \\mathrm{km\\,s^{-1}}}{2 \\times 8.0\\text{ kpc}} = \\mathbf{+13.75\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}} $$</p>
<p>$$ B = -\\frac{1}{2}\\left(\\frac{v_c}{R_0} + \\left.\\frac{dv_c}{dr}\\right|_{R_0}\\right) = -\\frac{220\\ \\mathrm{km\\,s^{-1}}}{2 \\times 8.0\\text{ kpc}} = \\mathbf{-13.75\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}} $$</p>

<p><strong>(e) Expected Keplerian Speed without Outer Dark Matter (1.5 points):</strong><br>
If \\(M(r) = M(8.0\\text{ kpc}) = \\text{const.}\\) for \\(r \\ge 8.0\\text{ kpc}\\), orbital speed would fall off following a Keplerian profile \\(v(r) \\propto r^{-1/2}\\):</p>
<p>$$ v_{\\mathrm{Kep}}(25.0\\text{ kpc}) = v_c\\sqrt{\\frac{8.0\\text{ kpc}}{25.0\\text{ kpc}}} = 220\\ \\mathrm{km\\,s^{-1}} \\times \\sqrt{0.32} \\approx \\mathbf{124.5\\ \\mathrm{km\\,s^{-1}}} $$</p>`
    },

    // Day 17 — 04.11.2026
    {
        uniqueId: "potd_2026_11_04",
        dayNumber: 17,
        scheduledDate: "04.11.2026",
        title: "Hohmann Transfer to a Ringed Giant and the Roche Limit",
        author: "Matei",
        module: "T1 · Celestial Mechanics & Tidal Dynamics",
        difficultyClass: "medium",
        difficultyText: "3.5 / 10.0",
        description: `<p>An interplanetary spacecraft is launched from Earth's circular heliocentric orbit (\\(r_1 = 1.00\\text{ AU}\\)) to a ringed gas giant orbiting the Sun on a coplanar circular orbit of radius \\(r_2 = 9.54\\text{ AU}\\). The mission uses a minimum-energy Hohmann transfer ellipse tangent to both planetary orbits. Upon arrival, the probe investigates the planet's ring system (planet mass \\(M_p = 5.68 \\times 10^{26}\\text{ kg}\\), mean density \\(\\rho_p = 687\\ \\mathrm{kg\\,m^{-3}}\\)) and an icy shepherd moon of bulk density \\(\\rho_m = 950\\ \\mathrm{kg\\,m^{-3}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the semimajor axis \\(a_{\\mathrm{trans}}\\) and eccentricity \\(e_{\\mathrm{trans}}\\) of the heliocentric transfer ellipse. <em>(1.5 points)</em></li>
    <li>Calculate the transfer time of flight \\(t_{\\mathrm{trans}}\\) from Earth to the gas giant in years. <em>(1.5 points)</em></li>
    <li>Calculate the spacecraft's heliocentric velocities at perihelion (\\(v_p\\)) and aphelion (\\(v_a\\)) of the transfer orbit, and find the impulsive velocity boosts \\(\\Delta v_1\\) at Earth departure and \\(\\Delta v_2\\) required to circularize the heliocentric orbit at \\(r_2\\) (neglecting the local planetary escape fields). <em>(3.0 points)</em></li>
    <li>Determine the mean radius \\(R_p\\) of the giant planet in kilometers, and calculate both the rigid-body Roche limit \\(d_{\\mathrm{rigid}} = 1.26\\,R_p\\left(\\frac{\\rho_p}{\\rho_m}\\right)^{1/3}\\) and the fluid-body Roche limit \\(d_{\\mathrm{fluid}} = 2.44\\,R_p\\left(\\frac{\\rho_p}{\\rho_m}\\right)^{1/3}\\) for the icy moon. <em>(2.5 points)</em></li>
    <li>Calculate the orbital period (in hours) of a ring particle moving on a circular equatorial orbit right at the fluid Roche limit \\(d_{\\mathrm{fluid}}\\). <em>(1.5 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Semimajor Axis &amp; Eccentricity of the Transfer Orbit (1.5 points):</strong><br>
With perihelion at \\(r_1 = 1.00\\text{ AU}\\) and aphelion at \\(r_2 = 9.54\\text{ AU}\\):</p>
<p>$$ a_{\\mathrm{trans}} = \\frac{r_1 + r_2}{2} = \\frac{1.00 + 9.54}{2} = \\mathbf{5.27\\text{ AU}} $$</p>
<p>$$ e_{\\mathrm{trans}} = \\frac{r_2 - r_1}{r_2 + r_1} = \\frac{8.54}{10.54} \\approx \\mathbf{0.8102} $$</p>

<p><strong>(b) Hohmann Transfer Time of Flight (1.5 points):</strong><br>
By Kepler's Third Law, the full period of the transfer ellipse is \\(P_{\\mathrm{trans}} = a_{\\mathrm{trans}}^{3/2} = (5.27)^{3/2} \\approx 12.098\\text{ years}\\). The outbound coasting flight covers half an orbit:</p>
<p>$$ t_{\\mathrm{trans}} = \\frac{1}{2}P_{\\mathrm{trans}} \\approx \\mathbf{6.05\\text{ years}} $$</p>

<p><strong>(c) Perihelion/Aphelion Speeds &amp; Impulsive \\(\\Delta v\\) Maneuvers (3.0 points):</strong><br>
Using the vis-viva equation \\(v(r) = v_\\oplus\\sqrt{\\frac{2}{r} - \\frac{1}{a_{\\mathrm{trans}}}}\\) with \\(v_\\oplus = 29.785\\ \\mathrm{km\\,s^{-1}}\\) (where \\(r\\) and \\(a_{\\mathrm{trans}}\\) are in \\(\\text{AU}\\)):</p>
<p>$$ v_p = 29.785\\sqrt{\\frac{2}{1.00} - \\frac{1}{5.27}} = 29.785\\sqrt{1.81025} \\approx \\mathbf{40.07\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>$$ v_a = 29.785\\sqrt{\\frac{2}{9.54} - \\frac{1}{5.27}} = 29.785\\sqrt{0.019898} \\approx \\mathbf{4.20\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>The circular orbital speed of the target planet at \\(r_2 = 9.54\\text{ AU}\\) is \\(v_{\\mathrm{circ},2} = \\frac{v_\\oplus}{\\sqrt{9.54}} \\approx 9.64\\ \\mathrm{km\\,s^{-1}}\\). Thus:</p>
<p>$$ \\Delta v_1 = v_p - v_\\oplus = 40.07 - 29.79 = \\mathbf{10.29\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>$$ \\Delta v_2 = v_{\\mathrm{circ},2} - v_a = 9.64 - 4.20 = \\mathbf{5.44\\ \\mathrm{km\\,s^{-1}}} \\qquad (\\Delta v_{\\mathrm{tot}} = \\mathbf{15.73\\ \\mathrm{km\\,s^{-1}}}) $$</p>

<p><strong>(d) Planetary Radius &amp; Roche Limits (2.5 points):</strong><br>
From \\(M_p = \\frac{4}{3}\\pi R_p^3 \\rho_p\\):</p>
<p>$$ R_p = \\left(\\frac{3 M_p}{4\\pi \\rho_p}\\right)^{1/3} = \\left(\\frac{3(5.68 \\times 10^{26}\\text{ kg})}{4\\pi(687\\ \\mathrm{kg\\,m^{-3}})}\\right)^{1/3} \\approx 5.822 \\times 10^7\\text{ m} = \\mathbf{58,220\\text{ km}} $$</p>
<p>With density ratio factor \\(\\left(\\frac{\\rho_p}{\\rho_m}\\right)^{1/3} = \\left(\\frac{687}{950}\\right)^{1/3} \\approx 0.8976\\):</p>
<p>$$ d_{\\mathrm{rigid}} = 1.26\\,R_p(0.8976) \\approx \\mathbf{1.131\\,R_p} \\approx \\mathbf{65,850\\text{ km}} $$</p>
<p>$$ d_{\\mathrm{fluid}} = 2.44\\,R_p(0.8976) \\approx \\mathbf{2.190\\,R_p} \\approx \\mathbf{127,500\\text{ km}} $$</p>

<p><strong>(e) Ring Particle Orbital Period at the Fluid Roche Limit (1.5 points):</strong><br>
At \\(d_{\\mathrm{fluid}} = 1.2752 \\times 10^8\\text{ m}\\), Kepler's Third Law around the giant planet yields:</p>
<p>$$ P_{\\mathrm{Roche}} = 2\\pi\\sqrt{\\frac{d_{\\mathrm{fluid}}^3}{G M_p}} = 2\\pi\\sqrt{\\frac{(1.2752 \\times 10^8)^3}{(6.674 \\times 10^{-11})(5.68 \\times 10^{26})}} \\approx 4.648 \\times 10^4\\text{ s} \\approx \\mathbf{12.91\\text{ hours}} $$</p>`
    },

    // Day 18 — 05.11.2026
    {
        uniqueId: "potd_2026_11_05",
        dayNumber: 18,
        scheduledDate: "05.11.2026",
        title: "Feeding a Quasar: Eddington Limit and Accretion Efficiency",
        author: "Matei",
        module: "T11 · Active Galaxies & Supermassive Black Holes",
        difficultyClass: "easy",
        difficultyText: "2.7 / 10.0",
        description: `<p>A distant quasar is powered by a supermassive black hole of mass \\(M_{\\mathrm{BH}} = 3.00 \\times 10^8\\,M_\\odot\\) accreting fully ionized pure hydrogen gas. The quasar radiates isotropically at \\(40.0\\%\\) of its Eddington luminosity (\\(L_{\\mathrm{bol}} = 0.400\\,L_{\\mathrm{Edd}}\\)), with a radiative mass-to-energy conversion efficiency of \\(\\eta = 0.100\\) (\\(L_{\\mathrm{bol}} = \\eta \\dot{M} c^2\\)). Take the Thomson electron-scattering cross-section as \\(\\sigma_T = 6.652 \\times 10^{-29}\\ \\mathrm{m^2}\\), proton mass \\(m_p = 1.673 \\times 10^{-27}\\text{ kg}\\), and \\(L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the Schwarzschild radius \\(R_S\\) of the black hole in kilometers and in astronomical units. <em>(1.5 points)</em></li>
    <li>Derive the formula for the Eddington luminosity \\(L_{\\mathrm{Edd}}\\) by equating outward Thomson radiation force on electrons to inward gravitational attraction on protons, and calculate both \\(L_{\\mathrm{Edd}}\\) and \\(L_{\\mathrm{bol}}\\) in Watts and solar luminosities. <em>(2.5 points)</em></li>
    <li>Determine the mass accretion rate \\(\\dot{M}\\) required to power the quasar in \\(\\mathrm{kg\\,s^{-1}}\\) and in \\(M_\\odot\\,\\mathrm{yr^{-1}}\\). <em>(2.0 points)</em></li>
    <li>Assuming the inner accretion disk radiates as an ideal blackbody over a two-sided surface area \\(A = 2 \\times 4\\pi R_{\\mathrm{in}}^2\\) characteristic of the innermost stable circular orbit at \\(R_{\\mathrm{in}} = 3R_S\\), estimate its effective temperature \\(T_{\\mathrm{eff}}\\) and peak emission wavelength \\(\\lambda_{\\max}\\). <em>(2.5 points)</em></li>
    <li>If the black hole accretes continuously at its full Eddington limit (\\(L = L_{\\mathrm{Edd}}\\)) with radiative efficiency \\(\\eta = 0.100\\) such that the black hole mass grows at rate \\(\\dot{M}_{\\mathrm{BH}} = (1 - \\eta)\\dot{M}\\), calculate the Salpeter \\(e\\)-folding growth timescale \\(\\tau_{\\mathrm{Sal}} = \\frac{M_{\\mathrm{BH}}}{\\dot{M}_{\\mathrm{BH}}}\\) in millions of years. <em>(1.5 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Schwarzschild Radius \\(R_S\\) (1.5 points):</strong><br>
With \\(M_{\\mathrm{BH}} = 3.00 \\times 10^8 \\times 1.989 \\times 10^{30}\\text{ kg} = 5.967 \\times 10^{38}\\text{ kg}\\):</p>
<p>$$ R_S = \\frac{2 G M_{\\mathrm{BH}}}{c^2} = \\frac{2(6.674 \\times 10^{-11})(5.967 \\times 10^{38})}{(2.998 \\times 10^8)^2} \\approx \\mathbf{8.86 \\times 10^8\\text{ km}} \\approx \\mathbf{5.92\\text{ AU}} $$</p>

<p><strong>(b) Derivation of \\(L_{\\mathrm{Edd}}\\) &amp; Quasar Luminosity (2.5 points):</strong><br>
At distance \\(r\\), the photon momentum flux is \\(\\frac{L}{4\\pi r^2 c}\\), exerting an outward Thomson scattering force \\(F_{\\mathrm{rad}} = \\frac{L \\sigma_T}{4\\pi r^2 c}\\) on each free electron (coupled electrostatically to a proton of mass \\(m_p\\)). Balancing against inward gravity \\(F_{\\mathrm{grav}} = \\frac{G M_{\\mathrm{BH}} m_p}{r^2}\\):</p>
<p>$$ \\frac{L_{\\mathrm{Edd}} \\sigma_T}{4\\pi r^2 c} = \\frac{G M_{\\mathrm{BH}} m_p}{r^2} \\implies \\mathbf{L_{\\mathrm{Edd}} = \\frac{4\\pi G M_{\\mathrm{BH}} m_p c}{\\sigma_T}} $$</p>
<p>Evaluating numerically:</p>
<p>$$ L_{\\mathrm{Edd}} = \\frac{4\\pi(6.674 \\times 10^{-11})(5.967 \\times 10^{38})(1.673 \\times 10^{-27})(2.998 \\times 10^8)}{6.652 \\times 10^{-29}} \\approx \\mathbf{3.77 \\times 10^{39}\\text{ W}} \\approx \\mathbf{9.86 \\times 10^{12}\\,L_\\odot} $$</p>
<p>$$ L_{\\mathrm{bol}} = 0.400\\,L_{\\mathrm{Edd}} \\approx \\mathbf{1.51 \\times 10^{39}\\text{ W}} \\approx \\mathbf{3.94 \\times 10^{12}\\,L_\\odot} $$</p>

<p><strong>(c) Mass Accretion Rate \\(\\dot{M}\\) (2.0 points):</strong></p>
<p>$$ \\dot{M} = \\frac{L_{\\mathrm{bol}}}{\\eta c^2} = \\frac{1.509 \\times 10^{39}\\text{ W}}{0.100 \\times (2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}})^2} \\approx \\mathbf{1.68 \\times 10^{23}\\ \\mathrm{kg\\,s^{-1}}} \\approx \\mathbf{2.67\\,M_\\odot\\,\\mathrm{yr^{-1}}} $$</p>

<p><strong>(d) Inner Disk Blackbody Temperature &amp; Peak Wavelength (2.5 points):</strong><br>
With \\(R_{\\mathrm{in}} = 3R_S = 2.659 \\times 10^{12}\\text{ m}\\) and radiating area \\(A = 8\\pi R_{\\mathrm{in}}^2 \\approx 1.777 \\times 10^{26}\\ \\mathrm{m^2}\\):</p>
<p>$$ T_{\\mathrm{eff}} = \\left(\\frac{L_{\\mathrm{bol}}}{8\\pi R_{\\mathrm{in}}^2 \\sigma_{\\mathrm{SB}}}\\right)^{1/4} = \\left(\\frac{1.509 \\times 10^{39}}{(1.777 \\times 10^{26})(5.670 \\times 10^{-8})}\\right)^{1/4} \\approx \\mathbf{1.11 \\times 10^5\\text{ K}} $$</p>
<p>By Wien's Displacement Law (\\(b = 2.898 \\times 10^{-3}\\ \\mathrm{m\\,K}\\)):</p>
<p>$$ \\lambda_{\\max} = \\frac{b}{T_{\\mathrm{eff}}} = \\frac{2.898 \\times 10^{-3}}{1.106 \\times 10^5} \\approx \\mathbf{26.2\\text{ nm}} \\quad (\\text{extreme ultraviolet, } \\text{EUV}) $$</p>

<p><strong>(e) Salpeter Growth Timescale \\(\\tau_{\\mathrm{Sal}}\\) (1.5 points):</strong><br>
At the Eddington limit, \\(L_{\\mathrm{Edd}} = \\eta \\dot{M}_{\\mathrm{Edd}} c^2\\) and \\(\\dot{M}_{\\mathrm{BH}} = (1 - \\eta)\\dot{M}_{\\mathrm{Edd}} = \\frac{1 - \\eta}{\\eta}\\frac{L_{\\mathrm{Edd}}}{c^2}\\), yielding a mass-independent \\(e\\)-folding time:</p>
<p>$$ \\tau_{\\mathrm{Sal}} = \\frac{M_{\\mathrm{BH}}}{\\dot{M}_{\\mathrm{BH}}} = \\left(\\frac{\\eta}{1 - \\eta}\\right)\\frac{\\sigma_T c}{4\\pi G m_p} \\approx \\mathbf{50.0\\text{ Myr}} \\quad (\\text{or } \\mathbf{45.0\\text{ Myr}}\\text{ without the }(1-\\eta)\\text{ factor}) $$</p>`
    },

    // Day 19 — 06.11.2026
    {
        uniqueId: "potd_2026_11_06",
        dayNumber: 19,
        scheduledDate: "06.11.2026",
        title: "The Strömgren Sphere and Jeans Collapse of an H II Region",
        author: "Matei",
        module: "T6 · Interstellar Medium & Star Formation",
        difficultyClass: "medium",
        difficultyText: "3.2 / 10.0",
        description: `<p>A young O5 main-sequence star is born inside a homogeneous, isothermal interstellar cloud of pure neutral atomic hydrogen at temperature \\(T_{\\mathrm{cloud}} = 50.0\\text{ K}\\) and number density \\(n_H = 200\\ \\mathrm{cm^{-3}}\\). The star emits \\(N_{\\mathrm{Ly}} = 3.50 \\times 10^{49}\\ \\mathrm{s^{-1}}\\) Lyman-continuum ionizing photons (\\(h\\nu \\ge 13.6\\text{ eV}\\)), carving out a spherical \\(\\text{H II}\\) region of fully ionized hydrogen (\\(n_e = n_p = n_H = 200\\ \\mathrm{cm^{-3}}\\)) at equilibrium temperature \\(T_{\\mathrm{H\\,II}} = 10,000\\text{ K}\\). The case-B hydrogen recombination coefficient at \\(10,000\\text{ K}\\) is \\(\\alpha_B = 2.60 \\times 10^{-13}\\ \\mathrm{cm^3\\,s^{-1}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>By balancing the stellar photoionization rate against the total recombination rate inside the ionized sphere, derive the formula for the Strömgren radius \\(R_{\\mathrm{St}}\\) and calculate its value in parsecs. <em>(2.5 points)</em></li>
    <li>Calculate the total mass of ionized hydrogen gas \\(M_{\\mathrm{H\\,II}}\\) contained within the Strömgren sphere in solar masses. <em>(2.0 points)</em></li>
    <li>Determine the characteristic recombination timescale \\(t_{\\mathrm{rec}} = \\frac{1}{n_e \\alpha_B}\\) (in years) if the central ionizing star were suddenly extinguished. <em>(1.5 points)</em></li>
    <li>Calculate the ratio of the thermal gas pressure inside the hot ionized \\(\\text{H II}\\) region (\\(\\mu_{\\mathrm{H\\,II}} = 0.50\\)) to that of the surrounding cold neutral cloud (\\(\\mu_{\\mathrm{cloud}} = 1.00\\)), and explain its dynamical consequence. <em>(1.5 points)</em></li>
    <li>For the cold neutral cloud (\\(T_{\\mathrm{cloud}} = 50.0\\text{ K},\\ n_H = 200\\ \\mathrm{cm^{-3}}\\)), calculate the isothermal sound speed \\(c_s = \\sqrt{\\frac{k_B T_{\\mathrm{cloud}}}{m_H}}\\), the gravitational free-fall time \\(t_{\\mathrm{ff}} = \\sqrt{\\frac{3\\pi}{32 G \\rho_0}}\\) (in \\(\\text{Myr}\\)), and the Jeans mass \\(M_J = \\frac{\\pi}{6}\\rho_0\\left(\\frac{\\pi c_s^2}{G \\rho_0}\\right)^{3/2}\\) (in solar masses). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Strömgren Radius \\(R_{\\mathrm{St}}\\) (2.5 points):</strong><br>
In ionization equilibrium, the recombination rate per unit volume is \\(n_e n_p \\alpha_B = n_H^2 \\alpha_B\\). Equating the total recombinations in the sphere to \\(N_{\\mathrm{Ly}}\\):</p>
<p>$$ \\frac{4}{3}\\pi R_{\\mathrm{St}}^3 n_H^2 \\alpha_B = N_{\\mathrm{Ly}} \\implies \\mathbf{R_{\\mathrm{St}} = \\left(\\frac{3 N_{\\mathrm{Ly}}}{4\\pi n_H^2 \\alpha_B}\\right)^{1/3}} $$</p>
<p>Substituting \\(N_{\\mathrm{Ly}} = 3.50 \\times 10^{49}\\ \\mathrm{s^{-1}}\\), \\(n_H = 200\\ \\mathrm{cm^{-3}}\\), and \\(\\alpha_B = 2.60 \\times 10^{-13}\\ \\mathrm{cm^3\\,s^{-1}}\\):</p>
<p>$$ R_{\\mathrm{St}} = \\left(\\frac{3(3.50 \\times 10^{49})}{4\\pi(200)^2(2.60 \\times 10^{-13})}\\right)^{1/3} \\approx 9.296 \\times 10^{18}\\text{ cm} = 9.296 \\times 10^{16}\\text{ m} \\approx \\mathbf{3.01\\text{ pc}} $$</p>

<p><strong>(b) Mass of Ionized Gas \\(M_{\\mathrm{H\\,II}}\\) (2.0 points):</strong><br>
The mass density is \\(\\rho_0 = n_H m_H = (2.00 \\times 10^8\\ \\mathrm{m^{-3}})(1.6736 \\times 10^{-27}\\text{ kg}) = 3.347 \\times 10^{-19}\\ \\mathrm{kg\\,m^{-3}}\\). Thus:</p>
<p>$$ M_{\\mathrm{H\\,II}} = \\frac{4}{3}\\pi R_{\\mathrm{St}}^3 \\rho_0 = \\frac{N_{\\mathrm{Ly}} m_H}{n_H \\alpha_B} \\approx 1.126 \\times 10^{33}\\text{ kg} \\approx \\mathbf{566\\,M_\\odot} $$</p>

<p><strong>(c) Characteristic Recombination Timescale \\(t_{\\mathrm{rec}}\\) (1.5 points):</strong></p>
<p>$$ t_{\\mathrm{rec}} = \\frac{1}{n_e \\alpha_B} = \\frac{1}{(200\\ \\mathrm{cm^{-3}})(2.60 \\times 10^{-13}\\ \\mathrm{cm^3\\,s^{-1}})} \\approx 1.923 \\times 10^{10}\\text{ s} \\approx \\mathbf{609\\text{ years}} $$</p>

<p><strong>(d) Thermal Overpressure Ratio &amp; Dynamical Expansion (1.5 points):</strong><br>
Because each ionized hydrogen atom yields two free particles (\\(e^- + p^+\\)), \\(P_{\\mathrm{H\\,II}} = 2 n_H k_B T_{\\mathrm{H\\,II}}\\) while \\(P_{\\mathrm{cloud}} = n_H k_B T_{\\mathrm{cloud}}\\):</p>
<p>$$ \\frac{P_{\\mathrm{H\\,II}}}{P_{\\mathrm{cloud}}} = \\frac{2 T_{\\mathrm{H\\,II}}}{T_{\\mathrm{cloud}}} = \\frac{2(10,000\\text{ K})}{50.0\\text{ K}} = \\mathbf{400} $$</p>
<p>This \\(400\\text{-fold}\\) overpressure drives a supersonic ionization-shock front outward into the ambient neutral cloud, causing the \\(\\text{H II}\\) region to expand dynamically and compress the surrounding gas.</p>

<p><strong>(e) Sound Speed, Free-Fall Time &amp; Jeans Mass of the Cold Cloud (2.5 points):</strong></p>
<ul>
    <li><strong>Isothermal Sound Speed:</strong>
    $$ c_s = \\sqrt{\\frac{k_B T_{\\mathrm{cloud}}}{m_H}} = \\sqrt{\\frac{(1.3806 \\times 10^{-23})(50.0)}{1.6736 \\times 10^{-27}}} \\approx \\mathbf{642\\ \\mathrm{m\\,s^{-1}}} $$</li>
    <li><strong>Gravitational Free-Fall Time:</strong>
    $$ t_{\\mathrm{ff}} = \\sqrt{\\frac{3\\pi}{32 G \\rho_0}} = \\sqrt{\\frac{3\\pi}{32(6.674 \\times 10^{-11})(3.347 \\times 10^{-19})}} \\approx 1.148 \\times 10^{14}\\text{ s} \\approx \\mathbf{3.64\\text{ Myr}} $$</li>
    <li><strong>Jeans Length &amp; Jeans Mass:</strong>
    With \\(\\lambda_J = \\sqrt{\\frac{\\pi c_s^2}{G \\rho_0}} \\approx 2.409 \\times 10^{17}\\text{ m} \\approx 7.81\\text{ pc}\\):
    $$ M_J = \\frac{\\pi}{6}\\rho_0 \\lambda_J^3 \\approx 2.448 \\times 10^{33}\\text{ kg} \\approx \\mathbf{1230\\,M_\\odot} $$</li>
</ul>`
    },

    // Day 20 — 07.11.2026
    {
        uniqueId: "potd_2026_11_07",
        dayNumber: 20,
        scheduledDate: "07.11.2026",
        title: "Designing a Cassegrain Observatory: Plate Scale, Resolution, and SNR",
        author: "Matei",
        module: "T3 · Astronomical Instrumentation & Photometry",
        difficultyClass: "easy",
        difficultyText: "2.8 / 10.0",
        description: `<p>An astronomical observatory operates a classical Cassegrain reflecting telescope with primary mirror diameter \\(D = 0.800\\text{ m}\\) and effective focal ratio \\(f/10.0\\). A convex secondary mirror of diameter \\(d_{\\mathrm{sec}} = 0.200\\text{ m}\\) obstructs the center of the entrance pupil. At the Cassegrain focus sits a cooled CCD detector with a \\(4096 \\times 4096\\) array of square pixels, each of side length \\(p = 9.00\\ \\mu\\text{m}\\). Observations are performed in the Johnson \\(V\\) band (\\(\\lambda_0 = 550\\text{ nm}\\)).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the effective focal length \\(F\\) of the telescope, the focal-plane plate scale \\(s\\) (in \\(\\mathrm{arcsec\\,mm^{-1}}\\) and \\(\\mathrm{arcsec\\,pixel^{-1}}\\)), and the total angular field of view (in arcminutes) of the CCD sensor. <em>(2.5 points)</em></li>
    <li>Calculate the theoretical Rayleigh diffraction limit \\(\\theta_R = 1.22\\frac{\\lambda_0}{D}\\) in arcseconds. Given a local atmospheric seeing disk of \\(\\theta_{\\mathrm{see}} = 1.40''\\) (FWHM), state whether the system is diffraction-limited or seeing-limited and calculate how many pixels span the seeing FWHM. <em>(2.0 points)</em></li>
    <li>Calculate the unobstructed effective light-collecting area \\(A_{\\mathrm{eff}}\\) (in \\(\\mathrm{m^2}\\)) and the percentage of incident light blocked by the secondary mirror. <em>(1.5 points)</em></li>
    <li>For visual observation, the CCD is replaced by an eyepiece of focal length \\(f_{\\mathrm{ep}} = 25.0\\text{ mm}\\) and apparent field of view \\(\\mathrm{AFOV} = 68.0^\\circ\\). Calculate the magnification \\(M\\), the exit pupil diameter \\(d_{\\mathrm{exit}}\\), and the true field of view \\(\\mathrm{TFOV}\\). <em>(2.0 points)</em></li>
    <li>In a \\(t = 300\\text{ s}\\) CCD integration, a target star produces a net count rate of \\(\\dot{N}_\\star = 18.0\\ \\mathrm{e^-\\,s^{-1}}\\) summed over a photometric aperture of \\(n_{\\mathrm{pix}} = 25\\text{ pixels}\\). The sky background rate is \\(\\dot{B} = 12.0\\ \\mathrm{e^-\\,s^{-1}\\,pixel^{-1}}\\), the dark current rate is \\(\\dot{D} = 0.050\\ \\mathrm{e^-\\,s^{-1}\\,pixel^{-1}}\\), and the RMS readout noise is \\(R = 5.00\\ \\mathrm{e^-\\,pixel^{-1}}\\). Calculate the resulting signal-to-noise ratio \\(\\mathrm{SNR}\\). <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p><strong>(a) Effective Focal Length, Plate Scale &amp; CCD Field of View (2.5 points):</strong><br>
For aperture \\(D = 0.800\\text{ m}\\) at \\(f/10.0\\), the effective focal length is:</p>
<p>$$ F = 10.0 \\times 0.800\\text{ m} = \\mathbf{8.00\\text{ m}} = 8000\\text{ mm} $$</p>
<p>The focal-plane plate scale is:</p>
<p>$$ s = \\frac{206,264.8''}{F\\,[\\text{mm}]} = \\frac{206,264.8''}{8000\\text{ mm}} \\approx \\mathbf{25.78\\ \\mathrm{arcsec\\,mm^{-1}}} $$</p>
<p>For a pixel pitch of \\(p = 9.00 \\times 10^{-3}\\text{ mm}\\), the angular scale per pixel and total sensor field of view are:</p>
<p>$$ s_{\\mathrm{px}} = 25.783''\\,\\mathrm{mm^{-1}} \\times 0.00900\\text{ mm} \\approx \\mathbf{0.2320\\ \\mathrm{arcsec\\,pixel^{-1}}} $$</p>
<p>$$ \\mathrm{FOV} = 4096 \\times 0.2320'' = 950.5'' \\approx \\mathbf{15.84' \\times 15.84'} $$</p>

<p><strong>(b) Rayleigh Diffraction Limit &amp; Seeing Sampling (2.0 points):</strong></p>
<p>$$ \\theta_R = 1.22\\frac{\\lambda_0}{D} = 1.22\\frac{550 \\times 10^{-9}\\text{ m}}{0.800\\text{ m}} \\times 206,264.8'' \\approx \\mathbf{0.173''} $$</p>
<p>Because \\(\\theta_{\\mathrm{see}} = 1.40'' \\gg \\theta_R = 0.173''\\), the ground-based observations are <strong>seeing-limited</strong>. The stellar FWHM spans:</p>
<p>$$ N_{\\mathrm{FWHM}} = \\frac{\\theta_{\\mathrm{see}}}{s_{\\mathrm{px}}} = \\frac{1.40''}{0.2320''\\,\\mathrm{px^{-1}}} \\approx \\mathbf{6.03\\text{ pixels}} \\quad (\\text{well-sampled above the Nyquist criterion}) $$</p>

<p><strong>(c) Effective Light-Collecting Area &amp; Central Obstruction Loss (1.5 points):</strong></p>
<p>$$ A_{\\mathrm{eff}} = \\frac{\\pi}{4}\\left(D^2 - d_{\\mathrm{sec}}^2\\right) = \\frac{\\pi}{4}\\left(0.800^2 - 0.200^2\\right) = \\frac{\\pi}{4}(0.600) \\approx \\mathbf{0.471\\ \\mathrm{m^2}} $$</p>
<p>$$ \\text{Obstruction Loss} = \\left(\\frac{d_{\\mathrm{sec}}}{D}\\right)^2 \\times 100\\% = \\left(\\frac{0.200}{0.800}\\right)^2 \\times 100\\% = \\mathbf{6.25\\%} $$</p>

<p><strong>(d) Visual Mode: Magnification, Exit Pupil &amp; True FOV (2.0 points):</strong></p>
<p>$$ M = \\frac{F}{f_{\\mathrm{ep}}} = \\frac{8000\\text{ mm}}{25.0\\text{ mm}} = \\mathbf{320\\times} $$</p>
<p>$$ d_{\\mathrm{exit}} = \\frac{D}{M} = \\frac{800\\text{ mm}}{320} = \\mathbf{2.50\\text{ mm}}, \\qquad \\mathrm{TFOV} = \\frac{\\mathrm{AFOV}}{M} = \\frac{68.0^\\circ}{320} = \\mathbf{0.2125^\\circ} = \\mathbf{12.75'} $$</p>

<p><strong>(e) CCD Photometric Signal-to-Noise Ratio (2.0 points):</strong><br>
In exposure time \\(t = 300\\text{ s}\\), the total stellar signal is \\(S = \\dot{N}_\\star t = 18.0 \\times 300 = 5400\\ \\mathrm{e^-}\\). By the standard CCD noise equation across \\(n_{\\mathrm{pix}} = 25\\text{ pixels}\\):</p>
<p>$$ \\mathrm{SNR} = \\frac{\\dot{N}_\\star t}{\\sqrt{\\dot{N}_\\star t + n_{\\mathrm{pix}}\\left(\\dot{B} t + \\dot{D} t + R^2\\right)}} = \\frac{5400}{\\sqrt{5400 + 25\\big(12.0(300) + 0.050(300) + 5.00^2\\big)}} $$</p>
<p>$$ \\mathrm{SNR} = \\frac{5400}{\\sqrt{5400 + 25(3600 + 15 + 25)}} = \\frac{5400}{\\sqrt{5400 + 91,000}} = \\frac{5400}{\\sqrt{96,400}} \\approx \\frac{5400}{310.48} \\approx \\mathbf{17.4} $$</p>`
    },

    // Day 21 — 08.11.2026
    {
        uniqueId: "potd_2026_11_08",
        dayNumber: 21,
        scheduledDate: "08.11.2026",
        title: "The MACHO Microlensing Event",
        author: "Xavier",
        module: "T8 · Stellar Remnants & Gravitational Lensing",
        difficultyClass: "easy",
        difficultyText: "3.4 / 10.0",
        description: `<p>Astronomers are monitoring a gravitational microlensing event caused by a Massive Compact Halo Object (MACHO) passing in front of a background star. The lens (MACHO) has mass \\(M = 0.50\\,M_\\odot\\) and is located at a distance \\(D_L = 4.0\\text{ kpc}\\) from Earth. The background source star is at \\(D_S = 8.0\\text{ kpc}\\). The lens has a transverse velocity relative to the line of sight of \\(v_\\perp = 150\\ \\mathrm{km\\,s^{-1}}\\).</p>
<p>You may assume the source and lens are point masses, the source is much brighter than the lens, and we are in the weak-field limit. Use \\(G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), \\(c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}\\), \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), \\(1\\text{ kpc} = 3.086 \\times 10^{19}\\text{ m}\\), \\(1\\text{ AU} = 1.496 \\times 10^{11}\\text{ m}\\), and \\(1\\text{ day} = 86,400\\text{ s}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Derive the physical Einstein radius \\(R_E\\) in the lens plane and calculate its numerical value in Astronomical Units (\\(\\text{AU}\\)). <em>(2.5 points)</em></li>
    <li>Define the dimensionless impact parameter \\(u(t) = b(t) / R_E\\). If the minimum impact parameter at closest approach is \\(u_0 = 0.20\\), write the expression for \\(u(t)\\) in terms of the Einstein crossing time \\(t_E = R_E / v_\\perp\\), and calculate \\(t_E\\) in days. <em>(2.5 points)</em></li>
    <li>The total flux magnification of the background star is given by Paczyński's formula:
    $$ A(u) = \\frac{u^2 + 2}{u\\sqrt{u^2 + 4}} $$
    Calculate the peak magnification \\(A_{\\max}\\) of this event. <em>(2.5 points)</em></li>
    <li>The event is considered "highly magnified" when \\(A \\ge 2.0\\). Determine the total duration \\(\\Delta t\\) (in days) during which the event remains highly magnified. <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Weak-field gravitational microlensing, physical Einstein radius, rectilinear sky-plane trajectory, and inversion of the Paczyński light-curve magnification formula.</p>

<p><strong>(a) Physical Einstein Radius \\(R_E\\) in the Lens Plane (2.5 points):</strong><br>
From the weak-field deflection angle \\(\\alpha = \\frac{4GM}{c^2 b}\\) and Euclidean small-angle lens geometry \\(\\theta_E = \\sqrt{\\frac{4GM}{c^2}\\frac{D_{LS}}{D_L D_S}}\\), the physical radius in the lens plane is \\(R_E = D_L \\theta_E\\):</p>
<p>$$ R_E = \\sqrt{\\frac{4GM}{c^2}\\frac{D_L D_{LS}}{D_S}} $$</p>
<p>With \\(D_{LS} = D_S - D_L = 8.0 - 4.0 = 4.0\\text{ kpc}\\), we first evaluate the gravitational prefactor and distance combination:</p>
<p>$$ \\frac{4GM}{c^2} = \\frac{4(6.674 \\times 10^{-11})(0.50 \\times 1.989 \\times 10^{30})}{(2.998 \\times 10^8)^2} \\approx 2953.8\\text{ m} $$</p>
<p>$$ \\frac{D_L D_{LS}}{D_S} = \\frac{(4.0\\text{ kpc})(4.0\\text{ kpc})}{8.0\\text{ kpc}} = 2.0\\text{ kpc} = 2.0 \\times 3.086 \\times 10^{19}\\text{ m} = 6.172 \\times 10^{19}\\text{ m} $$</p>
<p>Substituting into \\(R_E\\) and converting to Astronomical Units:</p>
<p>$$ R_E = \\sqrt{(2953.8\\text{ m})(6.172 \\times 10^{19}\\text{ m})} = \\sqrt{1.823 \\times 10^{23}\\ \\mathrm{m^2}} \\approx 4.270 \\times 10^{11}\\text{ m} \\approx \\mathbf{2.85\\text{ AU}} $$</p>

<p><strong>(b) Dimensionless Impact Parameter \\(u(t)\\) &amp; Einstein Crossing Time \\(t_E\\) (2.5 points):</strong><br>
Taking \\(t = 0\\) at the instant of closest approach \\(b_{\\min} = u_0 R_E\\), the Pythagorean distance along the uniform rectilinear relative trajectory \\(b(t) = \\sqrt{b_{\\min}^2 + (v_\\perp t)^2}\\) normalized by \\(R_E\\) is:</p>
<p>$$ u(t) = \\mathbf{\\sqrt{u_0^2 + \\left(\\frac{t}{t_E}\\right)^2}} $$</p>
<p>Evaluating the Einstein radius crossing time \\(t_E = R_E / v_\\perp\\) for \\(v_\\perp = 150\\ \\mathrm{km\\,s^{-1}} = 1.50 \\times 10^5\\ \\mathrm{m\\,s^{-1}}\\):</p>
<p>$$ t_E = \\frac{4.270 \\times 10^{11}\\text{ m}}{1.50 \\times 10^5\\ \\mathrm{m\\,s^{-1}}} \\approx 2.847 \\times 10^6\\text{ s} = \\frac{2.847 \\times 10^6}{86,400}\\text{ days} \\approx \\mathbf{32.9\\text{ days}} $$</p>

<p><strong>(c) Peak Magnification \\(A_{\\max}\\) (2.5 points):</strong><br>
Maximum magnification occurs at closest approach (\\(t = 0,\\ u = u_0 = 0.20\\)):</p>
<p>$$ A_{\\max} = \\frac{u_0^2 + 2}{u_0\\sqrt{u_0^2 + 4}} = \\frac{(0.20)^2 + 2}{0.20\\sqrt{(0.20)^2 + 4}} = \\frac{2.04}{0.20\\sqrt{4.04}} \\approx \\frac{2.04}{0.4020} \\approx \\mathbf{5.08} $$</p>

<p><strong>(d) Duration of High Magnification (\\(A \\ge 2.0\\)) (2.5 points):</strong><br>
Setting \\(A(u) = 2.0\\) and squaring both sides:</p>
<p>$$ \\frac{u^2 + 2}{u\\sqrt{u^2 + 4}} = 2 \\implies (u^2 + 2)^2 = 4u^2(u^2 + 4) \\implies 3u^4 + 12u^2 - 4 = 0 $$</p>
<p>Solving the quadratic in \\(x = u^2 > 0\\):</p>
<p>$$ u^2 = \\frac{-12 + \\sqrt{144 - 4(3)(-4)}}{6} = \\frac{-12 + \\sqrt{192}}{6} = 2\\left(\\frac{2}{\\sqrt{3}} - 1\\right) \\approx 0.30940 \\implies u \\approx 0.5562 $$</p>
<p>Substituting \\(u^2 = 0.30940\\) and \\(u_0^2 = 0.0400\\) into \\(u(t)^2 = u_0^2 + (t / t_E)^2\\):</p>
<p>$$ \\left(\\frac{t}{t_E}\\right)^2 = 0.30940 - 0.0400 = 0.26940 \\implies \\frac{t}{t_E} = \\pm 0.5190 $$</p>
<p>The total duration spent above \\(A = 2.0\\) is symmetric around \\(t = 0\\):</p>
<p>$$ \\Delta t = 2|t| = 2(0.5190)\\,t_E = 1.038\\,t_E \\approx 1.038 \\times 32.95\\text{ days} \\approx \\mathbf{34.2\\text{ days}} $$</p>`
    },

    // Day 22 — 09.11.2026
    {
        uniqueId: "potd_2026_11_09",
        dayNumber: 22,
        scheduledDate: "09.11.2026",
        title: "The Braking of the Crab Pulsar: Magnetic Dipoles and Nebular Power",
        author: "Matei",
        module: "T8 · Neutron Stars & Pulsar Electrodynamics",
        difficultyClass: "medium",
        difficultyText: "3.8 / 10.0",
        description: `<p>A rotation-powered radio and X-ray pulsar at the center of a young supernova remnant is modeled as a uniform sphere of mass \\(M = 1.40\\,M_\\odot\\) and radius \\(R = 10.0\\text{ km}\\). Pulse-timing observations in the year 2026 measure a rotation period of \\(P = 33.1\\text{ ms}\\) and a steady spin-down rate of \\(\\dot{P} = 4.21 \\times 10^{-13}\\ \\mathrm{s\\,s^{-1}}\\). Surrounding the pulsar is a synchrotron plerion nebula whose total bolometric luminosity is \\(L_{\\mathrm{neb}} = 1.00 \\times 10^{31}\\text{ W}\\). Use \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), \\(L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\), \\(\\mu_0 = 4\\pi \\times 10^{-7}\\ \\mathrm{N\\,A^{-2}}\\), and \\(1\\text{ yr} = 3.1558 \\times 10^7\\text{ s}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the pulsar's moment of inertia \\(I = \\frac{2}{5}MR^2\\), its current rotational kinetic energy \\(E_{\\mathrm{rot}}\\), and the theoretical minimum rotation period \\(P_{\\min}\\) before centrifugal forces at the equator exceed surface gravity. <em>(2.0 points)</em></li>
    <li>Derive the expression for the rotational spin-down power \\(L_{\\mathrm{sd}} = -\\dot{E}_{\\mathrm{rot}}\\) in terms of \\(I, P\\), and \\(\\dot{P}\\). Calculate \\(L_{\\mathrm{sd}}\\) in Watts and solar luminosities, and determine the percentage of the pulsar's spin-down power that is converted into the radiation of the surrounding nebula. <em>(2.5 points)</em></li>
    <li>Assuming the spin-down is driven entirely by vacuum magnetic dipole radiation from an orthogonal rotator (magnetic inclination \\(\\alpha = 90^\\circ\\)):
    $$ L_{\\mathrm{dip}} = \\frac{2\\pi^4 B_p^2 R^6 \\sin^2\\alpha}{3 \\mu_0 c^3 P^4} $$
    calculate the polar surface magnetic field strength \\(B_p\\) in Tesla (\\(\\text{T}\\)) and in Gauss (\\(1\\text{ T} = 10^4\\text{ G}\\)). <em>(2.5 points)</em></li>
    <li>For pure magnetic dipole braking where the angular velocity obeys \\(\\dot{\\Omega} = -k\\Omega^3\\), integrate the spin-down law from birth (period \\(P_0\\) at \\(t = 0\\)) to the present epoch \\(t\\) to show that \\(t = \\frac{P}{2\\dot{P}}\\left[1 - \\left(\\frac{P_0}{P}\\right)^2\\right]\\). Calculate the characteristic age \\(\\tau_c = \\frac{P}{2\\dot{P}}\\) in years, and given that the historical supernova was observed in \\(1054\\text{ AD}\\) (\\(t = 972\\text{ years}\\) before 2026), determine the pulsar's initial birth period \\(P_0\\) in milliseconds. <em>(3.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Neutron star rotational energetics, centrifugal break-up limit, magneto-dipole spin-down torque, and pulsar characteristic age vs. true chronological age.</p>

<p><strong>(a) Moment of Inertia, Rotational Energy &amp; Centrifugal Break-up Period (2.0 points):</strong><br>
With \\(M = 1.40 \\times 1.989 \\times 10^{30}\\text{ kg} = 2.785 \\times 10^{30}\\text{ kg}\\) and \\(R = 1.00 \\times 10^4\\text{ m}\\):</p>
<p>$$ I = \\frac{2}{5}MR^2 = 0.4(2.785 \\times 10^{30}\\text{ kg})(1.00 \\times 10^4\\text{ m})^2 \\approx \\mathbf{1.114 \\times 10^{38}\\ \\mathrm{kg\\,m^2}} $$</p>
<p>At angular frequency \\(\\Omega = \\frac{2\\pi}{P} = \\frac{2\\pi}{0.0331\\text{ s}} \\approx 189.82\\ \\mathrm{rad\\,s^{-1}}\\), the stored rotational kinetic energy is:</p>
<p>$$ E_{\\mathrm{rot}} = \\frac{1}{2}I\\Omega^2 = \\frac{2\\pi^2 I}{P^2} = \\frac{1}{2}(1.114 \\times 10^{38})(189.82)^2 \\approx \\mathbf{2.01 \\times 10^{42}\\text{ J}} $$</p>
<p>Equating equatorial centripetal acceleration to surface gravity \\(\\Omega_{\\max}^2 R = \\frac{GM}{R^2}\\) gives the minimum shedding period:</p>
<p>$$ P_{\\min} = 2\\pi\\sqrt{\\frac{R^3}{GM}} = 2\\pi\\sqrt{\\frac{(1.00 \\times 10^4)^3}{(6.674 \\times 10^{-11})(2.785 \\times 10^{30})}} \\approx 4.61 \\times 10^{-4}\\text{ s} = \\mathbf{0.461\\text{ ms}} $$</p>

<p><strong>(b) Spin-Down Luminosity &amp; Nebular Power Efficiency (2.5 points):</strong><br>
Differentiating \\(E_{\\mathrm{rot}} = \\frac{2\\pi^2 I}{P^2}\\) with respect to time yields the spin-down power:</p>
<p>$$ L_{\\mathrm{sd}} = -\\frac{dE_{\\mathrm{rot}}}{dt} = \\mathbf{\\frac{4\\pi^2 I \\dot{P}}{P^3}} $$</p>
<p>Substituting the numerical values:</p>
<p>$$ L_{\\mathrm{sd}} = \\frac{4\\pi^2(1.114 \\times 10^{38}\\ \\mathrm{kg\\,m^2})(4.21 \\times 10^{-13}\\ \\mathrm{s\\,s^{-1}})}{(0.0331\\text{ s})^3} \\approx \\mathbf{5.10 \\times 10^{31}\\text{ W}} \\approx \\mathbf{1.33 \\times 10^5\\,L_\\odot} $$</p>
<p>The fraction of spin-down power converted into nebular emission is:</p>
<p>$$ \\eta_{\\mathrm{neb}} = \\frac{L_{\\mathrm{neb}}}{L_{\\mathrm{sd}}} \\times 100\\% = \\frac{1.00 \\times 10^{31}\\text{ W}}{5.105 \\times 10^{31}\\text{ W}} \\times 100\\% \\approx \\mathbf{19.6\\%} $$</p>

<p><strong>(c) Polar Surface Magnetic Field \\(B_p\\) (2.5 points):</strong><br>
Equating \\(L_{\\mathrm{dip}} = L_{\\mathrm{sd}}\\) with \\(\\sin\\alpha = 1\\) and solving for \\(B_p\\):</p>
<p>$$ B_p = \\sqrt{\\frac{3\\mu_0 c^3 I P \\dot{P}}{2\\pi^2 R^6}} = \\sqrt{\\frac{3(4\\pi \\times 10^{-7})(2.998 \\times 10^8)^3(1.114 \\times 10^{38})(0.0331)(4.21 \\times 10^{-13})}{2\\pi^2(1.00 \\times 10^4)^6}} $$</p>
<p>$$ B_p \\approx \\mathbf{8.94 \\times 10^8\\text{ T}} = \\mathbf{8.94 \\times 10^{12}\\text{ G}} $$</p>

<p><strong>(d) Braking Integration, Characteristic Age &amp; Birth Spin Period \\(P_0\\) (3.0 points):</strong><br>
Since \\(\\Omega = 2\\pi / P\\) and \\(\\dot{\\Omega} = -\\frac{2\\pi \\dot{P}}{P^2}\\), the dipole braking law \\(\\dot{\\Omega} = -k\\Omega^3\\) becomes \\(\\frac{\\dot{P}}{P^2} = \\frac{4\\pi^2 k}{P^3} \\implies P\\,\\dot{P} = 4\\pi^2 k = \\text{const.}\\). Integrating \\(P'\\,dP' = (P\\dot{P})\\,dt'\\) from \\(t' = 0\\) (\\(P' = P_0\\)) to \\(t' = t\\) (\\(P' = P\\)):</p>
<p>$$ \\frac{1}{2}\\left(P^2 - P_0^2\\right) = P\\dot{P}\\,t \\implies t = \\frac{P}{2\\dot{P}}\\left[1 - \\left(\\frac{P_0}{P}\\right)^2\\right] $$</p>
<p>In the limit \\(P_0 \\ll P\\), the characteristic spin-down age is:</p>
<p>$$ \\tau_c = \\frac{P}{2\\dot{P}} = \\frac{0.0331\\text{ s}}{2(4.21 \\times 10^{-13}\\ \\mathrm{s\\,s^{-1}})} \\approx 3.931 \\times 10^{10}\\text{ s} \\approx \\mathbf{1246\\text{ years}} $$</p>
<p>Using the known historical age \\(t = 2026 - 1054 = 972\\text{ years}\\), we solve \\(t = \\tau_c\\left[1 - (P_0/P)^2\\right]\\) for the birth period \\(P_0\\):</p>
<p>$$ P_0 = P\\sqrt{1 - \\frac{t}{\\tau_c}} = 33.1\\text{ ms} \\times \\sqrt{1 - \\frac{972}{1245.7}} = 33.1\\text{ ms} \\times \\sqrt{0.2197} \\approx \\mathbf{15.5\\text{ ms}} $$</p>`
    },

    // Day 23 — 10.11.2026
    {
        uniqueId: "potd_2026_11_10",
        dayNumber: 23,
        scheduledDate: "10.11.2026",
        title: "The Illusion of Superluminal Quasar Jets",
        author: "Matei",
        module: "T2 & T11 · Special Relativity & Active Galactic Nuclei",
        difficultyClass: "medium",
        difficultyText: "3.9 / 10.0",
        description: `<p>Very Long Baseline Interferometry (VLBI) radio observations of a core-dominated quasar at distance \\(D = 400\\text{ Mpc}\\) reveal a bright plasma knot ejected from the central supermassive black hole. The knot travels along a straight relativistic jet at constant speed \\(v = \\beta c\\) inclined at a small angle \\(\\theta\\) toward the observer's line of sight, exhibiting an apparent proper motion on the sky of \\(\\mu_{\\mathrm{app}} = 1.265\\ \\mathrm{mas\\,yr^{-1}}\\) (milliarcseconds per year). Neglect cosmological redshift corrections to the local geometry and take \\(1\\text{ pc} = 3.0857 \\times 10^{16}\\text{ m}\\), \\(c = 2.9979 \\times 10^8\\ \\mathrm{m\\,s^{-1}}\\), and \\(1\\text{ yr} = 3.1558 \\times 10^7\\text{ s}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>By considering two radio wavefronts emitted by the knot separated by an intrinsic time interval \\(\\Delta t_{\\mathrm{em}}\\) and accounting for the reduced light-travel time as the knot approaches the observer, derive the formula for the dimensionless apparent transverse speed:
    $$ \\beta_{\\mathrm{app}} \\equiv \\frac{v_{\\mathrm{app}}}{c} = \\frac{\\beta\\sin\\theta}{1 - \\beta\\cos\\theta} $$
    and calculate the numerical value of \\(\\beta_{\\mathrm{app}}\\) for this quasar. <em>(3.0 points)</em></li>
    <li>By maximizing \\(\\beta_{\\mathrm{app}}(\\theta)\\) with respect to \\(\\theta\\) at fixed \\(\\beta\\), show that the maximum apparent speed occurs at \\(\\cos\\theta_{\\mathrm{opt}} = \\beta\\) and equals \\(\\beta_{\\mathrm{app,\\max}} = \\beta\\gamma\\) (where \\(\\gamma = (1-\\beta^2)^{-1/2}\\)). Hence determine the minimum intrinsic Lorentz factor \\(\\gamma_{\\min}\\), the minimum speed \\(\\beta_{\\min}\\), and the optimal viewing angle \\(\\theta_{\\mathrm{opt}}\\) required to produce the observed \\(\\beta_{\\mathrm{app}}\\). <em>(2.5 points)</em></li>
    <li>Independent X-ray inverse-Compton constraints show that the true bulk Lorentz factor of the knot is \\(\\gamma = 10.0\\). Calculate the two viewing angles \\(\\theta_1 < \\theta_2\\) consistent with the observed \\(\\beta_{\\mathrm{app}}\\). <em>(2.5 points)</em></li>
    <li>Assuming the jet is oriented at the narrower angle \\(\\theta_1\\), calculate the relativistic Doppler boosting factor \\(\\delta_D = \\frac{1}{\\gamma(1 - \\beta\\cos\\theta_1)}\\) and the apparent flux-density ratio \\(\\frac{F_{\\mathrm{jet}}}{F_{\\mathrm{counter}}} = \\left(\\frac{1 + \\beta\\cos\\theta_1}{1 - \\beta\\cos\\theta_1}\\right)^{3+\\alpha}\\) between the approaching knot and an identical twin knot ejected along the receding counter-jet (with optically thin synchrotron spectral index \\(\\alpha = 0.70\\)). <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Kinematic light-travel time illusion in relativistic AGN jets, Lorentz factor optimization, and Doppler beaming asymmetry.</p>

<p><strong>(a) Derivation &amp; Calculation of Apparent Transverse Speed \\(\\beta_{\\mathrm{app}}\\) (3.0 points):</strong><br>
In a time interval \\(\\Delta t_{\\mathrm{em}}\\), the knot advances a distance \\(v\\,\\Delta t_{\\mathrm{em}}\\), which has component \\(\\Delta x_\\perp = v\\sin\\theta\\,\\Delta t_{\\mathrm{em}}\\) perpendicular to the line of sight and component \\(\\Delta x_\\parallel = v\\cos\\theta\\,\\Delta t_{\\mathrm{em}}\\) toward the observer. Because the second signal has a shorter propagation path by \\(\\Delta x_\\parallel\\), the arrival time interval measured at Earth is:</p>
<p>$$ \\Delta t_{\\mathrm{obs}} = \\Delta t_{\\mathrm{em}} - \\frac{v\\cos\\theta\\,\\Delta t_{\\mathrm{em}}}{c} = \\Delta t_{\\mathrm{em}}(1 - \\beta\\cos\\theta) $$</p>
<p>Dividing the transverse displacement by \\(c\\,\\Delta t_{\\mathrm{obs}}\\) yields the dimensionless apparent speed:</p>
<p>$$ \\beta_{\\mathrm{app}} = \\frac{\\Delta x_\\perp}{c\\,\\Delta t_{\\mathrm{obs}}} = \\mathbf{\\frac{\\beta\\sin\\theta}{1 - \\beta\\cos\\theta}} $$</p>
<p>With \\(\\mu_{\\mathrm{app}} = 1.265 \\times 10^{-3}\\ \\mathrm{arcsec\\,yr^{-1}} = 6.133 \\times 10^{-9}\\ \\mathrm{rad\\,yr^{-1}}\\) at \\(D = 400\\text{ Mpc} = 1.2343 \\times 10^{25}\\text{ m}\\), the apparent transverse speed is:</p>
<p>$$ v_{\\mathrm{app}} = \\mu_{\\mathrm{app}} D = \\frac{(6.133 \\times 10^{-9}\\text{ rad})(1.2343 \\times 10^{25}\\text{ m})}{3.1558 \\times 10^7\\text{ s}} \\approx 2.398 \\times 10^9\\ \\mathrm{m\\,s^{-1}} \\implies \\beta_{\\mathrm{app}} = \\frac{v_{\\mathrm{app}}}{c} = \\mathbf{8.00} $$</p>

<p><strong>(b) Minimum Lorentz Factor \\(\\gamma_{\\min}\\) &amp; Optimal Viewing Angle \\(\\theta_{\\mathrm{opt}}\\) (2.5 points):</strong><br>
Setting \\(\\frac{d\\beta_{\\mathrm{app}}}{d\\theta} = \\frac{\\beta(\\cos\\theta - \\beta)}{(1 - \\beta\\cos\\theta)^2} = 0\\) gives \\(\\cos\\theta_{\\mathrm{opt}} = \\beta\\) and \\(\\sin\\theta_{\\mathrm{opt}} = \\sqrt{1 - \\beta^2} = \\frac{1}{\\gamma}\\). Substituting back into \\(\\beta_{\\mathrm{app}}\\):</p>
<p>$$ \\beta_{\\mathrm{app,\\max}} = \\frac{\\beta / \\gamma}{1 - \\beta^2} = \\beta\\gamma = \\sqrt{\\gamma^2 - 1} \\implies \\gamma_{\\min} = \\sqrt{1 + \\beta_{\\mathrm{app}}^2} $$</p>
<p>For \\(\\beta_{\\mathrm{app}} = 8.00\\):</p>
<p>$$ \\gamma_{\\min} = \\sqrt{1 + 8.00^2} = \\sqrt{65} \\approx \\mathbf{8.062}, \\qquad \\beta_{\\min} = \\frac{8.00}{\\sqrt{65}} \\approx \\mathbf{0.9923}, \\qquad \\theta_{\\mathrm{opt}} = \\arctan\\!\\left(\\frac{1}{8.00}\\right) \\approx \\mathbf{7.125^\\circ} $$</p>

<p><strong>(c) Viewing Angles \\(\\theta_1, \\theta_2\\) for \\(\\gamma = 10.0\\) (2.5 points):</strong><br>
For \\(\\gamma = 10.0\\), the intrinsic velocity is \\(\\beta = \\sqrt{1 - \\gamma^{-2}} = \\sqrt{0.99} \\approx 0.994987\\). Substituting the half-angle tangent \\(t = \\tan(\\theta/2)\\) into \\(\\beta\\sin\\theta = 8.00(1 - \\beta\\cos\\theta)\\) gives the quadratic equation:</p>
<p>$$ 8.00(1 + \\beta)t^2 - 2\\beta t + 8.00(1 - \\beta) = 0 \\implies 15.9599\\,t^2 - 1.98997\\,t + 0.0401005 = 0 $$</p>
<p>Solving for \\(t\\) yields \\(t_1 = 0.025274\\) and \\(t_2 = 0.099411\\), corresponding to the two viewing angles:</p>
<p>$$ \\theta_1 = 2\\arctan(0.025274) \\approx \\mathbf{2.90^\\circ}, \\qquad \\theta_2 = 2\\arctan(0.099411) \\approx \\mathbf{11.35^\\circ} $$</p>

<p><strong>(d) Doppler Boosting Factor &amp; Jet-to-Counter-Jet Flux Ratio (2.0 points):</strong><br>
At \\(\\theta_1 = 2.896^\\circ\\), \\(\\beta\\cos\\theta_1 = 0.994987\\cos(2.896^\\circ) \\approx 0.993716\\), so \\(1 - \\beta\\cos\\theta_1 = 0.006284\\):</p>
<p>$$ \\delta_D = \\frac{1}{\\gamma(1 - \\beta\\cos\\theta_1)} = \\frac{1}{10.0(0.006284)} \\approx \\mathbf{15.9} $$</p>
<p>With \\(3 + \\alpha = 3.70\\), the flux ratio between the approaching knot and the receding counter-knot (\\(\\theta_{\\mathrm{counter}} = 180^\\circ - \\theta_1\\)) is:</p>
<p>$$ \\frac{F_{\\mathrm{jet}}}{F_{\\mathrm{counter}}} = \\left(\\frac{1 + 0.993716}{0.006284}\\right)^{3.70} = (317.3)^{3.70} \\approx \\mathbf{1.83 \\times 10^9} $$</p>
<p>This extreme relativistic beaming explains why relativistic quasar jets almost always appear one-sided on VLBI maps.</p>`
    },

    // Day 24 — 11.11.2026
    {
        uniqueId: "potd_2026_11_11",
        dayNumber: 24,
        scheduledDate: "11.11.2026",
        title: "Poynting–Robertson Drag and Radiation Blowout of Zodiacal Dust",
        author: "Matei",
        module: "T9 & T2 · Solar System Dynamics & Radiation Forces",
        difficultyClass: "medium",
        difficultyText: "4.1 / 10.0",
        description: `<p>Spherical silicate dust grains of material density \\(\\rho_s = 3000\\ \\mathrm{kg\\,m^{-3}}\\) and bond albedo \\(A = 0\\) (perfectly absorbing blackbodies) are released from collisions between main-belt asteroids orbiting a solar-type star of mass \\(M_\\star = 1.00\\,M_\\odot\\) and luminosity \\(L_\\star = 1.00\\,L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\). Use \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), \\(1\\text{ AU} = 1.496 \\times 10^{11}\\text{ m}\\), and \\(\\sigma_{\\mathrm{SB}} = 5.670 \\times 10^{-8}\\ \\mathrm{W\\,m^{-2}\\,K^{-4}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Derive the dimensionless ratio \\(\\beta \\equiv \\frac{F_{\\mathrm{rad}}}{F_{\\mathrm{grav}}}\\) of outward radial radiation-pressure force to inward stellar gravity for a spherical grain of radius \\(s\\). If a parent asteroid moves on a circular orbit of radius \\(r_0\\), show that newly released daughter grains with \\(\\beta \\ge 0.50\\) are immediately blown out of the system on unbound orbits, and calculate the critical blowout radius \\(s_{\\mathrm{blow}}\\) in micrometers (\\(\\mu\\text{m}\\)). <em>(2.5 points)</em></li>
    <li>A larger grain of radius \\(s = 25.0\\ \\mu\\text{m}\\) remains bound on a quasi-circular orbit of radius \\(r\\) and orbital speed \\(v = \\sqrt{G M_\\star / r}\\). Because of stellar aberration at angle \\(\\alpha \\simeq v/c\\), the absorbed and isotropically re-emitted stellar radiation exerts an azimuthal Poynting–Robertson drag force \\(F_{\\mathrm{PR}} = -F_{\\mathrm{rad}}\\frac{v}{c}\\). Equating the torque \\(r F_{\\mathrm{PR}}\\) to the rate of change of orbital angular momentum \\(\\frac{d}{dt}\\left(m\\sqrt{G M_\\star r}\\right)\\), prove that the orbital radius decays at rate:
    $$ \\frac{dr}{dt} = -\\frac{2 G M_\\star \\beta}{c r} $$ <em>(3.0 points)</em></li>
    <li>Calculate the dimensionless parameter \\(\\beta\\) for the \\(s = 25.0\\ \\mu\\text{m}\\) grain, and integrate \\(\\frac{dr}{dt}\\) to determine its Poynting–Robertson inspiral lifetime \\(t_{\\mathrm{PR}}\\) (in years) from the main asteroid belt at \\(r_0 = 2.50\\text{ AU}\\) down to the silicate sublimation zone at \\(r_{\\mathrm{sub}} = 0.050\\text{ AU}\\). <em>(2.5 points)</em></li>
    <li>Calculate the grain's radiative equilibrium temperature \\(T_{\\mathrm{sub}}\\) at \\(r_{\\mathrm{sub}} = 0.050\\text{ AU}\\), and integrate \\(dN_{\\mathrm{rev}} = \\frac{\\Omega}{2\\pi}\\,dt\\) to find the total number of heliocentric revolutions completed by the grain during its inward spiral from \\(r_0\\) to \\(r_{\\mathrm{sub}}\\). <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Radiation pressure blowout limit (\\(\\beta = 1/2\\)), relativistic Poynting–Robertson angular momentum drain, and secular dust inspiral.</p>

<p><strong>(a) Radiation-to-Gravity Ratio \\(\\beta\\) &amp; Blowout Radius \\(s_{\\mathrm{blow}}\\) (2.5 points):</strong><br>
A perfectly absorbing spherical grain of radius \\(s\\), cross-section \\(\\pi s^2\\), and mass \\(m = \\frac{4}{3}\\pi s^3 \\rho_s\\) at distance \\(r\\) experiences outward radiation force \\(F_{\\mathrm{rad}} = \\frac{L_\\star}{4\\pi r^2 c}\\pi s^2\\) and inward gravitational force \\(F_{\\mathrm{grav}} = \\frac{G M_\\star m}{r^2}\\). Their ratio is independent of distance \\(r\\):</p>
<p>$$ \\beta \\equiv \\frac{F_{\\mathrm{rad}}}{F_{\\mathrm{grav}}} = \\mathbf{\\frac{3 L_\\star}{16\\pi c G M_\\star \\rho_s s}} $$</p>
<p>When released at rest relative to a parent body on a circular orbit of speed \\(v_0 = \\sqrt{G M_\\star / r_0}\\), the grain moves in an effective central gravitational field \\(G_{\\mathrm{eff}} = (1 - \\beta)G\\). Its specific mechanical energy is:</p>
<p>$$ \\epsilon = \\frac{1}{2}v_0^2 - \\frac{(1 - \\beta)G M_\\star}{r_0} = \\frac{G M_\\star}{r_0}\\left(\\beta - \\frac{1}{2}\\right) $$</p>
<p>For \\(\\beta \\ge 0.50\\), \\(\\epsilon \\ge 0\\) and the grain escapes on a parabolic or hyperbolic trajectory. Setting \\(\\beta = 0.50\\) gives the blowout radius:</p>
<p>$$ s_{\\mathrm{blow}} = \\frac{3 L_\\star}{8\\pi c G M_\\star \\rho_s} = \\frac{3(3.828 \\times 10^{26})}{(8\\pi)(2.998 \\times 10^8)(6.674 \\times 10^{-11})(1.989 \\times 10^{30})(3000)} \\approx 3.83 \\times 10^{-7}\\text{ m} = \\mathbf{0.383\\ \\mu\\text{m}} $$</p>

<p><strong>(b) Derivation of the Poynting–Robertson Radial Decay Rate (3.0 points):</strong><br>
For a quasi-circular orbit (\\(\\beta \\ll 1\\)), the specific orbital angular momentum is \\(h = \\sqrt{G M_\\star r}\\), with time derivative \\(\\frac{dh}{dt} = \\frac{1}{2}\\sqrt{\\frac{G M_\\star}{r}}\\frac{dr}{dt} = \\frac{1}{2}v\\frac{dr}{dt}\\). The specific torque exerted by the retarding drag acceleration \\(a_{\\mathrm{PR}} = -\\frac{F_{\\mathrm{rad}}}{m}\\frac{v}{c} = -\\beta\\frac{G M_\\star}{r^2}\\frac{v}{c}\\) is:</p>
<p>$$ \\frac{dh}{dt} = r\\,a_{\\mathrm{PR}} = -\\beta\\frac{G M_\\star}{r}\\frac{v}{c} $$</p>
<p>Equating the two expressions for \\(\\frac{dh}{dt}\\) and cancelling \\(v\\) yields:</p>
<p>$$ \\frac{1}{2}v\\frac{dr}{dt} = -\\beta\\frac{G M_\\star}{r}\\frac{v}{c} \\implies \\mathbf{\\frac{dr}{dt} = -\\frac{2 G M_\\star \\beta}{c r}} $$</p>

<p><strong>(c) Parameter \\(\\beta\\) &amp; Inspiral Lifetime \\(t_{\\mathrm{PR}}\\) for \\(s = 25.0\\ \\mu\\text{m}\\) (2.5 points):</strong><br>
Scaling from \\(\\beta(s_{\\mathrm{blow}}) = 0.50\\):</p>
<p>$$ \\beta = 0.50 \\times \\frac{s_{\\mathrm{blow}}}{s} = 0.50 \\times \\frac{0.3825\\ \\mu\\text{m}}{25.0\\ \\mu\\text{m}} \\approx \\mathbf{7.65 \\times 10^{-3}} $$</p>
<p>Separating variables \\(r\\,dr = -\\frac{2 G M_\\star \\beta}{c}\\,dt\\) and integrating from \\(r_0 = 2.50\\text{ AU}\\) to \\(r_{\\mathrm{sub}} = 0.050\\text{ AU}\\):</p>
<p>$$ t_{\\mathrm{PR}} = \\frac{c\\left(r_0^2 - r_{\\mathrm{sub}}^2\\right)}{4 G M_\\star \\beta} = \\frac{(2.998 \\times 10^8)\\big[(2.50^2 - 0.050^2)(1.496 \\times 10^{11})^2\\big]}{4(1.3271 \\times 10^{20})(7.651 \\times 10^{-3})} \\approx 1.032 \\times 10^{13}\\text{ s} \\approx \\mathbf{3.27 \\times 10^5\\text{ years}} $$</p>

<p><strong>(d) Sublimation Temperature &amp; Total Number of Revolutions (2.0 points):</strong><br>
Balancing absorbed solar flux \\(\\pi s^2 \\frac{L_\\star}{4\\pi r_{\\mathrm{sub}}^2}\\) against thermal emission \\(4\\pi s^2 \\sigma_{\\mathrm{SB}} T_{\\mathrm{sub}}^4\\) at \\(r_{\\mathrm{sub}} = 0.050\\text{ AU} = 7.480 \\times 10^9\\text{ m}\\):</p>
<p>$$ T_{\\mathrm{sub}} = \\left(\\frac{L_\\star}{16\\pi \\sigma_{\\mathrm{SB}} r_{\\mathrm{sub}}^2}\\right)^{1/4} \\approx \\mathbf{1245\\text{ K}} $$</p>
<p>Using \\(\\Omega = \\sqrt{G M_\\star / r^3}\\) and \\(dt = -\\frac{c r}{2 G M_\\star \\beta}\\,dr\\), the number of orbits completed during the inspiral is:</p>
<p>$$ N_{\\mathrm{rev}} = \\int_{r_{\\mathrm{sub}}}^{r_0} \\frac{\\Omega}{2\\pi}\\frac{c r}{2 G M_\\star \\beta}\\,dr = \\frac{c}{4\\pi \\beta \\sqrt{G M_\\star}}\\int_{r_{\\mathrm{sub}}}^{r_0} r^{-1/2}\\,dr = \\frac{c\\left(\\sqrt{r_0} - \\sqrt{r_{\\mathrm{sub}}}\\right)}{2\\pi \\beta \\sqrt{G M_\\star}} \\approx \\mathbf{2.84 \\times 10^5\\text{ revolutions}} $$</p>`
    },

    // Day 25 — 12.11.2026
    {
        uniqueId: "potd_2026_11_12",
        dayNumber: 25,
        scheduledDate: "12.11.2026",
        title: "Algol's Paradox: Conservative Mass Transfer in a Semidetached Binary",
        author: "Matei",
        module: "T4 & T7 · Interacting Binaries & Stellar Evolution",
        difficultyClass: "medium",
        difficultyText: "3.7 / 10.0",
        description: `<p>In an eclipsing Algol-type semidetached binary moving on a circular orbit, an evolved subgiant donor star of mass \\(M_1 = 0.80\\,M_\\odot\\) fills its Roche lobe and transfers mass conservatively onto a main-sequence companion of mass \\(M_2 = 3.20\\,M_\\odot\\). The current orbital period is \\(P_0 = 2.50\\text{ days}\\), and the donor loses mass at a steady rate of \\(\\dot{M}_1 = -4.00 \\times 10^{-7}\\,M_\\odot\\,\\mathrm{yr^{-1}}\\) (with \\(\\dot{M}_2 = -\\dot{M}_1\\)). Neglect stellar spin angular momentum and any mass or angular momentum loss from the binary system. Use \\(1\\text{ AU} = 215.0\\,R_\\odot\\) and \\(1\\text{ yr} = 365.25\\text{ days}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the current orbital separation \\(a_0\\) in Astronomical Units (\\(\\text{AU}\\)) and solar radii (\\(R_\\odot\\)), and use Paczyński's Roche-lobe formula \\(R_{L,1} \\simeq 0.462\\,a_0\\left(\\frac{M_1}{M_1 + M_2}\\right)^{1/3}\\) to find the radius \\(R_1\\) of the subgiant donor star in solar radii. <em>(2.0 points)</em></li>
    <li>Starting from the total orbital angular momentum of a circular binary \\(J = M_1 M_2 \\sqrt{\\frac{G a}{M_1 + M_2}}\\), apply conservation of total mass (\\(M_1 + M_2 = M_{\\mathrm{tot}} = \\text{const.}\\)) and angular momentum (\\(\\dot{J} = 0\\)) to prove that:
    $$ \\frac{\\dot{a}}{a} = -2\\left(1 - \\frac{M_1}{M_2}\\right)\\frac{\\dot{M}_1}{M_1}, \\qquad \\frac{\\dot{P}}{P} = -3\\left(1 - \\frac{M_1}{M_2}\\right)\\frac{\\dot{M}_1}{M_1} $$
    State whether the binary orbit is currently widening or shrinking. <em>(3.0 points)</em></li>
    <li>Calculate the current rate of change of the orbital period \\(\\dot{P}\\) in seconds per year (\\(\\mathrm{s\\,yr^{-1}}\\)), and determine the cumulative eclipse arrival-time shift \\(\\Delta t_{\\mathrm{OC}} = \\frac{1}{2}\\left(\\frac{\\dot{P}}{P}\\right)T^2\\) (in minutes) accumulated over \\(T = 30.0\\text{ years}\\) of timing observations. <em>(2.5 points)</em></li>
    <li>Earlier in the mass-transfer phase, the binary passed through the point of equal stellar masses (\\(M_{1,\\mathrm{eq}} = M_{2,\\mathrm{eq}} = 2.00\\,M_\\odot\\)). Calculate the minimum orbital separation \\(a_{\\min}\\) (in \\(R_\\odot\\)) and minimum orbital period \\(P_{\\min}\\) (in days) that the binary had at that epoch. <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Conservative Roche-lobe overflow, orbital angular momentum evolution, O–C eclipse timing parabolas, and minimum orbital separation at mass-ratio inversion.</p>

<p><strong>(a) Current Orbital Separation \\(a_0\\) &amp; Donor Radius \\(R_1\\) (2.0 points):</strong><br>
With total mass \\(M_{\\mathrm{tot}} = M_1 + M_2 = 4.00\\,M_\\odot\\) and \\(P_0 = \frac{2.50}{365.25}\\text{ yr} = 6.8446 \\times 10^{-3}\\text{ yr}\\), Kepler's Third Law yields:</p>
<p>$$ a_0 = \\left(M_{\\mathrm{tot}} P_0^2\\right)^{1/3} = \\left[4.00 \\times (6.8446 \\times 10^{-3})^2\\right]^{1/3}\\text{ AU} \\approx \\mathbf{0.0572\\text{ AU}} \\approx \\mathbf{12.31\\,R_\\odot} $$</p>
<p>Since the subgiant fills its Roche lobe (\\(R_1 = R_{L,1}\\)), Paczyński's approximation gives:</p>
<p>$$ R_1 = 0.462\\,a_0\\left(\\frac{0.80}{4.00}\\right)^{1/3} = 0.462(12.31\\,R_\\odot)(0.20)^{1/3} \\approx \\mathbf{3.33\\,R_\\odot} $$</p>

<p><strong>(b) Derivation of \\(\\dot{a}/a\\) and \\(\\dot{P}/P\\) (3.0 points):</strong><br>
Taking the logarithmic time derivative of \\(J^2 = G M_{\\mathrm{tot}}^{-1} M_1^2 M_2^2 a = \\text{const.}\\) at constant \\(M_{\\mathrm{tot}}\\) gives:</p>
<p>$$ 2\\frac{\\dot{M}_1}{M_1} + 2\\frac{\\dot{M}_2}{M_2} + \\frac{\\dot{a}}{a} = 0 $$</p>
<p>Substituting conservative mass transfer \\(\\dot{M}_2 = -\\dot{M}_1\\):</p>
<p>$$ \\frac{\\dot{a}}{a} = -2\\left(\\frac{1}{M_1} - \\frac{1}{M_2}\\right)\\dot{M}_1 = \\mathbf{-2\\left(1 - \\frac{M_1}{M_2}\\right)\\frac{\\dot{M}_1}{M_1}} $$</p>
<p>By Kepler's Third Law (\\(P \\propto a^{3/2}\\)), \\(\\frac{\\dot{P}}{P} = \\frac{3}{2}\\frac{\\dot{a}}{a}\\), which immediately gives:</p>
<p>$$ \\frac{\\dot{P}}{P} = \\mathbf{-3\\left(1 - \\frac{M_1}{M_2}\\right)\\frac{\\dot{M}_1}{M_1}} $$</p>
<p>Because mass flows from the less massive donor to the more massive accretor (\\(M_1 < M_2\\) and \\(\\dot{M}_1 < 0\\)), both \\(\\dot{a} > 0\\) and \\(\\dot{P} > 0\\): the binary orbit is <strong>widening</strong>.</p>

<p><strong>(c) Period Derivative \\(\\dot{P}\\) &amp; 30-Year Eclipse Timing Drift (2.5 points):</strong><br>
Evaluating \\(\\frac{\\dot{P}}{P}\\) for \\(M_1 = 0.80\\,M_\\odot\\), \\(M_2 = 3.20\\,M_\\odot\\), and \\(\\dot{M}_1 = -4.00 \\times 10^{-7}\\,M_\\odot\\,\\mathrm{yr^{-1}}\\):</p>
<p>$$ \\frac{\\dot{P}}{P} = -3\\left(1 - \\frac{0.80}{3.20}\\right)\\left(\\frac{-4.00 \\times 10^{-7}}{0.80}\\right)\\ \\mathrm{yr^{-1}} = +1.125 \\times 10^{-6}\\ \\mathrm{yr^{-1}} $$</p>
<p>Multiplying by \\(P_0 = 2.50 \\times 86,400\\text{ s} = 2.160 \\times 10^5\\text{ s}\\):</p>
<p>$$ \\dot{P} = (1.125 \\times 10^{-6}\\ \\mathrm{yr^{-1}})(2.160 \\times 10^5\\text{ s}) = \\mathbf{+0.243\\ \\mathrm{s\\,yr^{-1}}} $$</p>
<p>Over a baseline of \\(T = 30.0\\text{ years}\\), the quadratic O\\(-\\)C eclipse arrival delay is:</p>
<p>$$ \\Delta t_{\\mathrm{OC}} = \\frac{1}{2}\\left(\\frac{\\dot{P}}{P}\\right)T^2 = \\frac{1}{2}(1.125 \\times 10^{-6}\\ \\mathrm{yr^{-1}})(30.0\\text{ yr})(30.0 \\times 365.25 \\times 86,400\\text{ s}) \\approx 1598\\text{ s} \\approx \\mathbf{26.6\\text{ minutes}} $$</p>

<p><strong>(d) Minimum Separation &amp; Period at Mass Equality (2.5 points):</strong><br>
Since \\(J = \\text{const.}\\) implies \\(a \\propto (M_1 M_2)^{-2}\\) and \\(P \\propto a^{3/2} \\propto (M_1 M_2)^{-3}\\), at \\(M_{1,\\mathrm{eq}} = M_{2,\\mathrm{eq}} = 2.00\\,M_\\odot\\):</p>
<p>$$ a_{\\min} = a_0\\left(\\frac{M_1 M_2}{M_{1,\\mathrm{eq}} M_{2,\\mathrm{eq}}}\\right)^2 = 12.31\\,R_\\odot \\times \\left(\\frac{0.80 \\times 3.20}{2.00 \\times 2.00}\\right)^2 = 12.31\\,R_\\odot \\times (0.64)^2 \\approx \\mathbf{5.04\\,R_\\odot} $$</p>
<p>$$ P_{\\min} = P_0\\left(\\frac{M_1 M_2}{M_{1,\\mathrm{eq}} M_{2,\\mathrm{eq}}}\\right)^3 = 2.50\\text{ d} \\times (0.64)^3 = 2.50\\text{ d} \\times 0.262144 \\approx \\mathbf{0.655\\text{ days}} \\ (15.73\\text{ hours}) $$</p>`
    },

    // Day 26 — 13.11.2026
    {
        uniqueId: "potd_2026_11_13",
        dayNumber: 26,
        scheduledDate: "13.11.2026",
        title: "Sunyaev–Zel'dovich Shadow and X-Ray Hydrostatic Mass of a Galaxy Cluster",
        author: "Matei",
        module: "T11 & T12 · Extragalactic Astrophysics & Galaxy Clusters",
        difficultyClass: "medium",
        difficultyText: "4.3 / 10.0",
        description: `<p>A relaxed, spherically symmetric galaxy cluster at angular diameter distance \\(D_A\\) is filled with hot, isothermal intracluster plasma of electron temperature \\(k_B T_e = 8.50\\text{ keV}\\). X-ray surface-brightness imaging shows that the electron number density follows a standard \\(\\beta\\)-profile with \\(\\beta = \\frac{2}{3}\\):</p>
<p>$$ n_e(r) = n_{e,0}\\left(1 + \\frac{r^2}{r_c^2}\\right)^{-3\\beta/2} = \\frac{n_{e,0}}{1 + r^2 / r_c^2} $$</p>
<p>where the central electron density is \\(n_{e,0} = 6.00 \\times 10^{-3}\\ \\mathrm{cm^{-3}}\\) and the angular core radius on the sky is \\(\\theta_c = 1.20'\\). Millimeter-wave observations of the Cosmic Microwave Background (\\(T_{\\mathrm{CMB}} = 2.725\\text{ K}\\)) through the cluster center measure a thermal Sunyaev–Zel'dovich (SZ) Comptonization parameter of \\(y_0 = 2.34 \\times 10^{-4}\\). Use \\(m_e c^2 = 511.0\\text{ keV}\\), \\(\\sigma_T = 6.652 \\times 10^{-25}\\ \\mathrm{cm^2}\\), \\(m_p = 1.673 \\times 10^{-27}\\text{ kg}\\), \\(1\\text{ keV} = 1.6022 \\times 10^{-16}\\text{ J}\\), and \\(1\\text{ pc} = 3.0857 \\times 10^{18}\\text{ cm}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>By integrating \\(n_e(r)\\) along the line of sight \\(l \\in (-\\infty, +\\infty)\\) through the cluster center, show that the central electron column density is \\(N_{e,0} = \\pi n_{e,0} r_c\\) (given \\(\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2} = \\pi\\)). Using the definition \\(y_0 = \\left(\\frac{k_B T_e}{m_e c^2}\\right)\\sigma_T N_{e,0}\\), determine the physical core radius \\(r_c\\) (in \\(\\text{kpc}\\)) and the cluster's angular diameter distance \\(D_A\\) (in \\(\\text{Mpc}\\)). <em>(3.0 points)</em></li>
    <li>In the low-frequency Rayleigh–Jeans regime of the CMB (\\(h\\nu \\ll k_B T_{\\mathrm{CMB}}\\)), inverse-Compton scattering of CMB photons by hot intracluster electrons produces a temperature decrement \\(\\frac{\\Delta T_{\\mathrm{CMB}}}{T_{\\mathrm{CMB}}} = -2y_0\\). Calculate \\(\\Delta T_{\\mathrm{CMB}}\\) in microkelvin (\\(\\mu\\text{K}\\)). <em>(1.5 points)</em></li>
    <li>Assuming the intracluster plasma has mean molecular weight \\(\\mu = 0.60\\) and is in spherical hydrostatic equilibrium \\(\\frac{1}{\\rho_{\\mathrm{gas}}}\\frac{dP_{\\mathrm{gas}}}{dr} = -\\frac{G M_{\\mathrm{tot}}(r)}{r^2}\\) at uniform temperature \\(T_e\\), derive the formula for the total enclosed gravitating mass \\(M_{\\mathrm{tot}}(r)\\) in terms of \\(r, r_c, T_e\\), and \\(\\mu\\). <em>(3.0 points)</em></li>
    <li>Calculate the total gravitating mass \\(M_{\\mathrm{tot}}(5r_c)\\) enclosed within radius \\(R = 5r_c\\) (in solar masses \\(M_\\odot\\)). Using \\(\\rho_{\\mathrm{gas}}(r) = 1.17\\,m_p n_e(r)\\) and \\(\\int_0^5 \\frac{x^2\\,dx}{1+x^2} = 5 - \\arctan 5 \\approx 3.627\\), calculate the enclosed gas mass \\(M_{\\mathrm{gas}}(5r_c)\\) and the cluster's baryon gas fraction \\(f_{\\mathrm{gas}} = \\frac{M_{\\mathrm{gas}}(5r_c)}{M_{\\mathrm{tot}}(5r_c)}\\). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Sunyaev–Zel'dovich CMB Comptonization, redshift-independent X-ray/SZ distance scale, hydrostatic cluster mass profile, and cosmic baryon fraction.</p>

<p><strong>(a) Central Column Density, Physical Core Radius \\(r_c\\) &amp; Distance \\(D_A\\) (3.0 points):</strong><br>
Along the central line of sight (impact parameter \\(b = 0\\)), \\(r = |l|\\). Substituting \\(l = r_c x\\) gives the column density:</p>
<p>$$ N_{e,0} = \\int_{-\\infty}^{+\\infty} \\frac{n_{e,0}\\,dl}{1 + (l/r_c)^2} = n_{e,0} r_c \\int_{-\\infty}^{+\\infty} \\frac{dx}{1 + x^2} = \\pi n_{e,0} r_c $$</p>
<p>Substituting \\(N_{e,0} = \\pi n_{e,0} r_c\\) into the Compton-\\(y\\) parameter formula and solving for \\(r_c\\):</p>
<p>$$ r_c = \\frac{y_0}{\\pi n_{e,0} \\sigma_T (k_B T_e / m_e c^2)} = \\frac{2.34 \\times 10^{-4}}{\\pi(6.00 \\times 10^{-3}\\ \\mathrm{cm^{-3}})(6.652 \\times 10^{-25}\\ \\mathrm{cm^2})(8.50 / 511.0)} $$</p>
<p>$$ r_c \\approx 1.123 \\times 10^{24}\\text{ cm} \\approx \\mathbf{363.8\\text{ kpc}} $$</p>
<p>With angular core radius \\(\\theta_c = 1.20' = 72'' = 3.491 \\times 10^{-4}\\text{ rad}\\), the angular diameter distance is:</p>
<p>$$ D_A = \\frac{r_c}{\\theta_c} = \\frac{0.3638\\text{ Mpc}}{3.491 \\times 10^{-4}\\text{ rad}} \\approx \\mathbf{1042\\text{ Mpc}} \\ (1.042\\text{ Gpc}) $$</p>

<p><strong>(b) Rayleigh–Jeans CMB Temperature Decrement (1.5 points):</strong></p>
<p>$$ \\Delta T_{\\mathrm{CMB}} = -2 y_0 T_{\\mathrm{CMB}} = -2(2.34 \\times 10^{-4})(2.725\\text{ K}) \\approx -1.275 \\times 10^{-3}\\text{ K} = \\mathbf{-1275\\ \\mu\\text{K}} \\ (-1.28\\text{ mK}) $$</p>

<p><strong>(c) Hydrostatic Total Gravitating Mass Profile \\(M_{\\mathrm{tot}}(r)\\) (3.0 points):</strong><br>
For an isothermal ideal gas \\(P_{\\mathrm{gas}}(r) = \\frac{\\rho_{\\mathrm{gas}}(r) k_B T_e}{\\mu m_p}\\), where \\(\\rho_{\\mathrm{gas}}(r) \\propto n_e(r) = n_{e,0}(1 + r^2/r_c^2)^{-1}\\), the logarithmic pressure gradient is:</p>
<p>$$ \\frac{1}{\\rho_{\\mathrm{gas}}}\\frac{dP_{\\mathrm{gas}}}{dr} = \\frac{k_B T_e}{\\mu m_p}\\frac{d\\ln n_e}{dr} = -\\frac{k_B T_e}{\\mu m_p}\\left(\\frac{2r}{r_c^2 + r^2}\\right) $$</p>
<p>Equating this to \\(-\\frac{G M_{\\mathrm{tot}}(r)}{r^2}\\) yields the total enclosed mass profile:</p>
<p>$$ M_{\\mathrm{tot}}(r) = \\mathbf{\\frac{2 k_B T_e}{G \\mu m_p}\\frac{r^3}{r_c^2 + r^2}} \\qquad \\left(\\text{or } \\frac{3\\beta k_B T_e}{G \\mu m_p}\\frac{r^3}{r_c^2 + r^2}\\text{ for general }\\beta\\right) $$</p>

<p><strong>(d) Total Mass, Gas Mass &amp; Baryon Fraction within \\(R = 5r_c\\) (2.5 points):</strong><br>
At \\(R = 5r_c\\), \\(\\frac{R^3}{r_c^2 + R^2} = \\frac{125}{26}r_c \\approx 4.808\\,r_c = 5.398 \\times 10^{22}\\text{ m}\\). With \\(k_B T_e = 8.50\\text{ keV} = 1.362 \\times 10^{-15}\\text{ J}\\):</p>
<p>$$ M_{\\mathrm{tot}}(5r_c) = \\frac{2(1.362 \\times 10^{-15}\\text{ J})(5.398 \\times 10^{22}\\text{ m})}{(6.674 \\times 10^{-11})(0.60 \\times 1.673 \\times 10^{-27}\\text{ kg})} \\approx 2.195 \\times 10^{45}\\text{ kg} \\approx \\mathbf{1.10 \\times 10^{15}\\,M_\\odot} $$</p>
<p>Integrating the gas density \\(\\rho_{\\mathrm{gas}}(r) = 1.17\\,m_p n_e(r)\\) over spherical shells out to \\(R = 5r_c\\) (with \\(\\rho_{\\mathrm{gas},0} = 1.17(1.673 \\times 10^{-27}\\text{ kg})(6.00 \\times 10^3\\ \\mathrm{m^{-3}}) = 1.174 \\times 10^{-23}\\ \\mathrm{kg\\,m^{-3}}\\)):</p>
<p>$$ M_{\\mathrm{gas}}(5r_c) = 4\\pi \\rho_{\\mathrm{gas},0} r_c^3 \\int_0^5 \\frac{x^2\\,dx}{1+x^2} = 4\\pi(1.174 \\times 10^{-23})(1.123 \\times 10^{22}\\text{ m})^3(3.627) \\approx 2.67 \\times 10^{44}\\text{ kg} \\approx \\mathbf{1.34 \\times 10^{14}\\,M_\\odot} $$</p>
<p>$$ f_{\\mathrm{gas}}(5r_c) = \\frac{M_{\\mathrm{gas}}(5r_c)}{M_{\\mathrm{tot}}(5r_c)} = \\frac{1.34 \\times 10^{14}\\,M_\\odot}{1.10 \\times 10^{15}\\,M_\\odot} \\approx \\mathbf{0.122} \\ (\\mathbf{12.2\\%}) $$</p>`
    },

    // Day 27 — 14.11.2026
    {
        uniqueId: "potd_2026_11_14",
        dayNumber: 27,
        scheduledDate: "14.11.2026",
        title: "Gravitational-Wave Siren: Inspiral and Merger of a Binary Neutron Star",
        author: "Matei",
        module: "T8 & T12 · Gravitational Waves & Standard Sirens",
        difficultyClass: "medium",
        difficultyText: "4.2 / 10.0",
        description: `<p>A ground-based gravitational-wave interferometer detects the inspiral signal of a binary neutron star (BNS) system consisting of two equal-mass neutron stars (\\(m_1 = m_2 = 1.40\\,M_\\odot\\)) on a quasi-circular orbit. The quadrupolar gravitational-wave frequency \\(f_{\\mathrm{GW}} = 2f_{\\mathrm{orb}}\\) enters the high-sensitivity band at \\(f_0 = 40.0\\text{ Hz}\\). Use \\(G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), \\(c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}\\), \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), and \\(1\\text{ Mpc} = 3.0857 \\times 10^{22}\\text{ m}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the binary's chirp mass \\(\\mathcal{M}_c \\equiv \\frac{(m_1 m_2)^{3/5}}{(m_1 + m_2)^{1/5}}\\) in solar masses. At the instant when \\(f_{\\mathrm{GW}} = 40.0\\text{ Hz}\\), determine the orbital frequency \\(f_{\\mathrm{orb}}\\) and the orbital separation \\(a\\) in kilometers. <em>(2.5 points)</em></li>
    <li>In the Einstein quadrupole approximation, gravitational waves carry away power \\(L_{\\mathrm{GW}} = \\frac{32}{5}\\frac{G^4}{c^5}\\frac{m_1^2 m_2^2(m_1 + m_2)}{a^5}\\) at the expense of the Newtonian orbital energy \\(E_{\\mathrm{orb}} = -\\frac{G m_1 m_2}{2a}\\). Prove that the gravitational-wave frequency chirps upward at rate:
    $$ \\dot{f}_{\\mathrm{GW}} = \\frac{96}{5}\\pi^{8/3}\\left(\\frac{G\\mathcal{M}_c}{c^3}\\right)^{5/3} f_{\\mathrm{GW}}^{11/3} $$
    and calculate both \\(\\dot{f}_{\\mathrm{GW}}\\) (in \\(\\mathrm{Hz\\,s^{-1}}\\)) and the remaining time to coalescence \\(t_{\\mathrm{coal}} = \\int_{f_0}^{\\infty} \\frac{df_{\\mathrm{GW}}}{\\dot{f}_{\\mathrm{GW}}}\\) (in seconds) starting from \\(f_0 = 40.0\\text{ Hz}\\). <em>(3.0 points)</em></li>
    <li>By integrating \\(\\mathcal{N}_{\\mathrm{GW}} = \\int_{f_0}^{\\infty} f_{\\mathrm{GW}}\\,dt = \\int_{f_0}^{\\infty} \\frac{f_{\\mathrm{GW}}}{\\dot{f}_{\\mathrm{GW}}}\\,df_{\\mathrm{GW}}\\), calculate the total number of gravitational-wave cycles observed between \\(f_0 = 40.0\\text{ Hz}\\) and merger. <em>(2.0 points)</em></li>
    <li>For a face-on binary (\\(i = 0^\\circ\\)) at luminosity distance \\(D_L\\), the characteristic strain amplitude is \\(h_0 = \\frac{4}{D_L}\\left(\\frac{G\\mathcal{M}_c}{c^2}\\right)^{5/3}\\left(\\frac{\\pi f_{\\mathrm{GW}}}{c}\\right)^{2/3}\\). Given a measured strain of \\(h_0 = 4.58 \\times 10^{-23}\\) at \\(f_{\\mathrm{GW}} = 40.0\\text{ Hz}\\) and an optical kilonova host galaxy with recession velocity \\(v_{\\mathrm{rec}} = 3010\\ \\mathrm{km\\,s^{-1}}\\), determine \\(D_L\\) (in \\(\\text{Mpc}\\)) and the Hubble constant \\(H_0\\) (in \\(\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}\\)). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Quadrupolar gravitational-wave radiation reaction, chirp mass scaling, inspiral waveform phase cycles, and standard siren Hubble constant measurement.</p>

<p><strong>(a) Chirp Mass \\(\\mathcal{M}_c\\), Orbital Frequency &amp; Separation at \\(f_{\\mathrm{GW}} = 40.0\\text{ Hz}\\) (2.5 points):</strong><br>
For equal masses \\(m_1 = m_2 = 1.40\\,M_\\odot\\) (total mass \\(M = 2.80\\,M_\\odot = 5.569 \\times 10^{30}\\text{ kg}\\)):</p>
<p>$$ \\mathcal{M}_c = \\frac{(1.40^2)^{3/5}}{(2.80)^{1/5}}\\,M_\\odot = 2^{-1/5}(1.40\\,M_\\odot) \\approx \\mathbf{1.219\\,M_\\odot} \\quad (2.424 \\times 10^{30}\\text{ kg}) $$</p>
<p>At \\(f_{\\mathrm{GW}} = 40.0\\text{ Hz}\\), the orbital frequency is \\(f_{\\mathrm{orb}} = \\frac{1}{2}f_{\\mathrm{GW}} = \\mathbf{20.0\\text{ Hz}}\\) (\\(\\Omega = 2\\pi f_{\\mathrm{orb}} = 125.66\\ \\mathrm{rad\\,s^{-1}}\\)). By Kepler's Third Law:</p>
<p>$$ a = \\left(\\frac{G M}{\\Omega^2}\\right)^{1/3} = \\left[\\frac{(6.674 \\times 10^{-11})(5.569 \\times 10^{30})}{(125.66)^2}\\right]^{1/3} \\approx 2.866 \\times 10^5\\text{ m} = \\mathbf{286.6\\text{ km}} $$</p>

<p><strong>(b) Derivation of Chirp Rate \\(\\dot{f}_{\\mathrm{GW}}\\) &amp; Coalescence Time \\(t_{\\mathrm{coal}}\\) (3.0 points):</strong><br>
Using \\(\\frac{dE_{\\mathrm{orb}}}{dt} = \\frac{G m_1 m_2}{2a^2}\\dot{a} = -L_{\\mathrm{GW}}\\) and \\(\\frac{\\dot{f}_{\\mathrm{GW}}}{f_{\\mathrm{GW}}} = -\\frac{3}{2}\\frac{\\dot{a}}{a}\\) with \\(a = G^{1/3}M^{1/3}(\\pi f_{\\mathrm{GW}})^{-2/3}\\) and \\(\\frac{m_1 m_2}{M^{1/3}} = \\mathcal{M}_c^{5/3}\\):</p>
<p>$$ \\frac{\\dot{f}_{\\mathrm{GW}}}{f_{\\mathrm{GW}}} = \\frac{96}{5}\\frac{G^3}{c^5}\\frac{m_1 m_2 M}{a^4} = \\frac{96}{5}\\pi^{8/3}\\left(\\frac{G\\mathcal{M}_c}{c^3}\\right)^{5/3} f_{\\mathrm{GW}}^{8/3} \\implies \\mathbf{\\dot{f}_{\\mathrm{GW}} = \\frac{96}{5}\\pi^{8/3}\\left(\\frac{G\\mathcal{M}_c}{c^3}\\right)^{5/3} f_{\\mathrm{GW}}^{11/3}} $$</p>
<p>With \\(\\frac{G\\mathcal{M}_c}{c^3} = \\frac{(6.674 \\times 10^{-11})(2.424 \\times 10^{30})}{(2.998 \\times 10^8)^3} \\approx 6.003 \\times 10^{-6}\\text{ s}\\) and \\(f_0 = 40.0\\text{ Hz}\\):</p>
<p>$$ \\dot{f}_{\\mathrm{GW}}(40\\text{ Hz}) = \\frac{96}{5}\\pi^{8/3}(6.003 \\times 10^{-6}\\text{ s})^{5/3}(40.0\\text{ Hz})^{11/3} \\approx \\mathbf{6.87\\ \\mathrm{Hz\\,s^{-1}}} $$</p>
<p>Integrating \\(dt = \\frac{df_{\\mathrm{GW}}}{\\dot{f}_{\\mathrm{GW}}} \\propto f_{\\mathrm{GW}}^{-11/3}\\,df_{\\mathrm{GW}}\\) from \\(f_0\\) to \\(\\infty\\) gives:</p>
<p>$$ t_{\\mathrm{coal}} = \\frac{3}{8}\\frac{f_0}{\\dot{f}_{\\mathrm{GW}}(f_0)} = \\frac{3}{8}\\left(\\frac{40.0\\text{ Hz}}{6.869\\ \\mathrm{Hz\\,s^{-1}}}\\right) \\approx \\mathbf{2.18\\text{ s}} $$</p>

<p><strong>(c) Total Number of Gravitational-Wave Cycles \\(\\mathcal{N}_{\\mathrm{GW}}\\) (2.0 points):</strong><br>
Since \\(\\frac{f_{\\mathrm{GW}}}{\\dot{f}_{\\mathrm{GW}}} = \\frac{f_0}{\\dot{f}_0}\\left(\\frac{f_{\\mathrm{GW}}}{f_0}\\right)^{-8/3}\\), integrating from \\(f_0\\) to \\(\\infty\\) yields:</p>
<p>$$ \\mathcal{N}_{\\mathrm{GW}} = \\int_{f_0}^{\\infty} \\frac{f_{\\mathrm{GW}}}{\\dot{f}_{\\mathrm{GW}}}\\,df_{\\mathrm{GW}} = \\frac{3}{5}\\frac{f_0^2}{\\dot{f}_0} = \\frac{8}{5}f_0\\,t_{\\mathrm{coal}} = 1.6(40.0\\text{ Hz})(2.184\\text{ s}) \\approx \\mathbf{140\\text{ cycles}} $$</p>

<p><strong>(d) Luminosity Distance \\(D_L\\) &amp; Standard-Siren Hubble Constant \\(H_0\\) (2.5 points):</strong><br>
With \\(\\frac{G\\mathcal{M}_c}{c^2} = 1800\\text{ m}\\), the numerator factor at \\(f_0 = 40.0\\text{ Hz}\\) is \\(4(1800\\text{ m})\\big[\\pi(6.003 \\times 10^{-6}\\text{ s})(40.0\\text{ Hz})\\big]^{2/3} \\approx 59.68\\text{ m}\\). Solving for \\(D_L\\):</p>
<p>$$ D_L = \\frac{59.68\\text{ m}}{4.58 \\times 10^{-23}} \\approx 1.303 \\times 10^{24}\\text{ m} \\approx \\mathbf{42.2\\text{ Mpc}} $$</p>
<p>Applying Hubble's Law \\(v_{\\mathrm{rec}} = H_0 D_L\\):</p>
<p>$$ H_0 = \\frac{v_{\\mathrm{rec}}}{D_L} = \\frac{3010\\ \\mathrm{km\\,s^{-1}}}{42.2\\text{ Mpc}} \\approx \\mathbf{71.3\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}}} $$</p>`
    },

    // Day 28 — 15.11.2026
    {
        uniqueId: "potd_2026_11_15",
        dayNumber: 28,
        scheduledDate: "15.11.2026",
        title: "The Eddington–Barbier Limb Darkening Law and Solar Rosseland Photosphere",
        author: "Matei",
        module: "T2 & T5 · Radiative Transfer & Stellar Atmospheres",
        difficultyClass: "medium",
        difficultyText: "4.5 / 10.0",
        description: `<p>In a plane-parallel stellar photosphere in local thermodynamic equilibrium (LTE) and grey radiative equilibrium, the bolometric source function \\(S(\\tau) = \\frac{\\sigma_{\\mathrm{SB}}}{\\pi}T(\\tau)^4\\) increases linearly with vertical Rosseland optical depth \\(\\tau\\) (measured inward from \\(\\tau = 0\\) at the top of the atmosphere) according to the Milne–Eddington law:</p>
<p>$$ S(\\tau) = \\frac{3}{4}\\frac{F_{\\mathrm{bol}}}{\\pi}\\left(\\tau + \\frac{2}{3}\\right) $$</p>
<p>where \\(F_{\\mathrm{bol}} = \\sigma_{\\mathrm{SB}} T_{\\mathrm{eff}}^4\\) is the constant outward bolometric flux and \\(T_{\\mathrm{eff}} = 5772\\text{ K}\\) for the Sun. A distant observer views a point on the solar disk where the line of sight makes an angle \\(\\theta\\) to the outward surface normal (with direction cosine \\(\\mu \\equiv \\cos\\theta \\in (0, 1]\\)).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Using the formal solution for the emergent specific intensity \\(I(0, \\mu) = \\int_0^\\infty S(\\tau)\\,e^{-\\tau/\\mu}\\,\\frac{d\\tau}{\\mu}\\), evaluate the integral to derive the linear limb-darkening law \\(\\frac{I(0, \\mu)}{I(0, 1)} = 1 - u(1 - \\mu)\\). Determine the exact theoretical limb-darkening coefficient \\(u\\) and the limb-to-center intensity ratio \\(\\frac{I(0, 0^+)}{I(0, 1)}\\). <em>(3.0 points)</em></li>
    <li>Verify the <strong>Eddington–Barbier relation</strong> \\(I(0, \\mu) = S(\\tau = \\mu)\\). Hence find the exact optical depth \\(\\tau_{\\mathrm{eff}}\\) where the local kinetic temperature equals \\(T_{\\mathrm{eff}}\\), and calculate the Sun's boundary "skin" temperature \\(T_0 \\equiv T(\\tau = 0)\\) in Kelvin. <em>(2.0 points)</em></li>
    <li>Prove explicitly that integrating the emergent intensity over the outward hemisphere \\(F_{\\mathrm{out}} = 2\\pi \\int_0^1 I(0, \\mu)\\,\\mu\\,d\\mu\\) recovers \\(F_{\\mathrm{bol}} = \\sigma_{\\mathrm{SB}} T_{\\mathrm{eff}}^4\\). <em>(1.5 points)</em></li>
    <li>In the upper solar photosphere (surface gravity \\(g_\\odot = 274\\ \\mathrm{m\\,s^{-2}}\\), mean molecular weight \\(\\mu_m = 1.26\\), temperature approximated as \\(T_0\\)), hydrostatic balance \\(\\frac{dP}{dz} = -\\rho g_\\odot\\) holds while the negative hydrogen (\\(\\text{H}^-\\)) opacity scales with gas density as \\(\\kappa(\\rho) = \\kappa_0\\left(\\frac{\\rho}{\\rho_0}\\right)^\\alpha\\) with \\(\\alpha = 0.50\\), \\(\\rho_0 = 2.50 \\times 10^{-4}\\ \\mathrm{kg\\,m^{-3}}\\), and \\(\\kappa_0 = 0.030\\ \\mathrm{m^2\\,kg^{-1}}\\). Calculate the isothermal pressure scale height \\(H_P = \\frac{k_B T_0}{\\mu_m m_H g_\\odot}\\) (in km), integrate \\(d\\tau = -\\kappa(\\rho)\\rho\\,dz\\) to find the photospheric gas density \\(\\rho_{\\mathrm{phot}}\\) at \\(\\tau_{\\mathrm{eff}} = \\frac{2}{3}\\), and determine the optical-depth scale height \\(H_\\tau = \\frac{H_P}{1 + \\alpha}\\) (in km and in arcseconds at \\(1\\text{ AU}\\)) that governs the sharpness of the solar limb. <em>(3.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Milne–Eddington radiative transfer, Laplace transform of the source function, Eddington–Barbier limb darkening, and \\(\\text{H}^-\\) photospheric scale height.</p>

<p><strong>(a) Emergent Intensity &amp; Linear Limb-Darkening Law (3.0 points):</strong><br>
Substituting \\(u' = \\tau / \\mu\\) (\\(d\\tau / \\mu = du'\\)) into the formal transfer integral and using \\(\\int_0^\\infty e^{-u'}du' = 1\\) and \\(\\int_0^\\infty u' e^{-u'}du' = 1\\):</p>
<p>$$ I(0, \\mu) = \\frac{3 F_{\\mathrm{bol}}}{4\\pi}\\int_0^\\infty \\left(\\mu u' + \\frac{2}{3}\\right)e^{-u'}\\,du' = \\frac{3 F_{\\mathrm{bol}}}{4\\pi}\\left(\\mu + \\frac{2}{3}\\right) $$</p>
<p>At the center of the solar disk (\\(\\mu = 1\\)), \\(I(0, 1) = \\frac{3 F_{\\mathrm{bol}}}{4\\pi}\\left(\\frac{5}{3}\\right) = \\frac{5 F_{\\mathrm{bol}}}{4\\pi}\\). Dividing \\(I(0, \\mu)\\) by \\(I(0, 1)\\) gives:</p>
<p>$$ \\frac{I(0, \\mu)}{I(0, 1)} = \\frac{3\\mu + 2}{5} = 1 - \\frac{3}{5}(1 - \\mu) \\implies u = \\mathbf{\\frac{3}{5} = 0.60}, \\qquad \\frac{I(0, 0^+)}{I(0, 1)} = 1 - u = \\mathbf{\\frac{2}{5} = 0.40} $$</p>

<p><strong>(b) Eddington–Barbier Relation, Photospheric Depth \\(\\tau_{\\mathrm{eff}}\\) &amp; Skin Temperature \\(T_0\\) (2.0 points):</strong><br>
Comparing \\(I(0, \\mu) = \\frac{3 F_{\\mathrm{bol}}}{4\\pi}(\\mu + 2/3)\\) with \\(S(\\tau) = \\frac{3 F_{\\mathrm{bol}}}{4\\pi}(\\tau + 2/3)\\) shows immediately that \\(\\mathbf{I(0, \\mu) = S(\\tau = \\mu)}\\): the intensity emerging at viewing cosine \\(\\mu\\) equals the source function at vertical optical depth \\(\\tau = \\mu\\). Since \\(S(\\tau) = \\frac{\\sigma_{\\mathrm{SB}}}{\\pi}T(\\tau)^4\\), the temperature profile is:</p>
<p>$$ T(\\tau)^4 = \\frac{3}{4}T_{\\mathrm{eff}}^4\\left(\\tau + \\frac{2}{3}\\right) $$</p>
<p>Setting \\(T(\\tau_{\\mathrm{eff}}) = T_{\\mathrm{eff}}\\) gives \\(\\frac{3}{4}(\\tau_{\\mathrm{eff}} + 2/3) = 1 \\implies \\mathbf{\\tau_{\\mathrm{eff}} = \\frac{2}{3}}\\). At the boundary \\(\\tau = 0\\):</p>
<p>$$ T_0 = 2^{-1/4} T_{\\mathrm{eff}} = 0.8409 \\times 5772\\text{ K} \\approx \\mathbf{4854\\text{ K}} $$</p>

<p><strong>(c) Verification of Bolometric Flux Conservation (1.5 points):</strong></p>
<p>$$ F_{\\mathrm{out}} = 2\\pi \\int_0^1 I(0, \\mu)\\,\\mu\\,d\\mu = \\frac{3}{2}F_{\\mathrm{bol}}\\int_0^1 \\left(\\mu^2 + \\frac{2}{3}\\mu\\right)d\\mu = \\frac{3}{2}F_{\\mathrm{bol}}\\left[\\frac{\\mu^3}{3} + \\frac{\\mu^2}{3}\\right]_0^1 = \\frac{3}{2}F_{\\mathrm{bol}}\\left(\\frac{2}{3}\\right) = \\mathbf{F_{\\mathrm{bol}} = \\sigma_{\\mathrm{SB}} T_{\\mathrm{eff}}^4} $$</p>

<p><strong>(d) Photospheric Scale Height, Density \\(\\rho_{\\mathrm{phot}}\\) &amp; Sharpness of the Solar Limb (3.5 points):</strong><br>
For an isothermal ideal gas at \\(T_0 = 4854\\text{ K}\\) with \\(\\mu_m = 1.26\\) and \\(m_H = 1.6736 \\times 10^{-27}\\text{ kg}\\), the pressure scale height is:</p>
<p>$$ H_P = \\frac{k_B T_0}{\\mu_m m_H g_\\odot} = \\frac{(1.3806 \\times 10^{-23})(4854)}{1.26(1.6736 \\times 10^{-27})(274)} \\approx 1.160 \\times 10^5\\text{ m} = \\mathbf{116.0\\text{ km}} $$</p>
<p>Since \\(\\rho(z) \\propto e^{-z/H_P}\\), we have \\(d\\rho = -\\frac{\\rho}{H_P}\\,dz \\implies -\\rho\\,dz = H_P\\,d\\rho\\). Integrating \\(d\\tau = \\kappa_0\\left(\\frac{\\rho}{\\rho_0}\\right)^\\alpha H_P\\,d\\rho\\) from \\(\\rho = 0\\) (\\(z = \\infty\\)) to \\(\\rho_{\\mathrm{phot}}\\):</p>
<p>$$ \\tau(\\rho) = \\frac{\\kappa_0 H_P \\rho_0}{1 + \\alpha}\\left(\\frac{\\rho}{\\rho_0}\\right)^{1+\\alpha} $$</p>
<p>With \\(\\alpha = 0.50\\) and \\(\\frac{\\kappa_0 H_P \\rho_0}{1.50} = \\frac{(0.030)(1.160 \\times 10^5)(2.50 \\times 10^{-4})}{1.50} = 0.5800\\), setting \\(\\tau_{\\mathrm{eff}} = \\frac{2}{3}\\) yields:</p>
<p>$$ \\rho_{\\mathrm{phot}} = \\rho_0\\left(\\frac{2/3}{0.5800}\\right)^{2/3} = 2.50 \\times 10^{-4} \\times (1.1494)^{2/3} \\approx \\mathbf{2.74 \\times 10^{-4}\\ \\mathrm{kg\\,m^{-3}}} $$</p>
<p>Because \\(\\tau(z) \\propto \\rho(z)^{1+\\alpha} \\propto e^{-(1+\\alpha)z/H_P} = e^{-z/H_\\tau}\\), the optical depth e-folds over the scale height:</p>
<p>$$ H_\\tau = \\frac{H_P}{1 + \\alpha} = \\frac{116.0\\text{ km}}{1.50} \\approx \\mathbf{77.3\\text{ km}} \\quad \\left(\\theta_{\\mathrm{limb}} = \\frac{77.3\\text{ km}}{1.496 \\times 10^8\\text{ km}} \\times 206,265'' \\approx \\mathbf{0.107''}\\right) $$</p>`
    },

    // Day 29 — 16.11.2026
    {
        uniqueId: "potd_2026_11_16",
        dayNumber: 29,
        scheduledDate: "16.11.2026",
        title: "Saha Ionization and the Balmer Peak in Stellar Photospheres",
        author: "Matei",
        module: "T4 & T5 · Stellar Spectra & Statistical Mechanics",
        difficultyClass: "medium",
        difficultyText: "4.0 / 10.0",
        description: `<p>Hydrogen Balmer absorption lines (\\(n = 2 \\to m\\)) reach their maximum strength in A0V main-sequence stars (such as Vega, \\(T \\approx 9600\\text{ K}\\)) rather than in cooler solar-type stars or hotter O/B stars. Model a stellar photosphere as a pure hydrogen gas in local thermodynamic equilibrium (LTE) at constant electron pressure \\(P_e = n_e k_B T = 20.0\\text{ Pa}\\).</p>
<p>For neutral atomic hydrogen (\\(\\text{H I}\\)), the statistical weight of principal quantum level \\(n\\) is \\(g_n = 2n^2\\), the ground-state ionization energy is \\(\\chi_1 = 13.60\\text{ eV}\\), the \\(n = 2\\) excitation energy is \\(\\Delta E_{12} = 10.20\\text{ eV}\\), and the partition function may be approximated by the ground-state weight \\(Z_{\\mathrm{I}} \\simeq g_1 = 2\\) (with \\(g_{\\mathrm{II}} = 1\\) for a bare proton \\(\\text{H II}\\)). Use \\(m_e = 9.109 \\times 10^{-31}\\text{ kg}\\), \\(h = 6.626 \\times 10^{-34}\\ \\mathrm{J\\,s}\\), \\(k_B = 1.3806 \\times 10^{-23}\\ \\mathrm{J\\,K^{-1}} = 8.6173 \\times 10^{-5}\\ \\mathrm{eV\\,K^{-1}}\\), and \\(1\\text{ eV} = 1.6022 \\times 10^{-19}\\text{ J}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Using the Boltzmann excitation formula, calculate the ratio \\(N_2 / N_1\\) of neutral hydrogen atoms in the first excited state (\\(n = 2\\)) to those in the ground state (\\(n = 1\\)) at \\(T_\\odot = 5772\\text{ K}\\), \\(T_{\\mathrm{A0}} = 9600\\text{ K}\\), and \\(T_{\\mathrm{B1}} = 25,000\\text{ K}\\). <em>(2.0 points)</em></li>
    <li>Write the Saha ionization equation in terms of the electron pressure \\(P_e\\):
    $$ \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} P_e = \\frac{2 g_{\\mathrm{II}}}{Z_{\\mathrm{I}}}\\left(\\frac{2\\pi m_e k_B T}{h^2}\\right)^{3/2} k_B T\\,e^{-\\chi_1 / (k_B T)} $$
    Calculate the ionization ratio \\(n_{\\mathrm{II}} / n_{\\mathrm{I}}\\) and the ionized fraction \\(x \\equiv \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}} + n_{\\mathrm{II}}}\\) at \\(T_\\odot = 5772\\text{ K}\\), \\(T_{\\mathrm{A0}} = 9600\\text{ K}\\), and \\(T_{\\mathrm{B1}} = 25,000\\text{ K}\\). <em>(3.0 points)</em></li>
    <li>Determine the temperature \\(T_{1/2}\\) at which hydrogen is exactly \\(50\\%\\) ionized (\\(x = 0.50\\)) at \\(P_e = 20.0\\text{ Pa}\\). <em>(2.0 points)</em></li>
    <li>Combine parts (a) and (b) to compute the fraction of <em>all</em> hydrogen nuclei (neutral plus ionized) that reside in the \\(n = 2\\) state, \\(f_{n=2}(T) = (1 - x)\\frac{N_2 / N_1}{1 + N_2 / N_1}\\), at the three temperatures, and explain physically why the Balmer lines peak near \\(T \\approx 9600\\text{ K}\\). <em>(3.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Boltzmann excitation vs. Saha thermal ionization in stellar atmospheres, and the physical origin of the Harvard spectral sequence.</p>

<p><strong>(a) Boltzmann Excitation Ratio \\(N_2 / N_1\\) (2.0 points):</strong><br>
With \\(g_1 = 2(1)^2 = 2\\), \\(g_2 = 2(2)^2 = 8\\) (\\(g_2 / g_1 = 4\\)), and \\(\\Delta E_{12} = 10.20\\text{ eV}\\), the Boltzmann equation is \\(\\frac{N_2}{N_1} = 4\\exp\\!\\left(-\\frac{10.20\\text{ eV}}{k_B T}\\right)\\):</p>
<ul>
    <li><strong>At \\(T_\\odot = 5772\\text{ K}\\) (\\(k_B T = 0.4974\\text{ eV}\\)):</strong>
    $$ \\frac{N_2}{N_1} = 4\\exp\\!\\left(-\\frac{10.20}{0.4974}\\right) = 4 e^{-20.507} \\approx \\mathbf{4.95 \\times 10^{-9}} $$</li>
    <li><strong>At \\(T_{\\mathrm{A0}} = 9600\\text{ K}\\) (\\(k_B T = 0.8273\\text{ eV}\\)):</strong>
    $$ \\frac{N_2}{N_1} = 4\\exp\\!\\left(-\\frac{10.20}{0.8273}\\right) = 4 e^{-12.330} \\approx \\mathbf{1.77 \\times 10^{-5}} $$</li>
    <li><strong>At \\(T_{\\mathrm{B1}} = 25,000\\text{ K}\\) (\\(k_B T = 2.154\\text{ eV}\\)):</strong>
    $$ \\frac{N_2}{N_1} = 4\\exp\\!\\left(-\\frac{10.20}{2.154}\\right) = 4 e^{-4.735} \\approx \\mathbf{3.51 \\times 10^{-2}} $$</li>
</ul>

<p><strong>(b) Saha Ionization Ratio &amp; Ionized Fraction \\(x\\) (3.0 points):</strong><br>
Since \\(\\frac{2 g_{\\mathrm{II}}}{Z_{\\mathrm{I}}} = \\frac{2(1)}{2} = 1\\), we evaluate the Saha prefactor \\(C_{\\mathrm{Saha}} = \\left(\\frac{2\\pi m_e k_B}{h^2}\\right)^{3/2}k_B \\approx 3.335 \\times 10^7\\ \\mathrm{Pa\\,K^{-5/2}}\\), so that \\(\\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} = \\frac{C_{\\mathrm{Saha}} T^{5/2}}{P_e}e^{-\\chi_1 / (k_B T)}\\) with \\(P_e = 20.0\\text{ Pa}\\):</p>
<ul>
    <li><strong>At \\(T_\\odot = 5772\\text{ K}\\):</strong> \\(\\chi_1 / (k_B T) = 27.342\\), \\(T^{5/2} = 2.529 \\times 10^9\\ \\mathrm{K^{5/2}}\\):
    $$ \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} = \\frac{(3.335 \\times 10^7)(2.529 \\times 10^9)}{20.0}e^{-27.342} \\approx \\mathbf{5.65 \\times 10^{-6}}, \\qquad x \\approx \\mathbf{5.65 \\times 10^{-6}} $$</li>
    <li><strong>At \\(T_{\\mathrm{A0}} = 9600\\text{ K}\\):</strong> \\(\\chi_1 / (k_B T) = 16.440\\), \\(T^{5/2} = 8.918 \\times 10^9\\ \\mathrm{K^{5/2}}\\):
    $$ \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} = \\frac{(3.335 \\times 10^7)(8.918 \\times 10^9)}{20.0}e^{-16.440} \\approx \\mathbf{1.078}, \\qquad x = \\frac{1.078}{2.078} \\approx \\mathbf{0.519} \\ (51.9\\%) $$</li>
    <li><strong>At \\(T_{\\mathrm{B1}} = 25,000\\text{ K}\\):</strong> \\(\\chi_1 / (k_B T) = 6.313\\), \\(T^{5/2} = 9.766 \\times 10^{10}\\ \\mathrm{K^{5/2}}\\):
    $$ \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} = \\frac{(3.335 \\times 10^7)(9.766 \\times 10^{10})}{20.0}e^{-6.313} \\approx \\mathbf{2.95 \\times 10^5}, \\qquad x \\approx \\mathbf{0.9999966} \\quad (1 - x \\approx 3.39 \\times 10^{-6}) $$</li>
</ul>

<p><strong>(c) Half-Ionization Temperature \\(T_{1/2}\\) (2.0 points):</strong><br>
Setting \\(x = 0.50 \\iff \\frac{n_{\\mathrm{II}}}{n_{\\mathrm{I}}} = 1\\) requires \\(C_{\\mathrm{Saha}} T_{1/2}^{5/2} e^{-157,809\\text{ K} / T_{1/2}} = 20.0\\text{ Pa}\\). Iterating near \\(9600\\text{ K}\\) yields:</p>
<p>$$ T_{1/2} \\approx \\mathbf{9555\\text{ K}} $$</p>

<p><strong>(d) Fraction of Total Hydrogen in \\(n = 2\\) &amp; Physical Interpretation (3.0 points):</strong><br>
Evaluating \\(f_{n=2}(T) = (1 - x)\\frac{N_2 / N_1}{1 + N_2 / N_1}\\):</p>
<ul>
    <li><strong>At \\(T_\\odot = 5772\\text{ K}\\):</strong> \\(f_{n=2} \\approx (1.000)(4.95 \\times 10^{-9}) = \\mathbf{4.95 \\times 10^{-9}}\\)</li>
    <li><strong>At \\(T_{\\mathrm{A0}} = 9600\\text{ K}\\):</strong> \\(f_{n=2} \\approx (0.481)(1.77 \\times 10^{-5}) = \\mathbf{8.50 \\times 10^{-6}}\\)</li>
    <li><strong>At \\(T_{\\mathrm{B1}} = 25,000\\text{ K}\\):</strong> \\(f_{n=2} \\approx (3.39 \\times 10^{-6})\\frac{0.0351}{1.0351} = \\mathbf{1.15 \\times 10^{-7}}\\)</li>
</ul>
<p>In cool stars (\\(T \\sim 5800\\text{ K}\\)), virtually all hydrogen is neutral, but thermal collisions are too weak to populate the \\(n = 2\\) level (\\(10.2\\text{ eV}\\) above ground). In hot stars (\\(T \\gtrsim 20,000\\text{ K}\\)), excitation is efficient, but nearly all neutral hydrogen is destroyed by thermal ionization. The product \\((1 - x)\\times (N_2/N_1)\\) therefore peaks sharply around \\(T \\approx 9600\\text{ K}\\) in A0 stars.</p>`
    },

    // Day 30 — 17.11.2026
    {
        uniqueId: "potd_2026_11_17",
        dayNumber: 30,
        scheduledDate: "17.11.2026",
        title: "Dispersion Delay and Faraday Rotation of a Fast Radio Burst",
        author: "Matei",
        module: "T6 & T12 · Plasma Astrophysics & Intergalactic Medium",
        difficultyClass: "medium",
        difficultyText: "3.9 / 10.0",
        description: `<p>A cosmological Fast Radio Burst (FRB) is detected across a receiver band spanning \\(\\nu_1 = 400.0\\text{ MHz}\\) to \\(\\nu_2 = 800.0\\text{ MHz}\\). As the radio pulse propagates through cold ionized plasma of electron number density \\(n_e\\) along path length \\(D\\), it obeys the dispersion relation \\(\\omega^2 = \\omega_p^2 + c^2 k^2\\), where \\(\\omega_p = \\sqrt{\\frac{n_e e^2}{\\varepsilon_0 m_e}}\\) is the electron plasma angular frequency. The total observed dispersion measure is \\(\\mathrm{DM} \\equiv \\int_0^D n_e\\,dl = 500.0\\ \\mathrm{pc\\,cm^{-3}}\\). Neglect cosmological redshift factors in the local propagation equations and use \\(e = 1.6022 \\times 10^{-19}\\text{ C}\\), \\(m_e = 9.1094 \\times 10^{-31}\\text{ kg}\\), \\(\\varepsilon_0 = 8.8542 \\times 10^{-12}\\ \\mathrm{F\\,m^{-1}}\\), \\(c = 2.9979 \\times 10^8\\ \\mathrm{m\\,s^{-1}}\\), and \\(1\\text{ pc} = 3.0857 \\times 10^{16}\\text{ m}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>From \\(\\omega^2 = \\omega_p^2 + c^2 k^2\\), prove that the phase velocity \\(v_{\\mathrm{ph}} = \\omega / k\\) and group velocity \\(v_g = d\\omega / dk\\) satisfy \\(v_{\\mathrm{ph}} v_g = c^2\\). Assuming \\(\\nu \\gg \\nu_p = \\omega_p / (2\\pi)\\), expand the travel time \\(t(\\nu) = \\int_0^D \\frac{dl}{v_g(\\nu)}\\) to show that the arrival-time delay relative to infinite frequency is \\(\\Delta t(\\nu) = \\mathcal{D}\\frac{\\mathrm{DM}}{\\nu^2}\\), and calculate the dispersion constant \\(\\mathcal{D} = \\frac{e^2}{8\\pi^2 \\varepsilon_0 m_e c}\\) in \\(\\mathrm{s\\,MHz^2\\,pc^{-1}\\,cm^3}\\). <em>(3.0 points)</em></li>
    <li>Calculate the arrival-time sweep \\(\\Delta t_{12} = t(\\nu_1) - t(\\nu_2)\\) (in seconds) between the \\(400.0\\text{ MHz}\\) and \\(800.0\\text{ MHz}\\) channels, and determine the instantaneous frequency-drift rate \\(\\left.\\frac{d\\nu}{dt}\\right|_{\\nu_2}\\) (in \\(\\mathrm{MHz\\,s^{-1}}\\)) at \\(\\nu_2 = 800.0\\text{ MHz}\\). <em>(2.5 points)</em></li>
    <li>Subtracting the foreground Milky Way contribution \\(\\mathrm{DM}_{\\mathrm{MW}} = 85.0\\ \\mathrm{pc\\,cm^{-3}}\\) and the FRB host-galaxy contribution \\(\\mathrm{DM}_{\\mathrm{host}} = 65.0\\ \\mathrm{pc\\,cm^{-3}}\\), estimate the distance \\(D\\) (in \\(\\text{Gpc}\\)) to the host galaxy given a mean intergalactic electron density of \\(n_{e,\\mathrm{IGM}} = 2.10 \\times 10^{-7}\\ \\mathrm{cm^{-3}}\\). <em>(2.0 points)</em></li>
    <li>The burst is linearly polarized, and its polarization position angle \\(\\psi(\\lambda) = \\psi_0 + \\mathrm{RM}\\,\\lambda^2\\) rotates by \\(\\Delta\\psi = 45.0\\text{ rad}\\) between \\(\\nu_2 = 800.0\\text{ MHz}\\) and \\(\\nu_1 = 400.0\\text{ MHz}\\), where \\(\\mathrm{RM} = 0.812 \\int n_e\\,[\\mathrm{cm^{-3}}]\\,B_\\parallel\\,[\\mu\\mathrm{G}]\\,dl\\,[\\mathrm{pc}]\\ \\mathrm{rad\\,m^{-2}}\\). Calculate \\(\\mathrm{RM}\\), and assuming the Faraday rotation occurs entirely inside the host galaxy's ionized region (\\(\\mathrm{DM}_{\\mathrm{host}} = 65.0\\ \\mathrm{pc\\,cm^{-3}}\\)), find the density-weighted line-of-sight magnetic field \\(\\langle B_\\parallel \\rangle\\) in microgauss (\\(\\mu\\mathrm{G}\\)). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Cold-plasma electromagnetic wave dispersion, intergalactic baryon column density, and magneto-ionic Faraday rotation.</p>

<p><strong>(a) Group Velocity &amp; Derivation of the Dispersion Constant \\(\\mathcal{D}\\) (3.0 points):</strong><br>
Differentiating \\(\\omega^2 = \\omega_p^2 + c^2 k^2\\) gives \\(2\\omega\\,d\\omega = 2c^2 k\\,dk \\implies v_g = \\frac{d\\omega}{dk} = \\frac{c^2 k}{\\omega} = \\frac{c^2}{v_{\\mathrm{ph}}}\\), proving \\(\\mathbf{v_{\\mathrm{ph}} v_g = c^2}\\). Expressing \\(v_g\\) in terms of frequency \\(\\nu = \\omega / (2\\pi)\\):</p>
<p>$$ v_g(\\nu) = c\\sqrt{1 - \\frac{\\nu_p^2}{\\nu^2}} \\implies \\frac{1}{v_g(\\nu)} \\simeq \\frac{1}{c}\\left(1 + \\frac{\\nu_p^2}{2\\nu^2}\\right) = \\frac{1}{c} + \\frac{e^2 n_e}{8\\pi^2 \\varepsilon_0 m_e c\\,\\nu^2} $$</p>
<p>Integrating along the line of sight \\(l \\in [0, D]\\) and subtracting the vacuum light-travel time \\(t(\\infty) = D/c\\):</p>
<p>$$ \\Delta t(\\nu) = \\left(\\frac{e^2}{8\\pi^2 \\varepsilon_0 m_e c}\\right)\\frac{1}{\\nu^2}\\int_0^D n_e\\,dl = \\mathcal{D}\\frac{\\mathrm{DM}}{\\nu^2} $$</p>
<p>Converting \\(1\\ \\mathrm{pc\\,cm^{-3}} = 3.0857 \\times 10^{22}\\ \\mathrm{m^{-2}}\\) and \\(1\\text{ MHz}^2 = 10^{12}\\ \\mathrm{s^{-2}}\\):</p>
<p>$$ \\mathcal{D} = \\frac{(1.6022 \\times 10^{-19})^2 (3.0857 \\times 10^{22})}{8\\pi^2 (8.8542 \\times 10^{-12})(9.1094 \\times 10^{-31})(2.9979 \\times 10^8)(10^{12})} \\approx \\mathbf{4.149 \\times 10^3\\ \\mathrm{s\\,MHz^2\\,pc^{-1}\\,cm^3}} $$</p>

<p><strong>(b) Pulse Sweep Delay \\(\\Delta t_{12}\\) &amp; Instantaneous Chirp Rate (2.5 points):</strong><br>
For \\(\\mathrm{DM} = 500.0\\ \\mathrm{pc\\,cm^{-3}}\\), \\(\\nu_1 = 400.0\\text{ MHz}\\), and \\(\\nu_2 = 800.0\\text{ MHz}\\):</p>
<p>$$ \\Delta t_{12} = (4.149 \\times 10^3)(500.0)\\left(\\frac{1}{400.0^2} - \\frac{1}{800.0^2}\\right) = 2.0745 \\times 10^6 \\times 4.6875 \\times 10^{-6}\\text{ s} \\approx \\mathbf{9.72\\text{ s}} $$</p>
<p>Differentiating \\(t(\\nu) = t(\\infty) + \\mathcal{D}\\,\\mathrm{DM}\\,\\nu^{-2}\\) gives \\(\\frac{dt}{d\\nu} = -\\frac{2\\mathcal{D}\\,\\mathrm{DM}}{\\nu^3}\\), so at \\(\\nu_2 = 800.0\\text{ MHz}\\):</p>
<p>$$ \\left.\\frac{d\\nu}{dt}\\right|_{\\nu_2} = -\\frac{\\nu_2^3}{2\\mathcal{D}\\,\\mathrm{DM}} = -\\frac{(800.0)^3}{2(2.0745 \\times 10^6)} \\approx \\mathbf{-123.4\\ \\mathrm{MHz\\,s^{-1}}} $$</p>

<p><strong>(c) Intergalactic Dispersion Measure &amp; Distance \\(D\\) (2.0 points):</strong><br>
The intergalactic medium contribution is \\(\\mathrm{DM}_{\\mathrm{IGM}} = 500.0 - 85.0 - 65.0 = 350.0\\ \\mathrm{pc\\,cm^{-3}}\\). Dividing by \\(n_{e,\\mathrm{IGM}} = 2.10 \\times 10^{-7}\\ \\mathrm{cm^{-3}}\\):</p>
<p>$$ D = \\frac{\\mathrm{DM}_{\\mathrm{IGM}}}{n_{e,\\mathrm{IGM}}} = \\frac{350.0\\ \\mathrm{pc\\,cm^{-3}}}{2.10 \\times 10^{-7}\\ \\mathrm{cm^{-3}}} \\approx 1.667 \\times 10^9\\text{ pc} = \\mathbf{1.67\\text{ Gpc}} $$</p>

<p><strong>(d) Rotation Measure \\(\\mathrm{RM}\\) &amp; Host Magnetic Field \\(\\langle B_\\parallel \\rangle\\) (2.5 points):</strong><br>
The wavelengths at \\(400.0\\text{ MHz}\\) and \\(800.0\\text{ MHz}\\) are \\(\\lambda_1 = \\frac{c}{\\nu_1} = 0.7495\\text{ m}\\) and \\(\\lambda_2 = \\frac{c}{\\nu_2} = 0.3747\\text{ m}\\):</p>
<p>$$ \\mathrm{RM} = \\frac{\\Delta\\psi}{\\lambda_1^2 - \\lambda_2^2} = \\frac{45.0\\text{ rad}}{(0.7495)^2 - (0.3747)^2\\ \\mathrm{m^2}} = \\frac{45.0}{0.4213} \\approx \\mathbf{106.8\\ \\mathrm{rad\\,m^{-2}}} $$</p>
<p>Using \\(\\mathrm{RM} = 0.812\\,\\mathrm{DM}_{\\mathrm{host}} \\langle B_\\parallel \\rangle\\):</p>
<p>$$ \\langle B_\\parallel \\rangle = \\frac{\\mathrm{RM}}{0.812\\,\\mathrm{DM}_{\\mathrm{host}}} = \\frac{106.8}{0.812 \\times 65.0} \\approx \\mathbf{2.02\\ \\mu\\mathrm{G}} $$</p>`
    },

    // Day 31 — 18.11.2026
    {
        uniqueId: "potd_2026_11_18",
        dayNumber: 31,
        scheduledDate: "18.11.2026",
        title: "Synchrotron Cooling and the Spectral Aging Break of a Radio Galaxy Lobe",
        author: "Matei",
        module: "T2 & T11 · Relativistic Radiation & High-Energy Astrophysics",
        difficultyClass: "medium",
        difficultyText: "4.2 / 10.0",
        description: `<p>Ultra-relativistic electrons with Lorentz factor \\(\\gamma \\gg 1\\) and isotropic pitch angles populate the extended radio lobe of an active galaxy at redshift \\(z \\approx 0\\), where the uniform magnetic field strength is \\(B = 1.50\\text{ nT} = 15.0\\ \\mu\\mathrm{G}\\). The electrons lose energy both to synchrotron radiation in the lobe's magnetic field and to inverse-Compton (IC) scattering off the Cosmic Microwave Background (\\(T_{\\mathrm{CMB}} = 2.725\\text{ K}\\)) at a total rate:</p>
<p>$$ -\\frac{dE}{dt} = P_{\\mathrm{syn}} + P_{\\mathrm{IC}} = \\frac{4}{3}\\sigma_T c \\gamma^2 \\left(U_B + U_{\\mathrm{CMB}}\\right) $$</p>
<p>where \\(U_B = \\frac{B^2}{2\\mu_0}\\) and \\(U_{\\mathrm{CMB}} = \\frac{4\\sigma_{\\mathrm{SB}}}{c}T_{\\mathrm{CMB}}^4\\). Use \\(\\sigma_T = 6.652 \\times 10^{-29}\\ \\mathrm{m^2}\\), \\(e = 1.6022 \\times 10^{-19}\\text{ C}\\), \\(m_e = 9.1094 \\times 10^{-31}\\text{ kg}\\) (\\(m_e c^2 = 0.5110\\text{ MeV}\\)), \\(\\mu_0 = 4\\pi \\times 10^{-7}\\ \\mathrm{N\\,A^{-2}}\\), and \\(\\sigma_{\\mathrm{SB}} = 5.670 \\times 10^{-8}\\ \\mathrm{W\\,m^{-2}\\,K^{-4}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the magnetic energy density \\(U_B\\) and the CMB photon energy density \\(U_{\\mathrm{CMB}}\\) in \\(\\mathrm{J\\,m^{-3}}\\), the ratio \\(P_{\\mathrm{IC}} / P_{\\mathrm{syn}}\\), and the CMB-equivalent magnetic field \\(B_{\\mathrm{CMB}} = \\sqrt{2\\mu_0 U_{\\mathrm{CMB}}}\\) in \\(\\mu\\mathrm{G}\\). <em>(2.0 points)</em></li>
    <li>An electron of Lorentz factor \\(\\gamma\\) radiates most of its synchrotron power near the characteristic frequency \\(\\nu_c = \\frac{3}{4\\pi}\\gamma^2 \\frac{e B}{m_e}\\). Calculate \\(\\gamma\\) and the electron energy \\(E = \\gamma m_e c^2\\) (in \\(\\mathrm{GeV}\\)) for electrons emitting at \\(\\nu_c = 1.40\\text{ GHz}\\). <em>(2.0 points)</em></li>
    <li>Integrate the cooling equation \\(\\frac{d\\gamma}{dt} = -\\frac{4\\sigma_T}{3 m_e c}(U_B + U_{\\mathrm{CMB}})\\gamma^2\\) for an electron injected with very high initial Lorentz factor \\(\\gamma_0 \\to \\infty\\) at \\(t = 0\\) to find the maximum Lorentz factor \\(\\gamma_{\\mathrm{br}}(t)\\) surviving at age \\(t\\). If radio observations reveal a synchrotron cooling break at \\(\\nu_{\\mathrm{br}} = 5.00\\text{ GHz}\\), determine the spectral age \\(t_{\\mathrm{age}}\\) of the plasma lobe in millions of years (\\(\\text{Myr}\\)). <em>(3.5 points)</em></li>
    <li>At the jet termination shock, relativistic electrons are continuously injected with a power-law energy spectrum \\(Q(E) \\propto E^{-p}\\) with \\(p = 2.40\\). Using the monochromatic approximation where an electron of energy \\(E\\) radiates at \\(\\nu \\propto E^2\\) with power \\(\\propto E^2\\), derive the optically thin flux-density spectral index \\(\\alpha_{\\mathrm{inj}}\\) (defined by \\(F_\\nu \\propto \\nu^{-\\alpha}\\)) below \\(\\nu_{\\mathrm{br}}\\), and show that above \\(\\nu_{\\mathrm{br}}\\) radiative cooling steepens the steady-state integrated lobe spectrum to \\(\\alpha_{\\mathrm{cool}} = \\alpha_{\\mathrm{inj}} + 0.50\\). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Relativistic synchrotron and inverse-Compton energy losses, Kardashev–Pacholczyk spectral aging, and power-law index steepening.</p>

<p><strong>(a) Magnetic vs. CMB Energy Densities &amp; \\(B_{\\mathrm{CMB}}\\) (2.0 points):</strong><br>
For \\(B = 1.50 \\times 10^{-9}\\text{ T}\\) and \\(T_{\\mathrm{CMB}} = 2.725\\text{ K}\\):</p>
<p>$$ U_B = \\frac{B^2}{2\\mu_0} = \\frac{(1.50 \\times 10^{-9})^2}{2(4\\pi \\times 10^{-7})} \\approx \\mathbf{8.952 \\times 10^{-13}\\ \\mathrm{J\\,m^{-3}}} $$</p>
<p>$$ U_{\\mathrm{CMB}} = \\frac{4\\sigma_{\\mathrm{SB}}}{c}T_{\\mathrm{CMB}}^4 = \\frac{4(5.670 \\times 10^{-8})}{2.998 \\times 10^8}(2.725)^4 \\approx \\mathbf{4.171 \\times 10^{-14}\\ \\mathrm{J\\,m^{-3}}} $$</p>
<p>The ratio of inverse-Compton to synchrotron power and the equivalent CMB magnetic field are:</p>
<p>$$ \\frac{P_{\\mathrm{IC}}}{P_{\\mathrm{syn}}} = \\frac{U_{\\mathrm{CMB}}}{U_B} \\approx \\mathbf{0.0466} \\ (4.66\\%), \\qquad B_{\\mathrm{CMB}} = \\sqrt{2\\mu_0 U_{\\mathrm{CMB}}} \\approx 3.24 \\times 10^{-10}\\text{ T} = \\mathbf{3.24\\ \\mu\\mathrm{G}} $$</p>

<p><strong>(b) Lorentz Factor &amp; Electron Energy at \\(\\nu_c = 1.40\\text{ GHz}\\) (2.0 points):</strong><br>
The non-relativistic cyclotron frequency is \\(\\nu_L = \\frac{eB}{2\\pi m_e} = \\frac{(1.6022 \\times 10^{-19})(1.50 \\times 10^{-9})}{2\\pi(9.1094 \\times 10^{-31})} \\approx 41.99\\text{ Hz}\\). From \\(\\nu_c = \\frac{3}{2}\\gamma^2 \\nu_L\\):</p>
<p>$$ \\gamma = \\sqrt{\\frac{2\\nu_c}{3\\nu_L}} = \\sqrt{\\frac{2(1.40 \\times 10^9\\text{ Hz})}{3(41.99\\text{ Hz})}} \\approx \\mathbf{4715} $$</p>
<p>$$ E = \\gamma m_e c^2 = 4715 \\times 0.5110\\text{ MeV} \\approx 2409\\text{ MeV} = \\mathbf{2.41\\text{ GeV}} $$</p>

<p><strong>(c) Radiative Cooling Integration &amp; Spectral Age at \\(\\nu_{\\mathrm{br}} = 5.00\\text{ GHz}\\) (3.5 points):</strong><br>
Writing \\(\\frac{d\\gamma}{dt} = -\\beta_c \\gamma^2\\) where \\(\\beta_c = \\frac{4\\sigma_T(U_B + U_{\\mathrm{CMB}})}{3 m_e c}\\), separating variables \\(-\\gamma^{-2}d\\gamma = \\beta_c\\,dt\\), and integrating from \\(\\gamma_0 \\to \\infty\\) at \\(t = 0\\) to \\(\\gamma_{\\mathrm{br}}\\) at age \\(t\\) gives:</p>
<p>$$ \\frac{1}{\\gamma_{\\mathrm{br}}} - \\frac{1}{\\gamma_0} = \\beta_c t \\implies \\mathbf{\\gamma_{\\mathrm{br}}(t) = \\frac{1}{\\beta_c t} = \\frac{3 m_e c}{4\\sigma_T (U_B + U_{\\mathrm{CMB}})t}} $$</p>
<p>At the break frequency \\(\\nu_{\\mathrm{br}} = 5.00\\text{ GHz}\\), the corresponding Lorentz factor is \\(\\gamma_{\\mathrm{br}} = \\sqrt{\\frac{2(5.00 \\times 10^9)}{3(41.99)}} \\approx 8910\\). With \\(U_{\\mathrm{tot}} = U_B + U_{\\mathrm{CMB}} = 9.369 \\times 10^{-13}\\ \\mathrm{J\\,m^{-3}}\\):</p>
<p>$$ \\beta_c = \\frac{4(6.652 \\times 10^{-29})(9.369 \\times 10^{-13})}{3(9.1094 \\times 10^{-31})(2.998 \\times 10^8)} \\approx 3.043 \\times 10^{-20}\\ \\mathrm{s^{-1}} $$</p>
<p>$$ t_{\\mathrm{age}} = \\frac{1}{\\beta_c \\gamma_{\\mathrm{br}}} = \\frac{1}{(3.043 \\times 10^{-20}\\ \\mathrm{s^{-1}})(8910)} \\approx 3.688 \\times 10^{15}\\text{ s} \\approx \\mathbf{117\\text{ Myr}} $$</p>

<p><strong>(d) Injection Spectral Index \\(\\alpha_{\\mathrm{inj}}\\) &amp; Cooling Steepening \\(\\alpha_{\\mathrm{cool}}\\) (2.5 points):</strong><br>
Below \\(\\nu_{\\mathrm{br}}\\), the electron energy distribution retains the injected power law \\(N(E) \\propto E^{-p}\\). Since \\(\\nu \\propto E^2\\) (\\(dE/d\\nu \\propto \\nu^{-1/2}\\)) and single-electron power scales as \\(P(E) \\propto E^2\\), the emissivity scales as:</p>
<p>$$ F_\\nu \\propto N(E) P(E)\\frac{dE}{d\\nu} \\propto \\left(\\nu^{1/2}\\right)^{-p}\\left(\\nu^{1/2}\\right)^2 \\nu^{-1/2} = \\nu^{-(p - 1)/2} \\implies \\alpha_{\\mathrm{inj}} = \\frac{p - 1}{2} = \\frac{2.40 - 1}{2} = \\mathbf{0.70} $$</p>
<p>Above \\(\\nu_{\\mathrm{br}}\\), continuous injection balanced by radiative cooling (\\(\\frac{\\partial}{\\partial E}[\\dot{E} N(E)] = Q(E) \\propto E^{-p}\\) with \\(\\dot{E} \\propto -E^2\\)) produces a steady-state electron distribution \\(N(E) \\propto \\frac{1}{E^2}\\int_E^\\infty (E')^{-p}dE' \\propto E^{-(p+1)}\\). Increasing the electron index from \\(p\\) to \\(p + 1\\) increases the synchrotron spectral index by \\(\\Delta\\alpha = \\frac{1}{2}\\):</p>
<p>$$ \\alpha_{\\mathrm{cool}} = \\frac{(p + 1) - 1}{2} = \\alpha_{\\mathrm{inj}} + 0.50 = \\mathbf{1.20} $$</p>`
    },

    // Day 32 — 19.11.2026
    {
        uniqueId: "potd_2026_11_19",
        dayNumber: 32,
        scheduledDate: "19.11.2026",
        title: "Chandrasekhar's White Dwarf: Fermi Degeneracy and the Mass–Radius Law",
        author: "Matei",
        module: "T5 & T8 · Degenerate Matter & Compact Remnants",
        difficultyClass: "medium",
        difficultyText: "4.1 / 10.0",
        description: `<p>A carbon-oxygen white dwarf of mass \\(M = 0.70\\,M_\\odot\\) (composed of fully ionized \\({}^{12}\\mathrm{C}\\) and \\({}^{16}\\mathrm{O}\\) nuclei with electron mean molecular weight \\(\\mu_e = A / Z = 2.00\\)) is modeled as a homogeneous sphere of uniform density \\(\\rho\\) supported against gravity by a completely degenerate electron gas. Use \\(\\hbar = 1.0546 \\times 10^{-34}\\ \\mathrm{J\\,s}\\), \\(m_e = 9.1094 \\times 10^{-31}\\text{ kg}\\), \\(m_u = 1.6605 \\times 10^{-27}\\text{ kg}\\), \\(G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), and \\(R_\\oplus = 6371\\text{ km}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>By filling all momentum states up to the Fermi momentum \\(p_F\\) with two electron spin states per phase-space volume \\(h^3 = (2\\pi\\hbar)^3\\), show that \\(p_F = \\hbar(3\\pi^2 n_e)^{1/3}\\), where \\(n_e = \\frac{\\rho}{\\mu_e m_u}\\). Using the pressure integral \\(P = \\frac{1}{3}\\int_0^{p_F} v(p)\\,p\\,\\frac{8\\pi p^2\\,dp}{(2\\pi\\hbar)^3}\\) in the non-relativistic limit (\\(v = p / m_e\\)), prove that:
    $$ P_{\\mathrm{NR}} = \\frac{(3\\pi^2)^{2/3}\\hbar^2}{5 m_e (\\mu_e m_u)^{5/3}}\\rho^{5/3} \\equiv K_{\\mathrm{NR}}\\rho^{5/3} $$ <em>(2.5 points)</em></li>
    <li>Equating \\(P_{\\mathrm{NR}}\\) to the central hydrostatic pressure of a uniform sphere \\(P_c = \\frac{3}{8\\pi}\\frac{G M^2}{R^4}\\), derive the exact symbolic formula for the white dwarf radius \\(R(M)\\), prove that \\(R \\propto M^{-1/3}\\mu_e^{-5/3}\\), and calculate \\(R\\) (in km and Earth radii \\(R_\\oplus\\)) and the density \\(\\rho\\) (in \\(\\mathrm{kg\\,m^{-3}}\\)) for the \\(0.70\\,M_\\odot\\) white dwarf. <em>(3.0 points)</em></li>
    <li>Calculate the electron Fermi kinetic energy \\(E_F = \\frac{p_F^2}{2m_e}\\) (in \\(\\text{keV}\\)) and Fermi temperature \\(T_F = E_F / k_B\\). If the white dwarf's interior has an isothermal temperature of \\(T_c = 1.50 \\times 10^7\\text{ K}\\), calculate the ratio \\(T_F / T_c\\) to verify whether the zero-temperature degeneracy approximation is valid. <em>(2.0 points)</em></li>
    <li>In the ultra-relativistic limit (\\(v \\to c\\)), the electron degeneracy pressure becomes \\(P_{\\mathrm{UR}} = \\frac{(3\\pi^2)^{1/3}\\hbar c}{4(\\mu_e m_u)^{4/3}}\\rho^{4/3}\\). Equate \\(P_{\\mathrm{UR}}\\) to \\(P_c = \\frac{3}{8\\pi}\\frac{G M^2}{R^4}\\) to show that \\(R\\) cancels out completely, and calculate the resulting uniform-density Chandrasekhar limiting mass \\(M_{\\mathrm{Ch}}\\) in solar masses. <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Quantum statistical mechanics of a Fermi-Dirac electron gas, the inverse mass–radius relation of white dwarfs, and the ultra-relativistic Chandrasekhar mass limit.</p>

<p><strong>(a) Fermi Momentum \\(p_F\\) &amp; Non-Relativistic Degeneracy Pressure \\(P_{\\mathrm{NR}}\\) (2.5 points):</strong><br>
Integrating two spin states per phase-space cell \\((2\\pi\\hbar)^3\\) over a sphere in momentum space of radius \\(p_F\\) gives the electron number density:</p>
<p>$$ n_e = 2\\int_0^{p_F} \\frac{4\\pi p^2\\,dp}{(2\\pi\\hbar)^3} = \\frac{p_F^3}{3\\pi^2 \\hbar^3} \\implies \\mathbf{p_F = \\hbar\\left(3\\pi^2 n_e\\right)^{1/3}} $$</p>
<p>Substituting \\(v(p) = p / m_e\\) into the kinetic pressure integral:</p>
<p>$$ P_{\\mathrm{NR}} = \\frac{1}{3}\\int_0^{p_F} \\left(\\frac{p}{m_e}\\right)p\\,\\frac{p^2\\,dp}{\\pi^2 \\hbar^3} = \\frac{p_F^5}{15\\pi^2 m_e \\hbar^3} = \\frac{(3\\pi^2)^{2/3}\\hbar^2}{5 m_e}n_e^{5/3} = \\mathbf{\\frac{(3\\pi^2)^{2/3}\\hbar^2}{5 m_e (\\mu_e m_u)^{5/3}}\\rho^{5/3}} $$</p>
<p>For \\(\\mu_e = 2.00\\), \\(K_{\\mathrm{NR}} = \\frac{(3\\pi^2)^{2/3}(1.0546 \\times 10^{-34})^2}{5(9.1094 \\times 10^{-31})(2.00 \\times 1.6605 \\times 10^{-27})^{5/3}} \\approx 3.122 \\times 10^6\\ \\mathrm{Pa\\,m^5\\,kg^{-5/3}}\\).</p>

<p><strong>(b) Mass–Radius Law \\(R(M)\\) &amp; Numerical Radius of a \\(0.70\\,M_\\odot\\) White Dwarf (3.0 points):</strong><br>
Substituting \\(\\rho = \\frac{3M}{4\\pi R^3}\\) into \\(K_{\\mathrm{NR}}\\rho^{5/3} = \\frac{3}{8\\pi}\\frac{G M^2}{R^4}\\) gives \\(K_{\\mathrm{NR}}\\left(\\frac{3M}{4\\pi}\\right)^{5/3} R^{-5} = \\frac{3 G M^2}{8\\pi} R^{-4}\\). Solving for \\(R\\):</p>
<p>$$ R(M) = \\left(\\frac{9\\pi}{4}\\right)^{2/3}\\frac{\\hbar^2}{5 G m_e (\\mu_e m_u)^{5/3}} M^{-1/3} \\propto \\mathbf{M^{-1/3}\\mu_e^{-5/3}} $$</p>
<p>Evaluating for \\(M = 0.70\\,M_\\odot = 1.392 \\times 10^{30}\\text{ kg}\\):</p>
<p>$$ R = \\frac{8\\pi K_{\\mathrm{NR}}}{3 G}\\left(\\frac{3}{4\\pi}\\right)^{5/3} M^{-1/3} \\approx 7.91 \\times 10^6\\text{ m} = \\mathbf{7910\\text{ km}} \\approx \\mathbf{1.24\\,R_\\oplus} $$</p>
<p>$$ \\rho = \\frac{3M}{4\\pi R^3} = \\frac{3(1.392 \\times 10^{30}\\text{ kg})}{4\\pi(7.91 \\times 10^6\\text{ m})^3} \\approx \\mathbf{6.72 \\times 10^8\\ \\mathrm{kg\\,m^{-3}}} = 6.72 \\times 10^5\\ \\mathrm{g\\,cm^{-3}} $$</p>

<p><strong>(c) Fermi Energy \\(E_F\\), Fermi Temperature \\(T_F\\) &amp; Degeneracy Check (2.0 points):</strong><br>
With \\(n_e = \\frac{\\rho}{\\mu_e m_u} = \\frac{6.72 \\times 10^8}{2.00 \\times 1.6605 \\times 10^{-27}} \\approx 2.023 \\times 10^{35}\\ \\mathrm{m^{-3}}\\):</p>
<p>$$ p_F = \\hbar(3\\pi^2 n_e)^{1/3} \\approx 1.916 \\times 10^{-22}\\ \\mathrm{kg\\,m\\,s^{-1}} $$</p>
<p>$$ E_F = \\frac{p_F^2}{2m_e} \\approx 2.016 \\times 10^{-14}\\text{ J} \\approx \\mathbf{125.8\\text{ keV}}, \\qquad T_F = \\frac{E_F}{k_B} \\approx \\mathbf{1.46 \\times 10^9\\text{ K}} $$</p>
<p>Comparing with \\(T_c = 1.50 \\times 10^7\\text{ K}\\) gives \\(\\frac{T_F}{T_c} = \\frac{1.46 \\times 10^9}{1.50 \\times 10^7} \\approx \\mathbf{97.3 \\gg 1}\\), confirming that the electron gas is deeply degenerate.</p>

<p><strong>(d) Ultra-Relativistic Limit &amp; Chandrasekhar Mass \\(M_{\\mathrm{Ch}}\\) (2.5 points):</strong><br>
Substituting \\(\\rho = \\frac{3M}{4\\pi R^3}\\) into \\(P_{\\mathrm{UR}}\\):
$$ P_{\\mathrm{UR}} = \\frac{(3\\pi^2)^{1/3}\\hbar c}{4(\\mu_e m_u)^{4/3}}\\left(\\frac{3M}{4\\pi}\\right)^{4/3} R^{-4} = \\frac{3}{8\\pi}\\frac{G M_{\\mathrm{Ch}}^2}{R^4} $$
Both sides scale as \\(R^{-4}\\), so \\(R\\) cancels identically! Solving for \\(M_{\\mathrm{Ch}}\\):</p>
<p>$$ M_{\\mathrm{Ch}} = \\frac{3\\sqrt{\\pi}}{2}\\left(\\frac{\\hbar c}{G}\\right)^{3/2}\\frac{1}{(\\mu_e m_u)^2} \\approx 2.866 \\times 10^{30}\\text{ kg} \\approx \\mathbf{1.44\\,M_\\odot} $$</p>`
    },

    // Day 33 — 20.11.2026
    {
        uniqueId: "potd_2026_11_20",
        dayNumber: 33,
        scheduledDate: "20.11.2026",
        title: "Solar Neutrino Flux, Matter-Enhanced Oscillations, and the Borexino Detector",
        author: "Matei",
        module: "T5 & T7 · Nuclear Astrophysics & Solar Interior",
        difficultyClass: "easy",
        difficultyText: "3.4 / 10.0",
        description: `<p>The Sun (\\(L_\\odot = 3.828 \\times 10^{26}\\text{ W}\\), mean Earth–Sun distance \\(d_0 = 1.000\\text{ AU} = 1.496 \\times 10^{11}\\text{ m}\\)) is powered primarily by the proton–proton (\\(pp\\)) fusion chain, whose net reaction is:</p>
<p>$$ 4\\,{}^1\\mathrm{H} + 2\\,e^- \\longrightarrow {}^4\\mathrm{He} + 2\\,\\nu_e + 26.73\\text{ MeV} $$</p>
<p>Of the \\(Q_{\\mathrm{tot}} = 26.73\\text{ MeV}\\) released per \\({}^4\\mathrm{He}\\) nucleus formed, the two electron neutrinos carry away an average combined energy of \\(\\langle E_{2\\nu} \\rangle = 0.53\\text{ MeV}\\) directly into space, while the remaining \\(Q_{\\mathrm{th}} = 26.20\\text{ MeV}\\) is thermalized as photon luminosity \\(L_\\odot\\). Use \\(1\\text{ MeV} = 1.6022 \\times 10^{-13}\\text{ J}\\), \\(m_u = 1.6605 \\times 10^{-27}\\text{ kg}\\), and \\(N_A = 6.0221 \\times 10^{23}\\ \\mathrm{mol^{-1}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the number of \\({}^4\\mathrm{He}\\) nuclei synthesized per second in the solar core, the total solar neutrino luminosity \\(L_\\nu\\) (in Watts and units of \\(L_\\odot\\)), and the total solar neutrino flux \\(\\Phi_\\nu\\) at \\(d_0 = 1.000\\text{ AU}\\) (in \\(\\mathrm{cm^{-2}\\,s^{-1}}\\)). <em>(2.5 points)</em></li>
    <li>Given a neutrino–electron elastic scattering cross-section of \\(\\sigma_\\nu = 1.15 \\times 10^{-45}\\ \\mathrm{cm^2}\\), calculate the neutrino mean free path \\(\\ell_\\nu = \\frac{1}{n_e \\sigma_\\nu}\\) (in light-years) at the center of the Sun (\\(\\rho_c = 1.50 \\times 10^5\\ \\mathrm{kg\\,m^{-3}}\\), electron mean molecular weight \\(\\mu_e = 1.43\\)). Compare the neutrino escape time \\(R_\\odot / c\\) with the random-walk diffusion time \\(t_{\\mathrm{diff}} = \\frac{R_\\odot^2}{\\ell_{\\mathrm{ph}} c}\\) (in years) of a photon whose mean free path is \\(\\ell_{\\mathrm{ph}} = 0.50\\text{ mm}\\). <em>(2.5 points)</em></li>
    <li>An underground liquid-scintillator detector contains a fiducial target mass \\(M_{\\mathrm{det}} = 300\\text{ metric tons}\\) (\\(3.00 \\times 10^5\\text{ kg}\\)) of ultrapure pseudocumene (\\(\\mathrm{C_9 H_{12}}\\), molar mass \\(M_{\\mathrm{mol}} = 120.19\\ \\mathrm{g\\,mol^{-1}}\\), \\(66\\) electrons per molecule). Accounting for neutrino flavor oscillations with an effective \\(\\nu_e\\) survival probability \\(P_{ee} = 0.550\\) and neglecting \\(\\nu_{\\mu,\\tau}\\) scattering, calculate the expected number of neutrino scattering events per day in the detector. <em>(3.0 points)</em></li>
    <li>Because Earth's orbit has eccentricity \\(e = 0.0167\\), the observed solar neutrino rate varies annually between perihelion and aphelion. Calculate the ratio \\(\\Phi_{\\nu,\\max} / \\Phi_{\\nu,\\min}\\) and the peak-to-trough percentage variation \\(\\frac{\\Phi_{\\nu,\\max} - \\Phi_{\\nu,\\min}}{\\Phi_\\nu(d_0)} \\times 100\\%\\). <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Solar nuclear energetics, neutrino vs. photon transport timescales, underground scintillation event rates, and seasonal orbital eccentricity modulation.</p>

<p><strong>(a) Helium Production Rate, Neutrino Luminosity &amp; Solar Neutrino Flux (2.5 points):</strong><br>
Each \\({}^4\\mathrm{He}\\) synthesis deposits \\(Q_{\\mathrm{th}} = 26.20\\text{ MeV} = 4.1977 \\times 10^{-12}\\text{ J}\\) of thermal photon energy:</p>
<p>$$ \\dot{N}_{\\mathrm{He}} = \\frac{L_\\odot}{Q_{\\mathrm{th}}} = \\frac{3.828 \\times 10^{26}\\text{ W}}{4.1977 \\times 10^{-12}\\text{ J}} \\approx \\mathbf{9.119 \\times 10^{37}\\ \\mathrm{nuclei\\,s^{-1}}} $$</p>
<p>Since \\(2\\) neutrinos are emitted per \\({}^4\\mathrm{He}\\) nucleus (\\(\\dot{N}_\\nu = 2\\dot{N}_{\\mathrm{He}} = 1.824 \\times 10^{38}\\ \\mathrm{s^{-1}}\\)):</p>
<p>$$ L_\\nu = \\dot{N}_{\\mathrm{He}} \\langle E_{2\\nu} \\rangle = L_\\odot \\left(\\frac{0.53\\text{ MeV}}{26.20\\text{ MeV}}\\right) \\approx \\mathbf{7.74 \\times 10^{24}\\text{ W}} \\approx \\mathbf{0.0202\\,L_\\odot} $$</p>
<p>At \\(d_0 = 1.000\\text{ AU} = 1.496 \\times 10^{13}\\text{ cm}\\), the total neutrino flux is:</p>
<p>$$ \\Phi_\\nu = \\frac{\\dot{N}_\\nu}{4\\pi d_0^2} = \\frac{1.824 \\times 10^{38}\\ \\mathrm{s^{-1}}}{4\\pi(1.496 \\times 10^{13}\\text{ cm})^2} \\approx \\mathbf{6.48 \\times 10^{10}\\ \\mathrm{cm^{-2}\\,s^{-1}}} $$</p>

<p><strong>(b) Neutrino Mean Free Path vs. Photon Random-Walk Diffusion Time (2.5 points):</strong><br>
At the solar center, the electron number density is \\(n_e = \\frac{\\rho_c}{\\mu_e m_u} = \\frac{150\\ \\mathrm{g\\,cm^{-3}}}{1.43 \\times 1.6605 \\times 10^{-24}\\text{ g}} \\approx 6.317 \\times 10^{25}\\ \\mathrm{cm^{-3}}\\):</p>
<p>$$ \\ell_\\nu = \\frac{1}{n_e \\sigma_\\nu} = \\frac{1}{(6.317 \\times 10^{25}\\ \\mathrm{cm^{-3}})(1.15 \\times 10^{-45}\\ \\mathrm{cm^2})} \\approx 1.377 \\times 10^{19}\\text{ cm} \\approx \\mathbf{14.55\\text{ light-years}} $$</p>
<p>Neutrinos stream freely out of the Sun in \\(t_\\nu = R_\\odot / c = \\frac{6.957 \\times 10^8\\text{ m}}{2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}} \\approx \\mathbf{2.32\\text{ s}}\\), whereas photons with \\(\\ell_{\\mathrm{ph}} = 5.0 \\times 10^{-4}\\text{ m}\\) require:</p>
<p>$$ t_{\\mathrm{diff}} = \\frac{R_\\odot^2}{\\ell_{\\mathrm{ph}} c} = \\frac{(6.957 \\times 10^8\\text{ m})^2}{(5.0 \\times 10^{-4}\\text{ m})(2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}})} \\approx 3.229 \\times 10^{12}\\text{ s} \\approx \\mathbf{1.02 \\times 10^5\\text{ years}} $$</p>

<p><strong>(c) Daily Event Rate in the \\(300\\text{-ton}\\) Scintillator Detector (3.0 points):</strong><br>
The total number of target electrons in \\(M_{\\mathrm{det}} = 3.00 \\times 10^8\\text{ g}\\) of \\(\\mathrm{C_9 H_{12}}\\) is:</p>
<p>$$ N_{e,\\mathrm{det}} = 66 \\times \\frac{M_{\\mathrm{det}}}{M_{\\mathrm{mol}}} N_A = 66 \\times \\frac{3.00 \\times 10^8\\text{ g}}{120.19\\ \\mathrm{g\\,mol^{-1}}} \\times 6.0221 \\times 10^{23}\\ \\mathrm{mol^{-1}} \\approx 9.921 \\times 10^{31}\\text{ electrons} $$</p>
<p>Over \\(\\Delta t = 1\\text{ day} = 86,400\\text{ s}\\), the number of detected \\(\\nu_e\\) interactions is:</p>
<p>$$ \\mathcal{N}_{\\mathrm{day}} = N_{e,\\mathrm{det}} \\left(P_{ee} \\Phi_\\nu\\right) \\sigma_\\nu \\Delta t = (9.921 \\times 10^{31})(0.550 \\times 6.484 \\times 10^{10})(1.15 \\times 10^{-45})(86,400) \\approx \\mathbf{351\\text{ events/day}} $$</p>

<p><strong>(d) Annual Eccentricity Modulation (2.0 points):</strong><br>
Since \\(\\Phi_\\nu(r) \\propto r^{-2}\\) with \\(r_{\\min} = d_0(1 - e)\\) and \\(r_{\\max} = d_0(1 + e)\\):</p>
<p>$$ \\frac{\\Phi_{\\nu,\\max}}{\\Phi_{\\nu,\\min}} = \\left(\\frac{1 + e}{1 - e}\\right)^2 = \\left(\\frac{1.0167}{0.9833}\\right)^2 \\approx \\mathbf{1.0691} $$</p>
<p>$$ \\frac{\\Phi_{\\nu,\\max} - \\Phi_{\\nu,\\min}}{\\Phi_\\nu(d_0)} \\times 100\\% = \\left[\\frac{1}{(1 - e)^2} - \\frac{1}{(1 + e)^2}\\right]\\times 100\\% \\simeq 4e \\times 100\\% \\approx \\mathbf{6.68\\%} $$</p>`
    },

    // Day 34 — 21.11.2026
    {
        uniqueId: "potd_2026_11_21",
        dayNumber: 34,
        scheduledDate: "21.11.2026",
        title: "Tidal Disruption of a Solar-Type Star by a Supermassive Black Hole",
        author: "Matei",
        module: "T8 & T11 · Black Hole Tidal Dynamics & Transients",
        difficultyClass: "medium",
        difficultyText: "4.4 / 10.0",
        description: `<p>A solar-type main-sequence star of mass \\(M_\\star = 1.00\\,M_\\odot\\) and radius \\(R_\\star = 1.00\\,R_\\odot\\) approaches a supermassive black hole of mass \\(M_{\\mathrm{BH}} = 1.00 \\times 10^6\\,M_\\odot\\) on a parabolic trajectory (specific center-of-mass orbital energy \\(\\epsilon_{\\mathrm{cm}} = 0\\)) with pericenter distance equal to the tidal disruption radius:</p>
<p>$$ r_t = R_\\star\\left(\\frac{M_{\\mathrm{BH}}}{M_\\star}\\right)^{1/3} $$</p>
<p>At pericenter \\(r = r_t\\), the star is torn apart instantaneously ("impulse approximation"), freezing in the spread of gravitational potential energy across the stellar diameter \\(r \\in [r_t - R_\\star, r_t + R_\\star]\\). Use \\(G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), \\(c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}\\), \\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), and \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the tidal disruption radius \\(r_t\\) in solar radii and in units of the black hole's Schwarzschild radius \\(R_S = \\frac{2 G M_{\\mathrm{BH}}}{c^2}\\). By setting \\(r_t = R_S\\), determine the critical Hills mass \\(M_{\\mathrm{Hills}}\\) (in \\(M_\\odot\\)) above which a solar-type star is swallowed whole across the event horizon without producing an external tidal flare. <em>(2.5 points)</em></li>
    <li>By expanding the black hole's gravitational potential \\(\\Phi(r_t \\pm R_\\star) = -\\frac{G M_{\\mathrm{BH}}}{r_t \\pm R_\\star}\\) to first order in \\(R_\\star / r_t \\ll 1\\), show that the tidally stripped stellar debris acquires a specific orbital energy spread \\(-\\Delta\\epsilon \\le \\epsilon \\le +\\Delta\\epsilon\\) with \\(\\Delta\\epsilon = \\frac{G M_{\\mathrm{BH}} R_\\star}{r_t^2} = \\frac{G M_\\star}{R_\\star}\\left(\\frac{M_{\\mathrm{BH}}}{M_\\star}\\right)^{1/3}\\). Calculate \\(\\Delta\\epsilon\\) (in \\(\\mathrm{J\\,kg^{-1}}\\)) and the terminal escape velocity \\(v_\\infty = \\sqrt{2\\Delta\\epsilon}\\) (in \\(\\mathrm{km\\,s^{-1}}\\)) of the fastest unbound debris. <em>(2.5 points)</em></li>
    <li>For the most tightly bound debris stream (with specific energy \\(\\epsilon_{\\min} = -\\Delta\\epsilon\\) and pericenter \\(r_p \\simeq r_t\\)), calculate its orbital semimajor axis \\(a_{\\min}\\) (in \\(\\text{AU}\\)), eccentricity \\(e_{\\min}\\), and minimum fallback time \\(t_{\\min}\\) (one full orbital period back to pericenter, in days). <em>(2.5 points)</em></li>
    <li>Assuming the bound half of the star (\\(M_{\\mathrm{bound}} = \\frac{1}{2}M_\\star\\)) has a uniform distribution of mass per unit specific energy \\(\\frac{dM}{d|\\epsilon|} = \\frac{M_\\star}{2\\Delta\\epsilon}\\), use Kepler's Third Law \\(|\\epsilon| = \\frac{1}{2}\\left(2\\pi G M_{\\mathrm{BH}}\\right)^{2/3} t^{-2/3}\\) to prove that the mass fallback rate obeys \\(\\dot{M}_{\\mathrm{fb}}(t) = \\frac{M_\\star}{3 t_{\\min}}\\left(\\frac{t}{t_{\\min}}\\right)^{-5/3}\\) for \\(t \\ge t_{\\min}\\), and calculate the peak fallback rate \\(\\dot{M}_{\\mathrm{peak}} = \\dot{M}_{\\mathrm{fb}}(t_{\\min})\\) in \\(M_\\odot\\,\\mathrm{yr^{-1}}\\). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Tidal disruption radius vs. event horizon (Hills limit), frozen-in tidal energy spread, and Rees's \\(t^{-5/3}\\) fallback accretion law.</p>

<p><strong>(a) Tidal Disruption Radius \\(r_t\\) &amp; The Hills Mass Limit \\(M_{\\mathrm{Hills}}\\) (2.5 points):</strong><br>
For \\(M_{\\mathrm{BH}} / M_\\star = 10^6\\), the tidal disruption radius is:</p>
<p>$$ r_t = R_\\odot \\left(10^6\\right)^{1/3} = \\mathbf{100\\,R_\\odot} \\approx \\mathbf{6.957 \\times 10^{10}\\text{ m}} \\ (0.465\\text{ AU}) $$</p>
<p>The Schwarzschild radius of the \\(10^6\\,M_\\odot\\) black hole is \\(R_S = \\frac{2 G M_{\\mathrm{BH}}}{c^2} \\approx 2.953 \\times 10^9\\text{ m} \\approx 4.245\\,R_\\odot\\), so:</p>
<p>$$ \\frac{r_t}{R_S} = \\frac{6.957 \\times 10^{10}\\text{ m}}{2.953 \\times 10^9\\text{ m}} \\approx \\mathbf{23.56} $$</p>
<p>Setting \\(r_t = R_S\\) gives \\(R_\\star \\left(\\frac{M_{\\mathrm{Hills}}}{M_\\star}\\right)^{1/3} = \\frac{2 G M_{\\mathrm{Hills}}}{c^2}\\). Solving for \\(M_{\\mathrm{Hills}}\\):</p>
<p>$$ M_{\\mathrm{Hills}} = \\left(\\frac{c^2 R_\\star}{2 G M_\\star^{1/3}}\\right)^{3/2} = M_{\\mathrm{BH}}\\left(\\frac{r_t}{R_S}\\right)^{3/2} = 10^6\\,M_\\odot \\times (23.56)^{1.5} \\approx \\mathbf{1.14 \\times 10^8\\,M_\\odot} $$</p>

<p><strong>(b) Specific Energy Spread \\(\\Delta\\epsilon\\) &amp; Unbound Escape Velocity \\(v_\\infty\\) (2.5 points):</strong><br>
Since the star's center of mass has \\(\\epsilon_{\\mathrm{cm}} = \\frac{1}{2}v_p^2 - \\frac{G M_{\\mathrm{BH}}}{r_t} = 0\\), fluid elements at \\(r = r_t \\mp R_\\star\\) moving at \\(v_p\\) have specific energy:</p>
<p>$$ \\epsilon = \\frac{1}{2}v_p^2 - \\frac{G M_{\\mathrm{BH}}}{r_t \\mp R_\\star} \\simeq \\mp \\frac{G M_{\\mathrm{BH}} R_\\star}{r_t^2} = \\mp \\frac{G M_\\star}{R_\\star}\\left(\\frac{M_{\\mathrm{BH}}}{M_\\star}\\right)^{1/3} $$</p>
<p>Evaluating numerically with \\(\\frac{G M_\\odot}{R_\\odot} = 1.9076 \\times 10^{11}\\ \\mathrm{J\\,kg^{-1}}\\) and \\((M_{\\mathrm{BH}}/M_\\star)^{1/3} = 100\\):</p>
<p>$$ \\Delta\\epsilon = 100 \\times 1.9076 \\times 10^{11}\\ \\mathrm{J\\,kg^{-1}} = \\mathbf{1.908 \\times 10^{13}\\ \\mathrm{J\\,kg^{-1}}} $$</p>
<p>$$ v_\\infty = \\sqrt{2\\Delta\\epsilon} = \\sqrt{2(1.908 \\times 10^{13})}\\ \\mathrm{m\\,s^{-1}} \\approx \\mathbf{6177\\ \\mathrm{km\\,s^{-1}}} $$</p>

<p><strong>(c) Semimajor Axis \\(a_{\\min}\\), Eccentricity \\(e_{\\min}\\) &amp; Minimum Fallback Time \\(t_{\\min}\\) (2.5 points):</strong><br>
For the most tightly bound debris stream (\\(\\epsilon_{\\min} = -\\Delta\\epsilon = -\\frac{G M_{\\mathrm{BH}}}{2 a_{\\min}}\\)):</p>
<p>$$ a_{\\min} = \\frac{G M_{\\mathrm{BH}}}{2\\Delta\\epsilon} = \\frac{r_t^2}{2 R_\\star} = \\frac{1}{2}R_\\star\\left(\\frac{M_{\\mathrm{BH}}}{M_\\star}\\right)^{2/3} = 5000\\,R_\\odot \\approx \\mathbf{23.25\\text{ AU}} \\ (3.479 \\times 10^{12}\\text{ m}) $$</p>
<p>$$ e_{\\min} = 1 - \\frac{r_t}{a_{\\min}} = 1 - 2\\left(\\frac{M_\\star}{M_{\\mathrm{BH}}}\\right)^{1/3} = 1 - 0.0200 = \\mathbf{0.9800} $$</p>
<p>By Kepler's Third Law around the \\(10^6\\,M_\\odot\\) black hole:</p>
<p>$$ t_{\\min} = 2\\pi\\sqrt{\\frac{a_{\\min}^3}{G M_{\\mathrm{BH}}}} = \\frac{\\pi}{\\sqrt{2}}\\left(\\frac{M_{\\mathrm{BH}}}{M_\\star}\\right)^{1/2}\\sqrt{\\frac{R_\\star^3}{G M_\\star}} \\approx 3.543 \\times 10^6\\text{ s} \\approx \\mathbf{41.0\\text{ days}} $$</p>

<p><strong>(d) Derivation of the \\(t^{-5/3}\\) Fallback Law &amp; Peak Accretion Rate (2.5 points):</strong><br>
Differentiating \\(|\\epsilon|(t) = \\Delta\\epsilon\\left(\\frac{t}{t_{\\min}}\\right)^{-2/3}\\) with respect to \\(t\\) gives \\(\\left|\\frac{d|\\epsilon|}{dt}\\right| = \\frac{2\\Delta\\epsilon}{3 t_{\\min}}\\left(\\frac{t}{t_{\\min}}\\right)^{-5/3}\\). By the chain rule:</p>
<p>$$ \\dot{M}_{\\mathrm{fb}}(t) = \\frac{dM}{d|\\epsilon|}\\left|\\frac{d|\\epsilon|}{dt}\\right| = \\left(\\frac{M_\\star}{2\\Delta\\epsilon}\\right)\\left[\\frac{2\\Delta\\epsilon}{3 t_{\\min}}\\left(\\frac{t}{t_{\\min}}\\right)^{-5/3}\\right] = \\mathbf{\\frac{M_\\star}{3 t_{\\min}}\\left(\\frac{t}{t_{\\min}}\\right)^{-5/3}} $$</p>
<p>At \\(t = t_{\\min} = 41.00\\text{ days} = 0.11226\\text{ yr}\\), the peak fallback rate is:</p>
<p>$$ \\dot{M}_{\\mathrm{peak}} = \\frac{M_\\star}{3 t_{\\min}} = \\frac{1.00\\,M_\\odot}{3(0.11226\\text{ yr})} \\approx \\mathbf{2.97\\,M_\\odot\\,\\mathrm{yr^{-1}}} $$</p>`
    },

    // Day 35 — 22.11.2026
    {
        uniqueId: "potd_2026_11_22",
        dayNumber: 35,
        scheduledDate: "22.11.2026",
        title: "Acoustic Horizons and Transonic Parker Wind of the Solar Corona",
        author: "Matei",
        module: "T5 · Solar Physics & Magnetohydrodynamic Winds",
        difficultyClass: "medium",
        difficultyText: "4.6 / 10.0",
        description: `<p>Eugene Parker (1958) demonstrated that an extended, hot solar corona cannot remain in static pressure balance with the interstellar medium and must instead expand into a transonic stellar wind. Model the solar corona as a steady, spherically symmetric, isothermal, fully ionized pure hydrogen outflow at temperature \\(T_0 = 1.50 \\times 10^6\\text{ K}\\) (mean molecular weight \\(\\mu = 0.50\\)) around the Sun (\\(M_\\odot = 1.989 \\times 10^{30}\\text{ kg}\\), \\(R_\\odot = 6.957 \\times 10^8\\text{ m}\\)). Use \\(k_B = 1.3806 \\times 10^{-23}\\ \\mathrm{J\\,K^{-1}}\\), \\(m_H = 1.6736 \\times 10^{-27}\\text{ kg}\\), \\(G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), and \\(1\\text{ AU} = 1.496 \\times 10^{11}\\text{ m} = 215.0\\,R_\\odot\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the isothermal sound speed \\(c_s = \\sqrt{\\frac{k_B T_0}{\\mu m_H}}\\) in \\(\\mathrm{km\\,s^{-1}}\\). By combining steady-state spherical mass continuity \\(\\dot{M}_w = 4\\pi r^2 \\rho(r)v(r) = \\text{const.}\\) with the radial Euler momentum equation \\(v\\frac{dv}{dr} = -\\frac{1}{\\rho}\\frac{dP}{dr} - \\frac{G M_\\odot}{r^2}\\) (where \\(P = \\rho c_s^2\\)), derive Parker's wind equation:
    $$ \\left(v^2 - c_s^2\\right)\\frac{1}{v}\\frac{dv}{dr} = \\frac{2 c_s^2}{r} - \\frac{G M_\\odot}{r^2} $$ <em>(2.5 points)</em></li>
    <li>Explain why a smooth transonic acceleration from subsonic (\\(v < c_s\\)) at the coronal base to supersonic (\\(v > c_s\\)) at large radii requires the flow to pass through a critical sonic point \\((r_c, c_s)\\), and calculate the sonic radius \\(r_c\\) in solar radii \\(R_\\odot\\). <em>(2.0 points)</em></li>
    <li>Integrate Parker's differential equation with the boundary condition \\(v(r_c) = c_s\\) to show that the Mach number \\(\\mathcal{M}(r) \\equiv v(r) / c_s\\) satisfies:
    $$ \\mathcal{M}^2 - \\ln\\!\\left(\\mathcal{M}^2\\right) = 4\\ln\\!\\left(\\frac{r}{r_c}\\right) + 4\\frac{r_c}{r} - 3 $$
    Hence determine the radial outflow velocity \\(v_0\\) at the coronal base (\\(r = R_\\odot\\)) and the supersonic solar wind velocity \\(v_\\oplus\\) at Earth's orbit (\\(r = 1.00\\text{ AU} = 215.0\\,R_\\odot\\)). <em>(3.0 points)</em></li>
    <li>Spacecraft at \\(r = 1.00\\text{ AU}\\) measure a solar wind proton number density of \\(n_p = 6.00\\ \\mathrm{cm^{-3}}\\). Calculate the Sun's mass-loss rate \\(\\dot{M}_w\\) (in \\(\\mathrm{kg\\,s^{-1}}\\) and \\(M_\\odot\\,\\mathrm{yr^{-1}}\\)), and estimate the heliospheric termination-shock distance \\(R_{\\mathrm{TS}}\\) (in \\(\\text{AU}\\), assuming \\(v \\simeq v_\\oplus\\) at large \\(r\\)) where the wind ram pressure \\(P_{\\mathrm{ram}}(r) = \\rho(r)v^2\\) balances the local interstellar medium pressure \\(P_{\\mathrm{ISM}} = 1.20 \\times 10^{-13}\\text{ Pa}\\). <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Hydrodynamic Parker wind equations, transonic critical point regularity, transcendental Mach profile, and heliospheric ram-pressure confinement.</p>

<p><strong>(a) Isothermal Sound Speed \\(c_s\\) &amp; Derivation of Parker's Equation (2.5 points):</strong><br>
For \\(T_0 = 1.50 \\times 10^6\\text{ K}\\) and \\(\\mu = 0.50\\):</p>
<p>$$ c_s = \\sqrt{\\frac{k_B T_0}{\\mu m_H}} = \\sqrt{\\frac{(1.3806 \\times 10^{-23})(1.50 \\times 10^6)}{0.50(1.6736 \\times 10^{-27})}} \\approx \\mathbf{157.3\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>Taking the logarithmic derivative of \\(4\\pi r^2 \\rho v = \\text{const.}\\) gives \\(\\frac{1}{\\rho}\\frac{d\\rho}{dr} = -\\frac{2}{r} - \\frac{1}{v}\\frac{dv}{dr}\\). Substituting \\(\\frac{1}{\\rho}\\frac{dP}{dr} = \\frac{c_s^2}{\\rho}\\frac{d\\rho}{dr} = -\\frac{2 c_s^2}{r} - \\frac{c_s^2}{v}\\frac{dv}{dr}\\) into Euler's momentum equation yields:</p>
<p>$$ v\\frac{dv}{dr} = \\frac{2 c_s^2}{r} + \\frac{c_s^2}{v}\\frac{dv}{dr} - \\frac{G M_\\odot}{r^2} \\implies \\mathbf{\\left(v^2 - c_s^2\\right)\\frac{1}{v}\\frac{dv}{dr} = \\frac{2 c_s^2}{r} - \\frac{G M_\\odot}{r^2}} $$</p>

<p><strong>(b) Sonic Critical Radius \\(r_c\\) (2.0 points):</strong><br>
At the sonic transition where \\(v = c_s\\), the left-hand side of Parker's equation vanishes. For the velocity gradient \\(\\frac{dv}{dr}\\) to remain finite and continuous (avoiding an unphysical infinite acceleration), the right-hand side must vanish at the exact same radius \\(r = r_c\\):</p>
<p>$$ \\frac{2 c_s^2}{r_c} - \\frac{G M_\\odot}{r_c^2} = 0 \\implies r_c = \\frac{G M_\\odot}{2 c_s^2} = \\frac{(6.674 \\times 10^{-11})(1.989 \\times 10^{30})}{2(1.573 \\times 10^5)^2} \\approx 2.681 \\times 10^9\\text{ m} \\approx \\mathbf{3.85\\,R_\\odot} $$</p>

<p><strong>(c) Integration of the Transcendental Profile, \\(v_0\\) at \\(R_\\odot\\) &amp; \\(v_\\oplus\\) at \\(1\\text{ AU}\\) (3.0 points):</strong><br>
Rewriting Parker's equation in terms of \\(\\mathcal{M} = v / c_s\\) and \\(r_c = G M_\\odot / (2 c_s^2)\\):</p>
<p>$$ \\left(2\\mathcal{M} - \\frac{2}{\\mathcal{M}}\\right)d\\mathcal{M} = \\left(\\frac{4}{r} - \\frac{4 r_c}{r^2}\\right)dr $$</p>
<p>Integrating from \\((r_c, 1)\\) to \\((r, \\mathcal{M})\\) immediately gives \\(\\mathcal{M}^2 - 1 - \\ln(\\mathcal{M}^2) = 4\\ln(r/r_c) + 4(r_c/r) - 4\\), or:</p>
<p>$$ \\mathcal{M}^2 - \\ln\\!\\left(\\mathcal{M}^2\\right) = 4\\ln\\!\\left(\\frac{r}{r_c}\\right) + 4\\frac{r_c}{r} - 3 $$</p>
<ul>
    <li><strong>At the coronal base (\\(r = R_\\odot,\\ r/r_c = 0.2595\\)):</strong> The right-hand side is \\(4\\ln(0.2595) + 4(3.854) - 3 = 7.019\\). Since \\(\\mathcal{M}_0 \\ll 1\\), \\(-2\\ln\\mathcal{M}_0 \\simeq 7.019 \\implies \\mathcal{M}_0 \\approx e^{-3.509} \\approx 0.0299\\), giving:
    $$ v_0 = 0.0299\\,c_s \\approx \\mathbf{4.70\\ \\mathrm{km\\,s^{-1}}} $$</li>
    <li><strong>At Earth's orbit (\\(r = 1.00\\text{ AU} = 215.0\\,R_\\odot,\\ r/r_c = 55.79\\)):</strong> The right-hand side is \\(4\\ln(55.79) + 4(0.01792) - 3 = 13.158\\). Solving \\(\\mathcal{M}_\\oplus^2 - 2\\ln\\mathcal{M}_\\oplus = 13.158\\) numerically yields \\(\\mathcal{M}_\\oplus \\approx 3.991\\), so:
    $$ v_\\oplus = 3.991\\,c_s \\approx \\mathbf{628\\ \\mathrm{km\\,s^{-1}}} $$</li>
</ul>

<p><strong>(d) Solar Mass-Loss Rate \\(\\dot{M}_w\\) &amp; Termination-Shock Distance \\(R_{\\mathrm{TS}}\\) (2.5 points):</strong><br>
At \\(1.00\\text{ AU}\\), \\(\\rho_\\oplus = n_p m_H = (6.00 \\times 10^6\\ \\mathrm{m^{-3}})(1.6736 \\times 10^{-27}\\text{ kg}) = 1.004 \\times 10^{-20}\\ \\mathrm{kg\\,m^{-3}}\\):</p>
<p>$$ \\dot{M}_w = 4\\pi (1.496 \\times 10^{11}\\text{ m})^2 (1.004 \\times 10^{-20}\\ \\mathrm{kg\\,m^{-3}})(6.278 \\times 10^5\\ \\mathrm{m\\,s^{-1}}) \\approx \\mathbf{1.77 \\times 10^9\\ \\mathrm{kg\\,s^{-1}}} \\approx \\mathbf{2.82 \\times 10^{-14}\\,M_\\odot\\,\\mathrm{yr^{-1}}} $$</p>
<p>The wind ram pressure at \\(1\\text{ AU}\\) is \\(P_{\\mathrm{ram}}(1\\text{ AU}) = \\rho_\\oplus v_\\oplus^2 \\approx 3.96 \\times 10^{-9}\\text{ Pa}\\). Since \\(P_{\\mathrm{ram}}(r) \\propto r^{-2}\\) at large \\(r\\):</p>
<p>$$ R_{\\mathrm{TS}} = 1.00\\text{ AU}\\times\\sqrt{\\frac{P_{\\mathrm{ram}}(1\\text{ AU})}{P_{\\mathrm{ISM}}}} = \\sqrt{\\frac{3.96 \\times 10^{-9}\\text{ Pa}}{1.20 \\times 10^{-13}\\text{ Pa}}}\\text{ AU} \\approx \\mathbf{182\\text{ AU}} $$</p>`
    },

    // Day 36 — 23.11.2026
    {
        uniqueId: "potd_2026_11_23",
        dayNumber: 36,
        scheduledDate: "23.11.2026",
        title: "Oort's Differential Rotation and the Local Milky Way Mass Profile",
        author: "Matei",
        module: "T10 · Galactic Structure & Differential Rotation",
        difficultyClass: "easy",
        difficultyText: "3.2 / 10.0",
        description: `<p>Radio and astrometric surveys map the differential rotation of the Milky Way disk around the Galactic center. At the solar Galactocentric distance $R_0 = 8.20\\text{ kpc}$, the locally measured Oort constants are:</p>
<p>$$ A = 15.3\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}, \\qquad B = -11.9\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}} $$</p>
<p>Assume circular, coplanar Galactic orbits and spherical symmetry when estimating enclosed gravitational mass. Use $G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}$, $M_\\odot = 1.989 \\times 10^{30}\\text{ kg}$, $c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}$, $1\\text{ kpc} = 3.086 \\times 10^{19}\\text{ m}$, $1\\text{ yr} = 3.15576 \\times 10^7\\text{ s}$, and the proper-motion conversion $v_t\\,[\\mathrm{km\\,s^{-1}}] = 4.7405\\,\\mu_l\\,[\\mathrm{mas\\,yr^{-1}}]\\,d\\,[\\mathrm{kpc}]$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the local circular orbital speed $V_0 = R_0(A - B)$ in $\\mathrm{km\\,s^{-1}}$, the Sun's Galactocentric orbital period $P_0$ in $\\text{Myr}$, and the local rotation-curve gradient $\\left.\\frac{dV}{dR}\\right|_{R_0} = -(A + B)$ in $\\mathrm{km\\,s^{-1}\\,kpc^{-1}}$. <em>(2.5 points)</em></li>
    <li>A giant molecular cloud in the Galactic plane lies at Galactic longitude $l = 35.0^\\circ$ and heliocentric distance $d = 2.00\\text{ kpc}$. Using the small-distance Oort approximations $v_r \\simeq A d \\sin(2l)$ and $v_t \\simeq d\\left(A\\cos(2l) + B\\right)$, compute its radial velocity $v_r$ (in $\\mathrm{km\\,s^{-1}}$), transverse velocity $v_t$ (in $\\mathrm{km\\,s^{-1}}$), and Galactic proper motion $\\mu_l$ (in $\\mathrm{mas\\,yr^{-1}}$). <em>(2.5 points)</em></li>
    <li>Along the line of sight $l = 30.0^\\circ$ ($0^\\circ < l < 90^\\circ$), neutral hydrogen $21\\text{-cm}$ emission (rest wavelength $\\lambda_0 = 21.1061\\text{ cm}$) is detected up to a maximum LSR-corrected redshifted wavelength $\\lambda_{\\max} = 21.1134\\text{ cm}$. Determine the tangent-point Galactocentric radius $R_{\\min} = R_0 \\sin l$ (in $\\text{kpc}$), the maximum radial velocity $v_{r,\\max}$ (in $\\mathrm{km\\,s^{-1}}$), and the circular rotation speed $V(R_{\\min})$ at the tangent point. <em>(3.0 points)</em></li>
    <li>Calculate the total Galactic mass $M(R_{\\min})$ enclosed within $R_{\\min}$ and $M(R_0)$ enclosed within $R_0$ (in $M_\\odot$), and determine the mass ratio $M(R_0)/M(R_{\\min})$. <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Oort constants $A$ and $B$, local Galactic kinematics, $21\\text{-cm}$ tangent-point method, and enclosed dynamical mass.</p>

<p><strong>(a) Local Circular Speed $V_0$, Orbital Period $P_0$ &amp; Slope $\\left.\\frac{dV}{dR}\\right|_{R_0}$ (2.5 points):</strong><br>
From the definitions $A = \\frac{1}{2}\\left(\\frac{V_0}{R_0} - \\left.\\frac{dV}{dR}\\right|_{R_0}\\right)$ and $B = -\\frac{1}{2}\\left(\\frac{V_0}{R_0} + \\left.\\frac{dV}{dR}\\right|_{R_0}\\right)$, we have $A - B = \\frac{V_0}{R_0} = 15.3 - (-11.9) = 27.2\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}$:</p>
<p>$$ V_0 = R_0(A - B) = (8.20\\text{ kpc})(27.2\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}) = \\mathbf{223.0\\ \\mathrm{km\\,s^{-1}}} \\quad (223.04\\ \\mathrm{km\\,s^{-1}}) $$</p>
<p>The orbital period of the Local Standard of Rest around the Galactic center is:</p>
<p>$$ P_0 = \\frac{2\\pi R_0}{V_0} = \\frac{2\\pi (8.20 \\times 3.086 \\times 10^{19}\\text{ m})}{2.2304 \\times 10^5\\ \\mathrm{m\\,s^{-1}}} = 7.129 \\times 10^{15}\\text{ s} \\approx \\mathbf{225.9\\text{ Myr}} $$</p>
<p>The local radial gradient of the rotation curve is:</p>
<p>$$ \\left.\\frac{dV}{dR}\\right|_{R_0} = -(A + B) = -(15.3 - 11.9) = \\mathbf{-3.4\\ \\mathrm{km\\,s^{-1}\\,kpc^{-1}}} $$</p>

<p><strong>(b) Radial Velocity, Transverse Velocity &amp; Proper Motion at $l = 35.0^\\circ$ (2.5 points):</strong><br>
With $2l = 70.0^\\circ$ ($\\sin 70.0^\\circ = 0.93969$, $\\cos 70.0^\\circ = 0.34202$) and $d = 2.00\\text{ kpc}$:</p>
<p>$$ v_r \\simeq A d \\sin(2l) = (15.3)(2.00)(0.93969) \\approx \\mathbf{+28.8\\ \\mathrm{km\\,s^{-1}}} \\quad (28.75\\ \\mathrm{km\\,s^{-1}}) $$</p>
<p>$$ v_t \\simeq d\\left(A\\cos(2l) + B\\right) = 2.00\\left[15.3(0.34202) - 11.9\\right] = 2.00(-6.667) \\approx \\mathbf{-13.3\\ \\mathrm{km\\,s^{-1}}} \\quad (-13.33\\ \\mathrm{km\\,s^{-1}}) $$</p>
<p>Converting the transverse speed to Galactic proper motion $\\mu_l$:</p>
<p>$$ \\mu_l = \\frac{v_t}{4.7405\\,d} = \\frac{-13.334}{4.7405 \\times 2.00} \\approx \\mathbf{-1.41\\ \\mathrm{mas\\,yr^{-1}}} $$</p>

<p><strong>(c) Tangent-Point Radius $R_{\\min}$ &amp; Circular Speed $V(R_{\\min})$ at $l = 30.0^\\circ$ (3.0 points):</strong><br>
In the first quadrant ($0^\\circ < l < 90^\\circ$), the line of sight passes closest to the Galactic center at the tangent point:</p>
<p>$$ R_{\\min} = R_0 \\sin l = 8.20\\text{ kpc} \\times \\sin 30.0^\\circ = \\mathbf{4.10\\text{ kpc}} $$</p>
<p>From the non-relativistic Doppler shift $\\Delta\\lambda = \\lambda_{\\max} - \\lambda_0 = 21.1134 - 21.1061 = 0.0073\\text{ cm}$:</p>
<p>$$ v_{r,\\max} = c\\frac{\\Delta\\lambda}{\\lambda_0} = (2.998 \\times 10^5\\ \\mathrm{km\\,s^{-1}})\\frac{0.0073}{21.1061} \\approx \\mathbf{103.7\\ \\mathrm{km\\,s^{-1}}} \\quad (103.69\\ \\mathrm{km\\,s^{-1}}) $$</p>
<p>At the tangent point, the gas velocity vector points strictly along the line of sight, so $v_{r,\\max} = V(R_{\\min}) - V_0 \\sin l$:</p>
<p>$$ V(R_{\\min}) = v_{r,\\max} + V_0 \\sin 30.0^\\circ = 103.69 + 223.04(0.500) = 103.69 + 111.52 \\approx \\mathbf{215.2\\ \\mathrm{km\\,s^{-1}}} $$</p>

<p><strong>(d) Enclosed Dynamical Masses $M(R_{\\min})$, $M(R_0)$ &amp; Ratio (2.0 points):</strong><br>
Equating centripetal and gravitational acceleration gives $M(R) = \\frac{R V^2(R)}{G}$:</p>
<p>$$ M(R_{\\min}) = \\frac{(4.10 \\times 3.086 \\times 10^{19}\\text{ m})(2.1521 \\times 10^5\\ \\mathrm{m\\,s^{-1}})^2}{6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}} = 8.781 \\times 10^{40}\\text{ kg} \\approx \\mathbf{4.41 \\times 10^{10}\\,M_\\odot} $$</p>
<p>$$ M(R_0) = \\frac{(8.20 \\times 3.086 \\times 10^{19}\\text{ m})(2.2304 \\times 10^5\\ \\mathrm{m\\,s^{-1}})^2}{6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}} = 1.886 \\times 10^{41}\\text{ kg} \\approx \\mathbf{9.48 \\times 10^{10}\\,M_\\odot} $$</p>
<p>$$ \\frac{M(R_0)}{M(R_{\\min})} = \\frac{R_0}{R_{\\min}}\\left(\\frac{V_0}{V(R_{\\min})}\\right)^2 = 2.00\\left(\\frac{223.04}{215.21}\\right)^2 \\approx \\mathbf{2.15} $$</p>`
    },

    // Day 37 — 24.11.2026
    {
        uniqueId: "potd_2026_11_24",
        dayNumber: 37,
        scheduledDate: "24.11.2026",
        title: "Weighted Least-Squares Calibration of the Cepheid Period–Luminosity Law",
        author: "Matei",
        module: "D1 · Data Analysis: Methods & Plotting",
        difficultyClass: "medium",
        difficultyText: "4.2 / 10.0",
        description: `<p>Deep space-telescope photometry of a nearby spiral galaxy yields extinction-corrected apparent $I$-band mean magnitudes $m_I$ and photometric uncertainties $\\sigma_i$ for $N = 6$ classical Cepheid variables:</p>
<table style="width:100%; border-collapse:collapse; margin-top:14px; margin-bottom:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Cepheid</th>
            <th style="padding:8px;">Period $P_i$ (days)</th>
            <th style="padding:8px;">$x_i = \\log_{10}(P_i / 10\\text{ d})$</th>
            <th style="padding:8px;">$m_{I,i}$ (mag)</th>
            <th style="padding:8px;">$\\sigma_i$ (mag)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">C1</td><td style="padding:8px;">5.01</td><td style="padding:8px;">$-0.300$</td><td style="padding:8px;">25.44</td><td style="padding:8px;">0.08</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">C2</td><td style="padding:8px;">7.94</td><td style="padding:8px;">$-0.100$</td><td style="padding:8px;">24.75</td><td style="padding:8px;">0.05</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">C3</td><td style="padding:8px;">10.00</td><td style="padding:8px;">$0.000$</td><td style="padding:8px;">24.53</td><td style="padding:8px;">0.04</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">C4</td><td style="padding:8px;">15.85</td><td style="padding:8px;">$+0.200$</td><td style="padding:8px;">23.85</td><td style="padding:8px;">0.05</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">C5</td><td style="padding:8px;">25.12</td><td style="padding:8px;">$+0.400$</td><td style="padding:8px;">23.33</td><td style="padding:8px;">0.08</td></tr>
        <tr><td style="padding:8px;">C6</td><td style="padding:8px;">39.81</td><td style="padding:8px;">$+0.600$</td><td style="padding:8px;">22.64</td><td style="padding:8px;">0.10</td></tr>
    </tbody>
</table>
<p>We fit the linear Period–Luminosity (Leavitt) relation $m_I(x) = a + b\\,x$ by weighted least squares using the tabulated $x_i$ values and inverse-variance weights $w_i = 1/\\sigma_i^2$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the individual weights $w_i$, the total weight $S_w = \\sum w_i$, the weighted means $\\bar{x}_w = \\frac{\\sum w_i x_i}{S_w}$ and $\\bar{m}_w = \\frac{\\sum w_i m_{I,i}}{S_w}$, and the centered weighted sums $S_{xx} = \\sum w_i (x_i - \\bar{x}_w)^2$ and $S_{xm} = \\sum w_i (x_i - \\bar{x}_w)(m_{I,i} - \\bar{m}_w)$. <em>(2.5 points)</em></li>
    <li>Compute the best-fit slope $b = S_{xm}/S_{xx}$ with its uncertainty $\\sigma_b = S_{xx}^{-1/2}$, the intercept $a = \\bar{m}_w - b\\,\\bar{x}_w$ at $P = 10\\text{ days}$ with its uncertainty $\\sigma_a = \\sqrt{\\frac{1}{S_w} + \\frac{\\bar{x}_w^2}{S_{xx}}}$, and the reduced chi-squared $\\chi_\\nu^2 = \\frac{1}{N - 2}\\sum w_i (m_{I,i} - a - b x_i)^2$. Briefly interpret what the value of $\\chi_\\nu^2$ implies about the linear model and photometric error bars. <em>(3.5 points)</em></li>
    <li>Given the absolute $I$-band zero point $M_I(10\\text{ d}) = -4.90 \\pm 0.04\\text{ mag}$ for a $10\\text{-day}$ Cepheid, calculate the galaxy's distance modulus $\\mu = a - M_I(10\\text{ d})$ and its combined uncertainty $\\sigma_\\mu$, then determine the luminosity distance $D$ and its propagated uncertainty $\\sigma_D$ (both in $\\text{Mpc}$). <em>(2.5 points)</em></li>
    <li>Suppose an uncorrected foreground Galactic extinction of $A_I = 0.12\\text{ mag}$ had remained in every $m_{I,i}$. Calculate the resulting fractional systematic error $\\Delta D / D$ (in percent) and state whether the distance would be overestimated or underestimated. <em>(1.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Inverse-variance weighted linear regression, $\\chi_\\nu^2$ goodness-of-fit diagnostics, distance-modulus error propagation, and extinction systematics.</p>

<p><strong>(a) Statistical Weights, Weighted Means &amp; Centered Sums (2.5 points):</strong><br>
Computing $w_i = 1/\\sigma_i^2$ (in $\\mathrm{mag^{-2}}$) for the six Cepheids gives $w_1 = 156.25$, $w_2 = 400.00$, $w_3 = 625.00$, $w_4 = 400.00$, $w_5 = 156.25$, and $w_6 = 100.00$. Summing across all $N = 6$ stars:</p>
<p>$$ S_w = \\sum_{i=1}^6 w_i = \\mathbf{1837.50\\ \\mathrm{mag^{-2}}}, \\qquad \\sum w_i x_i = 115.625, \\qquad \\sum w_i m_{I,i} = 44655.5625 $$</p>
<p>$$ \\bar{x}_w = \\frac{115.625}{1837.50} = \\mathbf{0.06293}, \\qquad \\bar{m}_w = \\frac{44655.5625}{1837.50} = \\mathbf{24.3023\\text{ mag}} $$</p>
<p>Evaluating the centered weighted sums $S_{xx} = \\sum w_i(x_i - \\bar{x}_w)^2$ and $S_{xm} = \\sum w_i(x_i - \\bar{x}_w)(m_{I,i} - \\bar{m}_w)$:</p>
<p>$$ S_{xx} = \\mathbf{87.787\\ \\mathrm{mag^{-2}}}, \\qquad S_{xm} = \\mathbf{-267.934\\ \\mathrm{mag^{-1}}} $$</p>

<p><strong>(b) Weighted Linear Fit Parameters &amp; Reduced $\\chi_\\nu^2$ (3.5 points):</strong><br>
The best-fit Period–Luminosity slope and its $1\\sigma$ formal uncertainty are:</p>
<p>$$ b = \\frac{S_{xm}}{S_{xx}} = \\frac{-267.934}{87.787} = \\mathbf{-3.052}, \\qquad \\sigma_b = \\frac{1}{\\sqrt{87.787}} = \\mathbf{0.107} \\implies b = \\mathbf{-3.05 \\pm 0.11\\ \\mathrm{mag\\,dex^{-1}}} $$</p>
<p>The intercept at $P = 10\\text{ days}$ ($x = 0$) and its uncertainty are:</p>
<p>$$ a = \\bar{m}_w - b\\,\\bar{x}_w = 24.3023 - (-3.0521)(0.06293) = \\mathbf{24.494\\text{ mag}} $$</p>
<p>$$ \\sigma_a = \\sqrt{\\frac{1}{1837.50} + \\frac{(0.06293)^2}{87.787}} = \\sqrt{5.442 \\times 10^{-4} + 4.511 \\times 10^{-5}} = \\mathbf{0.024\\text{ mag}} \\implies a = \\mathbf{24.494 \\pm 0.024\\text{ mag}} $$</p>
<p>Evaluating the residuals $r_i = m_{I,i} - (a + b x_i)$ gives $r_1 = +0.030$, $r_2 = -0.050$, $r_3 = +0.036$, $r_4 = -0.034$, $r_5 = +0.056$, $r_6 = -0.023\\text{ mag}$, yielding $\\chi^2 = \\sum w_i r_i^2 = 2.930$ for $\\nu = N - 2 = 4$ degrees of freedom:</p>
<p>$$ \\chi_\\nu^2 = \\frac{2.930}{4} = \\mathbf{0.733} $$</p>
<p>Because $\\chi_\\nu^2 \\approx 0.73 \\sim 1$, the linear Leavitt law provides an excellent description of the data and the quoted photometric uncertainties $\\sigma_i$ are realistic (no evidence of underestimated scatter or unaccounted outliers).</p>

<p><strong>(c) Distance Modulus $\\mu$ &amp; Luminosity Distance $D$ (2.5 points):</strong><br>
Combining the fitted intercept with $M_I(10\\text{ d}) = -4.90 \\pm 0.04\\text{ mag}$ in quadrature:</p>
<p>$$ \\mu = a - M_I(10\\text{ d}) = 24.494 - (-4.90) = \\mathbf{29.394\\text{ mag}}, \\qquad \\sigma_\\mu = \\sqrt{0.0243^2 + 0.040^2} = \\mathbf{0.047\\text{ mag}} $$</p>
<p>Converting $\\mu = 5\\log_{10}(D/10\\text{ pc})$ to Megaparsecs and propagating $\\sigma_D = \\frac{\\ln 10}{5} D\\,\\sigma_\\mu$:</p>
<p>$$ D = 10^{(\\mu + 5)/5}\\text{ pc} = 10^{6.8789}\\text{ pc} = \\mathbf{7.57\\text{ Mpc}} \\quad (7.566\\text{ Mpc}) $$</p>
<p>$$ \\sigma_D = \\frac{\\ln 10}{5}(7.566\\text{ Mpc})(0.0468) = \\mathbf{0.16\\text{ Mpc}} \\implies D = \\mathbf{7.57 \\pm 0.16\\text{ Mpc}} $$</p>

<p><strong>(d) Systematic Bias from Uncorrected Extinction $A_I = 0.12\\text{ mag}$ (1.5 points):</strong><br>
Uncorrected extinction makes every Cepheid appear fainter by $\\Delta m_I = +A_I = +0.12\\text{ mag}$, shifting the inferred distance modulus upward by $\\Delta\\mu = +0.12\\text{ mag}$. The inferred distance is therefore <strong>overestimated</strong> by:</p>
<p>$$ \\frac{\\Delta D}{D} = 10^{A_I / 5} - 1 = 10^{0.12 / 5} - 1 = 10^{0.024} - 1 \\approx \\mathbf{+5.68\\%} \\quad \\left(\\text{linear approx: } \\frac{\\ln 10}{5}A_I \\approx +5.53\\%\\right) $$</p>`
    },

    // Day 38 — 25.11.2026
    {
        uniqueId: "potd_2026_11_25",
        dayNumber: 38,
        scheduledDate: "25.11.2026",
        title: "Zenith Stars, Meridian Transit Timing, and Star-Hopping Across the Summer Triangle",
        author: "Matei",
        module: "O1 · Observational: Blind Map & Sky Coordinates",
        difficultyClass: "easy",
        difficultyText: "2.8 / 10.0",
        description: `<p>During an observational blind-map night on <strong>August 15</strong> from a northern observing site at latitude $\\phi = +45^\\circ 00'$ (time zone $\\text{UTC}+3$), a student calibrates the night sky using the three bright vertices of the Summer Triangle (J2000 equatorial coordinates):</p>
<table style="width:100%; border-collapse:collapse; margin-top:14px; margin-bottom:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Star</th>
            <th style="padding:8px;">Constellation</th>
            <th style="padding:8px;">Right Ascension ($\\alpha$)</th>
            <th style="padding:8px;">Declination ($\\delta$)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Vega ($\\alpha$ Lyr)</td><td style="padding:8px;">Lyra</td><td style="padding:8px;">$18^{\\text{h}}36^{\\text{m}}56^{\\text{s}}$</td><td style="padding:8px;">$+38^\\circ 47'$</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Deneb ($\\alpha$ Cyg)</td><td style="padding:8px;">Cygnus</td><td style="padding:8px;">$20^{\\text{h}}41^{\\text{m}}26^{\\text{s}}$</td><td style="padding:8px;">$+45^\\circ 17'$</td></tr>
        <tr><td style="padding:8px;">Altair ($\\alpha$ Aql)</td><td style="padding:8px;">Aquila</td><td style="padding:8px;">$19^{\\text{h}}50^{\\text{m}}47^{\\text{s}}$</td><td style="padding:8px;">$+08^\\circ 52'$</td></tr>
    </tbody>
</table>
<p>At local standard time $t_0 = 22^{\\text{h}}00^{\\text{m}}00^{\\text{s}}$ ($\\text{UTC}+3$), the observer's Local Sidereal Time is calibrated to be $\\mathrm{LST}_0 = 19^{\\text{h}}20^{\\text{m}}00^{\\text{s}}$. Neglect atmospheric refraction, and use $1\\text{ mean solar day} = 1.0027379\\text{ sidereal days}$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine which star passes closest to the observer's zenith at upper culmination, specify its minimum zenith distance $z_{\\min}$ and whether it culminates North or South of the zenith, and calculate the maximum altitude $h_{\\max}$ of all three stars from $\\phi = +45^\\circ 00'$. <em>(2.5 points)</em></li>
    <li>Calculate the exact local standard time ($\\text{UTC}+3$) at which Deneb reaches upper culmination on this night. <em>(2.5 points)</em></li>
    <li>Using the spherical law of cosines, calculate all three angular side lengths of the Summer Triangle—$\\theta(\\text{Vega},\\text{Deneb})$, $\\theta(\\text{Vega},\\text{Altair})$, and $\\theta(\\text{Deneb},\\text{Altair})$—to serve as blind-map angular rulers, and identify the longest edge. <em>(3.0 points)</em></li>
    <li>At $t_0 = 22^{\\text{h}}00^{\\text{m}}00^{\\text{s}}$ ($\\mathrm{LST}_0 = 19^{\\text{h}}20^{\\text{m}}00^{\\text{s}}$), calculate the altitude $h$ and azimuth $A$ (measured from North through East) of Altair on the sky dome, and determine whether Deneb is circumpolar from this latitude. <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Meridian transit geometry, sidereal-to-solar clock conversion, spherical angular separation, and horizontal-equatorial coordinate transformations.</p>

<p><strong>(a) Zenith Star &amp; Maximum Altitudes at $\\phi = +45^\\circ 00'$ (2.5 points):</strong><br>
At upper culmination, the zenith distance is $z_{\\min} = |\\phi - \\delta|$ and the maximum altitude is $h_{\\max} = 90^\\circ - |\\phi - \\delta|$:</p>
<ul>
    <li><strong>Vega ($\\delta_1 = +38^\\circ 47'$):</strong> $z_{\\min} = 45^\\circ 00' - 38^\\circ 47' = 6^\\circ 13'$ South of zenith $\\implies h_{\\max} = \\mathbf{83^\\circ 47'}$.</li>
    <li><strong>Deneb ($\\delta_2 = +45^\\circ 17'$):</strong> $z_{\\min} = |45^\\circ 00' - 45^\\circ 17'| = \\mathbf{0^\\circ 17'}$ <strong>North of zenith</strong> $\\implies h_{\\max} = \\mathbf{89^\\circ 43'}$.</li>
    <li><strong>Altair ($\\delta_3 = +08^\\circ 52'$):</strong> $z_{\\min} = 45^\\circ 00' - 08^\\circ 52' = 36^\\circ 08'$ South of zenith $\\implies h_{\\max} = \\mathbf{53^\\circ 52'}$.</li>
</ul>
<p>Therefore, <strong>Deneb</strong> is the zenith star, skimming just $17'$ North of the observer's zenith.</p>

<p><strong>(b) Local Standard Time of Deneb's Upper Culmination (2.5 points):</strong><br>
Deneb culminates when $\\mathrm{LST} = \\alpha_2 = 20^{\\text{h}}41^{\\text{m}}26^{\\text{s}}$. The sidereal interval after $t_0 = 22^{\\text{h}}00^{\\text{m}}00^{\\text{s}}$ ($\\mathrm{LST}_0 = 19^{\\text{h}}20^{\\text{m}}00^{\\text{s}}$) is:</p>
<p>$$ \\Delta s = 20^{\\text{h}}41^{\\text{m}}26^{\\text{s}} - 19^{\\text{h}}20^{\\text{m}}00^{\\text{s}} = 1^{\\text{h}}21^{\\text{m}}26^{\\text{s}} = 4886\\text{ sidereal seconds} $$</p>
<p>Converting from sidereal seconds to mean solar seconds:</p>
<p>$$ \\Delta t = \\frac{\\Delta s}{1.0027379} = \\frac{4886\\text{ s}}{1.0027379} = 4872.66\\text{ s} = 1^{\\text{h}}21^{\\text{m}}12.7^{\\text{s}} $$</p>
<p>$$ t_{\\mathrm{culm}} = 22^{\\text{h}}00^{\\text{m}}00^{\\text{s}} + 1^{\\text{h}}21^{\\text{m}}12.7^{\\text{s}} = \\mathbf{23^{\\text{h}}21^{\\text{m}}12.7^{\\text{s}}\\ (\\text{UTC}+3)} $$</p>

<p><strong>(c) Angular Side Lengths of the Summer Triangle (3.0 points):</strong><br>
Converting right ascensions and declinations to decimal degrees: Vega ($279.2333^\\circ,\\ +38.7833^\\circ$), Deneb ($310.3583^\\circ,\\ +45.2833^\\circ$), Altair ($297.6958^\\circ,\\ +8.8667^\\circ$). Applying $\\cos\\theta = \\sin\\delta_a\\sin\\delta_b + \\cos\\delta_a\\cos\\delta_b\\cos(\\alpha_b - \\alpha_a)$:</p>
<ul>
    <li><strong>Vega–Deneb ($\\Delta\\alpha = 31.1250^\\circ$):</strong> $\\cos\\theta_{12} = \\sin(38.7833^\\circ)\\sin(45.2833^\\circ) + \\cos(38.7833^\\circ)\\cos(45.2833^\\circ)\\cos(31.1250^\\circ) = 0.91461 \\implies \\theta_{12} = \\mathbf{23.85^\\circ}$.</li>
    <li><strong>Vega–Altair ($\\Delta\\alpha = 18.4625^\\circ$):</strong> $\\cos\\theta_{13} = \\sin(38.7833^\\circ)\\sin(8.8667^\\circ) + \\cos(38.7833^\\circ)\\cos(8.8667^\\circ)\\cos(18.4625^\\circ) = 0.82711 \\implies \\theta_{13} = \\mathbf{34.20^\\circ}$.</li>
    <li><strong>Deneb–Altair ($\\Delta\\alpha = -12.6625^\\circ$):</strong> $\\cos\\theta_{23} = \\sin(45.2833^\\circ)\\sin(8.8667^\\circ) + \\cos(45.2833^\\circ)\\cos(8.8667^\\circ)\\cos(12.6625^\\circ) = 0.78781 \\implies \\theta_{23} = \\mathbf{38.02^\\circ}$.</li>
</ul>
<p>The longest edge of the Summer Triangle is <strong>Deneb–Altair ($38.02^\\circ$)</strong>.</p>

<p><strong>(d) Horizontal Coordinates of Altair at $22^{\\text{h}}00^{\\text{m}}00^{\\text{s}}$ &amp; Circumpolarity of Deneb (2.0 points):</strong><br>
At $\\mathrm{LST}_0 = 19^{\\text{h}}20^{\\text{m}}00^{\\text{s}}$, Altair's hour angle is $H_3 = \\mathrm{LST}_0 - \\alpha_3 = -0^{\\text{h}}30^{\\text{m}}47^{\\text{s}} = -7.6958^\\circ$ (just East of the southern meridian):</p>
<p>$$ \\sin h_3 = \\sin(45.0^\\circ)\\sin(8.8667^\\circ) + \\cos(45.0^\\circ)\\cos(8.8667^\\circ)\\cos(-7.6958^\\circ) = 0.80135 \\implies h_3 = \\mathbf{53.26^\\circ} $$</p>
<p>$$ \\sin A_3 = -\\frac{\\cos(8.8667^\\circ)\\sin(-7.6958^\\circ)}{\\cos(53.26^\\circ)} = +0.22119, \\qquad \\cos A_3 = \\frac{\\sin(8.8667^\\circ) - \\sin(45.0^\\circ)\\sin(53.26^\\circ)}{\\cos(45.0^\\circ)\\cos(53.26^\\circ)} = -0.97523 $$</p>
<p>Since $\\sin A_3 > 0$ and $\\cos A_3 < 0$, Altair lies in the second quadrant (SSE) at azimuth $A_3 = 180^\\circ - 12.78^\\circ = \\mathbf{167.22^\\circ}$.</p>
<p>A star is circumpolar in the Northern Hemisphere when $\\delta > 90^\\circ - \\phi = +45^\\circ 00'$. Since Deneb has $\\delta_2 = +45^\\circ 17' > +45^\\circ 00'$, its lower-culmination geometric altitude is $h_{\\min} = \\delta_2 + \\phi - 90^\\circ = +0^\\circ 17' > 0^\\circ$, so <strong>yes, Deneb is circumpolar</strong> from $\\phi = +45^\\circ 00'$.</p>`
    },

    // Day 39 — 26.11.2026
    {
        uniqueId: "potd_2026_11_26",
        dayNumber: 39,
        scheduledDate: "26.11.2026",
        title: "Transmission Spectroscopy, Scale Height, and Direct-Imaging Contrast of a Hot Jupiter",
        author: "Matei",
        module: "T3 & T9 · Instrumentation & Exoplanet Characterization",
        difficultyClass: "medium",
        difficultyText: "4.5 / 10.0",
        description: `<p>A transiting hot Jupiter with mass $M_p = 0.80\\,M_J$, radius $R_p = 1.30\\,R_J$, Bond albedo $A_B = 0.15$, and geometric albedo $A_g = 0.10$ orbits a solar-type star ($R_\\star = R_\\odot = 6.957 \\times 10^8\\text{ m}$, $T_\\star = 5800\\text{ K}$) on a circular orbit of semimajor axis $a = 0.050\\text{ AU}$ at a distance $d = 40.0\\text{ pc}$ from Earth. Assume full planetary heat redistribution ($f = 1/4$) and an isothermal $\\mathrm{H_2/He}$ upper atmosphere with mean molecular weight $\\mu = 2.30$.</p>
<p>Use $G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}$, $k_B = 1.3806 \\times 10^{-23}\\ \\mathrm{J\\,K^{-1}}$, $m_u = 1.6605 \\times 10^{-27}\\text{ kg}$, $M_J = 1.898 \\times 10^{27}\\text{ kg}$, $R_J = 7.149 \\times 10^7\\text{ m}$, and $1\\text{ AU} = 1.496 \\times 10^{11}\\text{ m}$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the planet's equilibrium temperature $T_{\\mathrm{eq}} = T_\\star (1 - A_B)^{1/4}\\sqrt{\\frac{R_\\star}{2a}}$ (in $\\text{K}$), surface gravitational acceleration $g_p$ (in $\\mathrm{m\\,s^{-2}}$), and atmospheric pressure scale height $H = \\frac{k_B T_{\\mathrm{eq}}}{\\mu m_u g_p}$ (in $\\text{km}$). <em>(2.5 points)</em></li>
    <li>During primary transit, the continuum transit depth is $\\delta_0 = (R_p/R_\\star)^2$, whereas inside the core of the resonant sodium doublet the atmospheric annulus becomes opaque up to $\\Delta z = 5H$ above the continuum radius. Calculate $\\delta_0$ (in percent) and the transmission spectroscopy absorption signal $\\Delta\\delta \\simeq \\frac{2 R_p \\Delta z}{R_\\star^2}$ (in parts per million, $\\text{ppm}$). <em>(2.5 points)</em></li>
    <li>In a single transit, a space spectrograph collects $N_\\star = 2.50 \\times 10^8$ stellar photons inside the narrow sodium wavelength bin during the in-transit window and an equal number out of transit. Neglecting readout and background noise, calculate the photon-limited transit-depth uncertainty $\\sigma_\\delta \\simeq \\sqrt{2 / N_\\star}$ (in $\\text{ppm}$) and the single-transit detection signal-to-noise ratio $\\mathrm{SNR} = \\Delta\\delta / \\sigma_\\delta$. <em>(2.5 points)</em></li>
    <li>To assess whether this hot Jupiter can instead be directly imaged at quadrature (maximum elongation $\\theta_{\\max} = a / d$), calculate $\\theta_{\\max}$ (in $\\text{mas}$), the reflected-light planet-to-star flux contrast $C_{\\mathrm{ref}} = A_g \\Phi(\\pi/2)\\left(\\frac{R_p}{a}\\right)^2$ assuming a Lambertian phase function $\\Phi(\\pi/2) = 1/\\pi$, and the minimum telescope aperture $D_{\\min}$ (in meters) required for the Rayleigh diffraction limit at $\\lambda = 1.65\\ \\mu\\mathrm{m}$ to equal $\\theta_{\\max}$. <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Exoplanet radiative equilibrium, hydrostatic atmospheric scale height, transmission spectroscopy SNR, and direct-imaging diffraction/contrast limits.</p>

<p><strong>(a) Equilibrium Temperature $T_{\\mathrm{eq}}$, Surface Gravity $g_p$ &amp; Scale Height $H$ (2.5 points):</strong><br>
With $M_p = 0.80(1.898 \\times 10^{27}) = 1.518 \\times 10^{27}\\text{ kg}$, $R_p = 1.30(7.149 \\times 10^7) = 9.294 \\times 10^7\\text{ m}$, and $a = 0.050(1.496 \\times 10^{11}) = 7.480 \\times 10^9\\text{ m}$:</p>
<p>$$ T_{\\mathrm{eq}} = 5800\\,(1 - 0.15)^{1/4}\\sqrt{\\frac{6.957 \\times 10^8}{2(7.480 \\times 10^9)}} = 5800(0.96018)(0.21565) \\approx \\mathbf{1201\\text{ K}} $$</p>
<p>$$ g_p = \\frac{G M_p}{R_p^2} = \\frac{(6.674 \\times 10^{-11})(1.5184 \\times 10^{27})}{(9.2937 \\times 10^7)^2} \\approx \\mathbf{11.73\\ \\mathrm{m\\,s^{-2}}} $$</p>
<p>$$ H = \\frac{k_B T_{\\mathrm{eq}}}{\\mu m_u g_p} = \\frac{(1.3806 \\times 10^{-23})(1201.0)}{(2.30)(1.6605 \\times 10^{-27})(11.733)} = 3.700 \\times 10^5\\text{ m} = \\mathbf{370\\text{ km}} $$</p>

<p><strong>(b) Continuum Transit Depth $\\delta_0$ &amp; Sodium Transmission Signal $\\Delta\\delta$ (2.5 points):</strong><br>
The continuum transit depth is:</p>
<p>$$ \\delta_0 = \\left(\\frac{R_p}{R_\\star}\\right)^2 = \\left(\\frac{9.2937 \\times 10^7\\text{ m}}{6.957 \\times 10^8\\text{ m}}\\right)^2 = 0.017846 = \\mathbf{1.785\\%} $$</p>
<p>An optically thick annulus of height $\\Delta z = 5H = 1.850 \\times 10^6\\text{ m}$ ($1850\\text{ km}$) adds an extra transit depth of:</p>
<p>$$ \\Delta\\delta \\simeq \\frac{2 R_p \\Delta z}{R_\\star^2} = \\frac{2(9.2937 \\times 10^7)(1.8501 \\times 10^6)}{(6.957 \\times 10^8)^2} = 7.105 \\times 10^{-4} \\approx \\mathbf{711\\text{ ppm}} $$</p>

<p><strong>(c) Photon-Limited Uncertainty $\\sigma_\\delta$ &amp; Single-Transit SNR (2.5 points):</strong><br>
With $N_\\star = 2.50 \\times 10^8$ photons collected both in-transit and out-of-transit, Poisson counting statistics give:</p>
<p>$$ \\sigma_\\delta \\simeq \\sqrt{\\frac{2}{N_\\star}} = \\sqrt{\\frac{2}{2.50 \\times 10^8}} = 8.944 \\times 10^{-5} \\approx \\mathbf{89.4\\text{ ppm}} $$</p>
<p>$$ \\mathrm{SNR} = \\frac{\\Delta\\delta}{\\sigma_\\delta} = \\frac{710.5\\text{ ppm}}{89.44\\text{ ppm}} \\approx \\mathbf{7.94} $$</p>

<p><strong>(d) Maximum Elongation $\\theta_{\\max}$, Reflected Contrast $C_{\\mathrm{ref}}$ &amp; Aperture $D_{\\min}$ (2.5 points):</strong><br>
At $d = 40.0\\text{ pc}$, the angular separation at quadrature is:</p>
<p>$$ \\theta_{\\max} = \\frac{a\\,[\\text{AU}]}{d\\,[\\text{pc}]}\\,'' = \\frac{0.050}{40.0}\\,'' = 0.00125'' = \\mathbf{1.25\\text{ mas}} \\quad (6.060 \\times 10^{-9}\\text{ rad}) $$</p>
<p>The Lambertian reflected-light contrast at quadrature ($\\Phi(\\pi/2) = 1/\\pi$) is:</p>
<p>$$ C_{\\mathrm{ref}} = \\frac{A_g}{\\pi}\\left(\\frac{R_p}{a}\\right)^2 = \\frac{0.10}{\\pi}\\left(\\frac{9.2937 \\times 10^7}{7.480 \\times 10^9}\\right)^2 = \\mathbf{4.91 \\times 10^{-6}} $$</p>
<p>Setting the Rayleigh criterion $1.22\\lambda/D_{\\min} = \\theta_{\\max}$ at $\\lambda = 1.65 \\times 10^{-6}\\text{ m}$:</p>
<p>$$ D_{\\min} = \\frac{1.22\\lambda}{\\theta_{\\max}} = \\frac{1.22(1.65 \\times 10^{-6}\\text{ m})}{6.060 \\times 10^{-9}\\text{ rad}} \\approx \\mathbf{332\\text{ m}} $$</p>
<p>Because resolving $1.25\\text{ mas}$ at $1.65\\ \\mu\\mathrm{m}$ requires a $332\\text{ m}$ single-dish aperture (or optical/IR interferometry), hot Jupiters are far more accessible via transmission spectroscopy than direct imaging.</p>`
    },

    // Day 40 — 27.11.2026
    {
        uniqueId: "potd_2026_11_27",
        dayNumber: 40,
        scheduledDate: "27.11.2026",
        title: "Drift Timing, Eyepiece Field of View, and Polar Alignment Calibration",
        author: "Matei",
        module: "O2 · Observational: Practical Telescope Operations",
        difficultyClass: "medium",
        difficultyText: "3.8 / 10.0",
        description: `<p>During a practical observational round at latitude $\\phi = +40.0^\\circ$, a student operates an $f/8$ Newtonian reflector with primary mirror aperture $D = 200\\text{ mm}$ mounted on a German Equatorial Mount (GEM). Use Earth's sidereal angular rotation rate $\\omega_\\oplus = 15.0411''\\,\\mathrm{s^{-1}} = 7.2921 \\times 10^{-5}\\ \\mathrm{rad\\,s^{-1}}$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>The student inserts a Plössl eyepiece of focal length $f_e = 25.0\\text{ mm}$ and apparent field of view $\\mathrm{AFOV} = 52.0^\\circ$. Calculate the telescope focal length $F$ (in $\\text{mm}$), magnification $M_1$, exit pupil diameter $d_{\\mathrm{exit}}$ (confirming it does not exceed a dark-adapted eye pupil of $7.0\\text{ mm}$), and theoretical true field of view $\\mathrm{TFOV} = \\mathrm{AFOV}/M_1$ (in arcminutes). <em>(2.5 points)</em></li>
    <li>To measure the exact true field of view empirically, the student switches off the RA tracking drive and times the equatorial star Mintaka ($\\delta = -0^\\circ 18'$) drifting centrally across the full diameter of the eyepiece: the mean transit time is $\\Delta t_1 = 192.0\\text{ s}$ (mean solar seconds). Compute the measured $\\mathrm{TFOV}_{\\mathrm{meas}}$ (in arcminutes). How long would Capella ($\\delta = +46^\\circ 00'$) take to drift centrally across the same eyepiece field? <em>(2.5 points)</em></li>
    <li>With tracking re-enabled on a star near the celestial equator ($\\delta = 0^\\circ$) on the local meridian ($H = 0^\\circ$), the student measures a steady <strong>northward</strong> drift of $\\Delta\\delta = +28.0''$ over $T = 15.0\\text{ min}$. For a small polar-axis azimuth error $\\Delta A$ (positive when pointed East of true North), the star's apparent declination drift relative to the tracking reticle on the meridian obeys $\\Delta\\delta = -\\omega_\\oplus T \\cos\\phi\\,\\Delta A$ (with $\\omega_\\oplus T$ in radians). Calculate the magnitude of the azimuth misalignment $|\\Delta A|$ (in arcminutes) and state whether the north polar axis is pointed East or West of true North. <em>(3.0 points)</em></li>
    <li>Switching to a $6.0\\text{ mm}$ planetary eyepiece to attempt to split the double star $\\epsilon^1$ Lyrae (angular separation $\\rho = 2.30''$), calculate the new magnification $M_2$, the Dawes resolution limit $\\theta_D = 116'' / D_{\\mathrm{mm}}$, and the Rayleigh diffraction limit $\\theta_R = 1.22\\lambda / D$ at $\\lambda = 550\\text{ nm}$. Determine whether the pair is cleanly resolved and whether $M_2$ stays below the practical maximum magnification $M_{\\max} \\approx 2 D_{\\mathrm{mm}}$. <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Telescope focal ratio and exit pupil, diurnal drift-timing field calibration, equatorial mount drift alignment, and optical resolving power.</p>

<p><strong>(a) Focal Length, Magnification, Exit Pupil &amp; Theoretical TFOV (2.5 points):</strong><br>
For an $f/8$ mirror of aperture $D = 200\\text{ mm}$ paired with $f_e = 25.0\\text{ mm}$:</p>
<p>$$ F = 8 \\times 200\\text{ mm} = \\mathbf{1600\\text{ mm}}, \\qquad M_1 = \\frac{F}{f_e} = \\frac{1600}{25.0} = \\mathbf{64.0\\times} $$</p>
<p>$$ d_{\\mathrm{exit}} = \\frac{D}{M_1} = \\frac{200\\text{ mm}}{64.0} = \\mathbf{3.125\\text{ mm}} < 7.0\\text{ mm} \\quad (\\text{no light wasted by the eye's iris}) $$</p>
<p>$$ \\mathrm{TFOV} = \\frac{\\mathrm{AFOV}}{M_1} = \\frac{52.0^\\circ}{64.0} = 0.8125^\\circ = \\mathbf{48.75'} $$</p>

<p><strong>(b) Empirical Drift-Timing TFOV &amp; Capella Transit Time (2.5 points):</strong><br>
A star at declination $\\delta$ sweeps across the sky at angular rate $\\omega_\\oplus \\cos\\delta$. For Mintaka ($\\delta = -0.30^\\circ$, $\\cos(-0.30^\\circ) = 0.999986$):</p>
<p>$$ \\mathrm{TFOV}_{\\mathrm{meas}} = \\omega_\\oplus\\,\\Delta t_1 \\cos\\delta = (15.0411''\\,\\mathrm{s^{-1}})(192.0\\text{ s})(0.999986) = 2887.9'' = \\mathbf{48.13'} $$</p>
<p>For Capella ($\\delta = +46^\\circ 00'$, $\\cos 46.0^\\circ = 0.69466$) drifting across the same $2887.9''$ field:</p>
<p>$$ \\Delta t_2 = \\frac{\\mathrm{TFOV}_{\\mathrm{meas}}}{\\omega_\\oplus \\cos 46.0^\\circ} = \\frac{2887.9''}{(15.0411''\\,\\mathrm{s^{-1}})(0.69466)} \\approx \\mathbf{276.4\\text{ s}} \\quad (4^{\\text{m}}36.4^{\\text{s}}) $$</p>

<p><strong>(c) Polar-Axis Azimuth Misalignment $|\\Delta A|$ &amp; Direction (3.0 points):</strong><br>
Over $T = 15.0\\text{ min} = 900\\text{ s}$, the Earth rotates through $\\omega_\\oplus T = (7.2921 \\times 10^{-5}\\ \\mathrm{rad\\,s^{-1}})(900\\text{ s}) = 0.065629\\text{ rad}$. Solving $\\Delta\\delta = -\\omega_\\oplus T \\cos\\phi\\,\\Delta A$ with $\\phi = 40.0^\\circ$ ($\\cos 40.0^\\circ = 0.76604$) and $\\Delta\\delta = +28.0''$:</p>
<p>$$ \\Delta A = -\\frac{\\Delta\\delta}{\\omega_\\oplus T \\cos\\phi} = -\\frac{+28.0''}{(0.065629)(0.76604)} = -556.9'' = \\mathbf{-9.28'} $$</p>
<p>The negative sign indicates that the mount's north polar axis is pointed $\\mathbf{9.28'}$ <strong>West of true North</strong> (so the student must nudge the polar axis eastward in azimuth to eliminate the northward meridian drift).</p>

<p><strong>(d) High-Power Eyepiece &amp; Resolving $\\epsilon^1$ Lyrae (2.0 points):</strong><br>
With the $f_e = 6.0\\text{ mm}$ eyepiece:</p>
<p>$$ M_2 = \\frac{1600\\text{ mm}}{6.0\\text{ mm}} = \\mathbf{266.7\\times} < M_{\\max} = 2(200) = 400\\times $$</p>
<p>$$ \\theta_D = \\frac{116''}{200} = \\mathbf{0.58''}, \\qquad \\theta_R = \\frac{1.22(5.50 \\times 10^{-7}\\text{ m})}{0.200\\text{ m}} \\times 206265'' = \\mathbf{0.69''} $$</p>
<p>Because both the Dawes limit ($0.58''$) and Rayleigh limit ($0.69''$) are more than three times smaller than $\\rho = 2.30''$, and $M_2 = 267\\times$ remains well within the $400\\times$ useful limit, <strong>$\\epsilon^1$ Lyrae is cleanly resolved</strong>.</p>`
    },

    // Day 41 — 28.11.2026
    {
        uniqueId: "potd_2026_11_28",
        dayNumber: 41,
        scheduledDate: "28.11.2026",
        title: "Detached Eclipsing Double-Lined Binary: Extracting Masses, Radii, and Distance",
        author: "Matei",
        module: "D2 · Data Analysis: Full Data Sets",
        difficultyClass: "hard",
        difficultyText: "6.2 / 10.0",
        description: `<p>Photometric ($V$-band) and high-resolution spectroscopic monitoring of a detached, edge-on ($i = 90.0^\\circ$) eclipsing double-lined spectroscopic binary (components $A$ and $B$, with $R_A > R_B$) yields the two observational datasets below. Both eclipses show flat-bottomed minima, and interstellar extinction is negligible ($A_V = 0$).</p>
<table style="width:100%; border-collapse:collapse; margin-top:14px; margin-bottom:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Table 1: Light-Curve Event</th>
            <th style="padding:8px;">HJD $-\\ 2461000.0$ (days)</th>
            <th style="padding:8px;">Apparent $V$ (mag)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Out-of-eclipse baseline ($V_0$)</td><td style="padding:8px;">—</td><td style="padding:8px;">8.400</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Primary Eclipse #1 — 1st contact ($t_1$)</td><td style="padding:8px;">10.3700</td><td style="padding:8px;">8.400</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Primary Eclipse #1 — 2nd contact ($t_2$)</td><td style="padding:8px;">10.4675</td><td style="padding:8px;">8.806</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Primary Eclipse #1 — 3rd contact ($t_3$)</td><td style="padding:8px;">10.5325</td><td style="padding:8px;">8.806</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Primary Eclipse #1 — 4th contact ($t_4$)</td><td style="padding:8px;">10.6300</td><td style="padding:8px;">8.400</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">Secondary Eclipse — Mid-minimum ($V_2$)</td><td style="padding:8px;">12.5000</td><td style="padding:8px;">8.548</td></tr>
        <tr><td style="padding:8px;">Primary Eclipse #2 — Mid-minimum ($V_1$)</td><td style="padding:8px;">14.5000</td><td style="padding:8px;">8.806</td></tr>
    </tbody>
</table>
<table style="width:100%; border-collapse:collapse; margin-top:10px; margin-bottom:14px; font-family:var(--font-mono); font-size:0.82rem;">
    <thead>
        <tr style="border-bottom:1px solid var(--border-light); color:var(--accent-blue); text-align:left;">
            <th style="padding:8px;">Table 2: Orbital Phase $\\varphi$</th>
            <th style="padding:8px;">$v_{r,A}$ ($\\mathrm{km\\,s^{-1}}$)</th>
            <th style="padding:8px;">$v_{r,B}$ ($\\mathrm{km\\,s^{-1}}$)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">$0.00$ (Primary mid-eclipse)</td><td style="padding:8px;">$-24.0$</td><td style="padding:8px;">$-24.0$</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">$0.25$ (First quadrature)</td><td style="padding:8px;">$-96.0$</td><td style="padding:8px;">$+84.0$</td></tr>
        <tr style="border-bottom:1px solid var(--border-subtle);"><td style="padding:8px;">$0.50$ (Secondary mid-eclipse)</td><td style="padding:8px;">$-24.0$</td><td style="padding:8px;">$-24.0$</td></tr>
        <tr><td style="padding:8px;">$0.75$ (Second quadrature)</td><td style="padding:8px;">$+48.0$</td><td style="padding:8px;">$-132.0$</td></tr>
    </tbody>
</table>
<p>Use $G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}$, $\\sigma_{\\mathrm{SB}} = 5.6704 \\times 10^{-8}\\ \\mathrm{W\\,m^{-2}\\,K^{-4}}$, $M_\\odot = 1.989 \\times 10^{30}\\text{ kg}$, $R_\\odot = 6.957 \\times 10^8\\text{ m}$, $L_\\odot = 3.828 \\times 10^{26}\\text{ W}$, and $M_{\\mathrm{bol},\\odot} = 4.74\\text{ mag}$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>From Table 1, determine the orbital period $P$ (in days) and verify that the orbit is circular. From Table 2, determine the systemic velocity $\\gamma$ and the radial-velocity semi-amplitudes $K_A$ and $K_B$ (in $\\mathrm{km\\,s^{-1}}$), then calculate the orbital separation $a$ (in $R_\\odot$) and individual stellar masses $M_A$ and $M_B$ (in $M_\\odot$). <em>(3.0 points)</em></li>
    <li>Using the four contact times of Primary Eclipse #1 (full duration $D = t_4 - t_1$ and flat-bottom duration $d = t_3 - t_2$) together with the exact edge-on circular relations $R_A + R_B = a\\sin\\!\\left(\\frac{\\pi D}{P}\\right)$ and $R_A - R_B = a\\sin\\!\\left(\\frac{\\pi d}{P}\\right)$, calculate the stellar radii $R_A$ and $R_B$ (in $R_\\odot$) and the radius ratio $k = R_B / R_A$. <em>(2.5 points)</em></li>
    <li>From the eclipse depths ($V_0, V_1, V_2$), calculate the fractional flux drops $\\Delta f_1$ and $\\Delta f_2$. Prove quantitatively—using both the photometric identity and the radial-velocity signs at $\\varphi = 0.25$—whether the primary eclipse is an annular transit of star $B$ across star $A$ or a total occultation of star $B$ behind star $A$. Hence find the luminosity ratio $L_{V,B}/L_{V,A}$, the surface-brightness ratio $J_{V,A}/J_{V,B}$, and the effective temperature $T_B$ given $T_A = 6500\\text{ K}$ (assuming $J_A/J_B \\simeq (T_A/T_B)^4$). <em>(2.5 points)</em></li>
    <li>Given the bolometric correction $\\mathrm{BC}_A = -0.04\\text{ mag}$ for star $A$, calculate its bolometric luminosity $L_A$ (in $L_\\odot$), its absolute visual magnitude $M_{V,A}$, the combined out-of-eclipse absolute visual magnitude $M_{V,\\mathrm{tot}}$, and the distance $d_{\\mathrm{sys}}$ to the binary system (in $\\text{pc}$). <em>(2.0 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Joint SB2 radial-velocity and eclipsing light-curve inversion for absolute stellar masses, radii, temperatures, and primary distance determination.</p>

<p><strong>(a) Orbital Period, Systemic Velocity, Separation &amp; Masses (3.0 points):</strong><br>
Primary Eclipse #1 is centered at $t_{\\mathrm{mid},1} = \\frac{1}{2}(t_1 + t_4) = \\frac{1}{2}(10.3700 + 10.6300) = 10.5000\\text{ d}$. Since Primary Eclipse #2 occurs at $14.5000\\text{ d}$:</p>
<p>$$ P = 14.5000 - 10.5000 = \\mathbf{4.0000\\text{ days}} \\quad (3.4560 \\times 10^5\\text{ s}) $$</p>
<p>The secondary minimum occurs at $12.5000\\text{ d}$, exactly at phase $\\varphi = (12.5000 - 10.5000)/4.0000 = 0.5000$, and the quadrature velocities are symmetric around conjunction—confirming a circular orbit ($e = 0$).</p>
<p>From Table 2, both stars share the systemic velocity $\\gamma = \\mathbf{-24.0\\ \\mathrm{km\\,s^{-1}}}$, with semi-amplitudes:</p>
<p>$$ K_A = \\frac{48.0 - (-96.0)}{2} = \\mathbf{72.0\\ \\mathrm{km\\,s^{-1}}}, \\qquad K_B = \\frac{84.0 - (-132.0)}{2} = \\mathbf{108.0\\ \\mathrm{km\\,s^{-1}}} $$</p>
<p>For $i = 90.0^\\circ$ and $e = 0$, the orbital separation and total mass are:</p>
<p>$$ a = \\frac{(K_A + K_B)P}{2\\pi} = \\frac{(1.800 \\times 10^5\\ \\mathrm{m\\,s^{-1}})(3.4560 \\times 10^5\\text{ s})}{2\\pi} = 9.901 \\times 10^9\\text{ m} = \\mathbf{14.23\\,R_\\odot} $$</p>
<p>$$ M_{\\mathrm{tot}} = M_A + M_B = \\frac{4\\pi^2 a^3}{G P^2} = \\frac{4\\pi^2 (9.9007 \\times 10^9)^3}{(6.674 \\times 10^{-11})(3.4560 \\times 10^5)^2} = 4.806 \\times 10^{30}\\text{ kg} = 2.417\\,M_\\odot $$</p>
<p>Using $M_A / M_B = K_B / K_A = 108.0 / 72.0 = 1.500$:</p>
<p>$$ M_A = \\frac{108.0}{180.0}(2.4165\\,M_\\odot) = \\mathbf{1.450\\,M_\\odot}, \\qquad M_B = \\frac{72.0}{180.0}(2.4165\\,M_\\odot) = \\mathbf{0.967\\,M_\\odot} $$</p>

<p><strong>(b) Stellar Radii $R_A$, $R_B$ &amp; Radius Ratio $k$ (2.5 points):</strong><br>
From Table 1, $D = t_4 - t_1 = 10.6300 - 10.3700 = 0.2600\\text{ d}$ and $d = t_3 - t_2 = 10.5325 - 10.4675 = 0.0650\\text{ d}$:</p>
<p>$$ R_A + R_B = a\\sin\\!\\left(\\frac{\\pi \\times 0.2600}{4.0000}\\right) = 14.231\\,R_\\odot \\times 0.20279 = 2.886\\,R_\\odot $$</p>
<p>$$ R_A - R_B = a\\sin\\!\\left(\\frac{\\pi \\times 0.0650}{4.0000}\\right) = 14.231\\,R_\\odot \\times 0.05103 = 0.726\\,R_\\odot $$</p>
<p>Adding and subtracting these two equations gives:</p>
<p>$$ R_A = \\mathbf{1.806\\,R_\\odot}, \\qquad R_B = \\mathbf{1.080\\,R_\\odot}, \\qquad k = \\frac{R_B}{R_A} = \\mathbf{0.598} $$</p>

<p><strong>(c) Eclipse Geometry, Luminosity Ratio &amp; Effective Temperature $T_B$ (2.5 points):</strong><br>
Converting the magnitude drops $\\Delta V_1 = 8.806 - 8.400 = 0.406\\text{ mag}$ and $\\Delta V_2 = 8.548 - 8.400 = 0.148\\text{ mag}$ into fractional flux drops $\\Delta f = 1 - 10^{-0.4\\Delta V}$:</p>
<p>$$ \\Delta f_1 = 1 - 10^{-0.4(0.406)} = \\mathbf{0.3120}, \\qquad \\Delta f_2 = 1 - 10^{-0.4(0.148)} = \\mathbf{0.1274} $$</p>
<p>In a total occultation of the smaller star $B$, $\\Delta f_{\\mathrm{occ}} = \\frac{L_B}{L_A + L_B}$, while in an annular transit of $B$ across $A$, $\\Delta f_{\\mathrm{tr}} = \\frac{L_A}{L_A + L_B}k^2 = (1 - \\Delta f_{\\mathrm{occ}})k^2$. Testing $\\Delta f_2 = \\Delta f_{\\mathrm{occ}}$ gives $(1 - 0.1274)(0.5979)^2 = 0.3119 \\approx \\Delta f_1 = 0.3120$ (whereas testing $\\Delta f_1 = \\Delta f_{\\mathrm{occ}}$ would predict $\\Delta f_2 = 0.246 \\neq 0.127$). Independently, at $\\varphi = 0.25$ immediately after primary eclipse, star $B$ is receding ($v_{r,B} = +84.0 > \\gamma$) while star $A$ is approaching ($v_{r,A} = -96.0 < \\gamma$), proving star $B$ was closest to Earth at $\\varphi = 0.00$. Thus, the <strong>primary eclipse is an annular transit of $B$ across $A$</strong> and the <strong>secondary eclipse is a total occultation of $B$ behind $A$</strong>.</p>
<p>Hence:</p>
<p>$$ \\frac{L_{V,B}}{L_{V,A}} = \\frac{\\Delta f_2}{1 - \\Delta f_2} = \\frac{0.1274}{0.8726} = \\mathbf{0.1460} $$</p>
<p>Because the eclipsed projected area is $\\pi R_B^2$ in both eclipses, $\\frac{\\Delta f_1}{\\Delta f_2} = \\frac{J_{V,A}}{J_{V,B}}$:</p>
<p>$$ \\frac{J_{V,A}}{J_{V,B}} = \\frac{0.3120}{0.1274} = \\mathbf{2.448}, \\qquad T_B = T_A\\left(\\frac{J_{V,A}}{J_{V,B}}\\right)^{-1/4} = 6500\\,(2.448)^{-1/4} \\approx \\mathbf{5200\\text{ K}} \\quad (5196\\text{ K}) $$</p>

<p><strong>(d) Luminosity $L_A$, Absolute Visual Magnitudes &amp; Distance $d_{\\mathrm{sys}}$ (2.0 points):</strong><br>
By the Stefan–Boltzmann law for star $A$ ($R_A = 1.806\\,R_\\odot = 1.2565 \\times 10^9\\text{ m}$, $T_A = 6500\\text{ K}$):</p>
<p>$$ L_A = 4\\pi R_A^2 \\sigma_{\\mathrm{SB}} T_A^4 = 2.008 \\times 10^{27}\\text{ W} = \\mathbf{5.246\\,L_\\odot} $$</p>
<p>$$ M_{\\mathrm{bol},A} = 4.74 - 2.5\\log_{10}(5.246) = 2.940\\text{ mag} \\implies M_{V,A} = M_{\\mathrm{bol},A} - \\mathrm{BC}_A = 2.940 - (-0.04) = \\mathbf{2.980\\text{ mag}} $$</p>
<p>$$ M_{V,\\mathrm{tot}} = M_{V,A} - 2.5\\log_{10}\\!\\left(1 + \\frac{L_{V,B}}{L_{V,A}}\\right) = 2.980 - 2.5\\log_{10}(1.1460) = \\mathbf{2.832\\text{ mag}} $$</p>
<p>Because only star $A$ is visible during secondary totality ($V_A = V_2 = 8.548\\text{ mag}$), both $V_2 - M_{V,A}$ and $V_0 - M_{V,\\mathrm{tot}}$ yield the exact same distance modulus $\\mu = 8.548 - 2.980 = 5.568\\text{ mag}$:</p>
<p>$$ d_{\\mathrm{sys}} = 10^{(\\mu + 5)/5}\\text{ pc} = 10^{2.1136}\\text{ pc} \\approx \\mathbf{130\\text{ pc}} \\quad (129.9\\text{ pc}) $$</p>`
    },

    // Day 42 — 29.11.2026
    {
        uniqueId: "potd_2026_11_29",
        dayNumber: 42,
        scheduledDate: "29.11.2026",
        title: "Flat ΛCDM Cosmology: Acceleration Epoch, Lookback Time, and High-Redshift Supernova Dimming",
        author: "Matei",
        module: "T12 & T7 · Cosmology & Type Ia Supernovae",
        difficultyClass: "hard",
        difficultyText: "5.8 / 10.0",
        description: `<p>Consider a spatially flat $\\Lambda$CDM universe with present Hubble constant $H_0 = 70.0\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$, non-relativistic matter density parameter $\\Omega_{m,0} = 0.300$, cosmological constant density parameter $\\Omega_{\\Lambda,0} = 0.700$, and negligible radiation ($\\Omega_{r,0} \\approx 0$). Use $c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}$, $G = 6.674 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}$, $1\\text{ Mpc} = 3.086 \\times 10^{22}\\text{ m}$, and $1\\text{ Gyr} = 3.15576 \\times 10^{16}\\text{ s}$.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Starting from the Friedmann equations $H^2(z) = H_0^2\\left[\\Omega_{m,0}(1+z)^3 + \\Omega_{\\Lambda,0}\\right]$ and $\\frac{\\ddot{a}}{a} = -\\frac{4\\pi G}{3}(\\rho + 3P/c^2)$ (with $P_m = 0$ and $P_\\Lambda = -\\rho_\\Lambda c^2$), derive the redshift-dependent deceleration parameter $q(z) = -\\frac{\\ddot{a}a}{\\dot{a}^2}$ in terms of $\\Omega_{m,0}$, $\\Omega_{\\Lambda,0}$, and $z$. Calculate its present value $q_0$ and the transition redshift $z_t$ at which cosmic expansion switched from deceleration to acceleration. <em>(2.5 points)</em></li>
    <li>At redshift $z = 1.00$, calculate the Hubble parameter $H(z)$ (in $\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$), the critical density $\\rho_c(z) = \\frac{3 H^2(z)}{8\\pi G}$ (in $\\mathrm{kg\\,m^{-3}}$), and the matter-to-dark-energy density ratio $\\rho_m(z)/\\rho_\\Lambda$. Also determine the redshift $z_{\\mathrm{eq},\\Lambda}$ of matter–dark-energy equality ($\\rho_m = \\rho_\\Lambda$). <em>(2.5 points)</em></li>
    <li>In a flat $\\Lambda$CDM universe, the cosmic age as a function of scale factor $a = (1+z)^{-1}$ has the closed-form solution:
    $$ t(a) = \\frac{2}{3 H_0 \\sqrt{\\Omega_{\\Lambda,0}}}\\,\\mathrm{arsinh}\\!\\left(\\sqrt{\\frac{\\Omega_{\\Lambda,0}}{\\Omega_{m,0}}}\\,a^{3/2}\\right) $$
    Calculate the Hubble time $H_0^{-1}$, the present age of the universe $t_0$, the cosmic age $t(z=1.00)$ when light from a $z = 1.00$ supernova was emitted, and the lookback time $t_L(z=1.00)$ (all in $\\text{Gyr}$). <em>(2.5 points)</em></li>
    <li>A Type Ia supernova of peak absolute magnitude $M_B = -19.30\\text{ mag}$ explodes at $z = 1.00$ in a host galaxy of physical diameter $L = 20.0\\text{ kpc}$. Given the numerical comoving integral $\\int_0^{1.00} \\frac{dz'}{\\sqrt{0.300(1+z')^3 + 0.700}} = 0.7714$, calculate the comoving distance $d_C$, luminosity distance $d_L$, and angular-diameter distance $d_A$ (all in $\\text{Mpc}$), the apparent magnitude $m_B$ of the supernova (neglecting extinction and $K$-correction), and the observed angular diameter $\\theta$ of the host galaxy (in arcseconds). Finally, compute the apparent magnitude $m_{B,\\mathrm{EdS}}$ the same supernova would have in a flat matter-only Einstein–de Sitter universe ($\\Omega_{m,0} = 1, \\Omega_{\\Lambda,0} = 0$, where $d_C = \\frac{2c}{H_0}\\left[1 - (1+z)^{-1/2}\\right]$) and the resulting supernova dimming $\\Delta m_B = m_B - m_{B,\\mathrm{EdS}}$. <em>(2.5 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Flat $\\Lambda$CDM dynamics, deceleration-to-acceleration transition, closed-form cosmic lookback time, cosmological distances, and Type Ia supernova dimming.</p>

<p><strong>(a) Deceleration Parameter $q(z)$, Present Value $q_0$ &amp; Transition Redshift $z_t$ (2.5 points):</strong><br>
Substituting $\\rho_m(z) = \\rho_{c,0}\\Omega_{m,0}(1+z)^3$, $\\rho_\\Lambda = \\rho_{c,0}\\Omega_{\\Lambda,0}$, $P_m = 0$, $P_\\Lambda = -\\rho_\\Lambda c^2$, and $\\frac{8\\pi G \\rho_{c,0}}{3} = H_0^2$ into the acceleration equation yields:</p>
<p>$$ \\frac{\\ddot{a}}{a} = -\\frac{4\\pi G}{3}\\left(\\rho_m - 2\\rho_\\Lambda\\right) = H_0^2\\left[\\Omega_{\\Lambda,0} - \\frac{1}{2}\\Omega_{m,0}(1+z)^3\\right] $$</p>
<p>Dividing $-\\ddot{a}/a$ by $H^2(z) = H_0^2\\left[\\Omega_{m,0}(1+z)^3 + \\Omega_{\\Lambda,0}\\right]$ gives:</p>
<p>$$ q(z) = \\mathbf{\\frac{\\frac{1}{2}\\Omega_{m,0}(1+z)^3 - \\Omega_{\\Lambda,0}}{\\Omega_{m,0}(1+z)^3 + \\Omega_{\\Lambda,0}}} $$</p>
<p>At $z = 0$ (where $\\Omega_{m,0} + \\Omega_{\\Lambda,0} = 1$): $q_0 = \\frac{1}{2}(0.300) - 0.700 = \\mathbf{-0.550}$ (accelerating today). Setting $q(z_t) = 0$:</p>
<p>$$ \\frac{1}{2}\\Omega_{m,0}(1+z_t)^3 = \\Omega_{\\Lambda,0} \\implies z_t = \\left(\\frac{2\\Omega_{\\Lambda,0}}{\\Omega_{m,0}}\\right)^{1/3} - 1 = \\left(\\frac{1.400}{0.300}\\right)^{1/3} - 1 \\approx \\mathbf{0.671} $$</p>

<p><strong>(b) Hubble Parameter, Critical Density &amp; Matter–Dark-Energy Ratio at $z = 1.00$ (2.5 points):</strong><br>
With $H_0 = \\frac{7.00 \\times 10^4\\ \\mathrm{m\\,s^{-1}}}{3.086 \\times 10^{22}\\text{ m}} = 2.2683 \\times 10^{-18}\\ \\mathrm{s^{-1}}$ and $E(1) = \\sqrt{0.300(2)^3 + 0.700} = \\sqrt{3.100} = 1.76068$:</p>
<p>$$ H(1.00) = H_0 E(1) = 70.0 \\times 1.76068 = \\mathbf{123.2\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}}} \\quad (3.994 \\times 10^{-18}\\ \\mathrm{s^{-1}}) $$</p>
<p>$$ \\rho_c(1.00) = \\frac{3 H^2(1.00)}{8\\pi G} = \\frac{3(3.9938 \\times 10^{-18})^2}{8\\pi(6.674 \\times 10^{-11})} \\approx \\mathbf{2.85 \\times 10^{-26}\\ \\mathrm{kg\\,m^{-3}}} $$</p>
<p>$$ \\frac{\\rho_m(1.00)}{\\rho_\\Lambda} = \\frac{\\Omega_{m,0}}{\\Omega_{\\Lambda,0}}(1 + 1.00)^3 = \\frac{0.300}{0.700}(8) = \\mathbf{3.43} $$</p>
<p>Matter–dark-energy equality ($\\rho_m = \\rho_\\Lambda$) occurred at:</p>
<p>$$ z_{\\mathrm{eq},\\Lambda} = \\left(\\frac{\\Omega_{\\Lambda,0}}{\\Omega_{m,0}}\\right)^{1/3} - 1 = \\left(\\frac{0.700}{0.300}\\right)^{1/3} - 1 \\approx \\mathbf{0.326} $$</p>

<p><strong>(c) Cosmic Age &amp; Lookback Time at $z = 1.00$ (2.5 points):</strong><br>
The Hubble time is $H_0^{-1} = (2.2683 \\times 10^{-18}\\ \\mathrm{s^{-1}})^{-1} = 4.4086 \\times 10^{17}\\text{ s} = \\mathbf{13.97\\text{ Gyr}}$, and the prefactor is $\\frac{2 H_0^{-1}}{3\\sqrt{0.700}} = 11.131\\text{ Gyr}$. With $\\sqrt{\\Omega_{\\Lambda,0}/\\Omega_{m,0}} = \\sqrt{7/3} = 1.5275$:</p>
<p>$$ t_0 = t(a = 1) = (11.131\\text{ Gyr})\\,\\mathrm{arsinh}(1.5275) = (11.131)(1.2099) \\approx \\mathbf{13.47\\text{ Gyr}} $$</p>
<p>$$ t(z = 1.00) = t(a = 0.5) = (11.131\\text{ Gyr})\\,\\mathrm{arsinh}\\!\\left(1.5275 \\times 0.5^{3/2}\\right) = (11.131)\\,\\mathrm{arsinh}(0.5401) = (11.131)(0.5168) \\approx \\mathbf{5.75\\text{ Gyr}} $$</p>
<p>$$ t_L(z = 1.00) = t_0 - t(z = 1.00) = 13.468 - 5.752 \\approx \\mathbf{7.72\\text{ Gyr}} $$</p>

<p><strong>(d) Cosmological Distances, Host Galaxy Angular Size &amp; Supernova Dimming (2.5 points):</strong><br>
The Hubble distance is $d_H = c/H_0 = 2.998 \\times 10^5 / 70.0 = 4282.9\\text{ Mpc}$. For a flat universe ($k = 0$) at $z = 1.00$:</p>
<p>$$ d_C = d_H \\times 0.7714 = \\mathbf{3304\\text{ Mpc}}, \\qquad d_L = (1+z)d_C = \\mathbf{6608\\text{ Mpc}}, \\qquad d_A = \\frac{d_C}{1+z} = \\mathbf{1652\\text{ Mpc}} $$</p>
<p>The supernova's apparent $B$-band magnitude and the host galaxy's angular diameter ($L = 0.0200\\text{ Mpc}$) are:</p>
<p>$$ m_B = M_B + 5\\log_{10}\\!\\left(\\frac{d_L}{10\\text{ pc}}\\right) = -19.30 + 5\\log_{10}(6.6076 \\times 10^8) = -19.30 + 44.100 = \\mathbf{24.80\\text{ mag}} $$</p>
<p>$$ \\theta = \\frac{L}{d_A} = \\frac{0.0200\\text{ Mpc}}{1651.9\\text{ Mpc}} \\times 206265'' \\approx \\mathbf{2.50''} $$</p>
<p>In a flat Einstein–de Sitter universe ($\\Omega_{m,0} = 1,\\ \\Omega_{\\Lambda,0} = 0$) at $z = 1.00$:</p>
<p>$$ d_{C,\\mathrm{EdS}} = 2 d_H\\left(1 - 2^{-1/2}\\right) = 2508.8\\text{ Mpc} \\implies d_{L,\\mathrm{EdS}} = 5017.7\\text{ Mpc} $$</p>
<p>$$ m_{B,\\mathrm{EdS}} = -19.30 + 5\\log_{10}(5.0177 \\times 10^8) = \\mathbf{24.20\\text{ mag}} $$</p>
<p>$$ \\Delta m_B = m_B - m_{B,\\mathrm{EdS}} = 24.800 - 24.203 \\approx \\mathbf{+0.60\\text{ mag}} $$</p>
<p>Thus, dark-energy-driven acceleration makes a $z = 1.00$ Type Ia supernova appear $0.60\\text{ mag}$ fainter (a factor of $1.73$ dimmer, or $42\\%$ lower in observed flux) than in a decelerating matter-only Einstein–de Sitter cosmology.</p>`
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
    },

    // Week 03 — 02.11.2026 – 08.11.2026
    {
        uniqueId: "potw_2026_w3",
        weekNumber: 3,
        scheduledDate: "02.11.2026 – 08.11.2026",
        title: "The Invisible Planet and the Dance of the Stars",
        author: "Albert",
        module: "T1 · Celestial Mechanics & Perturbation Theory",
        difficultyClass: "hard",
        difficultyText: "6.8 / 10.0",
        description: `<p>Two identical stars, each of mass \\(M\\), move on circular orbits around their common center of mass. The distance between the two stars is constant and equal to \\(2a\\). In the same orbital plane lies a test body (a circumbinary planet) of negligible mass at distance \\(R\\) from the center of mass of the system, where:</p>
<p>$$ R \\gg a $$</p>
<p>The planet follows an almost circular orbit. Neglect all other gravitational influences and relativistic effects. Denote the gravitational constant by \\(G\\). Throughout all calculations until the end, retain terms up to order \\((a/R)^2\\) inclusive and neglect higher-order terms.</p>
<p><em>Methodological Hint:</em> When expanding the gravitational potential, it is helpful to treat the contributions of the two stars separately and perform the time averaging afterward. Use \\(G = 6.67430 \\times 10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}\\), \\(M_\\odot = 1.9885 \\times 10^{30}\\text{ kg}\\), and \\(1\\text{ AU} = 1.4960 \\times 10^{11}\\text{ m}\\).</p>

<div class="task-box" style="margin-top: 18px; border-left: 3px solid var(--accent-blue); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part A — The Time-Averaged Gravitational Potential</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        At a given instant, the angle between the radius vector of the planet and the line joining the two stars is \\(\\theta\\).
    </p>
    <ol style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Starting from the exact expression for the gravitational potential, expand it in powers of \\(a/R\\) and show that the instantaneous potential can be written, up to the required order, in the form:
        $$ \\Phi(R, \\theta) = \\Phi_0(R) + \\Phi_2(R, \\theta) $$ <em>(1.0 point)</em></li>
        <li>Calculate the effective time-averaged potential over one orbital period of the binary stars, \\(\\langle \\Phi(R) \\rangle\\). Interpret physically the extra term that appears compared to the potential of a single central star of mass \\(2M\\). <em>(1.0 point)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-purple); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part B — Circular Motion</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.0 Points</span>
    </div>
    <ol start="3" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Using the time-averaged potential, determine the orbital angular frequency \\(\\Omega\\) of a circular orbit of radius \\(R\\), expressed in terms of \\(G, M, a\\), and \\(R\\). <em>(1.0 point)</em></li>
        <li>Compare your result with the classical Keplerian frequency:
        $$ n = \\sqrt{\\frac{2GM}{R^3}} $$
        which would be obtained if the two stars were replaced by a single point mass \\(2M\\) at the center. Determine, to the first non-vanishing order in \\(a/R\\), which of the two frequencies is larger, and explain physically why. <em>(1.0 point)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-gold); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part C — The Orbit Is Not Quite an Ellipse</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.5 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        Now consider a nearly circular orbit and apply a small radial perturbation:
        $$ R(t) = R_0 + \\delta R(t), \\qquad |\\delta R| \\ll R_0 $$
    </p>
    <ol start="5" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Show that the radial perturbation is approximately simple harmonic and determine the radial (epicyclic) frequency \\(\\kappa\\). <em>(1.25 points)</em></li>
        <li>Because \\(\\kappa \\ne \\Omega\\) in general, the direction of the periastron does not remain fixed. Prove that the periastron advance after one complete revolution of the planet is, in the required approximation:
        $$ \\Delta\\varpi \\simeq \\frac{3\\pi}{2}\\frac{a^2}{R^2} $$
        Specify the direction (sense) of the apsidal precession. <em>(1.25 points)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-green); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part D — An Observable System</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">2.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        A binary star system has \\(M = 1.2\\,M_\\odot\\) and \\(2a = 0.20\\text{ AU}\\), while a circumbinary planet moves on a nearly circular orbit with \\(R = 1.60\\text{ AU}\\).
    </p>
    <ol start="7" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Calculate the orbital period of the planet, retaining the correction due to the binary structure. <em>(0.75 points)</em></li>
        <li>Calculate by how many degrees the periastron advances per revolution. <em>(0.75 points)</em></li>
        <li>Estimate the time required for the major axis of the orbit to rotate by \\(360^\\circ\\). <em>(0.5 points)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-blue); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part E — The Inverse Problem</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">1.5 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        An astronomer cannot resolve the two central stars and detects only the planet, measuring very precisely its orbital period \\(P\\), orbital radius \\(R\\), and periastron advance \\(\\Delta\\varpi\\) from one revolution to the next.
    </p>
    <ol start="10" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Show that, within the approximation of this problem, these observations alone allow the astronomer to determine both the total mass \\(M_{\\mathrm{tot}} = 2M\\) of the binary system and the separation \\(2a\\) between the two stars without resolving them directly. <em>(0.75 points)</em></li>
        <li>Explain why applying Kepler's Third Law naively while ignoring apsidal precession leads to a systematically biased value for the total mass, and state whether the mass is overestimated or underestimated. <em>(0.75 points)</em></li>
    </ol>
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Multipole (Legendre quadrupole) expansion of a circumbinary gravitational potential, secular time-averaging, epicyclic frequency perturbation, and apsidal precession.</p>

<p><strong>Part A — The Time-Averaged Gravitational Potential (2.0 Points)</strong></p>
<p><strong>1. Multipole Expansion of the Instantaneous Potential (1.0 point):</strong><br>
Relative to the center of mass, the two stars lie at distance \\(a\\) at angles \\(\\theta\\) and \\(\\theta + \\pi\\) from the planet's radius vector \\(\\mathbf{R}\\). By the law of cosines, the distances from the planet to the two stars are:</p>
<p>$$ r_{1,2} = \\sqrt{R^2 + a^2 \\mp 2aR\\cos\\theta} = R\\sqrt{1 \\mp \\frac{2a}{R}\\cos\\theta + \\left(\\frac{a}{R}\\right)^2} $$</p>
<p>Using the Taylor expansion \\((1 + \\epsilon)^{-1/2} = 1 - \\frac{1}{2}\\epsilon + \\frac{3}{8}\\epsilon^2 + \\mathcal{O}(\\epsilon^3)\\) with \\(\\epsilon = \\mp\\frac{2a}{R}\\cos\\theta + \\left(\\frac{a}{R}\\right)^2\\):</p>
<p>$$ \\frac{1}{r_{1,2}} = \\frac{1}{R}\\left[1 \\pm \\left(\\frac{a}{R}\\right)\\cos\\theta + \\frac{1}{2}\\left(\\frac{a}{R}\\right)^2\\left(3\\cos^2\\theta - 1\\right) + \\mathcal{O}\\!\\left(\\frac{a^3}{R^3}\\right)\\right] $$</p>
<p>Summing the two contributions \\(\\Phi(R,\\theta) = -GM\\left(\\frac{1}{r_1} + \\frac{1}{r_2}\\right)\\), the odd dipole terms \\(\\pm(a/R)\\cos\\theta\\) cancel by symmetry, leaving:</p>
<p>$$ \\Phi(R,\\theta) = \\underbrace{-\\frac{2GM}{R}}_{\\Phi_0(R)} \\underbrace{- \\frac{GM a^2}{R^3}\\left(3\\cos^2\\theta - 1\\right)}_{\\Phi_2(R,\\theta)} = -\\frac{2GM}{R} - \\frac{GM a^2}{2 R^3}\\left(1 + 3\\cos 2\\theta\\right) $$</p>

<p><strong>2. Secular Time-Averaged Potential \\(\\langle\\Phi(R)\\rangle\\) (1.0 point):</strong><br>
Because the binary orbital period is much shorter than the planet's orbital period (\\(R \\gg a\\)), the angle \\(\\theta\\) sweeps rapidly through \\([0, 2\\pi]\\). Using \\(\\langle\\cos^2\\theta\\rangle = \\frac{1}{2}\\) (so \\(\\langle 3\\cos^2\\theta - 1\\rangle = \\frac{1}{2}\\)):</p>
<p>$$ \\langle\\Phi(R)\\rangle = -\\frac{2GM}{R} - \\frac{GM a^2}{2 R^3} = -\\frac{2GM}{R}\\left[1 + \\frac{1}{4}\\left(\\frac{a}{R}\\right)^2\\right] $$</p>
<p><em>Physical interpretation:</em> The extra term \\(-\\frac{GM a^2}{2R^3}\\) is the attractive gravitational <strong>quadrupole potential</strong> equivalent to smearing the two stars of mass \\(M\\) into a uniform circular ring of mass \\(2M\\) and radius \\(a\\) in the orbital plane.</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part B — Circular Motion (2.0 Points)</strong></p>
<p><strong>3. Angular Frequency \\(\\Omega\\) of a Circular Orbit (1.0 point):</strong><br>
For a circular orbit of radius \\(R\\) in the central potential \\(\\langle\\Phi(R)\\rangle\\), the inward radial acceleration balances the centripetal acceleration \\(\\Omega^2 R = \\frac{d\\langle\\Phi\\rangle}{dR}\\):</p>
<p>$$ \\frac{d\\langle\\Phi\\rangle}{dR} = \\frac{2GM}{R^2} + \\frac{3GM a^2}{2 R^4} = \\frac{2GM}{R^2}\\left[1 + \\frac{3}{4}\\left(\\frac{a}{R}\\right)^2\\right] $$</p>
<p>Dividing by \\(R\\) and taking the square root using \\(\\sqrt{1+x} \\simeq 1 + \\frac{1}{2}x\\):</p>
<p>$$ \\Omega = \\sqrt{\\frac{2GM}{R^3}}\\left[1 + \\frac{3}{8}\\left(\\frac{a}{R}\\right)^2\\right] $$</p>

<p><strong>4. Comparison with the Keplerian Frequency \\(n\\) (1.0 point):</strong><br>
Since \\(\\Omega = n\\left[1 + \\frac{3}{8}\\left(\\frac{a}{R}\\right)^2\\right]\\), we have <strong>\\(\\Omega > n\\)</strong>. Physically, because the gravitational force \\(F \\propto r^{-2}\\) is a convex function of distance, the increase in attraction from the nearer star outweighs the decrease in attraction from the farther star when averaged over all angles, producing a stronger net inward pull than a single point mass \\(2M\\) at the origin.</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part C — The Orbit Is Not Quite an Ellipse (2.5 Points)</strong></p>
<p><strong>5. Radial Perturbation &amp; Epicyclic Frequency \\(\\kappa\\) (1.25 points):</strong><br>
In terms of the conserved specific angular momentum \\(L = R^2\\dot{\\varphi} = R_0^2 \\Omega\\), the radial equation of motion is \\(\\ddot{R} = -\\frac{d\\Phi_{\\mathrm{eff}}}{dR}\\), where \\(\\Phi_{\\mathrm{eff}}(R) = \\langle\\Phi(R)\\rangle + \\frac{L^2}{2R^2}\\). Linearizing around \\(R = R_0\\) with \\(R(t) = R_0 + \\delta R(t)\\) gives \\(\\delta\\ddot{R} + \\kappa^2 \\delta R = 0\\), where:</p>
<p>$$ \\kappa^2 = \\left.\\frac{d^2\\Phi_{\\mathrm{eff}}}{dR^2}\\right|_{R_0} = \\left.\\frac{d^2\\langle\\Phi\\rangle}{dR^2}\\right|_{R_0} + \\frac{3}{R_0}\\left.\\frac{d\\langle\\Phi\\rangle}{dR}\\right|_{R_0} $$</p>
<p>Using \\(\\frac{d\\langle\\Phi\\rangle}{dR} = \\frac{2GM}{R^2} + \\frac{3GMa^2}{2R^4}\\) and \\(\\frac{d^2\\langle\\Phi\\rangle}{dR^2} = -\\frac{4GM}{R^3} - \\frac{6GMa^2}{R^5}\\):</p>
<p>$$ \\kappa^2 = \\left(-\\frac{4GM}{R_0^3} - \\frac{6GMa^2}{R_0^5}\\right) + \\left(\\frac{6GM}{R_0^3} + \\frac{9GMa^2}{2R_0^5}\\right) = \\frac{2GM}{R_0^3}\\left[1 - \\frac{3}{4}\\left(\\frac{a}{R_0}\\right)^2\\right] $$</p>
<p>Taking the square root yields the radial epicyclic frequency:</p>
<p>$$ \\kappa = \\sqrt{\\frac{2GM}{R_0^3}}\\left[1 - \\frac{3}{8}\\left(\\frac{a}{R_0}\\right)^2\\right] = n\\left[1 - \\frac{3}{8}\\left(\\frac{a}{R_0}\\right)^2\\right] $$</p>

<p><strong>6. Periastron Advance per Revolution \\(\\Delta\\varpi\\) (1.25 points):</strong><br>
The time between two successive periastron passages (one full radial oscillation) is the anomalistic period \\(T_r = \\frac{2\\pi}{\\kappa}\\). During this interval, the planet sweeps an azimuthal angle \\(\\Delta\\varphi = \\Omega T_r = 2\\pi\\frac{\\Omega}{\\kappa}\\). Using \\((1+x)/(1-x) \\simeq 1 + 2x\\) for \\(x = \\frac{3}{8}(a/R)^2\\):</p>
<p>$$ \\frac{\\Omega}{\\kappa} = \\frac{1 + \\frac{3}{8}(a/R)^2}{1 - \\frac{3}{8}(a/R)^2} \\simeq 1 + \\frac{3}{4}\\left(\\frac{a}{R}\\right)^2 $$</p>
<p>Hence, the apsidal shift per revolution is:</p>
<p>$$ \\Delta\\varpi = \\Delta\\varphi - 2\\pi = 2\\pi\\left(\\frac{\\Omega}{\\kappa} - 1\\right) \\simeq \\mathbf{\\frac{3\\pi}{2}\\frac{a^2}{R^2}} $$</p>
<p>Because \\(\\kappa < \\Omega\\) (\\(\\Delta\\varpi > 0\\)), the planet must travel slightly more than \\(2\\pi\\) radians in azimuth to complete one radial oscillation, so the periastron precesses in the <strong>prograde direction</strong> (in the same direction as the orbital motion).</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part D — An Observable System (2.0 Points)</strong></p>
<p>With \\(M = 1.2\\,M_\\odot\\), \\(a = 0.10\\text{ AU}\\), and \\(R = 1.60\\text{ AU}\\), the dimensionless ratio is \\(\\frac{a}{R} = \\frac{0.10}{1.60} = \\frac{1}{16} = 0.0625\\), so \\(\\left(\\frac{a}{R}\\right)^2 = \\frac{1}{256} \\approx 3.90625 \\times 10^{-3}\\).</p>
<ul>
    <li><strong>7. Orbital Period \\(P\\) (0.75 points):</strong><br>
    The unperturbed Keplerian frequency for total mass \\(2M = 2.4\\,M_\\odot\\) is:
    $$ n = \\sqrt{\\frac{2GM}{R^3}} = \\sqrt{\\frac{2(6.67430 \\times 10^{-11})(1.2 \\times 1.9885 \\times 10^{30})}{(1.60 \\times 1.4960 \\times 10^{11})^3}} \\approx 1.52403 \\times 10^{-7}\\ \\mathrm{rad\\,s^{-1}} $$
    which corresponds to \\(P_{\\mathrm{Kep}} = \\frac{2\\pi}{n} \\approx 4.1227 \\times 10^7\\text{ s} \\approx 477.17\\text{ days} \\ (1.3064\\text{ yr})\\). Including the quadrupole correction:
    $$ P = \\frac{2\\pi}{\\Omega} \\simeq P_{\\mathrm{Kep}}\\left[1 - \\frac{3}{8}\\left(\\frac{a}{R}\\right)^2\\right] = 477.17\\text{ d} \\times (1 - 0.001465) \\approx \\mathbf{476.47\\text{ days}} \\quad (\\mathbf{1.3045\\text{ years}}) $$</li>
    <li><strong>8. Periastron Advance per Revolution (0.75 points):</strong>
    $$ \\Delta\\varpi = \\frac{3\\pi}{2}\\left(\\frac{1}{16}\\right)^2 = \\frac{3\\pi}{512}\\text{ rad} \\approx 0.01841\\text{ rad} \\approx \\mathbf{1.055^\\circ\\text{ / rev}} $$</li>
    <li><strong>9. Time for a Full \\(360^\\circ\\) Precession Cycle (0.5 points):</strong><br>
    The number of revolutions required is \\(N_{\\mathrm{rev}} = \\frac{360^\\circ}{1.0547^\\circ} = \\frac{512}{1.5} \\approx 341.33\\text{ revolutions}\\):
    $$ T_{\\mathrm{prec}} = N_{\\mathrm{rev}} \\times P \\approx 341.33 \\times 1.3045\\text{ yr} \\approx \\mathbf{445.3\\text{ years}} $$</li>
</ul>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part E — The Inverse Problem (1.5 Points)</strong></p>
<p><strong>10. Recovering Both \\(2a\\) and \\(M_{\\mathrm{tot}} = 2M\\) (0.75 points):</strong><br>
From the measured orbital radius \\(R\\) and apsidal advance \\(\\Delta\\varpi\\), the binary separation \\(2a\\) is isolated directly from the precession relation:</p>
<p>$$ a = R\\sqrt{\\frac{2\\,\\Delta\\varpi}{3\\pi}} \\implies \\mathbf{2a = 2R\\sqrt{\\frac{2\\,\\Delta\\varpi}{3\\pi}}} $$</p>
<p>Substituting \\(\\left(\\frac{a}{R}\\right)^2 = \\frac{2\\,\\Delta\\varpi}{3\\pi}\\) into \\(\\Omega = \\frac{2\\pi}{P} = \\sqrt{\\frac{G M_{\\mathrm{tot}}}{R^3}}\\left[1 + \\frac{3}{8}\\left(\\frac{a}{R}\\right)^2\\right]\\) yields the true total binary mass:</p>
<p>$$ \\mathbf{M_{\\mathrm{tot}} = 2M \\simeq \\frac{4\\pi^2 R^3}{G P^2}\\left(1 - \\frac{\\Delta\\varpi}{2\\pi}\\right) = \\frac{4\\pi^2 R^3}{G P^2}\\left[1 - \\frac{3}{4}\\left(\\frac{a}{R}\\right)^2\\right]} $$</p>

<p><strong>11. Systematic Mass Bias When Ignoring Precession (0.75 points):</strong><br>
If the astronomer applies Kepler's Third Law naively (\\(M_{\\mathrm{naive}} = \\frac{4\\pi^2 R^3}{G P^2}\\)), the quadrupole attraction that speeds up the planet's orbital motion (\\(\\Omega > n\\), shortening \\(P\\)) is misattributed entirely to a larger central mass. Consequently, ignoring the binary quadrupole systematically <strong>overestimates</strong> the total mass of the binary by a relative fraction of \\(\\frac{3}{4}(a/R)^2 = \\frac{\\Delta\\varpi}{2\\pi}\\) (about \\(+0.29\\%\\) for the system in Part D).</p>`
    },

    // Week 04 — 09.11.2026 – 15.11.2026
    {
        uniqueId: "potw_2026_w4",
        weekNumber: 4,
        scheduledDate: "09.11.2026 – 15.11.2026",
        title: "Saturn's Hexagon",
        author: "Mihai",
        module: "T9 · Planetary Atmospheres & Rossby Wave Dynamics",
        difficultyClass: "hard",
        difficultyText: "6.4 / 10.0",
        description: `<p>Saturn's north polar hexagon was first discovered in 1988 by astronomer David A. Godfrey, who was analyzing archival images taken by the Voyager 1 and 2 spacecraft during their flybys in 1980 and 1981. Because the pattern was only captured in a limited number of frames, early researchers were unsure whether it was a fleeting weather anomaly or a permanent atmospheric feature.</p>
<p>It wasn't until the Cassini spacecraft entered orbit and observed the north pole emerging from winter shadows in 2006 that the hexagon was definitively confirmed as a permanent, remarkably stable structure. Because it had maintained its geometric shape for at least an entire Saturnian year (nearly 30 Earth years), physicists realized it was not a random storm, but a deeply rooted planetary standing wave.</p>
<p>In this problem, we will discover how such patterns form in planetary atmospheres, why Saturn's hexagon is so stable, and why it is a hexagon in the first place. Throughout this problem, we use a local Cartesian coordinate system \\((x, y)\\) with the \\(x\\)-axis pointing <strong>eastward</strong> and the \\(y\\)-axis pointing <strong>northward</strong>.</p>

<div class="task-box" style="margin-top: 18px; border-left: 3px solid var(--accent-blue); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part A — Eastward Wind Speed in Saturn's Atmosphere</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">3.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        Consider an air parcel of volume \\(V = \\Delta x\\,\\Delta y\\,\\Delta z\\) moving eastward through Saturn's atmosphere. Because of non-uniform heating between the equator and the poles, the parcel experiences a pressure difference in the north–south (\\(y\\)) direction.
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Derive an expression for the force per unit mass (acceleration) felt by the parcel due to the pressure difference, in terms of the northward pressure gradient \\(\\frac{\\partial P}{\\partial y}\\) at the parcel's location and the parcel density \\(\\rho\\). <em>(1.5 points)</em></li>
        <li>For the parcel to flow purely eastward at speed \\(U\\), the northward pressure-gradient force must be balanced by the southward Coriolis force per unit mass \\(a_{\\mathrm{Coriolis}} = f U\\), where \\(f = 2\\Omega\\sin\\phi\\) is the Coriolis parameter (\\(\\Omega\\) is the planet's angular rotation velocity and \\(\\phi\\) is the latitude). Assuming the atmosphere behaves as an ideal gas, find \\(U\\) in terms of \\(\\frac{\\partial P}{\\partial y}\\), \\(f\\), the local temperature \\(T\\), local pressure \\(P\\), the mean molecular mass \\(\\mu m_H\\) (or molar mass \\(M_{\\mathrm{mol}}\\)), and fundamental constants. <em>(1.5 points)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-purple); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part B — Why Do We See a Hexagon-Shaped Structure?</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">7.0 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        If the air parcel is displaced slightly northward or southward by a small distance \\(y\\), it oscillates around its equilibrium latitude \\(y = 0\\). In frictionless barotropic flow, the absolute vorticity \\(\\eta = \\zeta + f\\) is conserved along the parcel's trajectory, where the relative vorticity is:
        $$ \\zeta = \\frac{\\partial v}{\\partial x} - \\frac{\\partial u}{\\partial y} $$
        with \\(u\\) the eastward velocity and \\(v\\) the northward velocity.
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Assuming \\(u = U = \\text{const.}\\) across a small displacement \\(dy\\) and that the parcel initially has zero relative vorticity (\\(\\zeta_0 = 0\\) at \\(y = 0\\)), derive the differential equation for the northward displacement \\(y(x)\\) as the parcel moves around Saturn. Show that it executes simple harmonic motion around \\(y = 0\\) and find the wavelength \\(\\lambda\\) of the resulting <em>Rossby wave</em> in terms of \\(U\\) and the northward Coriolis gradient \\(\\beta = \\frac{\\partial f}{\\partial y}\\). <em>(2.0 points)</em></li>
        <li>For the polygonal wave pattern to remain stationary and not interfere destructively with itself, the air parcel must end up in the exact same phase after completing a full loop around the latitude circle \\(\\phi\\). Find an expression for the integer number of polygon sides \\(m\\) in terms of \\(U\\), \\(\\beta\\), the latitude \\(\\phi\\), and Saturn's radius \\(R_{\\mathrm{Saturn}}\\). <em>(1.5 points)</em></li>
        <li>Derive an expression for \\(\\beta = \\frac{\\partial f}{\\partial y}\\) in terms of \\(\\Omega\\), \\(\\phi\\), and \\(R_{\\mathrm{Saturn}}\\). Then, using \\(U = 120\\ \\mathrm{m\\,s^{-1}}\\), \\(R_{\\mathrm{Saturn}} = 6.027 \\times 10^7\\text{ m}\\), Saturn's rotation period \\(P_{\\mathrm{rot}} \\approx 10^{\\text{h}}39^{\\text{m}}\\) (\\(\\Omega \\approx 1.64 \\times 10^{-4}\\ \\mathrm{rad\\,s^{-1}}\\)), and the observed hexagon latitude \\(\\phi = 75.63^\\circ\\), calculate the predicted value of \\(m\\). How far is it from the observed value \\(m = 6\\)? <em>(1.5 points)</em></li>
        <li>In reality, neglecting the meridional shear of \\(U(y)\\) is a poor approximation for a narrow jet. Accounting for the curvature of the wind profile replaces \\(\\beta\\) with the effective parameter:
        $$ \\beta_{\\mathrm{eff}} = \\beta - \\frac{\\partial^2 U}{\\partial y^2} $$
        <em>Sánchez-Lavega et al. (2014)</em> measured the velocity profile of Saturn's north polar jet shown below. Approximating the peak of the red curve as a parabola \\(U(y) = U_{\\max} - c y^2\\) around the jet center, determine the constant \\(c\\) from the graph and calculate the corrected number of sides \\(m\\). <em>(2.0 points)</em></li>
    </ol>
    <img src="assets/img/potw/saturn_hexagon_jet_profile.png" alt="Saturn North Polar Jet Profile — Sánchez-Lavega et al. (2014)" class="user-diagram" onclick="window.openImageModal(this)">
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Geostrophic wind balance, barotropic potential vorticity conservation, planetary Rossby waves, and jet-stream curvature stabilization (Sánchez-Lavega et al., 2014).</p>

<p><strong>Part A — Eastward Wind Speed in Saturn's Atmosphere (3.0 Points)</strong></p>
<p><strong>(a) Northward Pressure-Gradient Acceleration (1.5 points):</strong><br>
For an air parcel of volume \\(V = \\Delta x\\,\\Delta y\\,\\Delta z\\) and mass \\(m = \\rho\\,\\Delta x\\,\\Delta y\\,\\Delta z\\), the net force in the northward (\\(+y\\)) direction due to pressure acting on the southern face \\(y\\) and northern face \\(y + \\Delta y\\) is:</p>
<p>$$ F_y = \\big[P(y) - P(y + \\Delta y)\\big]\\Delta x\\,\\Delta z \\simeq -\\frac{\\partial P}{\\partial y}\\,\\Delta x\\,\\Delta y\\,\\Delta z = -\\frac{\\partial P}{\\partial y}V $$</p>
<p>Dividing by the parcel mass \\(m = \\rho V\\) gives the pressure-gradient force per unit mass:</p>
<p>$$ a_{\\mathrm{press},y} = \\frac{F_y}{m} = \\mathbf{-\\frac{1}{\\rho}\\frac{\\partial P}{\\partial y}} $$</p>

<p><strong>(b) Geostrophic Eastward Wind Speed \\(U\\) (1.5 points):</strong><br>
In the northern hemisphere, an eastward flow (\\(U > 0\\)) experiences a southward Coriolis acceleration \\(-f U\\). Balancing the northward pressure-gradient force against the southward Coriolis force requires \\(-\\frac{1}{\\rho}\\frac{\\partial P}{\\partial y} - f U = 0\\) (where \\(\\frac{\\partial P}{\\partial y} < 0\\) as pressure decreases toward the cold pole):</p>
<p>$$ U = -\\frac{1}{\\rho f}\\frac{\\partial P}{\\partial y} $$</p>
<p>Substituting the ideal gas law \\(\\rho = \\frac{P \\mu m_H}{k_B T} = \\frac{P M_{\\mathrm{mol}}}{R_{\\mathrm{gas}} T}\\):</p>
<p>$$ U = \\mathbf{-\\frac{k_B T}{f P \\mu m_H}\\frac{\\partial P}{\\partial y} = -\\frac{R_{\\mathrm{gas}} T}{f P M_{\\mathrm{mol}}}\\frac{\\partial P}{\\partial y}} $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part B — Why Do We See a Hexagon-Shaped Structure? (7.0 Points)</strong></p>
<p><strong>(a) Rossby Wave Differential Equation &amp; Wavelength \\(\\lambda\\) (2.0 points):</strong><br>
Expanding the Coriolis parameter to first order around the equilibrium latitude \\(y = 0\\) gives \\(f(y) = f_0 + \\beta y\\), where \\(\\beta = \\frac{\\partial f}{\\partial y}\\). Conservation of absolute vorticity \\(\\eta = \\zeta + f = \\text{const.}\\) with initial condition \\(\\zeta_0 = 0\\) at \\(y = 0\\) yields:</p>
<p>$$ \\zeta + f_0 + \\beta y = f_0 \\implies \\zeta = -\\beta y $$</p>
<p>Since \\(u = U = \\text{const.}\\) (\\(\\frac{\\partial u}{\\partial y} = 0\\)), the relative vorticity reduces to \\(\\zeta = \\frac{\\partial v}{\\partial x}\\). For a parcel advected eastward at speed \\(U = \\frac{dx}{dt}\\), the northward velocity is \\(v = \\frac{dy}{dt} = U\\frac{dy}{dx}\\), so \\(\\zeta = \\frac{\\partial v}{\\partial x} = U\\frac{d^2 y}{dx^2}\\). Substituting into \\(\\zeta = -\\beta y\\) gives the harmonic oscillator equation:</p>
<p>$$ \\mathbf{\\frac{d^2 y}{dx^2} + \\frac{\\beta}{U}\\,y = 0} \\qquad \\left(\\text{or in time: } \\frac{d^2 y}{dt^2} + \\beta U\\,y = 0\\right) $$</p>
<p>This describes sinusoidal oscillations around \\(y = 0\\) with wavenumber \\(k = \\sqrt{\\frac{\\beta}{U}}\\), corresponding to the stationary Rossby wavelength:</p>
<p>$$ \\lambda = \\frac{2\\pi}{k} = \\mathbf{2\\pi\\sqrt{\\frac{U}{\\beta}}} $$</p>

<p><strong>(b) Number of Polygon Sides \\(m\\) from Periodic Boundary Condition (1.5 points):</strong><br>
At latitude \\(\\phi\\), the circumference of the parallel circle around Saturn is \\(C(\\phi) = 2\\pi R_{\\mathrm{Saturn}}\\cos\\phi\\). Constructive closure after one full loop requires an integer number of wavelengths \\(m\\lambda = C(\\phi)\\):</p>
<p>$$ m = \\frac{2\\pi R_{\\mathrm{Saturn}}\\cos\\phi}{2\\pi\\sqrt{U / \\beta}} = \\mathbf{R_{\\mathrm{Saturn}}\\cos\\phi\\sqrt{\\frac{\\beta}{U}}} $$</p>

<p><strong>(c) Expression for \\(\\beta\\) &amp; Uniform-Flow Prediction for \\(m\\) (1.5 points):</strong><br>
Using \\(dy = R_{\\mathrm{Saturn}}\\,d\\phi\\) and \\(f = 2\\Omega\\sin\\phi\\):</p>
<p>$$ \\beta = \\frac{\\partial f}{\\partial y} = \\frac{1}{R_{\\mathrm{Saturn}}}\\frac{d}{d\\phi}\\left(2\\Omega\\sin\\phi\\right) = \\mathbf{\\frac{2\\Omega\\cos\\phi}{R_{\\mathrm{Saturn}}}} $$</p>
<p>With \\(\\Omega \\approx 1.64 \\times 10^{-4}\\ \\mathrm{rad\\,s^{-1}}\\), \\(R_{\\mathrm{Saturn}} = 6.027 \\times 10^7\\text{ m}\\), and \\(\\phi = 75.63^\\circ\\) (\\(\\cos 75.63^\\circ \\approx 0.2482\\)):</p>
<p>$$ \\beta = \\frac{2(1.64 \\times 10^{-4})(0.2482)}{6.027 \\times 10^7\\text{ m}} \\approx \\mathbf{1.35 \\times 10^{-12}\\ \\mathrm{m^{-1}\\,s^{-1}}} $$</p>
<p>Substituting \\(\\beta\\) and \\(U = 120\\ \\mathrm{m\\,s^{-1}}\\) into the formula for \\(m\\):</p>
<p>$$ m = (6.027 \\times 10^7\\text{ m})(0.2482)\\sqrt{\\frac{1.35 \\times 10^{-12}}{120}} \\approx \\mathbf{1.59} $$</p>
<p>This naive uniform-flow value (\\(m \\approx 1.6\\)) is nearly a factor of \\(4\\) smaller than the observed \\(m = 6\\), proving that the planetary \\(\\beta\\)-effect alone cannot trap a hexagonal wave at such high wind speed.</p>

<p><strong>(d) Jet-Curvature Correction \\(\\beta_{\\mathrm{eff}}\\) &amp; Recovery of \\(m \\approx 6\\) (2.0 points):</strong><br>
For the parabolic velocity profile \\(U(y) = U_{\\max} - c y^2\\), the second derivative is \\(\\frac{\\partial^2 U}{\\partial y^2} = -2c\\), which increases the effective restoring gradient to:</p>
<p>$$ \\beta_{\\mathrm{eff}} = \\beta - \\frac{\\partial^2 U}{\\partial y^2} = \\beta + 2c $$</p>
<p>From the <em>Sánchez-Lavega et al. (2014)</em> graph, the jet peak lies at planetocentric latitude \\(\\phi \\approx 75.6^\\circ\\text{--}75.8^\\circ\\) with maximum eastward speed \\(U_{\\max} \\approx 115\\text{--}120\\ \\mathrm{m\\,s^{-1}}\\), and falls to \\(U \\approx 0\\ \\mathrm{m\\,s^{-1}}\\) at a half-width of \\(\\Delta\\phi \\approx 3.4^\\circ\\text{--}3.5^\\circ\\) on either side of the peak (at \\(\\sim 72.3^\\circ\\) and \\(\\sim 79.2^\\circ\\)). Converting \\(\\Delta\\phi \\approx 3.45^\\circ\\) to meridional distance \\(\\Delta y = R_{\\mathrm{Saturn}}\\,\\Delta\\phi_{\\mathrm{rad}} \\approx 3.63 \\times 10^6\\text{ m}\\):</p>
<p>$$ c \\simeq \\frac{U_{\\max}}{(\\Delta y)^2} \\approx \\frac{120\\ \\mathrm{m\\,s^{-1}}}{(3.63 \\times 10^6\\text{ m})^2} \\approx 9.1 \\times 10^{-12}\\ \\mathrm{m^{-1}\\,s^{-1}} \\implies 2c \\approx 1.82 \\times 10^{-11}\\ \\mathrm{m^{-1}\\,s^{-1}} $$</p>
<p>Thus \\(\\beta_{\\mathrm{eff}} = 1.35 \\times 10^{-12} + 1.82 \\times 10^{-11} \\approx \\mathbf{1.96 \\times 10^{-11}\\ \\mathrm{m^{-1}\\,s^{-1}}}\\) (dominated by the sharp jet curvature rather than planetary rotation), giving the corrected wavenumber:</p>
<p>$$ m = R_{\\mathrm{Saturn}}\\cos\\phi\\sqrt{\\frac{\\beta_{\\mathrm{eff}}}{U_{\\max}}} \\approx (1.496 \\times 10^7\\text{ m})\\sqrt{\\frac{1.96 \\times 10^{-11}}{120}} \\approx \\mathbf{6.04 \\approx 6} $$
*(Accepting \\(m \\in [5.5, 6.5]\\) depending on the exact points sampled along the red curve).* This confirms that the sharp meridional curvature of Saturn's polar jet acts as a waveguide that locks the standing Rossby wave into a 6-sided polygon.</p>`
    },

    // Week 05 — 16.11.2026 – 22.11.2026
    {
        uniqueId: "potw_2026_w5",
        weekNumber: 5,
        scheduledDate: "16.11.2026 – 22.11.2026",
        title: "The Yarkovsky Effect and the Age of Asteroid Families",
        author: "Mihai",
        module: "T1 & T9 · Non-Gravitational Orbital Mechanics & Asteroid Families",
        difficultyClass: "hard",
        difficultyText: "6.9 / 10.0",
        description: `<p>Small Main Belt asteroids (\\(D \\lesssim 30\\ \\mathrm{km}\\)) experience a tiny, continuous non-gravitational thrust known as the <strong>Yarkovsky effect</strong>. Because an asteroid's rocky surface has finite thermal inertia, it does not cool instantaneously; instead, peak thermal infrared emission occurs in the asteroid's afternoon rather than at local noon. Since thermal photons carry linear momentum (\\(p = E/c\\)), this asymmetric emission produces a net recoil force that slowly alters the asteroid's orbital semi-major axis \\(a\\) over millions of years.</p>

<div class="task-box" style="margin-top: 18px; border-left: 3px solid var(--accent-blue); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part 1 — Where Does the Thrust Come From?</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">3.5 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        Consider a small, flat surface element of area \\(dA\\) at absolute temperature \\(T\\) and thermal emissivity \\(\\epsilon\\). Assume the surface radiates diffusely according to Lambert's cosine law, meaning its emitted radiance \\(I\\) (\\(\\mathrm{W\\,m^{-2}\\,sr^{-1}}\\)) is independent of the emission angle \\(\\vartheta \\in [0, \\pi/2]\\) measured from the outward surface normal \\(\\hat{\\mathbf{n}}\\).
    </p>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Show that the thermal radiation recoil force acting on the surface element \\(dA\\) is given by:
        $$ d\\mathbf{F}_{\\mathrm{recoil}} = -\\frac{2}{3c}\\,\\epsilon \\sigma T^4\\,\\hat{\\mathbf{n}}\\,dA $$ <em>(0.75 points)</em></li>
    </ol>
    <p style="font-size:0.92rem; color:var(--text-main); margin:12px 0;">
        Now model the asteroid as a homogeneous sphere of radius \\(R\\) moving on a circular heliocentric orbit of semi-major axis \\(a\\), spinning <strong>prograde</strong> with constant angular speed \\(\\omega\\) about an axis perpendicular to its orbital plane (zero spin obliquity, \\(\\gamma = 0^\\circ\\)). Adopt asteroid-centered spherical coordinates \\((\\theta, \\varphi)\\) anchored to the Sun–asteroid line:
    </p>
    <ul style="padding-left: 20px; line-height: 1.7; font-size: 0.92rem; margin-bottom: 12px;">
        <li>\\(\\theta \\in [0, \\pi]\\) is the colatitude measured from the north spin pole (\\(\\theta = \\pi/2\\) is the equator).</li>
        <li>\\(\\varphi \\in [0, 2\\pi)\\) is the hour angle measured from local noon (\\(\\varphi = 0\\) faces the Sun, \\(\\varphi = \\pi/2\\) is local dusk, \\(\\varphi = \\pi\\) is midnight, and \\(\\varphi = 3\\pi/2\\) is local dawn).</li>
    </ul>
    <ol type="a" start="2" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Model the thermally active surface as a thin shell with effective heat capacity per unit area \\(C_A\\) (\\(\\mathrm{J\\,m^{-2}\\,K^{-1}}\\)) and thermal conductivity \\(k\\). For a surface patch rotating at rate \\(d\\varphi/dt = \\omega\\), show that the temperature obeys:
        $$ \\omega C_A\\,\\frac{dT}{d\\varphi} = F_{\\mathrm{abs}}(\\theta, \\varphi) - \\epsilon \\sigma T^4 $$
        where \\(F_{\\mathrm{abs}}(\\theta, \\varphi)\\) is the solar flux absorbed by the asteroid. <em>(0.50 points)</em></li>
    </ol>
    <p style="font-size:0.92rem; color:var(--text-main); margin:12px 0;">
        Approximate the absorbed solar flux per unit area as a global mean plus a smooth diurnal cosine modulation:
        $$ F_{\\mathrm{abs}}(\\theta, \\varphi) = \\frac{1}{4}(1 - A)\\mathcal{F}_\\odot\\left(1 + 2\\sin\\theta\\cos\\varphi\\right) $$
        where \\(A\\) is the Bond albedo and \\(\\mathcal{F}_\\odot = \\frac{L_\\odot}{4\\pi a^2}\\) is the solar irradiance at orbital radius \\(a\\).
    </p>
    <ol type="a" start="3" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>To linearize the differential equation, write \\(T(\\theta, \\varphi) = T_0 + \\Delta T(\\theta, \\varphi)\\) where \\(T_0\\) is the mean equilibrium temperature (when thermal inertia is neglected) and \\(|\\Delta T(\\theta, \\varphi)| \\ll T_0\\). Find an expression for \\(T_0\\), and show that \\(\\Delta T(\\theta, \\varphi)\\) satisfies the linear differential equation:
        $$ \\frac{\\Theta}{4}\\,\\frac{d(\\Delta T)}{d\\varphi} + \\Delta T = \\Delta T_{\\mathrm{eq}}\\sin\\theta\\cos\\varphi $$
        Find the dimensionless <strong>thermal parameter</strong> \\(\\Theta\\) and characteristic temperature amplitude \\(\\Delta T_{\\mathrm{eq}}\\) in terms of the problem's invariants. <em>(1.00 point)</em></li>
        <li>Solve this differential equation for the steady-state periodic temperature perturbation \\(\\Delta T(\\theta, \\varphi)\\) in terms of \\(\\Delta T_{\\mathrm{eq}}, \\Theta, \\theta\\), and \\(\\varphi\\). <em>(0.75 points)</em></li>
        <li>Determine the <strong>thermal phase lag angle</strong> \\(\\delta\\) between local noon (\\(\\varphi = 0\\)) and the longitude of maximum surface temperature in terms of \\(\\Theta\\). <em>(0.50 points)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-purple); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 16px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part 2 — Net Yarkovsky Thrust and Orbital Drift Rate</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">3.0 Points</span>
    </div>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Integrate the linearized recoil force over the entire spherical surface \\(S\\) of the asteroid to show that the net force component \\(F_v = \\mathbf{F}_Y \\cdot \\hat{\\mathbf{v}}\\) along the asteroid's orbital velocity unit vector \\(\\hat{\\mathbf{v}}\\) is:
        $$ F_v = \\frac{\\pi R^2(1 - A)\\mathcal{F}_\\odot}{9c} \\cdot \\frac{\\Theta}{1 + \\Theta^2 / 16} $$ <em>(1.25 points)</em></li>
        <li>Assuming the asteroid has bulk density \\(\\rho_{\\mathrm{bulk}}\\) and diameter \\(D = 2R\\), derive the semi-major axis drift rate \\(\\frac{da}{dt}\\) in terms of \\(A, \\mathcal{F}_\\odot, c, \\rho_{\\mathrm{bulk}}, D, \\Theta\\), and the orbital mean motion \\(n = \\sqrt{G M_\\odot / a^3}\\). Explain in one sentence how the formula modifies if the asteroid's spin axis has an arbitrary obliquity \\(\\gamma\\) relative to its orbital normal. <em>(1.00 point)</em></li>
        <li>Find the value of the thermal parameter \\(\\Theta_{\\mathrm{opt}}\\) (and the corresponding phase lag angle \\(\\delta_{\\mathrm{opt}}\\)) that maximizes the orbital drift rate \\(\\left|\\frac{da}{dt}\\right|\\). <em>(0.75 points)</em></li>
    </ol>
</div>

<div class="task-box" style="border-left: 3px solid var(--accent-gold); background: var(--bg-sidebar); padding: 18px 22px; border-radius: var(--radius-md);">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <strong style="color:var(--text-pure); font-size:1.02rem;">Part 3 — Dating a Collisional Asteroid Family</strong>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-gold); background:rgba(255,207,92,0.12); padding:3px 9px; border-radius:6px;">3.5 Points</span>
    </div>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        When a large parent asteroid shatters in a collision, its fragments are ejected into nearly identical initial orbits around a central semi-major axis \\(a_c\\). Over millions of years, fragments with prograde spins (\\(\\cos\\gamma > 0\\)) drift outward (\\(a > a_c\\)) while fragments with retrograde spins (\\(\\cos\\gamma < 0\\)) drift inward (\\(a < a_c\\)).
    </p>
    <p style="font-size:0.92rem; color:var(--text-main); margin-bottom:12px;">
        The figure below shows the distribution of reciprocal diameter \\(1/D\\) (\\(\\mathrm{km^{-1}}\\)) versus proper semi-major axis \\(a\\) (\\(\\mathrm{au}\\)) for a collisional asteroid family embedded in the Main Belt background. The solid straight lines trace the outer boundaries of the family's characteristic <strong>"V-shape"</strong>, defined by the fastest-drifting fragments (\\(\\gamma = 0^\\circ\\) on the right wing and \\(\\gamma = 180^\\circ\\) on the left wing).
    </p>
    <img src="assets/img/potw/yarkovsky_v_shape_family.png" alt="Plot of 1/D vs a for Collisional Asteroid Family" class="user-diagram" onclick="window.openImageModal(this)">
    <p style="font-size:0.92rem; color:var(--text-main); margin:12px 0 8px 0;">
        All family members share the following typical physical properties:
    </p>
    <ul style="padding-left: 20px; line-height: 1.7; font-size: 0.92rem; margin-bottom: 12px;">
        <li>Bulk density: \\(\\rho_{\\mathrm{bulk}} = 1000\\ \\mathrm{kg\\,m^{-3}}\\)</li>
        <li>Bond albedo: \\(A = 0.02\\) &nbsp;|&nbsp; Geometric visual albedo: \\(p_V = 0.05\\)</li>
        <li>Mean proper orbital eccentricity: \\(e = 0.21\\)</li>
        <li>Thermal emissivity: \\(\\epsilon = 0.90\\)</li>
        <li>Rotation period: \\(P_{\\mathrm{rot}} = 5.0\\ \\mathrm{h}\\)</li>
        <li>Effective surface heat capacity per unit area: \\(C_A = 440\\ \\mathrm{J\\,m^{-2}\\,K^{-1}}\\)</li>
        <li>Surface thermal conductivity: \\(k = 0.008\\ \\mathrm{W\\,m^{-1}\\,K^{-1}}\\)</li>
    </ul>
    <ol type="a" style="padding-left: 20px; line-height: 1.85; font-size: 0.92rem;">
        <li>Explain briefly why the outer boundaries of the family form straight lines in the \\(1/D\\) vs. \\(a\\) plane, and why the region <em>inside</em> the V-shape is densely populated with family members. <em>(0.75 points)</em></li>
        <li>From the figure, read off the family's central semi-major axis \\(a_c\\) (in \\(\\mathrm{au}\\)) and measure the magnitude of the slope \\(m\\) (in \\(\\mathrm{km^{-1}\\,au^{-1}}\\)) of the solid V-shape boundary lines. <em>(0.75 points)</em></li>
        <li>Compute the equilibrium temperature \\(T_0\\), the thermal parameter \\(\\Theta\\), and the maximum drift constant \\(K \\equiv D\\left|\\frac{da}{dt}\\right|_{\\max}\\) (in \\(\\mathrm{km\\cdot au\\cdot Myr^{-1}}\\)) for the boundary asteroids. <em>(1.00 point)</em></li>
        <li>Combine your measured slope \\(m\\) from (3b) with \\(K\\) from (3c) to calculate the age \\(\\Delta t\\) (in \\(\\mathrm{Myr}\\)) of the asteroid family. Name one physical effect neglected in this simple model that could alter the true age estimate. <em>(1.00 point)</em></li>
    </ol>
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Lambertian thermal photon momentum recoil, diurnal heat-conduction phase lag, secular Yarkovsky orbital drift, and V-shape chronological dating of collisional asteroid families.</p>

<p><strong>Part 1 — Where Does the Thrust Come From? (3.5 Points)</strong></p>

<p><strong>1a. Lambertian Thermal Radiation Recoil Force (0.75 points):</strong><br>
A diffuse Lambertian surface of area \\(dA\\) emits power \\(dP(\\vartheta, \\phi') = I\\cos\\vartheta\\,dA\\,d\\Omega\\) into solid angle \\(d\\Omega = \\sin\\vartheta\\,d\\vartheta\\,d\\phi'\\) at polar angle \\(\\vartheta \\in [0, \\pi/2]\\) relative to the outward normal \\(\\hat{\\mathbf{n}}\\). Integrating over the outward hemisphere relates \\(I\\) to the total emitted flux \\(\\epsilon\\sigma T^4\\):</p>
<p>$$ \\epsilon\\sigma T^4 = \\int_0^{2\\pi} d\\phi' \\int_0^{\\pi/2} I\\cos\\vartheta\\sin\\vartheta\\,d\\vartheta = \\pi I \\implies I = \\frac{\\epsilon\\sigma T^4}{\\pi} $$</p>
<p>By azimuthal symmetry around \\(\\hat{\\mathbf{n}}\\), the tangential momentum components cancel. Each photon emitted at angle \\(\\vartheta\\) carries normal momentum \\(\\frac{dE}{c}\\cos\\vartheta\\) along \\(+\\hat{\\mathbf{n}}\\), imparting an inward recoil force \\(-\\frac{dP}{c}\\cos\\vartheta\\,\\hat{\\mathbf{n}}\\) on \\(dA\\):</p>
<p>$$ d\\mathbf{F}_{\\mathrm{recoil}} = -\\hat{\\mathbf{n}}\\,\\frac{dA}{c}\\int_0^{2\\pi} d\\phi' \\int_0^{\\pi/2} I\\cos^2\\vartheta\\sin\\vartheta\\,d\\vartheta = -\\hat{\\mathbf{n}}\\,\\frac{dA}{c}(2\\pi I)\\left(\\frac{1}{3}\\right) = \\mathbf{-\\frac{2}{3c}\\,\\epsilon\\sigma T^4\\,\\hat{\\mathbf{n}}\\,dA} $$</p>

<p><strong>1b. Surface Thermal Energy Balance (0.50 points):</strong><br>
A surface element of area \\(dA\\) and heat capacity per unit area \\(C_A\\) stores internal thermal energy \\(dU = C_A T\\,dA\\). Conservation of energy requires the rate of change of stored heat per unit area to equal absorbed solar flux minus emitted thermal flux:</p>
<p>$$ C_A\\frac{dT}{dt} = F_{\\mathrm{abs}}(\\theta, \\varphi) - \\epsilon\\sigma T^4 $$</p>
<p>Because the surface patch rotates through hour angle \\(\\varphi\\) at steady rate \\(\\frac{d\\varphi}{dt} = \\omega\\), the chain rule \\(\\frac{dT}{dt} = \\frac{d\\varphi}{dt}\\frac{dT}{d\\varphi} = \\omega\\frac{dT}{d\\varphi}\\) yields:</p>
<p>$$ \\mathbf{\\omega C_A\\,\\frac{dT}{d\\varphi} = F_{\\mathrm{abs}}(\\theta, \\varphi) - \\epsilon\\sigma T^4} $$</p>

<p><strong>1c. Linearization, Equilibrium Temperature \\(T_0\\) &amp; Thermal Parameter \\(\\Theta\\) (1.00 point):</strong><br>
Substituting \\(T(\\theta, \\varphi) = T_0 + \\Delta T(\\theta, \\varphi)\\) with \\(|\\Delta T| \\ll T_0\\), we expand \\(\\epsilon\\sigma T^4 \\simeq \\epsilon\\sigma T_0^4 + 4\\epsilon\\sigma T_0^3\\,\\Delta T\\). Matching the \\(\\varphi\\)-independent mean terms gives the equilibrium temperature \\(T_0\\):</p>
<p>$$ \\epsilon\\sigma T_0^4 = \\frac{1}{4}(1 - A)\\mathcal{F}_\\odot \\implies \\mathbf{T_0 = \\left[\\frac{(1 - A)\\mathcal{F}_\\odot}{4\\epsilon\\sigma}\\right]^{1/4}} $$</p>
<p>The remaining fluctuating terms satisfy:</p>
<p>$$ \\omega C_A\\,\\frac{d(\\Delta T)}{d\\varphi} + 4\\epsilon\\sigma T_0^3\\,\\Delta T = \\frac{1}{2}(1 - A)\\mathcal{F}_\\odot\\sin\\theta\\cos\\varphi = 2\\epsilon\\sigma T_0^4\\sin\\theta\\cos\\varphi $$</p>
<p>Dividing through by \\(4\\epsilon\\sigma T_0^3\\) yields \\(\\frac{\\Theta}{4}\\frac{d(\\Delta T)}{d\\varphi} + \\Delta T = \\Delta T_{\\mathrm{eq}}\\sin\\theta\\cos\\varphi\\), where:</p>
<p>$$ \\mathbf{\\Theta = \\frac{\\omega C_A}{\\epsilon\\sigma T_0^3}}, \\qquad \\mathbf{\\Delta T_{\\mathrm{eq}} = \\frac{T_0}{2} = \\frac{(1 - A)\\mathcal{F}_\\odot}{8\\epsilon\\sigma T_0^3}} $$</p>

<p><strong>1d. Steady-State Periodic Solution \\(\\Delta T(\\theta, \\varphi)\\) (0.75 points):</strong><br>
Substituting the periodic ansatz \\(\\Delta T(\\theta, \\varphi) = \\Delta T_{\\mathrm{eq}}\\sin\\theta\\left(\\alpha\\cos\\varphi + \\beta\\sin\\varphi\\right)\\) into the ODE gives \\(\\left(\\alpha + \\frac{\\Theta}{4}\\beta\\right)\\cos\\varphi + \\left(\\beta - \\frac{\\Theta}{4}\\alpha\\right)\\sin\\varphi = \\cos\\varphi\\), so \\(\\beta = \\frac{\\Theta}{4}\\alpha\\) and \\(\\alpha = \\frac{1}{1 + \\Theta^2/16}\\):</p>
<p>$$ \\mathbf{\\Delta T(\\theta, \\varphi) = \\frac{\\Delta T_{\\mathrm{eq}}\\sin\\theta}{1 + \\Theta^2 / 16}\\left(\\cos\\varphi + \\frac{\\Theta}{4}\\sin\\varphi\\right) = \\frac{\\Delta T_{\\mathrm{eq}}\\sin\\theta}{\\sqrt{1 + \\Theta^2 / 16}}\\cos(\\varphi - \\delta)} $$</p>

<p><strong>1e. Thermal Phase Lag Angle \\(\\delta\\) (0.50 points):</strong><br>
From the trigonometric identity \\(\\cos\\varphi + \\frac{\\Theta}{4}\\sin\\varphi = \\sqrt{1 + \\Theta^2/16}\\cos(\\varphi - \\delta)\\), surface temperature peaks in the afternoon at hour angle \\(\\varphi = \\delta\\):</p>
<p>$$ \\mathbf{\\tan\\delta = \\frac{\\Theta}{4} \\implies \\delta = \\arctan\\!\\left(\\frac{\\Theta}{4}\\right)} $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part 2 — Net Yarkovsky Thrust and Orbital Drift Rate (3.0 Points)</strong></p>

<p><strong>2a. Surface Integration for the Along-Track Force \\(F_v\\) (1.25 points):</strong><br>
For a prograde-spinning asteroid (\\(\\gamma = 0^\\circ\\)), the local dusk meridian (\\(\\varphi = +\\pi/2\\)) trails the asteroid's motion (pointing along \\(-\\hat{\\mathbf{v}}\\)), while the dawn meridian (\\(\\varphi = 3\\pi/2\\)) faces forward along \\(+\\hat{\\mathbf{v}}\\). Thus, the outward normal \\(\\hat{\\mathbf{n}}(\\theta, \\varphi)\\) has projection \\(\\hat{\\mathbf{n}} \\cdot \\hat{\\mathbf{v}} = -\\sin\\theta\\sin\\varphi\\), and the recoil force \\(d\\mathbf{F}_{\\mathrm{recoil}} \\propto -\\hat{\\mathbf{n}}\\) has projection \\(-\\hat{\\mathbf{n}} \\cdot \\hat{\\mathbf{v}} = +\\sin\\theta\\sin\\varphi\\). Linearizing \\(T^4 \\simeq T_0^4 + 4T_0^3\\,\\Delta T\\) (where the isotropic \\(T_0^4\\) term integrates to zero) over \\(dA = R^2\\sin\\theta\\,d\\theta\\,d\\varphi\\):</p>
<p>$$ F_v = \\frac{2}{3c}\\epsilon\\sigma\\left(4T_0^3\\right)R^2 \\int_0^\\pi \\sin\\theta\\,d\\theta \\int_0^{2\\pi} \\Delta T(\\theta, \\varphi)\\sin\\theta\\sin\\varphi\\,d\\varphi $$</p>
<p>Using \\(4\\epsilon\\sigma T_0^3\\,\\Delta T_{\\mathrm{eq}} = \\frac{1}{2}(1 - A)\\mathcal{F}_\\odot\\), \\(\\int_0^\\pi \\sin^3\\theta\\,d\\theta = \\frac{4}{3}\\), \\(\\int_0^{2\\pi}\\cos\\varphi\\sin\\varphi\\,d\\varphi = 0\\), and \\(\\int_0^{2\\pi}\\sin^2\\varphi\\,d\\varphi = \\pi\\):</p>
<p>$$ F_v = \\frac{2}{3c}\\left[\\frac{1}{2}(1 - A)\\mathcal{F}_\\odot\\right]R^2\\left(\\frac{\\Theta / 4}{1 + \\Theta^2 / 16}\\right)\\left(\\frac{4}{3}\\right)\\pi = \\mathbf{\\frac{\\pi R^2(1 - A)\\mathcal{F}_\\odot}{9c}\\cdot\\frac{\\Theta}{1 + \\Theta^2 / 16}} $$</p>

<p><strong>2b. Semi-Major Axis Drift Rate \\(da/dt\\) &amp; Obliquity Dependence (1.00 point):</strong><br>
The orbital mechanical energy of the asteroid (mass \\(m = \\frac{4}{3}\\pi R^3 \\rho_{\\mathrm{bulk}} = \\frac{\\pi}{6}\\rho_{\\mathrm{bulk}}D^3\\)) is \\(E = -\\frac{G M_\\odot m}{2a}\\). Differentiating with respect to time and equating to the mechanical power \\(\\frac{dE}{dt} = F_v v_{\\mathrm{orb}} = F_v n a\\) (with \\(G M_\\odot = n^2 a^3\\)) gives \\(\\frac{da}{dt} = \\frac{2 F_v}{m n}\\). Substituting \\(F_v\\) and \\(R = D/2\\):</p>
<p>$$ \\frac{da}{dt} = \\frac{2}{\\left(\\frac{\\pi}{6}\\rho_{\\mathrm{bulk}}D^3\\right)n}\\cdot\\frac{\\pi(D/2)^2(1 - A)\\mathcal{F}_\\odot}{9c}\\cdot\\frac{\\Theta}{1 + \\Theta^2 / 16} = \\mathbf{\\frac{(1 - A)\\mathcal{F}_\\odot}{3 c \\rho_{\\mathrm{bulk}} D n}\\cdot\\frac{\\Theta}{1 + \\Theta^2 / 16}} $$</p>
<p>For an arbitrary spin obliquity \\(\\gamma\\), the diurnal drift rate is multiplied by \\(\\mathbf{\\cos\\gamma}\\) (the projection of the asteroid's spin axis onto the orbital angular momentum vector).</p>

<p><strong>2c. Optimal Thermal Parameter \\(\\Theta_{\\mathrm{opt}}\\) &amp; Phase Lag \\(\\delta_{\\mathrm{opt}}\\) (0.75 points):</strong><br>
Maximizing \\(g(\\Theta) = \\frac{\\Theta}{1 + \\Theta^2 / 16}\\) via \\(g'(\\Theta) = \\frac{1 - \\Theta^2 / 16}{(1 + \\Theta^2 / 16)^2} = 0\\) yields:</p>
<p>$$ \\mathbf{\\Theta_{\\mathrm{opt}} = 4}, \\qquad \\mathbf{\\delta_{\\mathrm{opt}} = \\arctan\\!\\left(\\frac{4}{4}\\right) = 45^\\circ = \\frac{\\pi}{4}\\text{ rad}} $$</p>

<hr style="border:none; border-top:1px solid var(--border-subtle); margin:16px 0;">

<p><strong>Part 3 — Dating a Collisional Asteroid Family (3.5 Points)</strong></p>

<p><strong>3a. Physical Origin of the Linear V-Shape Boundaries &amp; Interior Filling (0.75 points):</strong><br>
Over family age \\(\\Delta t\\), an asteroid of diameter \\(D\\) and spin obliquity \\(\\gamma\\) drifts by \\(\\Delta a = a - a_c = \\frac{K\\,\\Delta t}{D}\\cos\\gamma\\), where \\(K \\equiv D\\left|\\frac{da}{dt}\\right|_{\\max}\\) is independent of \\(D\\). The fastest-drifting asteroids have \\(\\cos\\gamma = \\pm 1\\) (\\(\\gamma = 0^\\circ\\) or \\(180^\\circ\\)), tracing straight boundary lines \\(\\frac{1}{D} = \\frac{|a - a_c|}{K\\,\\Delta t}\\) of slope \\(\\pm m = \\pm\\frac{1}{K\\,\\Delta t}\\) in the \\(1/D\\) vs. \\(a\\) plane. The interior of the V-shape is densely populated because fragments have random spin obliquities \\(\\cos\\gamma \\in (-1, +1)\\) (as well as YORP spin-axis reorientation), causing most fragments to drift less than the maximum \\(|\\cos\\gamma| = 1\\) envelope.</p>

<p><strong>3b. Reading \\(a_c\\) and Boundary Slope \\(m\\) from the V-Shape Plot (0.75 points):</strong><br>
From the vertex where the two solid boundary lines intersect (or extrapolate to \\(1/D = 0\\)) in the inner Main Belt dark-family plot (representing the Nysa–Polana / Eulalia low-albedo complex):</p>
<p>$$ a_c \\approx \\mathbf{2.42\\text{ au}} \\quad (\\text{accepting } 2.38\\text{--}2.46\\text{ au}), \\qquad m = \\left|\\frac{\\Delta(1/D)}{\\Delta a}\\right| \\approx \\mathbf{1.25\\ \\mathrm{km^{-1}\\,au^{-1}}} \\quad (\\text{accepting } 1.10\\text{--}1.45\\ \\mathrm{km^{-1}\\,au^{-1}}) $$</p>

<p><strong>3c. Equilibrium Temperature \\(T_0\\), Thermal Parameter \\(\\Theta\\) &amp; Drift Constant \\(K\\) (1.00 point):</strong><br>
At \\(a_c = 2.42\\text{ au}\\), the solar irradiance is \\(\\mathcal{F}_\\odot = \\frac{1361\\ \\mathrm{W\\,m^{-2}}}{(2.42)^2} \\approx 232.4\\ \\mathrm{W\\,m^{-2}}\\). With \\(A = 0.02\\), \\(\\epsilon = 0.90\\), and \\(\\sigma = 5.670 \\times 10^{-8}\\ \\mathrm{W\\,m^{-2}\\,K^{-4}}\\):</p>
<p>$$ T_0 = \\left[\\frac{(1 - 0.02)(232.4)}{4(0.90)(5.670 \\times 10^{-8})}\\right]^{1/4} \\approx \\mathbf{182.7\\text{ K}} \\qquad \\left(T_0 = \\frac{284.3\\text{ K}}{\\sqrt{a_c\\,[\\mathrm{au}]}}\\right) $$</p>
<p>With rotation period \\(P_{\\mathrm{rot}} = 5.0\\text{ h} = 18,000\\text{ s}\\) (\\(\\omega = \\frac{2\\pi}{18,000\\text{ s}} = 3.491 \\times 10^{-4}\\ \\mathrm{rad\\,s^{-1}}\\)) and \\(C_A = 440\\ \\mathrm{J\\,m^{-2}\\,K^{-1}}\\):</p>
<p>$$ \\Theta = \\frac{\\omega C_A}{\\epsilon\\sigma T_0^3} = \\frac{(3.491 \\times 10^{-4})(440)}{0.90(5.670 \\times 10^{-8})(182.7)^3} \\approx \\mathbf{0.493} \\qquad \\left(\\frac{\\Theta}{1 + \\Theta^2 / 16} \\approx \\mathbf{0.486}\\right) $$</p>
<p>At \\(a_c = 2.42\\text{ au}\\), the orbital mean motion is \\(n = \\frac{1.991 \\times 10^{-7}\\ \\mathrm{rad\\,s^{-1}}}{(2.42)^{3/2}} \\approx 5.288 \\times 10^{-8}\\ \\mathrm{rad\\,s^{-1}}\\). Evaluating \\(K = D\\left|\\frac{da}{dt}\\right|_{\\max}\\) for \\(D = 1\\text{ km} = 1000\\text{ m}\\):</p>
<p>$$ \\left|\\frac{da}{dt}\\right|_{1\\text{ km}} = \\frac{(1 - 0.02)(232.4)}{3(2.998 \\times 10^8)(1000)(1000)(5.288 \\times 10^{-8})}\\times 0.486 \\approx 2.33 \\times 10^{-7}\\ \\mathrm{m\\,s^{-1}} $$</p>
<p>Converting to \\(\\mathrm{au\\,Myr^{-1}}\\) (\\(1\\text{ Myr} = 3.1558 \\times 10^{13}\\text{ s},\\ 1\\text{ au} = 1.496 \\times 10^{11}\\text{ m}\\)):</p>
<p>$$ K = D\\left|\\frac{da}{dt}\\right|_{\\max} \\approx \\mathbf{4.91 \\times 10^{-5}\\ \\mathrm{km\\cdot au\\cdot Myr^{-1}}} $$</p>

<p><strong>3d. Collisional Family Age \\(\\Delta t\\) &amp; Neglected Physical Effects (1.00 point):</strong><br>
Since the V-shape boundary satisfies \\(\\frac{1}{D} = m|a - a_c| = \\frac{|a - a_c|}{K\\,\\Delta t}\\), the family age is \\(\\Delta t = \\frac{1}{m K}\\):</p>
<p>$$ \\Delta t = \\frac{1}{(1.25\\ \\mathrm{km^{-1}\\,au^{-1}})(4.91 \\times 10^{-5}\\ \\mathrm{km\\cdot au\\cdot Myr^{-1}})} \\approx \\mathbf{1630\\text{ Myr}} \\quad (\\approx 1.4\\text{--}1.8\\text{ Gyr depending on } m) $$</p>
<p><strong>Neglected physical effects (any one for full credit):</strong></p>
<ul>
    <li><strong>Initial collisional ejection velocity dispersion (\\(\\Delta a_{\\mathrm{init}}\\)):</strong> Fragments are not born at a single point \\(a_c\\), giving the V-shape a finite initial width at \\(t = 0\\) (which causes a pure Yarkovsky fit to slightly overestimate the true age).</li>
    <li><strong>YORP effect &amp; spin-state evolution:</strong> Radiative torques (YORP) and sub-catastrophic collisions periodically flip spin axes (stochastic Yarkovsky/YORP random walks) and alter \\(P_{\\mathrm{rot}}\\), slowing the net long-term drift compared to constant \\(\\gamma = 0^\\circ\\) or \\(180^\\circ\\).</li>
    <li><strong>Non-zero orbital eccentricity (\\(e = 0.21\\)) and seasonal Yarkovsky component:</strong> Eccentricity increases the orbit-averaged solar flux by \\((1 - e^2)^{-1/2}\\) and planetary secular/mean-motion resonances can scatter fragments out of the V-shape wings.</li>
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