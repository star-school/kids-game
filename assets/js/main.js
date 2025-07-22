window.addEventListener('DOMContentLoaded', () => {
  console.log(window.location.pathname.split("/").pop());
  if (window.location.pathname.split("/").pop() === 'click.html') { new ClickAction; };
  window.addEventListener('load', () => { new Loading; });
});
document.querySelectorAll('img').forEach(img => {
  img.style.userSelect = "none";
  img.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });
});
// let theme1 = document.getElementById('theme1');
let select1 = document.getElementById('select1');
let select2 = document.getElementById('select2');
let select3 = document.getElementById('select3');
let imgTxtArray = [
  './assets/img/common/txt1.png',
  './assets/img/common/txt2.png',
  './assets/img/common/txt3.png',
  './assets/img/common/txt4.png',
  './assets/img/common/txt5.png'
];
let imgArray01 = [
  './assets/img/common/宝01.png',
  './assets/img/common/ふくろ01.png',
  './assets/img/common/ミミック01.png',
]
let imgArray02 = [
  './assets/img/common/宝02.png',
  './assets/img/common/ふくろ02.png',
  './assets/img/common/ミミック02.png',
]
let pointArry = [100, 50, 20];
let showTimeArray = [500, 1000, 1500, 2000, 2500];

class Loading {
  constructor() {
    this.body = document.querySelector('body');
    setTimeout(() => { this.body.classList.add('loadEnd') }, 1300);
  };
};
let random = Math.floor(Math.random() * 3)
// ダブルクリック練習2（お宝）
class ClickAction {
  constructor() {
    this.resultPoint = 0;
    this.resultRemaining = 0;
    this.txtImgBox = document.querySelector('.txtImgBox');
    this.txtImg = document.querySelector('.txtImgBox img');
    this.startBtn = document.querySelector('.start');
    this.selecBtnBox = document.querySelector('.selecBtnBox');
    this.selectBtn = document.querySelectorAll('.selectBtn');
    this.remainingNum = document.querySelector('.status1 .numberBox .number');
    this.remainingNum2 = document.querySelector('.status2 .numberBox .number');
    this.remaining = null;
    this.stageNum = 1;
    this.clear = 0;
    this.timeNum = 60;
    this.timer = null;
    this.plobrem = null;
    this.randNum = null;
    this.id = null
    this.arr = [];
    this.countUpFn = null;
    this.randImgNum = null;
    this.clickItem = document.querySelectorAll('.clickItem .imgWrap');
    this.clickItemImg = document.querySelectorAll('.clickItem .imgWrap img');
    this.getText = document.querySelectorAll('.clickItem .imgWrap getText');
    this.stage = document.querySelector('.stage');
    this.pointNum = document.querySelector('.status1 .pointNum');
    this.pointNum2 = document.querySelector('.status2 .pointNum');
    this.point = 0;
    this.showTime = 0;
    this.pointNum.textContent = this.point;
    this.pointNum2.textContent = this.point;
    this.randomFlag = false;
    this.eventFn = this.click.bind(this);
    this.time = document.querySelector(".time");
    this.time.innerHTML = this.timeNum;
    this.timer = this.timeNum;
    this.endFlag = false;
    this.stopTimeout1 = null;
    this.stopTimeout2 = null;
    this.stopTimeout3 = null;
    this.startBtn.addEventListener('click', (e) => {
      this.endFlag = false;
      e.currentTarget.disabled = true;
      this.txtImg.src = './assets/img/common/startTxt1.png';
      this.txtImgBox.classList.add('startShow');
      setTimeout(() => {
        this.txtImgBox.classList.remove('startShow');
        this.txtImg.src = "";
      }, 1000);
      setTimeout(() => {
        this.txtImg.src = './assets/img/common/startTxt2.png';
        this.txtImgBox.classList.add('startShow');
      }, 1200);
      setTimeout(() => {
        this.txtImgBox.classList.remove('startShow');
        this.txtImg.src = "";
      }, 2200);
      setTimeout(() => {
        this.randChara(5);
        this.countUp();
      }, 2200);
    });
  };
  countUp() {
    this.countUpFn = setInterval(() => {
      this.time.innerHTML = parseInt(this.time.innerHTML) - 1;
      this.timer--;
      if (this.timer <= 0) { this.timeEnd() };
    }, 1000);
  };
  stopCount() { clearInterval(this.countUpFn); };
  randChara(number) {
    for (let i = 0; i < this.clickItem.length; i++) {
      this.id = Math.floor(Math.random() * 3);
      this.clickItem[i].classList.remove('removeFlash');
      this.clickItem[i].disabled = false;
      this.clickItem[i].classList.remove('show');
      this.clickItem[i].dataset.point = this.id;
      this.clickItem[i].classList.remove('active');
      this.txtImgBox.classList.remove('show');
      this.clickItemImg[i].src = imgArray01[this.id];
    };
    this.arr = [];
    for (let i = 0; i < 25; i++) { this.arr.push(i) }
    var a = this.arr.length;
    //シャッフルアルゴリズム
    while (a) {
      var j = Math.floor(Math.random() * a);
      var t = this.arr[--a];
      this.arr[a] = this.arr[j];
      this.arr[j] = t;
    }
    this.showTime = Math.floor(Math.random() * 5)
    this.showTime = showTimeArray[this.showTime];
    console.log(this.showTime);
    select1.play();
    this.randNum = 1; //一個のみ表示
    // this.randNum = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < this.randNum; i++) {
      if (!this.endFlag) { this.clickItem[this.arr[i]].classList.add('show'); }
    };
    this.clickEvent();
    setTimeout(() => {
      this.stopTimeout1 =
        setTimeout(() => {
          if (this.timer !== 0) {
            for (let i = 0; i < this.clickItem.length; i++) {
              this.clickItem[i].classList.add('removeFlash');
              this.stopTimeout2 = setTimeout(() => {
                this.clickItem[i].classList.remove('removeFlash');
              }, 1000);
            };
            this.stopTimeout3 = setTimeout(() => {
              this.randChara();
            }, 1200);
          }
        }, this.showTime);
    }, 100);
  };
  timeEnd() {
    this.endFlag = true;
    this.removeEvent();
    this.stopCount();
    this.txtImg.src = imgTxtArray[4];
    this.txtImgBox.classList.add('show');
    for (let i = 0; i < this.clickItem.length; i++) {
      this.clickItem[i].classList.remove('show');
      this.clickItem[i].classList.remove('active');
      this.clickItem[i].disabled = false;
      this.clickItemImg[i].src = './assets/img/common/宝02.png';
    };
    setTimeout(() => {
      this.txtImgBox.classList.remove('show');
    }, 1000);
    setTimeout(() => {
      if (this.point > this.resultPoint) {
        this.txtImg.src = './assets/img/common/update.png';
        this.txtImgBox.classList.add('startShow');
        setTimeout(() => {
          this.txtImgBox.classList.remove('startShow');
          this.txtImg.src = "";
        }, 1000);
        this.resultPoint = this.point;
        this.pointNum2.textContent = this.resultPoint;
        this.resultRemaining = this.remaining;
        this.remainingNum2.textContent = this.resultRemaining;
      }
    }, 1500);
    setTimeout(() => {
      this.clear = 0;
      this.stageNum = 0;
      this.remaining = 0;
      this.startBtn.disabled = false;
      this.time.innerHTML = this.timeNum;
      this.timer = this.timeNum;
      this.stageNum = 1;
      this.remainingNum.textContent = 0;
      this.point = 0;
      this.pointNum.textContent = this.point;
    }, 3500);
  };

  clickEvent() {
    this.plobrem = document.querySelectorAll('.show');
    for (let i = 0; i < this.plobrem.length; i++) {
      this.plobrem[i].addEventListener('dblclick', this.eventFn, this);
    };
  };
  click(e) {
    clearTimeout(this.stopTimeout1);
    clearTimeout(this.stopTimeout2);
    clearTimeout(this.stopTimeout3);
    e.currentTarget.disabled = true;
    e.currentTarget.classList.add('active');
    e.currentTarget.firstElementChild.src = imgArray02[e.currentTarget.dataset.point];
    this.clear++;
    this.stageNum++;
    this.remaining++;
    this.remainingNum.textContent = this.remaining;
    if (pointArry.indexOf(pointArry[e.currentTarget.dataset.point]) === 2) {
      select3.play();
      this.point -= pointArry[e.currentTarget.dataset.point];
      e.currentTarget.lastElementChild.textContent = "-" + pointArry[e.currentTarget.dataset.point];
    } else {
      select2.play();
      this.point += pointArry[e.currentTarget.dataset.point];
      e.currentTarget.lastElementChild.textContent = "+" + pointArry[e.currentTarget.dataset.point];
    }
    this.pointNum.textContent = this.point;
    setTimeout(() => { this.randChara(); }, 500);
  };
  removeEvent() { document.removeEventListener('dblclick', this.eventFn); };
};