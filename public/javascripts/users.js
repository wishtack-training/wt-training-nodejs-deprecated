/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

(function () {

    $(document).ready(function () {

        var socket = io.connect(window.location.origin, {transports: ['websocket']});

        socket.on('user', function (user) {

            var userElement = $('<li>');
            var firstNameElement = $('<span class="wt-first-name">');
            var spaceElement = $('<span> </span>');
            var lastNameElement = $('<span class="wt-last-name">');

            firstNameElement.text(user.firstName);
            lastNameElement.text(user.lastName);

            userElement.append(firstNameElement);
            userElement.append(spaceElement);
            userElement.append(lastNameElement);

            $('ul').append(userElement);

        });

        socket.on('reset', function () {

            $('ul').empty();

        });

        $('form').submit(function (event) {

            var user = {
                firstName: $(event.target).find('input[name="firstName"]').val(),
                lastName: $(event.target).find('input[name="lastName"]').val()
            };

            event.preventDefault();

            $(event.target).trigger('reset');

            socket.emit('user', user);

        });

        $('#wt-reset-list').click(function () {

            socket.emit('reset');

        });

    });

})();
