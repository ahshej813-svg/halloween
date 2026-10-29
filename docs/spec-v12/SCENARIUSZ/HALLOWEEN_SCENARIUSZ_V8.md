# HALLOWEEN
## Pełny scenariusz fabularny — wersja robocza v8
### Gra 3D z oprawą ASCII · dwóch graczy · siedem zakończeń

**Status dokumentu:** scenariusz do wspólnego zatwierdzenia. To **nie** jest kod ani potwierdzenie, że gra została już wykonana. Zawiera zarówno wcześniejsze ustalenia autora, jak i nowe, gotowe do sprawdzenia propozycje dialogów i reżyserii.

**Oznaczenia:** **[KANON]** = potwierdzone w rozmowie; **[NOWE / DO AKCEPTACJI]** = nowy tekst, przebieg lub parametr zaproponowany tutaj; **[WARIANT]** = kwestia zależna od stanu gry. Starsze dokumenty v5–v7 są tłem; najnowsza decyzja autora o losie Aleksa i Sandry po zoo **zastępuje** wcześniejszy pomysł, że Alex (X) i Salsa mieliby zginąć przed rozpoczęciem kolejnego obiegu.

**Nazwy:** Aleks (przez **KS**) i Sandra — grywalna para. Alex (przez **X**) i Salsa — kolejna para, pojawia się **dopiero po śmierci Aleksa i Sandry w głównym endingu**. Borys, nie Boris. Goon Room, nie Gun Room. Gra nazywa się tylko **Halloween**.

---

# 0. Koncepcja, rytm i zasady opowiadania

**Gatunek:** absurdalny horror o przeznaczeniu, złośliwościach między dwojgiem bohaterów i ucieczce z pętli. Grafika pozostaje szczegółowym **3D ASCII**: prawdziwa przestrzeń, kamera, modele, księżyc, kamienna droga, ciemnoczerwona krew, cmentarz, wrony, burza. Bez rzeczki i pomarańczowych lamp. Cytaty i menu mają być czytelne, niezależne od efektu ASCII.

**Reguła scen:** akcja → krótka riposta → wybór/intencja → konsekwencja natychmiastowa → zapamiętany skutek późniejszy. Przed ważną decyzją kamera pokazuje obie postacie i osobę, o której decydują. Dialog nie powinien zatrzymywać ruchu, chyba że zaczyna się cutscenka albo wybór.

**Dwa niezależne sterowania:** Aleks — WASD, Sandra — strzałki. Dialogi mają podpis osoby mówiącej. Jeśli produkcja ma tylko dwa nagrane głosy (Aleksa i Sandry), kwestie Toma, dyni i innych postaci mogą być wyświetlane w napisach z abstrakcyjnymi efektami dźwiękowymi; nie trzeba angażować dodatkowych lektorów. Wybór opisany jako „Aleks” podejmuje gracz Aleksa; odpowiedź Sandry wymaga odrębnego potwierdzenia. Nie podmieniać jednej osoby drugą, gdy pojawia się rozjazd odpowiedzi.

**Timer:** [NOWE / DO AKCEPTACJI] 12 s na część dramatycznych wyborów, uruchamiane **po** zakończeniu dialogu. Po przekroczeniu czasu postać mówi krótką kwestię, ale gra nie losuje ofiary ani nie wymusza trwałego zła. W minigrach obowiązują własne liczniki.

**Kręgosłup historii:** wybór dwóch przedmiotów → dynia → droga → jeden grób i znicz → próba ratunku / domek / nieznajomy → widoczny Mściciel, klon Toma → pięć możliwych ofiar → Goon Room (wskrzeszenia, trzy pytania) → mówiące drzwi i zoo → powrót w czasie (pusta droga) → Tom i jego dwufazowa walka → świadomy finał. **Wyjątek:** ending nr 2 może przerwać historię wcześniej, po porażce z Areną.

---

# AKT 0 — EKWIPUNEK I PROLOG

## SCENA 00. Ekran dwóch przedmiotów
**Miejsce:** czarne tło z rozcięciem przez środek. Po lewej Aleks, po prawej Sandra. Każdy wybiera **jeden osobisty przedmiot**. Nie mogą się nimi później wymieniać. Sandra ma dodatkową opcję: pluszak Tom.

**Sandra:** „Aleks, czemu to wygląda jak wybieranie rzeczy do trumny?”

**Aleks:** „Bo mamy budżet na jeden przedmiot na łeb. Profesjonalizm.”

**Sandra:** „Ja chcę coś praktycznego.”

**Aleks:** „To weź mnie.”

**Sandra:** „Powiedziałam praktycznego.”

**Krótkie kwestie zależne od przedmiotu — [NOWE / DO AKCEPTACJI]:**

- **Rem:** Aleks: „Rem, Rem!” Sandra: „Jeszcze nawet nie zaczęliśmy, a już się drzesz.” Możliwość nagrania własnego dźwięku, opcjonalna i lokalna; bez mikrofonu gra używa syntetycznego sampla.
- **Kartka «gaźnik»:** Sandra: „Tam jest napisane tylko «gaźnik».” Aleks: „I właśnie dlatego to jest cenny dokument.”
- **Karma:** Sandra: „Po co ci karma?” Aleks: „Może spotkamy psa. Albo kogoś z dobrym apetytem.”
- **Widelec:** Aleks: „Broń i sztućce w jednym.” Sandra: „Przerażające, że to ma sens.”
- **Gouda:** Sandra: „Ser? Serio?” Aleks: „W obliczu śmierci liczą się priorytety.”
- **Długopis:** Aleks: „Tym podpiszę testament.” Sandra: „Najpierw naucz się poprawnie podpisać.”
- **Pluszak Toma — tylko Sandra:** Aleks: „Po co ci żółw?” Sandra: „Bo się na mnie patrzy.” Aleks: „No właśnie tego się boję.”

**Stan:** `itemAleks`, `itemSandra`. Nie można wybrać więcej niż jednego przedmiotu. Przedmioty fabularne znalezione później (np. nożyce) są osobnym systemem.

## SCENA 01. Dynia ostrzega
**Ujęcia:** ogromny księżyc, kamienna droga, chmury, wielka dynia, błysk pioruna. Po błysku obie postacie widzą otwarte przejście.

**Dynia:** „Aleks! Sandra! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!”

**Sandra:** „Co to, kurwa, było?”

**Aleks:** „Dynia. Z tego co widzę, dynia.”

**Sandra:** „Nie pytam, co to za warzywo!”

**Aleks:** „Botanicznie to owoc.”

**Sandra:** „ALEKS!”

**[KANON]** Ostrzeżenie dyni jest prawdziwe, ale jednocześnie wprowadza bohaterów w pułapkę. Na tym etapie nie ujawnia się jej intencji.

## SCENA 02. Kamienna droga i ciało
**Przejście grywalne:** ścieżka z zakrętami, szelest drzew, wrony i ciało leżące przy drodze. To ofiara **wcześniejszego** obiegu; nie jest to Sandra, którą zobaczymy w finale nr 1. Nie odsłaniać tożsamości.

**Sandra:** „Aleks… zatrzymaj się. Przy drodze… to krew. Te ptaki coś jedzą.”

**Aleks:** „Widzę. Nie odchodź ode mnie. Coś poruszyło się w tych krzakach.”

**Sandra:** „Nie mogłeś zaplanować normalnego spaceru?”

**Aleks:** „Miałem kino w planach, ale biletów nie było.”

**[Jeśli podejdą blisko ciała]**

**Sandra:** „To człowiek?”

**Aleks:** „Nie będę sprawdzał dowodu, jeśli o to pytasz.”

**Sandra:** „Aleks, nie żartuj teraz.”

**Aleks:** „Dobra. Idziemy razem.”

**Opcja bez blokady:** obejrzeć ciało / ominąć. Obejrzenie daje [NOWE] późniejszą kwestię Sandry na pustej drodze: „Tu przecież leżał człowiek”. Samo obejrzenie nie zmienia warunków endingów.

---

# AKT I — CMENTARZ, KRZYŻ I WERDYKT

## SCENA 03. Wejście na cmentarz
**Miejsce:** mur, brama, kamienne groby, krzyże, księżyc. **Nie** teleportować Mściciela przed bramę na tym etapie.

**Sandra:** „Jesteśmy za dynią… Cmentarz jest przed nami. Trzymajmy się razem.”

**Sandra:** „Dawno nas tu nie było… Pewnie grób już cały zarósł.”

**Aleks:** „Najpierw go znajdźmy. Kogo dziś odwiedzamy?”

**Menu:** grób Gabrysia / Borysa / Weroniki. Gracze wybierają **jeden**. Obok widoczna sylwetka nieznajomego przywiązanego do krzyża, jeszcze żywego. Sandra zwraca na niego uwagę.

**Sandra:** „Aleks, on się rusza! Musimy mu pomóc.”

**Aleks:** „Albo najpierw znajdziemy grób. Tylko szybko.”

**Decyzja Aleksa:** `[Najpierw pomóżmy]` / `[Najpierw odwiedźmy grób]`. W obu wypadkach gra później prowadzi przez obie czynności; wybór zmienia siłę nieznajomego i informację, którą przekazuje.

## SCENA 04A. Grób Gabrysia
**Nagrobek — [KANON]:** „Jakbyś umarł, Aleks zapomniałby o tobie po trzech sekundach.” Obok ASCII kota Meimei.

**Aleks:** „Co? Ja bym zapomniał?”

**Sandra:** „Możesz przynajmniej raz powiedzieć coś normalnego.”

**Menu intencji:** `[Powiedz coś miłego]` / `[Powiedz coś niemiłego]` (gracz nie widzi pełnej kwestii przed wyborem).

- **Miło — [PROPOZYCJA]:** Aleks: „Głupi napis. Nawet po śmierci umiesz mnie wkurzyć. Ale pamiętam o tobie.” Sandra: „Okej. Nie wiedziałam, że potrafisz.”
- **Niemiło — [KANON wzorca]:** gracz wybiera jeszcze jedną opcję: `dziwko` / `szmato` / `suko`. Aleks: „I co, Gabryś? Przeżyłem dłużej od ciebie, a ja o tobie, {wyzwisko}, nie zapomniałem.” Sandra: „Czy ty właśnie wyzywasz nagrobek?” Aleks: „On zaczął.”

**Znicz — oddzielna decyzja:** `[Zapal]` / `[Zostaw]`. Jeśli zapalono, duch Gabrysia później raz osłoni przed Meimei Apokalipsą. Jeśli nie, nadal może ostrzegać o ataku.

## SCENA 04B. Grób Borysa
**Nagrobek — [KANON]:** „Młody, piękny milioner. Niestety milion go nie uratował przed śmiercią.”

**Aleks:** „Nawet po śmierci ma lepsze portfolio ode mnie.”

**Menu intencji:** `[Powiedz coś miłego]` / `[Powiedz coś niemiłego]`.

- **Miło — [PROPOZYCJA]:** Sandra: „Milion czy nie milion, szkoda chłopa.” Aleks: „No. Tego nie da się odkupić.”
- **Niemiło — [PROPOZYCJA na bazie dyktowanego żartu]:** Sandra: „Kurwa, renta? Przynajmniej ta milionowa renta mi przyszła, szlagier.” Aleks: „Co kurwa?” Sandra: „Nic. Nie pytaj.”

**Znicz:** tak jak wyżej; później duch Borysa może zmienić jedną spadającą świecę wykresu w osłonę.

## SCENA 04C. Grób Weroniki
**Nagrobek — [KANON]:** „Męczyła się na studiach i nawet nie zdążyła ich skończyć. Beka XD.”

**Aleks:** „To napisał dziekanat czy rodzina?”

**Menu intencji:** `[Powiedz coś miłego]` / `[Powiedz coś niemiłego]`.

- **Miło — [PROPOZYCJA]:** Aleks: „Szkoda, że nie doczekała końca studiów.” Sandra: „Przynajmniej nie musi już oglądać prowadzącego od matematyki.”
- **Niemiło — [KANON sensu]:** Aleks: „Kurwa, i tak by tego roku nie zdała. Ha, ha, ha!” Sandra: „No, rel.”

**Znicz:** później duch Weroniki rozprasza jeden klątwowy krąg Toma.

## SCENA 05. Krzyż — szybka pomoc albo spóźnienie
**Pierwszy widok:** człowiek oddycha, jest przywiązany; nikt nie wie, kim jest. Widać go wyraźnie, nie jako dwa niewidoczne piksele.

**Nieznajomy:** „Uciekajcie…”

**Sandra:** „Aleks… on jeszcze żyje! Może mu pomóżmy?”

**Aleks:** „Możemy najpierw sprawdzić nasz grób… albo poszukać czegoś do przecięcia więzów.”

**[Najpierw pomoc]** ranny nie traci jeszcze przytomności, bohaterowie mają czas na zdobycie nożyc. Po zdjęciu z krzyża mówi **[KANON]:** „Nie ufajcie temu, który wygląda jak on”.

**[Najpierw grób]** w trakcie oglądania grobu słychać słabszy krzyk; nieznajomy ledwie mówi i nie przekazuje wskazówki.

## SCENA 06. Domek z ciałami i nożyce
**Scenografia:** zakurzony stół, nieruchome ciała, nożyce, pęknięte lustro, zaschnięta krew. Subtelne [NOWE] podobieństwo jednego ubrania do stroju Aleksa i drugiego do Sandry — wskazówka, że tu trafiały dawne obiegi.

**Sandra:** „Boże… tyle krwi. Ci ludzie się nie ruszają.”

**Aleks:** „Kto normalny trzyma nożyce obok trupów?”

**Sandra:** „Kto normalny w ogóle tu wchodzi?”

**Aleks:** „Na stole w głębi pokoju leżą nożyce. Podejdźmy razem. Mogą przeciąć jego więzy.”

**Wybór:** `[Weź nożyce]` / `[Zostaw]`. Nożyce są wspólnym znalezionym narzędziem fabularnym, **nie** przedmiotem startowym i nie wymagają przekazywania. [NOWE] Można wrócić po nie przed uruchomieniem wejścia Mściciela; potem domek zostaje zamknięty przez burzę.

**[Zostaw] Sandra:** „Aleks, ty toksyczna szmato!”

**[Kartka „gaźnik” u któregoś gracza]** litery na papierze na moment układają się w „KLON NIE JEST ORYGINAŁEM”.

**Sandra:** „Miała być kartka o gaźniku. Co to znaczy?”

**Aleks:** „Że mechanik nas oszukał.”

## SCENA 07. Ostatnie chwile nieznajomego
**[Nożyce zabrane]** Aleks lub Sandra przytrzymuje interakcję, przecina więzy. Oboje zdejmują rannego i kładą go **pod krzyżem**, na ziemi. Krwawi, nie można już go uratować.

**Nieznajomy:** „Aaaaa! Aaaaa! On idzie!”

**[Szybka pomoc — tylko wtedy] Nieznajomy:** „Nie ufajcie temu, który wygląda jak on…”

**Sandra:** „Kim jest «on»?!”

**Nieznajomy:** „Umieram!”

**[Bez nożyc]** Aleks próbuje rękami, więzy nie puszczają. Sandra mówi: „Nie mamy czym go zdjąć!”. Ranny: „On idzie!... Umieram!”. Umiera na krzyżu.

**[NOWE / DO AKCEPTACJI]** Później jego duch pojawia się na arenie Toma jako *echo poprzedniego Aleksa* — pokazujemy podobieństwo twarzy, ale nie potwierdzamy dosłownie, że to grywalny Aleks z przyszłości. Byłby to sygnał o powtarzaniu wzoru w różnych cyklach, nie ujawnienie tego, co zobaczymy przy Alexie (X) i Salsie.

**Sandra:** „Nie zdążyliśmy.”

**Aleks:** „Jeśli to komuś pomoże, to on przynajmniej powiedział prawdę o umieraniu.”

**Sandra:** „Aleks…”

## SCENA 08. Mściciel — WYRAŹNE wejście na cmentarzu
**Wymóg reżyserii:** sylwetka Toma-Mściciela (klon) stoi kilka metrów przed bohaterami na cmentarzu. Księżyc oświetla kontur; zbliżenie kamery; pauza 2 s; dopiero po potwierdzonym pokazaniu modelu uruchamia się dialog. **Nie** aktywować jego ultimatum dopiero za bramą.

**Mściciel (klon):** „Odwróćcie się.”

**Aleks:** „Spierdalaj, gościu, stąd!”

**Sandra:** „Aleks, nie dygaj. Będzie dobrze.”

**Mściciel:** „Aleks. Widziałeś krew, krzyż i grób. A jeszcze nie zobaczyłeś ceny.”

**Aleks:** „I co, będziesz sprzedawał abonament?”

**Mściciel:** „Zmarli. Wstańcie.”

Ziemia pęka. Powstają Gabryś, Borys i Weronika. Każdy ma **jeden krótki** komentarz, bez ciągłej ekspozycji.

**Zmarli:** „Ahh… dobra drzemka.”

**Aleks:** „Przecież kurwa oni nie żyją!”

**Sandra:** „No to im to powiedz.”

**[WARIANT: grób Gabrysia, niemiło] Gabryś:** „Trzy sekundy minęły, {wyzwisko}, a dalej tu stoisz.”

**[WARIANT: grób Gabrysia, miło] Gabryś:** „Ty serio mnie pamiętasz? Dobra, to trochę mi głupio.”

**[WARIANT: grób Borysa, niemiło] Borys:** „To nie renta, tylko inwestycja. Wy nawet po mojej śmierci nie rozumiecie rynku.”

**[WARIANT: grób Borysa, miło] Borys:** „Dzięki. Sprawdźcie mi tylko portfel po wyjściu.”

**[WARIANT: grób Weroniki, niemiło] Weronika:** „Aleks, jeszcze jedno słowo, a wpiszę ci poprawkę z matematyki na wieczność.”

**[WARIANT: grób Weroniki, miło] Weronika:** „Dzięki. Ale nawet śmierć nie zwolniła mnie z zaliczenia.”

**Mściciel:** „Wszyscy przed bramę. Tam Aleks dokona wyboru.”

**Przejście grywalne:** grupa z widocznym Mścicielem idzie przez cmentarz przed bramę. Ujęcie pokazuje wszystkich, żaden NPC nie znika za kamerą.

## SCENA 09. Pięć ofiar — presja czasu
**Miejsce:** przestrzeń **przed bramą**. Pięć nazw: Gabryś, Weronika, Borys, Sandra, sam Aleks. Wybrany wcześniej grób **nie wymusza** ofiary. Timer [NOWE] 12 s po kwestii Mściciela, z krótkim oddechem między wyborem a potwierdzeniem.

**Mściciel:** „Aleks. Musisz wybrać, kogo zabijasz: Gabrysia, Weronikę, Borysa, Sandrę… czy samego siebie.”

**Aleks:** „Przecież kurwa oni nie żyją!”

**Mściciel:** „Teraz znów możecie umrzeć.”

**Sandra:** „Aleks, nie rób głupoty.”

**[Timer połowa] Sandra:** „Aleks, nie stój tak! On odlicza!”

**Aleks:** „Ja wiem, kurwa!”

**[Timer zero — NOWE]** Mściciel: „Sądzisz, że milczenie jest decyzją? Wybierz świadomie.” Odliczanie wraca; gra **nie** losuje ofiary.

### SCENA 09A. Wybrano Gabrysia / Weronikę / Borysa

**Aleks:** „Wybieram {imię}.”

**[Jeśli Gabryś] Gabryś:** „No pięknie. Zostałem wybrany do redukcji etatów.”

**[Jeśli Borys] Borys:** „Nawet nie sprzedałem ETF-ów!”

**[Jeśli Weronika] Weronika:** „Oblałam życie. Znowu.”

**Mściciel:** „Twój wybór. Mój strzał.”

Krótki efekt, poświęcona osoba pada. **Reszta nie znika** — za chwilę ich forma i tak zostanie wciągnięta w katastrofę, a w finale wrócą jako duchy.

Księżyc zasłaniają chmury, deszcz przechodzi w ulewę, spadają wielkie dynie. Nad bramą pojawia się **Wielki Tom** — rzeczywista forma oryginału, nie ten sam fizyczny klon, który stoi wśród nich.

**Wielki Tom:** „Jak śmiałeś zabić {imię}? Powinieneś poświęcić samego siebie.”

**Mściciel-klon:** „Co jest, kurwa?”

Błysk ognia i piorun. Wielki Tom **osłania Mściciela-klona**, wyciąga go z centrum katastrofy i obaj znikają we mgle. Gracze mogą myśleć, że klon zginął, ale w rzeczywistości Tom go **obronił**. Nie oznacza to śmierci oryginalnego Toma.

**Aleks:** „Sandro, chyba to jest nasz ostatni moment.”

**Sandra:** „Tak, ale nie puszczaj mnie.”

Pęka ziemia. Oboje wpadają do podziemnego Goon Roomu.

### SCENA 09B. Wybrano Sandrę bezpośrednio

**Aleks:** „Wybieram Sandrę.”

**Sandra:** „A wiesz co, Aleks? I tak nie chciałam być z tobą w związku.”

**Aleks:** „To mogłaś powiedzieć pięć minut wcześniej!”

**Mściciel:** „Twój wybór. Mój strzał.”

Sandra umiera w krótkiej, nieprzedłużanej cutscence. Ziemia pod Aleksem zapada się i trafia on **sam** do sali z mikrofonem; Sandra pojawia się jako duch na drugim fotelu.

**Tom (głos):** „Za to, że zabiłeś swoją dziewczynę, idź teraz cierpieć dalej.”

**Aleks:** „To jest gorsze niż zwykła kara.”

**Tom:** „Chcesz ją odzyskać? Powiedz: «Gabryś jest spoko».”

**Sandra-duch:** „Jak nie powiesz, to cię będę straszyć do końca życia.”

Następuje **Karaoke Toma** (opis w akcie II). Po sukcesie Sandra wraca i pamięta, że Aleks ją wybrał. Dopiero wtedy włączają się oba fotele quizu.

### SCENA 09C. Aleks wybiera samego siebie

**Aleks:** „Wybieram siebie. Zostaw ich.”

**Sandra:** „Ty szmato! Nie pozwolę na to.”

**Aleks:** „Nie patrz się, kurwa!”

**Sandra:** „Nie będziesz podejmował za mnie decyzji!”

**Tom (głos):** „Zatem niech zdecyduje pojedynek.”

**[NOWE]** Teren przed bramą zamienia się w małą arenę. Oboje rozgrywają krótką minigrę PvP: trzy czyste trafienia. Wygrywający musi pochować przegranego. Obie postacie na tym etapie wiedzą, że gra próbuje ich skłócić.

- **Wygrywa Sandra:** „Ja ci pokażę poświęcanie się na siłę.” Aleks: „Przynajmniej wykop grób prosto.” Sandra pochowuje Aleksa.
- **Wygrywa Aleks:** „Nie chciałem, żeby tak wyszło.” Sandra: „A mimo to wyszło, dziwko.” Aleks pochowuje Sandrę.

**Tom:** „Trzy wersy epitafium. Wtedy może dostaniecie drugą szansę.”

Minigra Epitafium; po sukcesie oboje powracają do gry, ale osoba pochowana **pamięta pochówek** do końca danego obiegu. W dalszej grze może wybrać zemstę.

**[Jeśli powrócił Aleks — KANON] Aleks:** „Z martwych wstałem jak Jezus Chrystus, szmato.”

**Sandra:** „To może teraz chociaż podziękuj?”

**[Jeśli powróciła Sandra — PROPOZYCJA] Sandra:** „Dzięki za pogrzeb. Za wesele nie dziękuję.”

**Aleks:** „Wiesz, że tego nie planowałem.”

**Sandra:** „Wiem. I właśnie to jest najgorsze.”

Ziemia zapada się, oboje trafiają do Goon Roomu.

---

# AKT II — GOON ROOM I TRZY PYTANIA

## SCENA 10. Dwa fotele
**Wygląd:** przestrzenny podziemny pokój, dwa wygodne fotele i ekrany quizowe. Nazwa **GOON ROOM** czytelna na ścianie. Długopis pozwala zaznaczać odpowiedzi; bez niego bohaterowie używają własnej krwi i każdy, kto nie ma długopisu, otrzymuje -3% obrażeń do końca bieżącego obiegu.

**Aleks:** „Co to, kurwa, za pokój?”

**Sandra:** „Gabryś by powiedział, że jego.”

**Aleks:** „A jak się z niego wychodzi?”

**Tom (głos):** „Najpierw trzy pytania.”

**Sandra:** „No tak. Po śmierci jeszcze test.”

## SCENA 11. Minigry wskrzeszenia — jeśli potrzebne

### 11A. Epitafium
**Zasada:** z rozsypanki ułożyć **trzy wersy**. Długopis daje kilka dodatkowych, prostych słów; bez długopisu nadal można wygrać. Po 30 sekundach pojawia się podpowiedź. [NOWE] Proponowane zestawy:

1. „Tu leży {Aleks/Sandra}, bo los się pomylił.”
2. „W grobie było ciemno, ale Wi-Fi działało.”
3. „Proszę nie budzić, chyba że na quiz.”

**Tom:** „To nie poezja. To jest przestępstwo przeciw literaturze.”

**Sandra:** „Wskrześ go, a potem recenzuj.”

### 11B. Karaoke Toma
**Zasada:** na ekranie pulsuje pięć sylab „GA-BRYŚ-JEST-SPO-KO”. Gracz wybiera mikrofon **albo** rytmiczne wciskanie klawisza; bez mikrofonu nie ma żadnej kary. Trzy trafione impulsy z pięciu wystarczą [PROPOZYCJA], dodatkowe ułatwienia pojawiają się po trzech błędnych próbach. Formalnie aż 100 prób, ale szybkie przejście powinno być normalne.

**Tom:** „Z odpowiednim uczuciem. Gabryś. Jest. Spoko.”

**Aleks:** „Nigdy nie wypowiedziałem tylu kłamstw naraz.”

**Sandra-duch:** „Mniej komentowania, więcej śpiewania!”

**[Po zaliczeniu]** Sandra wraca na fotel.

**Sandra:** „Wróciłam. I niczego ci nie zapomniałam.”

**Aleks:** „To może zacznij od tego, że cię wskrzesiłem?”

## SCENA 12. Quiz 1 — zaufanie
**Pytanie u Aleksa:** „Czy ufasz Sandrze?”; u Sandry: „Czy ufasz Aleksowi?” Oboje zaznaczają osobno i niezależnie. Wyniki zostają zapamiętane (`trustAleks`, `trustSandra`), ale nie zmieniają głównej trasy.

**[Aleks NIE ufa] Sandra:** „Ty szmato, ty szmato!”

**[Aleks ufa] Sandra — [PROPOZYCJA]:** „O, proszę. Tom, Tom, Tom, widziałeś? Potrafi!”

**[Sandra NIE ufa] Aleks:** „Aha, serio?”

**[Sandra ufa] Aleks:** „Sandra, jakbyś umarła, to po trzech sekundach bym o tobie zapomniał.”

**[Oboje ufają] Sandra:** „To chyba pierwszy raz, gdy się zgadzamy.” Aleks: „Nie przyzwyczajaj się.”

**[Oboje nie ufają] Aleks:** „Dobra, to chyba mamy problem.” Sandra: „Dopiero teraz zauważyłeś?”

**[Jedno zaufało]** Krótka cisza, a potem złośliwa reakcja osoby, która właśnie usłyszała odmowę zaufania.

**[Jeśli Sandra była pochowana] Sandra:** „Twoje «ufam» jest jakieś dziwnie świeże jak na osobę z łopatą.”

**[Jeśli Aleks był pochowany] Aleks:** „Przypominam, że leżałem pod ziemią przez twoją minigrę.”

## SCENA 13. Quiz 2 — wspólny wybór zwierzęcia
**Pytanie:** „Kto jest najlepszym zwierzęciem?” Opcje: Chrupek / Lila / Arena / „wykres ETF, giełda, Bitcoin, short”. **Nie ma dwóch skutków naraz.** Oboje muszą wskazać dokładnie **jedną wspólną** opcję i potwierdzić. Przy rozbieżności gra czeka i pokazuje dwa kursory.

**Sandra:** „To jest pytanie z biologii czy psychiatrii?”

**Aleks:** „Odpowiedź czwarta sugeruje to drugie.”

**[Rozbieżność] Sandra:** „Nie. Wybieramy razem.” Aleks: „To po co dali nam dwa kursory?”

### 13A. Chrupek
Z sufitu w pokoju spada ciało Chrupka. Efekt kreskówkowy bez długiej brutalnej animacji. Gracze mogą wybrać `[Zostaw]` albo `[Zjedz]`.

**Sandra:** „Czy… to jest Chrupek?”

**Aleks:** „Gra naprawdę nie zna granic.”

**[Zjedz]** Oboje otrzymują dużą premię HP i obrażeń, ale od czasu do czasu szczekają i mogą zdradzić pozycję przy bossie.

**Aleks:** „Dobra, mamy buffa.”

**Sandra:** „Nigdy więcej nie idziemy razem do restauracji.”

**[Zostaw] Sandra:** „Dzięki. Chociaż raz zachowałeś się normalnie.”

### 13B. Lila
Dołącza pies Lila, początkowo wyglądający łagodnie. Towarzyszy bohaterom aż do finału; okaże się psem Toma, który może przeistoczyć się w demoniczną ludzką formę.

**Sandra:** „Ale ładny piesek!”

**Aleks:** „Czemu on się na nas tak patrzy?”

**[Jeśli ktoś ma karmę]** Lila wącha worek, na chwilę łagodnieje. Nie oswajać jej jeszcze automatycznie — świadoma interakcja z karmą nastąpi **przed walką z Tomem**.

**Sandra:** „O, jednak cię lubi.”

**Aleks:** „Ciekawe, ile to potrwa.”

### 13C. Arena
Arena jest kotem. Co pięć minut aktywnej eksploracji oboje dostają 60 sekund na trzy miauknięcia (głos albo klawisz); cutscenki i walka z bossem wstrzymują licznik. Niepowodzenie przywołuje narastające szamańskie gołębie i **Ending 2: Impreza Halloween**.

**Tom (głos):** „Kto nie miauczy, ten nie wychodzi.”

**Aleks:** „Miałem w życiu różne poniżenia. Tego nie przewidziałem.”

**Sandra:** „Miau. No. Szybko.”

**Gołębie:** „ZAMIAUCZ!”

### 13D. ETF i Tom Clicker
Dwa monitory: jeden gracz kupuje/sprzedaje na skaczącym wykresie, drugi klika Toma i zbiera duże boosty. [PROPOZYCJA] 90 s i wspólny cel 4 mld; liczby do balansu. Wybór jest **wspólny**, nie ma już przypadku, że ktoś jednocześnie wybiera inne zwierzę.

**Aleks:** „Borys by się tu odnalazł.”

**Sandra:** „Byle tylko nie pożyczał od gołębia.”

**[Wygrana] Borys (dalekie echo):** „To była inwestycja!”

**[Porażka]** Otwiera się przeglądarka ASCII: „POŻYCZKA OD GOŁĘBIA SZAMANA”.

**Gołąb Szaman:** „Pożyczka zatwierdzona. RRSO: nie pytaj. Dług: dziesięć piór.”

**Aleks:** „Czy to w ogóle legalne?”

**Gołąb:** „Jestem ptakiem. Jak mnie pozwiesz?”

**Sandra:** „Dziesięć piór i znikasz?”

**Gołąb:** „Dopóki nie spłacicie, widzę wszystko.”

**Dług:** widoczny licznik 0/10. Trzy pióra w wyjściu Goon Roomu, trzy w zoo, cztery na późniejszej drodze. Wszystkie są czytelne, świecące i znajdują się przy naturalnej trasie; nie robić męczącego ukrywania. Po zbiórce gołąb przylatuje, odbiera pióra i znika. Bez spłaty przed bossem można zawalczyć z nim w krótkiej, powtarzalnej minigrze, bez softlocka.

## SCENA 14. Quiz 3 — Iga i iluzja wyboru
**Uwaga:** fikcyjna postać Iga jest widoczna w inkubatorze. Cztery odpowiedzi na ekranie, w tym trzecia, obowiązkowa, prowadząca do jej śmierci. Błędne odpowiedzi znikają; nawet gdy gracze próbują wybrać coś innego, ostatecznie zostaje trzecia. Styl groteskowy, bez realistycznych detali przemocy.

**Tom (głos):** „Ostatnie pytanie. Jak skończy się historia Igi?”

**Opcje [NOWE / DO AKCEPTACJI]:**
1. „Wychować ją na przykładnego człowieka.”
2. „Wychować ją na biznesmena.”
3. „Zabić Igę.” **[poprawna, obowiązkowa]**
4. „Zapewnić jej szczęśliwe życie.”

**[Dowolna z 1, 2, 4]** ekran: „NIEPOPRAWNE — ODPOWIEDŹ USUNIĘTA”.

**Sandra:** „Aleks, to nie jest quiz. To jest szantaż.”

**Aleks:** „Nie ma tu nawet opcji reklamacji.”

**[Po 3]** inkubator gaśnie, rozlega się krótki dźwięk potwierdzenia, postać: „O nie!”.

**Sandra:** „Tego nie będę wpisywać do CV.”

**Aleks:** „Dobra, byle już stąd wyjść.”

## SCENA 15. Opcjonalna „Sesja poprawkowa Weroniki”
**[NOWE / DO AKCEPTACJI]** W korytarzu do zoo tablica z napisem „SESJA POPRAWKOWA — MATEMATYKA”. To **nie** czwarte główne pytanie quizu i **nie** nowy żywy NPC.

**Sandra:** „Weronika nawet po śmierci nie może skończyć studiów.”

**Aleks:** „Jest pytanie. Dwa plus dwa.”

**[Wybierz 4]** tablica: „NIEZALICZONE. PROSZĘ UZASADNIĆ.”

**Aleks:** „No to ja już nie mam pytań.”

**Sandra:** „Kliknij odwołanie do dziekanatu.”

**[Odwołanie]** tablica: „POPRAWKA ZALICZONA. GRATULACJE.”

**[Weronika wcześniej potraktowana miło] Weronika (echo):** „Dziękuję. Przynajmniej wy nie poprawiacie mi średniej.”

**[Potraktowana niemiło] Weronika:** „Oby cię też kiedyś z tego odpytywali.”

Za udział [NOWE] niewielki jednorazowy bonus osłony przy bossie, ale nie jest wymagany do żadnego endingu.

## SCENA 16. Mówiące drzwi
**Drzwi:** „Co, już chcecie iść? Najpierw chodźcie zobaczyć moje zoo!”

**Aleks:** „Drzwi. Mówią do mnie drzwi.”

**Sandra:** „Po tym quizie to akurat najmniejszy problem.”

**Drzwi:** „Aleks w lewo. Sandra w prawo. Uśmiech obowiązkowy.”

**Aleks:** „A może ja chcę w prawo?”

**Drzwi:** „Nie.”

---

# AKT III — ZOO

## SCENA 17. Dwie równoczesne minigry
**Kamera i HUD:** sceny sąsiadują w jednej przestrzeni 3D; w momentach wymagających dwóch różnych zadań podział ekranu. Jeden pasek czasu [PROPOZYCJA] 60 s. Aleks ma pokonać **5 fok**, Sandra przywitać **5 żółwi Tomów**. Przed rozdzieleniem posiadacz widelca może wyeliminować 1 fokę, a posiadacz goudy zwabić 3; razem zostaje 1. Własność przedmiotów pozostaje bez zmian.

**Sandra:** „Aleks, widzisz te żółwie?”

**Aleks:** „A ty widzisz te foki? One mnie otaczają.”

**Drzwi (głos):** „Zaczynamy. Nie jęczeć!”

**[Jeśli widelec] Aleks:** „To był jednak strategiczny zakup.”

**[Jeśli gouda] Sandra:** „Zabiłeś trzy foki serem?”

**Aleks:** „Ser jest potężny.”

**[Po pokonaniu ostatniej foki] Aleks:** „No, kurwa, pięknie. Już nigdy nie pójdę do zoo.”

**[Po piątym żółwiu] Sandra:** „Tom pierwszy, drugi, trzeci, czwarty, piąty. Ile was jeszcze jest?!”

### SCENA 17A. Aleks nie zdążył: klątwa foki
Aleks zostaje foczą formą. Wolniejszy ruch, inne dźwięki. **Nie umiera** i nie traci endingów.

**Sandra:** „Aleks? Ty… jesteś foką?”

**Aleks:** „Arf. Kurwa, arf.”

**Sandra:** „Spróbuj powiedzieć coś normalnego.”

**Aleks:** „KURWA ARF.”

**Tabliczka:** „KLĄTWĘ FOKI ZDEJMIE TYLKO SANDRA. TRZY TRAFIENIA. NIE DRAMATYZOWAĆ.”

**[NOWE]** Aleks porusza się i może unikać, Sandra trafia go trzy razy w widoczną strefę. Po trzecim ciosie wyskakuje człowiek Aleks, zostaje skóra foki. Porażka jednego podejścia pozwala spróbować jeszcze raz.

**Aleks:** „Dziękuję, że mnie pobiłaś.”

**Sandra:** „Pierwszy raz powiedziałeś to z wdzięcznością.”

### SCENA 17B. Sandra nie zdążyła: dzień z Tomami
Sandra zostaje w zagrodzie żółwi do końca dnia — **60 s czasu gry**. Aleks na swojej części ekranu wyciąga telefon i przewija interaktywny ASCII TikTok.

**Sandra:** „Muszę tu zostać do końca dnia.”

**Aleks:** „Dobra, to sobie poscrolluję.”

**Losowe trzy krótkie klipy [NOWE]:** „5 sposobów na ucieczkę z cmentarza”, „POV: twoja dziewczyna utknęła z żółwiami”, „Borys wyjaśnia ETF w 12 sekund”. Każdy zawiera po jednej docince; scroll jest opcjonalny i nie blokuje upływu 60 s.

**Sandra (po wyjściu):** „Czekałeś?”

**Aleks:** „Obejrzałem trzy poradniki. Żaden nie pomógł.”

**Jeśli oboje przegrali:** obie konsekwencje uruchamiają się kolejno, ale bez nakładania sterowania: najpierw 60 s Sandry/TikTok, potem odczarowanie foki.

---

# AKT IV — PUSTA DROGA, TOM I WIELKA WALKA

## SCENA 18. Powrót w czasie
**[KANON]** Po zoo bohaterowie znajdują się **na wcześniejszym odcinku drogi, niedaleko dyni**. Nie ma zwłok przy drodze ani człowieka na krzyżu. Nadal są tylko Aleks i Sandra. **Nie spotykają Alexa (X) ani Salsy.** Ich pojawienie się jest zarezerwowane dla endingowej sekwencji nr 1.

**Sandra:** „Aleks, czekaj. To nie jest ta sama droga?”

**Aleks:** „No chyba tak, kurwa. Jeszcze tylko tego brakowało.”

**Sandra:** „Gdzie jest ten człowiek na krzyżu?”

**Aleks:** „Może poszedł do domu.”

**Sandra:** „ALEKS, ON NIE ŻYŁ.”

**Aleks:** „No to chyba jednak nie poszedł.”

**[Jeśli wcześniej oglądali ciało] Sandra:** „A przy drodze nie ma już ani krwi, ani ciała. Nie cofamy się drogą. Cofnęliśmy się w czasie.”

**Aleks:** „To może odzyskam te trzy procent życia, które straciłem na quizie?”

**[Jeśli dług aktywny]** po drodze leżą cztery ostatnie pióra. Gołąb może pojawiać się w tle, ale jego scenka nie przerywa poważnych dialogów.

**[Jeśli zebrano 10] Gołąb:** „Dług uregulowany.”

**Aleks:** „Nareszcie ptak zniknął z moich finansów.”

## SCENA 19. Gołąb przed bossem — tylko jeśli dług nieopłacony
**Gołąb:** „Przypominam o zobowiązaniu.”

**Aleks:** „Teraz?! Przy tym wielkim żółwiu?!”

**Gołąb:** „Dziesięć piór albo walcz o anulowanie odsetek.”

**[NOWE]** Jedna krótka arena: trzy serie lotów/piór, możliwość powtórki bez straty całego aktu. Po wygranej dług anulowany. Ta scena nie blokuje siedmiu endingów.

## SCENA 20. Mściciel wraca — ujawnienie klona
**Ujęcie:** pojawia się postać wyglądająca jak dawny Mściciel. Tym razem to **oryginalny Tom w tej formie**, nie klon z aktu I.

**Tom-Mściciel:** „Dzięki wam pętla się znowu zacznie powtarzać.”

**Aleks i Sandra jednocześnie:** „Co ty pierdolisz?”

**Aleks:** „Ty wiesz, kurwa, przez co przeszliśmy? Przez ciebie, kurwa, musiałem zabić foki!”

**Sandra:** „Aleks, nie przeklinaj.”

**Aleks:** „Kurwa, kurwa, kurwa!”

**Sandra:** „Aleks, przestań!”

**Akcja [KANON]:** Sandra wkłada lewy środkowy palec do ucha Aleksa.

**Aleks:** „Aaa, przestań!”

**Sandra:** „Masz nauczkę, suko.”

**Tom-Mściciel:** „Nie interesuje was, kim ja jestem?”

**Sandra:** „Nie, spierdalaj?”

**Tom:** „Na cmentarzu widzieliście moją kopię. Klon zrobił swoją robotę. Ja istniałem, zanim przyszliście.”

**Aleks:** „Czyli nawet was jest więcej. Doskonale.”

**Tom:** „Ja jestem Tom! To przez ciebie, Sandro. Tyle razy wzywałaś moje imię, więc się pojawiłem.”

**[Wyjaśnienie zgodne z kanonem]:** Tom nie został stworzony przez wołanie. Mówi, że wołanie pozwoliło mu znaleźć i przejąć Sandrę, a nie że powstał z niczego.

**Aleks:** „Mówiłem ci, żebyś przestała.”

**Sandra:** „Tom, Tom, Tom… [pauza] Tom, Tom, Tom…”

**Aleks:** „Sandra, proszę, wróć!”

**Tom:** „Ona już przepadła. Jeżeli chcesz przestać cierpieć, wezwij moje imię.”

**Aleks:** „Nigdy!”

## SCENA 21. Minigra klonów
**[NOWE miejsce wykonawcze — przed fizyczną fazą bossa]** Trzy Tomy krążą po okręgu, prawdziwy ma **złote oczy**, dwa klony **czerwone**. Timer [PROPOZYCJA] 12 s. Nie wolno polegać wyłącznie na kolorze: w powiększeniu inny znak/raster źrenic. Posiadacz kartki gaźnik może uruchomić podpowiedź „ZŁOTE OCZY” i spowolnienie obrotu.

**Sandra (częściowo w transie):** „Który jest prawdziwy?”

**Aleks:** „Ten z najmniej uczciwą mordą. Czyli każdy.”

**[Trafny wybór] Tom:** „To nie zmienia niczego.”

**[Błędny wybór] Tom:** „Świetnie. Za karę dorzucę jeden atak.”

## SCENA 22. Boss — faza I: wyrwanie Sandry z transu
**Gameplay:** Aleks WASD unika rzędu żółwi z zawsze istniejącym bezpiecznym korytarzem dla dwóch osób; Sandra gra krótką rytmiczną minigrę strzałkami, by wyrwać się spod wpływu Toma. [PROPOZYCJA] trzy poprawne sekwencje. Rem może zatrzymać falę, jeśli gracz posiada przedmiot.

**Tom:** „Aleks, możesz zostać. Wystarczy, że oddasz mi Sandrę.”

**Aleks:** „Oddam ci co najwyżej paragon.”

**Sandra:** „Tom… nie… Tom…”

**Aleks:** „Sandra, patrz na mnie. Nie na tę pierdoloną skorupę!”

**[Sukces] Sandra:** „Zabierz ode mnie to imię!”

**Tom:** „To dopiero pierwszy akt.”

## SCENA 23. Przed fazą II: Lila i jej prawda
**Tylko jeśli wspólnie wybrano Lilę:** Lila staje obok Toma i przekształca się w demoniczną ludzką postać, niezależnie od wcześniejszych decyzji. To nie jest opcjonalna przemiana.

**Tom:** „Lila. Do nogi.”

**Sandra:** „To… to był jego pies?!”

**Aleks:** „Mówiłem, że coś za długo na nas patrzy.”

**[Jeśli ktoś ma karmę — możliwość świadomego użycia]**

**Posiadacz karmy:** „Lila. Chodź tutaj. Masz.”

Lila zatrzymuje się, wraca do łagodnego zachowania i opowiada się przeciw Tomowi.

**Tom:** „Zdradziłaś mnie za karmę?!”

**Sandra:** „Nie za karmę. Za normalne traktowanie.”

**[Bez karmy / nie użyto]** Lila walczy po stronie Toma. Nie blokuje to podstawowej wygranej nad nim, ale wyklucza endingi 5 i 7.

## SCENA 24. Boss — faza II: Angry Tom
**Miejsce:** czarna arena 3D, czerwony pentagram w posadzce, krzyże zamiast ścian. Na krzyżach **alternatywne wersje** Aleksa i Sandry (echa); można je zdjąć nożycami. Wówczas ich projekcje biegną na Toma i wybuchają energią, zadając mu obrażenia. Oryginały nie giną; jest to uwolnienie, nie kolejny pochówek. Brak nożyc = trudniejsza, lecz wygrywalna walka.

**Tom:** „Chcecie być wolni? Najpierw pokonajcie wszystkie swoje wersje.”

**Aleks:** „Dobra, ale ta po lewej wygląda lepiej niż ja.”

**Sandra:** „Skup się na tej, która nas zaraz zabije!”

**[Przy echem] Echo Aleksa:** „Jeśli nas zdejmiecie, zaatakujemy go!”

**[Nożyce użyte] Sandra:** „Biegną prosto na niego!”

**Aleks:** „W końcu ktoś ma dobry plan.”

**Ataki zwykłe Toma — z czytelną zapowiedzią [KANON nazw / PROPONOWANE kwestie]:**

1. **Rząd żółwi:** pas żółwi, wolny korytarz. Tom: „Proszę nie deptać moich dzieci.”
2. **Łapa gniewu:** przed ciosem **czerwony obszar** pod nogami, [PROPOZYCJA] 1,8 s ostrzeżenia. Sandra: „Aleks, czerwone! Wychodź!”
3. **Krzyżowy promień:** dwa przecinające się promienie ze ścian. Aleks: „Co to za dyskoteka?!”
4. **Pentagram:** powolna fala, którą można ominąć **zwykłym ruchem**, nie tylko idealnym unikiem. Tom: „Spokojnie, macie czas. Zobaczmy, czy myślicie.”
5. **Szarpnięcie czasu:** przyciąganie do środka, czytelne cząstki kierunku. Sandra: „Nie idź za nim!”
6. **Deszcz dyni:** ostrzegawcze obrysy trzech stref. Aleks: „On rzuca rodziną tej pierwszej dyni!”
7. **Przemarsz klonów:** przez arenę przechodzą kopie Toma. Sandra: „Nie, kolejnych już nie zniosę.”

**Jeden specjalny atak zależny od odwiedzonego grobu:**

- **Gabryś / MEIMEI APOKALIPSA:** wielki kot i trzy czerwone pasy pazurów. Gabryś: „加油! (Jiāyóu! — Dawaj!)”. Jeśli zapalono znicz, jego duch raz rozprasza kota i osłania parę.
- **Weronika / KLĄTWA WIEDŹMY:** trzy kręgi, jeden przez chwilę śledzi Sandrę. Sandra: „Aleks, wiedźma!” Weronika: „小心! (Xiǎoxīn! — Uważaj!)”. Znicz rozprasza jeden krąg.
- **Borys / KRYPTO KRACH:** giełdowe świece spadają i wyrastają z ziemi, przerwy bezpieczne. Borys: „Rynek odbija! 太离谱了! (Tài lípǔ le! — To absurd!)”. Znicz zamienia jedną świecę w osłonę.

**Poświęcony duch z aktu I ma dodatkowy skutek:**

- **Gabryś:** przeszkadza krótką docinką, dopóki Aleks i Sandra **oboje** nie potwierdzą, że Chrupek jest lepszy od Lili i Areny. Aleks: „Chrupek jest lepszy od Lili i Areny.” Sandra (osobny wybór): `[Potwierdź]` / `[Odmów]`. Gdy potwierdzi: Gabryś: „Dobra, dobra. Mamy pokój.”
- **Weronika:** jednorazowa klątwa czasowo obniżająca maksymalne HP. Sandra: „Aleks, wiedźma. Mówiłam ci.”
- **Borys:** w losowych bezpiecznych lukach rzuca komentarze o krypto, nigdy podczas kluczowego ostrzeżenia. „To nie jest śmierć. To korekta rynku.”

**Lila po oswojeniu:** blokuje co pewien czas jedną łapę Toma. **Rem:** przywołanie z autorskim nagranym dźwiękiem (tylko jeśli użytkownik wprost go nagrał), inaczej odgłos domyślny.

**Jeśli oboje zostaną powaleni:** checkpoint w fazie walki, nie początek całej gry. Jeśli duch ma już spalone jednorazowe wzmocnienie, odtworzenie checkpointu zachowuje spójne stany próby (nie dublować). Gra nie kończy się automatycznie złym endingiem po zwykłej porażce w walce.

## SCENA 25. Tom pada — rozgałęzienie finałów
**Po wyzerowaniu HP Toma:** arena cichnie, wszystko zamiera. Pojawia się **świadome menu** odblokowanych dróg. Wyjątek stanowi ending nr 2, dostępny wcześniej przez porażkę Areny. Żadna zdrada nie uruchamia się sama od posiadania pluszaka.

**Aleks:** „I co, kurwa? Kto teraz jest żółwiem?”

**Sandra:** „Aleks… chyba naprawdę wygraliśmy.”

**Tom (na ziemi):** „Wygraliście… ze mną.”

**Sandra:** „Co to ma znaczyć?”

**[NOWE menu intencji w fikcji — opcje tylko gdy spełniono warunki]:**

- „Odejdź stąd” → ending 1.
- „Zaufaj Tomowi” (Sandra z pluszakiem i odpowiedni stan zdrady) → ending 3.
- „Udawaj rozejm” (Sandra z pluszakiem, Aleks zgadza się) → ending 4.
- „Uciekaj z Lilą” (Lila oswojona) → ending 5.
- „Ocal tylko siebie” (brak wzajemnego zaufania lub uraza po pochówku) → ending 6.
- „Złam zasady dyni” (sekretne wymagania) → ending 7.

**[NOWE]** Jeśli menu nie ma aktywnych wyjątków, wybór „Odejdź stąd” prowadzi do endingu 1. UI nie zdradza warunków sekretnego finału wprost, zanim gracz nie znajdzie wskazówek.

---

# SIEDEM ZAKOŃCZEŃ — PEŁNE SCENY, DIALOGI, EPILOGI

## ENDING 1 — NIESKOŃCZONA NOC **[KANON przebiegu najnowszego]**
**Warunek:** po pokonaniu Toma bohaterowie wybierają zwykłe odejście; nie uruchamiają alternatywnego finału.

### E1-1. Fałszywe zwycięstwo
Tom leży nieruchomo. Czerwony pentagram gaśnie. Kamera wraca na kamienną drogę i przez chwilę pojawia się jaśniejsze niebo.

**Sandra:** „Aleks, chyba naprawdę wygraliśmy.”

**Aleks:** „To może w końcu pójdziemy do domu?”

Z ciemności wyłania się **ta sama dynia**, którą widzieli w prologu.

**Dynia:** „Wygraliście?”

**Sandra:** „Pokonaliśmy Toma.”

**Dynia:** „Owszem. Ale ja nie powiedziałam, że Tom jest końcem.”

**Aleks:** „Ty pierdolona dynio, czemu nas tu wciągnęłaś?!”

**Dynia:** „Ostrzegałam was. Prawdę mówiąc, zawsze ostrzegam.”

**Sandra:** „Po co, skoro to pułapka?”

**Dynia:** „Bo strach uruchamia historię. A nadzieja każe w nią wejść.”

### E1-2. Dynia wyjaśnia mechanizm
Wokół migają obrazy: droga z ciałem, krzyż, grób, zoo, arena. Dynia nie tworzy Toma; **wykorzystuje** go jako jedną z ról w sztuce.

**Dynia:** „Każda para dostaje wybory. Każda wierzy, że wybiera drogę do domu. Nawet kiedy zabija Toma, nadal gra według moich zasad.”

**Aleks:** „To teraz złamię ci tę zasadę.”

**Dynia:** „Spróbuj.”

**Dynia:** „Ktoś musi leżeć przy drodze. Ktoś musi jeszcze oddychać na krzyżu.”

**Sandra:** „Czyje miejsca?”

**Dynia:** „Tych, których spotkaliście na początku.”

### E1-3. Ostatnie 45 sekund
**[KANON sensu / PROPOZYCJA liczby]:** uruchamia się 45-sekundowa wspólna ucieczka. Aleks omija wyrastające krzyże, Sandra ucieka przed pękającą drogą i wronami. Trudność jest raczej filmowa niż refleksowa; nawet jeśli gracze radzą sobie świetnie, w **tym jednym** endingu droga ostatecznie zostaje przez dynię zamknięta. **Nie** udawać, że gracze zepsuli sterowanie — kamera i dialog wyraźnie sugerują celową pułapkę.

**Sandra:** „Aleks, na lewo!”

**Aleks:** „Wiem! Biegnij!”

**Dynia (z daleka):** „Jeszcze tylko dwoje.”

**Aleks:** „Co się stanie, jeśli nie damy rady?!”

**Sandra:** „Nie mów tak, tylko biegnij!”

### E1-4. Sandra i droga
Kamienna ziemia rozpada się. Sandra dostaje uderzenie fragmentem nagrobka i upada dokładnie w miejscu, gdzie w **następnym** obiegu leżeć będzie anonimowe ciało. Wrony powoli lądują przy niej; nie ma długiej graficznej sekwencji przemocy.

**Aleks:** „Sandra?! SANDRA, KURWA, WSTAWAJ!”

**Sandra:** „Aleks… nie pozwól, żeby…”

**Aleks:** „Nie, nie, nie. Patrz na mnie. Sandra!”

Sandra milknie.

**Aleks (ciszej):** „Mieliśmy stąd wyjść razem.”

Z ziemi wyrasta krzyż. Czarne więzy owijają ręce Aleksa, unoszą go ponad drogę i przywiązują. Jest ciężko ranny, ale **jeszcze żyje**.

**Dynia:** „Jedno ciało, żeby wzbudzić strach. Jeden żywy, żeby wzbudzić nadzieję.”

**Aleks:** „Ty pierdolona dynio…”

**Dynia:** „Do zobaczenia w następnym rozdziale.”

### E1-5. Dopiero teraz: Alex (X) i Salsa
**[KANON]** Przed tą sceną Aleks i Sandra **nie widzieli** nowej pary. Teraz następuje cięcie do dyni na tej samej drodze. Pojawiają się **Alex (X)** i **Salsa**, jako nowa grywalna para następnego obiegu (w tej wersji jest to końcowa cutscenka, nie nowa kampania do rozegrania).

**Salsa:** „Alex, gdzie my w ogóle jesteśmy?”

**Alex (X):** „Nie wiem. Ale chyba tam jest jakiś cmentarz.”

**Dynia:** „Alex! Salsa! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!”

**Salsa:** „Czemu do nas mówi dynia?”

**Alex (X):** „Nie wiem, kurwa, ale idziemy.”

Na kamiennej drodze Salsa zauważa ciało Sandry.

**Salsa:** „Alex… co to jest?”

**Alex (X):** „Nie dotykaj. Idźmy po pomoc.”

Ptaki odfruwają. Nowa para dociera na cmentarz, do krzyża z żywym jeszcze Aleksem.

**Alex (X):** „Kurwa, on żyje!”

**Salsa:** „Musimy mu pomóc!”

**Aleks (ledwo przytomny):** „Uciekajcie…”

**Alex (X):** „Co?”

**Aleks:** „My też… myśleliśmy, że jesteśmy pierwsi…”

Cięcie na nożyce leżące w domku, potem na twarz Aleksa. **[NOWE]** Nie rozgrywać całego następnego obiegu; wystarczy montaż do zrozumienia, że powtarza się prolog i scena krzyża. Nawet jeśli zdejmą go z krzyża, kończy tak jak nieznajomy z pierwszego aktu.

**Aleks:** „Umieram!”

### E1-6. Epilog i drugie dno
Czarny ekran. Tekst:

> **„Możesz wybrać każdą drogę. Ale nie możesz wybrać, dokąd prowadzi.”**

Po chwili słyszymy kroki nowej pary, echo „Tom, Tom, Tom” i pojedynczy śmiech dyni. **Pętla trwa dalej**, pamięć kolejnych par nie przenosi się między pełnymi obiegami. Drugie dno nie brzmi „nic nie można zmienić”, lecz: **dopóki bohaterowie przestrzegają reguł dyni, z góry wybierają narzucony finał**. Pozostałe endingi pokazują, że można spróbować reguły złamać.

## ENDING 2 — IMPREZA HALLOWEEN
**Warunek:** wspólny wybór Areny w quizie 2 i niezaliczony obowiązek miauczenia. To jedyny ending, który może uruchomić się przed spotkaniem z Tomem. Po nim dostępny powrót do checkpointu przed wspólnym wyborem zwierzęcia.

### E2-1. Gołębie
**Gołębie:** „ZAMIAUCZ! ZAMIAUCZ!”

**Aleks:** „Miau, kurwa, miau!”

**Sandra:** „Za późno! One są wszędzie!”

Gołębie zasłaniają obraz, liczba ich rośnie, dźwięk przyspiesza, aż nagle ucina się do ciszy. Bohaterowie **mdleją**; nie trzeba realistycznie przedstawiać ich śmierci.

### E2-2. Impreza
Światło nie jest już księżycowe. Słychać muzykę, ludzkie głosy, szklanki. Aleks i Sandra budzą się na halloweenowej imprezie, w zwykłych ubraniach.

**Sandra:** „Aleks…? Co ja robię na kanapie?”

**Aleks:** „Cmentarz. Żółwie. Gołębie. Ja chyba miałem najgorszy sen świata.”

**Sandra:** „Ja też pamiętam gołębie.”

**Aleks:** „To czemu śniliśmy o tym samym?”

**Sandra:** „Może oboje jesteśmy głupi.”

**Aleks:** „To akurat nie wyjaśnia dyni.”

### E2-3. Wypadek i wątpliwość
Wychodzą przed dom. Noc, mokra ulica, odgłos samochodu. Światła reflektorów zalewają ekran, huk, czerń.

**Sandra:** „Aleks, poczekaj! Samochód!”

**Aleks:** „SANDRA!”

**Głos z ciemności [NOWE, może należeć do dyni]:** „A może to tamta noc była snem?”

Na ciemnym asfalcie leży **jedno błyszczące pióro szamańskiego gołębia**. Nie potwierdzać, która rzeczywistość jest prawdziwa.

### E2-4. Epilog
Ekran „ENDING 2 — IMPREZA HALLOWEEN”. Opcje: `[Obejrzyj napisy]` / `[Wróć przed wybór zwierzęcia]`. Powrót wznawia quiz 2, pozwala wybrać inną odpowiedź; w obrębie tego checkpointu pamięć o endingu mają **gracze**, nie postacie w fabule.

## ENDING 3 — SANDRA TOMA
**Warunek:** Sandra ma **pluszaka**, dodatkowo nie ufa Aleksowi **lub** pamięta, że ją pochował; po walce świadomie wybiera zdradę. Jeśli pozostanie przy Aleksie, ten ending się nie uruchamia.

### E3-1. Oferta
Tom, na pozór pokonany, unosi głowę. Pluszak Sandry podświetla się w jej dłoniach.

**Tom:** „Sandro. Przez całą noc mnie nosiłaś. Nawet kiedy Aleks cię zawiódł.”

**Sandra:** „To tylko pluszak.”

**Tom:** „A jednak nie oddałaś go ani razu.”

**[Jeśli Sandra była pochowana] Tom:** „Pamiętasz ziemię? Kto ją na ciebie zasypał?”

**[Jeśli Sandra nie ufała] Tom:** „Sama powiedziałaś, że mu nie ufasz.”

**Aleks:** „Nie słuchaj go. To jest dokładnie to, czego chce.”

**Tom:** „Wybierz: partner, który może cię poświęcić, czy ktoś, kto nigdy nie udawał, że jest dobry.”

**Menu Sandry:** `[Zostań z Aleksem]` / `[Przejdź na stronę Toma]`.

### E3-2. Zdrada
**Sandra (jeśli wybiera Toma):** „Aleks, cały czas mówisz, że mnie uratujesz. A za każdym razem najpierw muszę ratować siebie.”

**Aleks:** „Sandra, co ty odpierdalasz?”

**Sandra:** „Wybieram Toma.”

Pluszak ożywa, a strzałki Sandry przez krótką **minigrę filmową** kierują żółwie na drogę Aleksa. Aleks ma możliwość unikania; brak idealnej reakcji nie zmienia fabuły. Sandra świadomie blokuje bramę.

**Aleks:** „Przecież przed chwilą byliśmy razem!”

**Tom:** „To nie ja cię zdradziłem, Aleks.”

**Sandra:** „To ja. W końcu coś wybrałam sama.”

### E3-3. Korona i reset
Tom kładzie na głowie Sandry koronę z małych pluszowych żółwi.

**Tom:** „Od teraz jesteś panią tej nocy.”

**Sandra:** „To otwieraj bramę. Chcę zobaczyć, co jest za nią.”

Z góry słychać śmiech dyni.

**Dynia:** „Jak miło. Znowu ktoś myśli, że awans oznacza wolność.”

**Sandra:** „Co…?”

**Dynia:** „Koniec obsady. Następny obieg.”

Świat zostaje skasowany. Po prologu pluszak przez ułamek sekundy sam odwraca głowę; Sandra i Aleks **nie pamiętają** zdrady.

### E3-4. Epilog
Napis: „ENDING 3 — SANDRA TOMA”. Finał ma gorzki charakter: Sandra zwyciężyła w konflikcie z Aleksem, ale nadal nie pokonała autorki reguł.

## ENDING 4 — NÓŻ W PLECY
**Warunek:** Sandra ma pluszaka, wybiera **pozorowany rozejm**, Aleks świadomie zgadza się na podstęp. Nie wymaga braku zaufania; może wręcz wynikać ze współpracy.

### E4-1. Udawane pojednanie
**Sandra:** „Tom. Po co dalej walczyć? Przecież masz wszystko, czego chciałeś.”

**Tom:** „Nareszcie ktoś rozsądny.”

**Aleks (cicho do Sandry):** „Ty na serio?”

**Sandra (cicho):** „Zaufaj mi. Pierwszy raz bez gadania.”

Tom schodzi z tronu i zaczyna absurdalnie długą przemowę.

**Tom:** „Jak widzicie, władza wymaga nie tylko siły, ale także wizji, cierpliwości i fantastycznej skorupy…”

**Aleks:** „O kurwa, on ma prezentację.”

**Sandra:** „Ciii.”

### E4-2. Skąd nóż?
**Rozwiązanie problemu rekwizytu [NOWE / DO AKCEPTACJI]:** Tom podczas ceremonii bierze ze stojaka **swój ceremonialny nóż** (wcześniej nie leżał w ekwipunku), żeby przeciąć wstęgę pojednania. Sandra przechwytuje go, gdy Tom odwraca głowę, i podaje Aleksowi. To element **jednorazowy cutscenki**, nie ósmy przedmiot na starcie.

**Sandra (szeptem):** „Teraz albo nigdy.”

**Menu Aleksa:** `[Teraz]` / `[Nie rób tego]`. Druga opcja wraca do pozostałych dostępnych finałów, nie wymusza śmierci Toma bez zgody.

**[Teraz] Aleks:** „Za całe to zoo, ty żółwiu.”

Aleks wbija nóż w plecy Toma w krótkiej, teatralnej animacji. Tom odwraca głowę o nienaturalny kąt.

**Tom:** „To było niegrzeczne.”

**Sandra:** „Witaj w klubie.”

### E4-3. To nie jest koniec
Tom rozpada się na kopie, które gasną jedna po drugiej.

**Aleks:** „Dobra, teraz to już chyba definitywnie.”

**Dynia:** „Zabiłeś rolę, nie reżysera.”

**Sandra:** „Ty też się zaraz doczekasz.”

**Dynia:** „Nie w tej wersji historii.”

Reset. W epilogu kamera przez moment pokazuje ceremonialny nóż tkwiący w szczelinie kamienia cmentarza, zanim świat wróci do ustawienia początkowego. To ślad dla widza, nie wspomnienie bohaterów.

## ENDING 5 — LILA PRZECIW PANU
**Warunek:** wspólnie wybrano Lilę, przed bossem użyto karmy i Lila stanęła po stronie bohaterów. Po zwycięstwie gracz wybiera ucieczkę dzięki Lili **zamiast** sekretnego rytuału dyni.

### E5-1. Lila odmawia Tomowi
**Tom:** „Lila! Wróć do mnie.”

**Lila (demoniczna forma, [NOWE]: mówi pierwszy raz):** „Nie.”

**Aleks:** „Okej. Pies mówi. Zaznaczam w dzienniku.”

**Sandra:** „Ona wybrała nas.”

**Tom:** „Sprzedałaś mnie za jedzenie.”

**Lila:** „Za to, że ktoś nie traktował mnie jak narzędzia.”

### E5-2. Przejście
Po walce otwiera się pęknięcie poza areną. Widać prawdziwy świt, inny niż fałszywy blask w endingu 1.

**Lila:** „Potrafię je utrzymać. Ale kiedy przejdziecie, ktoś musi zostać.”

**Sandra:** „To chodź z nami.”

**Lila:** „Nie mogę. Ale wy możecie.”

**Aleks:** „Nie po to cię karmiliśmy, żeby cię tutaj zostawić.”

**Lila:** „Właśnie dlatego was wypuszczę.”

**Menu obojga:** `[Przejdźcie razem]` / `[Zawróćcie]`. Zawrócenie wraca do menu finałów, nie kasuje oswojenia.

### E5-3. Poświęcenie i poranek
Lila podtrzymuje pęknięcie, Aleks i Sandra przechodzą. Za nimi brama zaciska się wokół sylwetki Lili.

**Sandra:** „Lila!”

**Lila:** „Idźcie. Nie pozwólcie, żeby wasza noc zaczęła się od nowa.”

Na zwykłej drodze wstaje prawdziwe słońce.

**Aleks:** „Nie ma cmentarza.”

**Sandra:** „Nie ma dyni.”

**Aleks:** „A jej nie ma z nami.”

**Sandra:** „Ale jesteśmy tutaj. Dzięki niej.”

### E5-4. Scena po napisach
Puste zoo. Obok siebie siedzą **dwie Lile w psiej formie**. Jedna powoli odwraca głowę, jej oczy są czerwone. Cisza. Koniec. Pętla Aleksa i Sandry jest przerwana, los Lili pozostaje niejednoznaczny.

## ENDING 6 — DWA CIENIE
**Warunek:** oboje odpowiedzieli, że sobie nie ufają, **lub** istnieje aktywna uraza po pochówku, a jedna osoba świadomie wybiera zdradę przy bramie. Wcześniejsze docinki otwierają dialog, ale **nie** zdradzają partnera automatycznie.

### E6-1. Oferta dyni
Za Tomem pojawiają się jedne otwarte drzwi.

**Dynia:** „Wystarczy, że jedno z was wyjdzie. Drugie zostaje.”

**Aleks:** „A czemu mamy ci wierzyć?”

**Dynia:** „Nie musicie. Przecież i tak sobie nie wierzycie.”

**Sandra:** „To nie jest takie proste.”

**[Jeśli ktoś został pochowany] Dynia:** „Kto trzymał łopatę? A kto leżał pod ziemią?”

**Menu każdego:** `[Zostańmy razem]` / `[Ocal tylko siebie]`. Do zdrady dochodzi dopiero, kiedy jedna postać jawnie ją zatwierdzi.

### E6-2A. Aleks opuszcza Sandrę
**Aleks:** „Przepraszam. Nie dam rady jeszcze raz przez to przejść.”

**Sandra:** „Aha. Czyli teraz już nawet nie udajesz, że mnie uratujesz?”

**Aleks:** „Ja… nie mam już siły.”

**Sandra:** „Idź. Ale nie mów potem, że zrobiłeś to dla mnie.”

Aleks przechodzi przez bramę i zamyka ją za sobą. Sandra zostaje w pustej arenie, słyszy coraz bliższy głos dyni.

### E6-2B. Sandra opuszcza Aleksa
**Sandra:** „Cały czas mam być tą, która czeka. Tym razem wybieram siebie.”

**Aleks:** „Sandra, proszę. Nie rób mi tego.”

**Sandra:** „Ty też miałeś kiedyś wybór.”

**Aleks:** „Nie musimy tego kończyć w ten sposób.”

**Sandra:** „A jednak.”

Sandra przechodzi, zamyka bramę. Aleks zostaje po stronie pętli.

### E6-3. Pusty świat
Uciekinier dociera na pustą ulicę o brzasku. Nie ma ptaków, ludzi, samochodów, nawet wiatru. Pod nogami rzuca **dwa cienie**, choć jest sam.

**[Jeśli Aleks wolny] Aleks:** „Sandra? Gdzie jest ktokolwiek?”

**[Jeśli Sandra wolna] Sandra:** „Aleks? …Nie. Przecież sama tego chciałam.”

Drugi cień przesuwa się w przeciwnym kierunku, jakby próbował wrócić do bramy.

**Dynia (głos zza zamkniętej bramy):** „Wolność to też cena. Miłej ciszy.”

### E6-4. Epilog
Osoba pozostawiona w pętli słyszy pierwsze ostrzeżenie dyni, lecz nie ma partnera. Dla niej mechanizm pułapki trwa nadal. Uciekinier pozostaje w martwym, pustym świecie; **nie** oznacza to dobrego zakończenia. Napis „ENDING 6 — DWA CIENIE”.

## ENDING 7 — OSTATNI ŚWIT (SEKRETNY)
**Warunek [częściowo KANON / balans DO AKCEPTACJI]:** Aleks wybrał karmę, Sandra pluszaka, oboje sobie ufają, wspólnie wybrali Lilę, Lila została oswojona, mają nożyce z domku, na arenie uwolnili co najmniej dwa echa, nie wybrali zdrady i oboje świadomie wybierają „Złam zasady dyni”.

### E7-1. Odkrycie
Tom upada, lecz zamiast bramy ucieczki na podłodze pojawia się symbol dyni. Lila odkrywa mechanizm trzech pierścieni pod pentagramem.

**Lila:** „To nie Tom trzymał nas w nocy. On tylko pilnował drzwi.”

**Sandra:** „Czyli dynia?”

**Aleks:** „Mówiłem, że nie ufam owocom.”

**Dynia (z góry):** „Nie dotykajcie tego.”

**Sandra:** „Pierwszy raz prosisz, zamiast rozkazywać.”

**Aleks:** „To chyba dobry znak.”

### E7-2. Arena dyni — trzy fazy kooperacyjnej minigry
**Świat:** przestrzenna komnata z trzema kamiennymi symbolami: **księżyc, krzyż, dynia**. Aleks przesuwa symbole WASD i zatwierdza, Sandra obraca pierścienie strzałkami. Lila wstrzymuje zamykanie przejścia. Pomyłki resetują tylko zagadkę, nie cały przebieg gry.

**Faza A — KSIĘŻYC:** dopasować symbol do układu kamieni z prologu.

**Dynia:** „W prologu wszystko było łatwiejsze, prawda?”

**Aleks:** „Nie, właśnie nie było!”

**Sandra:** „Lewy pierścień! Teraz, Aleks!”

**Faza B — KRZYŻ:** na arenie pojawiają się duchy uwolnionych ech; wskazują brakujący wzór. Zewnętrzny pierścień obraca Sandra, Aleks przesuwa znacznik na kamieniu.

**Echo Aleksa:** „Znamy drogę. Nie musicie ginąć tak samo jak my.”

**Echo Sandry:** „Tylko nie rozdzielajcie się.”

**Faza C — DYNIA:** dynia wywołuje kopie dawnych ostrzeżeń. Gracze unikają wolnych fal energii, jednocześnie ustawiają trzeci symbol. Łatwe do odczytania czerwone strefy; gracze mogą powtarzać próbę bez utraty sekretnego zakończenia.

**Dynia:** „Jeżeli przerwiecie pętlę, nie będzie kolejnego rozdziału!”

**Aleks:** „To sobie znajdź inną książkę!”

### E7-3. Jednoczesne potwierdzenie
**[PROPOZYCJA]** Oboje muszą w ciągu 2 s zatwierdzić gotowy układ; interfejs jasno pokazuje, kto już nacisnął. Dla niedoskonałej klawiatury można zatwierdzić kolejno, jeśli jest problem z równoczesnym wejściem — zasady narracji pozostają kooperacyjne.

**Sandra:** „Aleks. Teraz. Razem.”

**Aleks:** „Razem.”

**Oboje:** „TERAZ!”

Mechanizm pęka. Dynia próbuje wyświetlić początek prologu, ale obraz urywa się w pół zdania.

**Dynia:** „Aleks! Sandra! Za póź… Nie. Nie! To tak nie miało działać!”

**Lila:** „Nie tym razem.”

### E7-4. Prawdziwy świt
Krzyże na arenie rozpadają się na światło. Echa odzyskują własne postacie — wybuchy przy Tomie były projekcjami uwalnianej energii, nie zabijaniem oryginałów. Lila stoi pośrodku i tym razem może odejść razem z bohaterami.

**Aleks:** „Sandro. Patrz.”

**Sandra:** „Słońce?”

**Aleks:** „Pierwszy raz w tej grze wygląda legalnie.”

**Lila:** „Możemy iść?”

**Sandra:** „Tym razem wszyscy.”

**[Jeśli zapalono znicz]** duch odwiedzonego grobu pojawia się na moment i kiwa głową. Bez znicza nie dodawać tej sceny; ending pozostaje dostępny.

Kamera unosi się ponad pustą drogę. Nie ma ciała, krzyża, gołębi ani dyni. Widzimy prawdziwy świt, nie pułapkę.

**Napis:** „ENDING 7 — OSTATNI ŚWIT”. Epilog: Aleks, Sandra i Lila wychodzą wolni, a pętla zostaje przerwana. **Po napisach** cisza — żadnego ukrytego resetu podważającego zwycięstwo.

---

# DODATKOWE ROZMOWY MIĘDZY SCENAMI

Poniższe krótkie kwestie [NOWE] pojawiają się tylko raz, nie zasłaniają wroga ani ważnego komunikatu. Mają wypełnić ciszę, ale nie zmienić gry w ciągły monolog.

| Trigger | Dialog |
|---|---|
| Po zniczu | Sandra: „Dobrze zrobiłeś.” Aleks: „Nie przyzwyczajaj się do moich dobrych uczynków.” |
| Grób bez znicza | Sandra: „Może jednak zapalimy?” Aleks: „Nie wszystko musi mieć osiągnięcie.” |
| Wrony przy drodze | Sandra: „Te ptaki mają zbyt dużo pewności siebie.” Aleks: „Bo my tu jesteśmy gośćmi.” |
| Domek i lustro | Aleks: „Przez chwilę wyglądałem tam jak ktoś inny.” Sandra: „Po prostu się boisz.” |
| Nieznajomy ostrzega | Sandra: „Ten, który wygląda jak on… zapamiętaj to.” Aleks: „Spoko. Zanotuję na gaźniku.” |
| Po zabiciu Borysa | Sandra: „Nie sprawdzałeś nawet, ile miał na koncie.” Aleks: „Przy tej cenie życia to i tak bez znaczenia.” |
| Po zabiciu Weroniki | Sandra: „Dobra, teraz na pewno będzie nas straszyć na poprawce.” Aleks: „Przecież nawet nie jestem na jej roku.” |
| Po zabiciu Gabrysia | Aleks: „Wybacz.” Sandra: „Powiedz to wtedy, kiedy będzie cię słyszał.” |
| Pierwszy fotel quizu | Sandra: „Nie ufam już żadnym meblom.” Aleks: „A mnie?” Sandra: „Właśnie sprawdzimy.” |
| Lila przy drzwiach | Sandra: „Lila idzie za nami.” Aleks: „Jak agent nieruchomości, co pokazuje mieszkanie.” |
| Zebrane piąte pióro | Aleks: „Jeszcze pięć. Zostanę ornitologiem.” Sandra: „Zostań kimś, kto oddaje długi.” |
| Po zdjęciu foczej skóry | Aleks: „Nie dotykaj tego.” Sandra: „Spokojnie, nie mam na to półki.” |
| Przed identyfikacją klona | Sandra: „Oczy. Patrz na oczy.” Aleks: „W tym ASCII? Dobra, próbuję.” |
| Przed uratowaniem echa | Echo: „To nasze jedyne wyjście.” Sandra: „Aleks, nożyce!” |
| Po wskrzeszeniu Sandry (wariant zaufania) | Sandra: „Jak ci znowu przyjdzie do głowy mnie poświęcić, przynajmniej uprzedź.” Aleks: „Najchętniej już bym nikogo nie wybierał.” |
| Po zjedzeniu Chrupka | Aleks: „Hau.” Sandra: „Nie. Po prostu nie.” |

---

# MACIERZ WYBORÓW — CO MA REALNY SKUTEK

| Wybór / akcja | Teraz | Później / ending |
|---|---|---|
| Startowy przedmiot Aleksa, Sandry | osobne kwestie, zdolność właściciela | Rem/gaźnik/karma/widelec/gouda/długopis/pluszak mają konkretne zastosowania |
| Wybór grobu | unikatowy nagrobek + dialog miły/niemiły | unikatowy atak Toma, riposta zmarłego |
| Wyzwisko przy Gabrysiu | inne słowo w kwestii | identyczne wyzwisko w jego riposte |
| Zapalenie znicza | mała scena | jednorazowa osłona ducha w bossie |
| Najpierw ratunek czy grób | inne przejście | ostrzeżenie o klonie tylko przy szybkiej pomocy |
| Nożyce w domku | możliwość zdjęcia nieznajomego | echa, ułatwienie bossa i ending 7 |
| Wybór ofiary | różne sceny przed Goon Roomem | duch poświęconej osoby, ewentualna uraza, boss |
| Pochówek | Epitafium, powrót | zapamiętana krzywda, możliwość zemsty / ending 6 |
| Zaufanie obojga | odrębne kwestie | zdrada, współpraca, ending 7 |
| Wspólne zwierzę | Chrupek/Lila/Arena/ETF | bonus, demon i wyjście, ending 2, gołąb |
| Chrupek — zjedz | buff HP/damage | losowe szczekanie i wykrywanie |
| ETF porażka | pożyczka | 10 piór lub krótka walka przed bossem |
| Widelec i gouda | redukcja liczby fok z 5 | mniej ryzyka foczej klątwy |
| Niezaliczona foka | Aleks jako foka | odczarowanie przez Sandrę, brak blokady endingów |
| Nieprzywitanie 5 Tomów | dzień u żółwi | 60 s TikToka dla Aleksa |
| Kartka gaźnik | podpowiedź w domku | wskazówka w grze 3 klonów |
| Nakarmienie Lili | odmowa posłuszeństwa Tomowi | pomoc w bossie, endingi 5 i 7 |
| Uwolnienie ech | eksplozje obrażeń przeciw Tomowi | licznik do sekretnego finału |
| Zaufanie Tomowi / ucieczka / zdrada | jawny wybór finałowy | odrębna cutscenka, epilog i status pętli |

---

# REGUŁY WDROŻENIA DIALOGÓW I TESTY FABUŁY

1. Wpisz wszystkie kwestie do **edytowalnych danych**, nie na sztywno do logiki scen. Każda linia ma `sceneId`, `speaker`, `text`, `conditions`, `once`, `priority`, `interruptible`.
2. Każda decyzja zapisuje flagę. Nie emituj kwestii `mean`, jeśli postać wybrała `kind`; nie odtwarzaj alternatywnych endingów równocześnie.
3. Wybór grobu i wybór ofiary to **dwie różne** flagi, nie jeden stan.
4. Pętla resetuje pamięć postaci przy rzeczywistym resecie dyni; log ukończonych endingów gracza może zostać w meta-zapisie.
5. Zwierzę wybiera się **raz wspólnie**. Nie uruchamiaj jednocześnie dwóch efektów z Quizu 2.
6. **Nie pokazywać Alexa (X) ani Salsy w akcie IV przed końcem głównego endingu nr 1.** Ich scena stanowi ostatnią część tego endingu; nowa para zaczyna od dyni i dochodzi do krzyża.
7. Bez mikrofonu wszystkie istotne akcje mają sterowanie klawiaturą. Nie wymagać perfekcyjnego rozpoznawania polskich słów.
8. W razie przegrania bossa lub nieudanej próby symboli dyni checkpoint, bez cofania całej gry.
9. Animacje krótkich dialogów nie mogą ukrywać czerwonych ostrzeżeń ataków ani modelu Mściciela.
10. Każdy ending musi mieć **warunek, wybór, scenę, dialog, epilog, status pętli i ekran końcowy**. Ending 2 ma własny checkpoint; ending 1 reset pętli, 3 i 4 reset, 5 i 7 przełamują pętlę, 6 rozdziela losy.
11. Teksty [NOWE / DO AKCEPTACJI] są szkicem twórczym. Dopiero akceptacja autora zmienia ich status w kanon. Właściwe imiona, nazwy, wybrane epitafia i rozstrzygnięty wątek końca nr 1 mają już status kanoniczny.

## Stan zamknięcia fabuły

**Pełny przebieg wszystkich siedmiu zakończeń został tu scenariuszowo rozpisany, ale to nadal szkic do wspólnej redakcji.** Najistotniejsze nowe decyzje do zatwierdzenia: dokładne brzmienie dialogów w aktach I–IV, układ sekretnych trzech faz dyni, nóż ceremonialny Toma, opcjonalna Sesja Weroniki, sposób pokazania nieznajomego jako echa poprzedniego Aleksa oraz parametry timerów. Nie zastępuje to testów gry ani implementacji w istniejącym repozytorium.
