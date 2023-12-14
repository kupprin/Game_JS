(function(){
	
	var Memory = {

		init: function(cards){

			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},


		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
						} else {
							_.guess = null;
							_.paused = true;
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// ПЕРЕЗАПУСК
		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},


		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://i.pinimg.com/564x/9f/a8/db/9fa8dba8e0837c5c007338bafd9e2e9f.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// КАРТОЧКИ
	var cards = [
		{	

			name: "cat1",
			img: "https://i.pinimg.com/564x/79/4d/2a/794d2a735501a82f66de58e7f109a9c2.jpg",
			id: 1,
		},
		{
			name: "cat2",
			img: "https://i.pinimg.com/564x/c0/2d/7f/c02d7fb7e911b1a0478dd9160889a5f1.jpg",
			id: 2
		},
		{
			name: "cat3",
			img: "https://i.pinimg.com/736x/9c/3e/98/9c3e98c8ed69572c2c7f73bef54565ca.jpg",
			id: 3
		},
		{
			name: "cat4",
			img: "https://i.pinimg.com/564x/32/f4/db/32f4db2a28bb5b82133c19666d6c5c88.jpg",
			id: 4
		}, 
		{
			name: "cat5",
			img: "https://i.pinimg.com/564x/f8/e9/16/f8e916c4ddbccfaba0bb4af58db3ed60.jpg",
			id: 5
		},
		{
			name: "cat6",
			img: "https://i.pinimg.com/564x/ed/50/9e/ed509e75e301cf594e81e901bbc4bf79.jpg",
			id: 6
		},
		{
			name: "cat7",
			img: "https://i.pinimg.com/564x/61/0d/91/610d915085a9b1e36ca3eb86e97ddbb4.jpg",
			id: 7
		},
		{
			name: "cat8",
			img: "https://i.pinimg.com/564x/03/1d/59/031d59764ef74d79a694668f77adf0fc.jpg",
			id: 8
		},
		{
			name: "cat9",
			img: "https://i.pinimg.com/564x/9b/6b/82/9b6b823b6cccc8933fe1ac852972b594.jpg",
			id: 9
		},
		{
			name: "cat10",
			img: "https://i.pinimg.com/564x/f4/a0/c5/f4a0c5dd07cf902dbd4a1e17758c79bc.jpg",
			id: 10
		},
		{
			name: "cat11",
			img: "https://i.pinimg.com/564x/fa/ce/09/face09d261c4e94ae21b756bc28a75db.jpg",
			id: 11
		},
		{
			name: "cat12",
			img: "https://i.pinimg.com/564x/64/98/5a/64985a3189c76ebe0c1a3fb40f8a7b59.jpg",
			id: 12
		},
	];
    

	Memory.init(cards);


})();