export const MailAdress: string = "kontakt@gradulator.de"

const MailSubjectMissing: string = "Mein Studiengang fehlt"
const MailTextMissing: string = "Hallo, mein Studiengang fehlt. Bitte fügt DEIN STUDIENGANG hinzu."

const MailSubjectError: string ="Fehler in der Berechnung"
const MailTextError: string = "Hallo, ich habe einen Fehler in der Berechnung festgestellt: %0D%0A %0D%0A Schilder deinen Fehler"


export const MailLink = `mailto:${MailAdress}?subject=${MailSubjectMissing}&body=${MailTextMissing}`
export const MailErrorCalculation = `mailto:${MailAdress}?subject=${MailSubjectError}&body=${MailTextError}`
export const TooltipEstimatedGrades: string = "Noten dieses Paketes wurden als `geschätzte Noten` gekennzeichnet und entsprechende Durchschnitte mit den Noten 1 (bestmöglich) und 4 (schlechtestmöglich) berechnet. Eine genauere Beschreibung kann im Footer gefunden werden."
export const TooltipNotComplete: string = "Einzelne Noten dieses Modules wurden nicht eingetragen. Folglich kann sich die Note des Paketes noch ändern. Trage eine Schätzung für die Note ein, um ein genaueres Ergebnis zu erhalten"
export const TooltipWertungspunkte: string = "Die Endnote setzt sich aus allen Modulnoten zusammen. Umso höher die Anzahl der berücksichtigten Wertungspunkte, umso aussagekräftiger ist der angezeigte Durchschnitt. Eine genauere Beschreibung kann im Footer gefunden werden."
export const TooltipECTS: string = "Nicht alle ECTS sind Durchschnittsrelevant. Folglich kann eine Abweichung zwischen den hier angezeigten und tatsächlich Abschlussrelevanten ECTS entstehen."
export const TooltipRemovedEmphasis: string = "Der Schwerpunkt wurde entfernt, da die Anzahl an benötigten Schwerpunkten bereits erreicht und dieser gemessen an der Gewichtung am wenigsten abgeschlossen ist. Wenn du deinen Durchschnitt mit diesem Schwerpunkt berechnen möchtest, passe deine Noteneingabe entsprechend an."
export const ToolTipRemovedElevtive: string = "Wenn die für ein Wahlpflichtfacht benötigte Anzahl an Note überschritten wird, so werden die schlechtesten der vorhandenen Noten entfernt. Sollte die Note des Wahlpflichtfachs mit anderen Noten berechnet werden, muss die Eingabe entsprechend angepasst werden."


// Degree Creator
export const ToolTipNameOrWeightMissingEmphasis: string = "Bitte gebe erst einen Name und eine Gewichtung für den Schwerpunkt an."
export const ToolTipNameOrWeightMissingExamPackage: string = "Bitte gebe erst einen Name und eine Gewichtung für die Modulprüfung an."
export const ToolTipNameOrWeightMissingElevative: string = "Bitte gebe erst Name, Gewichtung und die benötigte Anzahl an."
export const ToolTipExamValuesMissing: string = "Bitte gebe erst Name, Prüfungsnummer, ECTS und Semester an."
export const ToolTipExamPackageValuesMissing: string = "Bitte gebe erst Name und Gewicht an."

export const ToolTipSaveDegreeCreator:string = "Die bisherigen Eingaben in einer lokalen Datei speichern, um zu einem anderen Zeitpunkt daran weiterzuarbeiten"
export const ToolTipUploadDegreeCreator: string = "Datei hochladen um an an einem Zwischengespeicherten Studiengang weiterzuarbeiten"

export const ToolTipFirstStep: string ="Bitte speichere erst alle erstellten Prüfungen."
export const ToolTipSecondStep: string= "Bitte speichere erst alle erstellten Modulprüfungen"