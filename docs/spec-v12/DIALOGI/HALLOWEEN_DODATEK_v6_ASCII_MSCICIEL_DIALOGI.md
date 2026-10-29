# HALLOWEEN — dodatek v6: czytelność ASCII, wejście Mściciela i dialogi

**Status:** roboczy materiał do implementacji w istniejącym projekcie, 29.10.2026. **Czytać łącznie z `HALLOWEEN_SPEC_v5_Codex.md`.**

## 0. Hierarchia informacji

1. **NOWE USTALENIE AUTORA** w tym dokumencie ma pierwszeństwo nad sprzecznym fragmentem v5; nie kasować innych scen lub endingów.
2. **TEKST ZAMÓWIONY** — sens, przekleństwa i żarty zamówione przez autora; interpunkcję można dostosować do nagrań. Oznaczone kwestie w większości przygotowano na podstawie mowy, a cytaty co do pojedynczego słowa wymagają odsłuchowej akceptacji.
3. **PROPOZYCJA** — moje uzupełnienie, niezatwierdzony jeszcze dialog albo liczba. Codex może wdrożyć jako edytowalny content, ale nie powinien przedstawiać go jako ostatecznej kanonicznej wersji scenariusza.
4. **OTWARTE** — nie wymyślać losu Alexa przez X i Salsy; ten wątek pozostaje do osobnego napisania przez autora.
5. **Nazwy:** `Aleks` (główny, KS, WASD); `Sandra` (strzałki); `Alex` (przez X) i `Salsa` występują później po cofnięciu czasu. Nie mieszać imion w identyfikatorach oraz UI. Gra: `Halloween`.

## 1. AUDYT AKTUALNEGO KODU — wymagana pierwsza czynność Codexa

Repozytorium nie zostało udostępnione do tej redakcji dokumentu — nie twierdzimy, że obecny kod został przetestowany. Codex musi przeczytać aktualne źródła i ustalić:

- jak powstaje świat 3D, scena prologu, cmentarz i wejście Mściciela, jakie są klucze zdarzeń/cutscenek oraz kamera;
- jak realizowany jest obecny ASCII: DOM, Canvas, render-to-texture, shader, shader atlasu, dobór glifów; nie zastępować systemu w ciemno;
- które lokacje są nieczytelne i czy problemem jest światło/kontrast, wielkość glifów, filtr, kamera, modele lub błąd działania;
- czy dialogi są już zapisane w JSON/TS i jak działa ich sekwencjonowanie, przełączanie postaci, stan misji oraz UI wyborów;
- czy dane sceny i dialogi są zapisane trwale, żeby nie mnożyć triggerów i nie resetować zapamiętanych odpowiedzi;
- przeprowadzić test sceny Mściciela i zebrać screen, stan obiektów i log wejścia w trigger.

**Nigdy nie udawać, że stan obecny został zweryfikowany, dopóki nie uruchomiono repo i nie wykonano testu.**

## 2. CZYTELNE ASCII 3D — wymagania i kolejność naprawy

**NOWE USTALENIE AUTORA:** część aktualnych miejsc wygląda zbyt niewyraźnie. Zachować bogatą, ciemną oprawę 3D w stylu ASCII; poprawić odczytywanie postaci, krzyży, grobów, dróg, interakcji, napisów i stref ataku. Nie wprowadzać płaskiego świata 2D.

### 2.1 Diagnostyka (przed zmianą algorytmu)

- Zrobić zrzuty 1366×768 i 1920×1080 w ciemnym cmentarzu, przy krzyżu, w domku, przy grobach, podczas pojawienia się Mściciela, w Goon Roomie i na arenie Toma. Wykonać wersję shader ASCII ON oraz podgląd surowego obrazu 3D OFF.
- Sprawdzić clipping czerni, mgłę, przypadkowe zlewanie się jasności ścian i postaci, zbyt grube/za drobne znaki, trzęsące się glify, zbyt daleki zoom i zbyt bliskie tło.
- Porównać każdą poprawkę w identycznej scenie i ujęciu; zachować przed/po (screeny). Nie oceniać wyłącznie po średnim FPS.

### 2.2 Reguły renderingu

- Priorytet sylwetek: Aleks, Sandra, Mściciel, Tom, Lila, przedmioty zadaniowe i czerwone telegraphy muszą być odróżnialne od tła także przy shaderze ASCII.
- Implementować wariant gradientu/glifów z wykorzystaniem informacji o luminancji i obrysie (krawędzie z obrazu 3D / depth/normal pass tylko gdy budżet pozwala). To **opcja techniczna do eksperymentów**, a nie gwarancja jakości.
- Pozwalać skorygować gamma/kontrast i próg ciemności **dla samej sceny**, bez wypłaszczania pełnego nocnego klimatu; miejscowe delikatne światło konturowe przy ważnej postaci, a nie pomarańczowe latarnie.
- `readable subject` jako priorytet: efekt ASCII dla ważnej sylwetki nie może znikać po zmianie rozdzielczości. Łączyć rozdzielczość 3D, rozmiar komórki ASCII i rozdzielczość HUD niezależnie.
- Utrzymywać stabilną siatkę glifów w pikselach ekranu, minimalizować migotanie znaku przy niewielkich zmianach jasności (próg/histereza do testowania); nie sztucznie stabilizować tak mocno, by pojawiały się smugi.
- Dialogi i napisy na grobach dostępne w osobnej ostrej warstwie UI, nie przepuszczane przez shader; napis w geometrii nagrobka może pozostać stylizowany, ale F/Enter uruchamia czytelny widok tekstu.
- Wskaźniki interakcji i ostrzeżenia bossów: dodatkowo obrys/kształt/symbol; nie polegać jedynie na czerwonym kolorze. UI standardowy tekst min. ~4,5:1 kontrastu, test na rozdzielczości laptopa.
- Ustawienia: `Styl ASCII` (wyraźny / kinowy), `Wielkość glifów`, `Kontrast sceny`, `Siła mgły` tylko w rozsądnym zakresie (bez rozjaśnienia horroru do dnia), `Zmniejsz migotanie`, `Rozmiar napisów`, `Redukcja drgań kamery`.

### 2.3 Optymalizacja bez zubożania wyglądu

- Ograniczać wewnętrzne piksele 3D i gęstość dalekich cząstek osobno od ostrego HUD i siatki finalnych glifów. Dynamiczne skalowanie z histerezą po pomiarze czasu klatki (bez ciągłego „pompowania” jakości).
- Powtarzane groby, kamienie, drzewa, pióra optymalizować `InstancedMesh`/łączeniem geometrii, nie spłaszczać świata. Wykonać pomiar draw calls, frame time CPU/GPU, liczby passów, alokacji i 1% low FPS.
- Nie obniżać czasu na reakcję przy 30 FPS i nie zmieniać kolizji w zależności od liczby klatek. Szczególnie cutscenki i dialogi mają działać przy 30 i 60 FPS.
- Straty jakości w trybie Low mogą dotyczyć tylko szczegółów tła i cząstek, **nie czytelności ważnych obiektów, napisów lub sygnałów ataku**.

**Źródła techniczne:** https://threejs.org/manual/pages/responsive.html ; https://threejs.org/docs/pages/InstancedMesh ; https://threejs.org/docs/pages/AsciiEffect.html ; https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum . Oficjalny `AsciiEffect` używa elementu HTML i opcja koloru ma koszt wydajnościowy, więc dla tej gry preferujemy shader GPU z v5, a nie powielanie DOM glifów.

## 3. AKT I — wejście Mściciela (P0: naprawa błędu obecnej sceny)

**NOWE USTALENIE AUTORA:** Mściciel ma być WYRAŹNIE WIDOCZNY na cmentarzu w chwili ujawnienia. Obecnie, zdaniem autora, jego model/postać jest niewidoczna lub widać ją dopiero po przejściu za cmentarz. To trzeba zdiagnozować i naprawić.

### Docelowy przebieg (bez zmiany głównej fabuły)

1. Aleks i Sandra mogą zakończyć wizytę przy grobie i próbę pomocy nieznajomemu w dowolnej kolejności; decyzję o kolejności podejmuje Aleks, Sandra go namawia.
2. Z chwilą ukończenia wymaganych zdarzeń: mrok gęstnieje, jeden niski dźwięk, kamera pokazuje **postać Mściciela w obrębie cmentarza lub czytelnie przy jego wyjściu** (nie gdzieś daleko poza mapą). Gracze widzą jego model i twarz/sylwetkę, zanim usłyszą polecenie.
3. Przez ~1–2 s nie pojawia się tekst z nakazem marszu, aby był czas spojrzeć; subtelna podświetlona krawędź/księżycowy rim light i stabilny kadr, a wejście kamery nie zasłaniają groby i drzewa.
4. Mściciel mówi do Aleksa i Sandry, grupa odrodzonych Gabrysia, Weroniki i Borisa wstaje, następuje wymiana zdań; **dopiero potem** Mściciel prowadzi ich **przed bramę cmentarza**, gdzie Aleks wybiera ofiarę.
5. Kamera wraca do sterowania, ale zadanie „Idź przed bramę” aktywuje się dopiero po pokazaniu i usłyszeniu Mściciela; marker prowadzi bezbłędną drogą. Nie teletransportować bez cutscenki.

### Co Codex musi sprawdzić na bugach

- spawn i pozycja transform (X/Y/Z, skala), aktywność obiektu, scena/warstwa i moment triggera; frustum, głębokość, occludery, culling, przezroczystość, render order;
- czy NPC istnieje, ale nie jest widoczny przez ASCII (test wyłączenia passu), czy kamera kadruje niewłaściwy punkt, czy model nie został wczytany;
- czy trigger przedwcześnie instruuje „idź za cmentarz” albo pomija cutscenkę; blokady zapisu i wielokrotnego wyzwolenia;
- logowanie `avengerSpawned`, `avengerInFrame`, `avengerIntroPlayed`, `gateObjectiveUnlocked`, `sacrificeChoiceOpen`;
- test akceptacyjny: Mściciel jest widoczny minimum kilka sekund w 1366×768 i 1920×1080, tekst jest czytelny, postacie nie mogą ominąć etapu przedwczesnym marszem.

### Proponowane krótkie kwestie

- `[TRIGGER, Mściciel widoczny]` Sandra: „Aleks… ty też widzisz tego gościa?”
- Aleks: „Widzę. I już go nie lubię.”
- Mściciel: „Nie odwracajcie wzroku. Właśnie zaczęliście się bawić.”
- Aleks: „Spierdalaj, gościu, stąd!” **(ustalona starsza kwestia, zachować)**.
- Sandra: „Aleks, nie dygaj. Będzie dobrze.” **(ustalona starsza kwestia)**.
- Mściciel: „Przed bramę. Tam zdecydujesz, kto zostaje.”

## 4. SYSTEM DIALOGÓW — nie tylko scenki filmowe

**NOWE USTALENIE AUTORA:** śmieszne, naturalne, krótkie dialogi pary podczas chodzenia, czytania grobów, wejścia do pomieszczeń, podnoszenia rekwizytów, rytuału i walk. Wypowiedzi mają komentować *rzeczywiste* wybory i nawiązywać do relacji bohaterów. Nie dodawać nowego żywego NPC bez osobnej zgody autora.

### Warunki systemowe

- `DialogueManager` data-driven, z zapisami `trigger`, `speaker`, `line`, `conditions`, `priority`, `cooldown`, `once`, `interruptible`, `choiceId`, `next`.
- Każda linia powinna mieć max 1–2 krótkie zdania (cel: ~2–5 s odczytu). Napisy poza shaderem ASCII; imię mówcy i ewentualny portret ASCII. Przed końcem ważnego dialogu zablokować przypadkowe przeskoczenie do walki.
- Dialogi tła mają cooldown i są wyciszane/odkładane podczas walk, minigier, intensywnego pościgu, czytania epitafium i wyborów na czas. Nie można nakładać wielu kwestii naraz.
- W scenach wyboru pokazywać intencję, **nie gotowy cytat**: `Powiedz coś miłego` / `Powiedz coś niemiłego`; po zatwierdzeniu odtwarzać pełną wypowiedź. Wyjątek: jeśli autor wyraźnie kazał wybierać konkretne słowo (Gabryś: „dziwko / szmato / suko”), submenu pokazuje te słowa.
- Presja czasu tam, gdzie pasuje: domyślnie 12 s na wybór tonacji lub ofiary po zakończeniu mówienia Mściciela; timer czytelny, dźwięki narastają. Na czytanie epitafium **brak limitu**; opcja wydłużonego czasu lub wyłączenia presji w ustawieniach. Brak wyboru nie może zablokować gry: `milczenie` lub bezpieczny fallback, nigdy przypadkowe poświęcenie osoby bez potwierdzenia.
- Współdzielone UI: Aleks porusza kursorem `W/S` + `F`, Sandra `↑/↓` + `Enter` tam, gdzie ma swój wybór. Inne przyciski z v5 pozostają; nie wymuszać jednoczesnych kombinacji powodujących keyboard ghosting.
- Nawet jeśli teksty nie są nagrane, muszą pojawiać się w napisach i pauzach kamery, ewentualnie z lekkimi dźwiękami znaków. Nie syntetyzować głosów rzeczywistych osób bez materiałów i zgody.
- Zapisywać `graveToneGabrys`, `gabrysInsult`, `graveToneBorys`, `graveToneWeronika`, `rescueOrder`, `buriedWho`, `trustAleks`, `trustSandra` i `visitedGrave` i wykorzystywać w późniejszych ripostach.

## 5. NOWE NAGROBKI I GAŁĘZIE — priorytet fabularny

### 5.1 Grób Gabrysia

**NOWE USTALENIE AUTORA — napis (zredagowana interpunkcja):**
> „Jakbyś umarł, Aleks zapomniałby o tobie po trzech sekundach.”

Stara kwestia o zapominaniu Sandry z quizu pozostaje istniejącą kwestią quizową, ale nie zastępuje nowego napisu na grobie Gabrysia.

**Wybór Aleksa po przeczytaniu:**
- UI: `[Powiedz coś miłego]` → **PROPOZYCJA** Aleks: „Głupi napis. Nawet po śmierci umiesz mnie wkurzyć. Ale pamiętam o tobie.” Sandra: „To chyba było miłe. Jak na ciebie.” Zapisać `graveToneGabrys=kind`.
- UI: `[Powiedz coś niemiłego]` → submenu `[dziwko] [szmato] [suko]`. **TEKST ZAMÓWIONY, wzór:** Aleks: „I co, Gabryś? Przeżyłem dłużej od ciebie, a ja o tobie, {wyzwisko}, nie zapomniałem.” Zapisać `graveToneGabrys=mean` i `gabrysInsult`.

**Po wskrzeszeniu — reakcja Gabrysia zależna od wyboru:**
- `mean` + `dziwko`: Gabryś: „Trzy sekundy minęły, dziwko, a dalej tu stoisz.”
- `mean` + `szmato`: Gabryś: „O, szmata pamięta. Cud większy niż moje wskrzeszenie.”
- `mean` + `suko`: Gabryś: „No patrz, suko, nawet mnie z grobu wyciągnąłeś.”
- `kind`: Gabryś: „Ty serio mnie pamiętasz? Dobra, to trochę mi głupio.”

**UWAGA:** Każda kwestia powrotna w tym akapicie jest PROPOZYCJĄ, nie dosłownym cytatem autora. Zachować również już ustaloną późniejszą mechanikę pogodzenia Gabrysia: Aleks twierdzi, że Chrupek jest lepszy od Lili i Areny, Sandra musi potwierdzić.

### 5.2 Grób Borysa

**NOWE USTALENIE AUTORA — napis:**
> „Młody, piękny milioner. Niestety milion go nie uratował przed śmiercią.”

**Propozycje dialogów przy grobie:**
- UI Aleksa lub wspólna scenka: `[Powiedz coś miłego]` → Sandra: „Milion czy nie milion, szkoda chłopa.” Aleks: „No. Tego nie da się odkupić.”
- UI: `[Powiedz coś niemiłego]` → Sandra: „Kurwa, renta? Przynajmniej ta milionowa renta mi przyszła, szlagier.” Aleks: „Co kurwa?”
  - **Do autoryzacji brzmienia:** użytkownik dyktował to na głos; słowo „szlagier/slajger” i składnia renty mogą być inaczej zamierzone. Zachować żart, nie traktować tej redakcji jako zapisu dosłownego.

**Po wskrzeszeniu — propozycje:**
- `mean` → Borys: „To nie renta, tylko inwestycja. Wy nawet po mojej śmierci nie rozumiecie rynku.”
- `kind` → Borys: „Jak już wróciłem, to może sprawdzimy, czy moje ETF-y też?”

**Motyw Borysa:** już istniejąca gra ETF i Tom Clicker; dodać krótkie nawiązania w tym samym segmencie, bez nowego, żywego NPC.

### 5.3 Grób Weroniki

**NOWE USTALENIE AUTORA — sens napisu; proponowana redakcja:**
> „Męczyła się na studiach i nawet nie zdążyła ich skończyć. Beka XD.”

**Dialogi przy grobie:**
- UI: `[Powiedz coś miłego]` → Aleks: „Szkoda, że nie doczekała końca studiów.” Sandra: „Przynajmniej nie musi już oglądać prowadzącego od matematyki.”
- UI: `[Powiedz coś niemiłego]` → Aleks: „Kurwa, i tak by tego roku nie zdała. Ha, ha, ha!” Sandra: „No, rel.”

**Po wskrzeszeniu — propozycje:**
- `mean` → Weronika: „Aleks, jeszcze jedno słowo, a wpiszę ci poprawkę z matematyki na wieczność.”
- `kind` → Weronika: „Dzięki, ale nawet śmierć nie zwolniła mnie z tego zaliczenia.”
- Dodatkowa krótka riposta po jej klątwie: Sandra: „Aleks, wiedźma. Mówiłam ci.”

### 5.4 „Sesja poprawkowa Weroniki” — dodatkowy motyw bez nowego NPC (PROPOZYCJA)

Aby Gabryś miał Goon Room, Borys ETF, a Weronika też coś własnego:
- Po quizie nr 3, na krótkim odcinku korytarza przed mówiącymi drzwiami zoo, przy ścianie stoi tablica `SESJA POPRAWKOWA — MATEMATYKA`. Nie ma nowego żywego nauczyciela. Może być tylko napis/projekcja i odtworzony z oddali anonimowy głos prowadzącego (opcjonalnie nawet bez głosu).
- 20–30 sekund **opcjonalnej**, łatwej minigry: dwa absurdalne zadania, np. „2 + 2 = ?” z poprawną matematycznie odpowiedzią, której system początkowo nie uznaje, i krótką animacją oblania. Następnie poprawka zaliczona po kliknięciu `ODWOŁANIE DO DZIEKANATU`.
- Jeśli gracze przy grobie okazali Weronice życzliwość, ukryta scena ma cieplejszą ripostę; jeśli się nabijali, pojawia się jej złośliwy komentarz.
- Nagrodą może być jednorazowa osłona przed niewielkim ciosem w walce — PROPOZYCJA do zatwierdzenia. Przedłużenie nie może blokować głównej fabuły. Nie zmieniać kolejności 3 pytań istniejącego quizu.

## 6. KRÓTKIE DIALOGI POMIĘDZY AKCJAMI — bank propozycji

Każda kwestia poniżej jest **PROPOZYCJĄ**, chyba że wskazano inaczej. Aktywować tylko przy podanym wydarzeniu, raz na obieg; łącznie 1–3 linie na moment. Nie puszczać wszystkich naraz.

| Trigger | Kwestie |
|---|---|
| `road.enter` | Sandra: „Nie mogłeś zaplanować zwykłego spaceru?” Aleks: „Mogliśmy. Ale tu chyba jest ciekawiej.” |
| `road.crows` | Sandra: „One coś jedzą.” Aleks: „Mam nadzieję, że nie to, co myślę.” |
| `grave.select_prompt` | Sandra: „No to kogo odwiedzamy?” Aleks: „Jak wybiorę źle, to się obrażą?” |
| `grave.positive` | Sandra: „Okej, to było nawet ludzkie.” Aleks: „Nie rozpowiadaj.” |
| `cross.first_seen` | Sandra: „Aleks, on się rusza!” Aleks: „No to chyba źle trafił z noclegiem.” |
| `cross.rescue_yes` | Sandra: „Dzięki. Dobra, szybko, zanim będzie za późno.” Aleks: „Tylko znajdźmy coś ostrego.” |
| `cross.rescue_later` | Sandra: „Aleks, on naprawdę nie może czekać!” Aleks: „Wiem. Zaraz tam wrócimy.” |
| `hut.enter` | Aleks: „Kto normalny trzyma nożyce obok trupów?” Sandra: „Kto normalny w ogóle tu wchodzi?” |
| `hut.scissors_taken` | Sandra: „Tylko nie zgub.” Aleks: „Pewnie się nam jeszcze przydadzą.” |
| `cross.warning_spoken` | Aleks: „Kim jest »on«?” Nieznajomy: „Nie… on wygląda…” [urwane przez osłabienie] |
| `cross.dies` | Sandra: „Nie zdążyliśmy.” Aleks: „Ale przynajmniej spróbowaliśmy.” |
| `avenger.appears` | Sandra: „Aleks… ty też to widzisz?” Aleks: „Aż za dobrze.” |
| `dead.rise` | Aleks: „Przecież kurwa oni nie żyją!” [KANON: istniejąca kwestia] Sandra: „No to im to powiedz.” |
| `sacrifice.timer_half` | Sandra: „Aleks, nie stój tak! On odlicza!” Aleks: „Ja wiem, kurwa!” |
| `sacrifice.self_selected` | Aleks: „Wybieram siebie. Zostaw ich.” [KANON] Sandra: „Ty szmato! Nie będziesz mi wybierał za mnie!” Aleks: „Nie patrz się, kurwa!” |
| `sacrifice.sandra_selected` | Sandra: „A wiesz co, Aleks? I tak nie chciałam być z tobą w związku.” [KANON] Aleks: „To mogłaś powiedzieć pięć minut wcześniej.” |
| `epitaph.start` | Tom: „Trzy wersy. Nie umiesz napisać? To nie odkopiesz.” Sandra: „On nawet po śmierci robi problemy.” |
| `epitaph.aleks_returns` | Aleks: „Z martwych wstałem jak Jezus Chrystus, szmato.” [KANON] Sandra: „To może teraz chociaż podziękuj?” |
| `goon.enter` | Aleks: „Co to, kurwa, za pokój?” Sandra: „Gabryś by powiedział, że jego.” |
| `quiz.trust_both_yes` | Sandra: „To chyba pierwszy raz, gdy się zgadzamy.” Aleks: „Nie przyzwyczajaj się.” |
| `quiz.trust_both_no` | Aleks: „Dobra, to chyba mamy problem.” Sandra: „Dopiero teraz zauważyłeś?” |
| `quiz.animal_disagree` | Sandra: „Nie. Wybieramy razem.” Aleks: „To po co dali nam dwa kursory?” |
| `quiz.chrupek` | Sandra: „Czy to naprawdę był najlepszy pomysł?” Aleks: „Zobaczysz przy bossie.” |
| `quiz.lila` | Sandra: „Ale ładny piesek.” Aleks: „Czemu on się tak na nas patrzy?” |
| `quiz.etf_start` | Aleks: „Borys by się tu odnalazł.” Sandra: „Byle tylko nie pożyczał od gołębia.” |
| `loan.approved` | Gołąb: „Dziesięć piór. Ani jednego mniej.” Aleks: „To nie pożyczka, to zadanie domowe.” |
| `zoo.enter` | Aleks: „Czemu tam jest pięć fok?” Sandra: „Bo ktoś uznał, że to będzie śmieszne.” |
| `zoo.aleks_seal` | Sandra: „Aleks? Ty… jesteś foką?” Aleks: „Arf. Kurwa, arf.” |
| `zoo.sandra_fail` | Sandra: „Muszę tu zostać do końca dnia.” Aleks: „Dobra, to sobie poscrolluję.” |
| `loop.back_to_pumpkin` | Sandra: „Przecież my tu już byliśmy.” Aleks: „Tylko że czegoś brakuje.” |
| `boss.ghosts_cheer` | Boris: „Rynek rośnie!” Weronika: „Oblałeś unik!” Gabryś: „Chrupek jest lepszy!” |
| `boss.debt_collector` | Gołąb: „Przypominam o zobowiązaniu.” Aleks: „Teraz? Przy tym wielkim żółwiu?!” |
| `boss.tom_reveal` | Aleks: „Mówiłem ci, żebyś przestała.” [KANON] Sandra: „Tom, Tom, Tom…” [KANON] |
| `ending.loop_reset` | Dynia: „Ostrzegałam was. Przecież mówiłam prawdę.” [propozycja rozwinięcia ustalonego sensu] |

## 7. LOGIKA WYBORÓW I ODPOWIEDZI (przykład struktury, nie kod produkcyjny)

```ts
// Proponowany kontrakt dla danych dialogów; zaadaptować do architektury repo.
type DialogueTone = 'kind' | 'mean' | 'silent';
type InsultVariant = 'dziwko' | 'szmato' | 'suko' | null;
interface GraveDialogueState {
  visitedGrave: 'gabrys' | 'borys' | 'weronika';
  litCandle: boolean;
  graveToneGabrys?: DialogueTone;
  gabrysInsult?: InsultVariant;
  graveToneBorys?: DialogueTone;
  graveToneWeronika?: DialogueTone;
}
interface DialogueNode {
  id: string;
  speaker: 'Aleks' | 'Sandra' | 'Gabryś' | 'Borys' | 'Weronika' | 'Mściciel' | 'Tom' | 'Gołąb' | 'Nieznajomy' | 'Dynia';
  text: string;
  conditions?: Record<string, unknown>;
  once?: boolean;
  priority?: number;
  interruptible?: boolean;
}
```

**Przykład procedury:**

1. Podejście do grobu → kamera utrzymuje obie postacie, F/Enter otwiera czytelny nagrobek.
2. Odczytanie napisu → na ekranie intent menu: `Powiedz coś miłego` / `Powiedz coś niemiłego`, z opcjonalnym timerem 12 s (start dopiero po zamknięciu napisu). Wybiera Aleks; Sandra komentuje.
3. Gabryś `mean`: drugie menu wyzwiska; po wyborze buduje tekst z zatwierdzonego wzorca i zapisuje wyzwisko.
4. Reakcja Sandry i wizyta w grobie zostają zapisane, można zapalić znicz niezależnie od tonu.
5. W chwili powstania zmarłych, z kolejki dialogów wybierana jest odpowiedź tylko tej osoby, której grób odwiedzono, i tylko w jej zapisanym tonie; inni mogą powiedzieć neutralne kwestie.
6. Podczas ostatniej walki oddzielnie działają flagi odwiedzonego grobu, znicza oraz wybranej ofiary; żaden z trzech systemów nie zastępuje drugiego.

## 8. TESTY AKCEPTACYJNE v6

- [ ] Mściciel istnieje w rzeczywistej scenie 3D, jest wyraźny i kadrowany zanim da polecenie do bramy; nie można minąć go bez aktywowania intro.
- [ ] W każdym z 3 grobów tekst jest prawidłowy, czytelny i nie rozmyty ASCII. Dobry/zły wybór działa na odpowiednie klawisze.
- [ ] Przy Gabrysiu po niemiłej opcji jest wybór 3 wyzwisk, który zmienia jego późniejszą odpowiedź.
- [ ] Przy Borysie i Weronice są po dwa kontrastowe dialogi; nie pojawiają się losowo inne wersje.
- [ ] Sandra i Aleks rozmawiają podczas przejść, ale żadna kwestia nie przykrywa najważniejszego wyboru, minigry ani telegraphu.
- [ ] Po wyborze samego siebie Sandra natychmiast reaguje, gracz ma wyraźny moment na podjęcie kolejnej decyzji / rozpoczęcie pojedynku.
- [ ] Dla dwóch profili laptopów sprawdzić wygląd ASCII, czytelność dialogów, stabilność glifów, FPS/1% low i występowanie lagów.
- [ ] Kluczowe teksty są czytelne w 1366×768, nie zachodzą na HUD i nie znikają przy zmianie zoomu/kamery.
- [ ] Nowa scena Weroniki jest opcjonalna, nie psuje pytań quizu ani kolejności drzwi i zoo.
- [ ] Zawsze możliwy jest powrót do rozgrywki nawet po odliczeniu czasu wyboru, błędzie mikrofonu i przerwaniu animacji.

## 9. OTWARTE DO ZATWIERDZENIA PRZEZ AUTORA

- Dokładne wypowiadane słowa Sandry o rencie Borysa i słowo „szlagier/slajger” (dyktowane głosowo).
- Finalna wersja niemiłego i miłego wariantu tekstu przy grobach — przedstawiono tu kompletny roboczy zestaw.
- Czy „Sesja poprawkowa Weroniki” ma być opcjonalnym epizodem 20–30 s z tablicą, czy bardziej rozbudowaną minigrą; nagroda nie jest kanonem.
- Czy 12 s to wygodny timer na wybór (propozycja): przetestować z dwoma graczami na jednej klawiaturze.
- Nieustalona własna część fabuły Alexa przez X i Salsy pozostaje placeholderem, nie generować jej samodzielnie.
