//pega todas as divs com a class column
const columns = document.querySelectorAll(".column");

//evento de quando um item "draggable" é selecionado
document.addEventListener("dragstart", (e) => {
  //atribui ao item que esta sendo arrastado a class dragging
  e.target.classList.add("dragging");
});

//evento para quando o item "draggable" deixa de ser selecionado
document.addEventListener("dragend", (e) => {
  //remove a class dragging do item que estava sendo arrastado
  e.target.classList.remove("dragging");
});

columns.forEach((item) => {
  //para cada coluna é adicionado um evento dragover para identificar quando o item esta por cima da coluna
  item.addEventListener("dragover", (e) => {
    //seleciona o item que esta sendo arrastado
    const draggedItem = document.querySelector(".dragging");
    //seleciona a nova posição do item que esta sendo arrastado (coluna, posição do item)
    const newPosition = getNewPosition(item, e.clientY);

    //verifica se existe um item por cima, se sim, é inserido depois do elemento
    if (newPosition) {
      newPosition.insertAdjacentElement("afterend", draggedItem);
    } else {
      //se não tiver é inserido na primeira posição da coluna com prepend
      item.prepend(draggedItem);
    }
  });
});

function getNewPosition(column, posY) {
  //seleciona todos os itens que não estão sendo arrastados, sem a classe "dragging"
  const cards = column.querySelectorAll(".item:not(.dragging)");

  let result;

  //pega a altura e posição dos cards
  for (let refer_card of cards) {
    //getBoundingClientRect -> pega a posição do item
    const box = refer_card.getBoundingClientRect();
    //pega a altura -> é dividido por 2 para quando um card ficar por cima, ter a posição de baixo
    const boxCenterY = box.y + box.height / 2;

    //verifica se a posição do item for maior do que o item arrastado retorna a posição
    if (posY >= boxCenterY) {
      result = refer_card;
    }
  }

  return result;
}
