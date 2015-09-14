(function () {
  var wdscript = 'https://cdn.wilddog.com/js/client/current/wilddog.js';
  var api = 'https://realtime-comments.wilddogio.com/';

  window.RLComments = {
    pageId: null,
    dataRef: null,
    container: document.body,
    comments: {},
    list: null,
    init: function (id, container) {
      var self = RLComments;
      this.pageId = id;
      if (container) {
        this.container = container;
      }
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.onload = function () {
        var path = api + 'comments/' + id;
        console.log(path);
        self.dataRef = new Wilddog(path);
        self.bind();
      };
      script.src = wdscript;
      document.head.appendChild(script);
    },
    bind: function () {
      var self = RLComments;
      //this.dataRef.orderByChild('time').once('value', function (ss) {
      //  console.log('on value ...', ss.val());
      //  self.comments = ss.val();
      //});
      self.setStyle();
      self.setHtml();
      self.dataRef.on('child_added', function (ss2) {
        console.log('on child_added', ss2.val());
        var cmt = ss2.val();
        var li = document.createElement('li');
        li.innerHTML = '<span class="rl-cmts-user-name">' + cmt.username + ' : </span>' + cmt.content + ' <span class="rl-cmts-timestamp">' + (new Date(cmt.time)).toLocaleString() + '</span>'
        self.list.appendChild(li);
        setTimeout(function(){
          li.classList.add('shown');
        }, 160);
      });
    },
    setStyle: function() {
      var style = '.rl-cmts-list {' +
          'font-size:15px;}' +
          '.rl-cmts-list li {' +
          'opacity:0;' +
          '-webkit-transition: opactiy 0.4s;' +
          'transition:opacity 0.4s}' +
          '.rl-cmts-list li.shown {' +
          'opacity:1}' +
          '.rl-cmts-box input, .rl-cmts-box textarea{' +
          'font-size:14px;' +
          'padding: 2px 5px;' +
          'border:1px solid #ccc}' +
          '.rl-cmts-box textarea {' +
          'height:70px;' +
          'width:100%;' +
          'padding-bottom:38px;}' +
          '.rl-cmts-box {' +
          'position:relative;}' +
          '#rlCmtsSubmit {' +
          'position:absolute;' +
          'right:18px;' +
          'bottom:13px;' +
          'box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);' +
          'border:0 none;' +
          'font-size:14px;' +
          'color:#fff;' +
          'border-radius:3px;' +
          'outline:0 none;' +
          'background:#4183c4;' +
          'padding:0 6px;' +
          'min-width:66px;' +
          'height:30px;' +
          'line-height:30px;' +
          '-webkit-transition:box-shadow 0.3s;' +
          'transition:box-shadow 0.3s}' +
          '#rlCmtsSubmit:hover {' +
          'box-shadow:rgba(0, 0, 0, 0.4) 0px 4px 8px 0px;}' +
          '.rl-cmts-timestamp {' +
          'display:block;' +
          'font-size:12px;' +
          'color:#888;}' +
          '.rl-cmts-user-name {' +
          'color:#4183c4;}';
      var styleEle = document.createElement('style');
      styleEle.textContent = style;
      document.head.appendChild(styleEle);
    },
    setHtml: function () {
      var self = RLComments;

      self.list = document.createElement('ul');
      self.list.className = 'rl-cmts-list';
      var html = '';
      for (var k in this.comments) {
        if (!this.comments.hasOwnProperty(k)) {
          continue;
        }
        var cmt = this.comments[k];
        html += '<li><span class="rl-cmts-user-name">' + cmt.username + '</span> : ' + cmt.content + ' <span class="rl-cmts-timestamp">' + (new Date(cmt.time)).toLocaleString() + '</span></li>';
      }
      self.list.innerHTML = html;
      this.container.appendChild(self.list);

      var box = document.createElement('div');
      box.className = 'rl-cmts-box';

      box.innerHTML = '<p><input placeholder="昵称" type="text" id="rlCmtsInputUsername"/></p>' +
          '<p><textarea placeholder="评论..." id="rlCmtsInputContent"></textarea></p>' +
          '<p><button id="rlCmtsSubmit">提交</button></p>';

      this.container.appendChild(box);

      var usernameInput = document.getElementById('rlCmtsInputUsername'),
          contentInput = document.getElementById('rlCmtsInputContent'),
          submitBtn = document.getElementById('rlCmtsSubmit');

      if (localStorage.username) {
        usernameInput.value = localStorage.username;
      }

      submitBtn.addEventListener('click', function () {
        var userName = usernameInput.value.trim();
        var content = contentInput.value;
        if (userName.length > 100) {
          return alert('用户名不能超过100个字符');
        }
        if (userName == '') {
          return alert('用户名不能为空');
        }
        if (content.length > 1000) {
          return alert('评论内容不能超过1000个字符');
        }
        if (content.trim() == '') {
          return alert('评论内容不能为空');
        }
        self.dataRef.push({
          username: userName,
          content: content,
          time: Date.now()
        });
        localStorage.username = userName;
        contentInput.value = '';
      });
    }
  };
})();