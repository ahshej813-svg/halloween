# HALLOWEEN — mapa świata, interakcje, ekwipunek, bestiariusz i drzewo wyborów

**Wersja projektowa v11 · 29.10.2026**  
**Do Codexa:** uzupełnienie, a nie zamiennik pełnego scenariusza v8, logiki automatycznych endingów v10 oraz zasad ASCII 3D v5–v7.

> **Rozdzielenie statusów:** **KANON** — decyzje zatwierdzone w rozmowie; **PROPOZYCJA v11** — nowe dekoracje, przeciwnicy, bronie, statystyki, pozycje oraz balans. Nie twierdzimy, że te elementy istnieją w kodzie. Istniejącego repo gry nie otrzymaliśmy, więc przed implementacją Codex musi wykonać audyt scen i zachować działające funkcje.

## 1. Nieprzekraczalne zasady

1. Gra **Halloween**, 3D z bogatą oprawą ASCII, księżyc, kamienna droga, cmentarz, mroczna czerwień krwi, wiatr, drzewa, wrony i nietoperze. **Bez rzeczki i bez pomarańczowego światła lamp**. Ważne postacie i interakcje muszą być czytelne w 1366×768.
2. Dwoje graczy na jednej klawiaturze: **Aleks (KS) WASD**, **Sandra strzałki**; początkowo każde wybiera **jeden nieprzekazywalny osobisty artefakt**. Nożyce to późniejszy wspólny rekwizyt świata.
3. **Nie dodawaj nowych żywych NPC**. Wrogowie to zjawy, opętane zwierzęta/obiekty, echa i klony; nie tworzą nowych wątków osobowych.
4. Pamięć Aleksa i Sandry resetuje się w kolejnym obiegu. Alex (X) i Salsa **nie spotykają** ich po zoo; pojawiają się dopiero po tragedii w endingu 1.
5. **Ending 2:** Arena → porażka miauczenia → omdlenie → **pobudka obojga w szpitalu**; oboje pamiętają **ten sam sen**. Wcześniej po imprezie Halloween potrącił ich samochód. Następnie opcja powrotu do checkpointu przed quizem o zwierzęciu.
6. **Nie ma końcowego menu endingów.** Gra automatycznie rozstrzyga finał na podstawie zebranych flag; kolejność konkurujących warunków z v10 nadal stanowi **propozycję implementacyjną**, a fabuła „Dwóch cieni” jest wciąż robocza.
7. Elementy opcjonalne nie mogą softlockować głównej trasy. Unikaj godzinnego grindu oraz zbędnego skakania między lokacjami.

## 2. Topologia świata — rozkład stref

To **schemat sąsiedztwa i kolejności**, a nie dokładne współrzędne istniejącego kodu. Wysokości i odległości dopasować do aktualnego projektu; bez zmiany kluczowych lokacji.

| ID | Strefa | Orientacja i rekwizyty | Obowiązkowa akcja | Elementy poboczne / powiązania |
|---|---|---|---|---|
| Z00 | Wybór przedmiotów | Rozdzielony ekran z podestami przedmiotów, ciemna tkanina, po jednym stojaku na rzecz | Aleks i Sandra potwierdzają artefakty | Obejrzenie każdego przedmiotu daje krótką ripostę; nie są przenoszone między graczami |
| Z01 | Dynia i prolog | Wielka dynia na kamiennym podwyższeniu, skręcone pnie, księżyc nad koronami, poruszające się chmury | Filmowe ostrzeżenie; przejście otwiera się na drogę | Puls dyni, cień na ziemi, ciche bicie serca, odłamane gałęzie |
| Z02 | Droga | Kręta brukowana ścieżka, korzenie przebijające kamień, płot z dziurą, wrony nad ciałem, krew | Zobaczenie ciała przy drodze; przejście do cmentarza | Pierwszy przeciwnik, gałąź-uzbrojenie, rozkładalne kolce krzaków, ślady stóp |
| Z03 | Brama cmentarza | Żelazne skrzydła, dwa kamienne filary, wyblakły napis, opuszczony wózek, kruki na poprzeczce | Wejście na cmentarz; **później** miejsce werdyktu | Możliwość zbadania inskrypcji i podniesienia małego pancerza |
| Z04 | Cmentarz — główny plac | Rozgałęzione ścieżki; grób Gabrysia bardziej w lewo, Borysa dalej w prawo, Weroniki przy zarośniętym narożniku; krzyż z żywym nieznajomym wyraźnie widoczny za alejką | Wybrać **jeden** grób; znicz osobno; zdecydować kolejność grobu i ratunku | Groby mają unikatowe obiekty, tło i dialogi; cienie są mobilne, ale nie przysłaniają nagrobków |
| Z05 | Domek przed bramą | Odpadające deski, stół z nożycami, ciała z poprzednich pętli, porzucone narzędzia, skrzypiące drzwi | Wziąć nożyce lub świadomie zostawić; powrócić do krzyża | Badanie zwłok, hak jako broń, interaktywny blat, odcisk znajomej dłoni |
| Z06 | Mściciel i werdykt | Wolna przestrzeń w obrębie cmentarza, którą kamera widzi bez drzew; potem plac przed bramą z pięcioma wyraźnymi znacznikami decyzji | **Najpierw pokazać widocznego Mściciela**, odrodzić trzy osoby, potem przemieścić się przed bramę i wybrać ofiarę | Reakcje odrodzonych na epitafia i wcześniejszy ton wypowiedzi |
| Z07 | Goon Room | Podziemne pomieszczenie, dwa fotele, monitory, podłogowe symbole, cztery nisze quizowe, wejście do mówiących drzwi | Wskrzeszenie jeśli trzeba; quiz 1/2/3 | ETF i Tom Clicker, pióra 1–3 jeśli dług, plakietka „Sesja Weroniki”; bez obowiązkowych walk podczas quizu |
| Z08 | Zoo — dwa skrzydła | Oś widokowa ze środkowym pomostem; **lewa alejka** fok dla Aleksa, **prawa** pięciu żółwi Tomów dla Sandry; tablice i barierki | Obie równoległe minigry | Skrzynki z uzbrojeniem, łamigłówki dekoracyjne, pióra 4–6, tabliczka odczarowania foki |
| Z09 | Pusta droga po cofnięciu | Powrót do Z02, ale **brak ciała i brak człowieka na krzyżu**; znajome kamienie mają odmienny układ, światło zimniejsze | Zrozumieć cofnięcie czasu; przetrwać presję; gołąb jeśli nie spłacono długu | Pióra 7–10, widmowe ślady, krótkie starcie przed bossem |
| Z10 | Przedpokój finału | Kamienny krąg, ślady klonów, widoczna brama areny; skrytka sprzętu, miejsce przygotowania | Weryfikacja Lili, długu i klonów | Ostatnia okazja do uleczenia i odczytania ostrzeżeń, ale **bez przepisywania początkowego artefaktu** |
| Z11 | Arena Toma | Prawdziwa głęboka arena 3D, ciemna podłoga i pentagram, krzyże wokół; widoczne echa bohaterów | Faza I i II; walki, znicz, echa | Trzy ataki zależne od wybranego grobu; uwalnianie ech nożycami |
| Z12 | Finały | Osobna scena odpowiednia dla flag; zwykła droga/dynia lub szpital, pusty świat itd. | Automatycznie wybrane zakończenie | Zapis ukończonego endingu, ewentualny checkpoint/restart zgodny z historią |

### Czytelność na mapie
- Kamienna trasa ma być wizualnie spójna, z bocznymi punktami zainteresowania **bez labiryntu**; główną drogę wyznacza przerwana linia jasnych kamieni, ślady i ruch wron, nie strzałki rozsiane po całej mapie.
- W odległości ok. **2–3 m w skali gry** od interaktywnego obiektu pojawia się dyskretny znak `◆`, a etykieta/podpowiedź w ostrym HUD, **poza shaderem ASCII**. Wartości w metrach robocze.
- Plany aren walk muszą pozostawiać przestrzeń dla obu postaci. Dekoracje i moby nigdy nie zasłaniają Mściciela w chwili ujawnienia.
- Klimat buduj poprzez geometrię, różnice głębokości, księżycowe światło konturowe i dźwięk, nie przez obniżanie kontrastu sylwetek do zera.

## 3. Dekoracje i interakcje — co dokładnie gracz robi

| Obiekt / miejsce | Zastosowanie i animacja | Konsekwencja / stan | Status |
|---|---|---|---|
| Luźny kamień, Z02 | `F` / `Enter`: kopnięcie; kamień stacza się i straszy wrony | Jednorazowy żart i kierunek dalszej drogi | propozycja |
| Gniazdo kruka przy ciele, Z02 | Kruk trzepocze skrzydłami; można obejrzeć bez walki | Podbija atmosferę, podpowiada o ofiarach | propozycja |
| Złamana gałąź, Z02 | Podniesienie broni treningowej | Pierwsza walka nie wymaga pięści | propozycja |
| Dziura w ogrodzeniu, Z03 | Krótki podgląd cmentarza z boku | Gracze widzą grób/krzyż przed wejściem | propozycja |
| Wózek grabarza, Z03 | Przesunięcie przez jednego gracza, metaliczny dźwięk | Odsłania dostęp do lekkiego pancerza | propozycja |
| Nagrobek Gabrysia | Unikatowy model z kotem ASCII; odczyt pełnego napisu; intencja miła/niemiła, po niemiłej słowo `dziwko/szmato/suko` | Pamięta ton i wyzwisko; riposta Gabrysia po odrodzeniu | kanon + propozycje detali |
| Nagrobek Borysa | Rzeźbione monety, pęknięta marmurowa teczka i napis o milionerze | Reakcje Aleksa/Sandry i Borysa; crypto motyw w bossie | kanon + dekoracja nowa |
| Nagrobek Weroniki | Stos kamiennych książek, połamana ekierka i niedokończony indeks | Dialogi o studiach i matematyce, opcjonalna „Sesja poprawkowa” | kanon + dekoracja nowa |
| Znicz | Osobne kliknięcie/interakcja **po** obejrzeniu grobu | `candleLit`; duch osłania raz w bossie | kanon |
| Krzyż nieznajomego | Próba odcięcia więzów po zabrania nożyc; wcześniej bez nich nieudana próba | Zawsze śmierć po wykrwawieniu; przy szybkiej pomocy dodatkowa wskazówka | kanon |
| Stół domku i nożyce | Nożyce na środku blatu, nie ukryte za obiektem | `scissorsKept`; ratunek i uwalnianie ech | kanon |
| Ciała w domku | Badając ubranie/ślady gracz dostrzega podobieństwa do poprzednich pętli | Narracyjna wskazówka; nie kolejny żywy NPC | kanon idei |
| Wystająca deska w domku | Interakcja powoduje skrzypnięcie i krótki komentarz | Brak wymaganej nagrody; jednorazowy ambient | propozycja |
| Fotel Goon Roomu | Interaktywne zajęcie miejsc oddzielnie, blokada quizu do czasu gotowości obojga | Start pytań i zapis | kanon |
| Pióra szamańskiego gołębia | Delikatnie chłodne, jasne obrysy w 10 stałych widocznych punktach | Przy 10 gołąb przychodzi i odbiera pióra | kanon, rozmieszczenie propozycja |
| Tablica foki | Wyraźny przepis na zdjęcie klątwy, wymagana walka Sandry z foczą formą | Brak śmierci Aleksa; ludzki Aleks wyskakuje po ciosie | kanon |
| ASCII TikTok w zoo | Gdy Sandra zostaje na „dzień”: Aleks ma ekranową, przewijaną imitację TikToka przez 60 s | Humor, czas nie wymaga grindu | kanon |
| Znaki przy wejściu do Z11 | Pokazują narysowane łapy/kręgi/żółwie — nie zdradzają wszystkiego | Nauka sygnałów telegraphów przed bossem | propozycja |
| Nożyce + echa na krzyżach | Uwolnione echa wbiegają w Toma i eksplodują | Obrażenia bossowi, `echoesRescued` liczone pod secret ending | kanon |

**Tempo interakcji:** co ok. 15–30 sekund eksploracji gracz powinien mieć coś ciekawego w kadrze, ale nie spamuj interakcji co krok. Zamiast obowiązkowych zadań pobocznych: łącznie 12–18 czytelnych jednorazowych interakcji na głównej trasie.

## 4. Wyposażenie: osobisty artefakt ≠ broń ≠ pancerz

**KANON:** startowy artefakt jest prywatny, nie może być przekazany, pozostaje przypisany do postaci; nożyce to wspólny rekwizyt fabularny. **PROPOZYCJA v11:** osobne sloty: `artefakt`, `broń`, `pancerz` i `rekwizyty fabularne`. Zebrane bronie/pancerze też nie są wymieniane między postaciami; każde ma własny ekwipunek.

### Broń — statystyki do balansu, nie fakty z kodu

| Broń | Gdzie | Styl walki | Przykładowe obrażenia / czas | Dostępność |
|---|---|---|---|---|
| Pięści | Od początku | Krótki łuk, auto-target sąsiedniego wroga | 6 / 0,45 s | Oboje, zawsze |
| Sucha gałąź | Z02, łatwo widoczna przy płocie | Większy zasięg, dobra do tutorialu | 9 / 0,55 s | Dwa osobne egzemplarze lub pickup instancyjny |
| Drewniany kołek | Z04 przy pomniku | Szybki cios w pojedynczy cel | 11 / 0,50 s | Wariant dla osoby wybierającej szybsze ataki |
| Zardzewiała łopata | Z04 koło mogiły | Wolniejszy, szeroki zamach, odrzut zjawy | 15 / 0,90 s | Jedna plus alternatywny kołek dla drugiej osoby |
| Żelazny hak | Z05 w domku, **nie nożyce** | Średni zamach, krótkie ogłuszenie | 12 / 0,70 s | Opcjonalny |
| Trzonek od tablicy | Z08 zoo po minigrach | Szybkie ogłuszanie drobnych wrogów | 10 / 0,50 s | Opcjonalny |
| Odłamek nagrobka | Z10, skrzynka przygotowań | Mocny atak o szerokim łuku, wolniejszy | 17 / 1,00 s | Opcjonalny, oboje mogą mieć kopię |

**Zasady:** podstawowy atak ma automatyczne naprowadzanie w ograniczonym sektorze; żaden przeciwnik nie wymaga celowania myszą. Przycisk uderzenia to **Spacja** Aleksa i **prawy Shift** Sandry — roboczo wg v5; remap + test ghostingu. Cooldown widoczny przy obu postaciach. Nie wymuszaj potrójnego współwciśnięcia dla zwykłego ciosu.

### Pancerze

| Pancerz | Znalezienie | Efekt propozycji | Wizualny odpowiednik w ASCII |
|---|---|---|---|
| Szal żałobny | Z03 przy wózku | -5% otrzymanych obrażeń | Szersza sylwetka ramion, pale glify |
| Płaszcz grabarza | Z05 obok stołu | -10% obrażeń; bez kary ruchu | Długie linie znaku wokół nóg |
| Skorupa żółwia | Z08 po zadaniu Sandry | -15% obrażeń, -5% prędkości | Zaokrąglony grzbiet ASCII |
| Pancerz z potłuczonego kamienia | Z10 przed bossem | -12% obrażeń, odporność na odepchnięcie 1/s | Kanciaste segmenty ASCII |

Tylko **jeden** pancerz na raz; przełączenie wyposażenia przez interakcję z ekwipunkiem, pauza przy bezpiecznych stacjach; bez wymiany przedmiotów pomiędzy graczami. Nie pozwalaj, by jakakolwiek broń/pancerz zastępowała karmę, pluszaka, kartkę lub nożyce przy sprawdzaniu zakończeń.

### Leczenie i balans
- Małe **apteczki z bandażem** w trzech jasno widocznych punktach (Z03, Z08, Z10); jedna na osobę w danym miejscu lub odzyskanie obu HP przy checkpointach. Brak grindu i płatności.
- Skutki Chrupka pozostają specjalne: wysokie premie HP/obrażeń i losowe szczekanie. Broń ani pancerz nie daje identycznej premii, żeby wybór Chrupka nadal był charakterystyczny.
- Zwykły przeciwnik zadaje małe obrażenia, walka trwa kilka–kilkanaście sekund, oboje mogą się podnieść po powaleniu; przed powtórką checkpoint zamiast restartu gry.

## 5. Bestiariusz i nauka walki — nie tylko foki

Dostawiamy **NOWYCH WROGÓW NIEBĘDĄCYCH ŻYWYMI NPC**. Są krótkimi spotkaniami, nie zmieniają fabuły ani docelowej liczby pięciu fok.

| Wróg | Wygląd ASCII 3D | Strefa i ilość robocza | Atak i nauka | Zasada po pokonaniu |
|---|---|---|---|---|
| Cień korzeni | Złożony z `# / \\`, wyłania się z krzaków | Z02: **1** przy drodze | Idzie wolno do Aleksa, wyraźny półkolisty zamach. **Samodzielny podstawowy atak Aleksa** | Znika w chmurze znaków, daje krótką kwestię Sandry |
| Opętana wrona | Skrzydła z `/\\`, oczy dwa jasne punkty | Z03/Z04: **1–2** | Krótki lot po linii, zapowiedź trajektorii. **Sandra trenuje atak i unik** | Odfruwa/rozpada się; zwykłe wrony w tle pozostają neutralne |
| Mogiłowy cień | Powolna, kamienna sylwetka bez twarzy | Z04: **1** opcjonalny | Zamach w widoczny czerwony wycinek. **Współpraca dwóch graczy** | Spada kołek lub wskazówka o pancerzu |
| Kościana ręka | Ręka wysuwająca się z ziemi | Z05: **1** przy wyjściu | Nieruchomy cel z prostym, długim telegraphem. **Trening uderzenia/oddalenia** | Natychmiast znika; nie atakuje w trakcie ratowania nieznajomego |
| Żółw marionetka | Mały wrogi automat o czerwonym obrysie, różny od pięciu witanych Tomów | Z08: **1–2** pobocznie, poza mini żółwi | Wolne pociski, można uniknąć samym marszem. **Trening walki przed Tomem** | Odpada skorupa/wyposażenie |
| Echo pętli | Rozmyta sylwetka, znak `?` na twarzy | Z09: **2**, po drodze do bossa | Naprzemienne ataki, odstępy na reakcję. **Kooperacja i ożywianie** | Zostawia wyraźny ślad do bramy areny |
| Dłużny gołąb | Gołąb szaman, rosnący cień | Z10 tylko przy niespłaconym długu | Miniwalka lub zwrot piór | Nigdy nie blokuje na stałe bossa |
| Foki | Ustalony absurdalny model zwierzęcia | Z08, **5** pomniejszane przez widelec/goudę | Trzon wyzwania Aleksa; porażka daje foczą klątwę | Zasady z v8, bez dodatkowej zmiany |
| Klony Toma i Angry Tom | Bossowie i ataki jak w v5/v8 | Z10–Z11 | Kombinacja wcześniejszych umiejętności | Finał automatycznie rozstrzygany na podstawie flag |

### Konkretna sekwencja tutorialu

**T01 — Aleks (Z02):** po obejrzeniu ciała cień korzeni blokuje 3 metry drogi. Kamera pozostaje czytelna, tekst „SPACJA — ATAKUJ” pojawia się raz. Sandra może pomóc, ale pierwszy wróg ma mało HP. Jeśli Aleks nie ma gałęzi, używa pięści.

**T02 — Sandra (Z03/Z04):** opętana wrona ląduje na filarze i przygotowuje prostoliniowy nalot. Informacja „PRAWY SHIFT — ATAK / PRAWY CTRL — UNIK” i linia zagrożenia; wrona czeka na akcję bez ciągłego karania. Alternatywne keybindy dostępne.

**T03 — oboje (Z04):** mogiłowy cień ma prosty zamach obszarowy. Wyświetla się podpowiedź o współpracy i podnoszeniu powalonego gracza. Po wygranej znikają podpowiedzi tutorialowe, ale mechaniki pozostają.

**T04 — zoo (Z08):** foki i żółwie nie startują, dopóki oboje nie zajmą wyraźnie oznaczonych pozycji. Żadna postać nie zostaje zablokowana przez ćwiczenie drugiej.

**Ułatwienia:** w każdej walce przed Tomem — oznaczenie ostrzeżenia także symbolem, nie tylko kolorem; minimum ok. 1 s zapowiedzi u małych mobów; agresja oparta na odległości, nie na odliczaniu czasu od wejścia na mapę. Bardzo łatwa dostępna opcja trudności. Przy śmierci pary checkpoint lokalny, bez softlocka.

## 6. Boss Tom — wykorzystanie nauczonych ruchów

**Siedem zwykłych ataków (wcześniej ustalone):** rząd żółwi (zawsze wspólny bezpieczny pas), łapa gniewu (widoczna czerwona strefa przez ok. 1,8 s), krzyżowy promień, pentagram (ok. 2,3 s ostrzeżenia + wolna fala), szarpnięcie czasu, deszcz dyni i przemarsz klonów. **Dodatkowo jeden atak od grobu**: Meimei Apokalipsa / Klątwa Wiedźmy / Krypto Krach. Znicz daje duchowi jednorazową ochronę. Oswajana Lila i echa z nożycami pomagają w walce.

**Brak kar za słabszy laptop:** kolizje i zapowiedzi są liczone w stałych sekundach logiki, nie w klatkach; tryb 30 FPS nie skraca okna uniku. Pancerz widoczny w modelu, ale nie zalewa postaci ASCII i nie zasłania czerwonej strefy uderzenia.

## 7. Wybory i 7 zakończeń — **bez menu finału**

Automatyczny resolver z `HALLOWEEN_WARUNKI_AUTOMATYCZNE_v10.md` jest źródłem szczegółowej logiki. **Proponowana** kolejność testów:

1. Wspólny wybór Areny i porażka → **E2 Szpital i wspólny sen** (natychmiast w trakcie rozgrywki, potem checkpoint przed zwierzęciem).
2. Sandra ma pluszaka i nie ufa Aleksowi **lub** pamięta, że ją pochował → **E3 Sandra Toma**.
3. Oboje nie ufają lub pozostaje nierozliczony pochówek → **E6 Dwa cienie** (*jego fabuła i reguła automatycznego uruchomienia wymagają jeszcze zatwierdzenia*).
4. Pluszak Sandry, wcześniej uzgodniony plan podstępu z Tomem, Aleks popiera go → **E4 Nóż w plecy**.
5. Aleks karma + Sandra pluszak + oboje ufają + Lila oswojona + nożyce + ≥2 echa + brak konfliktu → **E7 Ostatni świt**.
6. Wspólnie wybrana, oswojona Lila → **E5 Lila przeciw panu**.
7. Reszta → **E1 Nieskończona noc**: Sandra przy drodze, Aleks na krzyżu, **dopiero później** Alex (X) i Salsa.

Nie dodawać finalnego ekranu „wybierz ending”. Niech wynik wypływa z wyposażenia i działań. Każdy ending ma cutscenkę i zapis `endingSeen` dopiero po pełnej scenie.

## 8. Sugestie do implementacji i testów

### Dobre praktyki
- Każdy rekwizyt posiada `id`, `zoneId`, `position`, `interactionRadius`, `oneShot`, `requirements`, `stateChanges`, `visualCue` i `fallback`. Moby mają `attackTelegraph`, `attackRange`, `cooldown`, `retreatDistance` oraz `spawnLimit`.
- Dla każdego gracza osobny `weaponSlot`, `armorSlot`, `artifactSlot`. Ekwipunek i save zapisują je osobno. Źródła artefaktów i ich flagi nie przechodzą na drugą osobę.
- Na bliskich planach 3D zamrażaj dekoracyjny flocking ptaków podczas ważnych scen, nie usuwaj ich z krajobrazu. Statyczne groby, gałęzie i kamienie — instancing/merge; efekty cząsteczek — pule obiektów. Interakcje uruchamiane dystansem i kierunkiem patrzenia, nie pełnym skanem wszystkich obiektów co klatkę.
- Osobne ustawienia: `Czytelność ASCII`, `Gęstość dekoracji`, `Szczegóły cząsteczek`, `Jakość cieni`. **Tryb Low nie usuwa czytelnych przedmiotów, wrogów, znaków ani ważnych obiektów fabularnych.**
- Zmienna `canInteract` przy dialogu/cutscence i blokada podwójnego aktywowania, żeby gracze nie zbierali dwóch kopii tego samego rekwizytu przez równoczesne wciśnięcie klawiszy.

### Testy obowiązkowe (dodatek do wcześniejszych 60)
1. Oboje przechodzą tutorial bez używania myszy, każdemu działa atak i unik na fizycznej klawiaturze laptopa; remap przechodzi ghosting test.
2. Przy wyposażeniu z początku gra nie pozwala przekazać osobistego artefaktu, ale pozwala oddzielnie założyć broń i pancerz.
3. Każdy interaktywny obiekt ma widoczny prompt i nie jest ukryty pod warstwą ASCII; kliknięcie dwa razy nie duplikuje łupu.
4. Żaden mob nie wchodzi na nagrobek, nie zasłania Mściciela w cutscence i nie blokuje wyboru ofiary.
5. Można przejść grę bez żadnego opcjonalnego lootu; boss jest wtedy trudniejszy, ale wykonalny.
6. Wszystkie 7 endingów osiągalne przy poprawnych flagach; nowy ekwipunek nie wpływa na automatyczny resolver.
7. W słabszym trybie grafiki ekran nadal pokazuje **wszystkie** znicze, nożyce, pióra, ważne monitory, czerwone pola ataków i sylwetki przeciwników.
8. W scenie powrotu po zoo na drodze **nie** pojawiają się ciało i nieznajomy; przy endingu 1 dopiero później występują Aleks, Sandra, Alex (X), Salsa.

## 9. Pliki/rysunki w pakiecie

- `HALLOWEEN_MAPA_SWIATA_v11.png/.svg`: topologia świata + strefy eksploracji i walki.
- `HALLOWEEN_PRZEBIEG_GRY_v11.png/.svg`: liniowy kręgosłup z rozgałęzieniami, które zbiegają się z powrotem.
- `HALLOWEEN_ENDINGI_AUTOMATYCZNE_v11.png/.svg`: wyraźne warunki automatycznego wyboru 7 endingów.
- `HALLOWEEN_INTERAKTYWNE_DRZEWKO_v11.html`: samodzielny podgląd warunków z klikalnymi ścieżkami (wybór ścieżki to **tylko narzędzie dokumentacyjne**, nie interfejs w samej grze).

**Ważne:** liczby obrażeń, pancerza, liczby nowych mobów i dokładne położenie elementów = **PROPOZYCJA v11**, nie zatwierdzony kanon. Po prototypie testować balans na dwóch osobach i na słabszym laptopie.
