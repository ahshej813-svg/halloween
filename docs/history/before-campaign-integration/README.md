# Halloween — aktualizacja V12

Aktualna specyfikacja całej gry: docs/spec-v12/. Stan i plan implementacji: docs/STATUS.md i docs/PLAN.md. Trwa kontynuacja istniejącej gry; pełna V12 nie jest jeszcze gotowa. Zapis checkpointów działa: przy uruchomieniu wybierz WZNÓW OSTATNI CHECKPOINT. R kasuje bieżącą pętlę. Nieznajomy i wskazówka ratunku zostały dostosowane do V12. Quiz zwierzęcy wymaga teraz jednego wspólnego wyboru i pozwala zmienić rozbieżne odpowiedzi. Dawne opisy niezależnych odpowiedzi poniżej są historyczne.

# NOCTURNE

Jednostronicowa gra grozy i absurdu w przestrzennym ASCII, dla dwóch osób przy jednej klawiaturze. Kontynuacja istniejącego projektu: wybór ekwipunku, prolog z dynią, ręcznie sterowany pierwszy akt oraz nowy akt z Tomem i Gun Room.

## Uruchomienie

Otwórz index.html w przeglądarce. Gra działa bez internetu i instalacji npm. Możesz też uruchomić w tym folderze:

~~~sh
python -m http.server 8000
~~~

Wejdź na http://localhost:8000/. Po aktualizacji użyj Ctrl+F5. Kliknięcie wyboru odblokowuje audio. Głosy zależą od systemu; na sprawdzanym komputerze Sandra używa Pauliny, a Aleks Adama. Pierwsze włączenie audio nie pomija kwestii.

## Sterowanie

| Działanie | Aleks | Sandra |
|---|---|---|
| Chodzenie względem kamery | WASD | Strzałki |
| Liść partnerowi w zasięgu; poza zasięgiem facepalm | F | L |
| Facepalm sobie | G | K |
| Użycie własnego przedmiotu przy pasującym obiekcie | X | . |
| Początkowy ekwipunek: wybór / potwierdzenie | W/S lub A/D / F | Strzałki / L |
| Quiz: wybór / zaznaczenie | W/S / F | ↑/↓ / L |

| Wspólne działanie | Klawisze |
|---|---|
| Obrót kamery | Q/C lub przeciąganie PPM |
| Nachylenie / dystans | Pionowy ruch z PPM / kółko |
| Reset kamery | V lub Home |
| Interakcja w pobliżu / siadanie na własnym krześle | E lub Enter |
| Rozmowa | Enter / Dalej; wybory myszą, Tab lub 1–5 |
| Inspekcja tablicy grobu / powrót | I lub przycisk / Escape |
| Start prologu po obu potwierdzeniach | Enter lub przycisk |
| Pełny restart, ponowny wybór przedmiotów | R lub ↺ |

Menu i quiz działają też myszą. Dialogi i krótkie przerywniki zatrzymują chodzenie. Kamera śledzi oboje. Limit oddalenia pozwala wrócić do partnera, lecz nie odejść dalej. Blur czyści klawisze; ukrycie karty zatrzymuje grę i audio.

## Przedmioty

Przed dynią każdy wybiera jeden przedmiot w swojej połowie ekranu. Aleks ma sześć opcji: Rem, kartka „gaźnik”, karma dla psa, widelec, gouda i długopis. Sandra ma dodatkowo pluszowego żółwia Toma. Podglądy są znakowe. Rem pochodzi z ilustracji postaci przekonwertowanej do ASCII — [pochodzenie](assets/ASSET-SOURCES.md).

Ekwipunek ma osobnych właścicieli i przechodzi do katakumb. Każdy przedmiot ma własne zastosowanie: posłanie Rema, szczelina na kartkę, miska, krata, mysia nora, nisza Toma; długopis służy przy biurku. Podejdź właścicielem i użyj X lub kropki. To opcjonalne interakcje, nie rozstrzygnięcia quizu. Długopis daje niebieski atrament; bez niego pojawia się niedosłowny czerwony ślad na kartce.

## Historia

Pierwszy akt zachowuje trzy indywidualne groby Gabrysia, Weroniki i Borisa (człowieka), nadruk Gabrysia, domek z nożycami, obie kolejności wizyty i ratunku, powstanie zmarłych i marsz całej grupy do bramy. Trzeba dojść obojgiem do interakcji. Z nożycami ratunek się udaje, bez nich nie. Samo obejrzenie tablicy nie zastępuje znicza. Wybór siebie zachowuje wrony i ręczną ucieczkę; wybór Sandry zachowuje poprzedni finał.

Wybór Gabrysia, Weroniki lub Borisa prowadzi do drugiego aktu: deszcz, wir chmur, spadające dynie, wielki pluszowy Tom z właściwym imieniem ofiary, piorun i krąg ognia. Scena Mściciela jest niedosłowna: błysk i upadek. Ziemia pęka i para spada do katakumb Gun Room.

W sali znowu chodzisz obiema postaciami. Każda musi podejść do swojego krzesła i użyć E. Gdy obie usiądą, pojawiają się dwie osobne kartki quizu. Każdy odpowiada niezależnie. Pytanie pierwsze dotyczy zaufania do partnera, z zamówionymi reakcjami. Drugie: „Kto jest najlepszym zwierzęciem?” — Chrupek, Lila, Arena, „wykres ETF, giełda, Bitcoin, short”.

**Po drugim pytaniu odpowiedzi są zachowane w bieżącej sesji, ale nie mają jeszcze konsekwencji ani wyniku.** Użytkownik dopowie je później. Można wstać i eksplorować salę. R i odświeżenie zerują całość; brak zapisu między sesjami.

## Projekt i testy

- index.html — samodzielna gra i osadzone grafiki ASCII.
- AGENTS.md — aktualne zasady kontynuacji.
- ZMIANY-I-TESTY.md — zmiany, wyniki i ograniczenia.
- assets/ — źródła i credits Rema; brak pobierania podczas gry.
- diagnostics/act2-*.json i previews/act2-*.png — aktualna kontrola.
- tests/README.md — powtarzalne testy developerskie.
- docs/history/ i starsze pliki audit-*, act-*, coop-* — historia.

Sprawdzono desktop 1280×800 i 1920×1080. Telefonu nie testowano, zgodnie z poleceniem użytkownika.
