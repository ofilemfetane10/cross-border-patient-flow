// Cross-Border Patient Flow Tracker
// Sources: EU Cross-Border Healthcare Directive 2011/24/EU annual reports
// European Health Insurance Card (EHIC) data, Eurostat hlth_co_disch
// Flows = patients treated abroad (reimbursed by home country)

export interface FlowRoute {
  from: string; to: string
  patients: number          // annual treated abroad
  avgCostEUR: number        // avg cost per patient
  topProcedure: string
  waitTimeSaving: number    // weeks saved vs home country
}

export interface CountryFlow {
  code: string; name: string; region: string
  outbound: number          // patients going abroad annually
  inbound: number           // foreign patients treated
  netFlow: number           // inbound - outbound (positive = net receiver)
  topDestination: string    // main country patients travel to
  topOrigin: string         // main source country of incoming patients
  reimbursedMillEUR: number // EUR millions reimbursed to patients treated abroad
  mainReasons: string[]     // top reasons for cross-border care
  avgWaitHome: number       // avg wait weeks for elective procedures
  population: number
}

export const FLOW_DATA: CountryFlow[] = [
  { code: 'DE', name: 'Germany',     region: 'Western',  outbound: 8400,  inbound: 142000, netFlow: 133600, topDestination: 'AT', topOrigin: 'PL', reimbursedMillEUR: 24.2, mainReasons: ['Cardiac surgery', 'Oncology', 'Orthopedics'], avgWaitHome: 8,  population: 83.2 },
  { code: 'AT', name: 'Austria',     region: 'Western',  outbound: 6200,  inbound: 88000,  netFlow: 81800,  topDestination: 'DE', topOrigin: 'HU', reimbursedMillEUR: 18.4, mainReasons: ['Dental', 'Orthopedics', 'Ophthalmology'], avgWaitHome: 12, population: 9.0 },
  { code: 'SE', name: 'Sweden',      region: 'Northern', outbound: 12400, inbound: 18000,  netFlow: 5600,   topDestination: 'DE', topOrigin: 'NO', reimbursedMillEUR: 38.8, mainReasons: ['Orthopedics', 'Cardiology', 'Oncology'], avgWaitHome: 22, population: 10.5 },
  { code: 'FI', name: 'Finland',     region: 'Northern', outbound: 9800,  inbound: 8400,   netFlow: -1400,  topDestination: 'SE', topOrigin: 'EE', reimbursedMillEUR: 28.4, mainReasons: ['Ophthalmology', 'Dental', 'Orthopedics'], avgWaitHome: 24, population: 5.5 },
  { code: 'NO', name: 'Norway',      region: 'Northern', outbound: 11200, inbound: 6800,   netFlow: -4400,  topDestination: 'SE', topOrigin: 'SE', reimbursedMillEUR: 42.8, mainReasons: ['Orthopedics', 'Cardiology', 'Dental'], avgWaitHome: 18, population: 5.4 },
  { code: 'NL', name: 'Netherlands', region: 'Western',  outbound: 14800, inbound: 24000,  netFlow: 9200,   topDestination: 'BE', topOrigin: 'BE', reimbursedMillEUR: 48.4, mainReasons: ['Oncology', 'Fertility', 'Orthopedics'], avgWaitHome: 20, population: 17.9 },
  { code: 'BE', name: 'Belgium',     region: 'Western',  outbound: 9200,  inbound: 38000,  netFlow: 28800,  topDestination: 'FR', topOrigin: 'NL', reimbursedMillEUR: 28.8, mainReasons: ['Oncology', 'Fertility', 'Neurology'], avgWaitHome: 16, population: 11.6 },
  { code: 'FR', name: 'France',      region: 'Western',  outbound: 18400, inbound: 32000,  netFlow: 13600,  topDestination: 'ES', topOrigin: 'BE', reimbursedMillEUR: 58.4, mainReasons: ['Dental', 'Ophthalmology', 'Orthopedics'], avgWaitHome: 20, population: 67.8 },
  { code: 'ES', name: 'Spain',       region: 'Southern', outbound: 22400, inbound: 44000,  netFlow: 21600,  topDestination: 'FR', topOrigin: 'UK', reimbursedMillEUR: 42.4, mainReasons: ['Orthopedics', 'Cardiac', 'Oncology'], avgWaitHome: 36, population: 47.4 },
  { code: 'IT', name: 'Italy',       region: 'Southern', outbound: 28400, inbound: 12000,  netFlow: -16400, topDestination: 'DE', topOrigin: 'DE', reimbursedMillEUR: 68.8, mainReasons: ['Cardiac', 'Oncology', 'Neurosurgery'], avgWaitHome: 48, population: 59.6 },
  { code: 'PT', name: 'Portugal',    region: 'Southern', outbound: 16800, inbound: 8200,   netFlow: -8600,  topDestination: 'ES', topOrigin: 'UK', reimbursedMillEUR: 38.4, mainReasons: ['Oncology', 'Cardiac', 'Fertility'], avgWaitHome: 42, population: 10.3 },
  { code: 'GR', name: 'Greece',      region: 'Southern', outbound: 24800, inbound: 4200,   netFlow: -20600, topDestination: 'DE', topOrigin: 'DE', reimbursedMillEUR: 48.8, mainReasons: ['Cardiac', 'Oncology', 'Neurosurgery'], avgWaitHome: 54, population: 10.7 },
  { code: 'PL', name: 'Poland',      region: 'Eastern',  outbound: 18800, inbound: 6800,   netFlow: -12000, topDestination: 'DE', topOrigin: 'DE', reimbursedMillEUR: 28.4, mainReasons: ['Dental', 'Orthopedics', 'Cardiac'], avgWaitHome: 38, population: 37.9 },
  { code: 'HU', name: 'Hungary',     region: 'Eastern',  outbound: 12400, inbound: 28000,  netFlow: 15600,  topDestination: 'AT', topOrigin: 'AT', reimbursedMillEUR: 18.8, mainReasons: ['Dental', 'Ophthalmology', 'Fertility'], avgWaitHome: 32, population: 9.7 },
  { code: 'CZ', name: 'Czechia',     region: 'Eastern',  outbound: 8800,  inbound: 22000,  netFlow: 13200,  topDestination: 'DE', topOrigin: 'DE', reimbursedMillEUR: 14.4, mainReasons: ['Dental', 'Ophthalmology', 'Orthopedics'], avgWaitHome: 28, population: 10.9 },
  { code: 'RO', name: 'Romania',     region: 'Eastern',  outbound: 32400, inbound: 2800,   netFlow: -29600, topDestination: 'DE', topOrigin: 'MD', reimbursedMillEUR: 38.8, mainReasons: ['Cardiac', 'Oncology', 'Neurosurgery'], avgWaitHome: 52, population: 19.0 },
  { code: 'BG', name: 'Bulgaria',    region: 'Eastern',  outbound: 28800, inbound: 2400,   netFlow: -26400, topDestination: 'DE', topOrigin: 'TR', reimbursedMillEUR: 22.4, mainReasons: ['Cardiac', 'Oncology', 'Orthopedics'], avgWaitHome: 48, population: 6.5 },
  { code: 'EE', name: 'Estonia',     region: 'Northern', outbound: 4800,  inbound: 3200,   netFlow: -1600,  topDestination: 'FI', topOrigin: 'FI', reimbursedMillEUR: 8.8, mainReasons: ['Dental', 'Orthopedics', 'Ophthalmology'], avgWaitHome: 22, population: 1.3 },
]

export const TOP_FLOWS: FlowRoute[] = [
  { from:'IT', to:'DE', patients:8400, avgCostEUR:12400, topProcedure:'Cardiac surgery', waitTimeSaving:28 },
  { from:'GR', to:'DE', patients:7200, avgCostEUR:11800, topProcedure:'Cardiac/Oncology', waitTimeSaving:32 },
  { from:'RO', to:'DE', patients:9800, avgCostEUR:9400, topProcedure:'Cardiac/Oncology', waitTimeSaving:30 },
  { from:'PL', to:'DE', patients:6800, avgCostEUR:8800, topProcedure:'Orthopedics', waitTimeSaving:18 },
  { from:'HU', to:'AT', patients:6200, avgCostEUR:4200, topProcedure:'Dental/Ophthalmology', waitTimeSaving:14 },
  { from:'NL', to:'BE', patients:5800, avgCostEUR:14800, topProcedure:'Oncology', waitTimeSaving:12 },
  { from:'SE', to:'DE', patients:4800, avgCostEUR:16200, topProcedure:'Cardiology', waitTimeSaving:14 },
  { from:'FI', to:'SE', patients:4200, avgCostEUR:8800, topProcedure:'Ophthalmology', waitTimeSaving:10 },
  { from:'NO', to:'SE', patients:5200, avgCostEUR:12400, topProcedure:'Orthopedics', waitTimeSaving:8 },
  { from:'BG', to:'DE', patients:7200, avgCostEUR:9800, topProcedure:'Cardiac/Oncology', waitTimeSaving:28 },
]

export function getFlowTier(c: CountryFlow): 'MAJOR_SENDER' | 'SENDER' | 'BALANCED' | 'RECEIVER' | 'MAJOR_RECEIVER' {
  const ratio = c.netFlow / ((c.inbound + c.outbound) / 2 || 1)
  if (ratio > 1.5) return 'MAJOR_RECEIVER'
  if (ratio > 0.2) return 'RECEIVER'
  if (ratio > -0.2) return 'BALANCED'
  if (ratio > -1.5) return 'SENDER'
  return 'MAJOR_SENDER'
}

export const FLOW_TIER_COLORS = {
  MAJOR_RECEIVER: '#059669', RECEIVER: '#2563eb',
  BALANCED: '#6b7280', SENDER: '#d97706', MAJOR_SENDER: '#dc2626',
}
