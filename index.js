System.register(["./application.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;

  function topLevelImport(url) {
    return System["import"](url);
  }

  return {
    setters: [
      function (_applicationJs) {
        Application = _applicationJs.Application;
      },
    ],
    execute: function () {
      canvas = document.getElementById("GameCanvas");
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      topLevelImport("cc")
        .then(function (engine) {
          return application.init(engine);
        })
        .then(function () {
          return application.start();
        })
        ["catch"](function (err) {
          console.error(err);
        });
    },
  };
});

const adParams = {
  version: "v202412", // 您的APP版本 ，如果没有请留空
  TG: { type: "noSDK", FN: null }, // 如果是TMA小程序必填，web应用请不要给这个KEY
};

// 创建一个adInfo对象
const adInfo = {
  zoneId: 261, 
  publisherId: 273,
  eventId: 0, // 预留参数
};

// 创建一个userInfo对象，无论用户有没有登录您的应用，如下参数都得传到SDK。
const userInfo = {
  // 请为您的最终用户添加合理的用户 ID
  // 否则，OpenAD统计可能不准确
  // 这可能会影响你的动机
  userId: "", // user ID ，如果没有请留空
  firstName: "", // firstName 或 userId ，如果没有请留空
  lastName: "", // lastName 或 userId ，如果没有请留空
  userName: "", // username 或 userId ，如果没有请留空
};

const callbackFunc = {
  // 表示从OpenAD平台加载广告资源，如果发布者槽位/区域没有要加载的资源，将返回false
  adResourceLoad: (e) => {
    // 'step1', e = ture / false
  },
  // 表示互动广告正在打开
  adOpening: (e) => {
    // 'step2', e = ture / false
  },
  // 表示互动广告已打开
  adOpened: (e) => {
    // 'step3',  e = ture / false
  },
  // 表示互动广告任务完成，该任务由流量主定义
  adTaskFinished: (e) => {
    // 'step5',  e = ture / false
  },
  // 表示互动广告正在关闭
  adClosing: (e) => {
    // 'step6', e = ture / false
  },
  // 表示互动广告已关闭
  adClosed: (e) => {
    // 'step7', e = viewAD / click
    // 如果你想根据不同的关闭状态来执行不同的步骤，请把代码写在这里
  },
  // 表示已点击，并跳转
  adClick: (e) => {
    // 'step4', e = ture / false
  },
};

window.openADJsSDK.interactive
  .init({ adParams, adInfo, userInfo })
  .then((res) => {
    console.log(res);
    if (res.code === 0) {
      window.openADJsSDK.interactive.getRender({ adInfo, cb: callbackFunc });
    } else {
      console.log("fail");
    }
  });
