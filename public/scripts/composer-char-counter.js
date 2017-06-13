const maxLength = 140;

$(document).ready(() => {

  let tweetArea = $('.new-tweet').find('textarea');

  $(tweetArea).on('keyup', function () {
    let text = $(this).val().length;
    let charCount = maxLength - text;
    let counterRender = $(this).parent().find('.counter').html(charCount);

    if (charCount < 0) {
      $(counterRender).css('color', 'red');
    }
  });
})
