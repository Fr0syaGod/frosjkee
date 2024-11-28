let value_up = 0;
function update_score(val_end)
{
    if(value_up === 1) return;
    var numb_start = $("#drift-score").text(); // Получаем начальное число
    $({numberValue: numb_start}).animate({numberValue: val_end}, {

        duration: 350, // Продолжительность анимации, где 500 = 0,5 одной секунды, то есть 500 миллисекунд
        easing: "linear",

        step: function(val) {

            $("#drift-score").html(Math.ceil(val)); // Блок, где необходимо сделать анимацию

        }

    });
    if(val_end % 500 === 0) {
        value_up = 1;
        $("#drift-score").css("transform", "scale(1.2)");

        setTimeout(function () {
            $("#drift-score").css("transform", "scale(1.0)");
            value_up = 0;
        }, 500);
        // $("#drift-score").animate({
        //     // duration: 00,
        //     easing: "linear",
        //     transform: "scaleX(1.5)"
        // })
        // return;
    }
}
cef.on("show-drift", () => {
    document.getElementById("drift-score").innerHTML = '0';
    document.getElementById("drift-block").style = "display: flex";
});
cef.on("drift-score", (score) => {
    update_score(score);
    // document.getElementById("drift-score").innerHTML = `${score}`;
});
cef.on("drift-combo", (combo) => {
    document.getElementById("drift-combo").innerHTML=`x${combo}`;
});
cef.on("hide-drift", () => {
    document.getElementById("drift-block").style = "display: none";
});