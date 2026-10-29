# NOCTURNE — audyt i dopracowanie

Ten plik opisuje bieżącą wersję. Poprzedni, narastający dziennik zmian zachowano w `docs/history/ZMIANY-I-TESTY-przed-audytem.md`.

## Co poprawiono

- Przeanalizowano istniejący HTML, renderer, kamerę, sceny, stan fabuły, dialogi, wejście z klawiatury i audio. Kontynuowano dotychczasowy kod.
- Stałe bryły nagrobków i ich oświetlenie są buforowane. Projekcja nie tworzy już dodatkowego wektora dla każdego punktu. Wiatr drzew korzysta z wcześniej obliczonych wag; wspólne obliczenia przeniesiono poza pętlę gałęzi.
- Postać na krzyżu i sam krzyż mają spójną skalę. Bliższy kadr zachowuje widoczność sylwetki. Wzięcie nożyc daje widoczny ratunek: opuszczenie ciała, opadnięcie rąk i zniknięcie więzów. Bez przedmiotu ta animacja nie następuje.
- Sandra w nowym akcie jest niższa, ma długie włosy i szalik. Poprawiono tułowie, buty oraz czytelność pistoletu. Postacie nowego aktu rzucają kierunkowe cienie.
- Domek otrzymał ukośny kadr, deski podłogi, czytelniejszy stół i nożyce. Ciała i ciemnoczerwona krew pozostają znakowe, bez dosłownych detali okaleczeń.
- Tło kolejnego aktu ma dalsze drzewa, trawę, kamienną alejkę i elementy ogrodzenia. Stado wron jest rysowane po bryłach, dzięki czemu nie znika za geometrią finału.
- Zegar i dźwięk zatrzymują się po ukryciu karty. Poprawiono ochronę przed ponownym uruchomieniem starego wyboru, reset pomiaru klatek, fokus replay oraz zwalnianie węzłów odgłosu wron.
- Uporządkowano AGENTS i README; historyczne sprzeczne ustalenia nie są już przedstawiane jako aktualne wymagania.

## Zachowany zakres gry

Cały świat pozostaje ASCII z projekcją 3D; dialogi i inskrypcje zachowują polskie litery. Jedna strona, księżycowe oświetlenie, wygaszone latarnie, brak rzeczki, nieregularna droga, roślinność z wiatrem, ptaki i ukryta sylwetka przed bramą.

Dynia wypowiada nowe ostrzeżenie i otwiera twarz. Trzy ludzkie miejsca pamięci mają różne położenie, model, cytat i opis. Nadruk Gabrysia pochodzi z dostarczonego obrazu kota. Po krzyżu działają obie kolejności, domek i dwie decyzje o przedmiocie, próba ratunku, Mściciel, powstanie trzech zmarłych, pięć finałów i pełny reset. Kolejność „pomoc najpierw” z zabraniem nożyc może zostać przerwana konfrontacją przed wizytą przy grobie; wybór „grób najpierw” lub ucieczka zapewniają wcześniejszą wizytę.

## Weryfikacja

Testy wykonano na desktopie Windows / Edge Chromium. Telefonu nie testowano, zgodnie z poleceniem użytkownika.

| Obszar | Dowód |
|---|---|
| Wszystkie rozgałęzienia | `diagnostics/audit-matrix.json`: 60/60 kombinacji, bez błędów JS; sprawdzane cele, kolejność, przedmiot, powodzenie ratunku, wizyta, odrodzenie, finał i reset |
| Zbliżenia trzech grobów i dokładne cytaty UTF-8 | `diagnostics/audit-graves.json`, `previews/audit-detail-*.png`; test zamknięcia Escape i resetu |
| Pierwsza kwestia Sandry i dwa głosy | `diagnostics/audit-desktop.json`: rzeczywiste zdarzenia startu Pauliny i Adama, kliknięcie audio nie zmienia aktualnej kwestii |
| Dźwięk wron, pauza ukrytej karty, klawiatura | `diagnostics/audit-desktop.json`; Tab w wyborach, wybór 5, reset R, zatrzymanie i wznowienie zegara |
| Desktop 1280×800 i 1920×1080 | `previews/audit-1280-*.png`, `previews/audit-1920-*.png`; brak przewijania dokumentu |
| Samodzielny plik bez serwera | `diagnostics/audit-desktop.json`: udane otwarcie przez file://, UTF-8 i niepusty obraz |
| Brak WebGL2 oraz utrata kontekstu | `tests/fallback.cjs` oraz `diagnostics/audit-context-loss.json`: GPU wyłączone, niepusty renderer znakowy, brak błędów |
| Rzeczywisty ruch | Obserwacja czasowego powstawania zmarłych, opuszczania człowieka podczas ratunku oraz kadry domku, konfrontacji i finałów |

Macierz 60 przebiegów używa rzeczywistych przycisków dialogu, ale przyspiesza czas przerywników i wyłącza wyjście audio. Nie oznacza to odsłuchania każdej kwestii w każdym z 60 przebiegów. Głosy i ruch sprawdzono osobno. Synteza jest systemowa; nie są to nagrania aktorskie.

## Płynność

Pomiary rzeczywistych odstępów między narysowanymi klatkami, desktop 1920×1080, WebGL2. To pomiar całej animacji, nie samego wysłania komend do GPU.

| Fragment | Mediana | 95. percentyl |
|---|---:|---:|
| Intro | 34,7 ms | 34,8 ms |
| Marsz | 34,7 ms | 48,7 ms |
| Ostrzeżenie przy krzyżu, wybrany cel | 34,7 ms | 34,9 ms |
| Grób Gabrysia | 34,7 ms | 34,9 ms |
| Grób Weroniki | 34,7 ms | 34,9 ms |
| Grób Borisa | 34,7 ms | 34,8 ms |

Cel renderera to 30 kl./s; na testowanym komputerze mediana odpowiada około 29 kl./s. Marsz nadal ma krótkie dłuższe klatki. Tryb bez WebGL2 jest wolniejszy. Wyniki nie są gwarancją identycznej wydajności na innym sprzęcie.

## Dalsza kontrola

Składnia skryptu sprawdzona `node --check`. Opcjonalne powtarzalne testy i wymagania ich uruchomienia znajdują się w `tests/README.md`. Gra nadal uruchamia się bez instalacji zależności. Aktualne kadry mają przedrostek `audit-`; wcześniejsze kadry służą porównaniu historycznemu.
