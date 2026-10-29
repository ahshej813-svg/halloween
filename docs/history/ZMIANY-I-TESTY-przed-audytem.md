# NOCTURNE — bryły 3D, trzy groby i narastający wiatr

Kontynuacja dotychczasowego samodzielnego `index.html`, 28.10.2026. Brak nowych bibliotek, brak restartu projektu od zera. Świat pozostaje renderowany znakami; UI i napisy obsługują pełny polski Unicode.

## Geometria i atmosfera

Dodano do istniejącego renderera kolejkę ścian siatek, normalne powierzchni, kierunkowe cieniowanie księżycem, sortowanie ścian według głębi i perspektywę. Nagrobki mają teraz przednią i tylną ścianę, boki, grubość, podstawę, pokrywę oraz różne profile. Kaplica ma ściany, dach i zagłębione wejście. To własny renderer brył na Canvas, z końcowym przejściem do ASCII; nie jest to silnik fotorealistyczny ani pełny ray tracing.

Postać na krzyżu ma model z segmentów kończyn, osobnych dłoni, stóp, głowy, szyi, bioder i tułowia. Zachowano podwieszenie za nadgarstki, opadniętą sylwetkę, oddech i uniesienie głowy przy słowie „Uciekajcie…”. Dodano siniaki, ciemne ślady krwi i postrzępione ubranie, bez odsłoniętej anatomii ani dosłownych detali okaleczeń. Zbliżenie kamery ma przejście do perspektywy oglądającej postać z bliska; para schodzi z kadru podczas tego ujęcia, aby jej sylwetki nie zasłaniały mężczyzny.

Wiatr zaczyna się słabo i narasta podczas przejścia od drogi do grobów. Ruszają się gałęzie, suche trawy, krzaki, liście oraz dwanaście nowych żywych roślin o stonowanych zielonych liściach. Źródłem światła nadal jest księżyc, latarnie pozostają wygaszone.

## Każdy grób inny

| Wybór | Miejsce i model | Napis |
|---|---|---|
| Gabryś | Lewa alejka, x=-5,2 / z=-57; szeroki ciemny granit, jasna tablica i nadruk ASCII kota | „Jakby Aleks umarł, to bym zapomniał po 3 sekundach.” |
| Weronika | Prawa alejka, x=5 / z=-61; wysoki jasny marmur, łuk i gruba podstawa | „Ummmm… O kurwa, naucz się kurwa grać wreszcie.” |
| Boris | Dalsza lewa alejka, x=-7,2 / z=-71; ciężki niski grobowiec z szeroką pokrywą | „Jednak Gabryś to był zajebisty ziom.” |

Boris jest człowiekiem, zgodnie z odpowiedzią użytkownika; zastępuje Chrupka. Każda gałąź ma inne kwestie i opis miejsca. Nazwy, nadruk i napisy są projektowane jako znaki na płaszczyźnie tablicy w świecie. Dodatkowy widok „Przyjrzyj się nagrobkowi” pozwala dokładnie przeczytać napis i obejrzeć nadruk; zamknięcie Escape wraca do tej samej sceny.

Nadruk Gabrysia przeliczono z lokalnego `meimei (1).jfif`, a nie wygenerowano innego obrazka. Oryginał zachowano jako `assets/meimei-source.jfif`, czytelną wersję znakową jako `assets/meimei-ascii.txt`. Wersja używana przez stronę jest osadzona w HTML — nie wymaga ładowania oryginalnego pliku ani internetu.

## Polskie znaki

Dokument zapisany w UTF-8, tekst normalizowany do NFC; fonty monospace z obsługą polskiego alfabetu. Nadruk ASCII jest złożony ze znaków ASCII, a nazwy i cytaty zachowują polskie litery. Test sprawdził dokładne teksty wszystkich trzech cytatów, nazwę „Gabryś”, kodowanie przeglądarki UTF-8 i różnicę faktycznie rysowanych glifów ą/ę/ł/ś/ź/ż wobec podstawowych liter.

## Weryfikacja

Desktop Edge / Chromium 1280×800, bez testowania telefonu:

- Pełny przepływ dla Gabrysia, Weroniki i Borisa: odkrycie ciała → wybór celu → odmienna rozmowa → scena z krzyżem → dotarcie → opis i cytat → zbliżenie nagrobka → zamknięcie Escape → postawienie znicza → ukończenie → reset R.
- Każda ścieżka ma inny cel w przestrzeni i odmienny model. Wszystkie dotarły do ukończenia i poprawnie wyczyściły wybór po replay.
- Sprawdzono zrzuty brył nagrobków, widoku nadruku i zbliżenia człowieka na krzyżu.
- Brak błędów JavaScript oraz błędów renderera podczas testów; poprawna składnia skryptu.
- Wcześniej sprawdzone dwa systemowe polskie głosy pozostają oddzielne: na tym komputerze Paulina / Adam. Barwa zależy od głosów zainstalowanych na urządzeniu.

## Obsługa

Kliknij scenę, aby włączyć audio. „Dalej” prowadzi przez dialogi; 1–3 wybiera cel. Przy grobie kliknij „Przyjrzyj się nagrobkowi”, Escape wraca. R zaczyna od nowa. Postęp jest stanem bieżącej sesji.

Otwórz `index.html` bezpośrednio lub uruchom `python -m http.server 8000` w folderze projektu. Aktualne podglądy: `previews/volume-*.png`, `previews/detail-*.png`, `previews/volumetric-cross.png`.


## Płynność, niższa kamera i postać przed bramą

### Renderer i ostrość

Główny koszt znajdował się w konwersji i rysowaniu ASCII: przed zmianą około 40–50 ms CPU na klatkę przy 1920×1080, poza samą sceną. Końcowy etap przeniesiono do shadera WebGL2. Shader próbuje ukryty raster, dobiera gęstość i kolor znaku i wyświetla jego kształt z atlasu monospace — żaden gładki raster świata nie jest pokazywany użytkownikowi. Nadruki i polskie napisy pozostają znakami projektowanymi na płaszczyznę tablicy.

Koszt wysyłania komend konwersji ASCII do GPU wynosił w pomiarze zwykle 1–2 ms CPU. Nie jest to czas całej klatki; osobno wykonano pomiar rzeczywistych odstępów między rysowanymi klatkami. Pozostawiono działający renderer Canvas jako tryb awaryjny bez WebGL2, o niższej wydajności. Cel animacji wynosi 30 kl./s.

Poprawiono proporcje siatki znaków do wielkości fontu, aby przy szerokim ekranie litery z kolejnych wierszy nie nakładały się na siebie. Zmniejszono scanlines. Dalsze nagrobki i drzewa wygasza mgła zależna od odległości, zamiast pokazywać cały cmentarz z podobnym kontrastem. Drobne gałęzie w bardzo dalekim planie są pomijane.

### Kamera i człowiek

Po intro oko kamery jest około 1,68 m nad gruntem, zamiast wcześniejszych około 3 m. Kamera śledzi wspólną trasę pary w odstępie około 5,6 m. Wybór grobu nie przestawia już od razu postaci na inną krzywą ruchu. Przy ostrzeżeniu jest celowe zbliżenie na krzyż, potem powrót do dojścia do wybranego miejsca.

Poprawiono tułów mężczyzny: oddzielone barki, klatka, talia i biodra oraz właściwy kierunek normalnych. Rozstawiono kolana i stopy, rozjaśniono spodnie względem krzyża i dodano kształt nosa oraz poruszające się usta. Przy podstawie jest niewielka ciemnoczerwona plama krwi. Bez odsłoniętej anatomii ani dosłownych detali okaleczeń.

Napisy grobu i nadruk nie są już wyświetlane podczas zbliżenia na ostrzegającego mężczyznę; pojawiają się przy późniejszym podejściu do miejsca pamięci.

### Krótki ruch po lewej

Pomiędzy 43 a 50 sekundą czasu fabuły, przed wejściem pary przez bramę, po lewej widać fragment dodatkowej sylwetki. Pokazuje głowę i ramię, po czym cofa się w bok i za drzewo. Zdarzenie nie zapętla się podczas rozmowy; po replay można je zobaczyć ponownie. Dotychczasowe gałęzie dialogowe są zachowane.

### Weryfikacja końcowa

Edge / Chromium, 1920×1080, sprzętowe WebGL2:

| Fragment | Mediana odstępu między klatkami | 95. percentyl |
|---|---:|---:|
| Marsz | 34,7 ms | 48,7 ms |
| Ostrzeżenie przy krzyżu | 34,7 ms | 34,8 ms |
| Widok przy grobie | 34,7 ms | 34,9 ms |

To około 29 kl./s na testowanym komputerze, z krótkimi dłuższymi klatkami w marszu. Nie jest to obietnica 60 FPS ani identycznego wyniku na innym urządzeniu. Surowe podsumowanie: diagnostics/performance-1920x1080.json.

Pełne trzy ścieżki Gabryś / Weronika / Boris przeszły odkrycie, wybór, ostrzeżenie, dojście, zbliżenie, interakcję i reset. Sprawdzono dokładne napisy UTF-8 i brak błędów renderera. Dodatkowo wymuszono brak WebGL2: renderer awaryjny narysował poprawną niepustą scenę bez błędów. Telefonu nie testowano.


## Kolejny grywalny akt — domek, Mściciel i finały

Dodano 180 źdźbeł i kęp trawy na dalszych poboczach, widocznych również w intro. Ostrzeżenie dyni brzmi teraz: „Aleks! Sandra! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!”.

### Rozgałęzienia fabuły

1. Przy krzyżu para panikuje i może wybrać pomoc człowiekowi albo odwiedzenie wcześniej wybranego grobu.
2. Pomoc prowadzi do domku: pięć nieruchomych postaci w ubraniach, ciemna krew, stół i nożyce. Świat jest nadal znakowy, nie pokazuje dosłownych szczegółów gore.
3. Można wziąć nożyce albo uciec. Ucieczka uruchamia podaną przez użytkownika kwestię Sandry i wizytę przy wcześniej wybranym grobie, jeżeli jeszcze jej nie było. Potem następuje próba pomocy. Wzięcie przedmiotu daje skuteczny ratunek; bez niego Aleks próbuje rozwiązać więzy, a wynik jest oznaczony jako nieudany ratunek. W obu wariantach człowiek krzyczy, że „on idzie”.
4. Mściciel pojawia się z pistoletem. Aleks i Sandra wypowiadają wskazane kwestie. Mściciel żąda wyboru; Aleks przypomina, że Gabriel, Weronika i Boris nie żyją.
5. W przerywniku te trzy osoby powstają z grobów i mówią „Ahh… dobra drzemka”. Geometria pod powierzchnią gruntu jest odcinana podczas wyłaniania, aby sylwetki nie były widoczne pod ziemią.
6. Konfrontacja przenosi się przed bramę. Wybory: Gabryś (Gabriel), Weronika, Boris, Sandra lub sam Aleks.
7. Wybór siebie prowadzi do interwencji Sandry: podana kwestia, rzut kostką, „Tom. Tom. Tom.” i atak stada wron na Mściciela. W pozostałych czterech wariantach wybrana postać pada i wypowiada „Aleks, zasługujesz na karę. Trzy klapsy”. Upadki i śmierć pokazane są bez dosłownych detali okaleczeń.

Kolejność „pomoc najpierw” może przerwać wizytę przy grobie przez konfrontację. Kolejność „grób najpierw” oraz ucieczka z domku zapewniają wcześniejszą wizytę. Stan zapisuje kolejność, posiadanie przedmiotu, próbę i powodzenie ratunku, powstanie zmarłych, wybór finałowy i zakończenie. R zeruje cały nowy akt.

### Obraz i sterowanie

Akt ma własne sceny 3D ASCII: wnętrze domku z krwią i ciałami, powrót pod krzyż, Mściciel wewnątrz cmentarza, wyłaniające się postacie i konfrontacja przed bramą. Przerywniki są czasowe, po nich rozmowa znów czeka na „Dalej”. Wybory działają myszą oraz klawiszami 1–5. Zachowano głosy, UTF-8, GPU i jedną stronę bez przeładowań. Kostka pojawia się przy kwestii Sandry „Tom. Tom. Tom.”, a nie wcześniej.

### Weryfikacja desktop

Przeszło pięć testowych kombinacji obejmujących obie kolejności (pomoc / grób), obie decyzje w domku (przedmiot / ucieczka) i wszystkie pięć finałowych wyborów. Sprawdzono flagi wyniku oraz reset R. Nie jest to pełne sprawdzenie wszystkich kombinacji iloczynu wyborów. Dodatkowo powtórzono ścieżkę zakończenia z wronami po końcowych poprawkach. Sprawdzono rzeczywisty czas animacji powstawania zmarłych oraz kadry domku, wyboru i finałów. Bez błędów JavaScript i renderera; składnia poprawna. Telefonu nie testowano.

Ostatnia kontrolna ścieżka zakończenia z wronami: diagnostics/act-two-branches.json. Kadry: previews/act-*.png. Testowe API advanceAct(seconds) służy wyłącznie przyspieszaniu czasowych przerywników w kontroli automatycznej; zwykła gra używa upływu czasu animacji.
