/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//when have time: work on converting created_at from date/time to days/hours/minutes ago/now
const createTweetElement = (tweetData) => {
  const date = new Date(tweetData.created_at);
  return $(`<article class = "tweets">
    <header>
      <img class="avatar" src="${tweetData.user.avatars.small}" alt="Twitter picture" height="42" width="42">
      <span class="author">${tweetData.user.name}</span>
      <span class="username">: ${tweetData.user.handle}</span>
    </header>
    <section>
      <p> ${tweetData.content.text} </p>
    </section>
    <footer>
      <span class="date">${date.toLocaleString()}</span>
      <span class="icons">
        <i class="fa fa-flag fa-lg" aria-hidden="true"></i>
        <i class="fa fa-retweet fa-lg" aria-hidden="true"></i>
        <i class="fa fa-heart fa-lg" aria-hidden="true"></i>
      </span>
    </footer>
  </article>`);
};

function renderTweets(tweets) {
  tweets.forEach (function (tweet) {
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
}

function loadTweets () {
  //GET request to /tweets
  $.get({
    url: '/tweets',
    // success: response renderTweets()
    success: (data) => {
      renderTweets(data.reverse());
    }
  })
}

$(document).ready(() => {
  $('.new-tweet form').on('submit', function (event) {
    let array = $(this).serializeArray();

    function objectifyForm(formArray) {
      var obj = {};

      for (var i = 0; i < formArray.length; i++){
        obj[formArray[i]['name']] = formArray[i]['value'];
      }
      return obj;
    }
    let data = objectifyForm(array);
    console.log(data);
    event.preventDefault();
    $.post({
      url: '/tweets',
      data: data
    });

    // $.ajax({
    //   url: "/tweets",
    //   method: "POST",
    //   data: $(this).serialize()
    // })
  });
  // renderTweets(data);
  loadTweets();
});
