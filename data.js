/* ============================================================
   YCL MOCK TEST PLATFORM — DATA LAYER
   Everything here is static, client-side data. Replace / extend
   the QUESTION_BANK and HISTORICAL_SCORES to fit your own batch.
   ============================================================ */

/* Shared demo access credentials — gate the platform for a demo/pilot
   session. In a real rollout you'd generate one ID+password per student
   instead of a single shared pair. */
const DEMO_CREDENTIALS = {
  studentId: "YCLR6",
  password: "mock@012027"
};

const EXAM_CONFIG = {
  examName: "NEET (UG) — Full Syllabus Test 03",
  instituteName: "Your Chemistry Lab (YCL)",
  durationMinutes: 45,           // demo length; set to 200 for a real full NEET-length test
  marksCorrect: 4,
  marksIncorrect: -1,
  marksUnattempted: 0,
  maxViolations: 3,              // flagged events before auto-submit
  candidatePoolSize: 2400000,    // used only to project an estimated AIR (NEET AIQ scale)
  subjects: ["Physics", "Chemistry", "Biology"]
};

/* Each question: id, subject, topic (used for weak-topic tagging),
   text, 4 options, correctIndex, and a short explanation. */
const QUESTION_BANK = [
  // ---------------- PHYSICS (20) ----------------
  {
    id: "P1", subject: "Physics", topic: "Units & Measurements",
    text: "The dimensional formula for angular momentum is:",
    options: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]"],
    correctIndex: 0,
    explanation: "Angular momentum L = mvr, so [M][LT⁻¹][L] = [ML²T⁻¹]."
  },
  {
    id: "P2", subject: "Physics", topic: "Kinematics",
    text: "A body is thrown vertically upward with velocity u. The time taken to return to the point of projection is:",
    options: ["u/g", "2u/g", "u/2g", "u²/g"],
    correctIndex: 1,
    explanation: "Time of ascent = u/g; total time of flight (ascent + descent) = 2u/g."
  },
  {
    id: "P3", subject: "Physics", topic: "Laws of Motion",
    text: "A block of mass 2 kg rests on a frictionless surface. A horizontal force of 6 N is applied. Its acceleration is:",
    options: ["2 m/s²", "3 m/s²", "6 m/s²", "12 m/s²"],
    correctIndex: 1,
    explanation: "a = F/m = 6/2 = 3 m/s²."
  },
  {
    id: "P4", subject: "Physics", topic: "Current Electricity",
    text: "Three resistors of 2 Ω each are connected in parallel. The equivalent resistance is:",
    options: ["6 Ω", "2/3 Ω", "3/2 Ω", "1 Ω"],
    correctIndex: 1,
    explanation: "1/R = 1/2+1/2+1/2 = 3/2, so R = 2/3 Ω."
  },
  {
    id: "P5", subject: "Physics", topic: "Optics",
    text: "A convex lens forms a real, inverted, same-size image. The object must be placed at:",
    options: ["Focus", "2F", "Between F and 2F", "Beyond 2F"],
    correctIndex: 1,
    explanation: "At u = 2F, a convex lens gives a real, inverted image of the same size at v = 2F."
  },
  {
    id: "P6", subject: "Physics", topic: "Gravitation",
    text: "The escape velocity of a body from Earth's surface (radius R, mass M) is given by:",
    options: ["√(2GM/R)", "√(GM/R)", "√(GM/2R)", "2√(GM/R)"],
    correctIndex: 0,
    explanation: "Equating kinetic energy to gravitational potential energy, (1/2)mv² = GMm/R, gives v = √(2GM/R)."
  },
  {
    id: "P7", subject: "Physics", topic: "Work, Energy & Power",
    text: "A body of mass 2 kg moving with a velocity of 3 m/s is acted upon by a force that increases its velocity to 5 m/s. The work done by the force is:",
    options: ["8 J", "16 J", "24 J", "32 J"],
    correctIndex: 1,
    explanation: "Work done = ΔKE = (1/2)(2)(5² − 3²) = (1)(25 − 9) = 16 J."
  },
  {
    id: "P8", subject: "Physics", topic: "Rotational Motion",
    text: "The moment of inertia of a uniform circular disc of mass M and radius R about an axis through its centre and perpendicular to its plane is:",
    options: ["MR²", "MR²/2", "MR²/4", "2MR²/5"],
    correctIndex: 1,
    explanation: "For a disc about a perpendicular axis through its centre, I = MR²/2."
  },
  {
    id: "P9", subject: "Physics", topic: "Oscillations (SHM)",
    text: "A simple pendulum of length L has a time period T on the surface of the Earth. If taken to a location where g becomes g/4, its new time period is:",
    options: ["T/2", "T", "2T", "4T"],
    correctIndex: 2,
    explanation: "T = 2π√(L/g); if g reduces to g/4, T increases by a factor of 2, giving 2T."
  },
  {
    id: "P10", subject: "Physics", topic: "Thermodynamics",
    text: "According to the first law of thermodynamics, if 100 J of heat is supplied to a gas and it does 30 J of work on the surroundings, the change in internal energy is:",
    options: ["70 J", "100 J", "130 J", "30 J"],
    correctIndex: 0,
    explanation: "ΔU = Q − W = 100 − 30 = 70 J."
  },
  {
    id: "P11", subject: "Physics", topic: "Wave Optics",
    text: "In a Young's double-slit experiment, the fringe width is found to be β. If the entire apparatus is immersed in water (refractive index 4/3), the new fringe width becomes:",
    options: ["β", "4β/3", "3β/4", "β²"],
    correctIndex: 2,
    explanation: "Fringe width β = λD/d, and wavelength decreases in a denser medium as λ/n, giving a new fringe width of 3β/4."
  },
  {
    id: "P12", subject: "Physics", topic: "Electrostatics",
    text: "Two point charges of +2 μC each are separated by 3 cm in air. The electrostatic force between them is approximately: (k = 9 × 10⁹ N m²/C²)",
    options: ["40 N", "400 N", "4000 N", "4 N"],
    correctIndex: 1,
    explanation: "F = kq₁q₂/r² = (9×10⁹ × 2×10⁻⁶ × 2×10⁻⁶)/(0.03)² ≈ 400 N."
  },
  {
    id: "P13", subject: "Physics", topic: "Magnetic Effects of Current",
    text: "A straight current-carrying conductor of length 0.5 m carries a current of 4 A and is placed perpendicular to a magnetic field of 0.2 T. The force on the conductor is:",
    options: ["0.1 N", "0.4 N", "0.8 N", "1.6 N"],
    correctIndex: 1,
    explanation: "F = BIL = 0.2 × 4 × 0.5 = 0.4 N."
  },
  {
    id: "P14", subject: "Physics", topic: "Electromagnetic Induction",
    text: "A coil of 100 turns experiences a change in magnetic flux from 2 mWb to 6 mWb in 0.2 s. The induced EMF is:",
    options: ["1 V", "2 V", "4 V", "20 V"],
    correctIndex: 1,
    explanation: "EMF = N(ΔΦ/Δt) = 100 × (4×10⁻³)/0.2 = 2 V."
  },
  {
    id: "P15", subject: "Physics", topic: "Modern Physics",
    text: "In a photoelectric experiment, the stopping potential for light of a certain frequency is found to be 1.5 V. The maximum kinetic energy of the emitted photoelectrons is:",
    options: ["1.5 eV", "1.5 J", "0.75 eV", "3.0 eV"],
    correctIndex: 0,
    explanation: "Maximum kinetic energy equals eV₀, so for a stopping potential of 1.5 V the maximum KE is 1.5 eV."
  },
  {
    id: "P16", subject: "Physics", topic: "Semiconductor Devices",
    text: "In a p-n junction diode under forward bias, the width of the depletion region:",
    options: ["Increases", "Decreases", "Remains unchanged", "Becomes infinite"],
    correctIndex: 1,
    explanation: "Forward bias opposes the built-in field, reducing the depletion region's width and lowering the barrier to charge flow."
  },
  {
    id: "P17", subject: "Physics", topic: "Fluid Mechanics",
    text: "According to Bernoulli's principle, as the speed of a flowing fluid increases in a horizontal pipe, its pressure:",
    options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
    correctIndex: 1,
    explanation: "Bernoulli's equation shows that for horizontal flow, pressure and speed are inversely related, so pressure decreases as speed increases."
  },
  {
    id: "P18", subject: "Physics", topic: "Thermal Properties of Matter",
    text: "50 g of water at 50°C is mixed with 50 g of water at 20°C. Assuming no heat loss, the final temperature of the mixture is:",
    options: ["25°C", "30°C", "35°C", "40°C"],
    correctIndex: 2,
    explanation: "Equal masses of the same liquid mix to give the average temperature: (50+20)/2 = 35°C."
  },
  {
    id: "P19", subject: "Physics", topic: "Waves",
    text: "A source of sound moving towards a stationary observer causes the observer to hear a frequency:",
    options: ["Lower than the source frequency", "Equal to the source frequency", "Higher than the source frequency", "Independent of relative motion"],
    correctIndex: 2,
    explanation: "By the Doppler effect, when a source approaches a stationary observer, the apparent frequency increases."
  },
  {
    id: "P20", subject: "Physics", topic: "Communication Systems",
    text: "In amplitude modulation, if the maximum amplitude of the modulated wave is 12 V and the minimum is 4 V, the modulation index is:",
    options: ["0.25", "0.33", "0.5", "0.67"],
    correctIndex: 2,
    explanation: "Modulation index m = (Amax − Amin)/(Amax + Amin) = (12 − 4)/(12 + 4) = 0.5."
  },

  // ---------------- CHEMISTRY (25 — 5 original + 20 from problem_set1.docx) ----------------
  {
    id: "C1", subject: "Chemistry", topic: "Mole Concept",
    text: "The number of moles in 22 g of CO₂ (molar mass 44 g/mol) is:",
    options: ["0.25", "0.5", "1", "2"],
    correctIndex: 1,
    explanation: "Moles = given mass / molar mass = 22/44 = 0.5."
  },
  {
    id: "C2", subject: "Chemistry", topic: "Atomic Structure",
    text: "The maximum number of electrons in the M-shell (n = 3) is:",
    options: ["8", "18", "32", "2"],
    correctIndex: 1,
    explanation: "Maximum electrons per shell = 2n² = 2(3)² = 18."
  },
  {
    id: "C3", subject: "Chemistry", topic: "Chemical Bonding",
    text: "Which of the following molecules has a linear geometry?",
    options: ["H₂O", "NH₃", "CO₂", "CH₄"],
    correctIndex: 2,
    explanation: "CO₂ has sp hybridisation on carbon giving a linear shape (O=C=O)."
  },
  {
    id: "C4", subject: "Chemistry", topic: "Thermodynamics",
    text: "For an exothermic reaction, ΔH is:",
    options: ["Positive", "Negative", "Zero", "Cannot be determined"],
    correctIndex: 1,
    explanation: "Exothermic reactions release heat to the surroundings, so ΔH < 0."
  },
  {
    id: "C5", subject: "Chemistry", topic: "Organic Chemistry Basics",
    text: "The IUPAC name of CH₃-CH₂-OH is:",
    options: ["Methanol", "Ethanol", "Ethanal", "Ethanoic acid"],
    correctIndex: 1,
    explanation: "A two-carbon chain with an -OH group is ethanol."
  },
  {
    id: "C6", subject: "Chemistry", topic: "Bohr Model",
    text: "The energy of an electron in the ground state (n = 1) of a He⁺ ion (Z = 2) is:",
    options: ["-13.6 eV", "-54.4 eV", "-3.4 eV", "-27.2 eV"],
    correctIndex: 1,
    explanation: "E_n = Z²E₁/n² = (2)²(−13.6)/(1)² = −54.4 eV."
  },
  {
    id: "C7", subject: "Chemistry", topic: "Bohr Model",
    text: "For a hydrogen-like species with an ionisation energy of 1.312 × 10⁶ J/mol, the energy required to excite the electron from n = 1 to n = 2 is approximately:",
    options: ["1.312 × 10⁶ J/mol", "0.984 × 10⁶ J/mol", "1.75 × 10⁶ J/mol", "0.328 × 10⁶ J/mol"],
    correctIndex: 1,
    explanation: "ΔE = Z²E₁(1/n_f² − 1/n_i²); with Z²E₁ = −1.312×10⁶ J/mol, ΔE = (−1.312×10⁶)(1/4 − 1) = 0.984×10⁶ J/mol."
  },
  {
    id: "C8", subject: "Chemistry", topic: "Bohr Model",
    text: "The energy required to excite an electron in a hydrogen atom from the ground state to the first excited state is:",
    options: ["3.4 eV", "10.2 eV", "13.6 eV", "1.51 eV"],
    correctIndex: 1,
    explanation: "ΔE = −13.6(1/2² − 1/1²) eV = −13.6 × (−3/4) = 10.2 eV."
  },
  {
    id: "C9", subject: "Chemistry", topic: "Atomic Spectra",
    text: "Using Rydberg's formula, the wavelength of the series limit (n = 1 to n = ∞) of the Lyman series for a hydrogen atom is approximately:",
    options: ["91.16 nm", "121.5 nm", "364.6 nm", "656 nm"],
    correctIndex: 0,
    explanation: "1/λ = R_H(1/1² − 1/∞²) = 1.097×10⁷ m⁻¹, giving λ ≈ 91.16 nm."
  },
  {
    id: "C10", subject: "Chemistry", topic: "Bohr Model",
    text: "The energy of an electron in the second excited state (n = 3) of a hydrogen atom is:",
    options: ["-13.6 eV", "-3.4 eV", "-1.51 eV", "-0.85 eV"],
    correctIndex: 2,
    explanation: "E_n = −13.6/n² eV; for n = 3, E₃ = −13.6/9 ≈ −1.51 eV."
  },
  {
    id: "C11", subject: "Chemistry", topic: "Quantum Numbers",
    text: "Which of the following statements about the electron spin quantum number (s) is correct?",
    options: [
      "It determines the shape of the orbital",
      "It determines the orientation of the electron cloud in space",
      "It represents the intrinsic angular momentum of the electron and does not fix orbital orientation",
      "It can take values from 0 to n − 1"
    ],
    correctIndex: 2,
    explanation: "The spin quantum number describes the electron's intrinsic angular momentum (spin up or down); it does not determine the shape or spatial orientation of the orbital, which are governed by l and mₗ."
  },
  {
    id: "C12", subject: "Chemistry", topic: "Dual Nature of Matter",
    text: "The de Broglie wavelength of a 0.5 kg object moving with a velocity of 100 m/s is:",
    options: ["1.324 × 10⁻³⁵ m", "1.324 × 10⁻²⁵ m", "6.626 × 10⁻³⁴ m", "3.31 × 10⁻³⁶ m"],
    correctIndex: 0,
    explanation: "λ = h/mv = 6.626×10⁻³⁴/(0.5×100) = 1.324×10⁻³⁵ m."
  },
  {
    id: "C13", subject: "Chemistry", topic: "Photoelectric Effect",
    text: "For a certain metal, the kinetic energy of photoelectrons ejected by light of frequency ν₁ = 3.2 × 10¹⁶ Hz is twice that ejected by light of frequency ν₂ = 2.0 × 10¹⁶ Hz. The threshold frequency of the metal is:",
    options: ["4 × 10¹⁵ Hz", "8 × 10¹⁵ Hz", "1.2 × 10¹⁶ Hz", "1.6 × 10¹⁶ Hz"],
    correctIndex: 1,
    explanation: "Since KE = hν − hν₀ and hν₁ − hν₀ = 2(hν₂ − hν₀), solving gives ν₀ = 2ν₂ − ν₁ = 2(2×10¹⁶) − 3.2×10¹⁶ = 8×10¹⁵ Hz."
  },
  {
    id: "C14", subject: "Chemistry", topic: "Quantum Mechanical Model",
    text: "The number of radial (spherical) nodes present in an s-orbital with principal quantum number n is:",
    options: ["n", "n − 1", "n − l − 1", "l"],
    correctIndex: 1,
    explanation: "s-orbitals have zero angular nodes (l = 0), so all their nodes are radial; the number of radial nodes is n − 1."
  },
  {
    id: "C15", subject: "Chemistry", topic: "Quantum Mechanical Model",
    text: "For an electron in a 3p orbital, the number of angular nodes and radial (spherical) nodes, respectively, are:",
    options: ["0 and 2", "1 and 1", "2 and 0", "1 and 2"],
    correctIndex: 1,
    explanation: "Angular nodes = l = 1; radial nodes = n − l − 1 = 3 − 1 − 1 = 1."
  },
  {
    id: "C16", subject: "Chemistry", topic: "Bohr Model",
    text: "The energy of an electron in the fifth orbit (n = 5) of a hydrogen atom is:",
    options: ["-0.54 eV", "-1.51 eV", "-2.72 eV", "-0.85 eV"],
    correctIndex: 0,
    explanation: "E_n = −13.6 × Z²/n² eV = −13.6 × 1/25 = −0.544 eV."
  },
  {
    id: "C17", subject: "Chemistry", topic: "Dual Nature of Matter",
    text: "The de Broglie wavelength of a hydrogen molecule (mass ≈ 2/Nₐ g) moving with a speed of 2.4 × 10⁵ cm/s is approximately:",
    options: ["1 Å", "10 Å", "0.1 Å", "100 Å"],
    correctIndex: 0,
    explanation: "Applying λ = h/mv with the mass of a single H₂ molecule and the given speed gives λ ≈ 1 Å."
  },
  {
    id: "C18", subject: "Chemistry", topic: "Atomic Spectra",
    text: "When an electron in a hydrogen atom falls from n = 5 to the ground state (n = 1), the maximum number of spectral lines that can be observed is:",
    options: ["4", "5", "10", "15"],
    correctIndex: 2,
    explanation: "Maximum number of spectral lines = n(n−1)/2 = 5×4/2 = 10."
  },
  {
    id: "C19", subject: "Chemistry", topic: "Electronic Configuration",
    text: "The magnetic moment of a nitrogen atom (Z = 7), which has three unpaired electrons in its 2p subshell, is:",
    options: ["√3 BM", "√8 BM", "√15 BM", "√24 BM"],
    correctIndex: 2,
    explanation: "Magnetic moment μ = √[n(n+2)] BM, where n is the number of unpaired electrons; for n = 3, μ = √(3×5) = √15 BM."
  },
  {
    id: "C20", subject: "Chemistry", topic: "Mole Concept",
    text: "A gaseous compound has a vapour density of 46. If its empirical formula is NO₂, its molecular formula is:",
    options: ["NO₂", "N₂O", "N₂O₄", "N₂O₅"],
    correctIndex: 2,
    explanation: "Molecular mass = 2 × vapour density = 92 g/mol; since the empirical formula mass of NO₂ is 46, the molecular formula is N₂O₄ (92/46 = 2)."
  },
  {
    id: "C21", subject: "Chemistry", topic: "Electronic Configuration",
    text: "If the Aufbau principle were not followed, potassium (Z = 19) would have its 19th electron entering the 3d subshell instead of 4s, giving the configuration ...3p⁶3d¹. This would incorrectly place potassium — actually an s-block element — into which block?",
    options: ["s-block", "p-block", "d-block", "f-block"],
    correctIndex: 2,
    explanation: "Since the last electron would occupy a 3d orbital, the element would be classified in the d-block, even though potassium is genuinely an s-block element under the actual Aufbau order."
  },
  {
    id: "C22", subject: "Chemistry", topic: "Quantum Mechanical Model",
    text: "The orbital angular momentum of an electron, given by √[l(l+1)]·(h/2π), is zero for which type of orbital?",
    options: ["s-orbitals", "p-orbitals", "d-orbitals", "f-orbitals"],
    correctIndex: 0,
    explanation: "For s-orbitals, l = 0, so √[l(l+1)] = 0, making the orbital angular momentum zero."
  },
  {
    id: "C23", subject: "Chemistry", topic: "Photoelectric Effect",
    text: "According to Einstein's photoelectric equation, the maximum kinetic energy of an emitted photoelectron is:",
    options: [
      "Always equal to the energy of the incident photon",
      "Always greater than the energy of the incident photon",
      "Always less than the energy of the incident photon, since the work function is subtracted",
      "Independent of the incident photon's energy"
    ],
    correctIndex: 2,
    explanation: "Since KE_max = hν − hν₀ (work function hν₀ > 0), the maximum kinetic energy is always less than the incident photon's total energy."
  },
  {
    id: "C24", subject: "Chemistry", topic: "Electronic Configuration",
    text: "The last electron added to the ground-state configuration of an atom has the quantum numbers n = 3, l = 0, mₗ = 0. This corresponds to which element?",
    options: ["Mg (Z = 12)", "Na (Z = 11)", "Al (Z = 13)", "Ne (Z = 10)"],
    correctIndex: 1,
    explanation: "n = 3, l = 0 means the last electron enters the 3s orbital; the configuration 1s²2s²2p⁶3s¹ belongs to sodium (Z = 11)."
  },
  {
    id: "C25", subject: "Chemistry", topic: "Photoelectric Effect",
    text: "In a photoelectric experiment, if the intensity of incident light is doubled while its frequency is kept unchanged, then:",
    options: [
      "The maximum kinetic energy of photoelectrons doubles",
      "The number of photoelectrons emitted per second doubles, but their maximum kinetic energy stays the same",
      "Both the number of photoelectrons and their kinetic energy double",
      "No effect is observed"
    ],
    correctIndex: 1,
    explanation: "Increasing intensity increases the number of incident photons per second, doubling the photoelectron emission rate, but since frequency is unchanged, the maximum kinetic energy per electron remains the same."
  },
  {
    id: "C26", subject: "Chemistry", topic: "Photoelectric Effect",
    text: "WHAT IS CHEMISTRY",
    options: [
      "The maximum kinetic energy of photoelectrons doubles",
      "The number of photoelectrons emitted per second doubles, but their maximum kinetic energy stays the same",
      "Both the number of photoelectrons and their kinetic energy double",
      "No effect is observed"
    ],
    correctIndex: 1,
    explanation: "Increasing intensity increases the number of incident photons per second, doubling the photoelectron emission rate, but since frequency is unchanged, the maximum kinetic energy per electron remains the same."
  },

  // ---------------- BIOLOGY (20) ----------------
  {
    id: "B1", subject: "Biology", topic: "Cell Biology",
    text: "Which organelle is referred to as the 'powerhouse of the cell'?",
    options: ["Golgi apparatus", "Mitochondrion", "Ribosome", "Lysosome"],
    correctIndex: 1,
    explanation: "Mitochondria generate ATP through cellular respiration, earning them this label."
  },
  {
    id: "B2", subject: "Biology", topic: "Human Physiology",
    text: "The longest bone in the human body is the:",
    options: ["Humerus", "Tibia", "Femur", "Radius"],
    correctIndex: 2,
    explanation: "The femur (thigh bone) is the longest and strongest bone in the human body."
  },
  {
    id: "B3", subject: "Biology", topic: "Genetics & Evolution",
    text: "Mendel's Law of Independent Assortment applies to the inheritance of:",
    options: [
      "A single trait in one cross",
      "Two or more traits located on different chromosome pairs",
      "Sex-linked traits only",
      "Traits controlled by multiple alleles"
    ],
    correctIndex: 1,
    explanation: "Independent assortment describes how genes for different traits on separate chromosome pairs segregate independently during gamete formation."
  },
  {
    id: "B4", subject: "Biology", topic: "Plant Physiology",
    text: "The light reactions of photosynthesis occur in the:",
    options: ["Stroma", "Thylakoid membrane", "Mitochondrial matrix", "Nucleus"],
    correctIndex: 1,
    explanation: "Chlorophyll embedded in the thylakoid membrane captures light energy to split water and generate ATP and NADPH."
  },
  {
    id: "B5", subject: "Biology", topic: "Ecology",
    text: "In a food chain, green plants occupy which trophic level?",
    options: ["Primary consumers", "Secondary consumers", "Producers", "Decomposers"],
    correctIndex: 2,
    explanation: "Green plants are autotrophs that fix solar energy, placing them at the producer level of every food chain."
  },
  {
    id: "B6", subject: "Biology", topic: "Human Physiology – Digestion",
    text: "The enzyme pepsin, secreted by gastric glands, acts on food in the stomach to break down:",
    options: ["Carbohydrates", "Proteins", "Fats", "Nucleic acids"],
    correctIndex: 1,
    explanation: "Pepsin is a proteolytic enzyme that converts proteins into proteoses and peptones in the acidic environment of the stomach."
  },
  {
    id: "B7", subject: "Biology", topic: "Human Physiology – Respiration",
    text: "The volume of air that remains in the lungs even after a forceful expiration is called the:",
    options: ["Tidal volume", "Residual volume", "Vital capacity", "Expiratory reserve volume"],
    correctIndex: 1,
    explanation: "Residual volume is the air that cannot be expelled from the lungs even after maximum forced expiration, preventing lung collapse."
  },
  {
    id: "B8", subject: "Biology", topic: "Human Physiology – Circulation",
    text: "The natural pacemaker of the human heart, which initiates and maintains rhythmic contractions, is the:",
    options: ["Atrioventricular node", "Sinoatrial node", "Bundle of His", "Purkinje fibres"],
    correctIndex: 1,
    explanation: "The sinoatrial (SA) node generates the impulses that set the rhythm of the heartbeat, earning it the name 'natural pacemaker.'"
  },
  {
    id: "B9", subject: "Biology", topic: "Human Physiology – Excretion",
    text: "Which part of the nephron is primarily responsible for creating the concentration gradient needed to produce concentrated urine?",
    options: ["Bowman's capsule", "Proximal convoluted tubule", "Loop of Henle", "Collecting duct"],
    correctIndex: 2,
    explanation: "The loop of Henle operates a countercurrent mechanism that establishes the osmotic gradient in the medulla, enabling water reabsorption and urine concentration."
  },
  {
    id: "B10", subject: "Biology", topic: "Human Physiology – Neural Control",
    text: "At a chemical synapse, the neurotransmitter released from the presynaptic neuron binds to receptors on the:",
    options: ["Presynaptic membrane", "Synaptic vesicle", "Postsynaptic membrane", "Myelin sheath"],
    correctIndex: 2,
    explanation: "Neurotransmitters released into the synaptic cleft bind to specific receptors on the postsynaptic membrane, generating a new impulse."
  },
  {
    id: "B11", subject: "Biology", topic: "Human Reproduction",
    text: "Spermatogenesis, the process of sperm formation, occurs within the:",
    options: ["Vas deferens", "Seminiferous tubules", "Epididymis", "Prostate gland"],
    correctIndex: 1,
    explanation: "Spermatogonia within the seminiferous tubules of the testes divide and differentiate to produce mature sperm."
  },
  {
    id: "B12", subject: "Biology", topic: "Genetics",
    text: "Colour blindness in humans is a sex-linked recessive disorder carried on the:",
    options: ["Y chromosome", "X chromosome", "Autosome 21", "Mitochondrial DNA"],
    correctIndex: 1,
    explanation: "The gene for colour blindness is located on the X chromosome, making it far more common in males, who have only one X chromosome."
  },
  {
    id: "B13", subject: "Biology", topic: "Ecology",
    text: "In the logistic growth model, population growth slows and eventually stabilises as population size approaches the:",
    options: ["Biotic potential", "Carrying capacity (K)", "Intrinsic growth rate (r)", "Founder population"],
    correctIndex: 1,
    explanation: "The logistic growth curve levels off as the population nears the carrying capacity (K) of its environment, where resources become limiting."
  },
  {
    id: "B14", subject: "Biology", topic: "Biotechnology",
    text: "Restriction endonucleases used in genetic engineering function by:",
    options: ["Joining DNA fragments together", "Cutting DNA at specific recognition sequences", "Synthesizing new DNA strands", "Unwinding the DNA double helix"],
    correctIndex: 1,
    explanation: "Restriction enzymes recognise specific palindromic sequences and cut the DNA at those sites, generating fragments used in recombinant DNA technology."
  },
  {
    id: "B15", subject: "Biology", topic: "Plant Physiology – Transpiration",
    text: "The opening and closing of stomata, which regulates transpiration, is primarily controlled by changes in the:",
    options: ["Turgor pressure of guard cells", "Chlorophyll content of guard cells", "Thickness of the cuticle", "Number of trichomes"],
    correctIndex: 0,
    explanation: "Guard cells swell or shrink due to changes in turgor pressure, causing the stomatal pore to open or close accordingly."
  },
  {
    id: "B16", subject: "Biology", topic: "Cell Biology – Cell Cycle",
    text: "DNA replication in a eukaryotic cell occurs during which phase of the cell cycle?",
    options: ["G1 phase", "S phase", "G2 phase", "M phase"],
    correctIndex: 1,
    explanation: "The synthesis (S) phase of interphase is when the cell replicates its DNA content in preparation for cell division."
  },
  {
    id: "B17", subject: "Biology", topic: "Evolution",
    text: "According to the Hardy-Weinberg principle, allele frequencies in a population remain constant across generations provided there is:",
    options: [
      "Random mating and no external influences like mutation or selection",
      "Continuous natural selection",
      "Frequent gene flow between populations",
      "High mutation rate"
    ],
    correctIndex: 0,
    explanation: "Hardy-Weinberg equilibrium holds only under idealised conditions — random mating, large population size, and no mutation, selection, migration, or genetic drift."
  },
  {
    id: "B18", subject: "Biology", topic: "Human Health & Disease",
    text: "Immunity gained by a newborn through antibodies received from the mother's milk is an example of:",
    options: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    correctIndex: 1,
    explanation: "Ready-made antibodies passed from mother to infant provide passive natural immunity, without the infant's own immune system producing them."
  },
  {
    id: "B19", subject: "Biology", topic: "Biological Classification",
    text: "In the five-kingdom classification proposed by Whittaker, prokaryotic organisms such as bacteria are placed in the kingdom:",
    options: ["Protista", "Monera", "Fungi", "Plantae"],
    correctIndex: 1,
    explanation: "Kingdom Monera includes all prokaryotes, which lack a defined nucleus and membrane-bound organelles."
  },
  {
    id: "B20", subject: "Biology", topic: "Plant Physiology – Photosynthesis",
    text: "C4 plants show higher photosynthetic efficiency than C3 plants in hot, dry climates mainly because of their:",
    options: ["Larger leaf surface area", "Kranz anatomy that minimises photorespiration", "Higher chlorophyll b content", "Thicker cuticle layer"],
    correctIndex: 1,
    explanation: "The Kranz anatomy in C4 plants concentrates CO₂ around Rubisco in bundle sheath cells, greatly reducing photorespiration and improving efficiency under hot, dry conditions."
  }
];

/* A stand-in "historical batch" score distribution (out of 60 marks
   for 15 Qs × 4). In production this comes from your own past test
   data — swap the array, nothing else needs to change. */
const HISTORICAL_SCORES = [
  -8, -4, 0, 2, 4, 6, 8, 8, 10, 10, 12, 12, 12, 14, 14, 15, 16, 16, 18, 18,
  18, 20, 20, 20, 22, 22, 24, 24, 24, 25, 26, 26, 28, 28, 28, 30, 30, 32,
  32, 33, 34, 34, 35, 36, 36, 37, 38, 38, 39, 40, 40, 41, 42, 42, 43, 44,
  44, 45, 46, 46, 47, 48, 48, 49, 50, 50, 51, 52, 52, 53, 54, 55, 56, 56,
  57, 58, 60
];