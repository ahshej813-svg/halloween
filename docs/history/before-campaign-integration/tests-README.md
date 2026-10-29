# Testy aktualizacji V12

Bieżące testy zapisu i aktu I: node tests/v12-checkpoints.cjs; node tests/v12-act1.cjs; node tests/v12-avenger.cjs. Wyniki w diagnostics/v12-*.json.

Bieżący test zmienionego kanonu: node tests/v12-shared-quiz.cjs. Wynik 16/16, opis w docs/STATUS.md.

UWAGA: poniższe testy sprzed V12 nie potwierdzają zgodności z V12. factors/live/e2e/smoke zawierają stare założenie niezależnych zwierząt i wymagają aktualizacji. Nie uruchamiać ich jako bramki wydania V12 ani nie powoływać się na starsze zielone wyniki jako dowód kompletności obecnej gry.

# Testy obu aktów

Gra nie wymaga Node. Testy wymagają Node.js, pakietu playwright dostępnego dla require() i Microsoft Edge. Uruchom serwer projektu na porcie 8000, następnie:

~~~sh
node tests/act2-factors.cjs
node tests/act2-e2e.cjs
node tests/act2-input.cjs
node tests/act2-mechanics.cjs
node tests/act2-live.cjs
node tests/act2-regression.cjs
~~~

- factors: 42 pary ekwipunku przez UI; 48 konfiguracji quizu (3 ofiary × 4 kombinacje długopisów × 4 kombinacje zaufania). Dla każdej ofiary pokrywa wszystkie 16 par drugiego pytania. Sprawdza atrament, reakcje, imię Toma, niezależność odpowiedzi i wstanie. Używa jawnego checkpointu startChapter.
- e2e: 60 wariantów pierwszego aktu (3 groby × 2 kolejności × 2 decyzje domku × 5 werdyktów). 36 kontynuuje do krzeseł i obu pytań, 24 zachowują poprzednie finały. Nawigacja zdarzeniami klawiatury, fizyką, kolizjami i przyspieszonym simulate; bez teleportowania do celów. Prolog pomija startPlay; normalne przekazanie sterowania sprawdza regression.
- input: 8 natywnych klawiszy, niezależne postacie, normalizacja skosu, dialog/blur/ukryta karta, limit rozdzielenia, płot i stół, oboje przy drzwiach, reset. Checkpoint ma 500 ms rozgrzania renderera przed pomiarem ruchu.
- mechanics: obrót kamery i ruch względem niej, PPM/kółko/reset, widok po obrocie 180°, cztery gesty z cooldownem, 6 opcjonalnych użyć przedmiotów w przestrzeni i reset.
- live: burza w rzeczywistym czasie, start głosu Toma, kadry ognia i zapadnięcia ziemi, quiz sterowany osobnymi klawiszami, odstępy klatek w sali. Audio włączone.
- regression: końcówka prologu, start głosów Pauliny i Adama, ręczny marsz i pomiary klatek, głębia domku, finał Sandry i działające sterowanie bez WebGL2.
- smoke: krótki przekrój ekwipunku, burzy, krzeseł i quizu.

Pomocniki coop-driver i act2-test-driver nie są autopilotem normalnej gry. Testy stanów wyłączają audio i przyspieszają czas; nie są pomiarami FPS ani odsłuchaniem wszystkich dialogów. Audio badane osobno w live/regression przez rzeczywiste zdarzenia syntezy.

Wyniki: diagnostics/act2-*.json; obrazy: previews/. Stare nazwy coop-matrix/coop-input/coop-runtime/matrix/graves przekierowują do bieżących testów. Poprzednie źródła: docs/history/tests-before-act2. Desktop 1280×800 i 1920×1080; nie testować telefonu.
