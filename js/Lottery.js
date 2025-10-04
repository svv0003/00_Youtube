/*

테이블 형식 X

const createBtn = document.getElementById("createBtn");
const lottoResult = document.getElementById("lottoResult");
const deleteBtn = document.getElementById("deleteBtn");
let lotto = [];
let count = 0;

createBtn.addEventListener("click", function(){
  ++count;
  while (lotto.length < 6) {
    let num = Math.floor(Math.random() * 45) + 1;
    if (lotto.indexOf(num) == -1) {
      lotto.push(num);
    }
  }
  lotto.sort((a, b) => a - b);
  // alert(lotto);
  lottoResult.innerHTML += `${count}번 : ${lotto}<br>`;
  lotto = [];
});

deleteBtn.addEventListener("click", function(){
  lottoResult.textContent = "";
  count = 0;
});
*/


/*

테이블 형식 O

const createBtn = document.getElementById("createBtn");
const lottoResult = document.getElementById("lottoResult");
const deleteBtn = document.getElementById("deleteBtn");
let lotto = [];
let count = 0;

createBtn.addEventListener("click", function() {

  ++count;

  // 6개의 고유한 랜덤 번호 생성
  while (lotto.length < 6) {
    let num = Math.floor(Math.random() * 45) + 1;
    if (lotto.indexOf(num) === -1) {
      lotto.push(num);
    }
  }

  // 번호를 오름차순으로 정렬
  lotto.sort((a, b) => a - b);

  // 테이블 행으로 번호 출력
  lottoResult.innerHTML += `
    <tr>
      <td class="count-cell">${count}번</td>
      ${lotto.map(num => `<td class="number-cell">${num}</td>`).join("")}
    </tr>
  `;

  // 다음 생성을 위해 배열 초기화
  lotto = [];
});

deleteBtn.addEventListener("click", function() {

  // 결과와 카운트 초기화
  lottoResult.innerHTML = "";
  count = 0;
});

*/



const createBtn = document.getElementById("createBtn");
const lottoResult = document.getElementById("lottoResult");
const deleteBtn = document.getElementById("deleteBtn");
let lotto = [];
let count = 0;

createBtn.addEventListener("click", function() {

  ++count;

  // 6개의 고유한 랜덤 번호 생성
  while (lotto.length < 6) {
    let num = Math.floor(Math.random() * 45) + 1;
    if (lotto.indexOf(num) === -1) {
      lotto.push(num);
    }
  }

  // 번호를 오름차순으로 정렬
  lotto.sort((a, b) => a - b);

  // 랜덤으로 강조할 번호의 인덱스 선택 (0~5)
  const highlightIndex = Math.floor(Math.random() * 6);

  // 테이블 행으로 번호 출력, 랜덤으로 선택된 번호에 highlight 클래스 추가
  lottoResult.innerHTML += `
    <tr>
      <td class="count-cell">${count}번</td>
      ${lotto.map((num, index) => `
        <td class="number-cell ${index === highlightIndex ? 'highlight' : ''}">${num}</td>
      `).join("")}
    </tr>
  `;
  
  // 다음 생성을 위해 배열 초기화
  lotto = [];
});

deleteBtn.addEventListener("click", function() {

  // 결과와 카운트 초기화
  lottoResult.innerHTML = "";
  count = 0;
});



