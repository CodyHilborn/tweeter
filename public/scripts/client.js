/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  ///////////////////////////////////////////////////////////////////////////////////////////
  //               ESCAPE FUNCTION FOR XSS PROTECTION
  ///////////////////////////////////////////////////////////////////////////////////////////

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  ///////////////////////////////////////////////////////////////////////////////////////////
  //               TWEET ELEMENT CREATOR & RENDER FUNCTIONS
  ///////////////////////////////////////////////////////////////////////////////////////////

  // >>> CREATE INDIVIDUAL TWEET ELEMENT FROM DB <<<
  const createTweetElement = function(tweetObj) {
    const $tweetElement = `
      <article class="article-tweet">
        <header>
          <span class="user-info">
            <img src="${tweetObj.user.avatars}"/>
            <p>${tweetObj.user.name}</p>
          </span>
          <span class="user-handle">${tweetObj.user.handle}</span>
        </header>
        <p class="tweet-content">${escape(tweetObj.content.text)}</p>
        <footer>
          <span>${timeago.format(tweetObj.created_at)}</span>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>
      `;

    return $tweetElement;
  };


  // >>> LOOP THROUGH DATABASE, APPEND EACH ELEMENT TO TWEET CONTAINER
  const renderTweets = function(tweetArr) {
    for (const tweetObj of tweetArr) {
      let result = createTweetElement(tweetObj);
      $('#tweet-container').prepend(result);
    }
  };


  ///////////////////////////////////////////////////////////////////////////////////////////
  //               NEW TWEET EVENT LISTENER & FORM VALIDATION
  ///////////////////////////////////////////////////////////////////////////////////////////

  // >>> EVENT LISTENER FOR NEW TWEET FORM SUBMISSION <<<
  $('.new-tweet-form').submit(function(event) {
    event.preventDefault();
    const $formInput = $(this).serialize();


    // >>> FORM VALIDATION <<<

    // Determine length of form input.
    const $tweetLength = $('#tweet-text').val().length;
    // Access error class for new tweet.
    const $newTweetError = $('.new-tweet-error');

    // Hide error message.
    $newTweetError.slideUp('fast');

    // If text field is empty, render error message and slide down.
    if ($tweetLength <= 0) {
      const $errorMsg = $(`
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h4>Tweet field empty! Please type something before you submit.</h4>
        <i class="fa-solid fa-triangle-exclamation"></i>
        `);

      $newTweetError.html($errorMsg).slideDown('fast');

      // If input is over char count, render error message and slide down.
    } else if ($tweetLength > 140) {
      const $errorMsg = $(`
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h4>You are over the character limit! Please use less words.</h4>
        <i class="fa-solid fa-triangle-exclamation"></i>
        `);

      $newTweetError.html($errorMsg).slideDown('fast');

      // If all checks are passed: clear form, reset counter, & hide error message.
    } else {
      $.post('/tweets', $formInput, () => {

        $('#tweet-text').val('');
        $(".counter").val("140");
        $newTweetError.slideUp('fast');

        loadTweets();

        // If there's a server issue on submit, render relevant error message.
      }).fail(function() {
        const $errorMsg = $(`
          <i class="fa-solid fa-triangle-exclamation"></i>
          <h4>Something went wrong in the server.</h4>
          <i class="fa-solid fa-triangle-exclamation"></i>
          `);

        $newTweetError.html($errorMsg).slideDown('fast');
      });
    }
  });


  ///////////////////////////////////////////////////////////////////////////////////////////
  //               LOAD TWEETS FUNCTION W/ GET REQUEST TO DB
  ///////////////////////////////////////////////////////////////////////////////////////////

  // >>> GET REQUEST TO LOAD TWEETS FROM DATABASE <<<
  const loadTweets = function() {
    $.get('http://localhost:8080/tweets', (data) => {
      $('#tweet-container').empty();
      renderTweets(data);
    });
  };

  loadTweets();

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
});
