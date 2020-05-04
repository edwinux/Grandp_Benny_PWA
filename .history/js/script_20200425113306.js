var mySwiper = new Swiper('.swiper-container');

var storyObj         = null;
var language         = null;



var img_src = './Images/Intro_with_play_btn.jpg';
var img_alt = 'page0';
var text    = 'This is a text sample.'

var str = '<div class="content_area">';
str += '<img src="' + img_src + '" alt="' + img_alt + '">';
str += '<div class="box">';
str += '<div class="story_text">' + text + '</div>';
str += '</div></div></div>';

mySwiper.appendSlide('<div class="swiper-slide">' + str + '</div>');