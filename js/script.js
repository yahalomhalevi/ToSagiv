$(document).ready(function () {
    $('#car-form').on('submit', function (e) {
        e.preventDefault();
        const carNumber = $('#car-number').val().trim();
        $('#result').html('<div class="text-center mt-3">טוען מידע..</div>');

        setTimeout(() => {
            $('#result').html('<div class="alert alert-info"> כאן יופיעו פרטי הרכב עבור: ' + carNumber + '</div>');
        }, 1000);
    });
});



