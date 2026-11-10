/** Host-independent planner and credit ledger. No browser access or payment processing. */
export function plan(messages,{chatId,start,end}) {
 const low=Date.parse(start),high=Date.parse(end);
 if(!chatId||!Number.isFinite(low)||!Number.isFinite(high)||low>high)throw new Error('Choose a valid chat and date range.');
 const seen=new Set();
 return messages.filter(m=>{if(seen.has(m.id))throw new Error('Duplicate message identity.');seen.add(m.id);const time=Date.parse(m.at);return m.chatId===chatId&&Number.isFinite(time)&&time>=low&&time<=high&&!m.removed;}).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at)||a.id.localeCompare(b.id));
}
export function splitPlan(items){const middle=Math.ceil(items.length/2);return[items.slice(0,middle),items.slice(middle).reverse()];}
export class Ledger {
 constructor(credits=0){if(!Number.isInteger(credits)||credits<0)throw new Error('Invalid credits');this.balance=credits;this.receipts=new Map();this.pending=new Set();}
 add(amount){if(!Number.isInteger(amount)||amount<1)throw new Error('Invalid credits');this.balance+=amount;}
 reserve(messageId){if(this.receipts.has(messageId)||this.pending.has(messageId))return false;if(this.balance-this.pending.size<1)throw new Error('No credits available');this.pending.add(messageId);return true;}
 release(messageId){this.pending.delete(messageId);}
 confirm(messageId,proof){if(this.receipts.has(messageId))return false;if(!proof?.removed||proof.scope!=='self')throw new Error('Removal is not confirmed for your view.');if(this.balance<1)throw new Error('No credits available');this.pending.delete(messageId);this.balance--;this.receipts.set(messageId,{messageId,scope:'self',confirmedAt:new Date().toISOString()});return true;}
}
/** Adapter must be bound to the authorized chat. UI authorization must occur before calling. */
export async function removeOne(adapter,message,ledger){
 if(!ledger.reserve(message.id))return{duplicate:true};
 try{
 if(await adapter.chatId()!==message.chatId)throw new Error('The active chat changed.');
 const confirmation=await adapter.openRemoval(message);
 if(confirmation.scope!=='self')throw new Error('Only removal from your own view is supported.');
 // Recheck identity immediately before the irreversible action.
 if(await adapter.chatId()!==message.chatId)throw new Error('The active chat changed.');
 await adapter.confirmRemoval(message);
 const removed=await adapter.isRemoved(message);
 if(!removed)throw new Error('Removal could not be verified. No credit was used.');
 ledger.confirm(message.id,{removed,scope:'self'});
 return{removed:true};
 }finally{ledger.release(message.id);}
}
