window.onload = function() {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; ++i) {
      let messages = elements[i].getAttribute('data-type');
      let speed    = elements[i].getAttribute('data-speed');
      let period   = elements[i].getAttribute('data-period');
      if (messages) new Typewriter(elements[i], JSON.parse(messages), speed, period);
    }
  };
  
  function Typewriter(el, messages, speed, period) {
    this.el = el;
    this.messages = messages;
    this.speed  = parseInt(speed, 10)  || 200;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.loops = 0;
    this.isClearing = false;
    this.tick();
  }
  
  Typewriter.prototype.tick = function() {
    let msg  = this.messages[this.loops % this.messages.length];
    let edge = this.isClearing ? this.txt.length-1 : this.txt.length+1;
    this.txt = msg.substring(0, edge);
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  
    var delta = this.speed/2 + Math.random() * this.speed;
    if (this.isClearing) delta /= 2;
  
    if (!this.isClearing && this.txt === msg) {
      this.isClearing = true;
      delta = this.period;
    } else if (this.isClearing && this.txt === '') {
      this.loops++;
      this.isClearing = false;
      delta = this.period / 2;
    }
    setTimeout(() => this.tick(), delta);
  };