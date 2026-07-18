# How We Govern Lead Times Across Procurement, Production, Warehouse and Transportation

**Reviewed: 15 July 2026**

What exactly are we promising when we say the lead time is 12 days?

Twelve days from which event?

- purchase requisition to purchase order;
- purchase order to supplier dispatch;
- dispatch to arrival at the Plant;
- arrival at the gate to goods receipt;
- goods receipt to unrestricted stock;
- warehouse stock to production staging;
- production start to finished product;
- finished product to customer delivery?

And which calendar do those twelve days use?

Supplier working days?

Carrier operating days?

Plant production days?

Warehouse receiving days?

Ordinary calendar days?

A planning system can contain the value `12`.

A purchasing system can contain another value `12`.

A transport lane can contain `3`.

The warehouse can add `1`.

The production model can add `4`.

Every number can be technically valid.

The resulting promise can still be impossible.

> Lead time is not one field. It is a chain of governed time commitments between events, locations, organisations and business processes.

This matters because lead-time defects rarely appear as master-data errors.

They appear as:

- purchase orders arriving later than planned;
- materials available in the system but not physically usable;
- production shortages despite apparently sufficient planning coverage;
- excess safety stock;
- transport plans that cannot meet requested dates;
- customer promises that depend on incompatible calendars;
- planners compensating manually for unreliable system dates.

The normal response is to adjust the number.

Procurement adds two days.

Planning adds a buffer.

The warehouse keeps an offline spreadsheet.

Transportation maintains a different duration.

Customer service stops trusting calculated dates.

The system continues to plan.

The organisation no longer knows what the plan means.

Martenweave should not replace SAP Integrated Business Planning, SAP Transportation Management, SAP EWM or S/4HANA scheduling.

Its role is to govern the assumptions those systems consume:

- what each lead-time component means;
- which events it connects;
- which scope it applies to;
- which calendar it uses;
- who owns it;
- where the current value came from;
- which systems use it;
- what changes when it is modified;
- which Evidence proves that it remains realistic.

Martenweave Core already provides the relevant architectural foundation. It turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-reviewed patch proposals. Its generic model includes entities, relationships, mappings, Rules, Evidence and Decisions.

The logistics extension is to treat time assumptions as governed model relationships rather than scattered numeric attributes.

# Our running case

We use one externally procured production component.

```
Material:
AX-4711

Description:
Steering Module Assembly

Supplier:
SUP-100

Supplier location:
Brno

Receiving Plant:
DE10

Warehouse:
EWM-WH01

Production line:
Assembly Line 2
```

The planning team says the replenishment lead time is 12 days.

The value was copied from the legacy planning system.

We decompose it.

```
Purchase-order processing:
1 working day

Supplier preparation:
5 supplier working days

Outbound handling:
1 supplier working day

Transport:
2 calendar days

Inbound appointment wait:
1 warehouse working day

Goods receipt and quality release:
1 Plant working day

Warehouse putaway and availability:
1 warehouse working day
```

The arithmetic gives 12 days.

The actual result depends on where the order starts.

If the purchase order is released on a Thursday afternoon:

- the supplier may not begin preparation until Friday;
- the supplier does not work on Saturday;
- the carrier departs only on scheduled weekdays;
- the Plant is closed for a local holiday;
- the warehouse has no appointment capacity on arrival;
- quality release completes the next working day.

The material may become production-available after 16 calendar days.

The value `12` was not necessarily wrong.

Its semantics were incomplete.

# The first problem: different teams use the same term for different intervals

Procurement may define supplier lead time as:

```
Purchase order sent
→ goods received
```

A supplier may define it as:

```
Confirmed order received
→ goods ready for collection
```

Transportation may define transit time as:

```
Carrier departure
→ arrival at destination gate
```

Warehouse operations may define inbound processing as:

```
Truck arrival
→ stock available in storage
```

Production planning may use one combined duration:

```
Planning requirement
→ material available for production
```

All are called lead time.

They do not measure the same interval.

Managers often ask teams to harmonise the values before harmonising the definitions.

That creates false standardisation.

For AX-4711:

```
Supplier lead time:
5 days

Procurement lead time:
8 days

Total replenishment lead time:
12 days
```

These values can coexist if their start and end events are explicit.

They become contradictory when the event boundaries are hidden.

# The management solution: model lead time as an edge between events

A lead-time component should state:

```
Start event
→ end event
```

For example:

```
Purchase order acknowledged
→ goods ready for pickup
```

Another component:

```
Goods picked up
→ vehicle arrives at Plant gate
```

Another:

```
Vehicle arrives
→ stock available for production
```

The lead time belongs to the transition, not simply to the material.

This gives us a process chain.

```
Planning requirement created
→ purchase requisition released
→ purchase order sent
→ order acknowledged
→ goods ready
→ carrier pickup
→ Plant arrival
→ goods receipt
→ quality release
→ putaway
→ production availability
```

We can now determine which components are included in a specific promise.

# The second problem: the lead time is attached to the wrong grain

The same material can have different lead times depending on:

- supplier;
- supplier location;
- receiving Plant;
- mode of transport;
- warehouse;
- quantity;
- season;
- order type;
- production process;
- effective date.

A single global material value cannot safely represent all combinations.

For AX-4711:

```
Supplier SUP-100 from Brno to DE10:
12 days

Backup supplier SUP-200 from Shanghai to DE10:
46 days

SUP-100 expedited road service:
8 days

SUP-100 standard service to another Plant:
15 days
```

If the canonical model stores:

```
AX-4711 lead time = 12
```

it loses the sourcing and logistics context.

The appropriate grain may be:

```
Material
+
supplier
+
origin
+
destination
+
transport mode
+
process
+
effective period
```

This is why lead-time governance belongs in a relationship model.

# The third problem: planning and execution use different time models

Planning systems need simplified assumptions.

Execution systems handle specific orders, departures, appointments and events.

The simplification is necessary.

The danger appears when the planning assumption is presented as operational fact.

SAP Integrated Business Planning combines demand, supply, response, replenishment and inventory planning. SAP notes that response and supply planning takes constraints, lead times and inventory into account, and that multilevel supply planning models across locations and bills of material.

The quality of the plan therefore depends on the meaning and consistency of the lead-time assumptions entering the model.

For AX-4711:

```
Planning transit time:
2 days

Observed median transit:
2.4 days

Observed 90th percentile:
4.1 days
```

Which value should the plan use?

That is not a purely technical choice.

Possible purposes differ.

## Nominal planning value

Represents the expected normal process.

## Conservative planning value

Protects service against variability.

## Contractual value

Represents the supplier or carrier commitment.

## Observed value

Represents actual historical performance.

## Exception value

Represents a temporary disruption.

The model should distinguish these meanings rather than overwrite one number repeatedly.

# The fourth problem: calendars are part of the lead time

A duration without a calendar is ambiguous.

```
5 days
```

can mean:

- five calendar days;
- five supplier working days;
- five Plant working days;
- five transport operating days;
- five 24-hour periods.

For AX-4711, supplier preparation uses the supplier calendar.

```
Duration:
5 working days

Calendar:
CAL-SUP-100-BRNO
```

Inbound processing uses the warehouse calendar.

```
Duration:
1 working day

Calendar:
CAL-EWM-WH01-RECEIVING
```

Transport may operate continuously or according to scheduled departures.

```
Transit duration:
2 calendar days

Departure frequency:
Monday, Wednesday, Friday
```

The waiting time until the next departure can be larger than the physical transit.

A planning model that stores only two days can miss the schedule effect completely.

# The fifth problem: organisations double-count buffers

Each team knows its own uncertainty.

Each adds protection.

Procurement changes supplier lead time from five to seven days.

Transportation changes transit time from two to three.

The warehouse changes processing time from one to two.

Planning adds a four-day safety lead-time buffer.

The combined assumption becomes:

```
Supplier:
7

Transport:
3

Inbound:
2

Planning buffer:
4

Total:
16
```

Some of the buffers may protect against the same variability.

The system then:

- orders too early;
- increases inventory;
- hides supplier performance issues;
- makes improvement difficult to measure.

The opposite can also happen.

Each team assumes another component already contains the buffer.

The end-to-end lead time is understated.

Managers should require every buffer to have:

- purpose;
- owner;
- location in the chain;
- calculation method;
- effective period;
- Evidence.

A buffer without a declared purpose is hidden policy.

# The sixth problem: average performance becomes master-data truth

Historical analysis shows that AX-4711 usually arrives in 11.7 days.

The project rounds this to 12 and loads it as lead time.

This is not necessarily wrong.

But an average can hide:

- seasonal peaks;
- supplier shutdowns;
- low-frequency severe delays;
- scheduled-departure patterns;
- changes in route;
- order-quantity effects;
- emergency shipments.

Managers should ask which statistic supports the decision.

```
Median:
11 days

Mean:
11.7 days

90th percentile:
16 days

Contractual maximum:
14 days
```

A value appropriate for inventory optimisation may not be appropriate for customer promising.

The canonical model should link the selected value to its intended use and Evidence.

# The seventh problem: temporary disruption becomes permanent master data

A border disruption increases transit time.

The planning team changes:

```
2 days
→ 5 days
```

The disruption ends.

The value remains.

Six months later, nobody knows why the lane uses five days.

The reverse also occurs.

A temporary expedite service produces faster actuals, and the planning value is reduced without recognising that the expedite cost is unsustainable.

Temporary lead-time changes need explicit status.

```
Type:
temporary override

Reason:
border disruption

Effective from:
1 September 2026

Review date:
30 September 2026

Fallback:
standard 2-day transit

Owner:
Transportation Planning
```

The default model should not be silently overwritten.

# The eighth problem: warehouse time is hidden inside supplier lead time

A purchase order arrives at the Plant on time.

The material becomes available for production two days later.

Procurement says the supplier met the commitment.

Planning says the material was late.

Warehouse operations says the inbound queue was overloaded.

All three can be correct.

For AX-4711:

```
Carrier arrival:
Monday 10:00

Goods receipt:
Monday 16:00

Quality release:
Tuesday 14:00

Putaway complete:
Wednesday 09:00

Production availability:
Wednesday 09:00
```

The supplier and transport stages performed as planned.

The internal availability delay was 47 hours.

If the entire interval is stored as one supplier lead time, accountability becomes distorted.

The end-to-end model should preserve:

```
External supply time

Transport time

Inbound processing time

Quality time

Warehouse availability time
```

SAP EWM supports high-volume warehouse operations and integrates warehouse processes with production and quality. That operational scope makes warehouse processing an explicit part of the availability chain rather than an invisible extension of transport or supplier time.

# The ninth problem: transport duration is confused with transportation lead time

Physical transit is only one component.

A lane can also include:

- booking lead time;
- tendering;
- consolidation;
- pickup preparation;
- departure schedule;
- border or terminal handling;
- unloading appointment;
- delivery confirmation.

SAP Transportation Management supports transportation and demand planning, freight tendering, delivery activities and network logistics management. Those functions illustrate why transportation time cannot always be reduced to kilometres divided by average speed.

For AX-4711:

```
Booking lead time:
1 day

Wait for scheduled departure:
0–2 days

Physical transit:
2 days

Appointment wait:
0–1 day
```

The transportation lead time can therefore vary from three to six days while physical transit remains two.

The canonical model should state which components the planning value includes.

# The tenth problem: production lead time is treated as one routing number

A finished product lead time may include:

- material availability;
- queue time;
- setup;
- processing;
- inter-operation movement;
- inspection;
- cooling or curing;
- final staging.

A migration may preserve only the headline duration.

This matters because improvement or disruption in one component should not require guessing which number to change.

For AX-4711, the material is a component rather than the finished product. Its own planning significance is the time required to become line-ready.

```
Warehouse availability
→ line-side staging
```

If that relationship is missing from the lead-time model, planning can consider the material available while production still cannot consume it.

# The eleventh problem: lead times are inconsistent across systems

The current landscape may contain:

```
S/4 purchasing:
10 days

IBP product-location:
12 days

TM lane:
3 days

Supplier portal:
7 days preparation

EWM inbound processing:
1 day
```

These values are not automatically contradictory.

They may describe different components.

They are contradictory when:

- the same interval has different active values;
- an aggregate excludes a required component;
- an aggregate includes the same component twice;
- the calendars differ without an approved transformation;
- one value uses a superseded route.

The programme should not compare field names.

It should compare event intervals.

# The twelfth problem: changes have hidden downstream impact

Transportation changes the standard lane from Brno to Hamburg.

Transit increases from two to three days.

What should be reassessed?

Potentially:

- product-location replenishment lead time;
- safety stock;
- purchase-order dates;
- production availability;
- customer promise dates;
- inventory targets;
- active Exceptions;
- previous readiness Evidence.

Without lineage, the change becomes a local TM update.

Planning continues using the old assumption.

Martenweave should answer:

```
Changed component:
Brno → DE10 standard transit

Affected aggregate:
AX-4711 replenishment lead time

Affected planning objects:
Product–Location DE10

Affected Rules:
Production availability gate

Affected Evidence:
RC5 supply-readiness assessment
```

This is a direct application of Martenweave’s existing lineage and impact-analysis direction.

# The management solution: create a canonical lead-time chain

The canonical model should represent each component separately.

For AX-4711:

```
1. Purchase-order processing
2. Supplier preparation
3. Origin handling
4. Wait for departure
5. Physical transit
6. Destination appointment wait
7. Goods receipt
8. Quality release
9. Putaway
10. Production staging
```

Each component should reference:

- start event;
- end event;
- duration;
- time basis;
- calendar;
- applicability;
- owner;
- authority;
- Evidence;
- effective dates.

The end-to-end lead time becomes a derived result.

```
Total replenishment lead time
=
applicable component chain
evaluated against relevant calendars
```

This is stronger than maintaining several unrelated totals.

# We separate duration, schedule and variability

A useful time model needs at least three concepts.

## Duration

How much processing or travel time is required?

```
Physical transit:
48 hours
```

## Schedule

When can the activity begin or occur?

```
Departures:
Monday, Wednesday, Friday
```

## Variability

How stable is the duration?

```
Median:
48 hours

90th percentile:
72 hours
```

A single numeric lead time collapses all three.

Planning may still require one number.

The canonical model should explain how that number was selected.

# We define lead-time authority by component

There is rarely one owner for the end-to-end value.

For AX-4711:

```
Purchase-order processing:
Procurement Operations

Supplier preparation:
Supplier Management

Transport:
Transportation Planning

Appointment wait:
Inbound Logistics

Goods receipt:
Warehouse Operations

Quality release:
Quality Management

Production staging:
Production Logistics
```

The aggregate may be owned by Supply Planning.

Supply Planning should not silently redefine every component.

Its role is to select or derive the planning assumption from governed inputs.

# We distinguish standard, contractual and observed time

Each component may have several valid measures.

```
Standard:
expected normal duration

Contractual:
committed maximum or target

Observed:
measured actual performance

Planning:
value selected for a planning purpose

Temporary:
time-bounded override
```

For supplier preparation:

```
Contractual:
5 working days

Observed median:
5.8 working days

Observed 90th percentile:
8 working days

Current planning value:
7 working days
```

The planning value is no longer an unexplained number.

It is a Decision supported by Evidence.

# We validate the chain deterministically

Useful Rules include:

## Every duration has event boundaries

A value labelled only `lead time` is incomplete.

## Every working-day duration references a calendar

No implicit calendar is allowed for governed production values.

## Aggregates use compatible components

A total cannot combine calendar and working days without an explicit calculation method.

## No component is counted twice

Transport included in supplier time cannot be added again.

## No required interval is missing

The aggregate should cover the complete promise being assessed.

## Applicability is explicit

Supplier-, Plant-, lane- and mode-specific values must remain scoped.

## Effective periods do not overlap ambiguously

Two active values for the same interval require a selection Rule.

## Temporary overrides have expiry

Disruption values cannot become permanent silently.

## Evidence is current

Historical performance calculated before a route change should not support the new route.

# We connect Findings to business impact

A weak Finding says:

```
Lead-time mismatch:
10 versus 12 days
```

A useful Finding says:

```
IBP uses a 12-day replenishment lead time.

The current component chain produces
15–17 calendar days for orders released on Thursday.

Cause:
supplier and warehouse calendars were omitted
from the migrated aggregate.

Affected scope:
AX-4711 from SUP-100 to Plant DE10

Affected process:
production material availability

Potential consequence:
planning dates are understated by 3–5 days

Criticality:
line-start component
```

That is a management issue, not a field discrepancy.

# We prioritise by decision consequence

Not every lead-time inconsistency deserves the same priority.

A two-day discrepancy can be critical when:

- the material stops production;
- inventory coverage is low;
- no alternate supplier exists;
- the first requirement is close to go-live.

A larger discrepancy may be tolerable for a slow-moving noncritical item.

Priority should consider:

- material criticality;
- demand timing;
- inventory coverage;
- supply alternatives;
- variability;
- fallback;
- financial exposure;
- customer impact.

# We preserve controlled planning assumptions

Sometimes the exact future-state lead time is not yet proven.

The programme may use a conservative planning value temporarily.

For AX-4711:

```
Current proven range:
12–16 days

Temporary planning value:
16 days

Reason:
insufficient post-route-change performance data

Control:
weekly review of actuals

Owner:
Supply Planning

Review after:
20 completed shipments
```

This is a controlled assumption.

It should not be presented as permanent master truth.

# We close Findings with Evidence, not consensus

The teams agree that the end-to-end lead time should be 14 days.

Agreement is necessary.

It is not sufficient.

Closure should prove:

1. component definitions are approved;
2. calendars are referenced correctly;
3. the aggregate calculation is reproducible;
4. S/4, IBP, TM and warehouse assumptions are reconciled;
5. temporary overrides are explicit;
6. affected planning objects were regenerated;
7. current scenarios were rerun;
8. business owners accepted the resulting availability dates.

For AX-4711:

```
Canonical component chain:
approved

Calculated planning value:
14 working/calendar-adjusted days

IBP:
aligned

S/4:
aligned for relevant interval

TM lane:
aligned

Warehouse processing:
aligned

Planning simulation:
completed

Production owner:
approved
```

# The manager-focused Workbench view

The Workbench should not begin with a table containing five lead-time columns.

It should show the promise chain.

## Scope

```
Material:
AX-4711

Supplier:
SUP-100

Origin:
Brno

Destination:
Plant DE10

Use:
Production replenishment
```

## End-to-end promise

```
Current planning assumption:
14 days

Expected range:
12–16 calendar days

Evidence status:
current
```

## Components

```
Order processing:
1 working day

Supplier preparation:
5 supplier working days

Transport schedule and transit:
2–4 calendar days

Inbound and quality:
2 Plant working days

Warehouse staging:
1 warehouse working day
```

## Conflicts

- S/4 purchasing still contains ten days;
- an old IBP version contains twelve;
- one alternate route has no approved calendar;
- temporary disruption override expires in two weeks.

## Business impact

- 14 finished products depend on AX-4711;
- current stock covers nine production days;
- no approved substitute exists;
- understated lead time could create a line-stop risk.

This is a decision view.

# A focused Martenweave pilot

The first lead-time pilot should remain narrow.

Choose:

```
One critical material family

One supplier

One receiving Plant

One transport lane

One warehouse process
```

For example:

```
Population:
200 production components

Origin:
Supplier region Brno

Destination:
Plant DE10

Mode:
Standard road

Warehouse:
EWM-WH01
```

The pilot should answer:

1. Which event-to-event components form the promise?
2. Which systems store each component or aggregate?
3. Which calendar applies?
4. Which owner approves each component?
5. Which values are standard, contractual, observed or temporary?
6. Which aggregates double-count or omit time?
7. Which materials have unsafe planning assumptions?
8. Which current Evidence supports the selected values?

This is small enough to implement.

It is valuable enough to expose planning and execution risk.

# The proposed Martenweave capability

## Governed Lead-Time Chain

### Goal

Make end-to-end logistics time assumptions explainable, consistent and impact-aware across planning and execution systems.

### Initial objects

- ProcessEvent;
- LeadTimeComponent;
- LeadTimeChain;
- Calendar;
- Schedule;
- VariabilityProfile;
- Applicability;
- SystemValue;
- Evidence;
- Decision;
- Exception;
- Finding.

### Initial validations

- missing start or end event;
- missing calendar;
- contradictory values for the same interval;
- double-counted component;
- missing interval;
- ambiguous applicability;
- overlapping active values;
- expired temporary override;
- stale performance Evidence;
- aggregate inconsistent with component chain.

### Initial outputs

- canonical lead-time chain;
- cross-system inconsistencies;
- calendar-adjusted duration;
- planning-versus-observed comparison;
- downstream impact;
- readiness status;
- remediation proposal;
- closure criteria.

# A conceptual lead-time component

```
---
id: LT-AX-4711-SUPPLIER-PREPARATION
type: LeadTimeComponent

material:
  AX-4711

supplier:
  SUP-100

origin:
  LOC-BRNO-SUP-100

destination:
  LOC-DE10-INBOUND

start_event:
  purchase_order_acknowledged

end_event:
  goods_ready_for_pickup

duration:
  value: 5
  basis: working_days

calendar:
  CAL-SUP-100-BRNO

measure_type:
  contractual

applicability:
  transport_mode: standard_road
  process: production_replenishment

authority:
  DEC-SUP-100-DELIVERY-COMMITMENT

owner:
  ROLE-SUPPLIER-MANAGEMENT
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI might support:

```
martenweave logistics lead-time-chain \
  AX-4711 \
  --supplier SUP-100 \
  --destination DE10 \
  --repo ./model
```

```
martenweave logistics validate-lead-times \
  --dataset ./data/lead-times-rc5.xlsx \
  --repo ./model
```

```
martenweave logistics lead-time-conflicts \
  --plant DE10 \
  --repo ./model
```

```
martenweave logistics lead-time-impact \
  LT-BRNO-DE10-TRANSIT \
  --repo ./model
```

```
martenweave logistics propose-lead-time-fix \
  FIND-AX-4711-LEAD-TIME-UNDERSTATED \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability.

They are not part of the currently documented CLI.

The current Martenweave foundation already provides canonical files, deterministic validation, gap detection, lineage, impact analysis and proposal-first changes that can support this slice.

# What managers should require

## Require event boundaries

Ban unexplained fields called simply `lead time`.

## Require component ownership

Procurement, suppliers, transport, warehouse and production should own their part of the chain.

## Require calendar references

Every working-time assumption must use a named calendar.

## Require purpose-specific values

Planning, contractual and observed values should remain distinct.

## Require applicability

Supplier-, lane-, mode-, Plant- and process-specific assumptions must remain scoped.

## Require buffer transparency

Every buffer should have a declared purpose and owner.

## Require aggregate reconciliation

End-to-end values must be reproducible from their governed components.

## Require impact analysis

A component change should show affected planning objects, inventory policies and readiness Evidence.

## Require expiry for temporary values

Disruption assumptions should not become permanent by neglect.

## Require current Evidence

Historical performance must match the active supplier, route, calendar and warehouse process.

# The questions managers should ask

1. What start and end events does each lead-time value represent?
2. Which components form the complete promise?
3. Which calendars are used?
4. Which system stores each component and aggregate?
5. Who owns each component?
6. Which values are contractual, standard, observed or temporary?
7. Where are buffers added?
8. Are any buffers protecting against the same risk twice?
9. Do planning and execution use the same route and scope?
10. Which components changed since the latest readiness assessment?
11. Which materials and customer promises depend on the changed value?
12. Which current Evidence proves that the selected assumption remains realistic?

A programme that cannot answer these questions does not have a governed lead-time model.

# The business value

Lead-time governance reduces:

- unreliable supply plans;
- excess safety stock;
- production shortages;
- unrealistic promise dates;
- repeated manual planner adjustments;
- hidden warehouse delays;
- double-counted buffers;
- outdated disruption assumptions;
- disputes between Procurement, Planning, Logistics and Operations.

SAP IBP uses lead times and other constraints in response and supply planning and supports multilevel planning across locations. SAP TM supports network transportation planning and execution, while SAP EWM manages warehouse processes connected to production and quality. Together, those scopes explain why end-to-end time assumptions cross multiple systems and owners.

Instead of reporting:

```
Lead time:
12 days
```

the programme can report:

```
The governed replenishment chain
contains seven time components.

The current planning assumption is 14 days.

S/4 and IBP are aligned.

One alternate transport lane
has no approved calendar.

A temporary two-day disruption buffer
expires on 30 September.

Fourteen production materials
depend on the same transport component.
```

That is a management statement.

# Final perspective

Lead time is not an intrinsic property of a material.

It is the result of a process moving through organisations, locations, calendars and systems.

The practical test is:

> Can we explain every day in the promise, identify who owns it, reproduce the total, and show what changes when one component moves?

When the answer is yes, lead time becomes governed model truth.

When the answer is:

> The planning field says 12,

we know that the system contains a number.

We do not yet know whether the supplier, carrier, warehouse, production line and calendar can deliver the same promise.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that supply-chain time assumptions become traceable process relationships rather than unexplained numbers distributed across planning and execution systems.

Our operating model is:

```
Events define the interval.

Components define the time.

Calendars define when time counts.

Applicability defines where the value is valid.

Evidence explains why it is trusted.

Lineage shows downstream impact.

AI proposes corrections.

Validators check consistency.

Humans approve commitments and risk.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance, logistics and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance pipeline that converts datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from source Evidence through validation, gap detection, lineage and impact analysis to reviewed proposals and GitHub delivery.

SAP describes SAP Integrated Business Planning as combining demand, response and supply, replenishment, inventory and S&OP capabilities. SAP states that response and supply planning takes lead times, capacity constraints and inventory into account and supports planning across locations and multilevel bills of material.

SAP describes SAP Transportation Management as integrating logistics management across a transportation network, including transportation planning, freight tendering and delivery activities.

SAP describes SAP Extended Warehouse Management as integrating high-volume warehouse processes with production, quality and track-and-trace. This supports treating warehouse processing and production staging as explicit parts of end-to-end availability rather than hiding them inside a supplier or transport lead-time field.

The ProcessEvent, LeadTimeComponent, LeadTimeChain and VariabilityProfile objects, deterministic checks and proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
