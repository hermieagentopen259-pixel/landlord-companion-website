(() => {
  const form = document.querySelector('#record-audit');
  const result = document.querySelector('#audit-result');
  if (!form || !result) return;
  const boxes = [...form.querySelectorAll('input[type="checkbox"]')];
  form.addEventListener('submit', event => {
    event.preventDefault();
    const checked = boxes.filter(box => box.checked);
    const missing = boxes.filter(box => !box.checked);
    const score = checked.length;
    document.querySelector('#audit-score').textContent = `${score} of ${boxes.length} located`;
    document.querySelector('#audit-progress').style.width = `${Math.round(score / boxes.length * 100)}%`;
    document.querySelector('#audit-summary').textContent = score === boxes.length
      ? 'You marked every item as locatable. Recheck dates and source documents rather than relying on the tick alone.'
      : score >= 9 ? 'Most items are locatable. Close the remaining gaps one property at a time.'
      : score >= 5 ? 'There is a useful foundation, with several records worth bringing together.'
      : 'Start with the current tenancy and source safety documents, then work through the remaining items.';
    const next = document.querySelector('#audit-next');
    next.replaceChildren();
    const actions = missing.slice(0, 5);
    if (!actions.length) {
      const li = document.createElement('li');
      li.textContent = 'Open each source document and compare its address, names and dates with the recorded details.';
      next.append(li);
    } else {
      actions.forEach(box => {
        const li = document.createElement('li');
        li.textContent = box.dataset.next;
        next.append(li);
      });
    }
    result.hidden = false;
    result.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  form.addEventListener('reset', () => {
    result.hidden = true;
    document.querySelector('#audit-next').replaceChildren();
  });
})();
