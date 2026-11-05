# Security policy / 安全政策

Prepared: 2026-11-05 21:41:41 CET · Europe/Zurich · [000] · proposed policy.

## Private reporting
Please report vulnerabilities or suspected data exposure to **future@neumanntech.space**, the Neumann Solo Founder Lab public business contact. Do not open a public Issue or PR containing exploit details, secrets or personal/customer data. Include affected commit/file, impact and safe reproduction steps; mask credentials and do not send live customer records. No response-time SLA or bug bounty is promised.

If a real credential has been published, treat it as compromised: revoke/rotate it promptly, review access logs and coordinate removal from all branches, tags and mirrors. History rewriting requires explicit owner approval; forks, caches and existing clones may retain copies. A scanner returning zero findings is not proof of absence.

## Supported scope
The public default branch is the review baseline. Experimental branches and simulations are not certified production systems. Use least privilege, synthetic fixtures and approved secret management; never commit secrets or internal business/customer data.

## 简体中文
发现漏洞或疑似泄露，请私下联系 **future@neumanntech.space**，不要在公开 Issue/PR 中提交敏感细节。提供受影响提交、文件、影响与安全复现方法，凭证脱敏，不发送真实客户资料。真实凭证暴露后先撤销/轮换、检查访问日志，再经 Jessica 明确批准协调主仓、镜像、所有分支与标签的历史清理。缓存、Fork、旧克隆仍可能保留副本。扫描零发现不等于绝对安全；本政策不承诺响应时限或奖金。
