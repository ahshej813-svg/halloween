# NOCTURNE

Jednostronicowa gra grozy w przestrzennym ASCII. Bieżący kod to `index.html`; projekt jest kontynuacją istniejącej sceny, bez przebudowy od zera.

## Uruchomienie

Otwórz `index.html` w Edge, Chrome lub innej przeglądarce z Canvas. Gra nie wymaga internetu, npm ani zewnętrznych zasobów. Opcjonalny serwer lokalny, uruchamiany w tym folderze:

```sh
python -m http.server 8000
```

Wejdź na http://localhost:8000/. Po wymianie pliku odśwież Ctrl+F5.

## Sterowanie

- Kliknięcie sceny albo Enter/spacja włącza głos. Pierwsze włączenie audio odtwarza aktualną kwestię bez jej pomijania.
- „Dalej” / Enter prowadzi rozmowę; wybory: mysz lub 1–5. Tab i strzałki zmieniają fokus.
- Przy grobie: „Przyjrzyj się nagrobkowi” lub I; Escape zamyka zbliżenie.
- R rozpoczyna grę od nowa. Końcowy przycisk ↺ również zeruje wszystkie wybory.
- Ukrycie karty zatrzymuje zegar sceny, mowę i dźwięk.

## Aktualny przebieg

Dynia ostrzega Aleksa i Sandrę, otwiera twarz i przepuszcza kamerę. Para odkrywa ciało przy drodze, wybiera grób Gabrysia, Weroniki lub Borisa i dociera do człowieka na krzyżu. Boris jest człowiekiem. Każdy grób ma inne miejsce, bryłę, opis i cytat; Gabryś ma znakowy nadruk kota z dostarczonego zdjęcia.

Kolejny akt obejmuje wybór kolejności pomocy i wizyty, domek z nożycami, próbę ratunku, Mściciela, powstanie zmarłych i pięć decyzji finałowych. Bez nożyc próba uwolnienia się nie udaje. Wybór siebie prowadzi do interwencji Sandry i wron. Postęp trwa w bieżącej sesji; odświeżenie lub R go zeruje.

## Obraz i głos

Świat jest renderowany perspektywicznie, cieniowany i zamieniany na widoczne glify ASCII. Końcowy etap używa WebGL2, z awaryjnym rendererem Canvas. Głównym źródłem światła jest księżyc; latarnie pozostają wygaszone. Nie ma rzeczki. Polskie napisy i dialogi zachowują UTF-8.

Głosy zapewnia systemowa synteza mowy. Na testowanym komputerze są to Microsoft Paulina i Microsoft Adam; dostępność dwóch polskich głosów zależy od urządzenia. Nie są to nagrania aktorskie.

## Pliki

- `AGENTS.md` — aktualne wymagania; wcześniejsze ustalenia zachowano w `docs/history/`.
- `ZMIANY-I-TESTY.md` — zakres audytu, wyniki i ograniczenia.
- `diagnostics/audit-*.json` — wyniki aktualnych kontroli.
- `previews/audit-*.png` — aktualne kadry desktopowe. Starsze podglądy są materiałem historycznym.
- `tests/` — opcjonalne testy deweloperskie, oddzielne od samodzielnej gry.
- `assets/` — dostarczony obraz kota i wersja ASCII; używana wersja jest osadzona w HTML.

Telefonu nie testowano, zgodnie z instrukcją użytkownika.
