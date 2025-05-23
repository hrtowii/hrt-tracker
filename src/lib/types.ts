// https://transfemscience.org/misc/injectable-e2-simulator/
// https://transfemscience.org/misc/
export enum InjectableEstradiols {
  Benzoate = "Estradiol Benzoate",
  Cypionate = "Estradiol Cypionate",
  Enanthate = "Estradiol Enanthate",
  Undecylate = "Estradiol Undecylate",
  Valerate = "Estradiol Valerate",
  PolyestradiolPhosphate = "Polyestradiol Phosphate",
}

export enum OralEstradiols {
  Hemihydrate = "Estradiol Hemihydrate",
  Valerate = "Estradiol Valerate",
  Premarin = "Premarin",
}

export enum Antiandrogens {
  CPA = "Cyproterone Acetate",
  Spiro = "Spironolactone",
  Bica = "Bicalutamide",
  Finasteride = "Finasteride",
}

export enum HormoneUnits {
  E2_pg_mL = "pg/mL",
  E2_pmol_L = "pmol/L",
  T_ng_dL = "ng/dL",
  T_nmol_L = "nmol/L",
  mg = "mg",
}

export type UnixTime = number;

export type DosageHistoryEntry =
  | {
      date: UnixTime;
      medicationType: "injectableEstradiol";
      type: InjectableEstradiols;
      dose: number;
      unit: HormoneUnits;
    }
  | {
      date: UnixTime;
      medicationType: "oralEstradiol";
      type: OralEstradiols;
      dose: number;
      unit: HormoneUnits;
    }
  | {
      date: UnixTime;
      medicationType: "antiandrogen";
      type: Antiandrogens;
      dose: number;
      unit: HormoneUnits;
    };

export type EstrogenType =
  | { route: "injection"; type: InjectableEstradiols }
  | { route: "oral"; type: OralEstradiols };

export interface BloodTest {
  date: UnixTime;
  estradiolLevel?: number;
  testLevel?: number;
  estradiolUnit?: HormoneUnits;
  testUnit?: HormoneUnits;
  notes?: string;
  // i have to keep track of oral or injection so we gotta add those as types
  estrogenType?: EstrogenType;
  // basically, i can do { route: "injectable", InjectableEstradiols.Cypionate }
}

export const HRT_STORAGE_KEY = "hrt-meow-data";
export interface HRTData {
  injectableEstradiol?: {
    type: InjectableEstradiols;
    dose: number;
    unit: HormoneUnits;
    frequency: string;
  };
  oralEstradiol?: {
    type: OralEstradiols;
    dose: number;
    unit: HormoneUnits;
    frequency: string;
  };
  antiandrogen?: {
    type: Antiandrogens;
    dose: number;
    unit: HormoneUnits;
    frequency: string;
  };
  bloodTests: BloodTest[];
  dosageHistory: DosageHistoryEntry[];
}
