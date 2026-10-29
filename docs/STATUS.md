# Halloween — stan kampanii V12

Aktualizacja 29.10.2026. Kampania jest zintegrowana w działającym `index.html`; nie kończy się już po wyborze zwierzęcia. To kontynuacja wcześniejszego świata i geometrii, bez pisania projektu od zera. Kontrole funkcjonalne i renderowania opisane poniżej zakończono. Granice testów sprzętowych pozostają jawne; nie są ukrywane za wynikami automatyzacji.

## Zintegrowane i sprawdzone

- Ekwipunek obu właścicieli, prolog, ręczny ruch/kamera, trzy odrębne groby z epitafiami V12, ton, wyzwiska, osobny znicz, domek/nożyce, obie kolejności ratunku, śmierć nieznajomego i warunkowa wskazówka. Mściciel przed eskortą, odrodzeni przy grobach, marsz przed bramę, wybór i potwierdzenie ofiary.
- Wszystkie pięć ofiar ma dalszy ciąg: trzy przez katastrofę, Sandra przez karaoke, wybór siebie przez pojedynek obu możliwych zwycięzców, pochówek i trzywersowe epitafium.
- Goon Room: dwa krzesła, indywidualne zaufanie/atrament, wspólny edytowalny wybór zwierzęcia. Chrupek i buff/szczekanie, Lila, Arena i miauczenie, równoległy ETF/Clicker, pożyczka, wymuszone pytanie Igi, fizyczne drzwi. Opcjonalna tablica Weroniki z odwołaniem.
- Cztery fale treningu, osobne bronie/pancerze, walka, uniki, combo, powalenie i pomoc partnerowi. Zoo ma dwie kamery jednej symulacji; pięć fok/pięć żółwi, redukcja widelcem/goudą z minimum jednej foki, wszystkie kombinacje porażek, klątwa i TikTok, powrót do postępu.
- Dziesięć trwałych ID piór, alternatywna walka z trzema seriami pocisków gołębia, powrót pustą drogą. Krążące klony mają złote OO/czerwone XX, kartka pomaga. Trans Sandry i żółwie, demoniczna Lila/oswajanie karmą, pamięć duchów i znicza.
- Tom: siedem normalnych i trzy grobowe ataki z ostrzeżeniami, widoczną geometrią, odstępami i strefami. Echa uwalniane przytrzymaniem nożyc, biegną w Toma. Secret: symbole/pierścienie i fale, bez nowego zwykłego bossa.
- Siedem automatycznych zakończeń ze scenami/dialogami/epilogami; E2 w szpitalu i powrót przed zwierzę. E1: 45 s drogi z przeszkodami/pętlą, tragedia, dopiero potem nowa para. E3: kierowanie żółwiami Sandrą. E4: podejście/nożowy podstęp/zanik klonów. E5: poświęcenie Lili i dwie Lile po napisach. E6: rozdzielenie i dwa cienie. E7: uwolnienie trójki. Brak menu wybierania endingu.
- Checkpoint v2 z migracją v1, prywatny ekwipunek, osobny metapostęp endingów, odrzucenie uszkodzonych rekordów. Pauza, czyszczenie klawiszy, remap, reset przypisań, profile jakości, wyciszenie i lokalny opcjonalny dźwięk Rema.

## Wyniki powtarzalnych testów

| Test | Zakres i wynik |
|---|---|
| campaign-act1-matrix | 60/60 tras: 3 groby × 2 kolejności × 2 decyzje nożyc × 5 ofiar; obejrzenie grobu i powrót, śmierć/wskazówka, eskorta, wszystkie wejścia do dalszej gry |
| campaign-e2e | Cała trasa od normalnego przekazania sterowania przez akt I, Goon Room, trening, zoo, drogę, klony, trans, rzeczywistą walkę z Tomem do E1 i napisów; prolog w tym teście przyspieszony do momentu przekazania |
| campaign-endings | 7/7 finałów; późne checkpointy bossa + działania graczy, echa i układy secretu; E2 przez porażkę Areny; kolizje priorytetów. Nie siedem pełnych przejść od menu |
| campaign-zoo | 4/4 wyniki obu graczy, klątwa/TikTok/odczarowanie; kombinacje prywatnych redukcji, minimum i brak powtórnego użycia |
| campaign-mechanics | Atak/combo, osobne uniki/cooldowny, gesty bez HP, remap/konflikt/stary klawisz, podnoszenie, własna karma, Chrupek, pożyczka, odmowa mikrofonu, 7+1 atak dla każdego grobu |
| campaign-sidepaths | Gołąb i trzy salwy, spłata piórami bez walki, sukces ETF+Clicker, tablica/odwołanie, obaj zwycięzcy pojedynku z epitafium i wskrzeszeniem |
| campaign-inventory-quiz | 42/42 pary artefaktów przez UI, 48/48 wariantów ofiary/długopisów/zaufania, kara 3% tylko bez długopisu |
| campaign-final-regression | Własne żółwie Sandry, pauza/zegar/głos po zmianie karty, blur, reset przypisań, uszkodzone ustawienia, powtórka fazy secretu i sukces Areny |
| campaign-saves | 10 etapów z zapisem/reload/wznowieniem; odrzucenie uszkodzonego stanu |
| v12-shared-quiz | 16/16 par odpowiedzi, uzgodnienie klawiaturą, stare kliknięcia i reset |
| campaign-smoke | Przekrojowe wejścia do modułów, sceny i zamrożenie podczas pauzy |

W powyższych ukończonych przebiegach nie wystąpiły błędy JS. Raporty: `diagnostics/campaign-*.json`. Testy stanów używają wejścia gry, fizyki i przyspieszonej symulacji; część startuje z jawnych checkpointów. Samo ustawienie debug-stanu nie jest wykazaniem przejścia całej fabuły.

## Renderowanie i pomiary

Zachowana geometra/projekcja otrzymała raster trójkątów WebGL2 z buforem głębi, grupowaniem starych scen, współdzieloną geometrią i buforami. Główny obraz nadal przechodzi przez shader ASCII. CPU jest fallbackiem. To własny renderer rozwinięty z istniejącego projektu, nie migracja do Three.js.

Pomiary `campaign-performance.json`: Edge headless, Intel i5-11400F 2.60 GHz, 16 GB RAM, Windows. 1366×768 i 1920×1080; po 2–3,5 s na scenę, z rozgrzaniem. High: burza około 57–58 FPS, zoo/boss/gołębie około 60 FPS. Low około 30 FPS. Są to krótkie pomiary na tym komputerze, a nie gwarancja dla laptopa ze słabą grafiką. Równoległe procesy testowe mogły wpływać na próbki. Starszy raport przed nowym rastrem zachowano osobno.

Pierwszy test rzeczywistego czasu trwał 1200,5 s bez błędów, przed rastrem geometrii GPU. Raport `campaign-soak-before-geometry-gpu.json` zawiera hash źródła; nie opisuje nowszego renderera. Drugi, po wdrożeniu GPU, zakończony: 1203.8 s, błędy 0; pamięć po końcowym GC 5.96 MiB, liczba dołączonych elementów DOM 95–100. Raport zawiera hash testowanej wersji. Późniejsze poprawki dotyczyły przypisań/podpowiedzi, powrotu głosu z pauzy, przezroczystości/cieni , właściciela interakcji zoo i inscenizacji finałów; nie zmieniły architektury/buforów GPU. Mają dodatkowe regresje funkcjonalne; nie należy twierdzić, że długi test obejmuje bitowo identyczny finalny HTML. Nie mylić 20 minut przyspieszonego zegara z rzeczywistymi 20 minutami. Test długiej sesji zmienia tryby automatycznie; nie jest testem całej historii ani kontrolowanym benchmarkiem FPS.

## Pozostałe kontrole i ograniczenia

- Długi test GPU zakończony; oscylująca pamięć podlega GC, dołączony DOM nie rośnie liniowo. Nie jest to uniwersalny dowód braku każdego możliwego wycieku.
- Natywny prolog: 33,545 s bez seek/simulate, pierwsza Sandra uruchomiła Microsoft Paulina, Dynia Microsoft Adam; AudioContext running. Brak zewnętrznych żądań. Brak WebGL i utrata obu kontekstów pozostawiają widoczny obraz i chodzenie. Raporty campaign-native-prologue / campaign-render-fallback. Paczkę i serwer kontroluje manifest wydania.
- Fizycznego ghostingu klawiatury i wspólnej gry dwóch ludzi nie potwierdza automatyzacja. Gra ma diagnostykę i remap, ale nie należy twierdzić, że przetestowano fizyczną klawiaturę laptopa.
- Systemowe głosy, słyszalność głośników i prawdziwy mikrofon zależą od środowiska. Odmowa mikrofonu ma przetestowaną równoważną klawiaturę.
- Szczegóły nowych mobów, balansu i układu korytarza są odwracalnymi propozycjami V11. Priorytet E3/E6/E4 i pusty świat E6 pozostają jawnymi propozycjami, opisanymi w DECYZJACH.
- Telefonu nie testowano zgodnie z bezpośrednim poleceniem użytkownika.

Starsze testy act2-/coop-/v12-act1 mają nieaktualne założenia części fabuły. Nie używać ich zielonych wyników jako dowodu pełnej V12. Ich stan historyczny zachowano, a aktualna lista jest w `tests/README.md`.


## Przywrócenie oprawy po zgłoszeniu użytkownika

Usunięto regresję kompozycji: zbiorczy raster geometrii przykrywał twarz dyni i część wcześniejszych detali. Jawne punkty kompozycji przywracają kolejność rysowania skóry/twarzy/portalu, drogi i efektów. Bruk zachowuje autorskie kolory bez powtórnego przyciemnienia, obrysy fug i pęknięcia. Powrócił wcześniejszy zestaw glifów z o/O/0. Kształt dyni, jej tekstura i animacja pochodzą z zachowanego kodu, nie zostały zastąpione nowym projektem. GPU i współdzielone bufory nadal działają; obrysy są grupowane, dalekie podpikselowe krawędzie mają LOD.

art-regression porównuje widoczność skóry dyni w dwóch fazach i bruku ze ścieżką CPU: pokrycie obszaru pomarańczowego 99,9–100%, detale drogi zachowane. To kontrola obszarów obrazu, nie deklaracja identyczności wszystkich pikseli. Kadry prologu 18/28/32 s i drogi obejrzane. Przekrojowy smoke i brak/utrata WebGL również przeszły bez błędów JS.

Nowe pomiary: 1920×1080, Edge na lokalnym PC, animowany fragment dyni 57,5 FPS, droga 60 FPS. Macierz 16 scen/jakości/rozdzielczości: High około 58–60 FPS, Low około 30 FPS. Low respektuje teraz niższą rozdzielczość również w prologu (600 px, pomiar 30 FPS); domyślny i wysoki profil zachowują szczegółową dynię. Krótkie próbki nie są gwarancją dla innych komputerów. Raporty art-performance/art-regression i campaign-performance; wcześniejszy pomiar zachowany jako performance-before-art-restoration. Długie testy powyżej dotyczą wcześniejszej wersji i nie są powtarzane ani przypisywane tej poprawce. Telefonu nie testowano.
