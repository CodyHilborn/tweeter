///////////////////////////////////////////////////////////////////////
//                    CHARACTER COUNT FUNCTIONALITY
///////////////////////////////////////////////////////////////////////

$(document).ready(function() {

  const $tweetText = $('#tweet-text');

  $($tweetText).on('input', function() {
    const $counter = ($(this).siblings().children('.counter'));
    $counter.val(140 - $(this).val().length);

    if ($counter.val() < 0) {
      $counter.addClass('number-neg');
    } else {
      $counter.removeClass('number-neg');
    }

  });

});