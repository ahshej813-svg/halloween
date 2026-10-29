# Kontrola wersji z dwiema postaciami

Gra nadal nie wymaga Node ani zależności. Poniższe testy deweloperskie wymagają Node.js, pakietu `playwright` dostępnego dla `require()` i Microsoft Edge. Uruchom serwer projektu na porcie 8000, a następnie z katalogu projektu:

```sh
node tests/coop-matrix.cjs
node tests/coop-input.cjs
node tests/coop-runtime.cjs
node tests/fallback.cjs
```

- Macierz: 60 kombinacji trzech celów, dwóch kolejności, dwóch decyzji o nożycach i pięciu finałów. Test prowadzi obie postacie przez system wejścia, kolizje i warunki bliskości; używa przyspieszonego kroku symulacji. Sprawdza również inspekcję grobu, brak automatycznego marszu, realne dojście NPC przed bramę, ucieczkę w dobrym finale i reset. Audio jest w tym teście wyłączone. `coop-driver.cjs` to pomocnik testowy, nie autopilot gry.
- Wejście: osiem rzeczywistych klawiszy przeglądarki, osobne postacie, prędkość po skosie, blokada ruchu w dialogu, blur i ukryta karta, limit oddalenia i komunikat oczekiwania, kolizje płotu i stołu, obie postacie przy drzwiach, dwie rozdzielczości desktopowe oraz reset.
- Runtime: normalne przejście końcówki prologu do sterowania, rzeczywiste zdarzenia startu głosów Pauliny i Adama, kamera podczas marszu, pomiary klatek, chodzenie za stołem, wariant bez nożyc, finał Sandry i działające sterowanie bez WebGL2.
- Fallback: szybki test niepustego renderera znakowego bez GPU.

Wyniki zapisują się do diagnostics, kadry do previews. Skrypty matrix.cjs i graves.cjs przekierowują do nowej macierzy; ich wcześniejsze wersje zachowano w docs/history/tests-before-controls. Telefonu nie testować.
