/* Rating Initialization
$(document).ready(function() {
    $('#rateMe1').mdbRate();
});
*/


//easy function

function stars(n) {
    for (let i = 0; i <= n; i++) {
        let style = "";
        for (let j = 0; j < i; j++)
            style += "*";
    }

}