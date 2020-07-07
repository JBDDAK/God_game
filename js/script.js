//반복
var cnt = 0
var time = 0;
var key = new Array()
var score;
var game = 0;
function left_rd() { return left = Math.floor(Math.random() * 1350); }
function top_rd() { return top = Math.floor(Math.random() * 600) + 50; }
function r_rd() { return r = Math.floor(Math.random() * 256); }
function g_rd() { return g = Math.floor(Math.random() * 256); }
function b_rd() { return b = Math.floor(Math.random() * 256); }
$(document).ready(rank_bord())
function box(a) {
    $(`#${a}`).css({ 'left': left_rd, 'top': top_rd() })
    $(`#${a}`).css('background', `rgb(${r_rd()},${g_rd()},${b_rd()})`)
    console.log(`.${a}`)
}

function spawn_box() {
    for (var i = 1; i <= 10; i++) {
        $("body").append(`<div id='box_${i}' class="box" draggable="true" ondragstart="dragstart(event)"></div>`);
        box(`box_${i}`)
        console.log('asdf')
    }
}

function start() {
    $('.start_btn').css('display', 'none')
    $('.coin_box').css('display', 'block')
    $('#result').css('display', 'none')
    $('h2').css('display', 'none')
    setInterval(() => {
        time += 0.01
    }, 10);
    spawn_box()
    game = 1
}


$(document).keypress(function (event) {
    console.log(event.keyCode);
    if (game == 1) {
        if (event.keyCode == 32) {
            if (cnt == 10) {
                score = time
                end_game()
            }
            else {
                alert(`쓰레기를 ${cnt}개만 치우셨군요`)
                window.location.reload()
            }
        }
    }
})

function end_game() {
    game = 0
    alert(score.toFixed(2) + "초")
    $('.end_display').css('display', 'block')
    $('#result').css('display', 'block')
    $('h2').css('display', 'block')
    $('.restart').css('display', 'block')
    $('.coin_box').css('display', 'none')
    rank_bord()
}


function dragstart(e) {
    e.dataTransfer.setData("text", e.target.id)
}
function dragover(e) {
    e.preventDefault()
}

function drop(e) {
    var data = e.dataTransfer.getData("text")
    $(`#${data}`).remove()
    cnt++
}


function upload() {
    var name_input = document.getElementById("name_input")
    localStorage.setItem(name_input.value, score.toFixed(2))
    SortLocalStorage()
    alert("등록 완료!")
    window.location.reload()
}

function rank_bord() {
    SortLocalStorage()
    document.getElementById("result").innerHTML = "";
    if (localStorage.length <= 0) {
        document.getElementById("result").innerHTML = "<p class='rank'>지금 너가하면 1등!</p>"
    } else {
        for (var i = 0; i < localStorage.length; i++) {
            if (i == 5) break;
            document.getElementById("result").innerHTML += "<p class='rank'>" + key[i] + " : " + localStorage.getItem(key[i]) + "초</p>" + "<br>"
        }
    }

}

function SortLocalStorage() {
    var key_list = new Array()
    var rank_list = new Array()
    var rank_list_c = new Array()

    for (var i = 0; i < localStorage.length; i++) {
        key_list.push(localStorage.key(i))
        console.log(typeof (parseFloat(localStorage.getItem(localStorage.key(i)))))
        rank_list.push(parseFloat(localStorage.getItem(localStorage.key(i))))
        rank_list_c.push(parseFloat(localStorage.getItem(localStorage.key(i))))

    }
    for (var i = 0; i < rank_list_c.length; i++) {
        console.log(typeof (rank_list_c[i]))
    }
    rank_list_c.sort(function (a, b) { return a - b })
    console.log(rank_list_c)
    for (var i = 0; i < localStorage.length; i++) {
        for (var j = 0; j < localStorage.length; j++) {
            if (rank_list[j] == rank_list_c[i]) {
                key.push(key_list[j])
                break;
            }
        }
    }
}
