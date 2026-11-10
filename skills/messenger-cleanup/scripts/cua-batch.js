/** Reference adapter for a host exposing CUA tab.getAXState + tab.playwright.
 * Experimental: not executed against a real account as part of this release.
 * Caller must validate current host APIs and authorize the precise range first.
 * This intentionally rejects duplicate labels and unresolved timestamps.
 */
export async function runCuaBatch(tab, {start,end,parseDisplayedDate,verifyChat,limit=5,shouldStop=()=>false}) {
 const low=Date.parse(start),high=Date.parse(end);
 if(!Number.isFinite(low)||!Number.isFinite(high)||low>high||!Number.isInteger(limit)||limit<1||limit>20)throw Error('Invalid bounded batch');
 if(typeof parseDisplayedDate!=='function'||typeof verifyChat!=='function')throw Error('Explicit date resolver and chat verification are required');
 const receipts=[];
 for(let i=0;i<limit&&!shouldStop();i++){
  if(!await verifyChat(tab))throw Error('Wrong or unverified chat');
  let state=await tab.getAXState({emit:false,disableDiffing:true});
  if(state.includes('toolbar Message actions'))throw Error('Resolve the already selected message before resuming');
  const rows=[...state.matchAll(/^\s*(\d+) button Enter, Message sent (.+?) by (.+)$/gm)];
  const candidates=rows.filter(r=>{const t=parseDisplayedDate(r[2]);if(!Number.isFinite(t))throw Error('Unresolved displayed date');return t>=low&&t<=high;});
  if(!candidates.length)return{receipts,status:'inspect-boundary'};
  const row=candidates[0],label=row[0].trim().replace(/^\d+ button /,'');
  if(rows.filter(r=>r[0].trim().replace(/^\d+ button /,'')===label).length!==1)throw Error('Ambiguous message identity');
  await tab.click(Number(row[1]));
  state=await tab.getAXState({emit:false,disableDiffing:true});
  if(!state.includes('toolbar Message actions'))throw Error('Target did not open; inspect before retrying');
  await tab.playwright.getByRole('button',{name:'More actions',exact:true}).click();
  await tab.playwright.getByRole('menuitem',{name:/^(Unsend message|Remove message)$/}).click();
  let dialog=await tab.playwright.domSnapshot();
  if(dialog.includes('radio "Unsend for you"')){
   await tab.playwright.getByRole('radio',{name:'Unsend for you',exact:true}).check();
   dialog=await tab.playwright.domSnapshot();
   if(!/radio "Unsend for you" \[checked\]/.test(dialog))throw Error('Self-only selection not confirmed');
  }else if(!dialog.includes('dialog "Remove for you"'))throw Error('Unexpected removal scope');
  if(shouldStop()||!await verifyChat(tab))throw Error('Stopped before confirming removal; inspect open dialog');
  await tab.playwright.getByRole('button',{name:'Remove',exact:true}).click();
  state=await tab.getAXState({emit:false,disableDiffing:true});
  if(state.includes(label)||state.includes('toolbar Message actions')||state.includes('dialog Remove for you'))throw Error('Outcome uncertain; do not automatically retry or charge');
  receipts.push({sequence:i+1,confirmedAt:new Date().toISOString(),scope:'self'});
 }
 return{receipts,status:shouldStop()?'paused':'batch-complete'};
}
