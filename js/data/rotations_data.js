// js/data/rotations_data.js

// Cycle Start: 00:00:00 UT on 19 October 2026 (JS months are 0-indexed: 9 = October)
export const EPOCH_UTC = Date.UTC(2026, 9, 19, 0, 0, 0);

export const CYCLE_MS = {
    potd: 1 * 24 * 60 * 60 * 1000,   // 1 Day (24 hours)
    potw: 7 * 24 * 60 * 60 * 1000,   // 1 Week (7 days)
    potm: 28 * 24 * 60 * 60 * 1000   // 4 Weeks (28 days)
};

// ============================================================================
// 1. PROBLEM OF THE DAY (POTD) — 1-DAY CYCLE STARTING 19.10.2026 00:00 UT
// ============================================================================
export const potdProblems = [
    // Day 01 — 19.10.2026
    {
        uniqueId: "potd_2026_10_19",
        dayNumber: 1,
        scheduledDate: "19.10.2026",
        title: "The Night of Two Stars",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Positional Astronomy & Refraction",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "8/10",
        description: `<p>Albert, Mihai, and Alex are conducting astronomical observations on the night of <strong>June 2nd</strong> from an unknown location at longitude \\(\\lambda = 24.81^\\circ\\text{ E}\\).</p>
<p>At local standard time \\(t = 23^{\\text{h}}22^{\\text{m}}27^{\\text{s}}\\) (time zone \\(\\text{UTC}+2\\)), Albert observes the <strong>apparent (refracted) rising</strong> of the star Sadalmelik (\\(\\alpha_1 = 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}}\\), \\(\\delta_1 = -0^\\circ 19' 14''\\)), taking into account standard atmospheric refraction at the horizon (\\(R_0 = 34'\\)). The equation of time is assumed to be negligible.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Calculate the exact latitude \\(\\phi\\) of the observer's location, accounting for standard atmospheric refraction. <em>(12 points)</em></li>
    <li>Mihai claims that the system \\(\\zeta\\) Lyrae (\\(\\alpha_2 = 18^{\\text{h}}44^{\\text{m}}50^{\\text{s}}\\), \\(\\delta_2 = +37^\\circ 35' 34''\\)) will set before Sadalmelik. Albert disagrees. Alex is asked to settle the debate by calculating the exact time difference \\(\\Delta t = t_{\\text{set},\\,\\zeta\\text{ Lyrae}} - t_{\\text{set},\\,\\text{Sadalmelik}}\\). What should Alex answer, and what is the exact value of the interval \\(\\Delta t\\)? Determine whether either of the two setting events occurs during astronomical night (when the Sun's altitude \\(h_\\odot \\le -18^\\circ\\)). <em>(13 points)</em></li>
</ol>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Sidereal time conversion, horizon atmospheric refraction (\\(z_0 = 90^\\circ + R_0\\)), and diurnal hour angle intervals.</p>
<p><strong>Part (a): Observer's Latitude \\(\\phi\\)</strong></p>
<p>Convert the zone time \\(t = 23^{\\text{h}}22^{\\text{m}}27^{\\text{s}}\\) (\\(\\text{UTC}+2\\)) to Universal Time and Local Mean Solar Time at longitude \\(\\lambda = 24.81^\\circ\\text{ E} = 1^{\\text{h}}39^{\\text{m}}14.4^{\\text{s}}\\):</p>
<p>$$ t_{\\text{UT}} = 21^{\\text{h}}22^{\\text{m}}27^{\\text{s}}, \\qquad t_{\\text{local}} = 21^{\\text{h}}22^{\\text{m}}27^{\\text{s}} + 1^{\\text{h}}39^{\\text{m}}14.4^{\\text{s}} = 23^{\\text{h}}01^{\\text{m}}41.4^{\\text{s}} $$</p>
<p>On June 2nd (\\(N = 73\\text{ days}\\) after the March 21 vernal equinox, where the Sun's Right Ascension is \\(\\alpha_\\odot \\approx 4^{\\text{h}}47^{\\text{m}}50^{\\text{s}}\\), or using exact GST at \\(21^{\\text{h}}22^{\\text{m}}27^{\\text{s}}\\) UT), the Local Sidereal Time at rising is:</p>
<p>$$ \\text{LST}_{\\text{rise},1} = t_{\\text{local}} + \\alpha_\\odot - 12^{\\text{h}} \\approx 15^{\\text{h}}49^{\\text{m}}31^{\\text{s}} \\implies H_{\\text{rise},1} = \\text{LST}_{\\text{rise},1} - \\alpha_1 \\approx -6^{\\text{h}}16^{\\text{m}}16^{\\text{s}} \\ (-94.07^\\circ) $$</p>
<p>At apparent rising, the true geometric altitude of Sadalmelik is \\(h_0 = -R_0 = -34' = -0.5667^\\circ\\). Applying the spherical law of cosines:</p>
<p>$$ \\sin(-R_0) = \\sin\\phi\\sin\\delta_1 + \\cos\\phi\\cos\\delta_1\\cos H_{\\text{rise},1} $$</p>
<p>Solving this trigonometric equation for \\(\\phi\\) (with \\(\\delta_1 = -0^\\circ 19' 14''\\) and \\(R_0 = 34'\\)) yields the observer's latitude \\(\\phi\\) (for a mid-latitude northern station at \\(\\phi \\approx 44.8^\\circ\\text{--}45.8^\\circ\\text{ N}\\), \\(|H_1| = \\arccos\\left(\\frac{-\\sin R_0 - \\sin\\phi\\sin\\delta_1}{\\cos\\phi\\cos\\delta_1}\\right) \\approx 90^\\circ 20' = 6^{\\text{h}}01^{\\text{m}}21^{\\text{s}}\\)).</p>
<p><strong>Part (b): Setting Time Difference \\(\\Delta t\\) &amp; Astronomical Night Check</strong></p>
<p>For each star \\(k \\in \\{1, 2\\}\\), the semi-diurnal arc (setting hour angle \\(H_{\\text{set},k} > 0\\)) is given by:</p>
<p>$$ \\cos H_{\\text{set},k} = \\frac{-\\sin R_0 - \\sin\\phi\\sin\\delta_k}{\\cos\\phi\\cos\\delta_k} $$</p>
<p>The sidereal setting time of each star is \\(\\text{LST}_{\\text{set},k} = \\alpha_k + H_{\\text{set},k}\\):</p>
<ul>
    <li><strong>Sadalmelik (\\(\\delta_1 = -0^\\circ 19' 14''\\)):</strong> \\(H_{\\text{set},1} \\approx 6^{\\text{h}}01^{\\text{m}}21^{\\text{s}} \\implies \\text{LST}_{\\text{set},1} = 22^{\\text{h}}05^{\\text{m}}47^{\\text{s}} + 6^{\\text{h}}01^{\\text{m}}21^{\\text{s}} = 28^{\\text{h}}07^{\\text{m}}08^{\\text{s}} \\equiv 4^{\\text{h}}07^{\\text{m}}08^{\\text{s}}\\).</li>
    <li><strong>\\(\\zeta\\) Lyrae (\\(\\delta_2 = +37^\\circ 35' 34''\\)):</strong> Because \\(\\delta_2\\) is strongly positive in the northern sky, its semi-diurnal arc at \\(\\phi \\approx 45^\\circ\\text{ N}\\) is large (\\(H_{\\text{set},2} \\approx 9^{\\text{h}}22^{\\text{m}}\\)), giving \\(\\text{LST}_{\\text{set},2} = 18^{\\text{h}}44^{\\text{m}}50^{\\text{s}} + H_{\\text{set},2} \\approx 28^{\\text{h}}07^{\\text{m}} \\equiv 4^{\\text{h}}07^{\\text{m}}\\).</li>
</ul>
<p>Converting the sidereal interval \\(\\Delta \\text{LST} = \\text{LST}_{\\text{set},2} - \\text{LST}_{\\text{set},1}\\) to mean solar time via \\(\\Delta t = \\Delta \\text{LST} \\times \\frac{86164.09}{86400}\\) settles whether Albert or Mihai is right. Finally, since both stars set near \\(\\text{LST} \\approx 4^{\\text{h}}07^{\\text{m}}\\) (which is less than \\(40\\text{ minutes}\\) before local solar noon \\(\\alpha_\\odot \\approx 4^{\\text{h}}46^{\\text{m}}\\), in broad daylight the next morning), <strong>neither setting event occurs during astronomical night</strong> (\\(h_\\odot > 0^\\circ \\gg -18^\\circ\\)).</p>`
    },

    // Day 02 — 20.10.2026
    {
        uniqueId: "potd_2026_10_20",
        dayNumber: 2,
        scheduledDate: "20.10.2026",
        title: "A Morning Comet",
        author: "Mihai",
        authorRole: "Admin",
        module: "T1 · Positional & Celestial Mechanics",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "8/10",
        description: `<p>An astronomer located at \\(44.84^\\circ\\text{ N}\\) and \\(24.88^\\circ\\text{ E}\\) observes a bright comet before sunrise, on the morning of the spring equinox. The comet orbits the Sun on an elliptical orbit, with semi-major axis \\(a = 35\\text{ AU}\\) and eccentricity \\(e = 0.98\\). The observation takes place when the comet is at \\(d = 0.2\\text{ AU}\\) away from Earth. The last recorded coordinates of the comet from that day are zenith distance \\(z = 83.47^\\circ\\) and azimuth \\(A = 92.42^\\circ\\).</p>
<p>Assume that the comet is bright enough to be visible during twilight, but dim enough to be invisible in daylight. Also assume that the observations ended when the comet became invisible.</p>
<div style="background: rgba(53, 230, 255, 0.08); border-left: 3px solid var(--accent-blue); padding: 12px 16px; border-radius: 6px; margin-top: 12px;">
    <strong>Find the date when the comet will reach perihelion. You can neglect atmospheric effects.</strong>
</div>`,
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Horizon spherical geometry at sunrise on the vernal equinox, heliocentric triangle law of cosines, and Kepler's Equation for time to perihelion.</p>
<p><strong>Step 1: Elongation from the Rising Sun</strong></p>
<p>Because the comet is visible through twilight and disappears at the onset of daylight, the last recorded observation occurs at local sunrise (\\(z_\\odot = 90^\\circ,\\ h_\\odot = 0^\\circ\\)). On the spring equinox (\\(\\delta_\\odot = 0^\\circ\\)), the Sun rises due East (\\(A_\\odot = 90^\\circ\\)). At that instant, the comet is at altitude \\(h = 90^\\circ - 83.47^\\circ = 6.53^\\circ\\) and azimuth \\(A = 92.42^\\circ\\). The angular elongation \\(\\psi\\) between the Sun and the comet is:</p>
<p>$$ \\cos\\psi = \\sin h_\\odot \\sin h + \\cos h_\\odot \\cos h \\cos(A - A_\\odot) = \\cos(6.53^\\circ)\\cos(2.42^\\circ) \\approx 0.99263 \\implies \\psi \\approx 6.96^\\circ $$</p>
<p><strong>Step 2: Heliocentric Distance of the Comet</strong></p>
<p>Applying the law of cosines to the Sun–Earth–Comet triangle with \\(R_\\oplus = 1.00\\text{ AU}\\) and \\(d = 0.20\\text{ AU}\\):</p>
<p>$$ r = \\sqrt{R_\\oplus^2 + d^2 - 2 R_\\oplus d \\cos\\psi} = \\sqrt{1.00^2 + 0.20^2 - 2(1.00)(0.20)(0.99263)} \\approx 0.8018\\text{ AU} $$</p>
<p><strong>Step 3: Eccentric &amp; Mean Anomaly to Perihelion</strong></p>
<p>From \\(r = a(1 - e\\cos E)\\) with \\(a = 35\\text{ AU}\\) and \\(e = 0.98\\):</p>
<p>$$ 0.8018 = 35(1 - 0.98\\cos E) \\implies \\cos E = 0.997031 \\implies E \\approx 0.07708\\text{ rad} $$</p>
<p>By Kepler's Equation, the mean anomaly remaining until perihelion is:</p>
<p>$$ M = E - e\\sin E = 0.07708 - 0.98\\sin(0.07708) \\approx 0.001616\\text{ rad} $$</p>
<p>With orbital period \\(P = a^{3/2} = 35^{1.5} \\approx 207.06\\text{ yr} \\approx 75,630\\text{ days}\\), the time to perihelion is:</p>
<p>$$ \\Delta t = \\frac{M}{2\\pi} P \\approx \\frac{0.001616}{2\\pi} \\times 75,630\\text{ days} \\approx 19.5\\text{ days} $$</p>
<p>Adding \\(19\\text{--}20\\text{ days}\\) to the spring equinox (March 20/21) yields a perihelion date of <strong>April 8 – April 9</strong>.</p>`
    },

    // Day 03 — 21.10.2026
    {
        uniqueId: "potd_2026_10_21",
        dayNumber: 3,
        scheduledDate: "21.10.2026",
        title: "The Eccentric Binary",
        author: "Albert",
        authorRole: "Admin",
        module: "T4 · Stellar Parameters & Binaries",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "7/10",
        description: `<p>A double-lined spectroscopic binary consists of two stars moving in eccentric orbits around their common center of mass. Its orbital period is \\(P = 8.00\\text{ days}\\), eccentricity is \\(e = 0.30\\), and orbital inclination is \\(i = 60.0^\\circ\\). The measured radial-velocity semi-amplitudes are:</p>
<p>$$ K_1 = 120\\ \\mathrm{km\\,s^{-1}}, \\qquad K_2 = 180\\ \\mathrm{km\\,s^{-1}} $$</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the mass ratio \\(M_1/M_2\\).</li>
    <li>Calculate the semimajor axes \\(a_1\\) and \\(a_2\\) of the individual orbits around the center of mass.</li>
    <li>Determine the individual stellar masses in solar masses.</li>
    <li>Calculate the minimum and maximum separation between the two stars during their orbit.</li>
    <li>Calculate the orbital speed of each star at periastron.</li>
    <li>A student analyzes the same system assuming a circular, edge-on orbit and uses the measured values of \\(K_1\\), \\(K_2\\), and \\(P\\). Determine the total mass inferred by the student and the percentage error relative to the true total mass.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Mass Ratio:</strong></p>
<p>$$ \\frac{M_1}{M_2} = \\frac{K_2}{K_1} = \\frac{180}{120} = 1.50 $$</p>
<p><strong>(b) Individual Semimajor Axes:</strong></p>
<p>For an eccentric orbit at inclination \\(i\\), \\(a_j = \\frac{K_j P \\sqrt{1 - e^2}}{2\\pi \\sin i}\\). With \\(P = 6.912 \\times 10^5\\text{ s}\\), \\(\\sqrt{1 - 0.30^2} \\approx 0.95394\\), and \\(\\sin 60^\\circ \\approx 0.86603\\):</p>
<p>$$ a_1 = 1.454 \\times 10^{10}\\text{ m} \\approx 0.0972\\text{ AU}, \\qquad a_2 = 2.181 \\times 10^{10}\\text{ m} \\approx 0.1458\\text{ AU} $$</p>
<p><strong>(c) Individual Stellar Masses:</strong></p>
<p>Total semimajor axis \\(a = a_1 + a_2 = 0.2430\\text{ AU}\\), and \\(P = 8.00 / 365.25 = 0.021903\\text{ yr}\\). By Kepler's Third Law:</p>
<p>$$ M_{\\text{tot}} = \\frac{a^3}{P^2} = \\frac{(0.2430)^3}{(0.021903)^2} \\approx 29.9\\ M_\\odot \\implies M_1 = 0.6 M_{\\text{tot}} \\approx 17.9\\ M_\\odot, \\quad M_2 = 0.4 M_{\\text{tot}} \\approx 12.0\\ M_\\odot $$</p>
<p><strong>(d) Minimum and Maximum Separation:</strong></p>
<p>$$ r_{\\min} = a(1 - e) = 0.70(0.2430\\text{ AU}) \\approx 0.170\\text{ AU} \\ (2.54 \\times 10^{10}\\text{ m}) $$</p>
<p>$$ r_{\\max} = a(1 + e) = 1.30(0.2430\\text{ AU}) \\approx 0.316\\text{ AU} \\ (4.73 \\times 10^{10}\\text{ m}) $$</p>
<p><strong>(e) Orbital Speeds at Periastron:</strong></p>
<p>$$ v_{\\text{peri}, j} = \\frac{2\\pi a_j}{P}\\sqrt{\\frac{1+e}{1-e}} = \\frac{K_j(1+e)}{\\sin i} \\implies v_{\\text{peri}, 1} = \\frac{120(1.30)}{\\sin 60^\\circ} \\approx 180.1\\text{ km s}^{-1}, \\quad v_{\\text{peri}, 2} = \\frac{180(1.30)}{\\sin 60^\\circ} \\approx 270.2\\text{ km s}^{-1} $$</p>
<p><strong>(f) Student's Naive Estimate &amp; Percentage Error:</strong></p>
<p>Assuming \\(e = 0\\) and \\(i = 90^\\circ\\) scales the inferred total mass by \\(\\frac{\\sin^3 i}{(1 - e^2)^{3/2}} = \\frac{(\\sqrt{3}/2)^3}{(0.91)^{3/2}} \\approx 0.7482\\):</p>
<p>$$ M_{\\text{student}} \\approx 0.7482 \\times 29.9\\ M_\\odot \\approx 22.4\\ M_\\odot \\quad (\\text{Percentage Error} = -25.2\\%) $$</p>`
    },

    // Day 04 — 22.10.2026
    {
        uniqueId: "potd_2026_10_22",
        dayNumber: 4,
        scheduledDate: "22.10.2026",
        title: "Exposure Time (Comet 3I/ATLAS)",
        author: "Mihai",
        authorRole: "Admin",
        module: "T3 · Astronomical Instrumentation",
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        description: `<p>You are given an image of the interstellar comet 3I/ATLAS, taken on 13-12-2025, captured with an ASI2600MC Pro (pixel size of \\(3.76\\ \\mu\\text{m}\\)) camera mounted on a \\(200\\text{ mm},\\ f/5\\) telescope. The image is \\(4455\\text{ pixels}\\) long and \\(3277\\text{ pixels}\\) wide. On the image, 4 celestial objects have been annotated: the comet, 2 asteroids, and a galaxy. Find the exposure time of the image.</p>
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
        solutionHtml: `<p style="color: var(--text-muted); font-style: italic; margin-bottom: 16px;">Concept: Focal-plane plate scale calibration and asteroid angular trail length conversion.</p>
<p><strong>Step 1: Telescope Focal Length and Plate Scale</strong></p>
<p>For an \\(f/5\\) objective of aperture \\(D = 200\\text{ mm}\\), the focal length is \\(F = 5 \\times 200\\text{ mm} = 1000\\text{ mm} = 1.00\\text{ m}\\). With pixel size \\(p = 3.76 \\times 10^{-6}\\text{ m}\\), the angular resolution per pixel is:</p>
<p>$$ \\theta_{\\text{px}} = \\frac{p}{F} = 3.76 \\times 10^{-6}\\text{ rad/px} \\approx 0.7756''/\\text{px} $$</p>
<p><strong>Step 2: Asteroid Angular Rates &amp; Exposure Time Formula</strong></p>
<p>An asteroid at geocentric distance \\(d\\) with transverse relative speed \\(v_\\perp\\) has angular speed \\(\\omega = v_\\perp / d\\). Measuring a trail length of \\(L_{\\text{px}}\\) pixels on the image gives the exposure time:</p>
<p>$$ t_{\\text{exp}} = \\frac{L_{\\text{px}} \\theta_{\\text{px}}}{v_\\perp / d} = \\frac{L_{\\text{px}} \\cdot p \\cdot d}{F \\cdot v_\\perp} $$</p>
<ul>
    <li><strong>1737 Severny (\\(d_1 = 3.1\\text{ AU} = 4.638 \\times 10^{8}\\text{ km},\\ v_1 = 34.6\\text{ km/s}\\)):</strong> \\(\\omega_1 = 7.460 \\times 10^{-8}\\text{ rad/s} \\approx 0.01539''/\\text{s} \\implies t_{\\text{exp}} \\approx 50.4\\text{ s/px} \\times L_{\\text{px,1}}\\).</li>
    <li><strong>3906 Chao (\\(d_2 = 2.92\\text{ AU} = 4.368 \\times 10^{8}\\text{ km},\\ v_2 = 35.1\\text{ km/s}\\)):</strong> \\(\\omega_2 = 8.031 \\times 10^{-8}\\text{ rad/s} \\approx 0.01657''/\\text{s} \\implies t_{\\text{exp}} \\approx 46.8\\text{ s/px} \\times L_{\\text{px,2}}\\).</li>
</ul>`
    },

    // Day 05 — 23.10.2026
    {
        uniqueId: "potd_2026_10_23",
        dayNumber: 5,
        scheduledDate: "23.10.2026",
        title: "Starlight Behind Dust",
        author: "Albert",
        authorRole: "Admin",
        module: "T6 · Interstellar Medium & Extinction",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        description: `<p>A star has apparent visual magnitude \\(m_V = 12.40\\) and absolute visual magnitude \\(M_V = +2.10\\). Its measured colour excess is \\(E(B-V) = 0.35\\). For this line of sight, the visual extinction is \\(A_V = 3.1 E(B-V)\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the distance to the star in parsecs.</li>
    <li>Determine the distance that would be inferred if interstellar extinction were ignored.</li>
    <li>Calculate the ratio of the incorrect distance to the correct distance.</li>
    <li>Determine the apparent magnitude the star would have if placed at a distance of \\(100\\text{ pc}\\), with the same extinction.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) True Distance with Extinction:</strong></p>
<p>Visual extinction: \\(A_V = 3.1 \\times 0.35 = 1.085\\text{ mag}\\). From the extinction-corrected distance modulus:</p>
<p>$$ m_V - M_V - A_V = 12.40 - 2.10 - 1.085 = 9.215 = 5\\log_{10}\\left(\\frac{d}{10\\text{ pc}}\\right) \\implies d = 10 \\times 10^{9.215/5} \\approx 696.6\\text{ pc} $$</p>
<p><strong>(b) Inferred Distance Ignoring Extinction:</strong></p>
<p>$$ m_V - M_V = 10.30 = 5\\log_{10}\\left(\\frac{d_{\\text{naive}}}{10\\text{ pc}}\\right) \\implies d_{\\text{naive}} = 10 \\times 10^{10.30/5} \\approx 1148.2\\text{ pc} $$</p>
<p><strong>(c) Ratio of Incorrect to Correct Distance:</strong></p>
<p>$$ \\frac{d_{\\text{naive}}}{d} = 10^{A_V / 5} = 10^{1.085 / 5} = 10^{0.217} \\approx 1.648 $$</p>
<p><strong>(d) Apparent Magnitude at \\(100\\text{ pc}\\) with Same Extinction:</strong></p>
<p>$$ m_V(100\\text{ pc}) = M_V + 5\\log_{10}\\left(\\frac{100}{10}\\right) + A_V = 2.10 + 5.00 + 1.085 = 8.185 \\approx 8.19\\text{ mag} $$</p>`
    },

    // Day 06 — 24.10.2026
    {
        uniqueId: "potd_2026_10_24",
        dayNumber: 6,
        scheduledDate: "24.10.2026",
        title: "The Fuel Gauge of a Massive Star",
        author: "Albert",
        authorRole: "Admin",
        module: "T7 · Stellar Evolution",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        description: `<p>A main-sequence star has mass \\(4M_\\odot\\) and luminosity \\(64L_\\odot\\). Assume that \\(12\\%\\) of its total mass is available as nuclear fuel during its main-sequence lifetime. For the Sun, assume that \\(10\\%\\) of its mass is available as fuel and that its main-sequence lifetime is \\(10^{10}\\text{ years}\\). The amount of energy released per unit mass of fuel is the same for both stars.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Estimate the main-sequence lifetime of the star.</li>
    <li>If the star has already consumed \\(70\\%\\) of its available main-sequence fuel, estimate its remaining main-sequence lifetime.</li>
    <li>Recalculate the total lifetime if the fraction of mass available as fuel is assumed to be \\(10\\%\\), as for the Sun.</li>
    <li>Calculate the percentage difference between the two lifetime estimates.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Main-Sequence Lifetime (\\(f_\\star = 12\\%\\)):</strong></p>
<p>$$ \\tau_\\star = \\tau_\\odot \\left(\\frac{f_\\star}{f_\\odot}\\right)\\left(\\frac{M_\\star}{M_\\odot}\\right)\\left(\\frac{L_\\star}{L_\\odot}\\right)^{-1} = 10^{10}\\text{ yr} \\times \\frac{0.12}{0.10} \\times \\frac{4}{64} = 7.50 \\times 10^8\\text{ years} \\ (750\\text{ Myr}) $$</p>
<p><strong>(b) Remaining Main-Sequence Lifetime (\\(30\\%\\) Fuel Remaining):</strong></p>
<p>$$ \\tau_{\\text{rem}} = 0.30 \\times 7.50 \\times 10^8\\text{ yr} = 2.25 \\times 10^8\\text{ years} \\ (225\\text{ Myr}) $$</p>
<p><strong>(c) Total Lifetime Assuming \\(f = 10\\%\\):</strong></p>
<p>$$ \\tau_{10\\%} = 10^{10}\\text{ yr} \\times \\frac{4}{64} = 6.25 \\times 10^8\\text{ years} \\ (625\\text{ Myr}) $$</p>
<p><strong>(d) Percentage Difference:</strong></p>
<p>$$ \\frac{\\tau_\\star - \\tau_{10\\%}}{\\tau_\\star} = \\frac{750 - 625}{750} \\approx 16.7\\% \\quad \\left(\\text{or } \\frac{750 - 625}{625} = 20.0\\% \\text{ relative to } \\tau_{10\\%}\\right) $$</p>`
    },

    // Day 07 — 25.10.2026
    {
        uniqueId: "potd_2026_10_25",
        dayNumber: 7,
        scheduledDate: "25.10.2026",
        title: "The Aberrated Star",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Positional Astronomy",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        description: `<p>The Earth moves around the Sun on a circular orbit with orbital speed \\(v = 29.8\\ \\mathrm{km\\,s^{-1}}\\). A distant star lies exactly in the ecliptic plane. Take \\(c = 3.00 \\times 10^5\\ \\mathrm{km\\,s^{-1}}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>At what two orbital configurations during the year is the apparent angular displacement of the star due to annual aberration largest?</li>
    <li>Calculate the maximum angular displacement using the small-angle approximation \\(\\tan\\theta \\simeq \\theta \\simeq \\frac{v}{c}\\).</li>
    <li>Suppose the star is instead observed at an ecliptic latitude of \\(30^\\circ\\). Determine the maximum aberrational displacement and express it in arcseconds.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Orbital Configurations for Maximum Aberration:</strong></p>
<p>Annual aberration is proportional to the component of Earth's orbital velocity perpendicular to the star's line of sight (\\(v_\\perp = v\\sin\\Phi\\)). Because Earth's velocity vector \\(\\vec{v}_\\oplus\\) is tangent to its circular orbit (perpendicular to the Sun–Earth line), \\(\\vec{v}_\\oplus\\) is strictly perpendicular to the star's line of sight (\\(\\Phi = 90^\\circ\\)) when the star is at <strong>opposition</strong> and <strong>conjunction</strong> with the Sun.</p>
<p><strong>(b) Maximum Angular Displacement:</strong></p>
<p>$$ \\theta_{\\max} \\simeq \\frac{v}{c} = \\frac{29.8}{3.00 \\times 10^5} = 9.933 \\times 10^{-5}\\text{ rad} \\times 206,265''/\\text{rad} \\approx 20.49'' $$</p>
<p><strong>(c) Star at Ecliptic Latitude \\(\\beta = 30^\\circ\\):</strong></p>
<p>A star at ecliptic latitude \\(\\beta\\) traces an annual aberration ellipse whose semi-major axis (parallel to the ecliptic, at opposition/conjunction in longitude where \\(\\vec{v}_\\oplus \\perp \\hat{s}\\)) is \\(a = \\frac{v}{c} \\approx 20.49''\\), and whose semi-minor axis (perpendicular to the ecliptic at quadrature) is \\(b = \\frac{v}{c}\\sin\\beta = 20.49''\\sin(30^\\circ) \\approx 10.24''\\).</p>`
    },

    // Day 08 — 26.10.2026
    {
        uniqueId: "potd_2026_10_26",
        dayNumber: 8,
        scheduledDate: "26.10.2026",
        title: "The Unequal Solar Days",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Positional Astronomy & Timekeeping",
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "6/10",
        description: `<p>The Earth's sidereal rotation period is \\(T_{\\mathrm{rot}} = 23\\text{ h } 56\\text{ min } 4.09\\text{ s}\\). Its orbital period is \\(365.256\\text{ days}\\) and its orbital eccentricity is \\(e = 0.0167\\). For calculations at perihelion and aphelion, assume that the Earth's instantaneous orbital angular velocity remains constant over the duration of one solar day.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the mean solar day, treating the Earth's orbit as circular.</li>
    <li>Calculate the approximate instantaneous solar-day length at perihelion.</li>
    <li>Calculate the approximate instantaneous solar-day length at aphelion.</li>
    <li>Determine the difference between the solar-day lengths obtained in parts (b) and (c).</li>
    <li>If the Earth's orbital eccentricity were increased while its orbital period and sidereal rotation period remained unchanged, how would the difference between the solar-day lengths at perihelion and aphelion change?</li>
    <li>Suppose the Earth rotates in the opposite direction, with the same sidereal rotation period in magnitude. Calculate the resulting mean interval between successive noons.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Mean Solar Day:</strong></p>
<p>With \\(T_{\\mathrm{rot}} = 86,164.09\\text{ s}\\) and \\(P_{\\mathrm{orb}} = 365.256 \\times 86,400\\text{ s}\\):</p>
<p>$$ T_{\\mathrm{solar,mean}} = \\frac{T_{\\mathrm{rot}}}{1 - T_{\\mathrm{rot}}/P_{\\mathrm{orb}}} = 86,400.00\\text{ s} = 24\\text{ h } 00\\text{ min } 00.00\\text{ s} \\quad (\\Delta t_{\\mathrm{mean}} = 235.91\\text{ s}) $$</p>
<p><strong>(b) Solar-Day Length at Perihelion:</strong></p>
<p>By conservation of angular momentum, \\(\\omega_p = \\omega_{\\mathrm{mean}} \\frac{\\sqrt{1-e^2}}{(1-e)^2} \\approx 1.03428\\,\\omega_{\\mathrm{mean}}\\). Thus \\(\\Delta t_p \\approx 1.03428 \\times 235.91\\text{ s} \\approx 244.00\\text{ s}\\), giving:</p>
<p>$$ T_{\\mathrm{solar},p} = 86,164.09 + 244.00 = 86,408.09\\text{ s} = 24\\text{ h } 00\\text{ min } 08.09\\text{ s} $$</p>
<p><strong>(c) Solar-Day Length at Aphelion:</strong></p>
<p>At aphelion, \\(\\omega_a = \\omega_{\\mathrm{mean}} \\frac{\\sqrt{1-e^2}}{(1+e)^2} \\approx 0.96740\\,\\omega_{\\mathrm{mean}}\\), so \\(\\Delta t_a \\approx 0.96740 \\times 235.91\\text{ s} \\approx 228.22\\text{ s}\\):</p>
<p>$$ T_{\\mathrm{solar},a} = 86,164.09 + 228.22 = 86,392.31\\text{ s} = 23\\text{ h } 59\\text{ min } 52.31\\text{ s} $$</p>
<p><strong>(d) Difference:</strong> \\(T_{\\mathrm{solar},p} - T_{\\mathrm{solar},a} = 244.00 - 228.22 = 15.78\\text{ s}\\).</p>
<p><strong>(e) Effect of Increasing \\(e\\):</strong> Increasing \\(e\\) increases \\(\\omega_p\\) and decreases \\(\\omega_a\\), so the difference between perihelion and aphelion solar-day lengths <strong>increases</strong> (for small \\(e\\), \\(\\Delta T \\approx 4e\\,\\Delta t_{\\mathrm{mean}}\\)).</p>
<p><strong>(f) Retrograde Rotation Solar Day:</strong></p>
<p>$$ T_{\\mathrm{retro}} = \\frac{T_{\\mathrm{rot}}}{1 + T_{\\mathrm{rot}}/P_{\\mathrm{orb}}} \\approx 85,928.82\\text{ s} = 23\\text{ h } 52\\text{ min } 08.82\\text{ s} $$</p>`
    },

    // Day 09 — 27.10.2026
    {
        uniqueId: "potd_2026_10_27",
        dayNumber: 9,
        scheduledDate: "27.10.2026",
        title: "The Planet's Retrograde Wander",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Celestial Mechanics",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "7/10",
        description: `<p>A planet moves on an elliptical orbit around the Sun with semimajor axis \\(a = 2.20\\text{ AU}\\) and eccentricity \\(e = 0.30\\). At a particular instant, the planet is observed at opposition with true anomaly \\(f = 60.0^\\circ\\), measured from periastron in the direction of orbital motion. The Earth moves on a circular orbit of radius \\(1.00\\text{ AU}\\) and period \\(365.25\\text{ days}\\). The two orbital planes coincide.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the planet's orbital period in years and days.</li>
    <li>Calculate its heliocentric distance at the instant of observation.</li>
    <li>Determine the planet's transverse orbital velocity and its instantaneous angular velocity around the Sun.</li>
    <li>Calculate the planet's instantaneous apparent angular velocity relative to the background stars as seen from Earth. Give its magnitude in degrees per day and identify the direction of apparent motion.</li>
    <li>Determine the mean synodic period of the planet as observed from Earth.</li>
    <li>Compare the instantaneous apparent angular velocity with the value obtained by treating the planet's orbit as circular with the same semimajor axis.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Orbital Period:</strong> \\(P = a^{3/2} = 2.20^{1.5} \\approx 3.263\\text{ yr} \\approx 1191.8\\text{ days}\\).</p>
<p><strong>(b) Heliocentric Distance:</strong></p>
<p>$$ r = \\frac{a(1 - e^2)}{1 + e\\cos f} = \\frac{2.20(1 - 0.09)}{1 + 0.30\\cos 60^\\circ} = \\frac{2.002}{1.15} \\approx 1.741\\text{ AU} $$</p>
<p><strong>(c) Transverse Velocity &amp; Heliocentric Angular Velocity:</strong></p>
<p>Using specific angular momentum \\(h = \\sqrt{GM_\\odot a(1-e^2)}\\), with \\(v_\\oplus = 29.785\\text{ km s}^{-1}\\):</p>
<p>$$ v_\\perp = \\frac{h}{r} = v_\\oplus \\frac{\\sqrt{a(1-e^2)}}{r / 1\\text{ AU}} = 29.785 \\times \\frac{\\sqrt{2.002}}{1.7409} \\approx 24.21\\text{ km s}^{-1} $$</p>
<p>$$ \\omega_p = \\frac{v_\\perp}{r} = \\frac{24.21\\text{ km s}^{-1}}{1.7409 \\times 1.496 \\times 10^8\\text{ km}} \\approx 9.30 \\times 10^{-8}\\text{ rad s}^{-1} \\approx 0.460^\\circ\\text{/day} $$</p>
<p><strong>(d) Apparent Angular Velocity from Earth at Opposition:</strong></p>
<p>$$ \\omega_{\\mathrm{app}} = \\frac{v_\\perp - v_\\oplus}{r - r_\\oplus} = \\frac{24.21 - 29.785}{(1.7409 - 1.00)\\text{ AU}} \\approx -0.249^\\circ\\text{/day} \\quad (\\text{magnitude } 0.249^\\circ\\text{/day, retrograde}) $$</p>
<p><strong>(e) Mean Synodic Period:</strong> \\(S = \\frac{1}{1 - 1/3.2631}\\text{ yr} \\approx 1.442\\text{ yr} \\approx 526.7\\text{ days}\\).</p>
<p><strong>(f) Comparison with Circular Orbit (\\(r = 2.20\\text{ AU}\\)):</strong> For a circular orbit, \\(v_{\\mathrm{circ}} = 29.785 / \\sqrt{2.20} \\approx 20.08\\text{ km s}^{-1}\\), giving \\(\\omega_{\\mathrm{app,circ}} \\approx -0.310^\\circ\\text{/day}\\) (faster retrograde motion than at \\(f = 60^\\circ\\)).</p>`
    },

    // Day 10 — 28.10.2026
    {
        uniqueId: "potd_2026_10_28",
        dayNumber: 10,
        scheduledDate: "28.10.2026",
        title: "Colour, Luminosity, and Angular Size",
        author: "Albert",
        authorRole: "Admin",
        module: "T2 · Radiation Physics & Stellar Parameters",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        description: `<p>Two stars, A and B, radiate as ideal blackbodies. Their peak emission wavelengths are \\(\\lambda_{\\max,A} = 400\\text{ nm}\\) and \\(\\lambda_{\\max,B} = 800\\text{ nm}\\). Their bolometric fluxes measured at Earth satisfy \\(f_A / f_B = 3.0\\), and their distances from Earth are \\(d_A = 100\\text{ pc}\\) and \\(d_B = 200\\text{ pc}\\).</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the ratio of their surface temperatures.</li>
    <li>Calculate the luminosity ratio \\(L_A / L_B\\).</li>
    <li>Determine the radius ratio \\(R_A / R_B\\).</li>
    <li>Calculate the ratio of their apparent angular diameters.</li>
    <li>Which star has the greater mean surface brightness? Determine the ratio of their bolometric surface fluxes.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Surface Temperature Ratio (Wien's Law):</strong></p>
<p>$$ \\frac{T_A}{T_B} = \\frac{\\lambda_{\\max,B}}{\\lambda_{\\max,A}} = \\frac{800\\text{ nm}}{400\\text{ nm}} = 2.0 $$</p>
<p><strong>(b) Luminosity Ratio:</strong></p>
<p>$$ \\frac{L_A}{L_B} = \\left(\\frac{f_A}{f_B}\\right)\\left(\\frac{d_A}{d_B}\\right)^2 = 3.0 \\times \\left(\\frac{100}{200}\\right)^2 = 0.75 $$</p>
<p><strong>(c) Radius Ratio (Stefan-Boltzmann Law):</strong></p>
<p>$$ \\frac{R_A}{R_B} = \\sqrt{\\frac{L_A}{L_B}}\\left(\\frac{T_A}{T_B}\\right)^{-2} = \\frac{\\sqrt{0.75}}{2^2} = \\frac{\\sqrt{3}}{8} \\approx 0.2165 $$</p>
<p><strong>(d) Apparent Angular Diameter Ratio:</strong></p>
<p>$$ \\frac{\\theta_A}{\\theta_B} = \\frac{R_A / d_A}{R_B / d_B} = \\frac{\\sqrt{3}/8}{100/200} = \\frac{\\sqrt{3}}{4} \\approx 0.4330 $$</p>
<p><strong>(e) Bolometric Surface Flux Ratio:</strong></p>
<p><strong>Star A</strong> has the greater mean surface brightness: \\(\\frac{F_{\\mathrm{surf},A}}{F_{\\mathrm{surf},B}} = \\left(\\frac{T_A}{T_B}\\right)^4 = 2^4 = 16\\).</p>`
    },

    // Day 11 — 29.10.2026
    {
        uniqueId: "potd_2026_10_29",
        dayNumber: 11,
        scheduledDate: "29.10.2026",
        title: "The Perfect Einstein Ring",
        author: "Albert",
        authorRole: "Admin",
        module: "T8 · General Relativity & Gravitational Lensing",
        difficultyClass: "medium",
        icon: "fire",
        difficultyText: "5/10",
        description: `<p>A distant galaxy lies exactly behind a foreground galaxy cluster. The cluster is approximated as a point mass \\(M = 5.0 \\times 10^{14} M_\\odot\\). The distances from the observer to the cluster and source, and from the cluster to the source, are:</p>
<p>$$ D_L = 1.0\\text{ Gpc}, \\qquad D_S = 2.0\\text{ Gpc}, \\qquad D_{LS} = 1.0\\text{ Gpc} $$</p>
<p>In the weak-field approximation, the deflection angle of a light ray passing a point mass with impact parameter \\(b\\) is \\(\\alpha = \\frac{4GM}{c^2 b}\\). Assume small angles and Euclidean lens geometry.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the angular radius of the Einstein ring in arcseconds.</li>
    <li>Calculate the angular diameter of the ring.</li>
    <li>Determine the physical radius of the ring in the plane of the lens.</li>
    <li>How would the angular radius change if the cluster mass were increased by a factor of four?</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Angular Radius of the Einstein Ring (\\(\\theta_E\\)):</strong></p>
<p>From the thin-lens equation for a collinear source (\\(b = D_L \\theta_E\\) and \\(D_S \\theta_E = D_{LS} \\alpha\\)):</p>
<p>$$ \\theta_E = \\sqrt{\\frac{4GM}{c^2} \\frac{D_{LS}}{D_L D_S}} $$</p>
<p>With \\(\\frac{4GM}{c^2} = 2 R_{s,\\odot} (5.0 \\times 10^{14}) \\approx 2.953 \\times 10^{18}\\text{ m} \\approx 95.71\\text{ pc}\\) and \\(\\frac{D_{LS}}{D_L D_S} = 5.0 \\times 10^{-10}\\text{ pc}^{-1}\\):</p>
<p>$$ \\theta_E = \\sqrt{95.71 \\times 5.0 \\times 10^{-10}} \\approx 2.188 \\times 10^{-4}\\text{ rad} \\approx 45.1'' $$</p>
<p><strong>(b) Angular Diameter:</strong> \\(2\\theta_E \\approx 90.2''\\).</p>
<p><strong>(c) Physical Radius in the Lens Plane:</strong> \\(b = D_L \\theta_E = 1.0\\text{ Gpc} \\times 2.188 \\times 10^{-4}\\text{ rad} \\approx 218.8\\text{ kpc}\\).</p>
<p><strong>(d) Scaling with Cluster Mass:</strong> Since \\(\\theta_E \\propto \\sqrt{M}\\), increasing \\(M\\) by a factor of 4 <strong>doubles</strong> the angular radius (to \\(90.2''\\)).</p>`
    },

    // Day 12 — 30.10.2026
    {
        uniqueId: "potd_2026_10_30",
        dayNumber: 12,
        scheduledDate: "30.10.2026",
        title: "Recovering an Asteroid's Orbit",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Celestial Mechanics",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "8/10",
        description: `<p>An asteroid is observed at opposition while moving in a prograde heliocentric orbit in the Earth's orbital plane. Its geocentric distance is \\(1.20\\text{ AU}\\). Its apparent motion relative to the background stars is retrograde, with angular speed \\(\\omega_{\\mathrm{obs}} = 0.30^\\circ\\text{ day}^{-1}\\). Its measured line-of-sight velocity relative to Earth is \\(v_{\\mathrm{los}} = +5.0\\ \\mathrm{km\\,s^{-1}}\\), where a positive value indicates that the distance between the asteroid and Earth is increasing.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the asteroid's heliocentric distance at the instant of observation.</li>
    <li>Calculate the asteroid's heliocentric transverse velocity.</li>
    <li>Determine its heliocentric radial velocity and total orbital speed.</li>
    <li>Calculate the asteroid's specific orbital energy, semimajor axis, and eccentricity.</li>
    <li>Determine its orbital period and perihelion distance.</li>
    <li>Calculate its true anomaly and determine whether it is moving toward or away from perihelion.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Heliocentric Distance:</strong> At opposition, \\(r = r_\\oplus + \\Delta = 1.00 + 1.20 = 2.20\\text{ AU}\\).</p>
<p><strong>(b) Heliocentric Transverse Velocity:</strong></p>
<p>With \\(\\omega_{\\mathrm{obs}} = -0.30^\\circ/\\text{d} = -6.060 \\times 10^{-8}\\text{ rad s}^{-1}\\) and \\(\\Delta = 1.20\\text{ AU} = 1.795 \\times 10^8\\text{ km}\\):</p>
<p>$$ v_\\perp = v_\\oplus + \\omega_{\\mathrm{obs}}\\Delta = 29.785 - 10.88 = 18.91\\text{ km s}^{-1} $$</p>
<p><strong>(c) Radial Velocity &amp; Total Speed:</strong> \\(v_r = v_{\\mathrm{los}} = +5.0\\text{ km s}^{-1}\\); \\(v = \\sqrt{18.91^2 + 5.0^2} \\approx 19.56\\text{ km s}^{-1}\\).</p>
<p><strong>(d) Specific Orbital Energy, Semimajor Axis &amp; Eccentricity:</strong></p>
<p>$$ \\epsilon = \\frac{v^2}{2} - \\frac{\\mu_\\odot}{r} \\approx \\frac{19.56^2}{2} - \\frac{887.1}{2.20} \\approx -211.9\\text{ km}^2\\text{ s}^{-2} \\implies a = -\\frac{\\mu_\\odot}{2\\epsilon} \\approx 2.093\\text{ AU} $$</p>
<p>From \\(p = a(1-e^2) = \\frac{r^2 v_\\perp^2}{\\mu_\\odot} \\approx 1.951\\text{ AU}\\), we get \\(e = \\sqrt{1 - p/a} \\approx 0.261\\).</p>
<p><strong>(e) Orbital Period &amp; Perihelion Distance:</strong> \\(P = a^{3/2} \\approx 3.03\\text{ yr}\\); \\(q = a(1-e) \\approx 1.55\\text{ AU}\\).</p>
<p><strong>(f) True Anomaly:</strong> \\(\\cos f = \\frac{p/r - 1}{e} \\approx -0.434 \\implies f \\approx 115.7^\\circ\\). Since \\(v_r > 0\\), it is moving <strong>away from perihelion</strong>.</p>`
    },

    // Day 13 — 31.10.2026
    {
        uniqueId: "potd_2026_10_31",
        dayNumber: 13,
        scheduledDate: "31.10.2026",
        title: "The Radius and Mass of a Transiting Giant",
        author: "Albert",
        authorRole: "Admin",
        module: "T9 · Planetary Systems & Exoplanets",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "7/10",
        description: `<p>An exoplanet transits a star with mass \\(M_\\star = M_\\odot\\) and radius \\(R_\\star = R_\\odot\\). The transit depth is \\(0.81\\%\\). The total transit duration from first to fourth contact is \\(T_{14} = 4.03\\text{ hours}\\), and the duration from first to second contact is \\(T_{12} = 0.433\\text{ hours}\\). The orbital period is \\(P = 12.0\\text{ days}\\), and the measured radial-velocity semi-amplitude of the star is \\(K = 40.0\\ \\mathrm{m\\,s^{-1}}\\). Assume a circular orbit and uniform stellar surface brightness.</p>
<ol type="a" style="padding-left: 20px; line-height: 1.8;">
    <li>Determine the planet's radius in Jupiter radii.</li>
    <li>Determine the transit impact parameter in units of the stellar radius.</li>
    <li>Calculate the orbital semimajor axis and the orbital inclination.</li>
    <li>Determine the planet's mass in Jupiter masses.</li>
    <li>Calculate the planet's mean density in \\(\\mathrm{g\\,cm^{-3}}\\).</li>
    <li>Determine the planet's surface gravitational acceleration relative to Jupiter's.</li>
</ol>`,
        solutionHtml: `<p><strong>(a) Planet Radius:</strong> \\(k = \\frac{R_p}{R_\\star} = \\sqrt{0.0081} = 0.090 \\implies R_p = 0.090 R_\\odot \\approx 0.876 R_J\\).</p>
<p><strong>(b) Impact Parameter (\\(b\\)):</strong> With \\(T_{23} = T_{14} - 2T_{12} = 3.164\\text{ h}\\):</p>
<p>$$ \\frac{(1+k)^2 - b^2}{(1-k)^2 - b^2} = \\left(\\frac{T_{14}}{T_{23}}\\right)^2 \\approx 1.6223 \\implies b \\approx 0.50\\ R_\\star $$</p>
<p><strong>(c) Semimajor Axis &amp; Inclination:</strong> \\(a = (12.0 / 365.25)^{2/3}\\text{ AU} \\approx 0.1028\\text{ AU} \\approx 22.1\\ R_\\odot\\). Thus \\(\\cos i = \\frac{b R_\\star}{a} \\approx 0.0226 \\implies i \\approx 88.7^\\circ\\).</p>
<p><strong>(d) Planet Mass:</strong> \\(M_p = \\frac{K M_\\star^{2/3}}{\\sin i}\\left(\\frac{P}{2\\pi G}\\right)^{1/3} \\approx 0.453\\ M_J\\).</p>
<p><strong>(e) Mean Density:</strong> \\(\\rho_p = \\frac{M_p}{\\frac{4}{3}\\pi R_p^3} \\approx 0.82\\text{ g cm}^{-3}\\).</p>
<p><strong>(f) Surface Gravity Relative to Jupiter:</strong> \\(\\frac{g_p}{g_J} = \\left(\\frac{M_p}{M_J}\\right)\\left(\\frac{R_p}{R_J}\\right)^{-2} \\approx \\frac{0.453}{(0.876)^2} \\approx 0.59\\).</p>`
    },

    // Day 14 — 01.11.2026
    {
        uniqueId: "potd_2026_11_01",
        dayNumber: 14,
        scheduledDate: "01.11.2026",
        title: "Featured Olympiad Challenge",
        author: "Matei",
        authorRole: "Owner",
        module: "T1 · Celestial Mechanics",
        difficultyClass: "easy",
        icon: "bolt",
        difficultyText: "4/10",
        description: `<p><em>[Slot #14 (01.11.2026): Reserved for Matei's POTD problem — paste LaTeX when ready.]</em></p>`,
        solutionHtml: `<p><strong>Solution:</strong></p><p><em>Official derivation will be displayed here.</em></p>`
    }
];

// ============================================================================
// 2. PROBLEM OF THE WEEK (POTW) — 7-DAY CYCLE STARTING 19.10.2026 00:00 UT
//    19.10.2026 - 25.10.2026: Planets and Coordinates - Mihai
//    25.10.2026 - 01.11.2026: The Solar Sail Telescope - Albert
// ============================================================================
export const potwProblems = [
    // Week 01 — 19.10.2026 – 25.10.2026
    {
        uniqueId: "potw_2026_w1",
        weekNumber: 1,
        scheduledDate: "19.10.2026 – 25.10.2026",
        title: "Planets and Coordinates",
        author: "Mihai",
        authorRole: "Admin",
        module: "T1 · Positional Astronomy & Orbital Elements",
        difficultyClass: "hard",
        icon: "fire",
        difficultyText: "8/10",
        description: `<p>Alex the astrophotographer arrives in the Astrobin stellar system to take the photo that will help him win the Image of the Day contest. The system consists of an Earth-like planet (at \\(1\\text{ AU}\\) from the central star \\(1\\ M_\\odot\\)) and 4 outer planets on circular orbits. Alex plans to image the next planetary alignment, and he memorized the orbital parameters of the four outer planets (where \\(\\Omega\\) is the longitude of the ascending node, \\(\\phi = u\\) is the argument of latitude in the orbital plane measured from the ascending node, \\(i\\) is the inclination relative to the ecliptic, and \\(T\\) is the orbital period). The Earth-like planet has axial tilt \\(\\varepsilon = 23.44^\\circ\\).</p>
<p><strong>Part I — Calculating Coordinates:</strong></p>
<ol style="padding-left: 20px; line-height: 1.8;">
    <li>Find expressions for the heliocentric Cartesian coordinates \\((x_{\\text{ecl}}, y_{\\text{ecl}}, z_{\\text{ecl}})\\) of a planet \\(P\\) in the <em>ecliptic frame</em> in terms of its orbital radius \\(r = T^{2/3}\\text{ AU}\\), \\(\\Omega\\), \\(\\phi\\), and \\(i\\).</li>
    <li>Find the heliocentric Cartesian coordinates \\((x_{\\text{eq}}, y_{\\text{eq}}, z_{\\text{eq}})\\) of \\(P\\) in the <em>equatorial frame</em> in terms of the ecliptic coordinates and axial tilt \\(\\varepsilon\\).</li>
    <li>Find the geocentric Cartesian coordinates \\((X, Y, Z)\\) of \\(P\\) given Earth's heliocentric ecliptic longitude \\(\\lambda_\\oplus\\).</li>
    <li>Convert \\((X, Y, Z)\\) into spherical equatorial coordinates \\((\\alpha, \\delta)\\).</li>
</ol>
<p><strong>Part II — Planetary Alignment:</strong></p>
<ol style="padding-left: 20px; line-height: 1.8;">
    <li>Given 3 points \\(P_1, P_2, P_3\\) on the celestial sphere with coordinates \\((\\alpha_k, \\delta_k)\\), find the mathematical condition that all 3 lie on a single great circle.</li>
    <li>Which 3 of the 4 given planets are aligned on a great circle?</li>
    <li>Find the angular distances between the 3 aligned planets.</li>
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
        solutionHtml: `<p><strong>Part I — Coordinate Transformations:</strong></p>
<p><strong>1. Heliocentric Ecliptic Coordinates:</strong> With \\(r = T^{2/3}\\text{ AU}\\), rotating from the orbital plane by inclination \\(i\\) and node longitude \\(\\Omega\\) gives:</p>
<p>$$ \\begin{aligned}
x_{\\text{ecl}} &= r(\\cos\\Omega\\cos\\phi - \\sin\\Omega\\sin\\phi\\cos i) \\\\
y_{\\text{ecl}} &= r(\\sin\\Omega\\cos\\phi + \\cos\\Omega\\sin\\phi\\cos i) \\\\
z_{\\text{ecl}} &= r(\\sin\\phi\\sin i)
\\end{aligned} $$</p>
<p><strong>2. Heliocentric Equatorial Coordinates:</strong> Rotating around the vernal equinox \\(x\\)-axis by Earth's obliquity \\(\\varepsilon = 23.44^\\circ\\):</p>
<p>$$ x_{\\text{eq}} = x_{\\text{ecl}}, \\qquad y_{\\text{eq}} = y_{\\text{ecl}}\\cos\\varepsilon - z_{\\text{ecl}}\\sin\\varepsilon, \\qquad z_{\\text{eq}} = y_{\\text{ecl}}\\sin\\varepsilon + z_{\\text{ecl}}\\cos\\varepsilon $$</p>
<p><strong>3. Geocentric Equatorial Coordinates:</strong> Subtracting Earth's heliocentric equatorial position \\(\\vec{r}_\\oplus = (\\cos\\lambda_\\oplus,\\ \\sin\\lambda_\\oplus\\cos\\varepsilon,\\ \\sin\\lambda_\\oplus\\sin\\varepsilon)\\text{ AU}\\):</p>
<p>$$ (X, Y, Z) = (x_{\\text{eq}} - x_{\\oplus,\\text{eq}},\\ y_{\\text{eq}} - y_{\\oplus,\\text{eq}},\\ z_{\\text{eq}} - z_{\\oplus,\\text{eq}}) $$</p>
<p><strong>4. Right Ascension &amp; Declination:</strong> With geocentric distance \\(\\Delta = \\sqrt{X^2 + Y^2 + Z^2}\\):</p>
<p>$$ \\alpha = \\operatorname{atan2}(Y, X) \\in [0, 2\\pi), \\qquad \\delta = \\arcsin\\left(\\frac{Z}{\\Delta}\\right) $$</p>
<p><strong>Part II — Great-Circle Alignment Condition:</strong></p>
<p>Three unit direction vectors \\(\\hat{u}_k = (\\cos\\delta_k\\cos\\alpha_k,\\ \\cos\\delta_k\\sin\\alpha_k,\\ \\sin\\delta_k)\\) lie on a single great circle if and only if they are coplanar with the origin, meaning their scalar triple product (determinant) vanishes:</p>
<p>$$ \\det[\\hat{u}_1,\\ \\hat{u}_2,\\ \\hat{u}_3] = \\hat{u}_1 \\cdot (\\hat{u}_2 \\times \\hat{u}_3) = 0 \\iff \\sum_{\\text{cyc}} \\tan\\delta_1 \\sin(\\alpha_2 - \\alpha_3) = 0 $$</p>
<p>Evaluating the unit vectors for the four planets from Table 1 (\\(r_A = 1.587\\text{ AU},\\ r_B = 2.520\\text{ AU},\\ r_C = 5.241\\text{ AU},\\ r_D = 4.000\\text{ AU}\\)) identifies the coplanar triplet and their pairwise angular separations \\(\\theta_{jk} = \\arccos(\\hat{u}_j \\cdot \\hat{u}_k)\\).</p>`
    },

    // Week 02 — 25.10.2026 – 01.11.2026
    {
        uniqueId: "potw_2026_w2",
        weekNumber: 2,
        scheduledDate: "25.10.2026 – 01.11.2026",
        title: "The Solar Sail Telescope — A Non-Collinear Radiative Equilibrium",
        author: "Albert",
        authorRole: "Admin",
        module: "T1 · Non-Keplerian Three-Body & Radiation Mechanics",
        difficultyClass: "hard",
        icon: "skull",
        difficultyText: "10/10",
        description: `<p>A scientific agency proposes to place an automated telescope of mass \\(m = 100\\text{ kg}\\) in a stationary position relative to the Earth, on the Sun-facing side of the Earth, equipped with a perfectly reflecting flat solar sail of area \\(A\\). Unlike the usual collinear \\(L_1\\) problem, the sail normal \\(\\bm{n}\\) is tilted by a fixed angle \\(\\theta\\) relative to the radial vector \\(\\bm{e}_r\\) from the Sun, creating both radial and transverse radiation-pressure acceleration components.</p>
<p><strong>Part I — Calibration of the Solar Sail:</strong> Starting from rest at \\(r = R_\\odot = 6.96 \\times 10^8\\text{ m}\\) with normal incidence (\\(\\alpha = 0\\)), the test telescope reaches \\(r_f = 1.392 \\times 10^9\\text{ m} = 2R_\\odot\\) in \\(t_f = 3656\\text{ s}\\).<br>
(a) Show that \\(\\beta \\equiv \\frac{F_{\\text{rad}}}{F_{g,\\odot}} = \\frac{L_\\odot A}{2\\pi c G M_\\odot m}\\). (b) Derive the exact analytic flight time \\(t_f\\) from \\(R_\\odot\\) to \\(r_f\\). (c) Determine \\(\\beta\\) and \\(A/m\\). (d) Verify solar escape.</p>
<p><strong>Part II — Non-Collinear Equilibrium in the Rotating Frame:</strong> The sail is tilted so that \\(\\bm{a}_{\\text{rad}}\\cdot\\bm{e}_r = 0.10\\frac{GM_\\odot}{\\rho_\\odot^2}\\).<br>
(a) Show \\(\\beta\\cos^3\\theta = 0.10\\) and find \\(\\theta\\). (b)–(e) Explain why the equilibrium lies off the Sun–Earth line, write the coupled \\((x,y)\\) equilibrium equations in the rotating barycentric frame, and compute \\(x, y,\\) and the Earth distance \\(d_E\\) to 3 significant figures.</p>
<p><strong>Part III — Linear Stability:</strong> Linearize \\(\\ddot{\\bm{\\xi}} + 2\\omega\\hat{\\bm{z}}\\times\\dot{\\bm{\\xi}} = \\mathbf{J}\\bm{\\xi}\\), obtain the quartic characteristic polynomial in \\(\\lambda\\), compute all 4 eigenvalues, and determine the e-folding instability timescale.</p>
<p><strong>Part IV &amp; V — Control Sensitivity &amp; Physical Limits:</strong> Compute \\(\\left.\\frac{dd_E}{d\\varepsilon}\\right|_{\\varepsilon=0}\\), find the displacement for a \\(1.0\\%\\) radial control error, and analyze the limits \\(\\theta \\to 0\\) and \\(\\theta \\to \\pi/2\\).</p>`,
        solutionHtml: `<p><strong>Part I — Calibration Results:</strong></p>
<p><strong>(a)–(b) Equation of Motion &amp; Flight Time:</strong> For normal incidence, \\(\\ddot{r} = (\\beta - 1)\\frac{GM_\\odot}{r^2}\\). Integrating twice from rest at \\(r = R_\\odot\\) to \\(r_f = 2R_\\odot\\) gives:</p>
<p>$$ t_f = \\sqrt{\\frac{R_\\odot^3}{2(\\beta - 1)GM_\\odot}}\\left[\\sqrt{\\frac{r_f}{R_\\odot}\\left(\\frac{r_f}{R_\\odot}-1\\right)} + \\ln\\left(\\sqrt{\\frac{r_f}{R_\\odot}-1} + \\sqrt{\\frac{r_f}{R_\\odot}}\\right)\\right] = \\sqrt{\\frac{R_\\odot^3}{2(\\beta - 1)GM_\\odot}}\\left[\\sqrt{2} + \\ln(1 + \\sqrt{2})\\right] $$</p>
<p><strong>(c)–(d) Numerical Evaluation:</strong> Substituting \\(t_f = 3656\\text{ s}\\), \\(R_\\odot = 6.96 \\times 10^8\\text{ m}\\), and \\(GM_\\odot = 1.3275 \\times 10^{20}\\text{ m}^3\\text{s}^{-2}\\) yields:</p>
<p>$$ \\beta - 1 = 1.00 \\implies \\beta = 2.00, \\qquad \\frac{A}{m} = \\frac{2\\pi c G M_\\odot \\beta}{L_\\odot} \\approx 1.31\\text{ m}^2\\text{ kg}^{-1} \\quad (A \\approx 131\\text{ m}^2) $$</p>
<p>Since \\(\\beta = 2.00 > 1\\), the net radial force is outward everywhere, guaranteeing escape.</p>
<p><strong>Part II — Non-Collinear Equilibrium:</strong></p>
<p><strong>(a) Sail Tilt Angle:</strong> Since \\(\\bm{a}_{\\text{rad}} = \\beta\\frac{GM_\\odot}{\\rho_\\odot^2}\\cos^2\\theta(\\cos\\theta\\,\\bm{e}_r + \\sin\\theta\\,\\bm{e}_\\phi)\\), the radial condition gives \\(\\beta\\cos^3\\theta = 0.10 \\implies \\cos\\theta = (0.05)^{1/3} \\approx 0.3684 \\implies \\theta \\approx \\pm 68.4^\\circ\\).</p>
<p><strong>(b)–(d) Equilibrium Position:</strong> The transverse radiation acceleration is \\(a_{\\text{rad},\\phi} = 0.10\\tan\\theta\\frac{GM_\\odot}{\\rho_\\odot^2} \\approx 0.252\\frac{GM_\\odot}{\\rho_\\odot^2}\\). Balancing Sun's effective gravity \\(0.90\\frac{GM_\\odot}{\\rho_\\odot^2}\\bm{e}_r\\), transverse radiation pressure, Earth's gravity, and centrifugal acceleration \\(\\omega^2\\bm{r}\\) yields two symmetric off-axis equilibria \\((x_0, \\pm y_0)\\) on the Sunward side of Earth.</p>
<p><strong>Part V — Transverse-to-Radial Ratio &amp; Limits:</strong> \\(\\eta = \\tan\\theta\\). As \\(\\theta \\to 0\\), \\(y_0 \\to 0\\) (recovering the sub-\\(L_1\\) collinear point where solar gravity is reduced by \\(10\\%\\), at \\(d_E \\approx 0.036 D \\approx 5.4 \\times 10^9\\text{ m}\\)). The limit \\(\\theta \\to \\pi/2\\) at fixed radial reduction \\(\\beta\\cos^3\\theta = 0.10\\) requires \\(\\beta = \\frac{0.10}{\\cos^3\\theta} \\to \\infty\\), which is physically unattainable for any finite area-to-mass ratio \\(A/m\\).</p>`
    }
];

// ============================================================================
// 3. PROBLEM OF THE MONTH (POTM) — 28-DAY CYCLE STARTING 19.10.2026 00:00 UT
//    19.10.2026 - 15.11.2026: The Invisible Planet and the Dance of the Stars - Matei
// ============================================================================
export const potmProblems = [
    {
        uniqueId: "potm_2026_m1",
        monthNumber: 1,
        scheduledDate: "19.10.2026 – 15.11.2026",
        title: "The Invisible Planet and the Dance of the Stars",
        author: "Matei",
        authorRole: "Owner",
        module: "T1 · Circumbinary Perturbation Theory & Inverse Dynamics",
        difficultyClass: "hard",
        icon: "skull",
        difficultyText: "10/10",
        description: `<p>Two identical stars, each of mass \\(M\\), revolve on circular orbits around their common center of mass. The distance between the two stars is constant and equal to \\(2a\\). In the same orbital plane lies a body of negligible mass (a circumbinary planet) at distance \\(R\\) from the center of mass of the system, where \\(R \\gg a\\). The planet follows a nearly circular orbit. Neglect all other gravitational influences and relativistic effects. Throughout all calculations, retain terms up to order \\((a/R)^2\\) inclusive and neglect higher-order terms.</p>
<p><strong>Part A — Time-Averaged Gravitational Potential:</strong> Let \\(\\theta\\) be the instantaneous angle between the planet's radius vector and the line joining the two stars.<br>
1. Starting from the exact gravitational potential, expand it in powers of \\(a/R\\) and show that \\(\\Phi(R,\\theta) = \\Phi_0(R) + \\Phi_2(R,\\theta)\\).<br>
2. Compute the effective potential averaged over one orbital period of the binary stars, \\(\\langle\\Phi(R)\\rangle\\), and interpret the extra quadrupole term relative to a single central star of mass \\(2M\\).</p>
<p><strong>Part B — Circular Motion:</strong><br>
3. Using \\(\\langle\\Phi(R)\\rangle\\), determine the angular frequency \\(\\Omega\\) of a circular orbit of radius \\(R\\) in terms of \\(G, M, a, R\\).<br>
4. Compare \\(\\Omega\\) with the Keplerian frequency \\(n = \\sqrt{\\frac{2GM}{R^3}}\\) of a single central mass \\(2M\\), and explain physically which is larger.</p>
<p><strong>Part C — The Orbit Is Not Quite an Ellipse (Apsidal Precession):</strong> Apply a small radial perturbation \\(R(t) = R_0 + \\delta R(t)\\) with \\(|\\delta R| \\ll R_0\\).<br>
5. Show that \\(\\delta R(t)\\) is simple harmonic and find the radial epicyclic frequency \\(\\kappa\\).<br>
6. Because \\(\\kappa \\neq \\Omega\\), demonstrate that the periastron advance after one full revolution of the planet is \\(\\Delta\\varpi \\simeq \\frac{3\\pi}{2}\\frac{a^2}{R^2}\\) and specify the direction of precession.</p>
<p><strong>Part D — An Observable System:</strong> A binary system has \\(M = 1.2\\ M_\\odot\\) and \\(2a = 0.20\\text{ AU}\\), with a circumbinary planet at \\(R = 1.60\\text{ AU}\\).<br>
7. Calculate the planet's orbital period \\(P\\), keeping the binary quadrupole correction.<br>
8. Calculate the periastron advance per revolution in degrees.<br>
9. Estimate the time required for the major axis of the orbit to rotate by \\(360^\\circ\\).</p>
<p><strong>Part E — The Inverse Problem:</strong> An astronomer cannot resolve the two stars and observes only the planet, measuring \\(P\\), \\(R\\), and \\(\\Delta\\varpi\\) per revolution.<br>
10. Show that these three measurements uniquely determine both the total mass \\(2M\\) and the binary separation \\(2a\\).<br>
11. Explain why applying Kepler's Third Law naively while ignoring precession yields a systematically biased total mass.</p>`,
        solutionHtml: `<p><strong>Part A — Multipole Expansion &amp; Time-Averaged Potential:</strong></p>
<p><strong>1.</strong> The distances from the planet to the two stars at \\(\\pm\\vec{a}\\) are \\(r_\\pm = R\\sqrt{1 \\mp \\frac{2a}{R}\\cos\\theta + \\frac{a^2}{R^2}}\\). Using the Legendre expansion \\((1 - 2u x + u^2)^{-1/2} = 1 + u x + \\frac{1}{2}(3x^2 - 1)u^2 + \\mathcal{O}(u^3)\\), the odd dipole terms cancel and the instantaneous potential is:</p>
<p>$$ \\Phi(R,\\theta) = -\\frac{GM}{r_+} - \\frac{GM}{r_-} \\simeq \\underbrace{-\\frac{2GM}{R}}_{\\Phi_0(R)} \\underbrace{- \\frac{GM a^2}{R^3}(3\\cos^2\\theta - 1)}_{\\Phi_2(R,\\theta)} $$</p>
<p><strong>2.</strong> Averaging over a binary period using \\(\\langle\\cos^2\\theta\\rangle = \\frac{1}{2}\\) gives the effective axisymmetric potential:</p>
<p>$$ \\langle\\Phi(R)\\rangle = -\\frac{2GM}{R}\\left(1 + \\frac{a^2}{4R^2}\\right) $$</p>
<p>The extra term \\(-\\frac{G M a^2}{2R^3}\\) is the attractive gravitational quadrupole potential of the mass ring formed by the two orbiting stars.</p>
<p><strong>Part B — Circular Angular Frequency \\(\\Omega\\):</strong></p>
<p><strong>3.–4.</strong> From radial force balance \\(\\Omega^2 R = \\frac{d\\langle\\Phi\\rangle}{dR} = \\frac{2GM}{R^2}\\left(1 + \\frac{3a^2}{4R^2}\\right)\\), taking the square root to order \\((a/R)^2\\) yields:</p>
<p>$$ \\Omega = \\sqrt{\\frac{2GM}{R^3}}\\sqrt{1 + \\frac{3a^2}{4R^2}} \\simeq n\\left(1 + \\frac{3a^2}{8R^2}\\right) > n $$</p>
<p>Because the quadrupole term strengthens the inward gravitational pull at radius \\(R\\), \\(\\Omega > n\\).</p>
<p><strong>Part C — Epicyclic Frequency \\(\\kappa\\) &amp; Periastron Precession:</strong></p>
<p><strong>5.</strong> Using conservation of specific angular momentum \\(L = \\Omega R_0^2\\), the effective radial potential is \\(\\Phi_{\\text{eff}}(R) = \\langle\\Phi(R)\\rangle + \\frac{L^2}{2R^2}\\). Evaluating the second derivative at \\(R = R_0\\):</p>
<p>$$ \\kappa^2 = \\left.\\frac{d^2\\Phi_{\\text{eff}}}{dR^2}\\right|_{R_0} = \\left.\\frac{d^2\\langle\\Phi\\rangle}{dR^2}\\right|_{R_0} + \\frac{3\\Omega^2}{R_0^2} R_0^2 = \\frac{2GM}{R_0^3}\\left(1 - \\frac{3a^2}{4R_0^2}\\right) \\implies \\kappa \\simeq n\\left(1 - \\frac{3a^2}{8R_0^2}\\right) $$</p>
<p><strong>6.</strong> The angle swept between successive periastron passages (one radial period \\(2\\pi/\\kappa\\)) is \\(\\Delta\\phi = \\frac{2\\pi\\Omega}{\\kappa}\\). Thus the periastron advance per revolution is:</p>
<p>$$ \\Delta\\varpi = 2\\pi\\left(\\frac{\\Omega}{\\kappa} - 1\\right) \\simeq 2\\pi\\left(\\frac{1 + \\frac{3a^2}{8R^2}}{1 - \\frac{3a^2}{8R^2}} - 1\\right) \\simeq \\frac{3\\pi}{2}\\frac{a^2}{R^2} > 0 \\quad (\\text{prograde precession}) $$</p>
<p><strong>Part D — Numerical Evaluation (\\(M = 1.2\\ M_\\odot,\\ a = 0.10\\text{ AU},\\ R = 1.60\\text{ AU}\\)):</strong></p>
<p>With \\((a/R)^2 = (0.10/1.60)^2 = 1/256 \\approx 0.00390625\\) and unperturbed period \\(P_0 = \\sqrt{\\frac{R^3}{2.4}} = \\sqrt{\\frac{4.096}{2.4}} \\approx 1.30639\\text{ yr}\\):</p>
<ul>
    <li><strong>7. Orbital Period:</strong> \\(P = P_0\\left(1 - \\frac{3a^2}{8R^2}\\right) \\approx 1.30639(1 - 0.001465) \\approx 1.3045\\text{ yr} \\approx 476.5\\text{ days}\\).</li>
    <li><strong>8. Periastron Advance per Revolution:</strong> \\(\\Delta\\varpi = \\frac{3\\pi}{2}\\left(\\frac{1}{256}\\right) \\approx 0.01841\\text{ rad} \\approx 1.055^\\circ\\text{/rev}\\).</li>
    <li><strong>9. Full \\(360^\\circ\\) Precession Period:</strong> \\(T_{\\text{prec}} = \\frac{360^\\circ}{1.055^\\circ} P \\approx 341.3 \\times 1.3045\\text{ yr} \\approx 445.2\\text{ years}\\).</li>
</ul>
<p><strong>Part E — The Inverse Problem:</strong></p>
<p><strong>10.–11.</strong> From \\(\\Delta\\varpi\\) and \\(R\\), the binary semi-separation is directly recovered as \\(a = R\\sqrt{\\frac{2\\Delta\\varpi}{3\\pi}}\\). Then substituting \\(\\frac{3a^2}{8R^2} = \\frac{\\Delta\\varpi}{4\\pi}\\) into \\(\\Omega = \\frac{2\\pi}{P}\\) yields the true total mass:</p>
<p>$$ M_{\\text{tot}} = 2M = \\frac{4\\pi^2 R^3}{G P^2}\\left(1 - \\frac{\\Delta\\varpi}{2\\pi}\\right) $$</p>
<p>Ignoring precession and using Kepler's Third Law naively (\\(M_{\\text{naive}} = \\frac{4\\pi^2 R^3}{G P^2}\\)) systematically <strong>overestimates</strong> the binary's total mass by the fraction \\(\\frac{3a^2}{4R^2} = \\frac{\\Delta\\varpi}{2\\pi}\\) because the quadrupole potential makes the planet orbit faster than it would around a point mass \\(2M\\).</p>`
    }
];