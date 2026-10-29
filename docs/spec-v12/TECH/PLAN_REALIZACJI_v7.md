# Halloween — plan wykonawczy dla długiej sesji Codexa

Wpisuj bieżący stan w `docs/HALLOWEEN_STATUS.md` **w repo gry**, aktualizowany po każdym etapie. Tego planu nie wolno traktować jako potwierdzenia, że cokolwiek jest już zaimplementowane. Dla każdej pozycji podaj: commit/ścieżki plików, wykonane testy, działający scenariusz, błędy i dalszy krok. Jeśli sesja się przerwie, następne uruchomienie Codexa ma kontynuować według statusu, a nie budować od nowa.

| Etap | Zakres | Gate wejścia/wyjścia |
|---|---|---|
| 0. Audyt repo | Znajdź stack, entrypoint, sceny, renderer, save, testy, skrypty; uruchom aktualną grę; screeny Mściciela/ASCII; zmierz bazowy FPS, jeśli możliwe. | Bez audytu nie wolno kasować kodu ani przepisywać silnika. Raport co jest / brak. |
| 1. 3D ASCII i 2 postacie | Zachowaj/napraw scenę 3D, kamerę, ASCII GPU, HUD, kooperacyjny input/remap/ghosting, ruch/kolizje. | Dwie postacie poruszają się równocześnie, brak scrollowania strony, widoczna głębia i stabilne glify. |
| 2. Akt I | Prolog, 3 groby i nagrobki, miłe/niemiłe, znicz, ranny, domek i nożyce, widoczny Mściciel, wybór ofiary i 3 rozgałęzienia. | Każda ofiara prowadzi do Goon Roomu, Mściciel widoczny zanim każe podejść do bramy. |
| 3. Goon Room | Epitafium, karaoke + klawiatura, 3 quizy, 4 opcje zwierzęcia wspólnie, Arena/ETF/clicker, Chrupek/Lila, postacie i dialogi. | Nie ma zablokowania ścieżki przy odmowie mikrofonu/braku długopisu/różnych wyborach. |
| 4. Zoo i dług | 5 fok, 5 żółwi, widelec/gouda, kara foki i zdjęcie, ASCII TikTok, 10 piór, szaman i dług. | Dwie minigry równoległe i ich 4 kombinacje wygrana/przegrana; żaden wynik nie blokuje postępu. |
| 5. Pętla | Powrót do dyni, rozpoznawalna droga, Alex (X) i Salsa, sceniczny pomost `author_pending` bez dopisywania sposobu śmierci, pamięć/reset. | Przejście jest grywalne i prawidłowo flagowane jako niekompletny wątek autorski. |
| 6. Walka | Zwykła walka dwójki, revive, PvP, Tom faza 1/2, 7 zwykłych ataków, 3 grobowe, duchy, klony, nożyce/echa. | Każdy atak unikany, brak nieuniknionych obrażeń, checkpoint i retry działają. |
| 7. Endingi | Pełne 7 cutscenek z dialogami, epilogami, jawne wybory, dynia, reset meta, ekran wyboru replay. | Każdy ending można osiągnąć poprzez właściwy stan, zablokowane nie uruchamiają się. |
| 8. Stabilność, jakość i wydajność | Automated tests, manual tests, diagnostyka 3D, regresja dialogów i wyborów, 1366×768 i 1920×1080, profile Low/High, lokalna dokumentacja. | Odpala się build. Realne FPS podane tylko jeśli rzeczywiście zmierzone, niedostępny sprzęt opisany jako „nie zmierzono”. |

## Cykl implementacji

Dla każdego etapu: implementuj → uruchom → testy → popraw → przejdź następny. Bez deklarowania że „ukończone” jeśli są placeholdery/przeskoki zamiast grywalnych etapów. Używaj istniejących konwencji repo; nie twórz nowego projektu równolegle do działającego.

## Obsługa wyjątków

- Brak repo: przygotuj **osobny** nowy projekt dopiero po potwierdzeniu, że rzeczywiście nie ma istniejącej gry w bieżącym workspace; odnotuj to. W tej rozmowie nie było dostępu do źródeł.
- Brak dostępu do mikrofonu: domyślnie gra klawiszami.
- Brak możliwości testów graficznych w środowisku: zbuduj automatyczne testy stanów, odtwórz gdy dostępny browser, nie deklaruj, że wizualny bug naprawiony.
- Niedookreślona kwestia lub balans: zastosuj sensowną wartość `PROJEKT`, oznacz ją w jednym pliku danych jako podlegającą korekcie.
- Wątek Alexa (X) i Salsy: zachowaj `author_pending`, nigdy nie dopisuj historii śmierci. To **wyjątek uniemożliwiający zatwierdzenie 100% kanonu**.
- Ograniczenie czasu/zasobów Codexa: zakończ sesję tylko z aktualnym `STATUS`, sprawdzonym, zachowanym kodem i listą zadanych kroków do wznowienia; nie udawaj kompletności.

## Definicja „ukończona implementacja w zakresie dostępnego kanonu”

1. 3D ASCII rzeczywiście działa i każda ważna postać/scena jest czytelna.
2. Obaj gracze mają wygodne sterowanie jedną laptopową klawiaturą, a zdarzenia nie gubią się przy niskim FPS.
3. Wszystkie dostępne autorskie sceny, wybory, minigry, 7 endingów i epilogi są grywalne, mają testy.
4. Przejście przez fabułę odbywa się bez ręcznych debug-komend (debug ułatwia tylko testowanie).
5. Nie ma crashy i softlocków w testach; nierozwiązane błędy wymieniono, a nie schowano.
6. Elementy zastrzeżone przez autora są jawnie odseparowane i opisane jako niekompletne; nie raportować całej gry jako w 100% fabularnie domkniętej.
