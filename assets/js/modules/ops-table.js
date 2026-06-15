window.VMT = window.VMT || {};

window.VMT.initOpsTable = function initOpsTable() {
  const tableBody = document.getElementById('opsTableBody');
  const searchInput = document.getElementById('opsSearch');
  const filterButtons = document.querySelectorAll('.filter-chip');
  const rows = window.VMT_DATA?.opsRows || [];

  if (!tableBody) return;

  let currentFilter = 'todos';
  let searchTerm = '';

  function cvssColor(value) {
    if (value >= 9) return '#ff4d6d';
    if (value >= 7) return '#f59e0b';
    if (value >= 4) return '#0094ff';
    return '#10b981';
  }

  function severityChip(severity) {
    const classMap = { critical: 'danger', high: 'warn', medium: 'info', low: 'ok' };
    const labelMap = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };

    return `<span class="status-chip ${classMap[severity]}"><span class="status-dot"></span>${labelMap[severity]}</span>`;
  }

  function slaChip(sla, deadline) {
    if (sla === 'danger') return `<span class="status-chip danger"><span class="status-dot"></span>${deadline}</span>`;
    if (sla === 'warn') return `<span class="status-chip warn"><span class="status-dot"></span>${deadline}</span>`;

    return `<span class="status-chip ok"><span class="status-dot"></span>${deadline}</span>`;
  }

  function actionChip(action) {
    const classMap = {
      Priorizar: 'danger',
      Tratar: 'warn',
      Mapear: 'info',
      Monitorar: 'ok',
      Registrar: 'ok',
      Aceitar: 'ok',
    };

    return `<span class="status-chip ${classMap[action] || 'info'}">${action}</span>`;
  }

  function getFilteredRows() {
    return rows.filter((row) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = !search || row.cve.toLowerCase().includes(search) || row.host.toLowerCase().includes(search);
      const matchesFilter = currentFilter === 'todos'
        || (currentFilter === 'critical' && row.sev === 'critical')
        || (currentFilter === 'high' && row.sev === 'high')
        || (currentFilter === 'fora-sla' && row.sla === 'danger')
        || (currentFilter === 'exploitable' && row.cvss >= 8);

      return matchesSearch && matchesFilter;
    });
  }

  function render() {
    const filteredRows = getFilteredRows();

    tableBody.innerHTML = filteredRows.map((row) => {
      const color = cvssColor(row.cvss);
      const cvssWidth = (row.cvss / 10) * 100;

      return `
        <tr>
          <td class="ops-cell-code ops-cell-link">${row.cve}</td>
          <td class="ops-cell-code">${row.host}</td>
          <td>
            <div class="cvss-bar">
              <span class="cvss-score" style="color:${color}">${row.cvss}</span>
              <div class="cvss-track"><div class="cvss-fill" style="width:${cvssWidth}%;background:${color}"></div></div>
            </div>
          </td>
          <td>${severityChip(row.sev)}</td>
          <td>${slaChip(row.sla, row.prazo)}</td>
          <td class="ops-cell-deadline">${row.prazo}</td>
          <td>${actionChip(row.action)}</td>
        </tr>
      `;
    }).join('');
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter || 'todos';
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      searchTerm = event.target.value;
      render();
    });
  }

  render();
};
