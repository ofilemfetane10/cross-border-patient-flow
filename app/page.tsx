'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from 'recharts'
import { FLOW_TIER_COLORS } from '@/lib/data'

interface Country { code:string; name:string; region:string; outbound:number; inbound:number; netFlow:number; topDestination:string; topOrigin:string; reimbursedMillEUR:number; mainReasons:string[]; avgWaitHome:number; population:number; tier:string }
interface FlowRoute { from:string; to:string; patients:number; avgCostEUR:number; topProcedure:string; waitTimeSaving:number }

const TIER_CONFIG: Record<string,{label:string; color:string}> = {
  MAJOR_RECEIVER: { label: 'Major Receiver', color: '#3fb950' },
  RECEIVER:       { label: 'Net Receiver',   color: '#58a6ff' },
  BALANCED:       { label: 'Balanced',       color: '#8b949e' },
  SENDER:         { label: 'Net Sender',     color: '#d29922' },
  MAJOR_SENDER:   { label: 'Major Sender',   color: '#f85149' },
}

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return <div style={{ background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:6, padding:'10px 14px', fontFamily:'IBM Plex Mono', fontSize:11 }}>
    <div style={{ color:'var(--text-mid)', marginBottom:6 }}>{label}</div>
    {payload.map((p:any) => <div key={p.name} style={{ display:'flex', justifyContent:'space-between', gap:16 }}><span style={{ color:p.color||'var(--blue)' }}>{p.name}</span><span style={{ color:'var(--text)' }}>{typeof p.value==='number'?p.value.toLocaleString():p.value}</span></div>)}
  </div>
}

export default function Home() {
  const [data, setData] = useState<Country[]>([])
  const [topFlows, setTopFlows] = useState<FlowRoute[]>([])
  const [sel, setSel] = useState<string|null>('DE')
  const [view, setView] = useState<'flows'|'routes'|'wait'>('flows')
  const [totalOutbound, setTotalOutbound] = useState(0)
  const [totalReimbursed, setTotalReimbursed] = useState(0)

  useEffect(() => {
    fetch('/api/flow').then(r=>r.json()).then(j => {
      setData(j.data); setTopFlows(j.topFlows)
      setTotalOutbound(j.totalOutbound); setTotalReimbursed(j.totalReimbursed)
    })
  }, [])

  const selected = data.find(d=>d.code===sel)
  const receivers = data.filter(d=>d.netFlow>0).length
  const senders = data.filter(d=>d.netFlow<0).length

  const netFlowBar = [...data].sort((a,b)=>b.netFlow-a.netFlow).map(d=>({ name:d.code, value:d.netFlow, tier:d.tier }))
  const waitScatter = data.map(d=>({ name:d.name, code:d.code, wait:d.avgWaitHome, out:d.outbound/d.population, tier:d.tier }))

  if (!data.length) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', color:'var(--text-mid)', fontFamily:'IBM Plex Mono' }}>Loading patient flow data...</div>

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <header style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', padding:'20px 32px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="lbl" style={{ marginBottom:8 }}>EU DIRECTIVE 2011/24/EU · EHIC · {data.length} COUNTRIES · 2022</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
            <div>
              <h1 style={{ fontSize:'clamp(20px,3vw,36px)', fontWeight:600, lineHeight:1.1, letterSpacing:'-0.01em' }}>
                Cross-Border Patient<br/><span style={{ color:'var(--blue)' }}>Flow Tracker</span>
              </h1>
              <p style={{ fontSize:13, color:'var(--text-mid)', marginTop:8, maxWidth:460, lineHeight:1.6 }}>
                Mapping patient mobility under the EU Cross-Border Healthcare Directive — where patients travel, why, how much is reimbursed, and which systems drive demand.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {[
                {l:'Total outbound',v:totalOutbound.toLocaleString(),c:'var(--amber)'},
                {l:'Net receivers',v:receivers,c:'var(--green)'},
                {l:'Net senders',v:senders,c:'var(--red)'},
                {l:'Reimbursed €M',v:'€'+totalReimbursed+'M',c:'var(--blue)'},
              ].map(s=>(
                <div key={s.l} className="panel" style={{ padding:'12px 16px' }}>
                  <div className="lbl" style={{ marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:'IBM Plex Mono', fontSize:22, fontWeight:500, color:s.c, lineHeight:1 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'24px 32px', display:'flex', flexDirection:'column', gap:20 }}>
        {/* View tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          {[{id:'flows',l:'Net Patient Flows'},{id:'routes',l:'Top Routes'},{id:'wait',l:'Wait Time Driver'}].map(v=>(
            <button key={v.id} onClick={()=>setView(v.id as any)} style={{ fontFamily:'IBM Plex Sans', fontSize:12, fontWeight:500, padding:'6px 14px', borderRadius:6, cursor:'pointer', border:`1px solid ${view===v.id?'var(--blue)':'var(--border)'}`, background:view===v.id?'var(--blue-dim)':'transparent', color:view===v.id?'var(--blue)':'var(--text-mid)' }}>{v.l}</button>
          ))}
          <div style={{ marginLeft:'auto', display:'flex', gap:10, flexWrap:'wrap' }}>
            {Object.entries(TIER_CONFIG).map(([k,v])=>(
              <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:8,height:8,borderRadius:2,background:v.color,display:'inline-block' }}/>
                <span style={{ fontFamily:'IBM Plex Mono', fontSize:9, color:'var(--text-dim)', textTransform:'uppercase' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:sel?'1fr 320px':'1fr', gap:20, alignItems:'start' }}>
          <div>
            {view==='flows' && (
              <div className="panel animate-in" style={{ padding:20 }}>
                <div className="lbl" style={{ marginBottom:12 }}>Net Patient Flow — Positive = Net Receiver · Negative = Net Sender</div>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={netFlowBar} margin={{ left:-10, right:10 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false}/>
                    <XAxis dataKey="name" tick={{ fill:'var(--text-dim)', fontSize:9, fontFamily:'IBM Plex Mono' }}/>
                    <YAxis tick={{ fill:'var(--text-dim)', fontSize:9, fontFamily:'IBM Plex Mono' }} tickFormatter={v=>v.toLocaleString()}/>
                    <Tooltip content={<Tip/>}/>
                    <ReferenceLine y={0} stroke="var(--border2)"/>
                    <Bar dataKey="value" name="Net flow (patients)" radius={[3,3,0,0]}>
                      {netFlowBar.map((d,i)=><Cell key={i} fill={d.value>0?'var(--green)':'var(--red)'} opacity={0.85}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {view==='routes' && (
              <div className="panel animate-in" style={{ padding:20 }}>
                <div className="lbl" style={{ marginBottom:16 }}>Top 10 Cross-Border Patient Routes — EU Directive 2022</div>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid var(--border2)' }}>
                      {['Route','Patients/yr','Avg Cost','Top Procedure','Weeks Saved'].map(h=>(
                        <th key={h} style={{ padding:'8px 12px', textAlign:'left', fontFamily:'IBM Plex Mono', fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-dim)', fontWeight:400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topFlows.map((f,i)=>(
                      <tr key={i} className="row">
                        <td style={{ padding:'12px 12px' }}>
                          <div className="flow-arrow">
                            <span style={{ fontWeight:600, color:'var(--red)', fontSize:13 }}>{f.from}</span>
                            <span style={{ color:'var(--text-dim)' }}>→</span>
                            <span style={{ fontWeight:600, color:'var(--green)', fontSize:13 }}>{f.to}</span>
                          </div>
                        </td>
                        <td style={{ padding:'12px', fontFamily:'IBM Plex Mono', fontSize:12, color:'var(--amber)' }}>{f.patients.toLocaleString()}</td>
                        <td style={{ padding:'12px', fontFamily:'IBM Plex Mono', fontSize:12, color:'var(--text-mid)' }}>€{f.avgCostEUR.toLocaleString()}</td>
                        <td style={{ padding:'12px', fontSize:12, color:'var(--text)' }}>{f.topProcedure}</td>
                        <td style={{ padding:'12px', fontFamily:'IBM Plex Mono', fontSize:12, color:'var(--blue)' }}>−{f.waitTimeSaving}w</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {view==='wait' && (
              <div className="panel animate-in" style={{ padding:20 }}>
                <div className="lbl" style={{ marginBottom:6 }}>Waiting Time vs Outbound Patients per Million</div>
                <p style={{ fontSize:11, color:'var(--text-mid)', marginBottom:16 }}>Countries with longer waits send more patients abroad — validating the Directive's intent to alleviate capacity pressure.</p>
                <ResponsiveContainer width="100%" height={320}>
                  <ScatterChart margin={{ top:10, right:20, bottom:20, left:-10 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="var(--border)"/>
                    <XAxis dataKey="wait" name="Avg wait weeks" type="number" tick={{ fill:'var(--text-dim)', fontSize:9, fontFamily:'IBM Plex Mono' }} label={{ value:'Avg wait weeks (elective)', position:'insideBottom', offset:-10, fill:'var(--text-dim)', fontSize:10 }}/>
                    <YAxis dataKey="out" name="Outbound /million" type="number" tick={{ fill:'var(--text-dim)', fontSize:9, fontFamily:'IBM Plex Mono' }} label={{ value:'Outbound patients /million pop', angle:-90, position:'insideLeft', fill:'var(--text-dim)', fontSize:10 }}/>
                    <Tooltip cursor={{ strokeDasharray:'3 3' }} content={({active,payload})=>{
                      if(!active||!payload?.length) return null
                      const d=payload[0].payload
                      return <div style={{ background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:6, padding:'10px 14px', fontFamily:'IBM Plex Mono', fontSize:11 }}>
                        <div style={{ fontFamily:'IBM Plex Sans', fontWeight:600, marginBottom:4, color:'var(--text)' }}>{d.name}</div>
                        <div style={{ color:'var(--amber)' }}>Avg wait: {d.wait} weeks</div>
                        <div style={{ color:'var(--blue)' }}>Outbound: {d.out.toFixed(1)}/million</div>
                      </div>
                    }}/>
                    <Scatter data={waitScatter} onClick={(d:any)=>setSel(d.code)}>
                      {waitScatter.map((d,i)=><Cell key={i} fill={FLOW_TIER_COLORS[d.tier as keyof typeof FLOW_TIER_COLORS]||'#58a6ff'} opacity={0.85} r={7}/>)}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {sel && selected && (
            <div className="panel animate-in" style={{ padding:20 }}>
              <div style={{ borderBottom:'1px solid var(--border)', paddingBottom:14, marginBottom:16, display:'flex', justifyContent:'space-between' }}>
                <div>
                  <div className="lbl" style={{ marginBottom:4 }}>{selected.region}</div>
                  <h2 style={{ fontSize:20, fontWeight:600, color:'var(--text)' }}>{selected.name}</h2>
                  <span className="badge" style={{ color:TIER_CONFIG[selected.tier]?.color||'#8b949e', borderColor:(TIER_CONFIG[selected.tier]?.color||'#8b949e')+'44', marginTop:6, display:'inline-block' }}>{TIER_CONFIG[selected.tier]?.label||selected.tier}</span>
                </div>
                <button onClick={()=>setSel(null)} style={{ color:'var(--text-dim)', fontSize:20, background:'none', border:'none', cursor:'pointer' }}>×</button>
              </div>

              {[
                { l:'Outbound patients', v:selected.outbound.toLocaleString(), c:'var(--red)' },
                { l:'Inbound patients', v:selected.inbound.toLocaleString(), c:'var(--green)' },
                { l:'Net flow', v:(selected.netFlow>0?'+':'')+selected.netFlow.toLocaleString(), c:selected.netFlow>0?'var(--green)':'var(--red)' },
                { l:'Reimbursed', v:'€'+selected.reimbursedMillEUR+'M', c:'var(--blue)' },
                { l:'Top destination', v:selected.topDestination, c:'var(--text)' },
                { l:'Top origin', v:selected.topOrigin, c:'var(--text)' },
                { l:'Avg wait home', v:selected.avgWaitHome+' weeks', c:selected.avgWaitHome>36?'var(--red)':'var(--amber)' },
              ].map(m=>(
                <div key={m.l} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
                  <span className="lbl" style={{ alignSelf:'center' }}>{m.l}</span>
                  <span style={{ fontFamily:'IBM Plex Mono', fontSize:13, fontWeight:500, color:m.c }}>{m.v}</span>
                </div>
              ))}

              <div style={{ marginTop:14 }}>
                <div className="lbl" style={{ marginBottom:8 }}>Main reasons for travel</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                  {selected.mainReasons.map((r,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 10px', background:'var(--surface2)', borderRadius:4, border:'1px solid var(--border)', fontSize:12, color:'var(--text-mid)' }}>
                      <span style={{ color:'var(--blue)', fontFamily:'IBM Plex Mono', fontSize:10 }}>{i+1}.</span> {r}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop:14, padding:12, background:'var(--surface2)', borderRadius:6, border:'1px solid var(--border)' }}>
                <div className="lbl" style={{ marginBottom:6 }}>Policy Context</div>
                <p style={{ fontSize:11, lineHeight:1.7, color:'var(--text-mid)' }}>
                  {selected.netFlow > 20000 && `${selected.name} is a major destination for European patients — attracting ${selected.inbound.toLocaleString()} inbound patients annually. Strong health system capacity, specialised facilities, and competitive waiting times drive this pattern. EU Directive reimbursement flows reflect this hub status.`}
                  {selected.netFlow > 0 && selected.netFlow <= 20000 && `${selected.name} is a net receiver of cross-border patients, reflecting capacity advantages in specific procedures. The ${selected.inbound.toLocaleString()} inbound patients generate revenue while the ${selected.outbound.toLocaleString()} outbound reflect niche specialisation gaps.`}
                  {selected.netFlow < 0 && selected.netFlow >= -15000 && `${selected.name} sends more patients abroad than it receives — primarily due to ${selected.avgWaitHome}-week average waiting times for elective procedures. EU Directive reimbursement of €${selected.reimbursedMillEUR}M annually reflects this pressure.`}
                  {selected.netFlow < -15000 && `${selected.name} is a major net sender of patients — ${selected.outbound.toLocaleString()} leave annually, primarily to ${selected.topDestination}. With average waits of ${selected.avgWaitHome} weeks, patients exercise their EU Directive rights to seek timely care abroad, generating €${selected.reimbursedMillEUR}M in reimbursement claims.`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Country chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {data.map(c=>(
            <button key={c.code} onClick={()=>setSel(sel===c.code?null:c.code)} style={{ fontFamily:'IBM Plex Mono', fontSize:9, padding:'4px 10px', borderRadius:4, border:`1px solid ${(TIER_CONFIG[c.tier]?.color||'#8b949e')+'44'}`, background:sel===c.code?(TIER_CONFIG[c.tier]?.color||'#8b949e')+'22':'transparent', color:sel===c.code?(TIER_CONFIG[c.tier]?.color||'#8b949e'):(TIER_CONFIG[c.tier]?.color||'#8b949e')+'88', cursor:'pointer' }}>{c.code}</button>
          ))}
        </div>
        <div className="lbl" style={{ paddingTop:16, borderTop:'1px solid var(--border)', lineHeight:1.8 }}>Sources: EU Cross-Border Healthcare Directive 2011/24/EU Annual Reports · EHIC Claims Data · Eurostat · Year: 2022</div>
      </div>
    </div>
  )
}
