# Halloween — macierz akceptacyjna QA (do uruchomienia przez Codexa, NIE wykonana tutaj)

## Sposób raportowania

Dla każdego testu wpisz `PASS`, `FAIL`, `BLOCKED` albo `NOT RUN`, nazwę pliku testowego/screenshotu i ewentualne komentarze. Bez działającego kodu żaden z poniższych testów nie został wykonany. Testować automatyką (Playwright lub istniejący framework) i manualnie dwie osoby na jednej klawiaturze.

### Platforma i renderowanie

- [ ] P01: Projekt uruchamia się zgodnie ze skryptami repo, bez błędów krytycznych w konsoli.
- [ ] P02: Kamera naprawdę obraca się po scenie 3D; obiekty mają głębię/zasłanianie i kolizje.
- [ ] P03: W trybie ASCII widoczne i rozróżnialne są Aleks, Sandra, groby, nieznajomy i Mściciel w nocy.
- [ ] P04: Diagnostyczny ASCII OFF dowodzi, że Mściciel ma poprawny model, spawn i geometrię.
- [ ] P05: Mściciel widoczny na cmentarzu ZANIM aktywuje cel „idź przed bramę”; nie znika ani nie duplikuje się.
- [ ] P06: Tekst HUD, nazwy mówców, czerwone strefy ataku nie są konwertowane przez shader ASCII.
- [ ] P07: 1366×768 i 1920×1080: brak obcięcia dialogów, czytelne ostrzeżenia ataków.
- [ ] P08: Tryby LOW/BALANCED/HIGH zachowują najważniejsze kontury i glify.
- [ ] P09: Po wyjściu z tła symulacja nie „przeskakuje” o sekundy.
- [ ] P10: Benchmark sceny burzy, zoo, gołębi i bossa ma zapis pomiarów średniego FPS, 1% low, frame time albo uczciwą adnotację „brak pomiaru”.

### Sterowanie i zapis

- [ ] C01: Aleks jednocześnie WASD, Sandra strzałkami, na fizycznej klawiaturze laptopowej.
- [ ] C02: Obaj biegną po przekątnej i atakują bez gubienia klawiszy albo działa alternatywny binding.
- [ ] C03: Remap konflikty, ShiftLeft/ShiftRight, brak przypadkowej interakcji po dialogu.
- [ ] C04: Pause/focus blur czyści held keys, nie scrolluje strony.
- [ ] C05: Save/Load checkpoint przy grobie, Goon, zoo, bosie bez duplikacji triggerów i zmiany ukończonych wyborów.
- [ ] C06: Nowy obieg resetuje pamięć w świecie, a meta endingów jeśli implementowana pozostaje odrębna.

### Akt pierwszy

- [ ] A01: Obie osoby mogą wybrać 1 z osobistych przedmiotów, bez wymiany.
- [ ] A02: Gabryś/Borys/Weronika mają dokładne najnowsze napisy i osobne modele/miejsca.
- [ ] A03: Opcje „miłe/niemiłe” nie zdradzają cytatu przed wyborem; Gabryś ma 3 warianty wyzwiska.
- [ ] A04: Zapalenie znicza osobne od czytania epitafium; stan wpływa na obronę w bossie.
- [ ] A05: Aleks wybiera grób najpierw vs ratowanie najpierw; ostrzeżenie „Nie ufajcie temu, który wygląda jak on” tylko dla szybkiej pomocy.
- [ ] A06: Bez nożyc ranny umiera na krzyżu; z nożycami umiera po zdjęciu przy krzyżu. Obie gałęzie postępują.
- [ ] A07: Każda z 5 ofiar wybierana po potwierdzeniu; brak arbitralnego wyboru po timeout.
- [ ] A08: Wybór Gabryś/Borys/Weronika = katastrofa i wejście Goon; Sandra = karaoke; Aleks = PvP i Epitafium.

### Goon Room i minigry

- [ ] M01: W Epitafium trzy wersy można ułożyć do skutku, wskrzeszony pamięta krzywdę.
- [ ] M02: Karaoke przywraca Sandrę mikrofonem na słabym wejściu lub przyciskami bez mikrofonu; brak pozwolenia nie blokuje.
- [ ] M03: Quiz zaufania ma 4 kombinacje odpowiedzi i odpowiednie późne konsekwencje.
- [ ] M04: Quiz zwierzęcia nie zatwierdza dwóch różnych opcji; musi być wspólna zgoda.
- [ ] M05: Chrupek spada, opcjonalne zjedzenie: statystyki + szczekanie.
- [ ] M06: Lila może być oswojona tylko zgodnie z ustaleniami i pomaga lub przeszkadza przy Tomie.
- [ ] M07: Arena: po 5 min aktywnej gry ma 60 s na 3 miauknięcia, porażka ending 2, powrót do checkpointu.
- [ ] M08: ETF + Clicker oba aktywne, zwycięstwo/pożyczka po porażce, żadna gałąź nie blokuje.
- [ ] M09: Quiz 3: złe odpowiedzi znikają; trzecia wymagana i odtwarzana scena.

### Zoo / dług

- [ ] Z01: 5 fok, widelec -1, gouda -3, razem zostaje 1.
- [ ] Z02: 5 żółwi; porażka Sandry 60 s oczekiwania, ASCII TikTok na stronie Aleksa.
- [ ] Z03: Porażka fok powoduje foczą klątwę i spowolnienie; Sandra 3 trafieniami zdejmuje ją zgodnie z tablicą.
- [ ] Z04: Kombinacje sukces/klątwa i sukces/czekanie w obu rolach działają niezależnie.
- [ ] Z05: Pióra na ziemi wyraźnie widoczne; 3+3+4=10; dług automatycznie spłacony po zebraniu 10.
- [ ] Z06: Gdy brakuje piór, gołąb przed bossem oferuje walkę lub spłatę; retry bez blokady.

### Pętla i boss

- [ ] B01: Po zoo świat cofnięty w czasie, przed wydarzeniami z ciałem/krzyżem; Alex (X) odróżnialny od Aleksa.
- [ ] B02: Sekcja X/Salsa nie zawiera wymyślonych bez zgody metod ich śmierci; jawne author_pending i grywalna nawigacja.
- [ ] B03: Minigra prawdziwy Tom / klony wskazuje oczy; kartka gaźnik podpowiada, a błąd nie zabija od razu.
- [ ] B04: Faza 1: Sandra łamie trans, Aleks unika żółwi; po zaliczeniu checkpoint.
- [ ] B05: Faza 2: wszystkie 7 zwykłych ataków Toma mają czytelne telegraphy i bezpieczną drogę.
- [ ] B06: Łapa ma czerwony okrąg 1,8 s przed uderzeniem, Pentagram falę 2,3 s z unikaniem przez normalny ruch.
- [ ] B07: Każdy z 3 grobów daje inny specjalny atak i ochronę po zapaleniu znicza.
- [ ] B08: Nożyce uwalniają echa, eksplozja zadaje obrażenia Tomowi, bez nożyc boss nadal do przejścia.
- [ ] B09: Gabryś / Weronika / Borys reagują zgodnie z ofiarą, tonem grobowym i ustalonym motywem.

### Siedem zakończeń

- [ ] E01: Nieskończona noc: dynia, monolog, cytat, reset pamięci.
- [ ] E02: Impreza Halloween: miauczenie/Gołębie, impreza i wypadek, checkpoint przed zwierzęciem.
- [ ] E03: Sandra Toma: opcja tylko przy właściwym pluszaku/zaufaniu/urazie i świadomym wyborze.
- [ ] E04: Nóż w plecy: pluszak i manipulacja, Aleks dostaje świadomą decyzję, scena i reset.
- [ ] E05: Lila przeciw panu: karmienie, współpraca, ucieczka pary bez Lili, dwie Lile w epilogu.
- [ ] E06: Dwa cienie: jawna zdrada jednej osoby, druga pozostaje w pętli.
- [ ] E07: Ostatni świt: wszystkie ściśle opisane warunki, minigra dyni, oboje + Lila wolni.
- [ ] E08: Wcześniejsza niedostępna opcja endingu nie uruchamia zakończenia przez przypadek.

### Regresja/uczciwość

- [ ] R01: `npm run build` (lub odpowiednik) bez błędów.
- [ ] R02: Unit/scene-state/e2e odpowiednie do stacku: bez FAIL.
- [ ] R03: Wszystkie warningi o niezaimplementowanych elementach zapisane w `docs/HALLOWEEN_STATUS.md`.
- [ ] R04: Nie zgłoszono „100% ukończone”, jeśli autorski wątek Alexa/Salsy jest placeholderem.
