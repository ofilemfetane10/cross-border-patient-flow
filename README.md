# Long COVID Burden Dashboard

**Prevalence, symptom burden, economic impact, and health system response capacity — the chronic disease emergency hiding in plain sight.**

Part of the **EU Health Intelligence Suite** — 10 production-grade applications for **WHO**- and **EU**-level health policy analysis.

## What This Shows

Long COVID is the largest new chronic disease burden created in Europe since the HIV epidemic. Conservative estimates place the number of affected Europeans at **~17 million**.

The condition has profound economic consequences:

- **9–14 weeks** of workforce productivity lost *per case per year*
- **€4,000–€10,000** in direct + indirect costs *per patient annually*

Despite this scale, Long COVID remains **outside most national health system planning frameworks**. Only **6 of the 15 countries** in this dataset have adopted a national strategy.

This dashboard documents that gap — and benchmarks system response capacity across **four analytical dimensions**.

## Analytical Views

| View | Core Question |
|-----|--------------|
| **Prevalence** | Which countries carry the highest Long COVID burden as a share of population? |
| **Symptom Profile** | How does the symptom mix differ across countries — and where do cognitive impairment and mental health impacts dominate? |
| **Economic Burden** | What is the direct and indirect cost per case, and the total national economic burden? |
| **System Response** | Which countries have built the rehabilitation infrastructure to match the burden they carry? |

## Visual Design

Deep purple **biomedical aesthetic** — *Manrope* + *Fira Mono*  
A visual language inspired by clinical research environments and post-COVID care units.

## Data Sources

| Indicator | Source | Notes |
|--------|--------|------|
| Prevalence estimates | UK Office for National Statistics (ONS) COVID-19 Infection Survey | Most methodologically rigorous European Long COVID prevalence study |
| European synthesis | :contentReference[oaicite:0]{index=0} Long COVID Technical Report (2023) | Harmonised cross-country estimates |
| Symptom profile | :contentReference[oaicite:1]{index=1} EURO Post-COVID Condition Guidelines | WHO clinical case definition (>12 weeks) |
| Economic burden | ECDC (2023) + national health economics studies | Direct healthcare + indirect productivity costs |
| System response | National health authorities + ECDC | Clinics, strategy status, rehab access |
| Workforce loss | EU Labour Force Survey + ECDC | Average weeks of reduced work capacity |

**Reference year:** 2022–2023

## WHO Case Definition

All symptom classifications and prevalence estimates follow the **WHO Post-COVID Condition clinical case definition**:

> Symptoms persisting **more than 12 weeks** after acute SARS-CoV-2 infection, **not explained by an alternative diagnosis**.

This definition underpins European clinical practice, public health surveillance, and ECDC reporting — ensuring **full comparability** across countries.

## Symptom Profile

Five core symptom domains are tracked, with approximate European prevalence among Long COVID patients:

| Symptom | EU Average (% of LC patients) |
|-------|-------------------------------|
| Fatigue | 72–82% |
| Breathlessness | 44–62% |
| Cognitive impairment (brain fog) | 48–64% |
| Muscle pain | 40–58% |
| Mental health impact | 52–72% |

Each country detail view includes a **radar chart** comparing its symptom mix to the EU average — highlighting when burden is skewed toward **brain fog or mental health impact**, which demand different rehabilitation pathways than fatigue-dominant cases.

## Burden Tiers

| Tier | Criteria | Countries |
|----|---------|----------|
| 🔴 **Severe** | High prevalence + low rehab access + long workforce loss | Romania, Poland, Hungary |
| 🟠 **High** | Significant burden, partial system response | Italy, Spain, Greece, France |
| 🔵 **Moderate** | Manageable burden with growing infrastructure | Germany, Netherlands, Belgium, Czechia |
| 🟢 **Best Managed** | Strong rehab access, national strategy, contained workforce loss | Norway, Sweden, UK |

## Economic Burden

**Methodology**

- **Direct costs:**  
  GP visits (7–11 extra/year), specialist referrals (36–56%), hospital readmissions (10–20%), rehabilitation services

- **Indirect costs:**  
  Workforce productivity loss — the dominant component, reflecting **7–15 weeks** of reduced work capacity per patient per year

### Country Estimates

| Country | Est. Cases | Direct €/case/yr | Indirect €/case/yr | Total Burden |
|------|-----------|------------------|--------------------|--------------|
| Germany | 2.16M | €3,400 | €7,200 | ~€23B |
| France | 2.10M | €2,960 | €6,800 | ~€20B |
| Italy | 2.03M | €2,240 | €5,600 | ~€16B |
| UK | 1.94M | €2,840 | €6,200 | ~€18B |
| Poland | 1.44M | €1,480 | €4,200 | ~€8B |

## Key Findings

- **Romania and Poland** face the most acute system gap: prevalence >3.8%, rehabilitation access <20%, and no national strategy.
- **France** shows the largest absolute unmet burden in Western Europe — high prevalence (3.1%) with only 48% rehab access.
- **Norway, Sweden, and the UK** demonstrate best practice: national strategies, dense clinic networks, and high rehabilitation access (54–68%).
- Only **6 of 15 countries** have formal Long COVID strategies, despite millions affected.

## Run Locally

```bash
git clone https://github.com/your-username/long-covid-burden
cd long-covid-burden
npm install
npm run dev
