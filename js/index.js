/**-------------variables------------------------**/
var usr = "O",
    mc = "X",
    turn = "X";
var br = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
var cnt = 0,
    lock = false,
    coln = 'rgba(204, 0, 0,0.2)',
    colf = "#222";
var gmU = 0,
    gmC = 0;
/**-------------functions------------------------**/

//-------jquery ready fn---------------//
$(document).ready(function () {
  //----------on click types--------//
  //----------1st screen-----//
  $('#cx,#cy').on('click', function () {
    var k = $(this).html();
    if (k === 'X') {
      usr = 'X';
      mc = 'O';
      turn = usr;
      lock = false;
      $('.wrapper').css("opacity", "1");
      $('#display').fadeOut();
    } else if (k === 'O') {
      usr = 'O';
      mc = 'X';
      turn = mc;
      lock = true;
      $('.wrapper').css("opacity", "1");
      $('#display').fadeOut();
      //-----call start-----------//
      start();
    }
    $('.extras').show();
    $('#exu-c').html(usr);
    $('#excomp-c').html(mc);
  });
  //--------tile type click--------------//
  $('.t').click(function () {
    if (turn === usr && cnt < 9 && lock === false) {
      var id = $(this).attr('id');
      var val = $(this).html();
      if (turn === usr && val === "") {
        $(this).html(usr);
        turn = mc;lock = true;
        br[id] = $(this).html();
        cnt++;
        checkWin();
        cmove();
      }
    }
  });
  //--------reset all click---------------//
  $('#exrst').on('click', function () {
    clear();
    $('#display').show();
    $('.wrapper').css("opacity", "0.1");
    $('.t').hover(hoverin, hoverout);
    $('.extras').hide();
  });
  //--hover repeat:resetting stopped hover--//
  function hoverin() {
    $(this).css('background-color', '#262626');
  }
  function hoverout() {
    $(this).css('background-color', '#222');
  }
  //-----------start of comp move---------//
  function start() {
    turn === mc ? lock = true : lock = false;
    if (turn === mc) {
      var k = rand();
      $('#' + k).html(mc);
      turn = usr;
      lock = false;
      br[k] = mc;
      cnt++;
    }
  }
  //------------random fn--------------//
  function rand() {
    //---corners&center:even--//
    var r = Math.floor(Math.random() * 5) * 2;
    return r;
  }
  //----------clear-----------//
  function clear() {
    $(".t").html("");
    $('.t').css('background-color', colf);
    cnt = 0;
    br = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    mc === "X" ? turn = mc : turn = usr;
  }
  //---------------check-------------------------------//
  //---check fn: used only by minimax depth search----//
  function check() {
    //r[012][345][678]c[036][147][258]d[048][246]
    //----rows----//
    var k = "";
    if (br[0] === br[1] && br[1] === br[2]) {
      k = br[0] === mc ? 10 : -10;
      return k;
    } else if (br[3] === br[4] && br[4] === br[5]) {
      k = br[3] === mc ? 10 : -10;
      return k;
    } else if (br[6] === br[7] && br[7] === br[8]) {
      k = br[6] === mc ? 10 : -10;
      return k;
    }
    //----cols----//
    else if (br[0] === br[3] && br[3] === br[6]) {
        k = br[0] === mc ? 10 : -10;
        return k;
      } else if (br[1] === br[4] && br[4] === br[7]) {
        k = br[1] === mc ? 10 : -10;
        return k;
      } else if (br[2] === br[5] && br[5] === br[8]) {
        k = br[2] === mc ? 10 : -10;
        return k;
      }
      //----diag----//
      else if (br[0] === br[4] && br[4] === br[8]) {
          k = br[0] === mc ? 10 : -10;
          return k;
        } else if (br[2] === br[4] && br[4] === br[6]) {
          k = br[2] === mc ? 10 : -10;
          return k;
        }
        //----draw----//
        else if (cnt === 9) {
            return 0;
          }
          //------no conclusion yet-----//
          else return "N";
  }
  //--------absolute win states------------------//
  function checkWin() {
    //r[012][345][678]c[036][147][258]d[048][246]
    //----rows------//
    if (br[0] === br[1] && br[1] === br[2]) {
      $('#0,#1,#2').css('background-color', coln);
      win(br[0]);
    } else if (br[3] === br[4] && br[4] === br[5]) {
      $('#3,#4,#5').css('background-color', coln);
      win(br[3]);
    } else if (br[6] === br[7] && br[7] === br[8]) {
      $('#6,#7,#8').css('background-color', coln);
      win(br[6]);
    }
    //----cols------//
    else if (br[0] === br[3] && br[3] === br[6]) {
        $('#0,#3,#6').css('background-color', coln);
        win(br[0]);
      } else if (br[1] === br[4] && br[4] === br[7]) {
        $('#1,#4,#7').css('background-color', coln);
        win(br[1]);
      } else if (br[2] === br[5] && br[5] === br[8]) {
        $('#2,#5,#8').css('background-color', coln);
        win(br[2]);
      }
      //-----diag----//
      else if (br[0] === br[4] && br[4] === br[8]) {
          $('#0,#4,#8').css('background-color', coln);
          win(br[0]);
        } else if (br[2] === br[4] && br[4] === br[6]) {
          $('#2,#4,#6').css('background-color', coln);
          win(br[2]);
        }
        //----draw----//
        else if (cnt === 9) {
            win("0");
          }
          //----no conclusion yet-----//
          else return "N";
  }
  //---------------win decl-------------------//
  function win(wn) {
    if (wn === "0") {
      $('#endtx').html('Match<br/>&hearts; Draw &hearts;');
      $('#end').show();
    } else if (wn === mc) {
      $('#endtx').html('Computer<br/>&hearts; Won &hearts;');
      $('#end').show();
    } else {
      $('#endtx').html('You<br/>&hearts; Won &hearts;');
      $('#end').show();
    }
    setTimeout(function () {
      $('#end').fadeOut();
      restart();
    }, 3000);
  }
  //------------------cmove(decides comp move)----------//
  function cmove() {
    //----------case 0: cnt 1(center or corner)-----//
    if (cnt === 1) {
      if (br[4] === "4") {
        br[4] = mc;
        $('#4').html(mc);
        turn = usr;lock = false;
        cnt++;
      } else {
        var k = rand();
        while (br[k] !== "" + k) {
          k = rand();
        }
        if (br[k] === "" + k) {
          br[k] = mc;
          $('#' + k).html(mc);
          turn = usr;lock = false;
          cnt++;
        }
      }
    }
    //---case 1: cnt 2(if no center yet, mark it)-------//
    else if (cnt === 2) {
        if (br[4] === "4") {
          br[4] = mc;
          $('#4').html(mc);
          turn = usr;lock = false;
          cnt++;
        } else {
          var k = rand();
          while (br[k] !== "" + k) {
            k = rand();
          }
          if (br[k] === "" + k) {
            br[k] = mc;lock = false;
            $('#' + k).html(mc);
            turn = usr;
            cnt++;
          }
        }
      }
      //-----------cnt4 & all other cases(minimax)--------//
      else {
          var k = callmini();
          if (br[k] === "" + k) {
            br[k] = mc;
            $('#' + k).html(mc);cnt++;
            checkWin();
            turn = usr;lock = false;
          } else {
            checkWin();
          }
        }
  }
  //---------------callmini------------------//
  function callmini() {
    var pos = 0,
        val = -1000;
    console.log("cnt at callmini", cnt);
    var bestval = -1000;
    for (var i = 0; i < br.length; i++) {
      if (br[i] === "" + i) {
        br[i] = mc;
        cnt++;
        val = minimax(0, br, false);
        cnt--;
        br[i] = "" + i;
      }
      if (val > bestval) {
        pos = i;
        bestval = val;
      }
    }
    console.log("best move is at pos: " + pos + " and val:" + bestval);
    return pos;
  }
  //----------------minimax-----------------//
  function minimax(depth, board, isMax) {
    var score = check();
    if (score !== "N") {
      return score;
    }
    if (isMax) {
      //console.log("at max");
      var bestval = -1000;
      for (var i = 0; i < br.length; i++) {
        if (br[i] === "" + i) {
          br[i] = mc;cnt++;
          bestval = Math.max(bestval, minimax(depth + 1, br, false));
          br[i] = "" + i;cnt--;
        }
      }
      return bestval;
    } else {
      //console.log("at min");
      var bestval = 1000;
      for (var i = 0; i < br.length; i++) {
        if (br[i] === "" + i) {
          br[i] = usr;cnt++;
          bestval = Math.min(bestval, minimax(depth + 1, br, true));
          br[i] = "" + i;cnt--;
        }
      }
      return bestval;
    }
  }
  //-------------restart------------------//
  function restart() {
    clear();
    start();
  }
  //-------------------------------------//
});
//-------------jquery ready end------------------//