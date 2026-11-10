# Quiet Sweep — launch pricing and cost model

Prepared November 9, 2026. USD. Recommended test prices, not observed willingness to pay. US domestic-card payment assumptions; tax, foreign-card and currency-conversion costs excluded.

## Recommendation

Launch a local-browser, script-first product with these one-time options:

| Offer | Confirmed removals | Price | Estimated fulfillment cost | Contribution | Contribution margin |
|---|---:|---:|---:|---:|---:|
| One chat / one selected range | Up to 500 | $4.99 | $2.02 | $2.97 | 59.5% |
| Message credits, usable across chats | 2,000 | $9.99 | $3.39 | $6.60 | 66.1% |
| Message credits, usable across chats | 5,000 | $19.99 | $6.13 | $13.86 | 69.3% |
| Larger bundle, after pilot validation | 10,000 | $34.99 | $10.56 | $24.43 | 69.8% |

Provide a preview before purchase. One credit means one confirmed self-only removal, including an attachment message as one item. Define grouped attachments consistently before launch. Charge no credits for skipped or unverified outcomes. Keep remaining paid credits after a pause. Do not offer unlimited cleanup at these prices.

## Verified vendor rates

- Stripe standard US domestic cards: 2.9% + $0.30 per successful transaction. https://stripe.com/pricing
- Claude Sonnet 5.5 direct API baseline: $2 / million input tokens and $10 / million output tokens. Model rates may change; this is a costing example, not a dependency requirement. https://platform.claude.com/docs/en/about-claude/pricing
- Browserbase Developer: $20/month, 100 included browser-hours, then $0.12/browser-hour; proxy overage separate. https://www.browserbase.com/pricing

## Explicit operating assumptions — not measured production costs

The existing product is a demo. No production API-token invoice, support distribution, conversion rate, refund rate, or acquisition cost has been measured.

1. Routine removal runs locally in the customer's browser. Vendor browser cost is therefore $0 per removal; customer device/time costs remain.
2. AI allowance: 100,000 input + 10,000 output tokens per 1,000 messages, or $0.30. This budget covers occasional batches/recovery, not an AI round-trip for each message. Additional setup allowance: $0.10/chat.
3. Backend variable allocation: $0.15 / 1,000 messages, a provisional budget for job metadata, licensing and logs. Fixed operating budget is separate.
4. Average support provision: $1/order, equivalent to 20% of orders needing 10 minutes at $30/hour. Not every order is assumed to need live assistance.
5. Refund/failure allowance: 5% of revenue. This is a planning reserve, not a measured loss rate or complete chargeback provision.
6. Full bundle redemption. Credit bundles assume 500 messages per chat on average: 4, 10 and 20 chats respectively. More fragmented usage costs more; each extra chat adds the assumed $0.10 setup budget.

Formula:

`variable cost = (price × 0.029 + 0.30) + (messages/1000 × 0.30 + chats × 0.10) + messages/1000 × 0.15 + 1.00 + price × 0.05`

`contribution = price − variable cost`

Contribution is before fixed costs, owner/developer labor, tax, marketing, legal/compliance and other overhead. It is not net profit.

## Worked example: 2,000 credits at $9.99

| Cost | Amount |
|---|---:|
| Stripe fee | $0.58971 |
| AI usage and four chat setups | $1.00 |
| Backend variable allocation | $0.30 |
| Expected support allowance | $1.00 |
| 5% failure/refund reserve | $0.49950 |
| Total | $3.38921 |
| Contribution before fixed costs and acquisition | $6.60079 |

## Sensitivity

For the $9.99 bundle:
- If average support reaches 10 minutes on every order at $30/hour, support becomes $5 rather than $1; contribution falls to $2.60.
- If AI cost rises from $1 to $5/order, contribution similarly falls to $2.60.
- If both happen, contribution becomes approximately -$1.40 before overhead.
- If a separate AI decision consumes 10,000 uncached input and 500 output tokens per message, AI costs $0.025/message, or $50 for 2,000 messages. None of these low-price plans can support that architecture. This is an illustrative scenario, not the historical conversation's measured token usage.
- A 2,000-credit bundle spread over 100 small chats rather than four adds $9.60 in assumed setup cost and becomes unprofitable. Avoid a per-chat AI setup call where deterministic validation suffices; measure fragmentation in the pilot.

## Optional cloud-browser economics

For a conservative illustration, assume 6 seconds of browser-active time/message plus 25% retries, or 2.083 browser-hours per 1,000 messages. At $0.12 marginal/browser-hour this adds $0.25 per 1,000 messages ($0.50 per 2,000), after included plan usage is exhausted. Do not charge the first included hours again; account for the $20 base subscription separately.

Earlier real cleanup batches varied substantially: one 22-message two-tab batch took about 23 seconds, while slower batches took several seconds per removal. Those were not controlled production benchmarks. Two browsers reduce wall-clock time but their billed active hours add together. The demo's artificial timing is not evidence of real Messenger speed. Proxy bandwidth, model tokens, retries, and session limits require separate budgeting.

## Monthly viability

Use $100/month as a provisional fixed software operating budget, not a provider quote. At the $9.99 plan's $6.60079 contribution, 16 fully redeemed orders cover $100 before marketing and owner labor.

At 100 such orders/month:
- Revenue: $999.00
- Estimated variable cost: $338.92
- Contribution: $660.08
- Less assumed $100 fixed costs: $560.08 before advertising, tax and owner labor.
- With $3 acquisition cost/order: $260.08 remains before tax and owner labor.

If ongoing maintenance requires 8 hours/month at $30/hour, add $240 fixed labor; the break-even at $3 acquisition/order becomes about 95 orders/month. These are scenarios, not forecasts.

## Market check

CleanMySocial advertises related Facebook/Instagram cleanup at $5.99 for three days, $11.99/month, or $34.99 lifetime. Its scope and reliability are not evaluated here, and some tools delete whole conversations rather than selected individual messages. This provides a price anchor, not proof that customers will prefer per-message credits.

Source: https://www.cleanmysocial.com/pricing

## Launch decision

Start with $4.99 and $9.99; offer $19.99 as the larger option. Hold the 10,000-credit tier until reliability, long jobs, and support burden are measured. Test 30–50 paid pilot orders before claiming validated unit economics. Track actual tokens, active runtime, confirmed/failed removals, chat fragmentation, support minutes, refunds and acquisition cost.

Price the software and convenience, not the skill markdown alone. A public MIT-licensed skill can be copied; charging for a managed interface, entitlements, support and maintained integration is a separate product. The prototype still needs a production runner, trusted billing/reconciliation, authentication and platform review before accepting money.
