const MailAdress: string = "MAILADRESSE"

const MailSubjectMissing: string = "MAIL TITEL"
const MailTextMissing: string = "MAIL BODY"

const MailSubjectError: string ="MAIL ERROR"
const MailTextError: string = "Mail ERROR"


export const MailLink = `mailto:${MailAdress}?subject=${MailSubjectMissing}&body=${MailTextMissing}`
export const MailErrorCalculation = `mailto:${MailAdress}?subject=${MailSubjectError}&body=${MailTextError}`
export const TooltipEstimatedGrades: string = "Noten dieses Paketes wurden als `geschätzte Noten` gekennzeichnet und entsprechende Durchschnitte mit den Noten 1 (bestmöglich) und 4 (schlechtestmöglich) berechnet. Eine genauere Beschreibung kann im Footer gefunden werden."
export const TooltipNotComplete: string = "Einzelne Noten dieses Modules wurden nicht eingetragen. Folglich kann sich die Note des Paketes noch ändern. Trage eine Schätzung für die Note ein, um ein genaueres Ergebnis zu erhalten"
export const TooltipWertungspunkte: string = "Die Endnote setzt sich aus allen Modulnoten zusammen. Umso höher die Anzahl der berücksichtigten Wertungspunkte, umso aussagekräftiger ist der angezeigte Durchschnitt. Eine genauere Beschreibung kann im Footer gefunden werden."
export const TooltipECTS: string = "Nicht alle ECTS, die für den Abschluss benötigt werden, werden durch für den Durchschnitt relevante Prüfungsleistungen erreicht."
export const TooltipRemovedEmphasis: string = "Der Schwerpunkt wurde entfernt, da die Anzahl an benötigten Schwerpunkten bereits erreicht und dieser gemessen an der Gewichtung am wenigsten abgeschlossen ist. Wenn du deinen Durchschnitt mit diesem Schwerpunkt berechnen möchtest, passe deine Noteneingabe entsprechend an."