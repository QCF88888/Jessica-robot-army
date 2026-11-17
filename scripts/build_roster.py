#!/usr/bin/env python3
"""Build ROSTER.md and roster.json from PERSONAS.md, MISSIONS.md and roles/NNN.md.
Re-run after editing any source file: python3 scripts/build_roster.py"""
import json, re, pathlib, datetime
from zoneinfo import ZoneInfo
R = pathlib.Path(__file__).resolve().parent.parent
pers = (R/"PERSONAS.md").read_text(); miss = (R/"MISSIONS.md").read_text()
ids = [f"{i:03d}" for i in range(21)]
# live Grok Bot profile labels (already public in workflows/token-factory/GROK_HANDOFF.md)
LIVE = {"000":"General Commander 总指挥官","001":"Chief of Staff 幕僚长","002":"Scheduler 日程官","003":"CFO 财务官",
"004":"Chief Capital Officer 资本运营官","005":"Chief Governance Officer 治理官","006":"WDEO COO","007":"JJ FIT COO",
"008":"QCF COO","009":"Media 媒体运营官","010":"Email 邮件管理员","011":"Competitor Watch 竞品监测","012":"Global Travel 全球旅行官",
"013":"DRAGO project 项目官","014":"Euro Hack 筹备官","015":"Supercomputing Centre 超算中心筹备","016":"Market Intelligence 股市情报官",
"017":"Mac & Archive Mac官","018":"Wish code","019":"Biotech 诺赛基因项目","020":"Neumann Solo Founder 项目官"}
# avatar descriptions documented in PERSONAS.md / MISSIONS.md; None = not described in repo
AVATAR = {"000":"Photo of Elon Musk (retouched; Wikimedia Commons, CC BY-SA 3.0, see assets/CREDITS.md) / 马斯克照片头像（修图，维基共享资源 CC BY-SA 3.0，见 assets/CREDITS.md）","001":"Mounted sword-bearing knight / 骑马持剑骑士","002":"Superman-style hero / 超人式英雄",
"003":"Joe Tsai-inspired figure / 蔡崇信式形象","004":"Investor figure (Ray Dalio-inspired) / 投资人形象",
"006":"WDEO wireframe lion-head mark / WDEO 线框狮头标志","007":"Gold orbital rings and a star / 金色轨道环与星点",
"010":"Black Batman-like guardian with a light shield / 黑色蝙蝠侠式光盾守护者","011":"Erlang Shen with the third eye / 二郎神三眼",
"013":"Shenlong, Chinese divine dragon / 中国神龙","014":"Original dark-knight-style hacker (AI-generated; not affiliated with DC/Batman): black bat-eared cowl and cape, cyan neon ring, code rain / 原创暗夜骑士风黑客头像（AI 生成，与 DC/蝙蝠侠无关联）：黑色蝠耳头罩与披风、青色霓虹圆环、代码雨",
"015":"Young Alan Turing, QSC core and Earth orbit / 青年图灵、QSC 核心与地球轨道","016":"Buffett-inspired figure / 巴菲特式形象",
"017":"Youthful portrait, red background, striped suit / 红底条纹西装青年肖像","020":"John von Neumann figure / 冯·诺伊曼形象"}
DUTY_OVR = {"015":"HPC policy & setup paths; site & cost modelling; team planning; industry-resource directories; QSC brand & feasibility reports; export-control compliance / 政策与设立路径、选址与成本建模、团队规划、产业资源目录、QSC 品牌与可行性报告、出口管制合规",
"020":"Business development; website requirements & acceptance; fundraising preparation (with 004); business model; KPI management; traffic growth / 业务拓展、网站需求与验收、融资对接（与 004 协同）、商业模式、KPI 管理、流量增长"}
KPI_OVR = {"020":"Dimensions (targets private): MRR, users/paid subs, pilots & public test reports, dead links / on-time requirements, monthly UV & conversion, investor pipeline, on-time weekly report; North Star: Solo Founders served / 指标维度（目标值存私有库）"}
rows = {}
for m in re.finditer(r"^\| (\d{3}) \| (.+?) \| (.+?) \| (.+?) \|$", pers, re.M):
    rows[m[1]] = {"role": m[2], "archetype": m[3], "style": m[4]}
secs = re.split(r"^## (?=\d{3} · )", miss, flags=re.M)[1:]
for s in secs:
    n = s[:3]; head = s.splitlines()[0][6:].strip()
    def block(label):
        mm = re.search(r"\*\*"+label+r" / [^*]+\*\*\s*\n(.+?)(?:\n\n|\Z)", s, re.S)
        return [l.strip() for l in mm[1].strip().splitlines()] if mm else []
    mi = block("Mission"); sy = block("Symbol")
    rows[n]["role_full"] = head
    rows[n]["mission_en"], rows[n]["mission_zh"] = (mi + ["", ""])[:2]
    tbd = (not sy) or "待定" in " ".join(sy)
    rows[n]["symbol_en"], rows[n]["symbol_zh"] = (None, None) if tbd else tuple((sy+["",""])[:2])
for n in ids:
    t = (R/f"roles/{n}.md").read_text()
    d = re.search(r"\*\*Duties / 职责\*\*:\s*(.*)", t); k = re.search(r"\*\*KPI\*\*:\s*(.*)", t)
    duties = DUTY_OVR.get(n) or (d[1].strip() if d else None)
    rows[n]["duties"] = duties or None
    rows[n]["duties_partial"] = bool(duties and "待定" in duties)
    rows[n]["kpi"] = KPI_OVR.get(n) or (k[1].strip() if k else None)
    rows[n]["avatar_desc"] = AVATAR.get(n)
    imgs = sorted((R/"assets/avatars").glob(n + ".*"))
    rows[n]["avatar_image"] = imgs[0].relative_to(R).as_posix() if imgs else None
    rows[n]["live_label"] = LIVE[n]
FIELDS = ["archetype","avatar","mission","symbol","duties","kpi"]
def checks(r):
    return {"archetype": bool(r["archetype"]), "avatar": True,  # set in bot profile (Jessica, 2026-11-17)
            "mission": bool(r["mission_en"]), "symbol": r["symbol_en"] is not None,
            "duties": bool(r["duties"]) and not r["duties_partial"], "kpi": bool(r["kpi"])}
now = datetime.datetime.now(ZoneInfo("Europe/Zurich")).strftime("%Y-%m-%d %H:%M")
bots = []; missing = []
for n in ids:
    r = rows[n]; c = checks(r)
    for f, ok in c.items():
        if not ok: missing.append((n, f))
    bots.append({"id": n, "role": r["role"], "role_full": r["role_full"], "live_label": r["live_label"],
        "archetype": r["archetype"], "style": r["style"],
        "avatar": {"defined": True, "source": "bot profile (Jessica, 2026-11-17)", "description": r["avatar_desc"] or "MISSING: not described in repo",
                   "image_in_repo": r["avatar_image"] or "MISSING"},
        "mission": {"en": r["mission_en"], "zh": r["mission_zh"]},
        "symbol": {"en": r["symbol_en"], "zh": r["symbol_zh"]} if r["symbol_en"] else "MISSING (TBD in MISSIONS.md)",
        "duties": (r["duties"] + (" [PARTIAL: duties marked 待定]" if r["duties_partial"] else "")) if r["duties"] else "MISSING",
        "kpi": r["kpi"] or "MISSING", "complete": c, "all_complete": all(c.values())})
full = [b["id"] for b in bots if b["all_complete"]]
stats = {"bots": 21, "fields_checked": FIELDS, "all_fields_complete": len(full), "complete_ids": full,
         "field_counts": {f: sum(b["complete"][f] for b in bots) for f in FIELDS},
         "avatar_images_in_repo": sum(1 for b in bots if b["avatar"]["image_in_repo"] != "MISSING"), "avatar_described_in_repo": sum(1 for b in bots if not b["avatar"]["description"].startswith("MISSING")),
         "missing": [f"{n}:{f}" for n, f in missing]}
(R/"roster.json").write_text(json.dumps({"name":"Jessica's Robot Army (JRA) roster","generated":now+" Europe/Zurich",
    "single_source_of_truth": True, "sources":["PERSONAS.md","MISSIONS.md","roles/NNN.md"],
    "note":"Archetypes are inspirations, not impersonations. No operating data, money figures or private names.",
    "stats": stats, "bots": bots}, ensure_ascii=False, indent=2)+"\n")
ck = lambda v: "✅" if v else "❌"
L = [f"# JRA · Roster & Completeness / 军团名册与完整度统计", "", "Jessica's Robot Army · JRA", "",
f"**Last updated / 最后更新：{now} CET · Europe/Zurich（苏黎世时间）**", "",
"**Single source of truth / 唯一权威来源** for the 21 bots (000–020). Machine-readable twin: [`roster.json`](roster.json). Generated by [`scripts/build_roster.py`](scripts/build_roster.py) from [PERSONAS.md](PERSONAS.md), [MISSIONS.md](MISSIONS.md) and [roles/](roles/). Edit the sources, then re-run the script; do not hand-edit this table.",
"", "21 个 Bot 的唯一权威名册，机器可读版本为 `roster.json`；由脚本从人物原型、使命与岗位文件生成，修改请改源文件后重新生成。", "",
"> Archetypes are inspirations, not impersonations; no endorsement implied. 人物原型是灵感，不是冒充，不暗示背书。Public repo: no operating data, money figures, meeting minutes or private persons' names. 公开仓库不含经营数据、金额、会议纪要或私人姓名。", "",
"## Summary / 统计摘要", "",
f"- **Bots / Bot 总数：21** (000–020)",
f"- **All 6 fields complete / 六项全部完整：{len(full)} / 21** — {', '.join(full)}",
"- Field coverage / 各字段覆盖：" + " · ".join(f"{f} {stats['field_counts'][f]}/21" for f in FIELDS),
f"- Avatar: defined for 21/21 in the live bot profiles (Jessica, 2026-11-17); described in repo {stats['avatar_described_in_repo']}/21; **image files in repo {stats['avatar_images_in_repo']}/21** (`assets/avatars/`, credits in [assets/CREDITS.md](assets/CREDITS.md)) / 头像：21 个均已设定；仓库内有文字描述 {stats['avatar_described_in_repo']}/21；**头像图片入库 {stats['avatar_images_in_repo']}/21**",
"- **Missing / 缺项：** " + ("; ".join(f"{n} {f}" + (" (TBD / 待定)" if f=="symbol" else " (marked 待定 / partial)" if f=="duties" else "") for n,f in missing) or "none"), "",
"## Roster / 名册", "",
"| No. | Role / 岗位 | Live label / 实际 Bot 名 | Archetype / 人物原型 | Avatar / 头像 | Mission / 使命 | Symbol / 象征 | Core duties / 核心职责 | KPI |",
"|---|---|---|---|---|---|---|---|---|"]
esc = lambda s: s.replace("|","\\|")
for b in bots:
    sym = b["symbol"] if isinstance(b["symbol"], str) else b["symbol"]["en"] + "<br>" + b["symbol"]["zh"]
    sym = "❌ **MISSING** — TBD / 待定" if isinstance(b["symbol"], str) else sym
    av = b["avatar"]["description"]; av = "Set in bot profile; ⚠ not described in repo / 已在 Bot 资料设定，仓库无描述" if av.startswith("MISSING") else av
    img = b["avatar"]["image_in_repo"]
    av = (f'<a href="{img}"><img src="{img}" width="64" alt="{b["id"]} avatar"></a><br>' + av) if img != "MISSING" else av + "<br>🖼 image not in repo / 图片未入库"
    du = b["duties"].replace(" [PARTIAL: duties marked 待定]", " ⚠ **PARTIAL / 部分待定**")
    L.append("| " + " | ".join(esc(x) for x in [b["id"], b["role"], b["live_label"], b["archetype"], av,
        b["mission"]["en"]+"<br>"+b["mission"]["zh"], sym, du, b["kpi"]]) + " |")
L += ["", "## Completeness matrix / 完整度矩阵", "",
"| No. | Archetype 原型 | Avatar 头像 | Mission 使命 | Symbol 象征 | Duties 职责 | KPI | Avatar image in repo 图片入库 | All 6 / 六项齐全 |",
"|---|---|---|---|---|---|---|---|---|"]
for b in bots:
    c = b["complete"]
    L.append(f"| {b['id']} | " + " | ".join(ck(c[f]) for f in FIELDS) + " | " + ck(b["avatar"]["image_in_repo"] != "MISSING") + " | " + ("✅" if b["all_complete"] else "❌") + " |")
L += ["", "Legend / 图例：✅ documented / 已记录 · ❌ missing or TBD / 缺失或待定. Avatar ✅ = set in the live bot profile; the image column tracks whether the picture file is committed here. 头像 ✅ 表示已在 Bot 资料中设定，最后一列表示图片文件是否已入库。", "",
"## How to close the gaps / 补齐方式", "",
"1. Jessica confirms the missing symbols → update MISSIONS.md → `python3 scripts/build_roster.py`. / Jessica 确认缺失象征后更新 MISSIONS.md 并重新生成。",
"2. Avatar images live in `assets/avatars/NNN.(png|jpg)` (≤512 px); the script picks them up automatically. Add attribution for any third-party image to [assets/CREDITS.md](assets/CREDITS.md). / 头像图片放在 `assets/avatars/`，脚本自动识别；第三方图片须在 CREDITS 署名。",
"3. 012 duties are still marked 待定 in `roles/012.md`. / 012 职责仍标注待定。", ""]
(R/"ROSTER.md").write_text("\n".join(L))
print(json.dumps(stats, ensure_ascii=False, indent=1))
