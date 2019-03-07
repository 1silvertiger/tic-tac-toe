const wins = [[0, 1, 2], [0, 4, 8], [0, 3, 6], [4, 1, 7], [4, 3, 5], [4, 2, 6], [8, 5, 2], [8, 7, 6]];

    const symbols = {};
    symbols['x'] = '<i class="fas fa-10x fa-times"></i>';
    symbols['o'] = '<i class="fas fa-10x fa-circle"></i>';

    let humanPlayer = 'x',
        robotPlayer = 'o';

    $(document).ready(function () {
        $("#playerSymbolSwitch").change(function () {
            if ($(this).prop('checked')) {
                $("#switchLabel").text("Play as O");
                humanPlayer = 'o';
                robotPlayer = 'x';
                play();
            } else {
                $("#switchLabel").text("Play as X");
                humanPlayer = 'x';
                robotPlayer = 'o';
            }
        });

        $("#resetBtn").click(function () {
            $("#playerSymbolSwitch").attr('disabled', false);
            $("td").each(function () {
                $(this).find('svg').remove()
                $(this).removeClass('human').removeClass('robot');
            });
            if ($("#playerSymbolSwitch").prop('checked'))
                play();
            return false;
        });

        $("td").click(function () {
            $("#playerSymbolSwitch").attr('disabled', true);
            if (!isUsed($(this))) {
                $(this).addClass("human").append(symbols[humanPlayer]);
                if (checkWin('human'))
                    alert('you won');
                else if (checkEmptySpaces())
                    play();
                else
                    alert('draw');
            }
        });
    });

    function checkWin(player) {
        for (let i = 0; i < wins.length; i++) {
            let win = wins[i];
            if ($("td").eq(win[0]).hasClass(player) && $("td").eq(win[1]).hasClass(player) && $("td").eq(win[2]).hasClass(player))
                return true;
        }
        return false;
    }

    function checkPossibleWin() {
        for (let i = 0; i < wins.length; i++) {
            let win = wins[i];
            if ($('td').eq(win[0]).hasClass('robot') && $('td').eq(win[1]).hasClass('robot') && !isUsed($('td').eq(win[2])))
                return win[2];
            else if ($('td').eq(win[0]).hasClass('robot') && $('td').eq(win[2]).hasClass('robot') && !isUsed($('td').eq(win[1])))
                return win[1];
            else if ($('td').eq(win[1]).hasClass('robot') && $('td').eq(win[2]).hasClass('robot') && !isUsed($('td').eq(win[0])))
                return win[0];
        }
        return -1;
    }

    function checkPossibleBlock() {
        for (let i = 0; i < wins.length; i++) {
            let win = wins[i];
            if ($('td').eq(win[0]).hasClass('human') && $('td').eq(win[1]).hasClass('human') && !isUsed($('td').eq(win[2])))
                return win[2];
            else if ($('td').eq(win[0]).hasClass('human') && $('td').eq(win[2]).hasClass('human') && !isUsed($('td').eq(win[1])))
                return win[1];
            else if ($('td').eq(win[1]).hasClass('human') && $('td').eq(win[2]).hasClass('human') && !isUsed($('td').eq(win[0])))
                return win[0];
        }
        return -1;
    }

    function checkEmptySpaces() {
        let emptySpaceExists = false;
        $("td").each(function () {
            if (!isUsed($(this)))
                emptySpaceExists = true;
        });
        return emptySpaceExists;
    }

    function isUsed(tile) {
        return $(tile).hasClass('human') || $(tile).hasClass('robot');
    }

    function gameOver() {
        alert("game over");
    }

    function play() {
        switch ($("#selectLevel").find(":selected").text()) {
            case '2':
            case '1':
                let winningMove = checkPossibleWin();
                if (winningMove > -1) {
                    $("td").eq(winningMove).addClass("robot").append(symbols[robotPlayer]);
                    break;
                }
            case '2':
                let blockingMove = checkPossibleBlock();
                if (blockingMove > -1) {
                    $("td").eq(blockingMove).addClass("robot").append(symbols[robotPlayer]);
                    break;
                }
            case '0':
                playRandomTile();
                break;
            default:
                alert('error');
        }

        if (checkWin('robot'))
            alert('the robot won');
        else if (!checkEmptySpaces())
            alert('draw');
    }

    function playRandomTile() {
        let tile;
        do {
            tile = $("td").eq(getRandomTile());
        } while (isUsed(tile));
        tile.addClass("robot").append(symbols[robotPlayer]);
    }

    function getRandomTile() {
        return Math.floor(Math.random() * Math.floor(9));
    }