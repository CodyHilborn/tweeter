$(document).ready(function() {

  // >>> Change value of char counter using length of input.
  const $tweetText = $('#tweet-text');

  $($tweetText).on('input', function() {
    const $counter = ($(this).siblings().children('.counter'));
    $counter.val(140 - $(this).val().length);

  });

});