const createTweetElement = (tweetData) => {
  //this converts the date to how many hours ago the tweet was made. It rounds down the number of hours.
  const created = new Date(tweetData.created_at);
  const today = Date.now();
  const timeDiff = Math.abs(today - created.getTime());
  const diffHours = Math.ceil(timeDiff / (1000 * 3600));

  return $(`<article class = "tweets">
    <header>
      <div class="header-left">
        <img class="avatar" src="${tweetData.user.avatars.small}" alt="Twitter picture" height="42" width="42">
        <span class="author">${tweetData.user.name}</span>
      </div>
      <span class="username">${tweetData.user.handle}</span>
    </header>
    <section>
      <p> ${tweetData.content.text} </p>
    </section>
    <footer>
      <span class="date">${diffHours} hours ago  </span>
      <span class="icons">
        <i name="flag" class="fa fa-flag fa-lg" aria-hidden="true"></i>
        <i name="retweet" class="fa fa-retweet fa-lg" aria-hidden="true"></i>
        <i name="heart" class="fa fa-heart fa-lg" aria-hidden="true"></i>
      </span>
    </footer>
  </article>`);
};

function renderTweets(tweets) {
  $('#tweets-container').children().remove();
  tweets.forEach (function (tweet) {
    var $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  });
}

function loadTweets () {
  //A spinner shows when the tweets are loading on the page. CSS details are inside tweets.css stylesheet.
  $('#mySpinner').addClass('spinner');
  $.get({
    url: '/tweets',
    success: (data) => {
      $('#mySpinner').removeClass('spinner');
      renderTweets(data.reverse());
    }
  })
}

// function login () {
//   let templateVars = {
//       user: users[req.session.user_id]
//     }
//   $.get({
//     url: '/login',
//     success: (data) => {
//       res.render(login);
//     }
//   });
// }

$(document).ready(() => {
  $('.new-tweet').hide();
  $('#nav-bar .compose').click(function() {
    $('.new-tweet').slideToggle();
    $('.tweettext').focus();
  })

  $('.new-tweet form').on('submit', function (event) {
    //"this" is form info
    let array = $(this).serializeArray();

    function objectifyForm(formArray) {
      var obj = {};

      for (var i = 0; i < formArray.length; i++){
        obj[formArray[i]['name']] = formArray[i]['value'];
      }
      return obj;
    }
    let data = objectifyForm(array);

    event.preventDefault();

    if (!$(".new-tweet textarea").val().length) {
      alert("Please enter more characters");
    } else if ($(".new-tweet textarea").val().length > 140) {
      alert("Please reduce text to 140 characters or less.");
    } else {
      $.post({
        url: '/tweets',
        data: data,
      })
      .then(loadTweets);

      //after the new tweet is submitted, the text area is cleared and the counter is reset to 140.
      $(".new-tweet textarea").val("");
      $(".counter").html(140);
    }
  });
  loadTweets();
});
