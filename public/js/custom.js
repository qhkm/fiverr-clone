$(function () {

    var badge = parseInt($('.badge').html());
    console.log(badge);

    $('#promocodeButton').on('click', function () {
        var input = $('#code').val();
        if (input === '') {
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: '/promocode',
                data: {
                    promocode: input
                },
                success: function (data) {
                    if (data === 0) {
                        $('#promocodeResponse').html("Code doesnt exist");
                    } else {
                        $('#promocodeButton').html('Applied');
                        $('#promocodeButton').prop('disabled', true);
                        $('#promocodeResponse').html('Successfully applied the code');
                        $('#totalPrice').html(data);
                    }
                }
            })
        }
    })

    $('#add_to_cart').on('click', function () {
        var gig_id = $('#gig_id').val();

        if (gig_id === '') {
            return false;
        } else {
            $.ajax({
                type: 'POST',
                url: '/add-to-cart',
                data: {
                    gig_id: gig_id
                },
                success: function (data) {
                    console.log(data);
                    badge += 1;
                    $('.badge').html(badge);
                    $('#code')
                        .addClass('alert alert-success')
                        .html(data);
                },
                error: function (xhr, testStatus, errorThrown) {
                    var res = $.parseJSON(xhr.responseText);
                }
            });
        }
    });
});