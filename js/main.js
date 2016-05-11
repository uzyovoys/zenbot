/**
 * Created by morfeusys on 11.05.16.
 */
(function($) {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
})(jQuery);