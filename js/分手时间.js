// 纪念时间展示：计时计算逻辑与文案数据保持不变。
// 版式为时间线：先展示两个时间节点（分手时间 → 最后聊天），
// 再过渡到“距离那天已经过去”的实时计时；每秒只更新数字节点。

(function () {
  const start = new Date('2025-05-20 20:00:00');
  const lastChat = '2025.11.23 01:00';
  const root = document.querySelector('.t');
  if (!root) return;

  root.innerHTML =
    '<div class="t-inner">' +
      '<div class="t-tl">' +
        '<div class="t-row">' +
          '<span class="t-dot"></span>' +
          '<div class="t-cell">' +
            '<span class="t-k">分手时间</span>' +
            '<span class="t-v">2025.05.20 20:00</span>' +
          '</div>' +
        '</div>' +
        '<div class="t-row">' +
          '<span class="t-dot"></span>' +
          '<div class="t-cell">' +
            '<span class="t-k">最后聊天</span>' +
            '<span class="t-v">' + lastChat + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="t-rule"><i></i></div>' +
      '<p class="t-since">从分手起 · 已经过去</p>' +
      '<div class="t-count t-big">' +
        '<span class="t-g"><b class="t-num" data-u="y">0</b><span class="t-unit">年</span></span>' +
        '<span class="t-g"><b class="t-num" data-u="mo">0</b><span class="t-unit">月</span></span>' +
        '<span class="t-g"><b class="t-num" data-u="d">0</b><span class="t-unit">天</span></span>' +
      '</div>' +
      '<div class="t-count t-small">' +
        '<span class="t-g"><b class="t-num" data-u="h">0</b><span class="t-unit">时</span></span>' +
        '<span class="t-g"><b class="t-num" data-u="mi">0</b><span class="t-unit">分</span></span>' +
        '<span class="t-g"><b class="t-num" data-u="s">0</b><span class="t-unit">秒</span></span>' +
      '</div>' +
      '<p class="t-total">共 <b data-u="days">0</b> 天</p>' +
    '</div>';

  const u = {};
  root.querySelectorAll('[data-u]').forEach(function (el) {
    u[el.getAttribute('data-u')] = el;
  });

  function calc() {
    const now = new Date();
    const diff = now - start;
    const totalDays = Math.floor(diff / 86400000);

    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);

    let year = now.getFullYear() - start.getFullYear();
    let month = now.getMonth() - start.getMonth();
    let day = now.getDate() - start.getDate();

    if (day < 0) { month--; day += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (month < 0) { year--; month += 12; }

    return {
      year: year,
      month: month,
      day: day,
      h: hour % 24,
      mi: min % 60,
      se: sec % 60,
      totalDays: totalDays
    };
  }

  function paint() {
    const v = calc();
    u.y.textContent = v.year;
    u.mo.textContent = v.month;
    u.d.textContent = v.day;
    u.h.textContent = v.h;
    u.mi.textContent = v.mi;
    u.s.textContent = v.se;
    u.days.textContent = v.totalDays;
  }

  paint();
  setInterval(paint, 1000);
})();
