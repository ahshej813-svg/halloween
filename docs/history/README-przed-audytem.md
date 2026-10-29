# NOCTURNE — projekt do kontynuowania w Codex

To aktualna wersja jednostronicowej animacji kinowej w ASCII, z efektem świata 3D. **Punktem wejścia jest `index.html`.**

## Uruchomienie

Możesz otworzyć `index.html` w przeglądarce bez instalowania zależności.
Jeśli wolisz lokalny serwer, w katalogu projektu uruchom:

```sh
python -m http.server 8000
```

Następnie otwórz `http://localhost:8000`.

## Przeniesienie do Codexa

1. Rozpakuj ZIP na komputerze (np. do folderu `NOCTURNE`).
2. Otwórz ten folder w VS Code z rozszerzeniem Codex lub w aplikacji ChatGPT Desktop w widoku Codex, wybierając folder lokalny.
3. Wyślij Codexowi wiadomość:

> Przeczytaj AGENTS.md i README.md, przeanalizuj index.html oraz references/. Kontynuujemy istniejący projekt NOCTURNE. Nie pisz go od zera. Najpierw popraw pierwszą scenę: księżyc, dynię, chmury, drzewa, kamienną ścieżkę i perspektywę przestrzeni. Wszystko ma być renderowane WYŁĄCZNIE jako szczegółowe i czytelne ASCII, z rzeczywistą głębią 3D, bez napisów i bez nachodzenia elementów. Zachowaj płynne przejście do drogi na cmentarz na tej samej stronie. Zrób konkretne poprawki w kodzie, uruchom i sprawdź animację na desktopie i telefonie.

## Organizacja

- `index.html` — bieżący kod źródłowy
- `AGENTS.md` — wymagania dla agenta programistycznego
- `references/` — aktualne podglądy do porównania
- `docs/` — pierwotne ustalenia i kontekst

## Uwagi

Aktualne podglądy nie stanowią docelowego poziomu jakości; użytkownik oczekuje dalszego dopracowania. Dialogi głosowe są planowane na późniejszy etap.


## Aktualny stan — aktualizacja Halloween
Dynia stoi na środku drogi, przemawia i śmieje się, a kamera przejeżdża przez jej otwartą twarz. Po prawej płynie strumień, nad rozbudowanym cmentarzem latają wrony, a nad sceną okresowo przelatują nietoperze. Kliknij scenę, aby włączyć głos i ciche krakanie. Szczegóły i wyniki testów: `ZMIANY-I-TESTY.md`.


## Najnowszy stan — rozmowa i wybór odwiedzanego grobu
Rzeczkę usunięto. Dodano pomarańczowe latarnie, ciało z ptakami oraz wyraźnie różne sylwetki Aleksa i Sandry. Po przejściu przez dynię rozmowa pozwala wybrać Gabriela, Weronikę albo Chrupka. To zmienia trasę i miejsce pamięci; Chrupek ma psi grób z łapką i opcją zostawienia piłki. Dwa głosy i napisy działają w panelu rozmowy. Przechodź „Dalej”, wybieraj myszą lub klawiszami 1–3; R zaczyna od nowa. Włącz audio kliknięciem sceny. Aktualne wymagania i testy są w ZMIANY-I-TESTY.md.


## Najnowsza korekta — niepewność na drodze
Panel rozmowy bliżej środka ma ramę ASCII, światła są słabsze, obiekty rzucają cienie na grunt. Cmentarz odsunięto dalej. Po wyjściu z dyni bohaterowie najpierw odkrywają krew, ciało i coś poruszającego się w krzakach. Pierwsze włączenie głosu nie pomija już wypowiedzi Sandry.


## Najnowsza wersja — trzy odrębne groby
Aktualne wybory: Gabryś, Weronika, Boris (człowiek). Groby mają bryły, grubość i cieniowanie powierzchni. Gabryś ma nadruk ASCII z lokalnego obrazu kota; każdy ma osobny cytat i opis. Przy grobie dostępne jest zbliżenie tablicy, zamykane Escape. Wiatr narasta podczas marszu, poruszając suchą i żywą roślinnością. Szczegóły i testy: ZMIANY-I-TESTY.md.


## Płynniejszy renderer i kamera
Świat nadal jest ASCII, a końcową konwersję wykonuje GPU / WebGL2. Zachowano fallback Canvas. Kamera jest niższa i śledzi parę bliżej. Poprawiona sylwetka na krzyżu ma krew przy podstawie. Przed bramą po lewej na chwilę pojawia się chowająca się postać. Aktualne pomiary i testy: ZMIANY-I-TESTY.md. Po zmianie wersji można użyć Ctrl+F5, aby ominąć cache przeglądarki.


## Grywalny kolejny akt
Przy krzyżu wybierz pomoc lub najpierw grób. W domku możesz wziąć przedmiot ratunkowy albo uciec. Dalej są Mściciel, przerywnik powstawania zmarłych i pięć finałowych decyzji. Wybory: mysz / 1–5, dialog: Dalej, restart: R. Aktualny przebieg i testy w ZMIANY-I-TESTY.md.
