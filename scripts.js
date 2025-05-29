const convertBtn = document.getElementById('convertButton');
const binaryInput = document.getElementById('binaryInput');
const resultEl = document.getElementById('result');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modal2 = document.getElementById('modal2');
const modal2Close = document.getElementById('modal2Close');

convertBtn.addEventListener('click', () => {
  const bin = binaryInput.value.trim();
  if (!/^[01]+$/.test(bin)) {
    resultEl.textContent = '0または1のみで構成された数値を入力してください。';
    return;
  }
  const bits = bin.split('');
  const len = bits.length;
  let total = 0;
  let html = '<div class="calc-graphical">';
  bits.forEach((b, i) => {
    const exp = len - 1 - i;
    const weight = Math.pow(2, exp);
    total += parseInt(b) * weight;
    const delayBase = (len - 1 - i) * 0.5;
    html += `<div class="cell" style="animation-delay: ${delayBase}s">
        <div class="power" style="animation-delay: ${delayBase}s">2<sup>${exp}</sup>=${weight}の位</div>
        <div class="arrow" style="animation-delay: ${delayBase + 0.2}s">↓</div>
        <div class="bit" style="animation-delay: ${delayBase + 0.4}s">${b}</div>
        <div class="operation" style="animation-delay: ${delayBase + 0.6}s">${weight}×${b}</div>
      </div>`;
  });
  html += '</div>';
  const sumDelay = 0.5 * len + 0.5;
  html += `<div class="sum" style="animation-delay: ${sumDelay}s">合計: ${total}</div>`;
  html += '<div style="text-align:right; margin-top:0.5rem;"><button id="modalOpen">重みの説明</button><button id="modal2Open">指数と基数の関係</button></div>';
  resultEl.innerHTML = html;

  document.getElementById('modalOpen').addEventListener('click', () => modal.style.display = 'flex');
  document.getElementById('modal2Open').addEventListener('click', () => modal2.style.display = 'flex');
});

binaryInput.addEventListener('keyup', e => { if (e.key === 'Enter') convertBtn.click(); });
modalClose.addEventListener('click', () => modal.style.display = 'none');
modal2Close.addEventListener('click', () => modal2.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
  if (e.target === modal2) modal2.style.display = 'none';
});
