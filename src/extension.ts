"use strict";

import * as vscode from "vscode";

import { parse } from "node-html-parser";

let links: vscode.QuickPickItem[] = [];

let gw_links: any[] = [
  { label: 'Keramik', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/keramik' },
  { label: 'Teil- / Vollprothesen', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/prothesen' },
  { label: 'Provis. Zahnersatz', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/provis_zahnersatz' },
  { label: 'Verblendungen', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/verblendungen' },
  { label: 'Vollkeramik', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/vollkeramik' },
  { label: 'Zahnfarbene Füllungen', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/zahnfarbene_fuellungen' },
  { label: 'Zirkoniumdioxid', detail: '/health/dental/gw_dental/aesthetik/aesthetisches_material/zirkoniumdioxid' },

  { label: 'Home-Bleaching', detail: '/health/dental/gw_dental/aesthetik/bleaching/homebleaching' },
  { label: 'In-Office-Bleaching', detail: '/health/dental/gw_dental/aesthetik/bleaching/inoffice' },
  { label: 'Internes Bleaching', detail: '/health/dental/gw_dental/aesthetik/bleaching/internes' },
  { label: 'Verfärbungen vorbeugen', detail: '/health/dental/gw_dental/aesthetik/bleaching/vorbeugung' },
  { label: 'Was ist Bleaching?', detail: '/health/dental/gw_dental/aesthetik/bleaching/was_ist_bleaching' },
  { label: 'Was muss beachtet werden?', detail: '/health/dental/gw_dental/aesthetik/bleaching/was_muss_beachtet' },
  { label: 'Welche Formen gibt es?', detail: '/health/dental/gw_dental/aesthetik/bleaching/welche_formen' },
  { label: 'Wie hell werden die Zähne?', detail: '/health/dental/gw_dental/aesthetik/bleaching/wie_hell' },
  { label: 'Wie lange bleiben die Zähne hell?', detail: '/health/dental/gw_dental/aesthetik/bleaching/wie_lange_hell' },

  { label: 'Alternativen', detail: '/health/dental/gw_dental/aesthetik/veneers/alternativen' },
  { label: 'Andere Lösung bevorzugen?', detail: '/health/dental/gw_dental/aesthetik/veneers/andere_loesung' },
  { label: 'Behandlung', detail: '/health/dental/gw_dental/aesthetik/veneers/behandlung' },
  { label: 'Einsatzmöglichkeiten', detail: '/health/dental/gw_dental/aesthetik/veneers/einsatzmoeglichkeiten' },
  { label: 'Was sind Veneers?', detail: '/health/dental/gw_dental/aesthetik/veneers/was_sind_veneers' },


  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/cmd/behandlung' },
  { label: 'Diagnose', detail: '/health/dental/gw_dental/behandlung/cmd/diagnose' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/cmd/prognose' },
  { label: 'Selbsthilfe', detail: '/health/dental/gw_dental/behandlung/cmd/selbsthilfe' },
  { label: 'Symptome', detail: '/health/dental/gw_dental/behandlung/cmd/symptome' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/cmd/ursachen' },
  { label: 'Vorsorge', detail: '/health/dental/gw_dental/behandlung/cmd/vorsorge' },
  { label: 'Was ist eine CMD?', detail: '/health/dental/gw_dental/behandlung/cmd/was_ist_cmd' },

  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/empfindliche_zaehne/behandlung' },
  { label: 'Eigene Maßnahmen', detail: '/health/dental/gw_dental/behandlung/empfindliche_zaehne/eigene_massnahmen' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/empfindliche_zaehne/ursachen' },
  { label: 'Vorbeugung', detail: '/health/dental/gw_dental/behandlung/empfindliche_zaehne/vorbeugung' },
  { label: 'Was sind empfindl. Zähne?', detail: '/health/dental/gw_dental/behandlung/empfindliche_zaehne/was_sind_empfl_zaehne' },

  { label: 'Inlays & Onlays', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays' },
  { label: 'Alternativen', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/alternativen' },
  { label: 'Begriffserklärung', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/begriffserklaerung' },
  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/behandlungsablauf' },
  { label: 'Gold-Inlays', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/goldinlay' },
  { label: 'Keramik-Inlays', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/keramikinlay' },
  { label: 'Kunststoff-Inlays', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/kunststoff' },
  { label: 'Füllungen - warum nötig? ', detail: '/health/dental/gw_dental/behandlung/fuellungen/inlays_onlays/warum_noetig' },

  { label: 'Plastische Füllungen', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen' },
  { label: 'Amalgam', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/amalgam' },
  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/behandlungsablauf' },
  { label: 'Glas-Ionomer-Zement', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/glasionomer' },
  { label: 'Kompomere', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/kompomere' },
  { label: 'Komposite', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/Komposit' },
  { label: 'Unterschiede zu Inlays/Onlays', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/unterschiede' },
  { label: 'Füllungen - warum nötig?', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/wann_noetig' },
  { label: 'Begriffserklärung', detail: '/health/dental/gw_dental/behandlung/fuellungen/plastische_fuellungen/Was_sind' },

  { label: 'Vergleich mit Alternativen', detail: '/health/dental/gw_dental/behandlung/implantate/alternativen' },
  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/implantate/behandlungsablauf' },
  { label: 'Einsatzmöglichkeiten', detail: '/health/dental/gw_dental/behandlung/implantate/einsatzmoeglichkeiten' },
  { label: 'Implantatpflege', detail: '/health/dental/gw_dental/behandlung/implantate/implantatpflege' },
  { label: 'Knochenaufbau', detail: '/health/dental/gw_dental/behandlung/implantate/knochenaufbau' },
  { label: 'Eventuelle Komplikationen', detail: '/health/dental/gw_dental/behandlung/implantate/komplikationen' },
  { label: 'Miniimplantate', detail: '/health/dental/gw_dental/behandlung/implantate/miniimplantate' },
  { label: 'Hinweise für die OP', detail: '/health/dental/gw_dental/behandlung/implantate/nach_behandlung' },
  { label: 'Zahnärztl. Nachsorge', detail: '/health/dental/gw_dental/behandlung/implantate/nachsorge' },
  { label: 'Nachteile', detail: '/health/dental/gw_dental/behandlung/implantate/nachteile' },
  { label: 'Voraussetzungen', detail: '/health/dental/gw_dental/behandlung/implantate/voraussetzungen' },
  { label: 'Vor- und Nachteile ', detail: '/health/dental/gw_dental/behandlung/implantate/vorteile' },
  { label: 'Was sind Implantate?', detail: '/health/dental/gw_dental/behandlung/implantate/was_ist_implantat' },

  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/karies/behandlung' },
  { label: 'Diagnose', detail: '/health/dental/gw_dental/behandlung/karies/diagnose' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/karies/prognose' },
  { label: 'Symptome', detail: '/health/dental/gw_dental/behandlung/karies/symptome' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/karies/ursachen' },
  { label: 'Vorsorge', detail: '/health/dental/gw_dental/behandlung/karies/vorsorge' },
  { label: 'Was ist Karies?', detail: '/health/dental/gw_dental/behandlung/karies/was_ist_karies' },


  { label: 'Zeitliche Abfolge', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/abfolge' },
  { label: 'Alternativen', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/alternativen' },
  { label: 'Bone-Spreading, Bone-Splitting', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/bonespreading' },
  { label: 'Distraktionsosteogenese', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/distraktion' },
  { label: 'Knochenblockmethode ', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/knochenblock' },
  { label: 'Aufbaumaterialien', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/materialien' },
  { label: 'Methoden', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/methoden' },
  { label: 'Tipps für die OP ', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/nach_op' },
  { label: 'Sinuslift', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/sinuslift' },
  { label: 'Socket Preservation', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/socket_preservation' },
  { label: 'Gründe für den Aufbau', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/warum' },
  { label: 'Wie bildet sich Knochen neu?', detail: '/health/dental/gw_dental/behandlung/knochenaufbau/wie_funktioniert' },

  { label: 'Behandlungsmöglichkeiten', detail: '/health/dental/gw_dental/behandlung/nervtote_zaehne/behandlungsmoeglichkeiten' },
  { label: 'Notwendigkeit der Behandlung', detail: '/health/dental/gw_dental/behandlung/nervtote_zaehne/notwendigkeit' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/nervtote_zaehne/prognose' },
  { label: 'Wie bemerkt man es?', detail: '/health/dental/gw_dental/behandlung/nervtote_zaehne/wie_bemerkt_man' },
  { label: 'Wodurch stirbt ein Zahn ab?', detail: '/health/dental/gw_dental/behandlung/nervtote_zaehne/wodurch_stirbt_zahn' },

  { label: 'Was ist Attachment?', detail: '/health/dental/gw_dental/behandlung/parodontitis/attachment' },
  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/parodontitis/behandlung' },
  { label: 'Diagnose', detail: '/health/dental/gw_dental/behandlung/parodontitis/diagnose' },
  { label: 'Geweberegeneration', detail: '/health/dental/gw_dental/behandlung/parodontitis/gewebe_regeneration' },
  { label: 'Gesteuerte Knochenregeneration', detail: '/health/dental/gw_dental/behandlung/parodontitis/kieferknochenaufbau' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/behandlung/parodontitis/kurzinfo' },
  { label: 'Nachsorge', detail: '/health/dental/gw_dental/behandlung/parodontitis/nachsorge' },
  { label: 'Periimplantitis', detail: '/health/dental/gw_dental/behandlung/parodontitis/periimplantitis' },
  { label: 'Risiken', detail: '/health/dental/gw_dental/behandlung/parodontitis/risiken' },
  { label: 'Symptome', detail: '/health/dental/gw_dental/behandlung/parodontitis/symptome' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/parodontitis/ursachen' },
  { label: 'Vorsorge', detail: '/health/dental/gw_dental/behandlung/parodontitis/vorsorge' },
  { label: 'Was ist eine Parodontitis?', detail: '/health/dental/gw_dental/behandlung/parodontitis/was_ist_parodontitis' },


  { label: 'Was sollte ich beachten?', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/beachten' },
  { label: 'Mögliche Beschwerden', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/beschwerden' },
  { label: 'Besonderheiten', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/besonderheiten' },
  { label: 'Gründe für die Entfernung', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/entfernung' },
  { label: 'Wann können sie bleiben?', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/wann_bleiben_sie' },
  { label: 'Wie werden sie entfernt?', detail: '/health/dental/gw_dental/behandlung/weisheitszaehne/wie_entfernt' },

  { label: 'Alternativen', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/alternativen' },
  { label: 'Was ist eine Wurzelkanalbehandlung?', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/begriffserklaerung' },
  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/behandlung' },
  { label: 'Nach der Behandlung', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/nach_behandlung' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/prognose' },
  { label: 'Symptome einer Zahnmarksentzündung', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/symptome' },
  { label: 'Warum ist eine Behandlung erforderlich? ', detail: '/health/dental/gw_dental/behandlung/wurzelkanalbehandlung/wann_angewendet' },

  { label: 'Alternativen', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/alternativen' },
  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/behandlung' },
  { label: 'Nach einer WSR', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/nach_wsr' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/prognose' },
  { label: 'Wann wird sie durchgeführt?', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/wann_durchgefuehrt' },
  { label: 'Was ist eine WSR?', detail: '/health/dental/gw_dental/behandlung/wurzelspitzenresektion/was_ist_wsr' },

  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/behandlung' },
  { label: 'Folgen', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/folgen' },
  { label: 'Nutzen der Behandlung', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/Nutzen' },
  { label: 'Hilfe bei psychischer Belastung', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/psychische_belastung' },
  { label: 'Symptome', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/symptome' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/Ursachen' },
  { label: 'Wann behandeln lassen?', detail: '/health/dental/gw_dental/behandlung/zaehneknirschen/wann_behandeln' },


  { label: 'Brücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken' },
  { label: 'Alternativen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/alternativen' },
  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/behandlungsablauf' },
  { label: 'Was ist eine Brücke?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/bruecke' },
  { label: 'Freiendbrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/freiend' },
  { label: 'Inlaybrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/inlaybruecke' },
  { label: 'Klebebrücken (Maryland-Br.)', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/maryland' },
  { label: 'Schwebebrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/schwebebruecke' },
  { label: 'Tangentialbrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/tangentialbruecke' },
  { label: 'Verblendbrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/verblend' },
  { label: 'Vollgussbrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/vollguss' },
  { label: 'Vollkeramikbrücken', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/vollkeramik' },
  { label: 'Voraussetzungen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/voraussetzungen' },
  { label: 'Festsitzender Zahnersatz', detail: '/health/dental/gw_dental/behandlung/zahnersatz/bruecken/was_ist' },

  { label: 'Implantate', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate' },
  { label: 'Vergleich mit Alternativen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/alternativen' },
  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/behandlungsablauf' },
  { label: 'Einsatzmöglichkeiten', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/einsatzmoeglichkeiten' },
  { label: 'Implantatpflege', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/implantatpflege' },
  { label: 'Knochenaufbau', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/knochenaufbau' },
  { label: 'Eventuelle Komplikationen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/komplikationen' },
  { label: 'Hinweise für die OP', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/nach_behandlung' },
  { label: 'Zahnärztl. Nachsorge', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/nachsorge' },
  { label: 'Nachteile', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/nachteile' },
  { label: 'Voraussetzungen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/voraussetzungen' },
  { label: 'Vor- und Nachteile', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/vorteile' },
  { label: 'Was sind Implantate?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/implantate/was_ist_implantat' },

  { label: 'Kronen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen' },
  { label: 'Behandlungsschritte', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/behandlung' },
  { label: 'Galvanokronen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/galvano' },
  { label: 'Qualitätsmerkmale', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/qualitaet' },
  { label: 'Verblendkronen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/verblend' },
  { label: 'Vollgusskronen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/vollguss' },
  { label: 'Vollkeramikkronen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/vollkeramik' },
  { label: 'Was sind Kronen?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/was_sind' },
  { label: 'Was sind Teilkronen?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/kronen/was_sind_teilkr' },

  { label: 'Vollprothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen' },
  { label: 'Probleme?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen/abhilfe' },
  { label: 'Behandlungsschritte', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen/behandlung' },
  { label: 'Eingewöhnungs-Tipps', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen/eingewoehung' },
  { label: 'Pflege-Tipps', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen/pflege' },
  { label: 'Begriffserklärung', detail: '/health/dental/gw_dental/behandlung/zahnersatz/prothesen/was_sind' },

  { label: 'Teilprothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen' },
  { label: 'Probleme?', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/abhilfe' },
  { label: 'Behandlungsschritte', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/behandlung' },
  { label: 'Drahtklammerprothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/drahtklammerprothesen' },
  { label: 'Eingewöhnungs-Tipps', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/eingewoehung' },
  { label: 'Geschiebeprothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/geschiebeprothesen' },
  { label: 'Modellgussprothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/modellgussprothesen' },
  { label: 'Pflege-Tipps', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/pflege' },
  { label: 'Telesk.-/Konuskr.prothesen', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/Teleskopprothesen' },
  { label: 'Begriffserklärung', detail: '/health/dental/gw_dental/behandlung/zahnersatz/teilprothesen/was_sind' },

  { label: 'Therapeutischer Zahnersatz', detail: '/health/dental/gw_dental/behandlung/zahnersatz/therapeutischer_zahnersatz' },

  { label: 'Behandlungsablauf', detail: '/health/dental/gw_dental/behandlung/zahnextraktion/behandlungsablauf' },
  { label: 'Gründe für das Entfernen', detail: '/health/dental/gw_dental/behandlung/zahnextraktion/gruende' },
  { label: 'Nach der Zahnentfernung', detail: '/health/dental/gw_dental/behandlung/zahnextraktion/nach_op' },

  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/behandlung' },
  { label: 'Diagnose', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/diagnose' },
  { label: 'Prognose', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/prognose' },
  { label: 'Symptome', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/symptome' },
  { label: 'Ursachen', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/ursachen' },
  { label: 'Vorsorge', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/vorsorge' },
  { label: 'Was ist eine Zahnfleischentzündung?', detail: '/health/dental/gw_dental/behandlung/zahnfleischentzuendung/zahnfleischentzuendung' },


  { label: 'Mögliche Alternativen', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/alternativen' },
  { label: 'Behandlung', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/behandlung' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/kurzinfo' },
  { label: 'Miller-Klassen', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/millerklassen' },
  { label: 'Was muss ich beachten?', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/nach_op' },
  { label: 'Nutzen der Zahnfleischkorrektur', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/nutzen' },
  { label: 'Erfolgsprognose', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/prognose' },
  { label: 'Zahnfleischrückgang vorbeugen', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/vorsorge' },
  { label: 'Begriffserklärung', detail: '/health/dental/gw_dental/behandlung/zahnfleischtransplantation/was_ist' },


  { label: 'Analgosedierung', detail: '/health/dental/gw_dental/infocenter/anaesthesie/analgosedierung' },
  { label: 'Lokalanästhesie', detail: '/health/dental/gw_dental/infocenter/anaesthesie/lokalanaesthesie' },
  { label: 'Vollnarkose', detail: '/health/dental/gw_dental/infocenter/anaesthesie/vollnarkose' },

  { label: 'Änderungen mitteilen', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/aenderungen_mitteilen' },
  { label: 'Allgemeinzustand', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/allgemeinzustand' },
  { label: 'Erbl. Veranlagung', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/erbl_veranlagung' },
  { label: 'Angaben im Fragebogen', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/fragebogen' },
  { label: 'Warum ist sie wichtig?', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/warum_wichtig' },
  { label: 'Was ist eine Anamnese?', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/was_ist_anamnese' },
  { label: 'Zahnhistorie', detail: '/health/dental/gw_dental/infocenter/anamnesebogen/Zahnhistorie' },

  { label: 'Kiefer', detail: '/health/dental/gw_dental/infocenter/anatomie/kiefer' },
  { label: 'Aufbau', detail: '/health/dental/gw_dental/infocenter/anatomie/kiefer/aufbau' },
  { label: 'Funktion', detail: '/health/dental/gw_dental/infocenter/anatomie/kiefer/funktion' },
  { label: 'Speichel', detail: '/health/dental/gw_dental/infocenter/anatomie/speichel' },
  { label: 'Zähne und Gebiss', detail: '/health/dental/gw_dental/infocenter/anatomie/zaehne_gebiss' },
  { label: 'Der Aufbau', detail: '/health/dental/gw_dental/infocenter/anatomie/zaehne_gebiss/aufbau' },
  { label: 'Zahnfleisch', detail: '/health/dental/gw_dental/infocenter/anatomie/zahnfleisch' },
  { label: 'Zahnhalteapparat', detail: '/health/dental/gw_dental/infocenter/anatomie/zahnhalteapparat' },
  { label: 'Erkrankungen', detail: '/health/dental/gw_dental/infocenter/anatomie/zahnhalteapparat/erkrankungen' },
  { label: 'Zahnhalteapparat: Funktionen', detail: '/health/dental/gw_dental/infocenter/anatomie/zahnhalteapparat/funktionen' },
  { label: 'Zunge', detail: '/health/dental/gw_dental/infocenter/anatomie/zunge' },

  { label: 'Funktionsanalyse: Geräte', detail: '/health/dental/gw_dental/infocenter/funktionsanalyse/geraete' },
  { label: 'Instrumentelle Funktionsanalyse', detail: '/health/dental/gw_dental/infocenter/funktionsanalyse/instrumentelle_funktionsanalyse' },
  { label: 'Kiefermodell', detail: '/health/dental/gw_dental/infocenter/funktionsanalyse/kiefermodell' },
  { label: 'Klinische Funktionsanalyse', detail: '/health/dental/gw_dental/infocenter/funktionsanalyse/klinische_funktionsanalyse' },
  { label: 'Parafunktionen', detail: '/health/dental/gw_dental/infocenter/funktionsanalyse/parafunktionen' },

  { label: 'Approximal-Plaque-Index', detail: '/health/dental/gw_dental/infocenter/kennwerte/approximal_plaque' },
  { label: 'Parodontaler Screeningindex', detail: '/health/dental/gw_dental/infocenter/kennwerte/parodontaler_screeningindex' },
  { label: 'Plaque-Index', detail: '/health/dental/gw_dental/infocenter/kennwerte/plaque_index' },
  { label: 'Sulcus-Blutungsindex', detail: '/health/dental/gw_dental/infocenter/kennwerte/sulcus_blutungsindex' },

  { label: 'Analog & Digital', detail: '/health/dental/gw_dental/infocenter/roentgen/analog_digital' },
  { label: 'Anwendung in der Zahnmedizin', detail: '/health/dental/gw_dental/infocenter/roentgen/anwendung' },
  { label: 'Funktionsweise', detail: '/health/dental/gw_dental/infocenter/roentgen/funktionsweise' },
  { label: 'Nötige Qualifikationen', detail: '/health/dental/gw_dental/infocenter/roentgen/qualifikationen' },
  { label: 'Risiken?', detail: '/health/dental/gw_dental/infocenter/roentgen/risiken' },
  { label: 'Techniken', detail: '/health/dental/gw_dental/infocenter/roentgen/techniken' },

  { label: 'Entstehung', detail: '/health/dental/gw_dental/infocenter/zahnbelaege/entstehung' },
  { label: 'Unterschiede', detail: '/health/dental/gw_dental/infocenter/zahnbelaege/unterschiede' },
  { label: 'Zahnverfärbungen', detail: '/health/dental/gw_dental/infocenter/zahnbelaege/zahnverfaerbungen' },

  { label: 'Zahngesunde Ernährung', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/faq' },
  { label: 'Flüssigkeitsaufnahme', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/fluessigkeitsaufnahme' },
  { label: 'Zahngesunde Lebensmittel', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/gesunde_lebensmittel' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/kurzinfo' },
  { label: 'Säureerosion', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/saeureerosion' },
  { label: 'Zahnschädigende Lebensmittel', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/schaedigende_lebensmittel' },
  { label: 'Was heißt zahngesund?', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/ernaehrung/zahngesund' },

  { label: 'Zahnpflegeprodukte', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte' },
  { label: 'Checkliste', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/checkliste' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/faq' },
  { label: 'Fluoridgel', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/fluoridgel' },
  { label: 'Für die Zunge', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/fuer_zunge' },
  { label: 'Kaugummis', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/kaugummis' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/kurzinfo' },
  { label: 'Mundspülungen', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/mundspuelungen' },
  { label: 'Spezialzahnseide', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/spezialzahnseide' },
  { label: 'Zahnhölzer', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/zahnhoelzer' },
  { label: 'Zahnseide', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/pflegeprodukte/zahnseide' },

  { label: 'Putztechniken', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken' },
  { label: 'Basstechnik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/basstechnik' },
  { label: 'KAI-Technik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/kaitechnik' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/kurzinfo' },
  { label: 'Massagetechnik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/massagetechnik' },
  { label: 'Rotationstechnik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/rotationstechnik' },
  { label: 'Schrubbtechnik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/schrubbtechnik' },
  { label: 'Stillmantechnik', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/putztechniken/stillmantechnik' },

  { label: 'Zähneputzen', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen' },
  { label: 'Checkliste', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/checkliste' },
  { label: 'Einstiegsalter', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/einstiegsalter' },
  { label: 'Putzen - elektr. Bürsten', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/elektrisch' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/faq' },
  { label: 'Hilfsmittel', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/hilfsmittel' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/kurzinfo' },
  { label: 'Putztechnik - allgemein', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/putztechnik' },
  { label: 'Selten putzen - Folgen', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/selten_putzen' },
  { label: 'Wann und wie oft?', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zaehneputzen/wann_wie_oft' },

  { label: 'Zahnbürsten', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten' },
  { label: 'Checkliste', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten/checkliste' },
  { label: 'Elektr. Zahnbürsten', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten/elektr_zahnbuersten' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten/faq' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten/kurzinfo' },
  { label: 'Die richtige Bürste', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnbuersten/richtige_buerste' },

  { label: 'Zahnpasten', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten' },
  { label: 'Checkliste', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten/checkliste' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten/FAQs' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten/kurzinfo' },
  { label: 'Die richtige Zahnpasta', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten/richtige_zahnpasta' },
  { label: 'Welche Zahnpasten gibt es?', detail: '/health/dental/gw_dental/vorsorge/eigene_vorsorge/zahnpasten/welche_zahnpasten' },


  { label: 'Zahnentwicklung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung' },
  { label: 'Kieferentwicklung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung/kieferentwicklung' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung/kurzinfo' },
  { label: 'Milchzähne', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung/milchzaehne' },
  { label: 'Zahnwechsel', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung/wechselgebiss' },
  { label: 'Zahnende Babys', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/entwicklung/zahnende_babys' },

  { label: 'Zahnärztl. Prophylaxe', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/faq' },
  { label: 'Fissurenversiegelung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/fissurenversiegelung' },
  { label: 'Fluoridierung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/fluoridierung' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/kurzinfo' },
  { label: 'Vorsorgeuntersuchungen', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/vorsorgeuntersuchungen' },
  { label: 'Zahnputzschulungen', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/zahnputzschulungen' },
  { label: 'Zahnreinigung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/kinderprophylaxe/zahnreinigung' },

  { label: 'Zahnarztbesuch', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnarztbesuch' },
  { label: 'FAQs', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnarztbesuch/faq' },
  { label: 'Tipps zur Gewöhnung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnarztbesuch/gewoehnung' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnarztbesuch/kurzinfo' },
  { label: 'Wann zum Zahnarzt?', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnarztbesuch/wann_zahnarzt' },

  { label: 'Zahnpflege', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege' },
  { label: 'Zahngesunde Ernährung', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/ernaehrung' },
  { label: 'FAQ', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/faq' },
  { label: 'Kinderzahnbürste', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/kinderzahnbuerste' },
  { label: 'Kurzinfo', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/kurzinfo' },
  { label: 'Nuckelkaries', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/nuckelkaries' },
  { label: 'Zahnpasta', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/pasta' },
  { label: 'Zähneputzen', detail: '/health/dental/gw_dental/vorsorge/kinderzaehne/zahnpflege/putzen' },


  { label: 'Fissurenversiegelung', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/fissurenversiegelung' },
  { label: 'Fluoridierung', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/fluoridierung' },
  { label: 'Kontrolltermine', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/kontrolltermine' },
  { label: 'Ablauf der Untersuchung', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/kontrolltermine/ablauf' },
  { label: 'Milchzähne', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/kontrolltermine/milchzaehne' },
  { label: 'Wie oft zur Kontrolle?', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/kontrolltermine/wie_oft_kontrolle' },

  { label: 'Prof. Zahnreinigung', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/prof_zahnreinigung' },
  { label: 'Detailinfos', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/prof_zahnreinigung/detailinfos' },
  { label: 'Was bewirkt die PZR?', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/prof_zahnreinigung/was_bewirkt_pzr' },
  { label: 'Wie verläuft die PZR?', detail: '/health/dental/gw_dental/vorsorge/prophylaxe/prof_zahnreinigung/wie_verlaeuft_pzr' },


  { label: 'Behandlungen', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/behandlungen' },
  { label: 'Empfindlicher Mund?', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/empfindlicher_mund' },
  { label: 'Ernährung', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/ernaehrung' },
  { label: 'Röntgen', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/roentgen' },
  { label: 'Vor d. Schwangerschaft ', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/vor_schwangerschaft' },
  { label: 'Zahnpflege', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/zahnpflege' },
  { label: 'Zahnschmerzen', detail: '/health/dental/gw_dental/vorsorge/schwangerschaft/zahnschmerzen' },


  { label: 'Mundschutz-Arten', detail: '/health/dental/gw_dental/vorsorge/sportschutz/mundschutz_arten' },
  { label: 'Pflege des Mundschutzes', detail: '/health/dental/gw_dental/vorsorge/sportschutz/pflege' },
  { label: 'Bei welchen Sportarten?', detail: '/health/dental/gw_dental/vorsorge/sportschutz/sportarten' },
  { label: 'Verletzungsarten', detail: '/health/dental/gw_dental/vorsorge/sportschutz/verletzungsarten' },
]

function registerSitemap() {
  const options: vscode.OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Open Sitemap HTML",
    filters: {
      "Text files": ["html"]
    }
  };

  vscode.window.showOpenDialog(options).then(value => {
    if (value !== null && value !== undefined) {
      parseSitemap(value[0].fsPath);
    }
  });
}

// Parse sitemap.xml
function parseSitemap(file: string) {
  vscode.workspace.openTextDocument(file).then(html => {
    const dom: any = parse(html.getText());
    const map: any[] = dom.querySelectorAll(".sitemap-site a"); // Stupid Typescript... Type Node *does* have attributes

    // clean old sitemap
    links = [];

    map.forEach((link: any) => {
      const path: string = getUrlPath(link.attributes.href);

      links.push({
        label: link.text,
        detail: buildLink(path)
      });

      if (getUrlPath(link.attributes.href).endsWith('health/dental/gw_dental')) {
        gw_links.forEach((link: any) => {
          links.push({
            label: link.label,
            detail: buildLink('scripts/show.aspx?content=' + link.detail)
          });
        });
      }
    });
  });
}

function buildLink(path: string) {
  let link: string = 'http:/' + path;
  link = link.replace(/\/+/, '/')
  return link.replace(/\/\.\//, '/'); // Fix stuff for a certain someone
}

function getUrlPath(href: string) {
  return href
    .replace(/^\.+\/?/, "")
    .replace(/https?:\/\/.*?\//, "");
}

// Insert link
function insertLink() {
  let editor = vscode.window.activeTextEditor;
  let label: string;

  if (links.length === 0) {
    registerSitemap();
  }

  vscode.window.showQuickPick(links).then(pick => {
    if (!pick || editor === undefined) {
      return;
    }

    if (pick.detail !== undefined && pick.detail.indexOf("gw_") >= 0) {
      label = links.find((l: any) => l.detail.indexOf("gw_") >= 0)["label"];
    } else {
      label = pick.label;
    }

    editor.edit(edit => {
      if (editor !== undefined) {
        editor.selections.forEach(selection => {
          /* I'm fucking sure it's not undefined by now */
          if (editor !== undefined) {
            edit.delete(selection);
            edit.insert(
              selection.start,
              `<a href="${pick.detail}" title="Gehe zu: ${label}">` +
              editor.document.getText(selection) +
              "</a>"
            );

            // remove annotation
            let start: vscode.Position = selection.end;
            let end: vscode.Position = editor.document.lineAt(start.line).range
              .end;
            let range: vscode.Range = new vscode.Range(start, end);
            let replacedText: string = editor.document
              .getText(range)
              .replace(/\s*\[.*?\]\s*/, " ")
              .replace(/\.\s+</, ".<")
              .replace(/>\s+</, "><");
            edit.replace(range, replacedText);
          }
        });
      }
    });
  });
}

// Replace link URL
function replaceLink() {
  let editor = vscode.window.activeTextEditor;
  let label: string;

  vscode.window.showQuickPick(links).then(pick => {
    if (!pick || editor === undefined) {
      return;
    }

    if (pick.detail !== undefined && pick.detail.indexOf("gw_") >= 0) {
      label = links.find((l: any) => l.detail.indexOf("gw_") >= 0)["label"];
    } else {
      label = pick.label;
    }

    editor.edit(edit => {
      if (editor !== undefined) {
        editor.selections.forEach(selection => {
          let start: vscode.Position = editor.document.lineAt(selection.start.line).range.start;
          let end: vscode.Position = selection.start;
          let range: vscode.Range = new vscode.Range(start, end);
          let replacedText: string = editor.document
            .getText(range)
            .replace(/(http:[^"]+)(((?!http).)*)$/, `${pick.detail}$2`)
            .replace(/(Gehe zu:[^"]+)(((?!Gehe zu:).)*)$/, `Gehe zu: ${label}$2`);
          edit.replace(range, replacedText);
        });
      }
    });
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("linq.registerSitemap", registerSitemap);
  vscode.commands.registerCommand("linq.insertLink", insertLink);
  vscode.commands.registerCommand("linq.replaceLink", replaceLink);
}

// this method is called when your extension is deactivated
export function deactivate() { }
