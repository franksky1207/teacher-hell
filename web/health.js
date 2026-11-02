import { restoreFoundationEnvelope } from '../src/contracts/foundation.js';

const status = document.querySelector('#status');
const results = document.querySelector('#results');
const repeat = document.querySelector('#repeat');
async function run() {
  repeat.disabled = true; results.replaceChildren(); status.dataset.status='pending';
  status.textContent='正在檢查合成資料…';
  try {
    const response = await fetch(new URL('../health-fixture.json',import.meta.url),{cache:'no-store'});
    if (!response.ok) throw new Error(`fixture HTTP ${response.status}`);
    const data = await response.json(), before = JSON.stringify(data);
    const restored = restoreFoundationEnvelope(data);
    if (JSON.stringify(restored) !== before || JSON.stringify(data) !== before) throw new Error('Contract roundtrip changed source');
    for (const text of [
      '通過：瀏覽器ES modules與外層契約驗證。',
      '通過：JSON往返保留N1～N8資料與亂數快照，來源未被修改。',
      `通過：種子11；${restored.enrollments.length}份在籍引用、同一事實${restored.events[0].results.length}份不同當事人成果。`,
      '未執行：事件判定、磁碟交易、Safari真機與正式30年遊戲。',
    ]) { const row=document.createElement('li'); row.textContent=text; results.append(row); }
    status.dataset.status='passed'; status.textContent='本頁合成契約檢查通過。';
  } catch (error) { status.dataset.status='failed'; status.textContent=`失敗：${error.message}`; }
  finally { repeat.disabled=false; }
}
repeat.addEventListener('click',run);
run();
