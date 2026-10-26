/**
 * The 29 Autonomous Communities of Ikeduru LGA, with their traditional
 * rulers (Igwe/Eze titleholders).
 *
 * SOURCE: Provided directly to Okeys Ononiwu Consulting by IEDF, July 2026;
 * reviewed and corrected by IEDF, 26 October 2026. Per Content Outline
 * Section 3, this is civic/place content requiring a named source — content
 * owner is IEDF; treat as authoritative pending any future corrections from
 * IEDF or LGA records.
 *
 * 26 Oct 2026 corrections: Akabo (new Eze), Atta West (surname), Ikembara
 * (surname), Owalla-Avuvu (community name; now vacant), Amaimo and Uzoagba
 * (now vacant), "Eze" added to Awo Ohi-Dim and Owu-Amakohia titles, and
 * titles shortened to IEDF's approved wording. All earlier transcription
 * queries (Nneise, Umuofor) confirmed by IEDF.
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
  { order: 2, name: "Akabo", ruler: "HRM Eze Barr. Evans Nwansi" },
  { order: 3, name: "Amaeke", ruler: "HRH Eze Festus Osuji", context: "Inyishi" },
  { order: 4, name: "Amaimo", ruler: "Vacant (late Eze, no successor yet)" },
  { order: 5, name: "Amakohia", ruler: "HRH Eze I.U. Alaribe" },
  { order: 6, name: "Amatta", ruler: "HRH Eze John Onuekwusi Ohakwere II" },
  { order: 7, name: "Asaa", ruler: "HRH Eze Vitus Kasarachi", context: "Ngugo" },
  { order: 8, name: "Atta", ruler: "HRH Eze Geo Anika, Umunnawuike I of Atta Ancient Kingdom" },
  { order: 9, name: "Atta West", ruler: "HRH Eze Ben Udeneho, Olu-Oha I Atta", context: "Atta" },
  { order: 10, name: "Avuvu", ruler: "HRH Eze Francis Anukwu" },
  { order: 11, name: "Awo Ohi-Dim", ruler: "HRH Eze Engr. Noel C. Chukwunenye", context: "Atta" },
  { order: 12, name: "Ebikoro", ruler: "HRH Eze Marcel Egemonu, Ebi I of Ebikoro", context: "Uzoagba" },
  { order: 13, name: "Ezenomi", ruler: "HRH Eze Herbert Ngozi Akalugwu, Ezurume I of Ezenomi", context: "Uzoagba" },
  { order: 14, name: "Eziama", ruler: "Vacant (late Eze, no successor yet)" },
  { order: 15, name: "Iho-Dimeze", ruler: "HRM Eze (Dr.) Martin Chieze Amaku, JP, Dimeze II of Iho Dimeze Ancient Kingdom" },
  { order: 16, name: "Ikembara", ruler: "HRH Eze Francis Agim, Mbara II of Ikembara", note: "Yet to receive staff of office" },
  { order: 17, name: "Inyishi", ruler: "HRH Eze Andrew Osuji, Duru III of Inyishi" },
  { order: 18, name: "Ngugo", ruler: "HRH Eze Polycarp Anugwo, Obaire I of Ngugo Obaire" },
  { order: 19, name: "Nneise", ruler: "HRH Eze Levi Ifeanyichukwu Ezeala, Ike Nwe Ike I of Nneise", context: "Ugirike" },
  { order: 20, name: "Obodo", ruler: "HRH Eze Victor Achionye, Eze Udo I of Obodo", context: "Amaimo" },
  { order: 21, name: "Okwu", ruler: "HRH Eze T.N.K. Ajugweogu" },
  { order: 22, name: "Owu-Amakohia/Owubinaubi", ruler: "HRH Eze Engr. Ben I.K. Nwaneri, Ubi I of Owubinaubi/Owu-Amakohia", context: "Amakohia" },
  { order: 23, name: "Owalla-Avuvu", ruler: "Vacant (late Eze, no successor yet)", context: "Avuvu" },
  { order: 24, name: "Ugirike", ruler: "HRH Eze Dr. Emmanuel Nwigwe, Ike I of Ugiri-Ike" },
  { order: 25, name: "Umudim", ruler: "HRH Eze H.A.W. Ebirim, Dim I of Umudim" },
  { order: 26, name: "Umuofor", ruler: "HRH Eze Dr. Collins Otumbadi Onuoha, Ofo I of Umuofor", context: "Amaimo" },
  { order: 27, name: "Umuonyeukwu", ruler: "HRH Eze Ifeanyichukwu Egeolu, Duruchiukwu I of Umuonyeukwu", context: "Umudim" },
  { order: 28, name: "Umuri", ruler: "HRH Eze (Dr.) P.N. Njoku, Eze Uri II of Umuri", context: "Amaimo" },
  { order: 29, name: "Uzoagba", ruler: "Vacant (late Eze, no successor yet)" },
];
