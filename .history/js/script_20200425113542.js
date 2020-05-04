var mySwiper = new Swiper('.swiper-container');

var storyObj         = null;
var language         = null;

////////////////////////////
fetch("./json/config.json")
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    language = data.language;
    get_story_json(language);  
  })

//////////////////////////////////
function get_story_json(language){

  var json_name = null;
  
  if (language == "en"){
    json_name = "./json/story_en.json";
  } else if (language == "heb"){
    json_name = "./json/story_heb.json";
  }
  
  fetch(json_name)
  .then(function(res){
    return (res.json());
  })
  .then(function(data) {
    storyObj = data;
    load_pages();        
  })  
}

//////////////////////
function load_pages(){  
  var num_of_pages = storyObj.story.number_of_pages;

  for (var i=0;i<num_of_pages;i++){

    var img_src = storyObj.story.pages[i].image_url;
    var img_alt = 'page0';
    var text    = 'This is a text sample.'

  }

}

var img_src = './Images/Intro_with_play_btn.jpg';
var img_alt = 'page0';
var text    = 'This is a text sample.'

var str = '<div class="content_area">';
str += '<img src="' + img_src + '" alt="' + img_alt + '">';
str += '<div class="box">';
str += '<div class="story_text">' + text + '</div>';
str += '</div></div></div>';

mySwiper.appendSlide('<div class="swiper-slide">' + str + '</div>');