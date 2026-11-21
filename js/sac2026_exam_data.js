// js/sac2026_exam_data.js
// SAC 2026 — Grand Final (Phase 3 · The POTD War: 45 MCQs) & Verified Finalist Lookup
// Note: Answer keys are intentionally excluded from this client file and stored only in admin_proctor.html.

export const EXAM_META = {
    roundId: "SAC2026_PHASE3_FINAL",
    title: "SAC 2026 — Grand Final (The POTD War)",
    questionCount: 45,
    durationMinutes: 90,
    dateUTC: "2026-11-21",
    windowsUTC: [
        { label: "Grand Final · Window A (10:00–11:00 UT)", start: "2026-11-21T10:00:00Z", end: "2026-11-21T11:00:00Z" },
        { label: "Grand Final · Window B (18:00–19:00 UT)", start: "2026-11-21T18:00:00Z", end: "2026-11-21T19:00:00Z" }
    ]
};

export const EXAM_CONSTANTS = [
    "$G = 6.67\\times10^{-11}\\ \\mathrm{m^3\\,kg^{-1}\\,s^{-2}}$",
    "$GM_\\odot = 1.327\\times10^{20}\\ \\mathrm{m^3\\,s^{-2}}$",
    "$c = 3.00\\times10^8\\ \\mathrm{m/s}$",
    "$M_E = 5.97\\times10^{24}\\ \\mathrm{kg}$",
    "$R_E = 6.40\\times10^6\\ \\mathrm{m}$",
    "$M_\\odot = 1.99\\times10^{30}\\ \\mathrm{kg}$",
    "$R_\\odot = 6.96\\times10^8\\ \\mathrm{m}$",
    "$L_\\odot = 3.83\\times10^{26}\\ \\mathrm{W}$",
    "$1\\ \\mathrm{AU} = 1.496\\times10^{11}\\ \\mathrm{m}$",
    "$1\\ \\mathrm{pc} = 3.086\\times10^{16}\\ \\mathrm{m}$",
    "$1\\ \\mathrm{yr} = 3.156\\times10^7\\ \\mathrm{s}$",
    "$g_0 = 9.80\\ \\mathrm{m/s^2}$",
    "$v_{\\mathrm{esc},\\oplus} = 11.2\\ \\mathrm{km/s}$",
    "$\\sigma_T = 6.65\\times10^{-29}\\ \\mathrm{m^2}$",
    "$m_p = 1.67\\times10^{-27}\\ \\mathrm{kg}$",
    "$H_0 = 70\\ \\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$",
    "$1/H_0 = 13.97\\ \\mathrm{Gyr}$",
    "$c/H_0 = 4283\\ \\mathrm{Mpc}$",
    "$k_B = 1.380649\\times10^{-23}\\ \\mathrm{J/K}$",
    "$m_H = 1.67356\\times10^{-27}\\ \\mathrm{kg}$"
];

export const EXAM_QUESTIONS = [
    // =========================================================================
    // PART I — FUNDAMENTALS (Q1–Q10 · Easy)
    // =========================================================================
    {
        "id": "Q1",
        "part": "Part I · Fundamentals",
        "module": "T1 · Kepler's Laws",
        "points": "1.0 Point",
        "lore": "",
        "statement": "An asteroid orbits the Sun with a semi-major axis of 4 Astronomical Units (AU). Calculate its orbital period in Earth years.",
        "options": [
            "2 years",
            "4 years",
            "8 years",
            "16 years"
        ]
    },
    {
        "id": "Q2",
        "part": "Part I · Fundamentals",
        "module": "T1 · Kepler's Laws",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A comet has an orbital period around the Sun of 27 years. Calculate the semi-major axis of its orbit in AU.",
        "options": [
            "3 AU",
            "9 AU",
            "18 AU",
            "81 AU"
        ]
    },
    {
        "id": "Q3",
        "part": "Part I · Fundamentals",
        "module": "T1 · Elliptical Orbits",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A dwarf planet has a semi-major axis of 40 AU and an orbital eccentricity of 0.2. Calculate its closest distance to the Sun (perihelion) in AU.",
        "options": [
            "8 AU",
            "32 AU",
            "40 AU",
            "48 AU"
        ]
    },
    {
        "id": "Q4",
        "part": "Part I · Fundamentals",
        "module": "T1 · Elliptical Orbits",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Using the same dwarf planet from the previous problem ($a = 40\\ \\mathrm{AU}$, $e = 0.2$), calculate its furthest distance from the Sun (aphelion) in AU.",
        "options": [
            "32 AU",
            "40 AU",
            "48 AU",
            "80 AU"
        ]
    },
    {
        "id": "Q5",
        "part": "Part I · Fundamentals",
        "module": "T1 · Escape Velocity",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Planet X has 4 times the mass of Earth, but the exact same radius. By what factor is the escape velocity of Planet X greater than Earth's escape velocity?",
        "options": [
            "0.5",
            "2",
            "4",
            "16"
        ]
    },
    {
        "id": "Q6",
        "part": "Part I · Fundamentals",
        "module": "T1 · Gravitation",
        "points": "1.0 Point",
        "lore": "",
        "statement": "The distance between two asteroids floating in deep space is doubled. By what factor does the gravitational force between them change?",
        "options": [
            "$1/4$",
            "$1/2$",
            "$2$",
            "$4$"
        ]
    },
    {
        "id": "Q7",
        "part": "Part I · Fundamentals",
        "module": "T1 · Positional Astronomy",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A star has a right ascension of $5\\,\\mathrm{h}\\,30\\,\\mathrm{min}$. At a certain moment, the local sidereal time is $8\\,\\mathrm{h}\\,00\\,\\mathrm{min}$. Calculate the hour angle of the star.",
        "options": [
            "$-2\\,\\mathrm{h}\\,30\\,\\mathrm{min}$",
            "$+1\\,\\mathrm{h}\\,30\\,\\mathrm{min}$",
            "$+2\\,\\mathrm{h}\\,30\\,\\mathrm{min}$",
            "$+13\\,\\mathrm{h}\\,30\\,\\mathrm{min}$"
        ]
    },
    {
        "id": "Q8",
        "part": "Part I · Fundamentals",
        "module": "T1 · Positional Astronomy",
        "points": "1.0 Point",
        "lore": "",
        "statement": "An observer is located at geographic latitude $\\phi = +40^\\circ$ (North). A star has declination $\\delta = +10^\\circ$ and is crossing the local meridian. Calculate the altitude of the star above the southern horizon at that moment.",
        "options": [
            "$30^\\circ$",
            "$40^\\circ$",
            "$50^\\circ$",
            "$60^\\circ$"
        ]
    },
    {
        "id": "Q9",
        "part": "Part I · Fundamentals",
        "module": "T4 · Distance Modulus",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A star has an apparent magnitude of $m = 10$ and an absolute magnitude of $M = 5$. Calculate its distance from Earth in parsecs, neglecting interstellar extinction.",
        "options": [
            "10 pc",
            "50 pc",
            "100 pc",
            "1,000 pc"
        ]
    },
    {
        "id": "Q10",
        "part": "Part I · Fundamentals",
        "module": "T3 · Telescopes & Optics",
        "points": "1.0 Point",
        "lore": "",
        "statement": "An amateur astronomer is using a telescope with an objective focal length of 1200 mm and an eyepiece with a focal length of 10 mm. Calculate the magnification of the telescope.",
        "options": [
            "$12\\times$",
            "$120\\times$",
            "$1{,}210\\times$",
            "$12{,}000\\times$"
        ]
    },

    // =========================================================================
    // PART II — INTERMEDIATE (Q11–Q30 · Medium)
    // =========================================================================
    {
        "id": "Q11",
        "part": "Part II · Intermediate",
        "module": "T1 · Kepler's Laws",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A comet is observed orbiting the Sun. Its closest approach (perihelion) is 0.5 AU, and its furthest distance (aphelion) is 17.5 AU. Calculate the orbital period of this comet in years.",
        "options": [
            "4.3 years",
            "18.0 years",
            "27.0 years",
            "76.4 years"
        ]
    },
    {
        "id": "Q12",
        "part": "Part II · Intermediate",
        "module": "T1 · Escape Velocity",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A newly discovered rocky exoplanet has the exact same average uniform density as Earth, but its radius is twice as large as Earth's. Assuming Earth's escape velocity is 11.2 km/s, calculate the escape velocity of this exoplanet.",
        "options": [
            "7.9 km/s",
            "15.8 km/s",
            "22.4 km/s",
            "44.8 km/s"
        ]
    },
    {
        "id": "Q13",
        "part": "Part II · Intermediate",
        "module": "T1 · Hohmann Transfer",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A satellite in a circular low-Earth orbit with a radius of 7,000 km transfers to a higher circular orbit with a radius of 35,000 km via an elliptical Hohmann transfer orbit. Calculate the semi-major axis and the eccentricity of this transfer orbit.",
        "options": [
            "$a = 21{,}000\\ \\mathrm{km},\\ e = 0.200$",
            "$a = 21{,}000\\ \\mathrm{km},\\ e = 0.667$",
            "$a = 28{,}000\\ \\mathrm{km},\\ e = 0.667$",
            "$a = 42{,}000\\ \\mathrm{km},\\ e = 0.800$"
        ]
    },
    {
        "id": "Q14",
        "part": "Part II · Intermediate",
        "module": "T4 · Binary Stars",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Two stars in a circular binary system orbit their common centre of mass with a period of 5 years. The distance between the two stars is a constant 10 AU. If Star A is 3 times more massive than Star B, calculate their individual masses in solar masses ($M_\\odot$).",
        "options": [
            "$M_A = 3M_\\odot,\\ M_B = 1M_\\odot$",
            "$M_A = 10M_\\odot,\\ M_B = 30M_\\odot$",
            "$M_A = 30M_\\odot,\\ M_B = 10M_\\odot$",
            "$M_A = 75M_\\odot,\\ M_B = 25M_\\odot$"
        ]
    },
    {
        "id": "Q15",
        "part": "Part II · Intermediate",
        "module": "T1 · Kepler's Third Law",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A moon orbits a gas giant exoplanet with a period of 10 days at an orbital radius of 1,000,000 km. Our Moon orbits Earth at an average distance of 400,000 km with a period of 27 days. Calculate the approximate mass of the gas giant in Earth masses.",
        "options": [
            "2.1 Earth masses",
            "6.8 Earth masses",
            "42.2 Earth masses",
            "114 Earth masses"
        ]
    },
    {
        "id": "Q16",
        "part": "Part II · Intermediate",
        "module": "T1 · Tidal Forces & Roche Limit",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A fluid-like icy moon with a density of $1{,}000\\,\\mathrm{kg/m^3}$ is spiraling toward a gas giant with a density of $5{,}000\\,\\mathrm{kg/m^3}$ and a radius of 10,000 km. Calculate the Roche limit at which the moon will be torn apart.",
        "options": [
            "14,270 km",
            "41,720 km",
            "54,560 km",
            "122,000 km"
        ]
    },
    {
        "id": "Q17",
        "part": "Part II · Intermediate",
        "module": "T1 · Energy Conservation",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A 100 kg meteoroid starts essentially at rest at a distance of $3R_E$ from the centre of Earth and falls inward under gravity. Neglecting air resistance, calculate its velocity just before hitting Earth's surface ($1R_E$).",
        "options": [
            "7.92 km/s",
            "9.14 km/s",
            "11.20 km/s",
            "15.84 km/s"
        ]
    },
    {
        "id": "Q18",
        "part": "Part II · Intermediate",
        "module": "T1 · Synodic Period",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Mars has a sidereal orbital period around the Sun of 687 days, while Earth has a sidereal period of 365 days. Calculate the synodic period between consecutive oppositions of Mars as seen from Earth.",
        "options": [
            "238 days",
            "322 days",
            "526 days",
            "779 days"
        ]
    },
    {
        "id": "Q19",
        "part": "Part II · Intermediate",
        "module": "T1 · Angular Momentum Conservation",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A spacecraft is in an elliptical orbit around Earth. At perigee (7,000 km from Earth's centre), its orbital velocity is 9.24 km/s. Calculate its velocity when it reaches apogee at 21,000 km from Earth's centre.",
        "options": [
            "1.03 km/s",
            "3.08 km/s",
            "5.33 km/s",
            "27.7 km/s"
        ]
    },
    {
        "id": "Q20",
        "part": "Part II · Intermediate",
        "module": "T1 · Vis-Viva Equation",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A probe orbits the Sun along an elliptical path with a semi-major axis of $a = 2.5\\ \\mathrm{AU}$. Given that Earth's circular orbital speed at 1 AU is $v_\\oplus \\approx 30\\ \\mathrm{km/s}$, calculate the probe's orbital speed when it passes through a heliocentric distance of $r = 1.0\\ \\mathrm{AU}$.",
        "options": [
            "19.0 km/s",
            "30.0 km/s",
            "37.9 km/s",
            "42.4 km/s"
        ]
    },
    {
        "id": "Q21",
        "part": "Part II · Intermediate",
        "module": "T1 · Two-Body Barycentre",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A star of mass $M_1 = 2.0M_\\odot$ and an exoplanet of mass $M_2 = 0.005M_\\odot$ orbit their common barycentre in circular paths separated by a constant distance of $d = 4.01\\ \\mathrm{AU}$. Calculate the distance from the centre of the star to the system's barycentre.",
        "options": [
            "0.005 AU",
            "0.010 AU",
            "0.020 AU",
            "2.005 AU"
        ]
    },
    {
        "id": "Q22",
        "part": "Part II · Intermediate",
        "module": "T1 · Orbital Mechanics",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A spherical planet has a surface gravitational acceleration of $g_p = 4.9\\,\\mathrm{m/s^2}$ (half of Earth's) and a radius twice that of Earth ($R_p = 2R_E$). A small satellite orbits just above the planet's surface ($r \\approx R_p$). Given that a low-Earth satellite at $r \\approx R_E$ has an orbital period of 84 minutes, calculate the orbital period of this satellite.",
        "options": [
            "84 min",
            "119 min",
            "168 min",
            "238 min"
        ]
    },
    {
        "id": "Q23",
        "part": "Part II · Intermediate",
        "module": "T1 · Positional Astronomy",
        "points": "1.0 Point",
        "lore": "",
        "statement": "An observer is located at the equator ($\\phi = 0^\\circ$). A star has equatorial coordinates $\\alpha = 14\\,\\mathrm{h}\\,00\\,\\mathrm{min}$ and $\\delta = +10^\\circ$. If the local sidereal time is $08\\,\\mathrm{h}\\,00\\,\\mathrm{min}$, calculate the time remaining until the star crosses the local meridian and its altitude above the northern horizon at transit.",
        "options": [
            "6 hours, $h = 10^\\circ$",
            "6 hours, $h = 80^\\circ$",
            "18 hours, $h = 10^\\circ$",
            "18 hours, $h = 80^\\circ$"
        ]
    },
    {
        "id": "Q24",
        "part": "Part II · Intermediate",
        "module": "T1 · Circumpolar Stars",
        "points": "1.0 Point",
        "lore": "",
        "statement": "An observer sets up a telescope at geographic latitude $\\phi = +55^\\circ$ (North). Calculate the minimum declination a star must have to be circumpolar, and its altitude when it reaches lower culmination if it lies exactly on this boundary.",
        "options": [
            "$\\delta = +35^\\circ,\\ h = 0^\\circ$",
            "$\\delta = +35^\\circ,\\ h = 20^\\circ$",
            "$\\delta = +55^\\circ,\\ h = 0^\\circ$",
            "$\\delta = +55^\\circ,\\ h = 20^\\circ$"
        ]
    },
    {
        "id": "Q25",
        "part": "Part II · Intermediate",
        "module": "T1 · Precession of the Equinoxes",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Earth's axial precession causes the vernal equinox to shift along the ecliptic by approximately 50.3 arcseconds per year. Calculate the time required for the coordinates of stars along the ecliptic to shift by 1 hour of right ascension ($15^\\circ$).",
        "options": [
            "17.9 years",
            "71.6 years",
            "1,074 years",
            "25,765 years"
        ]
    },
    {
        "id": "Q26",
        "part": "Part II · Intermediate",
        "module": "T1 · Culmination Geometry",
        "points": "1.0 Point",
        "lore": "",
        "statement": "From a northern observatory at latitude $\\phi = +48^\\circ$, a circumpolar star reaches an altitude of $72^\\circ$ above the northern horizon at upper culmination. Calculate the star's declination $\\delta$ and its altitude at lower culmination.",
        "options": [
            "$\\delta = +66^\\circ,\\ h = 24^\\circ$",
            "$\\delta = +66^\\circ,\\ h = 30^\\circ$",
            "$\\delta = +72^\\circ,\\ h = 24^\\circ$",
            "$\\delta = +72^\\circ,\\ h = 30^\\circ$"
        ]
    },
    {
        "id": "Q27",
        "part": "Part II · Intermediate",
        "module": "T2 · Photometry & Flux Ratio",
        "points": "1.0 Point",
        "lore": "",
        "statement": "Star A and Star B have the exact same absolute magnitude ($M = +2.0$). Star A is located 10 pc away and has an apparent magnitude of $+2.0$, whereas Star B has an apparent magnitude of $+7.0$. Calculate the distance to Star B and the flux ratio $F_A/F_B$.",
        "options": [
            "$d_B = 50\\ \\mathrm{pc},\\ F_A/F_B = 25$",
            "$d_B = 100\\ \\mathrm{pc},\\ F_A/F_B = 10$",
            "$d_B = 100\\ \\mathrm{pc},\\ F_A/F_B = 100$",
            "$d_B = 1{,}000\\ \\mathrm{pc},\\ F_A/F_B = 100$"
        ]
    },
    {
        "id": "Q28",
        "part": "Part II · Intermediate",
        "module": "T3 · Diffraction & Radio Telescopes",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A space telescope observes at a wavelength of 500 nm ($5\\times10^{-7}\\ \\mathrm{m}$) using a primary mirror of diameter 2.4 m. A radio telescope on Earth observes at a wavelength of 21 cm (0.21 m). Calculate the required diameter of the radio telescope in kilometres to achieve the exact same angular resolution as the optical telescope.",
        "options": [
            "1.01 km",
            "175 km",
            "1,008 km",
            "100,800 km"
        ]
    },
    {
        "id": "Q29",
        "part": "Part II · Intermediate",
        "module": "T3 · CCD Signal-to-Noise",
        "points": "1.0 Point",
        "lore": "",
        "statement": "During an observation of a galaxy, a detector records 10,000 source photons and 100 sky-background photons in a given aperture. Assuming zero read noise and dark current, calculate the signal-to-noise ratio $\\left(\\mathrm{SNR} = \\frac{\\mathrm{Signal}}{\\sqrt{\\mathrm{Signal} + \\mathrm{Background}}}\\right)$ and the exposure-time multiplier needed to double this SNR.",
        "options": [
            "$\\mathrm{SNR} \\approx 99.5$, $2\\times$ longer",
            "$\\mathrm{SNR} \\approx 99.5$, $4\\times$ longer",
            "$\\mathrm{SNR} = 100$, $2\\times$ longer",
            "$\\mathrm{SNR} = 1{,}000$, $4\\times$ longer"
        ]
    },
    {
        "id": "Q30",
        "part": "Part II · Intermediate",
        "module": "T6 · Interstellar Extinction",
        "points": "1.0 Point",
        "lore": "",
        "statement": "A star has an absolute magnitude of $M = +1.0$ and an apparent magnitude of $m = +12.0$. Interstellar dust along the line of sight produces $A_V = 1.0\\ \\mathrm{mag}$ of visual extinction. Calculate the true distance $d$ to the star and the factor by which its distance would have been overestimated if extinction had been ignored.",
        "options": [
            "$d = 1{,}000\\ \\mathrm{pc}$, overestimated by $1.58\\times$",
            "$d = 1{,}000\\ \\mathrm{pc}$, overestimated by $2.51\\times$",
            "$d = 1{,}585\\ \\mathrm{pc}$, overestimated by $1.58\\times$",
            "$d = 1{,}585\\ \\mathrm{pc}$, overestimated by $2.51\\times$"
        ]
    },

    // =========================================================================
    // PART III — THE POTD WAR: THE FINAL ROUND (Q31–Q45 · Hard)
    // =========================================================================
    {
        "id": "Q31",
        "part": "Part III · Act I: Round Two",
        "module": "T11 · Relativistic Jets",
        "points": "1.0 Point",
        "lore": "<strong>Prologue — The Gods Grow Bored:</strong> Far above the wreckage of the POTD War, Mihai, Albert and Matei, the three primordial gods of Theory, Time and Creation, watched the last sparks fade. Alex had defeated the Shadow Observer, and the silence that followed was intolerably dull. <em>\"A war without a worthy enemy is just a lecture,\"</em> sighed Albert. Matei reached into the empty pocket universe and pulled the Shadow Observer back into existence. Mihai rewrote the laws that had bound him. This time, the enemy returned colder, stronger, and armed with phenomena that made entire star systems tremble.<br><br><strong>Act I — Round Two:</strong> Alex and Robert met the reborn Shadow Observer head-on. Their first task was to understand the physics of the weapons bearing down on them.<br><em>A plasma knot races down one of the Shadow Observer's jets. Alex measures an apparent transverse speed of $\\beta_{\\mathrm{app}} = 7.00$, while spectroscopy and variability give a Doppler factor $\\delta = 2.50$. Robert warns that neither quantity is the plasma's true speed.</em>",
        "statement": "<strong>The Relativistic Lance.</strong><br>For a jet moving at speed $\\beta c$ at angle $\\theta$ to the line of sight,$$\\beta_{\\mathrm{app}} = \\frac{\\beta\\sin\\theta}{1 - \\beta\\cos\\theta}, \\qquad \\delta = \\frac{1}{\\Gamma(1 - \\beta\\cos\\theta)}, \\qquad \\Gamma = (1 - \\beta^2)^{-1/2}.$$<strong>What are the bulk Lorentz factor and viewing angle?</strong>",
        "options": [
            "$\\Gamma = 8.75,\\quad \\theta = 19.3^\\circ$",
            "$\\Gamma = 11.25,\\quad \\theta = 14.47^\\circ$",
            "$\\Gamma = 11.25,\\quad \\theta = 75.53^\\circ$",
            "$\\Gamma = 15.75,\\quad \\theta = 7.20^\\circ$"
        ]
    },
    {
        "id": "Q32",
        "part": "Part III · Act I: Round Two",
        "module": "T1 · Orbital Maneuvers & Plane Change",
        "points": "1.0 Point",
        "lore": "<strong>Act I — Round Two:</strong> <em>The fleet opens fire while Alex and Robert's starcruiser is on a circular orbit of radius $r_0$ and speed $v_0$. Their safe harbour is a circular orbit of radius $4r_0$, inclined by $60^\\circ$ to the original orbit. They will use a two-impulse Hohmann transfer, but Robert can distribute the plane change between the two burns.</em>",
        "statement": "<strong>The Orbital Dodge.</strong><br>Let $\\alpha$ be the plane change at the transfer periapsis; the remaining $60^\\circ - \\alpha$ is made at apoapsis. The transfer speeds are$$v_{t,p} = \\sqrt{\\frac{8}{5}}\\,v_0, \\qquad v_{t,a} = \\sqrt{\\frac{1}{10}}\\,v_0,$$while the initial and final circular speeds are $v_0$ and $v_0/2$. Thus$$\\begin{aligned}\\frac{\\Delta v_1^2}{v_0^2} &= 1 + \\frac{8}{5} - 2\\sqrt{\\frac{8}{5}}\\cos\\alpha,\\\\ \\frac{\\Delta v_2^2}{v_0^2} &= \\frac{1}{10} + \\frac{1}{4} - 2\\sqrt{\\frac{1}{40}}\\cos(60^\\circ - \\alpha).\\end{aligned}$$<strong>What is the minimum possible value of $(\\Delta v_1 + \\Delta v_2)/v_0$ for $0 \\le \\alpha \\le 60^\\circ$?</strong>",
        "options": [
            "$0.6924$",
            "$0.7032$",
            "$0.7420$",
            "$0.8660$"
        ]
    },
    {
        "id": "Q33",
        "part": "Part III · Act I: Round Two",
        "module": "T8 · Poynting–Robertson Drag",
        "points": "1.0 Point",
        "lore": "<strong>Act I — Round Two:</strong> <em>Xavier releases grains into eccentric orbits around a luminous star. Radiation drag slowly removes orbital energy and angular momentum; treating every orbit as circular would make Robert's prediction badly wrong.</em>",
        "statement": "<strong>The Dust Storm.</strong><br>Let $\\eta$ be the ratio of radiation pressure to gravity and define $A = \\eta GM/c$. In the orbit-averaged Poynting–Robertson approximation, the semimajor axis $a$ and eccentricity $e$ obey$$\\dot{a} = -\\frac{2A}{a}\\,\\frac{1 + \\tfrac{3}{2}e^2}{(1 - e^2)^{3/2}}, \\qquad \\dot{e} = -\\frac{5A}{2a^2}\\,\\frac{e}{\\sqrt{1 - e^2}}.$$A grain starts with $(a_0, e_0)$ where $e_0 = 0.60$. Let $t_{\\mathrm{ecc}}$ be the time for this eccentric orbit to spiral to $a \\to 0$, and let $t_{\\mathrm{circ}} = a_0^2/(4A)$ be the corresponding inspiral time for an initially circular orbit with the same $a_0$.<br><br><strong>What is $t_{\\mathrm{ecc}}/t_{\\mathrm{circ}}$?</strong>",
        "options": [
            "$0.0945$",
            "$0.2060$",
            "$0.4120$",
            "$0.5494$"
        ]
    },
    {
        "id": "Q34",
        "part": "Part III · Act I: Round Two",
        "module": "T1 · Kozai–Lidov Secular Dynamics",
        "points": "1.0 Point",
        "lore": "<strong>Act I — Round Two:</strong> <em>The Shadow Observer hides a weapon in a hierarchical triple. A distant companion torques the inner orbit over many revolutions, driving its eccentricity to extreme values even though the inner semimajor axis barely changes.</em>",
        "statement": "<strong>The Three-Body Snare.</strong><br>In the test-particle, double-averaged quadrupole approximation, the inner orbit has conserved $j_z = \\sqrt{1 - e^2}\\cos i = \\cos i_0$. Its secular Hamiltonian is$$\\Phi_{\\mathrm{quad}} = \\frac{\\Phi_0}{8}\\left[1 - 6e^2 - 3(1 - e^2)\\cos^2 i + 15e^2\\sin^2 i\\sin^2\\omega\\right].$$Initially the inner orbit is circular, has semimajor axis $a_1 = 0.50\\,\\mathrm{AU}$, and mutual inclination $i_0 = 75^\\circ$. On the high-eccentricity branch, the maximum eccentricity occurs at $\\omega = 90^\\circ$.<br><br><strong>Using conservation of $j_z$ and $\\Phi_{\\mathrm{quad}}$, what is the minimum pericentre distance $q_{\\min} = a_1(1 - e_{\\max})$?</strong>",
        "options": [
            "$0.0287\\,\\mathrm{AU}$",
            "$0.0575\\,\\mathrm{AU}$",
            "$0.125\\,\\mathrm{AU}$",
            "$0.471\\,\\mathrm{AU}$"
        ]
    },
    {
        "id": "Q35",
        "part": "Part III · Act II: The Mask Falls",
        "module": "T11 · Kerr Black Holes & Tidal Disruption",
        "points": "1.0 Point",
        "lore": "<strong>Act II — The Mask Falls:</strong> A crack ran across the Shadow Observer's mask. It fell away, revealing Xavier. The gods had given him a second life, and he had spent it learning to command black holes, dark haloes and the geometry of spacetime.<br><em>Xavier sends a Sun-like star toward a rapidly rotating black hole. Robert knows that a star swallowed before it is disrupted will leave no luminous debris.</em>",
        "statement": "<strong>The Kerr Tidal Limit.</strong><br>Use the Newtonian tidal radius$$r_t = R_\\star\\left(\\frac{M}{m_\\star}\\right)^{1/3}$$and the Kerr event-horizon radius$$r_+ = r_g\\left(1 + \\sqrt{1 - a_*^2}\\right), \\qquad r_g = \\frac{GM}{c^2}.$$For an equatorial black hole with dimensionless spin $a_* = 0.90$, estimate the largest black-hole mass for which a solar-type star ($m_\\star = M_\\odot$, $R_\\star = R_\\odot$) can be disrupted outside the event horizon. Use the simplified criterion $r_t = r_+$ and ignore capture outside the horizon and hydrodynamic corrections.",
        "options": [
            "$7.6\\times10^7\\,M_\\odot$",
            "$1.10\\times10^8\\,M_\\odot$",
            "$1.88\\times10^8\\,M_\\odot$",
            "$3.76\\times10^8\\,M_\\odot$"
        ]
    },
    {
        "id": "Q36",
        "part": "Part III · Act II: The Mask Falls",
        "module": "T10 · Dark Matter Haloes (NFW Profile)",
        "points": "1.0 Point",
        "lore": "<strong>Act II — The Mask Falls:</strong> <em>Xavier traps the ship in a dark-matter halo. Its density follows a Navarro–Frenk–White profile, so the escape speed depends on the potential of material both inside and outside the ship's current radius.</em>",
        "statement": "<strong>The Galactic Cage.</strong><br>The halo has $M_{200} = 10^{12}\\,M_\\odot$ and concentration $c_h = r_{200}/r_s = 10$, where the mean density inside $r_{200}$ is $200\\rho_{\\mathrm{crit}}$ and $\\rho_{\\mathrm{crit}} = 3H_0^2/(8\\pi G)$. Its density is$$\\rho(r) = \\frac{\\rho_s}{x(1 + x)^2}, \\qquad x = \\frac{r}{r_s},$$with the NFW profile continued to infinity. The ship is at $r = 8.0\\,\\mathrm{kpc}$. Take the potential to vanish at infinity and use $H_0 = 70\\,\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$.<br><br><strong>What is the escape speed?</strong>",
        "options": [
            "$385\\,\\mathrm{km\\,s^{-1}}$",
            "$487\\,\\mathrm{km\\,s^{-1}}$",
            "$531\\,\\mathrm{km\\,s^{-1}}$",
            "$620\\,\\mathrm{km\\,s^{-1}}$"
        ]
    },
    {
        "id": "Q37",
        "part": "Part III · Act II: The Mask Falls",
        "module": "T8 · Accretion Discs & Toomre Instability",
        "points": "1.0 Point",
        "lore": "<strong>Act II — The Mask Falls:</strong> <em>A cold disc surrounds Xavier's fortress. If its self-gravity overwhelms pressure and rotation, spiral perturbations grow and the disc fragments.</em>",
        "statement": "<strong>The Unstable Disc.</strong><br>At $r_0 = 10\\,\\mathrm{AU}$ around a $1\\,M_\\odot$ star, the disc has $T_0 = 100\\,\\mathrm{K}$ and surface density $\\Sigma_0 = 500\\,\\mathrm{g\\,cm^{-2}}$. Assume$$T(r) = T_0\\left(\\frac{r}{r_0}\\right)^{-1/2}, \\qquad \\Sigma(r) = \\Sigma_0\\left(\\frac{r}{r_0}\\right)^{-1},$$a mean molecular weight $\\mu = 2.34$, sound speed $c_s = \\sqrt{k_B T / (\\mu m_H)}$, and Keplerian epicyclic frequency $\\kappa = \\sqrt{GM_\\star / r^3}$. The Toomre parameter is $Q = c_s\\kappa / (\\pi G\\Sigma)$.<br><br><strong>At what radius does the disc first reach $Q = 1$ as one moves outward?</strong>",
        "options": [
            "$27.2\\,\\mathrm{AU}$",
            "$54.5\\,\\mathrm{AU}$",
            "$103\\,\\mathrm{AU}$",
            "$218\\,\\mathrm{AU}$"
        ]
    },
    {
        "id": "Q38",
        "part": "Part III · Act II: The Mask Falls",
        "module": "T11 · Schwarzschild Photon Capture Cone",
        "points": "1.0 Point",
        "lore": "<strong>Act II — The Mask Falls:</strong> <em>The crippled starcruiser is held static at $r = 4r_g$ outside Xavier's non-rotating black hole. Its beacon emits photons isotropically in the local static frame. Some initially inward-directed photons turn around and escape; others are captured.</em>",
        "statement": "<strong>The Last Light.</strong><br>The critical impact parameter for a Schwarzschild black hole is $b_c = 3\\sqrt{3}\\,r_g$. A photon emitted at angle $\\alpha$ from the outward radial direction has$$b = \\frac{r\\sin\\alpha}{\\sqrt{1 - 2r_g/r}}.$$Let $\\alpha_c$ be the boundary of the capture cone about the inward radial direction, so that $b(\\alpha_c) = b_c$.<br><br><strong>What fraction of all emitted photons escapes to infinity?</strong>",
        "options": [
            "$30.2\\%$",
            "$50.0\\%$",
            "$69.8\\%$",
            "$85.4\\%$"
        ]
    },
    {
        "id": "Q39",
        "part": "Part III · Act III: On the Brink",
        "module": "T11 · Relativistic Emission Lines",
        "points": "1.0 Point",
        "lore": "<strong>Act III — On the Brink:</strong> Xavier stopped testing the heroes and began to toy with them. Hull plates buckled, the ship's instruments failed, and every calculation bought Alex and Robert only a few more seconds.<br><em>A narrow emission line comes from gas orbiting in a circular ring around a Schwarzschild black hole. Alex measures the blue and red edges of the line and must infer the ring's radius and the observer's inclination.</em>",
        "statement": "<strong>The Iron Line.</strong><br>Ignore light bending. In this approximation, the frequency-shift factors from the approaching and receding sides of the ring are$$g_{\\mathrm{blue}} = \\frac{A}{1 - B}, \\qquad g_{\\mathrm{red}} = \\frac{A}{1 + B},$$where$$A = \\sqrt{1 - \\frac{3r_g}{r}}, \\qquad B = \\sin i\\sqrt{\\frac{r_g}{r - 2r_g}}.$$The observed edges are $g_{\\mathrm{blue}} = 1.20$ and $g_{\\mathrm{red}} = 0.50$.<br><br><strong>What are the emitting radius and inclination?</strong>",
        "options": [
            "$r = 4.50r_g,\\quad i = 35.0^\\circ$",
            "$r = 5.98r_g,\\quad i = 55.2^\\circ$",
            "$r = 6.00r_g,\\quad i = 60.0^\\circ$",
            "$r = 8.00r_g,\\quad i = 48.5^\\circ$"
        ]
    },
    {
        "id": "Q40",
        "part": "Part III · Act III: On the Brink",
        "module": "T11 · Kerr ISCO & Orbital Frequency",
        "points": "1.0 Point",
        "lore": "<strong>Act III — On the Brink:</strong> <em>Xavier's central black hole is spinning. The ship must cross the prograde innermost stable circular orbit, where stable circular motion ends.</em>",
        "statement": "<strong>The Rotating Abyss.</strong><br>For a Kerr black hole with dimensionless spin $a_* = 0.80$, the prograde ISCO radius in units of $r_g = GM/c^2$ is$$\\begin{aligned}Z_1 &= 1 + (1 - a_*^2)^{1/3}\\left[(1 + a_*)^{1/3} + (1 - a_*)^{1/3}\\right],\\\\ Z_2 &= \\sqrt{3a_*^2 + Z_1^2},\\\\ \\frac{r_{\\mathrm{ISCO}}}{r_g} &= 3 + Z_2 - \\sqrt{(3 - Z_1)(3 + Z_1 + 2Z_2)}.\\end{aligned}$$The orbital angular frequency measured at infinity is$$\\Omega = \\frac{c^3}{GM}\\left[\\left(\\frac{r_{\\mathrm{ISCO}}}{r_g}\\right)^{3/2} + a_*\\right]^{-1}.$$<strong>What is the orbital period in units of $GM/c^3$?</strong>",
        "options": [
            "$27.1\\,GM/c^3$",
            "$36.16\\,GM/c^3$",
            "$54.2\\,GM/c^3$",
            "$61.6\\,GM/c^3$"
        ]
    },
    {
        "id": "Q41",
        "part": "Part III · Act III: On the Brink",
        "module": "T11 · Schwarzschild Radial Geodesics",
        "points": "1.0 Point",
        "lore": "<strong>Act III — On the Brink:</strong> <em>Xavier releases a probe from rest at a radius of $10r_g$ above his Schwarzschild black hole. Robert warns that the probe's clock and the distant fortress clock will disagree dramatically: the probe reaches the horizon after a finite amount of its own time, even though a distant observer never sees the crossing occur.</em>",
        "statement": "<strong>The Horizon Fall.</strong><br>For a radial timelike geodesic released from rest at $r_0$, the conserved specific energy is$$\\mathcal{E} = \\sqrt{1 - \\frac{2r_g}{r_0}}, \\qquad \\left(\\frac{dr}{d\\tau}\\right)^2 = c^2\\left[\\mathcal{E}^2 - \\left(1 - \\frac{2r_g}{r}\\right)\\right] = 2GM\\left(\\frac{1}{r} - \\frac{1}{r_0}\\right),$$where $r_g = GM/c^2$ and $\\tau$ is the probe's proper time. Thus$$\\Delta\\tau = \\int_{2r_g}^{r_0} \\frac{dr}{\\sqrt{2GM\\left(\\frac{1}{r} - \\frac{1}{r_0}\\right)}}.$$Evaluate the integral analytically (no numerical quadrature) and determine $\\Delta\\tau$ in units of $GM/c^3$ for $r_0 = 10r_g$. You may use$$\\int \\sqrt{\\frac{x}{1 - x}}\\,dx = \\arcsin\\sqrt{x} - \\sqrt{x(1 - x)} + C.$$",
        "options": [
            "$22.4\\,GM/c^3$",
            "$33.7\\,GM/c^3$",
            "$44.8\\,GM/c^3$",
            "$50.0\\,GM/c^3$"
        ]
    },
    {
        "id": "Q42",
        "part": "Part III · Act IV: Kerem",
        "module": "T12 · Friedmann Cosmology & Age of the Universe",
        "points": "1.0 Point",
        "lore": "<strong>Act IV — Kerem:</strong> The final blow never landed. A distant star vanished, and Kerem appeared where it had been. <em>\"Sorry I am late,\"</em> Kerem said. <em>\"I took the scenic route.\"</em> Together, Alex, Robert and Kerem pursued Xavier into a pocket universe. Its expansion history was unfamiliar, and its earliest light carried the only map to the fortress.<br><em>The pocket universe is spatially flat and contains matter, radiation and a cosmological constant. Kerem needs its age to synchronize the ship's clocks.</em>",
        "statement": "<strong>The Pocket Universe.</strong><br>Take $H_0 = 70\\,\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$, $\\Omega_m = 0.300$, $\\Omega_r = 9.0\\times10^{-5}$ and $\\Omega_\\Lambda = 1 - \\Omega_m - \\Omega_r$. Its expansion rate is$$H(a) = H_0\\sqrt{\\Omega_r a^{-4} + \\Omega_m a^{-3} + \\Omega_\\Lambda}.$$<strong>What is the age of this universe?</strong>",
        "options": [
            "$12.4\\,\\mathrm{Gyr}$",
            "$13.46\\,\\mathrm{Gyr}$",
            "$14.0\\,\\mathrm{Gyr}$",
            "$14.9\\,\\mathrm{Gyr}$"
        ]
    },
    {
        "id": "Q43",
        "part": "Part III · Act IV: Kerem",
        "module": "T12 · Phantom Dark Energy & Big Rip",
        "points": "1.0 Point",
        "lore": "<strong>Act IV — Kerem:</strong> <em>Cornered, Xavier fills the flat pocket universe with matter and a phantom fluid of constant equation of state $w = -1.20$. Its density grows as the universe expands. Kerem must know when the tidal acceleration will tear apart an Earth-like orbit around a Sun-like star.</em>",
        "statement": "<strong>The Big Rip.</strong><br>Use $\\Omega_m = 0.30$, $\\Omega_{\\mathrm{ph}} = 0.70$, and $H_0 = 70\\,\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$. The expansion and acceleration are$$\\begin{aligned}H(a)^2 &= H_0^2\\left[\\Omega_m a^{-3} + \\Omega_{\\mathrm{ph}}a^{-3(1+w)}\\right],\\\\ \\frac{\\ddot{a}}{a} &= -\\frac{H_0^2}{2}\\left[\\Omega_m a^{-3} + (1 + 3w)\\Omega_{\\mathrm{ph}}a^{-3(1+w)}\\right].\\end{aligned}$$Define the orbit to become unbound when $\\ddot{a}/a = \\Omega_{\\mathrm{orb}}^2$, where $\\Omega_{\\mathrm{orb}} = 2\\pi/(1\\,\\mathrm{yr})$. The remaining time to the Big Rip from scale factor $a_u$ is$$\\Delta t = \\int_{a_u}^{\\infty} \\frac{da}{aH(a)}.$$<strong>How long before the Big Rip does the orbit become unbound?</strong>",
        "options": [
            "$142$ days",
            "$221$ days",
            "$0.91$ years",
            "$5.4$ years"
        ]
    },
    {
        "id": "Q44",
        "part": "Part III · Act IV: Kerem",
        "module": "T12 · Recombination & Sound Horizon",
        "points": "1.0 Point",
        "lore": "<strong>Act IV — Kerem:</strong> <em>Xavier hurls the pocket universe back toward recombination. Kerem follows the primordial sound waves: their comoving travel distance marks the scale of the largest acoustic structures that the early plasma could create.</em>",
        "statement": "<strong>The Primordial Fire.</strong><br>Neglect dark energy during this era. Take$$H(a) = H_0\\sqrt{\\Omega_r a^{-4} + \\Omega_m a^{-3}}, \\qquad c_s(a) = \\frac{c}{\\sqrt{3[1 + R(a)]}},$$where $R(a) = 3\\Omega_b a / (4\\Omega_\\gamma)$. Use $H_0 = 67.4\\,\\mathrm{km\\,s^{-1}\\,Mpc^{-1}}$, $\\Omega_m = 0.315$, $\\Omega_r = 9.2\\times10^{-5}$, $\\Omega_b = 0.049$, $\\Omega_\\gamma = 5.45\\times10^{-5}$, and $a_* = 1/1100$.<br><br><strong>What is the comoving sound horizon at $a_*$?</strong>$$r_s(a_*) = \\int_0^{a_*} \\frac{c_s(a)}{a^2 H(a)}\\,da.$$",
        "options": [
            "$112\\,\\mathrm{Mpc}$",
            "$135\\,\\mathrm{Mpc}$",
            "$143.6\\,\\mathrm{Mpc}$",
            "$168\\,\\mathrm{Mpc}$"
        ]
    },
    {
        "id": "Q45",
        "part": "Part III · Act IV: Kerem",
        "module": "T11 · Gravitational Waves & Eccentric Inspiral",
        "points": "1.0 Point",
        "lore": "<strong>Act IV — Kerem:</strong> <em>Kerem's last weapon is a compact binary whose gravitational-wave signal can resonate with Xavier's final shield. The binary is eccentric, so treating it as circular gives a disastrously late prediction.</em>",
        "statement": "<strong>The Final Chirp.</strong><br>Two neutron stars have masses $m_1 = m_2 = 1.4\\,M_\\odot$, initial semimajor axis $a_0 = 4.55\\times10^5\\,\\mathrm{m}$, and initial eccentricity $e_0 = 0.70$. Within the leading-order, orbit-averaged quadrupole-radiation model, define$$\\mathcal{B} = \\frac{64}{5}\\frac{G^3\\mu M^2}{c^5}, \\qquad M = m_1 + m_2, \\quad \\mu = \\frac{m_1 m_2}{M}.$$The coupled evolution equations are$$\\begin{aligned}\\dot{a} &= -\\frac{\\mathcal{B}}{a^3}\\frac{1 + \\tfrac{73}{24}e^2 + \\tfrac{37}{96}e^4}{(1 - e^2)^{7/2}},\\\\ \\dot{e} &= -\\frac{19\\mathcal{B}}{12a^4}\\frac{e\\left(1 + \\tfrac{121}{304}e^2\\right)}{(1 - e^2)^{5/2}}.\\end{aligned}$$Do not hold $e$ fixed: eliminate time between these equations, obtain the orbital invariant, and integrate the resulting evolution to the formal coalescence limit $a \\to 0$.<br><br><strong>What is the coalescence time from the stated initial orbit?</strong><br><br><em style=\"opacity:0.85;\"><strong>Epilogue:</strong> The final chirp passed through the pocket universe. Xavier's last defence shuddered and failed. His borrowed power spent, he fell to his knees. Alex, Robert and Kerem stood together as the universe settled around them. High above, Mihai, Albert and Matei watched in silence. Then, for the first time in the war, they applauded. \"Now that,\" said Matei, \"was not dull.\"</em>",
        "options": [
            "$14.9\\,\\mathrm{s}$",
            "$31.6\\,\\mathrm{s}$",
            "$79.0\\,\\mathrm{s}$",
            "$158\\,\\mathrm{s}$"
        ]
    }
];

// Strictly Authorized Grand Final Roster:
// 3 Organizers + 16 Qualified Finalist Entries (20 individual Bib IDs: 12 Solo + 4 Teams of 2)
export const EXAM_PARTICIPANTS = [
    // --- ORGANIZERS (TEST / PROCTOR ACCESS) ---
    {
        "bib": "SNG-2026-1046",
        "aliasBibs": ["SNG-ADMIN-01"],
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "matei.butnaru@yahoo.com",
        "aliasEmails": [
            "contact.supernovaguide@gmail.com",
            "contact@supernovaguide.com",
            "matei.butnaru@yahoo.ro",
            "mateibutnaru5@gmail.com"
        ],
        "sngUser": "Matei",
        "name": "Matei Butnaru",
        "country": "Romania",
        "school": "Supernova Guide Scientific Committee",
        "mode": "Solo (Test Participant & Lead Organizer)",
        "qualifiedFinal": true,
        "canStartAnytime": true
    },
    {
        "bib": "SNG-2026-1044",
        "aliasBibs": ["SNG-ADMIN-02"],
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "albert_voicu_olteanu@yahoo.com",
        "aliasEmails": [],
        "sngUser": "Albert",
        "name": "Albert Voicu Olteanu",
        "country": "Romania",
        "school": "Supernova Guide Scientific Committee",
        "mode": "Solo (Test Participant & Co-Founder)",
        "qualifiedFinal": true,
        "canStartAnytime": true
    },
    {
        "bib": "SNG-2026-1045",
        "aliasBibs": ["SNG-ADMIN-03"],
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "mihai.tesileanu2@gmail.com",
        "aliasEmails": [],
        "sngUser": "Mihai",
        "name": "Mihai Teșileanu",
        "country": "Romania",
        "school": "Supernova Guide Scientific Committee",
        "mode": "Solo (Test Participant & Co-Founder)",
        "qualifiedFinal": true,
        "canStartAnytime": true
    },

    // --- 16 QUALIFIED GRAND FINALIST ENTRIES (20 INDIVIDUAL BIBS) ---
    {
        "bib": "SNG-2026-1001",
        "teamId": "TEAM-PAIR3",
        "partnerBib": "SNG-2026-1019",
        "partnerName": "Bayar Enkhbold",
        "email": "alex.mihai.barbu11@gmail.com",
        "aliasEmails": [],
        "sngUser": "Regele",
        "name": "Barbu Mihai Alexandru",
        "country": "Romania",
        "school": "Colegiul National \"Ion C. Bratianu\"",
        "mode": "Team of 2 (Pair #3 · Eurasia)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1003",
        "teamId": "TEAM-PAIR1",
        "partnerBib": "SNG-2026-1031",
        "partnerName": "Dumitrescu Sebastian Gabriel",
        "email": "robyan2044@gmail.com",
        "aliasEmails": [],
        "sngUser": "Badea Robert",
        "name": "Badea Robert Yannis",
        "country": "Romania",
        "school": "Colegiul National \"Ion C. Bratianu\"",
        "mode": "Team of 2 (Astrobros · Pair #1)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1006",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "riteshkumarmohapatra11902@gmail.com",
        "aliasEmails": [],
        "sngUser": "Ritesh Kumar Mohapatra",
        "name": "Ritesh Kumar Mohapatra",
        "country": "India",
        "school": "DAV Public School",
        "mode": "Solo (Mock Qualifier · 34/40)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1008",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "mirunateodora0204@gmail.com",
        "aliasEmails": [],
        "sngUser": "81miruna",
        "name": "Păduraru Miruna-Teodora",
        "country": "Romania",
        "school": "Colegiul Național 'Emil Racoviţă', Iaşi",
        "mode": "Solo",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1010",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "paunescuadrian713@gmail.com",
        "aliasEmails": [],
        "sngUser": "Livansky",
        "name": "Păunescu Liviu-Nicolae",
        "country": "Romania",
        "school": "Colegiul Național Pedagogic ,, Ștefan Velovan”",
        "mode": "Solo",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1011",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "faeeboii@gmail.com",
        "aliasEmails": [],
        "sngUser": "Khalfani Xavier Kamil Susanto",
        "name": "Khalfani Xavier Kamil Susanto",
        "country": "Indonesia",
        "school": "SMAN 1 Tanjungpinang",
        "mode": "Solo",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1012",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "aminedjformsg@gmail.com",
        "aliasEmails": [],
        "sngUser": "Amine",
        "name": "Amine Djerrare",
        "country": "Algeria",
        "school": "Lycée M'Hamed Bougherra",
        "mode": "Solo (Amine)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1013",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "bertea.matei2010@gmail.com",
        "aliasEmails": [],
        "sngUser": "BMatei19",
        "name": "Bertea Matei",
        "country": "Romania",
        "school": "Colegiul National \"Ferdinand 1\" Bacau",
        "mode": "Solo (Patei)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1015",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "aryanver21@gmail.com",
        "aliasEmails": [],
        "sngUser": "aryanver21",
        "name": "Aryan Verma",
        "country": "USA",
        "school": "William Hopkins Middle School",
        "mode": "Solo",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1019",
        "teamId": "TEAM-PAIR3",
        "partnerBib": "SNG-2026-1001",
        "partnerName": "Barbu Mihai Alexandru",
        "email": "bayar.e100@gmail.com",
        "aliasEmails": [],
        "sngUser": "Bayar.E",
        "name": "Bayar Enkhbold",
        "country": "Mongolia",
        "school": "English School of Mongolia",
        "mode": "Team of 2 (ƛ𝛆μμ⍺ · Pair #3)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1023",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "dolanbaytuna1@gmail.com",
        "aliasEmails": [],
        "sngUser": "Tuna Dolanbay",
        "name": "Mehmet Tuna Dolanbay",
        "country": "Türkiye",
        "school": "TÜBİTAK Science High School",
        "mode": "Solo",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1025",
        "teamId": "TEAM-TEFLA",
        "partnerBib": "SNG-2026-1030",
        "partnerName": "Yusuf Kerem Kuru",
        "email": "keremkaragol1299@gmail.com",
        "aliasEmails": [],
        "sngUser": "Kerem K",
        "name": "Kerem Karagöl",
        "country": "Türkiye",
        "school": "TÜBİTAK Science High School",
        "mode": "Team of 2 (Tefla)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1029",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "lukegeltner@ufl.edu",
        "aliasEmails": [],
        "sngUser": "Luke Geltner",
        "name": "Luke Patrick Geltner",
        "country": "USA",
        "school": "University of Florida",
        "mode": "Solo (Geltner)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1030",
        "teamId": "TEAM-TEFLA",
        "partnerBib": "SNG-2026-1025",
        "partnerName": "Kerem Karagöl",
        "email": "yusufkeremkuru@gmail.com",
        "aliasEmails": [],
        "sngUser": "ysf55",
        "name": "Yusuf Kerem Kuru",
        "country": "Türkiye",
        "school": "TÜBİTAK Science High School",
        "mode": "Team of 2 (Tefla)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1031",
        "teamId": "TEAM-PAIR1",
        "partnerBib": "SNG-2026-1003",
        "partnerName": "Badea Robert Yannis",
        "email": "sebydumitrescu10@gmail.com",
        "aliasEmails": [],
        "sngUser": "Dumitrescu Sebastian",
        "name": "Dumitrescu Sebastian Gabriel",
        "country": "Romania",
        "school": "Colegiul National Ion C Bratianu",
        "mode": "Team of 2 (Astrobros · Pair #1)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1033",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "seanangelo0980@gmail.com",
        "aliasEmails": [],
        "sngUser": "D'angelo Sean Antoni",
        "name": "D'angelo Sean Antoni",
        "country": "Indonesia",
        "school": "SMA Negeri 1 Tanjungpinang",
        "mode": "Solo (Astronomical levels of larp)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1038",
        "teamId": "TEAM-ALTERNOSTEAUA",
        "partnerBib": "SNG-2026-1041",
        "partnerName": "Alexandrescu Emilia-Maria",
        "email": "venedictsasha@yahoo.com",
        "aliasEmails": [],
        "sngUser": "venedictsasha",
        "name": "Venedict Sasha-Cristian",
        "country": "Romania",
        "school": "Colegiul Național 'Mihai Eminescu'",
        "mode": "Team of 2 (Alternosteaua)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1039",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "david.asan58@gmail.com",
        "aliasEmails": [],
        "sngUser": "David Asanache",
        "name": "Asanache David",
        "country": "Romania",
        "school": "Andrei Saguna' National College",
        "mode": "Solo (Monoatomic Molecule)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1040",
        "teamId": null,
        "partnerBib": null,
        "partnerName": null,
        "email": "luca.tanasescu@gmail.com",
        "aliasEmails": [],
        "sngUser": "Luca T.",
        "name": "Luca-Ioan Tănăsescu",
        "country": "Romania",
        "school": "UNSTPB Politehnica Bucuresti",
        "mode": "Solo (Micunealta)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    },
    {
        "bib": "SNG-2026-1041",
        "teamId": "TEAM-ALTERNOSTEAUA",
        "partnerBib": "SNG-2026-1038",
        "partnerName": "Venedict Sasha-Cristian",
        "email": "tui914021@gmail.com",
        "aliasEmails": [],
        "sngUser": "Tuftgty5",
        "name": "Alexandrescu Emilia-Maria",
        "country": "Romania",
        "school": "Liceul teoretic \"Grigore Antipa\"",
        "mode": "Team of 2 (Alternosteaua)",
        "qualifiedFinal": true,
        "canStartAnytime": false
    }
];