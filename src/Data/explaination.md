<h1>Erklärung der Datenstruktur</h1>

Jeder Studiengang besteht aus folgenden drei Komponenten
<li> Allgemeinen Informationen
<li> Die einzelnen Prüfungen
<li> Die Modulprüfungen

<h1>Allgemeine Informationen</h1>

```
    name: string,
    beta?: boolean,
    ects: number,
    spo?: number,
    weight: number,
    required_emphasis: number,
    emphasis: Emphasis[] | null,
    semesterChoices?: Object,
    elevtive?: Electives[]
```

**name** -> Name des Studiengangs

**beta** -> Legt fest, ob sich der Studiengang in einer BETA-Version befindet

**ects** -> Anzahl an Abschlussrelevanten ECTS. Wird berechnet, indem von allen ECTS aus dem Hauptstudium die ECTS abgezogen werden, welche keine Auswirkung auf den Schnitt haben (vgl. Praxissemester und Studium Generale bei WIN)

**weight** -> Anzahl an Gesamtgewichtung aller Modulprüfungen, kann typischerweise in der Tabelle der Modulprüfungen gefunden werden

**required_emphasis** -> Anzahl an Schwerpunkten, welche abgeschlossen werden müssen. Sollten keine Schwerpunkte vorhanden sein = 0

**emphasis** -> Hier werden alle Schwerpunkte festgelegt (Genauere Beschreibung Unterkapitel Schwerpunkte)

**semesterChoices** -> Normalerweise werden die einzelnen Prüfungen nach Semestern angezeigt. Sollte jedoch Prüfungen in mehreren Modulen unterschiedlicher Semester absolviert werden können können diese als Semester Choice angelegt werden.
Hierfür wird an der einzelnen Prüfung die ID angegeben und dieser ID ein Name durch die Semester Choices gegeben.

`
{
    1: Choice 1,
    2: Choice 2
}
`

**elevtive** -> Hier werden alle Wahlfächer festgelegt (Genauere Beschreibung Unterkapitel Wahlfächer)


<h2>Schwerpunkte</h2>

```
    ids: number[],
    name: string,
    multipleGrades?: boolean,
    weight?: number,
    emphasisid: number,
```

**ids** -> Alle Modulprüfungen (Nicht einzelne Prüfungen), welche für den Schwerpunkt benötigt werden

**name** -> Name des Schwerpunkts

**multipleGrades** -> Bei Studiengängen wie WIN ist es so, dass die Noten eines Schwerpunkts zu einer Note für den gesammten Schwerpunkt zusammengefasst werden.
Soll dies nicht erfolgen und die Noten der einzelnen Modulprüfungen angezeigt werden muss dieser Parameter auf true gesetzt werden. Eine Weight wird dann nicht benötigt.

**weight** -> Gewichtung des Schwerpunkts

**emphasisid** -> Unique ID für den Schwerpunkr


<h2>Wahlfächer</h2>

```
    ids?: number[],
    required?: number,
    requiredEcts?: number,
    examid: number,
    emphasisid?: number,
    emphasis_elevtive?: boolean,
    elevative_elevative?: boolean,
    multiOption?: boolean,
    options?: AlternativeElectives[]
    choiseID?: number
```

**ids** -> Alle Prüfungsnummern (Nicht Modulprüfungsnummern), welche für das Wahlfach benötigt werden

**required** -> Anzahl an benötigten Prüfungen für das Wahlfach 

**requiredEcts** -> In einigen Fällen wird nicht eine Anzahl an Prüfungen, sondern eine gewisse Anzahl an ECTS benötigt. Ist dies der Fall hierfür einfach die ECTS eintragen und 
für required nichts eintragen.
Wichtig: Aktuell wird die Kombination requiredECTS und multiOption nicht unterstützt. Wenn dies benötigt wird muss dies erst noch hinzugefügt werden. ChoiseID wird hingegen unterstützt.

**examid** -> Nummer der Modulprüfung für dieses Wahlfach (Das Wahlfach muss im Gegensatz zum Schwerpunkt ebenfalls als Modulprüfung angelegt werden)

**emphasisid** -> Sollte das Wahlfach ein Teil eines Schwerpunktes sein, muss hier die emphasisid des Schwerpunktes angegeben werden

**emphasis_elevtive** -> Sollte das Wahlfach ein Teil eines Schwerpunktes sein, muss dieser Parameter `true` gesetzt werden

**multiOption** -> Das ist der Fancy Stuff. In den meisten Fällen ist es so, dass aus einer Menge von z.B. 5 Fächern eines abgeschlossen werden kann. Sollte es der Fall sein, dass einzelne Prüfungen für unterschiedliche Wahlfächer genutzt werden können muss dieser Parameter auf `true` gesetzt werden. 
Beachte jedoch, dass multiOption nur auf `true` gesetzt wird, wenn die Wahlfächer nicht die gleichen Prüfungen zur Auswahl haben.

Folgendes Beispiel ist multiOption = `false`:
```
Wahlfach 1: [Prüfung A, Prüfung B, Prüfung C]

Wahlfach 2: [Prüfung A, Prüfung B, Prüfung C]

Wahlfach 3: [Prüfung A, Prüfung B, Prüfung C]
```


Folgendes Beispiel ist jedoch multiOption = `true`, da die Wahlfächer unterschiedliche Prüfungen haben:
```
Wahlfach 1: [Prüfung A, Prüfung B, ]

Wahlfach 2: [Prüfung B, Prüfung C, Prüfung D]

Wahlfach 3: [Prüfung C, Prüfung D]

Wahlfach 4: [Prüfung A, Prüfung D]
```

**choiseID** -> Sollten mehrere Wahlfächer über die gleichen Prüfungen absolviert werden können (unabhängig von multiOption `true` / `false`) kann über die choiseID festgelegt werden, dass diese Wahlfächer gemeinsam beachtet werden, indem jedem die gleiche choiseID gegeben wird.

**options** -> Sollte ein Wahlfach über mehrere Möglichkeiten erledigt werden können 

```
entweder

1 aus [A, B, C]

1 aus [D, E, F]
```

können alle Optionen als options gesetzt werden. Sollte dies der Fall sein besteht eine Option aus 

```
{
    ids: [],
    required: 2,
    optionID 1: 
}
```

und die allgemein Felder ids und required werden nicht gesetzt. Auch innerhalb der Optionen kann eine **optionID** gesetzt werden. Diese bedeutet, dass alle mit dieser ID erfüllt sein müssen, um das Wahlfach abzuschließen.

Beispiel:

```
entweder
1 aus [A, B, C]

oder 

1 aus [D, E, F]
und 
1 aus [G, H, I]
```

in oberem Beispiel müsste für die letzten zwei eine choiseID gesetzt werden.

<h1>Prüfungen</h1>

```
    semester?: number,
    ects: number,
    weight: number,
    name: string,
    packageid?: number,
    emphasisid?: number,
    semester_choise?: number,
    packageOptions?: number[],
    ignored?: boolean,
```

**Semester** -> Semester, in dem die Prüfung abgeschlossen wird

**semester_choise** -> Sollte eine Prüfung nicht klar einem Semester zugeordnet werden können kann sie einem Semester_Choise zugeordnet werden. Die Namen der Choises werden über die allgemeinen Informationen festgelegt.

**ects** -> ECTS der Prüfung

**weight** -> Gewichtung der Prüfung innerhalb der Modulprüfung

**name** -> Name der Prüfung

**packageid** -> ID der Modulprüfung, welcher diese Prüfung zugeordnet ist.

**emphasisid** -> ID des Schwerpunkts, welchem diese Prüfung zugeordnet ist.

**packageOptions** -> Sollte diese Prüfung mehreren Wahlfächern zugeordnet werden können werden durch die packageOptions in einer Liste alle IDs der Möglichkeiten gegeben. Wenn die packageOptions gesetzt sind darf die packageId nicht gesetzt werden. 

**ignored** -> Ob die Prüfung auf der Eingabeseite angezeigt werden soll.

<h2>Modulprüfungen</h2>

```
    name: string,
    weight: number,
    required: number[],
    ignored?: true
```

**name** -> Name der Modulprüfung

**weight** -> Gewichtung der Modulprüfung

**required** -> IDs der benötigten Prüfungen

**ignored** -> Ob die Modulprüfung ignoriert werden soll oder nicht.