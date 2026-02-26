# Cross-Border Patient Flow Tracker

**Mapping EU patient mobility under Directive 2011/24/EU — where patients travel, why they leave, and what it reveals about the systems they are leaving.**

Part of the **EU Health Intelligence Suite** — 10 production-grade applications for **WHO**- and **EU**-level health policy analysis.

## What This Shows

The **EU Cross-Border Healthcare Directive (2011/24/EU)** grants European citizens the legal right to seek *planned healthcare* in another EU member state and claim reimbursement from their home health system.

While designed as a **patient rights mechanism**, cross-border care has become a **live signal of health system failure**:

> Countries with high outbound patient flows are revealing inadequate waiting times, quality, or specialist capacity for their own populations.

This dashboard treats patient mobility not as tourism — but as **deliberate system arbitrage** by patients.

## Analytical Views

| View | Core Question |
|-----|--------------|
| **Net Patient Flows** | Which countries are exporters of patients vs destinations for European healthcare? |
| **Top Routes** | Where do the largest bilateral flows go, for which procedures, and how much waiting time do patients save? |
| **Wait Time Driver** | Does longer average waiting time predict more patients seeking care abroad? |

## Visual Design

Cool **slate policy aesthetic** — *IBM Plex Sans* + *IBM Plex Mono*  
Inspired by **European Commission** and **DG SANTE** policy documents.

## Data Sources

| Source | What It Contains | Notes |
|------|------------------|------|
| EU Directive 2011/24/EU Annual Reports | Reimbursements paid per country, patient volumes | Published annually by DG SANTE |
| EHIC Claims Data | Emergency care abroad | Excluded — reflects tourism, not system capacity |
| National reimbursement authorities | Procedure breakdowns | Used for route-level analysis |
| Eurostat health data | Average waiting times | Context for scatter analysis |

**Reference year:** 2022

### Methodological Note

This dataset covers **only reimbursed planned care** under the Directive:

-  Emergency treatment  
-  Undeclared cross-border care  
-  Care accessed via free-movement worker rights  

This scope is intentional. Planned cross-border care reflects **deliberate patient choice**, making it a precise indicator of **health system pressure and failure**.

## Flow Classification

| Tier | Definition | Examples |
|----|-----------|----------|
| 🟢 **Major Receiver** | Net inbound > 20,000 patients/year | Germany (+133,600), Austria (+81,800) |
| 🔵 **Net Receiver** | Net inbound 1–20,000 | Belgium, Netherlands, Hungary, Czechia |
| ⬜ **Balanced** | Net flow within ±5,000 | Finland, Estonia |
| 🟠 **Net Sender** | Net outbound 1–15,000 | Norway, Sweden, Portugal |
| 🔴 **Major Sender** | Net outbound > 15,000 | Romania, Bulgaria, Greece, Italy |

## Top 10 Cross-Border Routes

| Route | Patients / yr | Top Procedure | Avg. Wait Saved |
|------|---------------|---------------|----------------|
| 🇷🇴 Romania → 🇩🇪 Germany | 9,800 | Cardiac / Oncology | −30 weeks |
| 🇮🇹 Italy → 🇩🇪 Germany | 8,400 | Cardiac surgery | −28 weeks |
| 🇧🇬 Bulgaria → 🇩🇪 Germany | 7,200 | Cardiac / Oncology | −28 weeks |
| 🇬🇷 Greece → 🇩🇪 Germany | 7,200 | Cardiac / Oncology | −32 weeks |
| 🇵🇱 Poland → 🇩🇪 Germany | 6,800 | Orthopedics | −18 weeks |
| 🇭🇺 Hungary → 🇦🇹 Austria | 6,200 | Dental / Ophthalmology | −14 weeks |
| 🇳🇴 Norway → 🇸🇪 Sweden | 5,200 | Orthopedics | −8 weeks |
| 🇳🇱 Netherlands → 🇧🇪 Belgium | 5,800 | Oncology | −12 weeks |
| 🇸🇪 Sweden → 🇩🇪 Germany | 4,800 | Cardiology | −14 weeks |
| 🇫🇮 Finland → 🇸🇪 Sweden | 4,200 | Ophthalmology | −10 weeks |


## Key Findings

- **Germany is Europe’s healthcare hub**  
  ~142,000 patients per year travel to Germany — driven by tertiary care capacity, shorter waits for complex procedures, and geographic accessibility from Eastern Europe.

- **The Directive creates a two-tier healthcare market**  
  Exercising Directive rights requires upfront payment, administrative literacy, and language capacity. These barriers disproportionately exclude lower-income patients — **widening health inequalities**.

- **€587M reimbursed annually**  
  A significant but underdiscussed flow of public health expenditure from high-outbound countries into high-capacity healthcare systems.

- **Waiting time strongly predicts outbound flow**  
  Countries with the longest elective wait times generate the highest per-capita outbound volumes:
  - Greece: 54 weeks  
  - Romania: 52 weeks  
  - Italy: 48 weeks  

The scatter analysis confirms waiting time as a **primary structural driver** of cross-border care.

## Run Locally

```bash
git clone https://github.com/your-username/cross-border-patient-flow
cd cross-border-patient-flow
npm install
npm run dev
