class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (e => {
      const $square = $(e.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos"); //fetches from 'pos' key
    const player = this.game.currentPlayer;

    this.game.playMove(pos);
    $square.addClass(player);

    if (this.game.isOver()) {
      this.$el.off("click");

      const winner = this.game.winner();
      if (winner) {
        console.log(`${winner} wins!`);
      } else {
        console.log("it was a draw!");
      }
    }
  }

  setupBoard() {
    const $ul = $('<ul>');

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let $li = $('<li>');
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
