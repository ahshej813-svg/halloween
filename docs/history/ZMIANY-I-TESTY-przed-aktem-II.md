# NOCTURNE — logika gry i dwie sterowane postacie

## Zmiana sposobu gry

Filmowy prolog z dynią pozostał. Po nim WASD steruje Aleksem, strzałki Sandrą. Ruch nie zależy od czasu sceny, a wybory nie przenoszą pary do gotowych kadrów. Trzeba dojść do bramy, właściwego grobu, domku, stołu, wyjścia i człowieka. E/Enter działa w zasięgu obojga. Kamera podąża za parą; przy dużym rozdzieleniu wyświetla, na kogo poczekać. Ruch po skosie ma tę samą prędkość. Postacie omijają się przy kontakcie; nie przesuwają automatycznie drugiego gracza.

Dialogi, zbliżenie tablicy i przerywniki blokują ruch. Strzałki w panelu służą wyborom. Utrata fokusu i ukrycie karty kasują klawisze, więc postać nie idzie sama po powrocie. R resetuje oba sterowania i cały stan opowieści.

## Naprawione luki

- Wizyta i próba pomocy są domknięte w obu kolejnościach. Nie ma już wariantu przeskakującego wybrany grób przez automatyczny finał.
- Samo obejrzenie tablicy nie oznacza postawienia znicza. Oddzielono sesję wizyty od tokenu mowy, dzięki czemu inspekcja i Escape nie blokują znicza.
- W domku przedmiot jest przy stole. Wzięcie lub zostawienie nożyc wymaga późniejszego dojścia do wyjścia. E nie przenosi drugiej postaci stojącej daleko.
- Bez nożyc próba uwolnienia jest nieudana i dialog to potwierdza. Z nożycami animacja uwolnienia jest widoczna i nie cofa się po odejściu od krzyża.
- Ucieczka nie każe odwiedzać grobu, który był już odwiedzony. Gabriel i Gabryś są wyjaśnieni jako ta sama osoba.
- Trzy osoby powstają przy swoich rzeczywistych grobach, a następnie idą do bramy. Mściciel pojawia się na wolnym terenie. Finał wymaga faktycznego dotarcia całej grupy, nie tylko pustej listy punktów trasy.
- W dobrym finale wrony interweniują przed śmiercią Aleksa. Potem trzeba jeszcze wyprowadzić obie postacie drogą od cmentarza; gra nie kończy się automatycznie po samej rozmowie.

## Obraz i płynność

Zachowano scenę 3D ASCII, trzy indywidualne groby i nadruk, głosy, wiatr, ptaki, księżycowe światło i jedną stronę. Dodano obracanie modeli w kierunku marszu, ruch kończyn i wspólną kamerę. Kamera interpoluje także punkt patrzenia. Poprawiono przycinanie brył przy kamerze, podłogę domku i sortowanie mebli z postaciami.

Stałe modele są buforowane. Odległe dekoracyjne groby i gałęzie mają LOD, a niewidoczne ściany są pomijane. Trzy fabularne nagrobki zachowują pełną geometrię. Zmniejszono koszt niewidocznego rastra pomocniczego przy zachowaniu tej samej końcowej siatki glifów. Współdzielone wierzchołki ograniczają koszt modeli postaci.

Pomiary rzeczywistych odstępów klatek, Edge / Windows, 1920×1080:

| Fragment | Mediana | 95. percentyl |
|---|---:|---:|
| Sterowany marsz obu postaci | 34,7 ms | 48,6 ms |
| Grupa przy werdykcie | 34,7 ms | 48,6 ms |

Mediana odpowiada około 29 kl./s przy celu 30. Zdarzają się dłuższe klatki; to nie jest gwarancja 60 FPS ani takiego samego wyniku na innym sprzęcie. Awaryjny Canvas jest wolniejszy, ale sterowanie pozostaje sprawne.

## Dowody weryfikacji

- diagnostics/coop-matrix.json: **60/60** kombinacji z ruchem przez system wejścia, przyspieszonym krokiem symulacji, kolizjami, bliskością obojga, inspekcją wszystkich cytatów, przedmiotem, wynikiem pomocy, obecnością NPC, pięcioma finałami, ucieczką i resetem. Bez błędów JS i renderera. Audio w tej macierzy jest wyłączone; nie jest to odsłuchanie każdej kwestii w każdym przebiegu.
- diagnostics/coop-input.json: osiem rzeczywistych klawiszy w przeglądarce, niezależne postacie, identyczna prędkość po skosie, dialog/blur/ukrycie karty, limit oddalenia i podpowiedź, płot, stół, obie postacie przy drzwiach, reset. Desktop 1280×800 oraz 1920×1080.
- diagnostics/coop-runtime.json: normalne przekazanie sterowania na końcu prologu, zdarzenia startu Pauliny dla Sandry i Adama dla Aleksa, śledzenie marszu, rzeczywiste pomiary klatek, chodzenie za stołem, wariant bez nożyc i finał Sandry. Sprawdzone także sterowanie i niepusty renderer bez WebGL2.
- Aktualne kadry: previews/coop-*.png. Przebieg wnętrza i grupy obejrzano po zmianach renderera; obraz użytkownika pozostaje znakowy.
- Składnia aktualnego skryptu sprawdzona node --check. Bieżące testy można powtórzyć według tests/README.md. Starsze testy i audyty są zachowane historycznie.

Telefonu nie testowano, zgodnie z poleceniem użytkownika. Brak zapisu postępu między odświeżeniami; to stan jednej sesji.
