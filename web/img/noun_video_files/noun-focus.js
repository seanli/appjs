// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var newQuickview;
    $('body').on('click', '.focus-link', function(e) {
      var $this, body, datadesigner, datafocusElement, dataicon, datalicense, datanoun, focus, focusElement, getURL, getfocus, geticon, getlang, getlicense, getnext, href, license, number;
      e.preventDefault();
      $this = $(this);
      href = $this.attr('href');
      focus = href.split('/');
      if ($this.data('icon')) {
        dataicon = $this.data('icon');
      } else {
        dataicon = focus[2];
      }
      if ($this.data('noun')) {
        datanoun = $this.data('noun');
      } else {
        datanoun = focus[3];
      }
      if ($this.data('designer')) {
        datadesigner = $this.data('designer');
      }
      if ($this.data('license')) {
        license = $this.data('license');
        if (/BY/i.test(license)) {
          datalicense = 'CCBY';
        } else {
          datalicense = 'PD';
        }
      }
      if ($this.data('focus')) {
        datafocusElement = $this.data('focus');
      }
      body = $('body');
      focusElement = $('#' + focus[1]);
      number = window.location.hash;
      if (focusElement.length > 0) {
        return focusElement.css([
          {
            'z-index': '999'
          }
        ]);
      } else {
        getlang = '/' + $('html').attr('lang');
        getfocus = 'q=' + focus[1];
        geticon = '&i=' + dataicon;
        getlicense = '&dwn=' + datalicense;
        getnext = '&next=/noun/' + datanoun + '/#icon-No' + dataicon;
        getURL = getlang + '/focus/?' + getfocus + geticon + getlicense + getnext;
        return $.get(getURL, function(html) {
          var closeFocus, groupContainer, parentContainer, parentContainerID;
          if ($('#agreement').length > 0) {
            $('#agreement').remove();
          }
          body.addClass('focus-active').prepend(html);
          if (focus[1] === 'quickview') {
            $('#quickview #icon-box').animate({
              'opacity': 1
            });
            groupContainer = $this.parents('ul.icons');
            parentContainer = groupContainer.parents('section');
            parentContainerID = parentContainer.attr('id');
            $('#quickview').addClass(parentContainerID);
          }
          closeFocus = function() {
            $('#' + focus[1] + ', #agreement.focus').fadeOut(100).queue(function() {
              $('#' + focus[1] + ', #agreement.focus').remove();
              if ($('.focus').length > 0) {

              } else {
                return body.removeClass('focus-active');
              }
            });
            return e.preventDefault();
          };
          $(document).on('click', '.focus .close a', function(e) {
            e.preventDefault();
            return closeFocus();
          });
          $('body').keyup(function(e) {
            if (e.keyCode === 27) {
              closeFocus();
            }
            if (focus[1] === 'quickview') {
              if (e.keyCode === 39) {
                $('#quickview nav a.right').click();
                e.preventDefault();
              }
              if (e.keyCode === 37) {
                $('#quickview nav a.left').click();
                return e.preventDefault();
              }
            }
          });
          $('#buy .button').on("click", function() {
            return _gaq.push(['_trackEvent', 'Sales', 'Buy-Attempt-Focus-Page', 'Buy attempt on a focus page']);
          });
          if (focus[1] === 'agreement') {
            $('.button.activate-confirmation').on('click', function() {
              var downloadAppend;
              closeFocus();
              downloadAppend = '<a id="download-complete" class="confirmation" href="#" data-icon="{{ just_purchased}}"><span class="icon">{% include "embedded_icons/v3_icons/cloud-complete.html" %}</span><h1>Downloading</h1></a>';
              _gaq.push(['_trackEvent', 'Download', 'File-Transaction-I-Agree', 'File Transaction']);
              _gaq.push(['_trackEvent', 'Download', 'I-Agree', 'I Agree Button Click']);
              return $('body').append(downloadAppend).delay(1000).queue(function() {
                return $('#download-complete').hide();
              });
            });
          }
          $(document).on('click', '#quickview.' + parentContainerID + ' #icon-box nav a', function(e) {
            return newQuickview($(this), groupContainer, parentContainer, e);
          });
          $('#activelogin .option').click(function(e) {
            var section;
            e.stopPropagation();
            e.preventDefault();
            section = $(this).parent('li').attr('class');
            if ($('#activelogin').hasClass(section)) {
              $('#activelogin').removeClass(section);
            } else {
              $('#activelogin').addClass(section);
            }
            if (section === 'login') {
              $('#activelogin').removeClass('signup');
              return $('#login-form #id_username').focus();
            } else if (section === 'signup') {
              $('#activelogin').removeClass('login');
              return $('#signup-form #id_username').focus();
            }
          });
          $('#activelogin input[name=username]').focus(function() {
            return $(this).removeClass('taken available');
          });
          return $('#activelogin input[name=username]').blur(function() {
            var username;
            $this = $(this);
            username = $this.val();
            if (username.length > 2) {
              return $.get('/register/availableusername/' + username + '/', function(html) {
                if (html.username === 'taken') {
                  $this.addClass('taken');
                  return $this.removeClass('available');
                } else if (html.username === 'available') {
                  $this.addClass('available');
                  return $this.removeClass('taken');
                }
              });
            } else {
              return $this.removeClass('taken available');
            }
          });
        });
      }
    });
    newQuickview = function(newIcon, groupContainer, parentContainer, e) {
      var currentID, currentIndex, direction, groupCount, newID;
      e.preventDefault();
      direction = newIcon.attr('class');
      currentID = $('#icon-box .svg').data('id');
      groupCount = groupContainer.find('li.icon:not(.denied):not(.awaiting-moderation)').length;
      currentIndex = groupContainer.find('li#icon-' + currentID + ':not(.denied):not(.awaiting-moderation)').index() + 1;
      if (direction === 'left') {
        $('#quickview .svg').stop().animate({
          'margin-left': '500px'
        });
        if (currentIndex <= 1) {
          newID = groupContainer.find('li.icon:last').attr('id');
        } else {
          newID = groupContainer.find('li#icon-' + currentID).prev('li').attr('id');
        }
      } else {
        $('#quickview .svg').stop().animate({
          'margin-left': '-500px'
        });
        if (currentIndex >= groupCount) {
          newID = groupContainer.find('li.icon:not(.denied):not(.awaiting-moderation):first').attr('id');
        } else {
          newID = groupContainer.find('li#icon-' + currentID).next('li').attr('id');
        }
      }
      $('#quickview .meta-box').stop().animate({
        'top': 420
      });
      $('#quickview #icon-box').stop().animate({
        'opacity': 0
      });
      if (newID) {
        newID = newID.replace('icon-', '');
      }
      return setTimeout(function() {
        var lang;
        lang = '/' + $('html').attr('lang');
        return $.get(lang + '/focus/?q=quickview&amp;i=' + newID, function(html) {
          $('#quickview').remove();
          $('body').prepend(html);
          $('#quickview').addClass(parentContainer.attr('id'));
          $('#quickview #icon-box').stop().animate({
            'opacity': 1
          });
          return $('#quickview .meta-box').stop().animate({
            'top': 500
          });
        });
      }, 300);
    };
    $(document).on('click', '.cancel', function(e) {
      e.preventDefault();
      return $('#activelogin').removeClass('login signup');
    });
    return $('body').on('click', '#do-i-have-an-account', function(e) {
      var fieldsets, form;
      e.preventDefault();
      $('#activelogin').removeClass('login signup');
      form = $(this).parent('div').find('form');
      fieldsets = form.find('fieldset');
      form.css({
        'z-index': 10,
        '-webkit-transform': 'scale(1)',
        '-moz-transform': 'scale(1)',
        '-o-transform': 'scale(1)',
        'transform': 'scale(1)',
        'opacity': 1
      });
      $('#not-sure-overlay').css({
        'display': 'block'
      });
      form.find('input').focus();
      form.find('input').bind('keyup', function(e) {
        var email, re;
        email = $(this).val();
        re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
          $.get('/ajax/checkemail/' + email + '/', function(json) {
            if (json !== 'No user') {
              return $.each(json, function(index, accounts) {
                var button, username;
                username = json[index].fields.username;
                if ($('#user-' + username).length === 0) {
                  button = '<a id="user-' + username + '"class="button" href="#">Log in as <span class="username">' + username + '</span></a></br>';
                  fieldsets.removeClass('visible');
                  $('.found-you').addClass('visible');
                  $('.found-you .buttons').append(button);
                  $('.found-you .button').on('click', function(e) {
                    var user;
                    user = $(this).attr('id').replace('user-', '');
                    $('form .close').click();
                    $('#activelogin').addClass('login');
                    $('#activelogin').find('#id_username').val(user);
                    return $('#activelogin').find('#id_password').focus();
                  });
                }
                if (e.keyCode === 13) {
                  return form.find('.found-you .buttons a:first-child').click();
                }
              });
            }
          }).error(function() {
            fieldsets.removeClass('visible');
            $('.didnt-find-you').addClass('visible');
            if (e.keyCode === 13) {
              return form.find('.didnt-find-you .button').click();
            }
          });
        } else {
          fieldsets.removeClass('visible');
          $('.default').addClass('visible');
          $('.found-you .buttons a').remove();
          $('.found-you .buttons br').remove();
        }
        return $('.didnt-find-you .button').on('click', function(e) {
          e.preventDefault();
          email = email;
          $('form .close').click();
          $('#activelogin').addClass('signup');
          $('#signup-form').find('#id_email').val(email);
          return $('#signup-form').find('#id_username').focus();
        });
      });
      $('.not-sure .close').click(function(e) {
        e.preventDefault();
        $(this).parent('form').css({
          'z-index': -10,
          '-webkit-transform': 'scale(.001)',
          '-moz-transform': 'scale(.001)',
          '-o-transform': 'scale(.001)',
          'transform': 'scale(.001)',
          'opacity': 0
        });
        return $('#not-sure-overlay').css({
          'display': 'none'
        });
      });
      $('#not-sure-overlay').click(function(e) {
        return $('.not-sure form .close').click();
      });
      return $('.not-sure .reset').click(function(e) {
        return $('.not-sure form input').val('').focus();
      });
    });
  });

}).call(this);