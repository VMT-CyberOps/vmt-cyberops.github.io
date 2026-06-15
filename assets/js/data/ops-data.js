const VMT_DATA = window.VMT_DATA || {};

VMT_DATA.heroBars = [
  { label: 'Jan', val: 623, color: '#0094ff' },
  { label: 'Fev', val: 580, color: '#0094ff' },
  { label: 'Mar', val: 524, color: '#00b8d4' },
  { label: 'Abr', val: 471, color: '#00c8a0' },
  { label: 'Mai', val: 426, color: '#00c8a0' },
  { label: 'Jun', val: 382, color: '#00c8a0' },
];

VMT_DATA.pipelineSteps = ['Coleta', 'Norm.', 'Prior.', 'Indicad.', 'Exec.'];

VMT_DATA.opsRows = [
  { cve: 'CVE-2024-1234', host: 'srv-db-prod-01', cvss: 9.8, sev: 'critical', sla: 'danger', prazo: 'Vencido -2d', action: 'Priorizar' },
  { cve: 'CVE-2024-5678', host: 'web-app-02', cvss: 9.1, sev: 'critical', sla: 'danger', prazo: 'Vencido -5d', action: 'Priorizar' },
  { cve: 'CVE-2023-4567', host: 'lb-nginx-01', cvss: 8.8, sev: 'critical', sla: 'warn', prazo: '2 dias', action: 'Tratar' },
  { cve: 'CVE-2024-9012', host: 'api-gateway-03', cvss: 8.4, sev: 'high', sla: 'warn', prazo: '4 dias', action: 'Tratar' },
  { cve: 'CVE-2023-8765', host: 'srv-ldap-01', cvss: 7.9, sev: 'high', sla: 'ok', prazo: '11 dias', action: 'Mapear' },
  { cve: 'CVE-2024-3456', host: 'wks-devops-05', cvss: 7.5, sev: 'high', sla: 'ok', prazo: '14 dias', action: 'Mapear' },
  { cve: 'CVE-2023-2109', host: 'srv-files-02', cvss: 7.2, sev: 'high', sla: 'ok', prazo: '18 dias', action: 'Monitorar' },
  { cve: 'CVE-2024-6543', host: 'db-mysql-03', cvss: 6.8, sev: 'medium', sla: 'ok', prazo: '26 dias', action: 'Monitorar' },
  { cve: 'CVE-2023-7890', host: 'srv-backup-01', cvss: 6.5, sev: 'medium', sla: 'ok', prazo: '29 dias', action: 'Monitorar' },
  { cve: 'CVE-2024-1122', host: 'wks-ti-12', cvss: 5.9, sev: 'medium', sla: 'ok', prazo: '35 dias', action: 'Registrar' },
  { cve: 'CVE-2023-3344', host: 'print-srv-01', cvss: 4.3, sev: 'low', sla: 'ok', prazo: '60 dias', action: 'Registrar' },
  { cve: 'CVE-2024-5566', host: 'wks-mkt-07', cvss: 3.7, sev: 'low', sla: 'ok', prazo: '60 dias', action: 'Aceitar' },
];

window.VMT_DATA = VMT_DATA;
