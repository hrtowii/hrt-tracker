// https://transfemscience.org/misc/injectable-e2-simulator/
// https://transfemscience.org/misc/
// refer to hrtcafe for more as well later.
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

export enum BloodTestUnits {
  E2_pg_mL = "pg/mL",
  E2_pmol_L = "pmol/L",
  T_ng_dL = "ng/dL",
  T_nmol_L = "nmol/L",
}

export enum DosageUnits {
  g = "g",
  mg = "mg",
  ml = "ml"
}

export enum InjectionMethod {
  intramuscular = "intramuscular",
  subcutaneous = "subcutaneous",
}

export enum OralMethod {
  oral = "oral",
  sublingual = "sublingual"
}

export type EstrogenType =
  | { route: "injection"; type: InjectableEstradiols, method: InjectionMethod }
  | { route: "oral"; type: OralEstradiols, method: OralMethod };

export type UnixTime = number;

export type DosageHistoryEntry =
  | {
    date: UnixTime;
    medicationType: "injectableEstradiol";
    type: InjectableEstradiols;
    method: InjectionMethod;
    dose: number;
    unit: DosageUnits;
  }
  | {
    date: UnixTime;
    medicationType: "oralEstradiol";
    type: OralEstradiols;
    method: OralMethod;
    dose: number;
    unit: DosageUnits;
  }
  | {
    date: UnixTime;
    medicationType: "antiandrogen";
    type: Antiandrogens;
    dose: number;
    unit: DosageUnits;
  };

export interface BloodTest {
  date: UnixTime;
  estradiolLevel?: number;
  testLevel?: number;
  estradiolUnit?: BloodTestUnits;
  testUnit?: BloodTestUnits;
  notes?: string;
  // i have to keep track of oral or injection so we gotta add those as types
  estrogenType?: EstrogenType;
  // basically, i can do { route: "injectable", InjectableEstradiols.Cypionate }
}

export const HRT_STORAGE_KEY = "hrt-meow-data";
export interface HRTData {
  injectableEstradiol?: {
    type: InjectableEstradiols;
    method: InjectionMethod;
    dose: number;
    unit: DosageUnits;
    frequency: string;
  };
  oralEstradiol?: {
    type: OralEstradiols;
    method: OralMethod;
    dose: number;
    unit: DosageUnits;
    frequency: string;
  };
  antiandrogen?: {
    type: Antiandrogens;
    dose: number;
    unit: DosageUnits;
    frequency: string;
  };
  bloodTests: BloodTest[];
  dosageHistory: DosageHistoryEntry[];
}
