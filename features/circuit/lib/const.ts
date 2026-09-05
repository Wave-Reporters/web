

export type WeaponCategory = 'Primary' | 'Secondary' | 'Melee';
export type IncarnonTier = 'S' | 'A' | 'B' | 'C' | 'D';

export interface IncarnonWeapon {
    id: string;
    name_kr: string;
    name_en: string;
    category: WeaponCategory;
    tier: IncarnonTier;
    variants: string[];
}

export interface CircuitRotation {
    week: number;
    weapons: IncarnonWeapon[];
}

export interface IncarnonRotationData {
    rotation_cycle_weeks: number;
    rotations: CircuitRotation[];
}

export const circuitRotation:IncarnonRotationData = {
    "rotation_cycle_weeks": 9,
    "rotations": [
        {
            "week": 1,
            "weapons": [
                { "id": "braton", "name_kr": "브래튼", "name_en": "Braton", "category": "Primary", "tier": "B", "variants": ["Braton", "Mk1-Braton", "Braton Prime", "Braton Vandal"] },
                { "id": "lato", "name_kr": "라토", "name_en": "Lato", "category": "Secondary", "tier": "C", "variants": ["Lato", "Lato Prime", "Lato Vandal"] },
                { "id": "skana", "name_kr": "스카나", "name_en": "Skana", "category": "Melee", "tier": "B", "variants": ["Skana", "Skana Prime", "Prisma Skana"] },
                { "id": "paris", "name_kr": "패리스", "name_en": "Paris", "category": "Primary", "tier": "B", "variants": ["Paris", "Mk1-Paris", "Paris Prime"] },
                { "id": "kunai", "name_kr": "쿠나이", "name_en": "Kunai", "category": "Secondary", "tier": "C", "variants": ["Kunai", "Mk1-Kunai"] }
            ]
        },
        {
            "week": 2,
            "weapons": [
                { "id": "boar", "name_kr": "보어", "name_en": "Boar", "category": "Primary", "tier": "B", "variants": ["Boar", "Boar Prime"] },
                { "id": "gammacor", "name_kr": "감마코어", "name_en": "Gammacor", "category": "Secondary", "tier": "D", "variants": ["Gammacor", "Synoid Gammacor"] },
                { "id": "angstrum", "name_kr": "앙스트럼", "name_en": "Angstrum", "category": "Secondary", "tier": "A", "variants": ["Angstrum", "Prisma Angstrum"] },
                { "id": "gorgon", "name_kr": "고르곤", "name_en": "Gorgon", "category": "Primary", "tier": "D", "variants": ["Gorgon", "Gorgon Wraith", "Prisma Gorgon"] },
                { "id": "anku", "name_kr": "안쿠", "name_en": "Anku", "category": "Melee", "tier": "C", "variants": ["Anku"] }
            ]
        },
        {
            "week": 3,
            "weapons": [
                { "id": "bo", "name_kr": "보", "name_en": "Bo", "category": "Melee", "tier": "A", "variants": ["Bo", "Mk1-Bo", "Bo Prime"] },
                { "id": "latron", "name_kr": "래트론", "name_en": "Latron", "category": "Primary", "tier": "S", "variants": ["Latron", "Latron Prime", "Latron Wraith"] },
                { "id": "furis", "name_kr": "퓨리스", "name_en": "Furis", "category": "Secondary", "tier": "S", "variants": ["Furis", "Mk1-Furis"] },
                { "id": "furax", "name_kr": "퓨랙스", "name_en": "Furax", "category": "Melee", "tier": "C", "variants": ["Furax", "Mk1-Furax", "Furax Wraith"] },
                { "id": "strun", "name_kr": "스트런", "name_en": "Strun", "category": "Primary", "tier": "B", "variants": ["Strun", "Mk1-Strun", "Strun Prime", "Strun Wraith"] }
            ]
        },
        {
            "week": 4,
            "weapons": [
                { "id": "lex", "name_kr": "렉스", "name_en": "Lex", "category": "Secondary", "tier": "B", "variants": ["Lex", "Lex Prime"] },
                { "id": "magistar", "name_kr": "마기스타", "name_en": "Magistar", "category": "Melee", "tier": "S", "variants": ["Magistar", "Sancti Magistar"] },
                { "id": "boltor", "name_kr": "볼터", "name_en": "Boltor", "category": "Primary", "tier": "C", "variants": ["Boltor", "Boltor Prime", "Telos Boltor"] },
                { "id": "bronco", "name_kr": "브롱코", "name_en": "Bronco", "category": "Secondary", "tier": "C", "variants": ["Bronco", "Bronco Prime"] },
                { "id": "ceramic_dagger", "name_kr": "세라믹 대거", "name_en": "Ceramic Dagger", "category": "Melee", "tier": "C", "variants": ["Ceramic Dagger"] }
            ]
        },
        {
            "week": 5,
            "weapons": [
                { "id": "torid", "name_kr": "토리드", "name_en": "Torid", "category": "Primary", "tier": "S", "variants": ["Torid"] },
                { "id": "dual_toxocyst", "name_kr": "듀얼 톡시시스트", "name_en": "Dual Toxocyst", "category": "Secondary", "tier": "A", "variants": ["Dual Toxocyst"] },
                { "id": "dual_ichor", "name_kr": "듀얼 이코르", "name_en": "Dual Ichor", "category": "Melee", "tier": "S", "variants": ["Dual Ichor"] },
                { "id": "miter", "name_kr": "미이터", "name_en": "Miter", "category": "Primary", "tier": "C", "variants": ["Miter"] },
                { "id": "atomos", "name_kr": "아토모스", "name_en": "Atomos", "category": "Secondary", "tier": "B", "variants": ["Atomos"] }
            ]
        },
        {
            "week": 6,
            "weapons": [
                { "id": "ack_and_brunt", "name_kr": "아크 & 브런트", "name_en": "Ack & Brunt", "category": "Melee", "tier": "C", "variants": ["Ack & Brunt"] },
                { "id": "soma", "name_kr": "소마", "name_en": "Soma", "category": "Primary", "tier": "C", "variants": ["Soma", "Soma Prime"] },
                { "id": "vasto", "name_kr": "바스토", "name_en": "Vasto", "category": "Secondary", "tier": "C", "variants": ["Vasto", "Vasto Prime"] },
                { "id": "nami_solo", "name_kr": "나미 솔로", "name_en": "Nami Solo", "category": "Melee", "tier": "A", "variants": ["Nami Solo"] },
                { "id": "burston", "name_kr": "버스튼", "name_en": "Burston", "category": "Primary", "tier": "S", "variants": ["Burston", "Burston Prime"] }
            ]
        },
        {
            "week": 7,
            "weapons": [
                { "id": "zylok", "name_kr": "자일락", "name_en": "Zylok", "category": "Secondary", "tier": "C", "variants": ["Zylok", "Zylok Prime"] },
                { "id": "sibear", "name_kr": "시비어", "name_en": "Sibear", "category": "Melee", "tier": "D", "variants": ["Sibear"] },
                { "id": "dread", "name_kr": "드레드", "name_en": "Dread", "category": "Primary", "tier": "C", "variants": ["Dread"] },
                { "id": "despair", "name_kr": "디스페어", "name_en": "Despair", "category": "Secondary", "tier": "C", "variants": ["Despair"] },
                { "id": "hate", "name_kr": "헤이트", "name_en": "Hate", "category": "Melee", "tier": "A", "variants": ["Hate"] }
            ]
        },
        {
            "week": 8,
            "weapons": [
                { "id": "dera", "name_kr": "데라", "name_en": "Dera", "category": "Primary", "tier": "C", "variants": ["Dera", "Dera Vandal"] },
                { "id": "sybaris", "name_kr": "시바리스", "name_en": "Sybaris", "category": "Primary", "tier": "C", "variants": ["Sybaris", "Dex Sybaris", "Sybaris Prime"] },
                { "id": "cestra", "name_kr": "세스트라", "name_en": "Cestra", "category": "Secondary", "tier": "C", "variants": ["Cestra"] },
                { "id": "sicarus", "name_kr": "시카루스", "name_en": "Sicarus", "category": "Secondary", "tier": "S", "variants": ["Sicarus", "Sicarus Prime"] },
                { "id": "okina", "name_kr": "오키나", "name_en": "Okina", "category": "Melee", "tier": "S", "variants": ["Okina", "Okina Prime"] }
            ]
        },
        {
            "week": 9,
            "weapons": [
                { "id": "vectis", "name_kr": "벡티스", "name_en": "Vectis", "category": "Primary", "tier": "C", "variants": ["Vectis", "Vectis Prime"] },
                { "id": "stug", "name_kr": "스터그", "name_en": "Stug", "category": "Secondary", "tier": "C", "variants": ["Stug"] },
                { "id": "ballistica", "name_kr": "발리스티카", "name_en": "Ballistica", "category": "Secondary", "tier": "A", "variants": ["Ballistica", "Ballistica Prime", "Rakta Ballistica"] },
                { "id": "destreza", "name_kr": "데스트레자", "name_en": "Destreza", "category": "Melee", "tier": "C", "variants": ["Destreza", "Destreza Prime"] },
                { "id": "obex", "name_kr": "오벡스", "name_en": "Obex", "category": "Melee", "tier": "A", "variants": ["Obex", "Prisma Obex"] }
            ]
        }
    ]
}