$(document).ready(function() {

  // >>> Change value of char counter using length of input.
  const $tweetText = $('#tweet-text');
  const $counter = $('.counter');

  $($tweetText).on('input', function() {
    $counter.val(140 - $(this).val().length);
  });



});