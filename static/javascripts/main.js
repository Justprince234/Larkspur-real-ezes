// ***********************************************************//

var listCountries = ['United Kingdom', 'USA', 'Germany', 'France', 'Italy', 'USA', 'Australia', 'Lesotho', 'Canada', 'Argentina', 'Saudi Arabia', 'Mexico', 'Kenya', 'Maldives', 'Venezuela', 'South Africa', 'Sweden', 'India', 'South Africa', 'Italy', 'Pakistan', 'United Kingdom', 'South Africa', 'Greece', 'Cuba', 'South Africa', 'Portugal', 'Austria', 'South Africa', 'Panama', 'USA', 'South Africa', 'Netherlands', 'Switzerland', 'Belgium', 'Israel', 'Cyprus'];
var listPlans = ['$500', '$1500', '$1000', '$10,000', '$2000', '$3000', '$4000', '$600', '$700', '$2500'];
interval = Math.floor(Math.random() * (40000 - 8000 + 1) + 8000);
var run = setInterval(request, interval);

// function request() {
//     clearInterval(run);
//     interval = Math.floor(Math.random() * (40000 - 8000 + 1) + 8000);
//     var country = listCountries[Math.floor(Math.random() * listCountries.length)];
//     var plan = listPlans[Math.floor(Math.random() * listPlans.length)];
//     var msg = 'Someone from <b>' + country + '</b> just bought a land <strong href="javascript:void(0);" onclick="javascript:void(0);">' + ' </strong>';
//     $(".mgm .txt").html(msg);
//     $(".mgm").stop(true).fadeIn(.5);
//     window.setTimeout(function() {
//         $(".mgm").stop(true).fadeOut(100);
//     }, 8000);
//     run = setInterval(request, interval);
// };



// *********************Animated Counters***************************************//

$(window).scroll(testScroll);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function testScroll() {
  if (isScrolledIntoView($(".numbers")) && !viewed) {
      viewed = true;
      $('.value').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 3000,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
    });
  }
}


