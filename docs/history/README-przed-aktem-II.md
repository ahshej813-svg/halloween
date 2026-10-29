# NOCTURNE

Jednostronicowa gra grozy w przestrzennym ASCII. Po filmowym przejściu przez dynię przejmujesz kontrolę nad dwiema postaciami. Dalej nie ma automatycznego marszu ani przenoszenia bohaterów między gotowymi kadrami.

## Uruchomienie

Otwórz `index.html` w przeglądarce. Gra działa bez internetu, instalacji npm i zewnętrznych zasobów. Opcjonalny serwer, uruchamiany w tym folderze:

```sh
python -m http.server 8000
```

Wejdź na http://localhost:8000/. Po aktualizacji odśwież Ctrl+F5.

## Sterowanie

| Postać / działanie | Klawisze |
|---|---|
| Aleks | W — do przodu, S — do tyłu, A / D — w bok |
| Sandra | Strzałki |
| Interakcja w pobliżu celu | E lub Enter |
| Rozmowa | Dalej / Enter; wybory myszą lub 1–5 |
| Poruszanie się po wyborach | Tab / strzałki |
| Zbliżenie tablicy przy grobie | Przycisk inspekcji lub I; Escape wraca |
| Restart całej gry | R lub końcowy ↺ |

Kamera śledzi oboje. Trzymaj postacie blisko: przy zbyt dużym oddaleniu pojawia się komunikat, na kogo poczekać. Do drzwi, stołu, grobu i człowieka na krzyżu muszą podejść oboje. W pobliżu pojawia się krótka podpowiedź interakcji. E z dala od celu przypomina kierunek dalszej drogi. Dialogi i przerywniki blokują ruch; ukrycie karty zatrzymuje grę i dźwięk.

Kliknij scenę lub użyj przycisku rozmowy, aby włączyć audio. Pierwsze włączenie nie pomija aktualnej kwestii. Głosy są systemowe; na sprawdzanym komputerze Sandra korzysta z Microsoft Paulina, Aleks z Microsoft Adam.

## Przebieg

Po dyni samodzielnie prowadzisz parę wzdłuż kamiennej ścieżki. Odkrycie ciała prowadzi do wyboru grobu Gabrysia, Weroniki albo Borisa. Boris jest człowiekiem. Każdy grób ma inne miejsce, bryłę, opis i cytat; Gabryś ma nadruk ASCII z dostarczonego obrazu kota.

Przy krzyżu wybierasz kolejność pomocy i wizyty. Domek stoi po prawej stronie drogi przed bramą. Trzeba do niego dojść, wejść, podejść do stołu i zdecydować o nożycach, a potem samodzielnie wrócić do drzwi i na cmentarz. Nożyce pozwalają uwolnić człowieka; bez nich próba się nie udaje. W obu kolejnościach wizyta i próba pomocy następują przed konfrontacją.

Zmarli powstają przy swoich faktycznych grobach. Mściciel i pozostałe osoby idą do bramy; finałowy wybór czeka, aż cała grupa znajdzie się na miejscu. Wybór siebie kończy się interwencją Sandry i wron. Następnie trzeba jeszcze wyprowadzić oboje drogą w stronę dyni. Pozostałe cztery wybory kończą się wskazanym przez użytkownika mrocznym finałem. Postęp trwa w bieżącej sesji; odświeżenie i R go zerują.

## Projekt i kontrola

Świat zachowuje ASCII, bryły 3D, księżycowe światło, wygaszone latarnie, drzewa, wiatr i nieregularną drogę. Brak rzeczki i dodatkowych tytułów w grze. Polskie napisy pozostają UTF-8. Renderer używa WebGL2 z awaryjnym Canvas; trzy główne nagrobki zachowują pełną geometrię, dalsze dekoracje korzystają z LOD.

- `index.html` — samodzielny kod gry.
- `AGENTS.md` — aktualne zasady kontynuacji.
- `ZMIANY-I-TESTY.md` — zmiany, dowody testów i ograniczenia.
- `diagnostics/coop-*.json`, `previews/coop-*.png` — kontrola bieżącej wersji.
- `tests/README.md` — powtarzalne testy deweloperskie.
- `docs/history/`, starsze audit-* i act-* — wcześniejsze wersje i podglądy, nie bieżąca specyfikacja.

Telefonu nie testowano, zgodnie z instrukcją użytkownika.
