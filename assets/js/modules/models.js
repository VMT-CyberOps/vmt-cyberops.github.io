window.VMT = window.VMT || {};

window.VMT.initModels = function initModels() {
  const tabs = document.querySelectorAll('.model-tab');
  const panels = document.querySelectorAll('.model-panel');

  tabs.forEach((tabButton) => {
    tabButton.addEventListener('click', () => {
      const selectedTab = tabButton.dataset.tab;

      tabs.forEach((button) => {
        button.classList.toggle('active', button.dataset.tab === selectedTab);
      });

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === `panel-${selectedTab}`);
      });
    });
  });

  document.querySelectorAll('.ops-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.ops-btn').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });
};
