import type { HCP, NetworkData, Connection } from "../types/hop"

// Function to generate real profile image URLs
function generateAvatarUrl(seed: string, gender?: "men" | "women"): string {
  // Using This Person Does Not Exist API for realistic profile photos
  const randomId =
    Math.abs(
      seed.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0),
    ) % 100

  // Determine gender based on first name or use random
  const genderToUse = gender || (Math.random() > 0.5 ? "men" : "women")

  return `https://randomuser.me/api/portraits/${genderToUse}/${randomId}.jpg`
}

//  list of 100 healthcare professionals
const mockHCPs: HCP[] = [
  // Original 15 professionals
  {
    id: "emily-carter",
    name: "Dr. Emily Carter",
    title: "Cardiologist",
    institution: "Harvard Medical School",
    avatar: generateAvatarUrl("emily-carter", "women"),
    about:
      "Leading researcher in cardiovascular medicine with focus on interventional cardiology and heart failure management.",
    stats: { connections: 1000, publications: 95 },
    education: [
      { institution: "Harvard Medical School", degree: "MD in Cardiology", year: "2010-2014" },
      { institution: "Stanford University", degree: "BS in Biology", year: "2006-2010" },
    ],
    experience: [
      { position: "Senior Cardiologist", institution: "Massachusetts General Hospital", duration: "2018-Present" },
      { position: "Cardiology Fellow", institution: "Johns Hopkins Hospital", duration: "2014-2018" },
    ],
    specializations: ["Interventional Cardiology", "Heart Failure", "Cardiac Imaging"],
  },
  {
    id: "john-smith",
    name: "Dr. John Smith",
    title: "Neurologist",
    institution: "Mayo Clinic",
    avatar: generateAvatarUrl("john-smith", "men"),
    about: "Specialized in neurodegenerative diseases with focus on Alzheimer's research and clinical trials.",
    stats: { connections: 750, publications: 68 },
    education: [{ institution: "Mayo Clinic College of Medicine", degree: "MD in Neurology", year: "2008-2012" }],
    experience: [{ position: "Chief of Neurology", institution: "Mayo Clinic", duration: "2016-Present" }],
    specializations: ["Alzheimer's Disease", "Parkinson's Disease", "Dementia", "Clinical Trials"],
  },
  {
    id: "sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "Oncologist",
    institution: "MD Anderson Cancer Center",
    avatar: generateAvatarUrl("sarah-johnson", "women"),
    about: "Leading researcher in breast cancer treatment and immunotherapy with extensive clinical experience.",
    stats: { connections: 890, publications: 112 },
    education: [{ institution: "MD Anderson Cancer Center", degree: "MD in Oncology", year: "2009-2013" }],
    experience: [{ position: "Senior Oncologist", institution: "MD Anderson Cancer Center", duration: "2017-Present" }],
    specializations: ["Breast Cancer", "Immunotherapy", "Clinical Trials", "Precision Medicine"],
  },
  {
    id: "michael-brown",
    name: "Dr. Michael Brown",
    title: "Pediatrician",
    institution: "Boston Children's Hospital",
    avatar: generateAvatarUrl("michael-brown", "men"),
    about: "Pediatric specialist focusing on childhood development and genetic disorders.",
    stats: { connections: 620, publications: 45 },
    education: [{ institution: "Harvard Medical School", degree: "MD in Pediatrics", year: "2011-2015" }],
    experience: [
      { position: "Attending Pediatrician", institution: "Boston Children's Hospital", duration: "2019-Present" },
    ],
    specializations: ["Pediatric Genetics", "Child Development", "Rare Diseases"],
  },
  {
    id: "lisa-davis",
    name: "Dr. Lisa Davis",
    title: "Surgeon",
    institution: "Johns Hopkins Hospital",
    avatar: generateAvatarUrl("lisa-davis", "women"),
    about: "Cardiovascular surgeon with expertise in minimally invasive procedures and heart transplantation.",
    stats: { connections: 540, publications: 78 },
    education: [{ institution: "Johns Hopkins School of Medicine", degree: "MD in Surgery", year: "2007-2011" }],
    experience: [
      { position: "Chief of Cardiac Surgery", institution: "Johns Hopkins Hospital", duration: "2020-Present" },
    ],
    specializations: ["Cardiac Surgery", "Heart Transplantation", "Minimally Invasive Surgery"],
  },
  // Adding 85 more healthcare professionals
  ...generateAdditionalHCPs(),
]

function generateAdditionalHCPs(): HCP[] {
  const institutions = [
    "Harvard Medical School",
    "Mayo Clinic",
    "Johns Hopkins Hospital",
    "Stanford Medical Center",
    "UCLA Medical Center",
    "Cleveland Clinic",
    "Massachusetts General Hospital",
    "Mount Sinai Hospital",
    "NYU Langone Health",
    "University of Pennsylvania Health System",
    "UCSF Medical Center",
    "Cedars-Sinai Medical Center",
    "Northwestern Memorial Hospital",
    "Duke University Hospital",
    "Vanderbilt University Medical Center",
    "University of Michigan Health System",
    "Yale-New Haven Hospital",
    "Brigham and Women's Hospital",
    "Houston Methodist Hospital",
    "University of Washington Medical Center",
    "Emory University Hospital",
    "University of Chicago Medical Center",
    "Rush University Medical Center",
    "Thomas Jefferson University Hospital",
    "George Washington University Hospital",
    "Georgetown University Hospital",
    "Boston Medical Center",
    "Tufts Medical Center",
    "Albany Medical Center",
    "University of Rochester Medical Center",
  ]

  const specialties = [
    "Anesthesiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
    "Obstetrics and Gynecology",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Otolaryngology",
    "Pathology",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Gastroenterology",
    "Pulmonology",
    "Nephrology",
    "Endocrinology",
    "Rheumatology",
    "Infectious Disease",
    "Hematology",
    "Immunology",
    "Sports Medicine",
    "Pain Management",
    "Plastic Surgery",
    "Vascular Surgery",
    "Thoracic Surgery",
    "Neurosurgery",
    "Radiation Oncology",
    "Nuclear Medicine",
    "Physical Medicine",
    "Occupational Medicine",
    "Preventive Medicine",
  ]

  const firstNames = [
    "Robert",
    "Maria",
    "James",
    "Patricia",
    "William",
    "Linda",
    "Richard",
    "Barbara",
    "Joseph",
    "Susan",
    "Thomas",
    "Jessica",
    "Christopher",
    "Karen",
    "Charles",
    "Nancy",
    "Daniel",
    "Betty",
    "Matthew",
    "Helen",
    "Anthony",
    "Sandra",
    "Mark",
    "Donna",
    "Donald",
    "Carol",
    "Steven",
    "Ruth",
    "Paul",
    "Sharon",
  ]

  const lastNames = [
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
    "Clark",
    "Rodriguez",
    "Lewis",
    "Lee",
    "Walker",
    "Hall",
    "Allen",
    "Young",
    "Hernandez",
    "King",
    "Wright",
    "Lopez",
    "Hill",
    "Scott",
    "Green",
    "Adams",
    "Baker",
    "Gonzalez",
  ]

  const specializations = [
    ["Cardiac Electrophysiology", "Arrhythmia Management", "Pacemaker Implantation"],
    ["Stroke Medicine", "Epilepsy", "Multiple Sclerosis"],
    ["Lung Cancer", "Prostate Cancer", "Colorectal Cancer"],
    ["Neonatal Care", "Pediatric Emergency", "Adolescent Medicine"],
    ["Trauma Surgery", "Laparoscopic Surgery", "Robotic Surgery"],
    ["Cataract Surgery", "Retinal Disorders", "Glaucoma"],
    ["Joint Replacement", "Sports Injuries", "Spine Surgery"],
    ["Hearing Loss", "Sinus Surgery", "Head and Neck Cancer"],
    ["Surgical Pathology", "Cytopathology", "Molecular Diagnostics"],
    ["Women's Health", "High-Risk Pregnancy", "Reproductive Endocrinology"],
    ["Depression", "Anxiety Disorders", "Bipolar Disorder"],
    ["CT Imaging", "MRI", "Interventional Radiology"],
    ["Kidney Stones", "Prostate Surgery", "Bladder Cancer"],
    ["Diabetes", "Thyroid Disorders", "Osteoporosis"],
    ["Inflammatory Bowel Disease", "Liver Disease", "Endoscopy"],
    ["Asthma", "COPD", "Sleep Disorders"],
    ["Dialysis", "Kidney Transplant", "Hypertension"],
    ["Autoimmune Diseases", "Arthritis", "Lupus"],
    ["HIV/AIDS", "Hepatitis", "Antimicrobial Stewardship"],
    ["Blood Disorders", "Leukemia", "Lymphoma"],
    ["Allergy Testing", "Immunodeficiency", "Autoimmune Disorders"],
    ["Athletic Injuries", "Rehabilitation", "Performance Enhancement"],
    ["Chronic Pain", "Interventional Pain", "Palliative Care"],
    ["Cosmetic Surgery", "Reconstructive Surgery", "Burn Treatment"],
    ["Vascular Disease", "Aneurysm Repair", "Peripheral Artery Disease"],
    ["Heart Surgery", "Lung Surgery", "Esophageal Surgery"],
    ["Brain Surgery", "Spinal Surgery", "Tumor Removal"],
    ["Cancer Treatment", "Stereotactic Radiosurgery", "Brachytherapy"],
    ["PET Scans", "Thyroid Imaging", "Bone Scans"],
    ["Rehabilitation Medicine", "Spinal Cord Injury", "Stroke Recovery"],
    ["Workplace Injuries", "Occupational Health", "Environmental Medicine"],
    ["Disease Prevention", "Public Health", "Epidemiology"],
    ["Critical Care", "Emergency Procedures", "Trauma Medicine"],
    ["Primary Care", "Preventive Medicine", "Chronic Disease Management"],
    ["General Surgery", "Hernia Repair", "Gallbladder Surgery"],
    ["Anesthesia", "Pain Management", "Critical Care"],
  ]

  const additionalHCPs: HCP[] = []

  for (let i = 0; i < 25; i++) {
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[i % lastNames.length]
    const specialty = specialties[i % specialties.length]
    const institution = institutions[i % institutions.length]
    const specs = specializations[i % specializations.length]
    const fullName = `${firstName} ${lastName}`
    const id = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`

    // Determine gender based on first name
    const femaleNames = [
      "Maria",
      "Patricia",
      "Linda",
      "Barbara",
      "Susan",
      "Jessica",
      "Karen",
      "Nancy",
      "Betty",
      "Helen",
      "Sandra",
      "Donna",
      "Carol",
      "Ruth",
      "Sharon",
    ]
    const gender = femaleNames.includes(firstName) ? "women" : "men"

    additionalHCPs.push({
      id,
      name: `Dr. ${fullName}`,
      title: specialty,
      institution: institution,
      avatar: generateAvatarUrl(id, gender),
      about: `Experienced ${specialty.toLowerCase()} with expertise in ${specs[0].toLowerCase()} and ${specs[1].toLowerCase()}.`,
      stats: {
        connections: Math.floor(Math.random() * 800) + 200,
        publications: Math.floor(Math.random() * 120) + 15,
      },
      education: [
        {
          institution: institution,
          degree: `MD in ${specialty}`,
          year: `${2005 + (i % 10)}-${2009 + (i % 10)}`,
        },
      ],
      experience: [
        {
          position: `Senior ${specialty}`,
          institution: institution,
          duration: `${2015 + (i % 8)}-Present`,
        },
      ],
      specializations: specs,
    })
  }

  return additionalHCPs
}

function generateConnections(hcps: HCP[], centerHCPId?: string): Connection[] {
  const connections: Connection[] = []

  // Group HCPs by institution
  const institutionGroups = new Map<string, HCP[]>()
  hcps.forEach((hcp) => {
    if (!institutionGroups.has(hcp.institution)) {
      institutionGroups.set(hcp.institution, [])
    }
    institutionGroups.get(hcp.institution)!.push(hcp)
  })

  // Group HCPs by specialization
  const specializationGroups = new Map<string, HCP[]>()
  hcps.forEach((hcp) => {
    hcp.specializations.forEach((spec) => {
      if (!specializationGroups.has(spec)) {
        specializationGroups.set(spec, [])
      }
      specializationGroups.get(spec)!.push(hcp)
    })
  })

  // Create institutional connections (colleagues) - limit to avoid too many connections
  institutionGroups.forEach((institutionHCPs, institution) => {
    if (institutionHCPs.length > 1) {
      // Connect each HCP to 2-4 random colleagues at same institution
      institutionHCPs.forEach((hcp) => {
        const colleagues = institutionHCPs.filter((h) => h.id !== hcp.id)
        const numConnections = Math.min(4, Math.floor(Math.random() * 3) + 2)
        const shuffledColleagues = colleagues.sort(() => 0.5 - Math.random()).slice(0, numConnections)

        shuffledColleagues.forEach((colleague) => {
          // Check if connection already exists
          const existingConnection = connections.find(
            (c) =>
              (c.source === hcp.id && c.target === colleague.id) || (c.source === colleague.id && c.target === hcp.id),
          )

          if (!existingConnection) {
            connections.push({
              source: hcp.id,
              target: colleague.id,
              type: "Colleague",
              description: `Colleagues at ${institution}`,
              strength: 0.6,
            })
          }
        })
      })
    }
  })

  // Create specialization-based connections (research collaborators)
  specializationGroups.forEach((specHCPs, specialization) => {
    if (specHCPs.length > 1) {
      // Connect some researchers with same specialization
      const numConnections = Math.min(8, Math.floor(specHCPs.length / 3))
      for (let k = 0; k < numConnections; k++) {
        const i = Math.floor(Math.random() * specHCPs.length)
        let j = Math.floor(Math.random() * specHCPs.length)
        while (j === i) {
          j = Math.floor(Math.random() * specHCPs.length)
        }

        // Check if connection already exists
        const existingConnection = connections.find(
          (c) =>
            (c.source === specHCPs[i].id && c.target === specHCPs[j].id) ||
            (c.source === specHCPs[j].id && c.target === specHCPs[i].id),
        )

        if (!existingConnection) {
          connections.push({
            source: specHCPs[i].id,
            target: specHCPs[j].id,
            type: "Research Collaboration",
            description: `Research collaboration in ${specialization}`,
            strength: 0.8,
          })
        }
      }
    }
  })

  // Create co-authorship connections (more extensive for 100 HCPs)
  const publicationPairs = generatePublicationPairs(hcps)

  publicationPairs.forEach(([source, target, publication]) => {
    const existingConnection = connections.find(
      (c) => (c.source === source && c.target === target) || (c.source === target && c.target === source),
    )

    if (!existingConnection) {
      connections.push({
        source,
        target,
        type: "Co-authored",
        description: `Co-authored: ${publication}`,
        strength: 0.9,
      })
    }
  })

  // Ensure center researcher has adequate connections
  if (centerHCPId) {
    const centerConnections = connections.filter((c) => c.source === centerHCPId || c.target === centerHCPId)

    if (centerConnections.length < 6) {
      const otherHCPs = hcps.filter((h) => h.id !== centerHCPId)
      const shuffled = otherHCPs.sort(() => 0.5 - Math.random())
      const needed = Math.min(10 - centerConnections.length, shuffled.length)

      for (let i = 0; i < needed; i++) {
        const targetHCP = shuffled[i]
        const existingConnection = connections.find(
          (c) =>
            (c.source === centerHCPId && c.target === targetHCP.id) ||
            (c.source === targetHCP.id && c.target === centerHCPId),
        )

        if (!existingConnection) {
          connections.push({
            source: centerHCPId,
            target: targetHCP.id,
            type: "Professional Network",
            description: "Connected through professional healthcare network",
            strength: 0.5,
          })
        }
      }
    }
  }

  // Add some random professional connections to ensure no isolated nodes
  hcps.forEach((hcp) => {
    const hcpConnections = connections.filter((c) => c.source === hcp.id || c.target === hcp.id)

    if (hcpConnections.length === 0) {
      // Connect isolated nodes to 1-2 random others
      const otherHCPs = hcps.filter((h) => h.id !== hcp.id)
      const numConnections = Math.floor(Math.random() * 2) + 1
      const shuffled = otherHCPs.sort(() => 0.5 - Math.random()).slice(0, numConnections)

      shuffled.forEach((targetHCP) => {
        connections.push({
          source: hcp.id,
          target: targetHCP.id,
          type: "Professional Network",
          description: "Connected through professional healthcare network",
          strength: 0.4,
        })
      })
    }
  })

  return connections
}

function generatePublicationPairs(hcps: HCP[]): [string, string, string][] {
  const pairs: [string, string, string][] = []

  const publicationTitles = [
    "Advances in Cardiovascular Medicine",
    "Neurological Disorders and Treatment",
    "Cancer Immunotherapy Breakthroughs",
    "Pediatric Care Innovations",
    "Surgical Techniques and Outcomes",
    "Mental Health in Healthcare Workers",
    "Diabetes Management Strategies",
    "Infectious Disease Prevention",
    "Orthopedic Surgery Advances",
    "Dermatological Research Updates",
    "Emergency Medicine Protocols",
    "Radiology Imaging Improvements",
    "Anesthesia Safety Measures",
    "Pulmonary Function Studies",
    "Gastroenterology Clinical Trials",
    "Nephrology Treatment Options",
    "Endocrine System Disorders",
    "Rheumatology Research",
    "Ophthalmology Surgical Techniques",
    "Urology Minimally Invasive Procedures",
    "Pathology Diagnostic Methods",
    "Obstetrics and Gynecology Care",
    "Family Medicine Best Practices",
    "Internal Medicine Guidelines",
    "Preventive Healthcare Strategies",
    "Geriatric Medicine Approaches",
    "Sports Medicine Rehabilitation",
    "Pain Management Techniques",
    "Plastic Surgery Innovations",
    "Vascular Surgery Outcomes",
  ]

  // Generate 50 random publication pairs
  for (let i = 0; i < 50; i++) {
    const hcp1 = hcps[Math.floor(Math.random() * hcps.length)]
    let hcp2 = hcps[Math.floor(Math.random() * hcps.length)]
    while (hcp2.id === hcp1.id) {
      hcp2 = hcps[Math.floor(Math.random() * hcps.length)]
    }

    const publication = publicationTitles[i % publicationTitles.length]
    pairs.push([hcp1.id, hcp2.id, publication])
  }

  return pairs
}

// Enhanced search function with better performance and fuzzy matching
export const searchHCPs = async (query: string): Promise<HCP[]> => {
  // Return empty array for very short queries to avoid unnecessary processing
  if (!query || query.trim().length < 2) {
    return []
  }

  // Simulate API delay (reduced for better UX)
  await new Promise((resolve) => setTimeout(resolve, 150))

  const normalizedQuery = query.toLowerCase().trim()

  // Score-based search for better relevance
  const searchResults = mockHCPs
    .map((hcp) => {
      let score = 0
      const name = hcp.name.toLowerCase()
      const title = hcp.title.toLowerCase()
      const institution = hcp.institution.toLowerCase()
      const specializations = hcp.specializations.map((s) => s.toLowerCase()).join(" ")

      // Exact matches get highest score
      if (name.includes(normalizedQuery)) score += 10
      if (title.includes(normalizedQuery)) score += 8
      if (institution.includes(normalizedQuery)) score += 6
      if (specializations.includes(normalizedQuery)) score += 4

      // Word boundary matches get bonus points
      const queryWords = normalizedQuery.split(" ")
      queryWords.forEach((word) => {
        if (word.length > 1) {
          if (name.includes(word)) score += 3
          if (title.includes(word)) score += 2
          if (institution.includes(word)) score += 2
          if (specializations.includes(word)) score += 1
        }
      })

      return { hcp, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((result) => result.hcp)

  return searchResults
}

export const fetchHCPDetails = async (id: string): Promise<HCP> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const hcp = mockHCPs.find((h) => h.id === id)
  if (!hcp) throw new Error("HCP not found")

  return hcp
}

export const fetchNetworkData = async (centerHCPId: string): Promise<NetworkData> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const connections = generateConnections(mockHCPs, centerHCPId)

  return {
    nodes: mockHCPs,
    links: connections,
  }
}
