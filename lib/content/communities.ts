/**
 * The 29 Autonomous Communities of Ikeduru LGA, with their traditional
 * rulers (Igwe/Eze titleholders).
 *
 * SOURCE: Provided directly to Okeys Ononiwu Consulting by IEDF, July 2026.
 * Per Content Outline Section 3, this is civic/place content requiring a
 * named source — content owner is IEDF; treat as authoritative pending
 * any future corrections from IEDF or LGA records.
 *
 * Two minor transcription notes from the original source list:
 * - Entry 19 ("Nneise") was unnumbered/unlabeled in the source and has
 *   been inferred from context ("Nneise Autonomous Community (Ugirike)").
 * - Entry 26 ("Umuofor") had a stray "27." fragment merged into the
 *   ruler's title in the source; cleaned up here as
 *   "Ofo I of Umuofor" continuing the ruler's full title.
 * If either inference is incorrect, please flag for correction.
 */

export type AutonomousCommunity = {
  order: number;
  name: string;
  ruler: string;
  /** Parenthetical location/kingdom context from the source, where given */
  context?: string;
  note?: string;
};

export const autonomousCommunities: AutonomousCommunity[] = [
  { order: 1, name: "Abazu", ruler: "HRH Eze (Dr.) Oliver Ubaferem Njoku, JP", context: "Akabo" },
  { order: 2, name: "Akabo", ruler: "HRM Eze John Obiukwu Njoku-Nwansi III" },
  { order: 3, name: "Amaeke", ruler: "HRH Eze Festus Osuji, Amaeke Autonomous Community", context: "Inyishi" },
  { order: 4, name: "Amaimo", ruler: "HRH Eze G.N. Nwebo, Duru Imo II of Amaimo Ancient Kingdom" },
  { order: 5, name: "Amakohia", ruler: "HRH Eze I.U. Alaribe" },
  { order: 6, name: "Amatta", ruler: "HRH Eze John Onuekwusi Ohakwere II" },
  { order: 7, name: "Asaa", ruler: "HRH Eze Vitus Kasarachi", context: "Ngugo" },
  { order: 8, name: "Atta", ruler: "HRH Eze Geo Anika, Umunnawuike I of Atta Ancient Kingdom" },
  { order: 9, name: "Atta West", ruler: "HRH Eze Ben Udenenwu, Olu-Oha I Atta, Atta West/Atta I", context: "Atta" },
  { order: 10, name: "Avuvu", ruler: "HRH Eze Francis Anukwu" },
  { order: 11, name: "Awo Ohi-Dim", ruler: "HRH Engr. Noel C. Chukwunenye", context: "Atta" },
  { order: 12, name: "Ebikoro", ruler: "HRH Eze Marcel Egemonu, Ebi I of Ebikoro", context: "Uzoagba" },
  { order: 13, name: "Ezenomi", ruler: "HRH Eze Herbert Ngozi Akalugwu, Ezurume I of Ezenomi Autonomous Community", context: "Uzoagba" },
  { order: 14, name: "Eziama", ruler: "Late — no successor currently" },
  { order: 15, name: "Iho-Dimeze", ruler: "HRM Eze (Dr.) Martin Chieze Amaku, JP, Dimeze II of Iho Dimeze Ancient Kingdom" },
  { order: 16, name: "Ikembara", ruler: "HRH Eze Francis Onuoha, Mbara II of Ikembara", note: "Yet to receive staff of office" },
  { order: 17, name: "Inyishi", ruler: "HRH Eze Andrew Osuji, Duru III of Inyishi" },
  { order: 18, name: "Ngugo", ruler: "HRH Eze Polycarp Anugwo, Obaire I of Ngugo Obaire" },
  { order: 19, name: "Nneise", ruler: "HRH Eze Levi Ifeanyichukwu Ezeala, Ike Nwe Ike I of Nneise Autonomous Community", context: "Ugirike" },
  { order: 20, name: "Obodo", ruler: "HRH Eze Victor Achionye, Eze Udo I of Obodo Autonomous Community", context: "Amaimo" },
  { order: 21, name: "Okwu", ruler: "HRH Eze T.N.K. Ajugweogu" },
  { order: 22, name: "Owu-Amakohia/Owubinaubi", ruler: "HRH Engr. Ben I.K. Nwaneri, Ubi I of Owubinaubi/Owu-Amakohia", context: "Amakohia" },
  { order: 23, name: "Owuala Avuvu", ruler: "HRH Eze Donatus Eze I of Owuaa Avuvu II", context: "Avuvu" },
  { order: 24, name: "Ugirike", ruler: "HRH Eze Dr. Emmanuel Nwigwe, Ike I of Ugiri-Ike" },
  { order: 25, name: "Umudim", ruler: "HRH Eze H.A.W. Ebirim, Dim I of Umudim" },
  { order: 26, name: "Umuofor", ruler: "HRH Eze Dr. Collins Otumbadi Onuoha, Ofo I of Umuofor", context: "Amaimo" },
  { order: 27, name: "Umuonyeukwu", ruler: "HRH Eze Ifeanyichukwu Egeolu, Duruchiukwu I of Umuonyeukwu", context: "Umudim" },
  { order: 28, name: "Umuri", ruler: "HRH Eze (Dr.) P.N. Njoku, Eze Uri II of Umuri Autonomous Community", context: "Amaimo" },
  { order: 29, name: "Uzoagba", ruler: "HRH Eze Engr. Dr. Franklyn Akakuru Dabrinze, Duruaku IV of Uzoagba Ancient Kingdom" },
];
