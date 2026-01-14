let records = [];

const savedData = localStorage.getItem("kakeibo");
if (savedData) {
  records = JSON.parse(savedData);
}

const addBtn = document.getElementById("addBtn");
const monthSelect = document.getElementById("monthSelect");

monthSelect.value = new Date().toISOString().slice(0, 7);

// 追加ボタン
addBtn.addEventListener("click", function () {
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value;
  const amount = Number(document.getElementById("amount").value);

  const record = {
    id: Date.now(),
    type: type,
    date: date,
    content: content,
    amount: amount
  };

  records.push(record);
  localStorage.setItem("kakeibo", JSON.stringify(records));

  showList();
  clearInput();
});

// 入力欄クリア
function clearInput() {
  document.getElementById("content").value = "";
  document.getElementById("amount").value = "";
}

// 月変更時
monthSelect.addEventListener("change", showList);

// 表示関数
function showList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let incomeTotal = 0;
  let expenseTotal = 0;

  const selectedMonth = monthSelect.value;

  records.forEach(function (item) {

    // 月別表示
    if (!item.date.startsWith(selectedMonth)) return;

    const li = document.createElement("li");
    li.className = item.type;

    li.textContent = `${item.date}｜${item.content}｜${item.amount}円 `;

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", function () {
      deleteRecord(item.id);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);

    // 合計計算
    if (item.type === "income") {
      incomeTotal += item.amount;
    } else {
      expenseTotal += item.amount;
    }
  });

  document.getElementById("incomeTotal").textContent = incomeTotal;
  document.getElementById("expenseTotal").textContent = expenseTotal;
  document.getElementById("balance").textContent = incomeTotal - expenseTotal;
}

// 削除処理
function deleteRecord(id) {
  records = records.filter(function (item) {
    return item.id !== id;
  });

  localStorage.setItem("kakeibo", JSON.stringify(records));
  showList();
}

// 起動時表示
showList();
