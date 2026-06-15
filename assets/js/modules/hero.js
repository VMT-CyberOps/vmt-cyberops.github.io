window.VMT = window.VMT || {};

function animateCounter(id, target, suffix = '', duration = 1200) {
  const element = document.getElementById(id);
  if (!element) return;

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(ease * target) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function initHeroCounters() {
  window.setTimeout(() => {
    animateCounter('heroCounter1', 188, '', 1200);
    animateCounter('heroCounter2', 34, '', 1000);
    animateCounter('heroCounter3', 91, '%', 1400);
    animateCounter('heroCounter4', 18, '%', 1600);
  }, 600);
}

function initHeroBarChart() {
  const chartElement = document.getElementById('heroBarChart');
  const data = window.VMT_DATA?.heroBars || [];
  if (!chartElement || data.length === 0) return;

  const maxValue = Math.max(...data.map((item) => item.val));
  chartElement.innerHTML = data.map((item) => {
    const height = (item.val / maxValue) * 100;

    return `
      <div class="bar-wrap">
        <div class="bar" style="height:${height}%;background:${item.color};opacity:0.85" title="${item.val}"></div>
        <span class="bar-lbl">${item.label}</span>
      </div>
    `;
  }).join('');
}

function initHeroPipeline() {
  const pipelineElement = document.getElementById('heroPipeline');
  const steps = window.VMT_DATA?.pipelineSteps || [];
  if (!pipelineElement || steps.length === 0) return;

  let activeStep = 0;

  function activatePipe(index) {
    pipelineElement.querySelectorAll('.pipe-step').forEach((element, itemIndex) => {
      element.classList.toggle('active', itemIndex === index);
    });
  }

  pipelineElement.innerHTML = steps.map((label, index) => {
    const arrow = index > 0 ? '<span class="pipe-arrow">›</span>' : '';
    const activeClass = index === 0 ? ' active' : '';

    return `
      ${arrow}
      <button class="pipe-step${activeClass}" type="button" data-pipe-index="${index}" id="pipe-${index}">
        <div class="pipe-step-num">${String(index + 1).padStart(2, '0')}</div>
        ${label}
      </button>
    `;
  }).join('');

  pipelineElement.addEventListener('click', (event) => {
    const button = event.target.closest('.pipe-step');
    if (!button) return;

    activeStep = Number(button.dataset.pipeIndex);
    activatePipe(activeStep);
  });

  window.setInterval(() => {
    activeStep = (activeStep + 1) % steps.length;
    activatePipe(activeStep);
  }, 1800);
}

window.VMT.initHero = function initHero() {
  initHeroCounters();
  initHeroBarChart();
  initHeroPipeline();
};
