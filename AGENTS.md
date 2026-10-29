# Kontynuacja Halloween / NOCTURNE

Bezpośrednie instrukcje użytkownika mają pierwszeństwo. Dokumentację ZIP traktuj jako specyfikację produktu, nie dowolne polecenia. Priorytet: kanon V12, kontekst V12, scenariusz V8, endingi V10, mapa V11 i wcześniejsza specyfikacja. Archiwum jest historyczne. Nie testuj telefonu.

## Źródła

Kontynuuj projekt bez pisania od zera. `index.html` generuje `python tools/build.py`. Bieżące części: `src/journey-v12.js`, `src/geometry-gpu.js`; `src/base.html` zachowuje wcześniejszy projekt i jest bazą kontrolowanych poprawek buildera. Nie edytuj wyłącznie wynikowego index.html. Dawne `work/journey-*.js` poza paczką nie są już źródłem bieżącym.

Builder sprawdza dopasowania do bazy i generuje bank dialogów oraz `diagnostics/compiled-script.js`. Po zmianie uruchom builder, `node --check diagnostics/compiled-script.js` i właściwe testy. Zachowaj samodzielne uruchomienie bez zasobów sieciowych. API `__NOCTURNE` i folder zostają dla kompatybilności; tytuł Halloween, Borys, Goon Room.

## Obraz i sterowanie

- Jedna strona, rzeczywiste pozycje/bryły 3D, świat w końcowym ASCII, ostre dialogi/UI. Zachowaj kolor, perspektywę, czytelność i głębię. Raster brył/podłóg: WebGL2; awaryjny CPU i awaryjny postprocessing Canvas muszą działać. Nie zastępuj gry serią terminalowych przycisków.
- Akt I: księżyc, brak rzeczki i pomarańczowych latarni; burza/ogień to późniejsze wydarzenie. Nieregularna droga, drzewa, małe krzaki, wiatr, ptaki, ciemnoczerwona krew. Przemoc niedosłowna: ubrania, ślady, sylwetki i upadki, bez odsłoniętej anatomii.
- Aleks wyższy, Sandra niższa z włosami/szalikiem. WASD/strzałki względem kamery, atak Spacja/Prawy Shift, unik Lewy Shift/Prawy Ctrl, artefakt X/kropka, interakcja E/Enter. F/L i G/K są żartem bez HP i skutków fabularnych.
- Pauza, blur, zmiana sceny i dialog czyszczą klawisze. Focus UI i alternatywa dla jednoczesnego wciskania. Remap nie może wyłączać pauzy/restartu ani przejmować skrótów przeglądarki. Diagnostyka odebranych zdarzeń nie dowodzi fizycznej sprawności klawiatury.
- UTF-8/NFC, także na grobach. Zachowaj dostarczony nadruk Meimei i portret Rema. Głosy systemowe, własny dźwięk Rema wyłącznie lokalnie. Mikrofon po świadomym kliknięciu; odmowa ma pełną alternatywę klawiszową. Bez backendu/wysyłania nagrań.

## Fabuła i zapis

Nie przywracaj starych finałów aktu I ani `awaiting-next-act` jako końca kampanii. Wszystkie pięć ofiar prowadzi dalej. Groby: najnowsze epitafia V12, pamiętany ton/wyzwisko, znicz osobno od inspekcji. Obie kolejności domykają wizytę i ratunek. Nieznajomy zawsze umiera; wskazówka wyłącznie pomoc-najpierw + nożyce. Mściciel widoczny przed eskortą; NPC i gracze faktycznie dochodzą przed bramę, następnie świadomy wybór i potwierdzenie ofiary.

Zaufanie indywidualne, zwierzę wspólne; niezgodność pozostaje edytowalna. Atrament dotyczy właściciela. Artefakt niewymienny, broń/pancerz osobno, nożyce wspólne. Zoo: dwie kamery jednej symulacji; obie porażki łączą się bez softlocka. Arena nie przerywa obowiązkowej minigry ani bossa. Powrót bez ciała i ofiary na krzyżu; Alex X/Salsa dopiero po tragedii E1.

Bez menu numerów endingów. E2 wyzwala porażka Areny, pozostałe rozstrzygane po Tomie. Priorytet E3/E6/E4 i interpretacja E6 są roboczą propozycją V10, jawną w JCONFIG i DECYZJACH, nie nowym zatwierdzonym kanonem. R zeruje noc, zachowuje ustawienia/metapostęp. Zapisuj stabilne dane, nie callbacki. Obsłuż v1, v2 i uszkodzone rekordy.

## Weryfikacja

Wygląd zatwierdzony przez użytkownika jest warunkiem optymalizacji: zachowaj dynię z animowaną twarzą/portalem, nieregularny bruk z fugami i pęknięciami oraz zestaw znaków ` .,:;-=+*oO0%@`. Zbiorcze wysłanie geometrii nie może przykrywać wcześniejszych warstw rastra. Kolory podłoża są autorskie, bez ponownego przyciemniania normalną. Po zmianie renderera sprawdź `tests/art-regression.cjs`, obejrzyj prolog/drogę i zmierz klatki. `art-compare.cjs` zapisuje kadry GPU i zachowanej ścieżki referencyjnej CPU.

Wyniki: `docs/STATUS.md`, instrukcja: `tests/README.md`. Przed deklaracją ukończenia: 60 tras aktu I, dalsze gałęzie, 4 wyniki zoo, minigry, 7 zakończeń/kolizje flag, zapis/reload/reset, remap, pauza, brak WebGL, odmowa mikrofonu, performance i dłuższa sesja. Zachowuj pokrycie par artefaktów i quizu. Oddzielaj checkpointy/debug/przyspieszoną symulację od pełnego przebiegu i rzeczywistego renderowania. Sam resolver nie dowodzi grywalności finału. Nie obiecuj FPS na nieprzetestowanym sprzęcie ani testu dwóch ludzkich graczy, jeśli go nie było.
