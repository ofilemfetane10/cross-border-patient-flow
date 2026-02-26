import { NextResponse } from 'next/server'
import { FLOW_DATA, TOP_FLOWS, getFlowTier } from '@/lib/data'

export async function GET() {
  const enriched = FLOW_DATA.map(c => ({ ...c, tier: getFlowTier(c) }))
    .sort((a, b) => Math.abs(b.netFlow) - Math.abs(a.netFlow))
  const totalOutbound = enriched.reduce((s, c) => s + c.outbound, 0)
  const totalReimbursed = Math.round(enriched.reduce((s, c) => s + c.reimbursedMillEUR, 0))
  return NextResponse.json({ data: enriched, topFlows: TOP_FLOWS, totalOutbound, totalReimbursed })
}
