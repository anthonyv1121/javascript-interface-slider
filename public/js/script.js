(function(){
  function Slider(o){
    this.parent = document.body;
    this.images = document.querySelectorAll('.' + o.container + ' img');
    this.captions = document.getElementsByClassName(o.captions.selector);
    this.controls = document.getElementsByTagName(o.controls.element);
    this.useCaptions = o.captions.show;
    this.showControls = o.controls.show;
    this.autoplay = o.autoplay;
    this.duration = o.duration * 1000;
    this.index = 0;
    this.last = this.images.length-1;
    this.activeClass = o.class;

    if(this.showControls){
      this.back = this.controls[0];
      this.next = this.controls[1];
      for(var i = 0; i < this.controls.length; i++){
        this.controls[i].addEventListener('click', function(e){
          this.cancel();

          this.requestSlide(e.target);
        }.bind(this));
      };
    };
    this.cancel = function(){
      clearInterval(this.loop);
      this.autoplay = false;
    }
    this.query = function(batch){
      for(var i = 0; i < batch.length; i++){
        if(batch[i].classList.contains(this.activeClass)){
          var info = {e: batch[i], i: i}
          return info;
        }
      }
    };

    this.changeClass = function(a, i){
        var c = a[this.index];
        c.classList.remove(this.activeClass);
        c.classList.add('fadeOut');
        a[i].classList.add(this.activeClass);
        setTimeout(function(){
          this.index = i;
          console.log("New Slide = " + this.index);
          c.classList.remove('fadeOut');
        }.bind(this),500)
    };

    this.play = function(){
    this.loop = setInterval(function(){
        this.requestSlide(this.next)
      }.bind(this), this.duration);
    };
    this.requestSlide = function(target){
      var t = target,
          i = this.index;

      if(t === this.next){
        if(this.index < this.last)  i = this.index + 1;

        else if(this.index === this.last)   i = 0;
      }
      else {
        if(this.index > 0)  i = this.index - 1;
        else if(this.index === 0)   i = this.last;
      }
      this.changeClass(this.images, i);
      if(this.useCaptions) this.changeClass(this.captions, i);
    };

    this.parent.addEventListener('mouseover', function(){
      console.log('mouseover');
      this.cancel();
    }.bind(this));

    this.parent.addEventListener('mouseout', function(){
      console.log('out');
      this.autoplay = true;
      this.play();
    }.bind(this));

    if(this.autoplay){
      this.play();
    }
};
  var $ = new Slider({
      container: "main",
      captions: {
            show: true,
            selector: "slide"
      },
      controls: {
            show: true,
            element: "button"
      },
      class: "active",
      autoplay: true,
      duration: 7
    });
}());
