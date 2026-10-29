# NOCTURNE — ekwipunek, kamera i akt II

## Zmiany

Rozszerzono istniejący index.html, zachowując pierwszy akt, mapę, trzy groby, nadruk Gabrysia, ręczne sterowanie i decyzje. Pierwszy akt nadal ma księżycowe światło; pioruny i ogień występują w nowej zamówionej scenie.

Przed prologiem dodano podział ekranu na Aleksa i Sandrę, osobny wybór jednego przedmiotu i potwierdzenie obojga. Sześć wspólnych opcji oraz dodatkowy Tom dla Sandry. Długopis uwzględniono jako szóstą wspólną opcję. Rem ma portret ASCII z rzeczywistej ilustracji — pochodzenie w assets/ASSET-SOURCES.md. Zasoby potrzebne do gry są osadzone w HTML.

Kamera obraca się Q/C lub PPM, ma nachylenie, zoom i reset. Kierunki ruchu obracają się razem z nią. Poprawiono sortowanie świata względem kierunku patrzenia oraz przycinanie drogi i wnętrza przy kamerze. F/G i L/K dodają komediowe gesty z animacją, dźwiękiem i cooldownem, bez obrażeń czy wpływu na fabułę.

Śmierć Gabrysia, Weroniki lub Borisa otwiera akt II: deszcz, wir chmur, spadające dynie, wielki pluszowy Tom z odmienionym imieniem ofiary, piorun, ogień i zapadnięcie ziemi. Mściciel znika po niedosłownym błysku i upadku. Wariant Sandry i poświęcenie Aleksa zachowują dotychczasowe zakończenia.

Gun Room to przestrzeń 3D z murami, łukami, posadzką, biurkami i krzesłami. Każdą postacią trzeba podejść do jej krzesła. Jedna może siedzieć, gdy druga jeszcze chodzi. Przedmioty mają oddzielne opcjonalne stanowiska; długopis zmienia atrament quizu tylko u właściciela. Bez niego czerwony ślad na kartce, bez cięcia skóry.

Quiz ma dwie kartki i niezależne odpowiedzi. Pytanie o zaufanie i reakcje odpowiadają zamówionym dialogom. Drugie zawiera cztery tekstowe opcje, w tym pełne „wykres ETF, giełda, Bitcoin, short”. Stare callbacki i podwójne kliknięcia nie nadpisują kolejnego pytania. R zeruje również ekwipunek, quiz, kamerę i akt II.

## Weryfikacja

| Test | Wynik |
|---|---|
| Pary ekwipunku | 42/42 |
| Konfiguracje quizu | 48/48: 3 ofiary × 4 kombinacje długopisów × 4 kombinacje zaufania |
| Pary odpowiedzi pytania 2 | Wszystkie 16 dla każdej ofiary w ramach powyższych 48 przebiegów |
| Warianty fabuły | 60/60; 36 do obu pytań aktu II, 24 do starych finałów |
| Natywne klawisze ruchu | 8/8, niezależne postacie |
| Kamera i gesty | PPM, kółko, reset, obrót 180°, ruch względem kamery, 4 gesty i cooldown |
| Opcjonalne użycia przedmiotów | 6/6, przy właściwych obiektach i tylko raz |
| Głosy | Zdarzenia rzeczywistego startu Pauliny, Adama i Toma |
| Brak WebGL2 | Niepusty obraz i działający ruch |

Testy stanów korzystają ze zdarzeń wejścia, kolizji i przyspieszonej symulacji. Jawne checkpointy pomijają prolog lub akt I tylko w testach izolowanych. E2E prowadzi parę przez cały akt I od końca prologu, bez teleportowania do celów. Przekazanie sterowania z prologu, rzeczywisty czas efektów, głosy i płynność sprawdzono osobno. Przyspieszona symulacja nie jest pomiarem FPS.

Edge na tym komputerze, 1920×1080:

| Fragment | Mediana odstępu klatek | 95. percentyl |
|---|---:|---:|
| Marsz obojga | 34,7 ms | 41,7 ms |
| Grupa przy werdykcie | 34,7 ms | 34,9 ms |
| Gun Room | 34,7 ms | 34,8 ms |

Około 29 kl./s przy celu 30, bez gwarancji 60 FPS ani identycznego wyniku na innym sprzęcie. Awaryjny Canvas jest wolniejszy. Sprawdzono desktop 1280×800 i 1920×1080, obejrzano ekwipunek, Toma, ogień, zapadnięcie, salę i quiz. Telefonu nie testowano.

Wyniki: diagnostics/act2-*.json. Podglądy: previews/act2-*.png. Testy: tests/README.md. Składnię sprawdzono node --check; przenośny smoke uruchomiono z gotowego folderu projektu. Poprzednie źródła i testy zachowane w docs/history.

## Dalszy ciąg

Po pytaniu drugim: awaiting-next-act. Odpowiedzi pozostają w sesji; można wstać i chodzić. Nie ma jeszcze punktacji, poprawnej odpowiedzi, zwycięzcy ani konsekwencji opcji — użytkownik dopowie je później. Nie dodano usuniętej reguły jednej ocalałej osoby. Brak zapisu między odświeżeniami.

Przemoc jest niedosłowna: brak graficznego samobójstwa i samookaleczenia. Głosy zależą od systemu; zdarzenie startu syntezy nie oznacza ręcznego odsłuchania każdego dialogu we wszystkich wariantach.
