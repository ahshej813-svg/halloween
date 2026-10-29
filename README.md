# Halloween

Kooperacyjna gra grozy i absurdu dla dwóch osób przy jednej klawiaturze. Istniejący NOCTURNE rozwinięto o kampanię V12: Goon Room, zoo, powrót czasu, walkę z Tomem i siedem automatycznych zakończeń. Świat pozostaje przestrzennym ASCII. Bieżąca weryfikacja: [STATUS](docs/STATUS.md).

## Uruchomienie

Otwórz `index.html` albo uruchom w tym folderze `python -m http.server 8000` i wejdź na http://localhost:8000/. Bez internetu, konta i npm. Po aktualizacji Ctrl+F5. Mikrofon jest opcjonalny. Głosy zależą od systemowych głosów przeglądarki; wyciszenie jest w pauzie.

## Sterowanie domyślne

| Działanie | Aleks | Sandra |
|---|---|---|
| Ruch względem kamery | WASD | Strzałki |
| Atak | Spacja | Prawy Shift |
| Unik | Lewy Shift | Prawy Ctrl |
| Własny artefakt / zdolność | X | . |
| Interakcja | E | Enter |
| Komediowy liść partnerowi | F | L |
| Facepalm sobie | G | K |

Przytrzymaj interakcję 2 s przy powalonym partnerze, 1 s przy echu na krzyżu. Kamera: Q/C, przeciąganie PPM, kółko; V/Home reset. Escape: pauza, jakość, wyciszenie i przypisania klawiszy. R/↺: pełny restart bieżącej nocy, zachowujący ustawienia i osobny spis obejrzanych finałów. Dialogi: Enter; wybory myszą i klawiaturą. Minigry pokazują własne wskazówki.

Artefakty są prywatne i niewymienne. Broń i pancerz mają osobne sloty. Nożyce są wspólnym rekwizytem z domku. Brak opcjonalnego sprzętu nie blokuje kampanii. Liście i facepalmy nie odbierają HP ani nie zmieniają zakończenia.

## Przebieg

- Przedmioty obojga, prolog, droga i trzy różne groby. Osobny znicz i pamiętany ton wypowiedzi. Pomoc przed grobem lub po nim; nieznajomy umiera mimo ratunku, szybka pomoc nożycami daje wskazówkę.
- Werdykt: zmarła osoba prowadzi przez burzę, Sandra przez karaoke, wybór siebie przez pojedynek, pochówek i epitafium. Wszystkie ścieżki mają dalszy ciąg.
- Goon Room: dwa osobno zajmowane krzesła, indywidualne zaufanie, wspólnie uzgadniane zwierzę. Chrupek, Lila, Arena i ETF mają odmienne skutki. ETF i Clicker wymagają działania obu graczy. Dalej Iga, mówiące drzwi i korytarz prób z opcjonalną tablicą Weroniki.
- Zoo: dwie kamery jednej symulacji. Aleks walczy z fokami, Sandra wita pięć Tomów. Porażki prowadzą do foczej klątwy i/lub minuty ASCII TikToka, potem gra trwa dalej.
- Pusta droga, spłata długu piórami lub walka z gołębiem, krążące klony, trans i przygotowanie do bossa. Lilę świadomie oswaja właściciel karmy.
- Tom: siedem zwykłych i trzy zależne od grobu ataki, ostrzeżenia, uniki, wspólny atak, pomoc partnerowi i echa. Finał wynika z wcześniejszych decyzji; nie wybierasz numeru zakończenia.

## Zapis, jakość i źródła

`WZNÓW OSTATNI CHECKPOINT` odtwarza stabilny punkt. Lokalny zapis ma wersjonowanie i odrzuca uszkodzone rekordy; nie zapisuje callbacków przerywników. Porażka daje powtórkę etapu. Po szpitalu można wrócić przed wybór zwierzęcia.

Auto zmienia rozdzielczość z opóźnieniem, bez pulsowania co klatkę. Low celuje w 30 FPS, High w 60 FPS; rzeczywiste pomiary są w STATUS. Bryły i podłogi to trójkąty WebGL2 z buforem głębi, końcowy shader tworzy ASCII. Przy braku WebGL pozostaje renderer zapasowy.

`index.html` jest samodzielnym wynikiem. Edytuj `src/journey-v12.js`, `src/geometry-gpu.js`; zachowana baza jest w `src/base.html`. Odtworzenie: `python tools/build.py`. Patrz [AGENTS](AGENTS.md) i [testy](tests/README.md).

Dokumentacja użytkownika: `docs/spec-v12`. Kanon V12 ma pierwszeństwo przed archiwum. Starsze opisy implementacji: `docs/history/before-campaign-integration`. Pochodzenie Rema: [ASSET-SOURCES](assets/ASSET-SOURCES.md). Telefonu nie testujemy, zgodnie z poleceniem użytkownika.
