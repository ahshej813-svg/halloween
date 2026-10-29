# HALLOWEEN — NADRZĘDNY KANON, KOREKTY I GRANICE IMPLEMENTACJI (v12)

Ten plik nadpisuje sprzeczne zapisy ze starszych paczek. **Nie wszystko w scenariuszu v8 ani mapie v11 jest zatwierdzonym kanonem.**

## Zasady, których nie wolno zmienić

1. Tytuł: **Halloween**. Starszy tytuł używany w oryginalnym Wordzie jest archiwalny.
2. Prawdziwa geometria i kamera **3D** z wyglądem ASCII, sterowanie lokalne na jednej klawiaturze: Aleks (WASD), Sandra (strzałki); bez dodawania żywych NPC.
3. Przedmioty startowe są indywidualne i **nieprzekazywalne**; osobne są bronie/pancerze i zdobywane nożyce.
4. Grób: jedna z trzech osób (Gabryś, Borys, Weronika), oddzielne oglądanie nagrobka i znicz. Grób wpływa na atak Toma i pomoc ducha. Osobno wybór ofiary spośród pięciu.
5. Nieznajomego można zdjąć z krzyża nożycami; mimo tego umiera z wykrwawienia przy krzyżu. Szybszy ratunek pozwala uzyskać tajemniczą wskazówkę. Sandra prosi o pomoc, Aleks wybiera kolejność.
6. Mściciel w akcie I to **klon istniejącego wcześniej Toma**. Ma być wyraźnie pokazany na cmentarzu przed poleceniem przejścia przed bramę. Naprawić tę usterkę w faktycznym kodzie.
7. Po wyborze samego Aleksa następuje pojedynek z Sandrą i pochówek przegranego; po nim minigra Epitafium prowadzi do wskrzeszenia. Bezpośredni wybór Sandry prowadzi do Karaoke Toma („Gabryś jest spoko”) z obsługą słabego/brakującego mikrofonu. Goon Room, nie Gun Room.
8. W quizie zwierzęcym **jeden wspólny wybór**: Chrupek/Lila/Arena/ETF. Gracze z niezgodnymi odpowiedziami muszą je uzgodnić. Quiz 3 z Igą to wymuszona trzecia opcja.
9. Zoo: **pięć**, nie dziesięć fok i **pięć**, nie dziesięć żółwi Tomów. Przegrana Aleksa → klątwa foki (nie śmierć); Sandra odczarowuje go, pokonując foczą formę. Przegrana Sandry → „dzień” w zoo = minuta ASCII TikToka dla Aleksa.
10. Gołąb Szaman: po przegranej na giełdzie dług; do spłaty **10 świecących piór** w czytelnych miejscach. Nie wymuszać żmudnego szukania.
11. Rem z lokalnymi dźwiękami, kartka „gaźnik” i oryginalny kolor oczu Toma, karma oswajająca demoniczną Lilę, widelec i gouda z fokami, długopis i 3% debuff za pisanie krwią, pluszak Sandry — zachować ich fabularne funkcje.
12. Ataki Toma: siedem zwykłych oraz trzy zależne od grobu. Łapa Gniewu musi mieć **czerwony obszar ostrzegawczy PRZED ciosem**; fala Pentagramu ma być wolna i możliwa do uniknięcia. Czytelny obraz na słabym sprzęcie ważniejszy niż liczba małych cząstek.
13. Po zoo Aleks i Sandra **nie spotykają** Alexa (X) i Salsy. W endingu 1 to Sandra ginie przy drodze, Aleks zostaje ranny na krzyżu, następnie pojawiają się Alex (X) i Salsa, powtarzając początkowy motyw.
14. Ending 2: porażka Areny, omdlenie, **wspólne przebudzenie w szpitalu** po wypadku samochodowym, który nastąpił po halloweenowej imprezie; oboje pamiętają ten sam sen. NIE budzą się na imprezie.
15. **NIE MA menu wyboru endingu**. Automatycznie ustala go historia, statystyki, artefakty i flagi z poprzednich scen. Wcześniejsze końcowe UI z opcjami E1–E7 jest archiwalne.
16. Siedem koncepcji: 1 Nieskończona noc, 2 Impreza Halloween (szpital i wspólny sen), 3 Sandra Toma, 4 Nóż w plecy, 5 Lila przeciw panu, 6 Dwa cienie, 7 Ostatni świt. Każda wymaga cutscenki, dialogów i epilogu.
17. Zapamiętywać zaufanie, wyzwisko wypowiedziane przy grobie Gabrysia, ton wypowiedzi przy grobach, znicz, pochówki, dobrowolne porozumienia o podstępie, wybór zwierzęcia, stan Lili, nożyce, echa i spłatę długu. Po pełnym resecie pamięć postaci znika, ale metapostęp odblokowań można zachować.
18. Dawanie sobie liścia jest wyłącznie żartem — **bez wpływu na reputację i endingi** (stara propozycja licznika agresji została wycofana).

## Miejsca wciąż robocze

- Interpretacja endingu 6 „Dwa cienie”: pusty świat był pomysłem asystenta, **nie został zatwierdzony**. Główna koncepcja zdrady jest zachowana.
- Czy automatycznie wymuszać zdradę Sandry w E3 lub E6 na podstawie nieufności oraz jak ustawić priorytet E3/E4/E6: **kolejność z v10 to propozycja implementacyjna**, nie wypowiedź zatwierdzająca autora.
- Lokacje 13 stref, 6–7 nowych mobów, bronie/pancerze, ich statystyki i ozdoby z v11 są **propozycjami**. Dobrze nadają się do wykonania i testów, ale nie zmieniają fabularnego kanonu.
- Opcjonalna „Sesja poprawkowa” Weroniki jest propozycją.
- Dokładne brzmienie żartu o rencie Borysa pochodzi z niedoskonałego rozpoznania głosu; zachować sens, dopracować redakcyjnie.

## Sprzeczności w starszych źródłach — jawne nadpisania

- v8 zawiera miejscami „wybór odejścia/wybór endingu” — nadpisać **automatycznym resolverem v10**.
- v8 E2 opowiada pobudkę na imprezie — nadpisać **szpitalem**.
- v7 określa historię Alexa (X) i Salsy jako nieukończoną — nadpisać **zatwierdzoną sceną E1 z v8**, w której nowa para wchodzi dopiero po tragedii; nie wymyślać przedwczesnego spotkania.
- Oryginalny plik wymienia „Boris”, inne wersje „Borys” — przyjąć Borys jako obowiązujące imię, z zachowaniem Alex (X) odrębnego od Aleksa (KS).
- Zmniejszona liczba fok i żółwi, wspólny quiz zwierzęcy, focza klątwa zamiast śmierci i nowa natura Toma mają pierwszeństwo przed najstarszym dokumentem.

## Brak kodu i warunki ukończenia

Nie ma jeszcze audytu rzeczywistego repo gry. Codex ma go przeprowadzić, następnie wdrażać etapowo, ale celem jest **cała ukończona gra**, nie sam prototyp. Raport musi uczciwie oddzielać wykonane i przetestowane funkcje od niedokończonych; nie deklarować pomiaru 60 FPS bez zmierzenia na odpowiednim sprzęcie. Testy automatyczne mają pokrywać 7 endingów i pierwszeństwo flag, checkpointy, widoczność Mściciela, kolizje, dialogi i brak softlocków.
