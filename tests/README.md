# Testy kampanii V12

Gra nie wymaga Node. Testy wymagają Node.js, `playwright` dostępnego dla `require()` i Microsoft Edge. Serwer projektu musi działać na http://127.0.0.1:8000/. Uruchamiaj z folderu projektu, np. `node tests/campaign-e2e.cjs`. Wyniki: `diagnostics/`, kadry: `previews/`.

## Bieżące testy

| Plik | Co faktycznie sprawdza |
|---|---|
| campaign-act1-matrix.cjs | 60 tras aktu I i pięć kontynuacji. Wejście/kolizje/nawigacja, przyspieszony czas, bez teleportowania do celów |
| campaign-e2e.cjs | Jedna pełna trasa do E1, przez fizyczne cele, pytania, trening, zoo, klony, trans, walkę i finał. Prolog przyspieszony do przekazania |
| campaign-native-prologue.cjs | Prawdziwe 33 s prologu bez seek/simulate, natywne głosy/audio i brak żądań zewnętrznych. Nie jest odsłuchem głośników |
| campaign-inventory-quiz.cjs | 42 pary przedmiotów przez UI; 48 wariantów ofiara/długopisy/zaufanie przez checkpoint sali i fizyczne krzesła. Atrament i kara dotyczą właściciela |
| v12-shared-quiz.cjs | 16 par odpowiedzi na zwierzę, uzgodnienie klawiaturą, odrzucone stare kliknięcia, reset |
| campaign-smoke.cjs | Przekrojowe wejścia do modułów, karaoke, epitafium, Iga, zoo, boss i pauza |
| campaign-mechanics.cjs | Ciosy/combo/uniki/cooldowny, gesty bez HP, remap, revive, prywatna karma, Chrupek, pożyczka, odmowa mikrofonu, 7+3 ataki (do harmonogramu ataków fixture wysokiego HP) |
| campaign-sidepaths.cjs | Trzy salwy gołębia, walka lub spłata, ETF+Clicker, tablica Weroniki, obaj zwycięzcy pojedynku. Spłata zaczyna od checkpointu sześciu piór |
| campaign-zoo.cjs | Cztery wyniki obu minigier, obie konsekwencje i odzyskanie postępu, redukcje fork/gouda i minimum |
| campaign-endings.cjs | 7 zakończeń: sześć późnych checkpointów + rzeczywista walka/akcje/secret, E2 z wyzwania Areny; kolizje warunków. Nie siedem pełnych historii od menu |
| campaign-final-regression.cjs | Rozdzielenie interakcji zoo, pauza/głos po zmianie karty, blur, domyślne przypisania i uszkodzone ustawienia |
| campaign-saves.cjs | 10 trybów zapisu/reload/wznowienia i uszkodzony rekord |
| campaign-render-fallback.cjs | Brak WebGL przy starcie oraz utrata obu kontekstów podczas gry: widoczny ASCII i działające chodzenie |
| campaign-performance.cjs | Rzeczywiste odstępy klatek w 16 kombinacjach sceny/jakości/rozdzielczości. Headless Edge na lokalnym sprzęcie |
| campaign-soak.cjs | 20 min rzeczywistego czasu, naprzemienne tryby, pomiary pamięci/DOM i błędy. Opcjonalne SOAK_MINUTES skraca próbę, ale skróconej nie nazywać testem 20-minutowym |

`campaign-driver.cjs`, `coop-driver.cjs`, `act2-test-driver.cjs` to wspólne sterowniki wejścia. Testy logiczne korzystają z ukrytego API do uruchamiania checkpointów i przyspieszania czasu. Przy walkach nie wpisują bossowi zerowego HP. Mechanizmy wspólnego zakończenia testowane również przez rzeczywiste przytrzymanie interakcji.

Nie uruchamiaj równolegle testów podczas kontrolowanego pomiaru FPS. Długa sesja i kilka przeglądarek mogą zmieniać wyniki. W raportach starszych pomiarów jawnie zaznaczono środowisko i ograniczenia.

## Testy historyczne

`act2-*`, `coop-*`, stare `v12-act1.cjs`, `v12-avenger.cjs` i `v12-checkpoints.cjs` nie są bramką wydania pełnej kampanii. Część zakłada stare epitafia, dawny koniec po quizie lub kończące grę ofiary. Nie traktować ich starszych zielonych raportów jako dowodu zgodności V12. Ich pokrycie zastępują powyższe testy.

Testy automatyczne nie dowodzą fizycznego ghostingu sprzętu, poprawności prawdziwego mikrofonu ani słyszalności głośników. Telefonu nie testować na polecenie użytkownika.


## Kontrola oprawy

- art-compare.cjs: kadry prologu 18/28/32 s oraz drogi dla GPU i zachowanej ścieżki CPU.
- art-regression.cjs: rzeczywiste piksele obrazu — twarz/skóra dyni i widoczność bruku nie mogą znikać podczas grupowania geometrii.
- art-performance.cjs: rzeczywiste klatki animowanego fragmentu dyni i drogi w 1080p. Pomija początek prologu do 18 s, nie udaje pełnego przebiegu.
