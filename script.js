const form = document.querySelector("#movie-form > form");

const cardsDB =
  JSON.parse(localStorage.cardsDB ? localStorage.cardsDB : "[]") || [];

renderCards();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData(e.target);

  const title = formdata.get("title");
  const genre = formdata.get("genre");
  const year = formdata.get("year");
  const status = formdata.get("status");

  saveCard({ id: cardsDB.length, title, genre, year, status });
  renderCards();
});

const saveCard = (card) => {
  cardsDB.push(card);

  localStorage.cardsDB = JSON.stringify(cardsDB);
};

function renderCards() {
  const cardHolder = document.querySelector("#card-holder > .holder");
  cardHolder.innerHTML = "";

  cardsDB.forEach((c) => {
    console.log(c);

    const cardElement = `<div data-id ${c.id} class=card><div class=title><p id=title>${c.title}<div class=wrapper><span class=status>${c.status}</span><div class=btn-group><button id=edit><svg class="lucide lucide-pencil"fill=none height=16 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=16 xmlns=http://www.w3.org/2000/svg><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg></button> <button id=delete><svg class="lucide lucide-trash"fill=none height=16 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=16 xmlns=http://www.w3.org/2000/svg><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div></div></div><p><span id=m-genre>${c.genre}</span> - <span id=m-year>${c.year}</span></div>`;

    cardHolder.innerHTML += cardElement;
  });
}
