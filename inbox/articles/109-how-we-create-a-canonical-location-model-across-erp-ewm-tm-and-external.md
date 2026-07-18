# How We Create a Canonical Location Model Across ERP, EWM, TM and External Carriers

**Reviewed: 15 July 2026**

What happens when five systems agree that a location exists—but none of them agrees on what the location actually is?

SAP S/4HANA knows a Plant.

EWM knows a warehouse number.

Transportation Management knows a logistics location.

A carrier knows a pickup code.

A 3PL knows a distribution centre.

The address strings look similar.

The identifiers are different.

The time zones are not always the same.

One system describes the legal address.

Another describes the truck entrance.

A third describes the warehouse receiving point.

A fourth contains coordinates copied years ago.

A fifth still uses the code of a site that was renamed during a reorganisation.

Every individual record can be technically valid.

The logistics network can still be wrong.

The consequences appear later:

- shipments are routed to the wrong gate;
- pickup appointments use the wrong working calendar;
- transit-time calculations begin from the wrong node;
- deliveries are assigned to the wrong warehouse;
- carriers reject messages because their location code is missing;
- tracking events cannot be reconciled;
- freight rates are applied to the wrong origin or destination;
- planners create lanes between logical codes that do not represent executable physical movements.

This is not only an address-quality problem.

It is a model problem.

> A logistics location is not an address. It is a governed business object that connects physical place, operational role, organisational ownership, external identity and process capability.

Managers should care because transportation and warehouse systems depend on a shared logistics network.

SAP describes Transportation Management as integrating fleet and logistics management throughout the network, including transportation planning, freight tendering and settlement. Those processes require locations to be consistently understood across planning, execution and partner collaboration.

Martenweave should not replace SAP TM, EWM, geocoding services or carrier platforms.

Its role is to preserve the model those systems depend on:

- which records represent the same physical place;
- which records represent separate operational nodes;
- which roles a location performs;
- which system identifiers belong to it;
- which address and coordinates are authoritative;
- which calendars and service windows apply;
- which routes and lanes depend on it;
- which Evidence proves the current target state.

The current Martenweave core already supports generic entities, attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals. Canonical files remain authoritative, validation is deterministic, and AI-generated changes require human review.

A canonical location model is therefore a natural logistics extension of the existing architecture.

# Our running case

We use one logistics campus throughout the article.

The business calls it:

```text
Hamburg Distribution Campus
```

The campus contains:

- one manufacturing Plant;
- one finished-goods warehouse;
- one inbound component warehouse;
- two truck gates;
- one rail access point;
- one returns centre.

The systems describe it differently.

## SAP S/4HANA

```text
Plant:
DE10

Shipping point:
SP10

Address:
Industriestrasse 20
20457 Hamburg
Germany
```

## SAP EWM

```text
Warehouse number:
EWM-WH01

Description:
Hamburg Main Warehouse

Address:
Industriestr. 20
20457 Hamburg
DE
```

## SAP Transportation Management

```text
Location:
LOC-DE10-A

Role:
Shipping location

Coordinates:
53.5310, 9.9850
```

## Carrier portal

```text
Pickup location code:
F12345

Name:
Hamburg DC Gate 2

Address:
Industriestrasse 22
20457 Hamburg
```

## 3PL system

```text
Distribution centre:
DC-HAMBURG-01

Time zone:
UTC+1

Receiving hours:
06:00–18:00
```

The project initially assumes that these records are duplicates.

They are connected.

They are not necessarily identical.

The Plant, warehouse and transport location may refer to the same campus.

The carrier code may refer specifically to Gate 2.

The 3PL receiving point may represent only the inbound warehouse.

A canonical model must preserve both:

- sameness;
- distinction.

If it merges too aggressively, operational meaning is lost.

If it keeps every record separate, the network cannot be reconciled.

# The first management mistake: using the address as the identity

Addresses are evidence about location.

They are not reliable permanent identifiers.

The same place can appear as:

```text
Industriestrasse 20
Industriestr. 20
Industriestraße 20
Industriestrasse 20–22
```

All may refer to the same campus.

The opposite problem also occurs.

Two operational nodes can share one postal address:

- main warehouse;
- returns centre;
- production gate;
- outbound gate.

Address matching can suggest relationships.

It cannot make the final identity Decision alone.

For the Hamburg campus:

```text
Plant DE10
and
EWM-WH01
```

may belong to the same physical campus.

```text
Carrier location F12345
```

may represent only Gate 2 inside that campus.

Merging all three into one flat record would remove the gate-level distinction needed for pickup execution.

The manager should ask:

> Are these records the same physical place, the same operational node, or merely part of the same site?

Those are three different relationships.

# The second mistake: confusing physical locations with organisational objects

A Plant is an organisational object.

A warehouse number is an operational and system-specific warehouse context.

A shipping point supports shipping execution.

A TM location represents a node in the transportation network.

A carrier pickup code is an external identity.

These objects can all relate to one physical place without being equivalent.

The canonical model should separate:

## Physical site

The real-world campus or facility.

## Operational node

The point where a logistics activity occurs.

Examples:

- Gate 2;
- inbound receiving;
- outbound dispatch;
- rail terminal;
- returns centre.

## Organisational assignment

The enterprise structure responsible for the activity.

Examples:

- Plant DE10;
- company code;
- business unit.

## System identity

The code used by one application.

Examples:

- `EWM-WH01`;
- `LOC-DE10-A`;
- `F12345`.

This separation lets us represent the truth:

```text
Plant DE10
belongs to
Hamburg Distribution Campus

Warehouse EWM-WH01
operates within
Hamburg Distribution Campus

Carrier code F12345
identifies
Gate 2

TM location LOC-DE10-A
represents
the outbound transportation node
```

# The third mistake: building one “golden address” and discarding operational addresses

A legal or postal address is not always the address a driver needs.

The campus may have:

```text
Legal address:
Industriestrasse 20

Inbound truck entrance:
Industriestrasse 22

Outbound gate:
Hafenweg 4

Visitor entrance:
Industriestrasse 18
```

Creating one golden address and distributing it everywhere can make the data cleaner while making operations worse.

The canonical model should support address roles.

For example:

- legal;
- postal;
- physical site;
- inbound delivery;
- outbound pickup;
- visitor;
- billing;
- emergency.

For Gate 2:

```text
Address role:
outbound pickup

Street:
Industriestrasse 22

Instructions:
Use Gate 2, south entrance
```

The address belongs to the operational node.

It should not overwrite the legal address of the campus.

# The fourth mistake: treating location codes as stable business meaning

System codes survive organisational changes in unpredictable ways.

A code may remain while:

- the site is renamed;
- operational ownership changes;
- a warehouse moves within the campus;
- one node is split into two;
- a 3PL replaces another provider;
- a carrier introduces a new account.

Another code may change while the physical place remains unchanged.

For example:

```text
Old 3PL code:
HH-DC-01

New 3PL code:
DC-HAMBURG-01
```

The canonical location identity should remain stable if the underlying operational node is the same.

System identifiers should be mappings attached to that identity.

```text
Canonical node:
LOC-HAMBURG-INBOUND

3PL identity before transition:
HH-DC-01

3PL identity after transition:
DC-HAMBURG-01
```

This is especially important during migrations, when old and new codes coexist.

# The fifth mistake: treating coordinates as indisputable truth

Coordinates look objective.

They can still be wrong for the process.

A coordinate may point to:

- the centre of the postal code;
- the centre of the campus;
- the administrative office;
- the warehouse building;
- the wrong truck gate.

For transportation planning, a campus-centre coordinate may be sufficient for strategic distance estimation.

For driver navigation or appointment execution, it may be inadequate.

The model should record:

- coordinate;
- precision;
- source;
- intended use;
- validation date.

For example:

```text
Coordinate:
53.5310, 9.9850

Represents:
Campus centre

Approved use:
Strategic routing

Not approved for:
Driver gate navigation
```

Gate 2 can have a separate coordinate approved for execution.

The manager should not ask only:

> Do we have coordinates?

The better question is:

> Do we have coordinates suitable for the decision being made?

# The sixth mistake: ignoring time-zone semantics

The 3PL record says:

```text
Time zone:
UTC+1
```

This looks reasonable for Hamburg.

It is incomplete.

A fixed UTC offset does not necessarily preserve daylight-saving behaviour.

The project also needs to know whether opening times, appointment windows and carrier cutoffs are stored as:

- local wall-clock time;
- UTC;
- system time;
- fixed offset.

Suppose the warehouse accepts appointments from:

```text
06:00 to 18:00 local time
```

Transportation planning interprets the values as UTC+1 throughout the year.

The error may appear only after a seasonal clock change.

The canonical model should preserve a named time-zone concept and the semantics of each time-based Attribute.

```text
Location time zone:
Europe/Berlin

Receiving hours:
local time

Carrier cutoff:
local time

Event timestamps:
UTC
```

The important point is not the specific technology.

It is that the model distinguishes business time from storage representation.

# The seventh mistake: maintaining one calendar for a location

A location can have several calendars.

The Hamburg campus may have:

- Plant production calendar;
- warehouse receiving calendar;
- outbound shipping calendar;
- carrier pickup calendar;
- public-holiday calendar;
- maintenance shutdowns;
- gate appointment windows.

A location may be open for production while the inbound gate is closed.

A warehouse may operate on Saturday while a specific carrier does not collect.

One generic “location calendar” cannot represent every process.

For the inbound node:

```text
Receiving calendar:
Monday–Friday

Receiving hours:
06:00–18:00

Holiday source:
Germany/Hamburg

Shutdown:
24–26 December
```

For the outbound gate:

```text
Shipping calendar:
Monday–Saturday

Carrier cutoff:
16:00

Night pickup:
By Exception
```

The canonical model should link calendars to:

- node;
- role;
- activity;
- partner where necessary.

# The eighth mistake: confusing location role with location identity

The Hamburg campus can perform several roles:

- production source;
- inventory location;
- shipping origin;
- receiving destination;
- returns destination;
- cross-docking node;
- carrier handover point.

A role can change without changing the physical site.

A new returns process may be introduced at the existing campus.

The canonical model should add a role relationship rather than create a new unrelated location.

Conversely, two roles can occur at different nodes within the campus.

```text
Outbound shipping:
Gate 2

Returns receiving:
Returns Centre
```

The role should therefore be scoped to the correct operational node.

# The ninth mistake: collapsing parent and child locations

Managers often receive a location list where every code appears at the same level.

The list may contain:

- country;
- region;
- campus;
- warehouse;
- gate;
- dock;
- storage area.

Without hierarchy, systems and analysts can compare incompatible objects.

For the Hamburg campus:

```text
Hamburg Distribution Campus
├── Manufacturing Plant DE10
├── Inbound Warehouse
│   └── Gate 1
├── Finished-Goods Warehouse
│   └── Gate 2
├── Returns Centre
└── Rail Terminal
```

A transport lane to the campus may be suitable for strategic planning.

An appointment requires the exact gate or receiving node.

The canonical model should preserve hierarchy and the planning grain at which each relationship is valid.

# The tenth mistake: treating external partner codes as secondary reference data

Carrier and 3PL identifiers are often stored in separate spreadsheets.

They are treated as interface details.

Operationally, they determine whether partners understand the location.

The carrier may require:

```text
F12345
```

The 3PL may require:

```text
DC-HAMBURG-01
```

A track-and-trace provider may use another identifier.

The model should connect external identities to the canonical node and preserve:

- partner;
- identifier;
- validity period;
- intended process;
- Evidence;
- owner.

This supports a deterministic check:

> Every carrier used for outbound shipments from Gate 2 must have an active external location identity mapped to that node.

Without this, the internal model can be perfect while partner execution fails.

# The eleventh mistake: creating transportation lanes between codes instead of locations

A lane may be represented as:

```text
LOC-DE10-A → LOC-FR20-B
```

But if `LOC-DE10-A` changes, does the physical route change?

If two codes refer to the same origin node, should they create separate lanes?

If one code represents the campus and another represents Gate 2, which one is correct for the planning use?

The lane should connect canonical operational nodes.

System-specific lane identifiers and codes should map to that relationship.

```text
Origin:
Hamburg Outbound Gate 2

Destination:
Lyon Receiving Node 1

Mode:
Road

Carrier applicability:
Carrier A and Carrier B

Planning system identity:
LANE-DE10-FR20
```

This prevents system-code changes from silently changing network meaning.

# The twelfth mistake: detecting duplicates without detecting splits

MDM programmes are familiar with duplicate locations.

Location migration also has a split problem.

One legacy location may represent several future operational nodes.

For example:

```text
Legacy location:
HAMBURG_DC
```

The target model requires:

```text
Hamburg Inbound Gate
Hamburg Outbound Gate
Hamburg Returns Centre
```

A matching algorithm that tries to create one golden record can preserve the legacy ambiguity.

The project needs an explicit split Decision.

```text
Legacy HAMBURG_DC
is replaced by
three target operational nodes
```

Mappings, lanes, appointments and partner codes must then be reassigned.

A canonical location registry should support:

- merge;
- split;
- rename;
- supersession;
- parent-child restructuring.

# The management solution: create a layered canonical location model

A useful canonical model should contain several connected objects.

## PhysicalSite

Represents the real-world campus or facility.

## OperationalNode

Represents a point where a logistics activity occurs.

Examples:

- receiving gate;
- shipping gate;
- warehouse;
- rail terminal.

## LocationRole

Defines how the site or node participates in a process.

Examples:

- shipping origin;
- receiving destination;
- production source;
- returns destination.

## SystemIdentity

Connects a canonical object to a system-specific code.

## ExternalPartnerIdentity

Connects it to carrier, 3PL or tracking-provider codes.

## Address

Stores a role-specific address with validity and authority.

## Coordinate

Stores a coordinate with precision, source and approved use.

## Calendar and ServiceWindow

Define when a role or activity is available.

## HierarchyRelationship

Connects campus, warehouse, gate and other levels.

## LaneRelationship

Connects operational nodes through a governed transportation path.

This layered structure is more complex than one location table.

The logistics network is already complex.

The model prevents that complexity from being hidden in inconsistent codes.

# A canonical representation of the Hamburg campus

Conceptually:

```text
Physical site:
Hamburg Distribution Campus

Enterprise assignments:
- Plant DE10
- Shipping Point SP10

Operational nodes:
- Hamburg Inbound Gate 1
- Hamburg Outbound Gate 2
- Hamburg Returns Centre
- Hamburg Rail Terminal

Warehouse:
EWM-WH01

Transportation identities:
- LOC-DE10-A
- carrier F12345
- 3PL DC-HAMBURG-01

Time zone:
Europe/Berlin
```

The outbound gate might then be represented as:

```text
Canonical node:
LOC-HAMBURG-OUTBOUND-GATE-2

Parent:
Hamburg Distribution Campus

Role:
shipping origin

Address:
Industriestrasse 22

Coordinate:
gate-specific coordinate

TM identity:
LOC-DE10-A

Carrier identity:
F12345

Shipping calendar:
Monday–Saturday

Carrier cutoff:
16:00 local time
```

The exact schema is less important than the separation of meaning.

# We define source authority by Attribute

Different parties may own different parts of the location.

For the Hamburg campus:

```text
Legal address:
Corporate Real Estate

Operational gate address:
Warehouse Operations

Coordinates:
Logistics Network Design

Receiving hours:
Warehouse Operations

Carrier pickup code:
Transportation Operations

Time zone:
Enterprise Location Governance

Holiday calendar:
Local Business Operations
```

A single “location owner” is often too broad.

Martenweave can preserve typed ownership and detect when a proposed change affects an Attribute owned by another role.

# We validate location identity deterministically

Useful Rules include:

## Every operational node has one parent site

Unless explicitly modelled as a standalone node.

## No active system identity maps ambiguously

A code should not point to two active canonical nodes for the same scope.

## Every partner identity has validity dates

Old and new carrier codes should not overlap without explanation.

## Every executable transport node has a time zone

And the time zone must use the approved representation.

## Every appointment-enabled node has service windows

Missing hours should not be interpreted as always open.

## Coordinates have declared precision and use

Campus-level coordinates should not be accepted automatically for gate navigation.

## Address role is explicit

A legal address must not silently become a pickup address.

## Parent-child hierarchy has no cycles

A gate cannot contain its own campus.

## Active lanes connect active nodes

A retired node should not remain in the current network.

## Split and merge Decisions preserve lineage

Legacy codes must map to the appropriate target nodes.

These Rules turn location migration into a model-governance problem rather than an address-cleansing exercise.

# We connect Findings to logistics consequences

A technical Finding might say:

```text
Time zone mismatch.
```

A management Finding should say:

```text
Hamburg Outbound Gate 2 uses a fixed UTC+1 offset
while the canonical site uses Europe/Berlin.

Affected process:
Carrier appointment scheduling

Potential consequence:
One-hour appointment and cutoff deviation
during daylight-saving periods

Affected lanes:
18

Affected carriers:
4

Cutover status:
Not ready
```

Another example:

```text
Carrier code F12345 maps to the campus
instead of Outbound Gate 2.

Potential consequence:
Pickup instructions and tracking events
cannot be reconciled to the executable node.
```

This is how a data issue becomes a decision item.

# We distinguish data, mapping and network-design problems

A location discrepancy can require different remediation.

## Data correction

The address or coordinate is wrong.

## Mapping correction

A system code maps to the wrong canonical node.

## Model correction

The canonical hierarchy does not distinguish campus and gate.

## Network-design correction

The intended operational node or lane is not defined.

## Partner correction

The carrier or 3PL uses an obsolete external identity.

## Scope Decision

A node is intentionally excluded from the current wave.

Managers should require the Finding to name the likely remediation class.

Otherwise issues bounce among S/4, EWM, TM, integration and carrier teams.

# We preserve controlled exceptions

Not every location discrepancy must block cutover.

Suppose two low-volume carriers still use the campus-level code instead of Gate 2.

A controlled Exception might permit temporary operation when:

- manual pickup instructions are issued;
- carrier contacts are confirmed;
- shipment volume remains below a defined limit;
- the external code will be corrected by a deadline.

```text
Affected carriers:
2

Temporary control:
Manual dispatch instruction

Maximum daily shipments:
5

Owner:
Transportation Operations

Expiry:
Two weeks after go-live
```

The location is not fully ready for those carrier integrations.

It is controlled.

That distinction should remain visible.

# We close Findings with current target Evidence

A location Finding should not close because an Excel mapping was changed.

For the Hamburg case, closure should prove:

1. the canonical site and node hierarchy is approved;
2. S/4, EWM and TM identities map to the correct nodes;
3. carrier and 3PL codes are active and scoped correctly;
4. address roles are explicit;
5. time zone and calendars are aligned;
6. coordinates are approved for their intended use;
7. affected lanes and partner messages were revalidated;
8. the current target extracts match the canonical model.

A closure package might contain:

```text
Canonical model commit

S/4 location extract

EWM warehouse extract

TM location extract

Carrier mapping confirmation

Calendar reconciliation

Lane impact report

Business-owner approval
```

A successful interface message is only one part of that package.

# The manager-focused Workbench view

The Workbench should not begin with a list of address duplicates.

It should show the logistics network state.

## Canonical site

Hamburg Distribution Campus.

## Operational nodes

- Inbound Gate 1;
- Outbound Gate 2;
- Returns Centre;
- Rail Terminal.

## System coverage

```text
S/4 identities:
complete

EWM identities:
complete

TM identities:
one ambiguous mapping

Carrier identities:
two missing

3PL identities:
complete
```

## Operational readiness

```text
Inbound receiving:
ready

Outbound transportation:
controlled

Returns:
ready

Rail dispatch:
not assessed
```

## Critical Findings

- carrier code maps to campus rather than gate;
- fixed-offset time zone used for appointment scheduling;
- three lanes reference a superseded TM location;
- one outbound node lacks current receiving and pickup hours.

## Business impact

- 18 transportation lanes;
- four carriers;
- first-week outbound deliveries;
- manual dispatch fallback required.

This is a management view, not an address-maintenance screen.

# A focused Martenweave pilot

The first location pilot should not cover the entire enterprise network.

Choose:

```text
One logistics campus

One warehouse

One shipping point

Five carriers

Twenty transportation lanes
```

For the Hamburg campus, collect:

- S/4 Plant and shipping-point data;
- EWM warehouse and address data;
- TM location data;
- carrier and 3PL codes;
- addresses;
- coordinates;
- calendars;
- service windows;
- active lanes;
- current target Evidence.

The pilot should answer:

1. Which records represent the same physical site?
2. Which represent distinct operational nodes?
3. Which identities belong to each node?
4. Which addresses are legal, operational or partner-facing?
5. Which time zone and calendars apply?
6. Which lanes and carrier processes depend on each node?
7. Which mappings are missing or ambiguous?
8. Which current Evidence proves readiness?

This is narrow enough to deliver.

It is broad enough to demonstrate real logistics value.

# The proposed Martenweave capability

## Canonical Logistics Location Registry

### Goal

Create a traceable model connecting physical sites, operational nodes, organisational objects, system identities and external partner codes.

### Initial objects

- PhysicalSite;
- OperationalNode;
- LocationRole;
- SystemIdentity;
- ExternalPartnerIdentity;
- Address;
- Coordinate;
- Calendar;
- ServiceWindow;
- HierarchyRelationship;
- TransportationLane;
- Evidence;
- Decision;
- Finding.

### Initial validations

- duplicate or ambiguous identity;
- missing parent site;
- incorrect address role;
- missing or invalid time-zone representation;
- missing service window;
- stale external code;
- inactive node used by active lane;
- coordinate precision unsuitable for intended use;
- unresolved split or merge;
- stale Evidence.

### Initial outputs

- canonical location hierarchy;
- cross-system identity map;
- partner-identity gaps;
- affected lanes;
- business impact;
- readiness by logistics role;
- remediation proposal;
- closure criteria.

# A conceptual location object

```text
---
id: LOC-HAMBURG-OUTBOUND-GATE-2
type: OperationalNode

parent_site:
  LOC-HAMBURG-CAMPUS

roles:
  - shipping_origin
  - carrier_handover

enterprise_context:
  plant: DE10
  shipping_point: SP10
  warehouse: EWM-WH01

system_identities:
  - system: SAP_TM
    value: LOC-DE10-A
  - system: CARRIER_A
    value: F12345

address:
  role: outbound_pickup
  street: Industriestrasse 22
  city: Hamburg
  country: DE

time_zone:
  Europe/Berlin

service_window:
  calendar: CAL-HAMBURG-OUTBOUND
  opens: 06:00
  closes: 18:00

owner:
  ROLE-TRANSPORTATION-OPERATIONS
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI might support:

```text
martenweave logistics location-map \
  LOC-HAMBURG-CAMPUS \
  --repo ./model
```

```text
martenweave logistics validate-locations \
  --dataset ./data/location-baseline.xlsx \
  --repo ./model
```

```text
martenweave logistics location-conflicts \
  --site LOC-HAMBURG-CAMPUS \
  --repo ./model
```

```text
martenweave logistics location-impact \
  LOC-HAMBURG-OUTBOUND-GATE-2 \
  --repo ./model
```

```text
martenweave logistics propose-location-fix \
  FIND-HAMBURG-CARRIER-MAPPING \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability.

They are not part of the currently documented CLI.

The current Martenweave core already provides canonical files, deterministic validation, gap detection, lineage, impact analysis and proposal-first change handling that can underpin this slice.

# What managers should require

## Require identity before cleansing

Do not standardise address strings before deciding whether records represent the same site or different nodes.

## Require a location hierarchy

Separate campuses, warehouses, gates and operational points.

## Require role-specific addresses

Legal, receiving, pickup and visitor addresses should not overwrite each other.

## Require typed authority

Assign owners to addresses, coordinates, calendars, partner codes and roles separately.

## Require time-zone and calendar semantics

A fixed offset or generic calendar is not enough for appointment and cutoff processes.

## Require external identity coverage

Every active carrier and 3PL integration should map to the correct canonical node.

## Require lane impact analysis

A location change should show which routes, rates, appointments and partners are affected.

## Require current Evidence

Location readiness must refer to the current system extracts, partner mappings and network baseline.

## Require explicit split and merge Decisions

Do not let duplicate matching decide the future logistics structure automatically.

# The questions managers should ask

1. Which records represent the same physical site?
2. Which records represent different operational nodes within that site?
3. Which organisational objects are assigned to each node?
4. Which addresses are legal, postal, receiving or pickup addresses?
5. Which coordinates represent the campus, warehouse and exact gate?
6. Which time zone governs local appointment and cutoff times?
7. Which calendars apply to receiving, shipping and carrier activity?
8. Which carrier and 3PL codes identify each node?
9. Which locations were split, merged, renamed or superseded?
10. Which transportation lanes depend on each location?
11. Which nodes are current, controlled, not ready or not assessed?
12. Which Evidence proves that all systems and partners use the current model?

A programme that cannot answer these questions does not have a governed logistics network.

# The business value

A canonical location model reduces:

- wrong pickup and delivery points;
- carrier-message rejection;
- appointment errors;
- incorrect route and distance calculations;
- stale lanes;
- duplicate transport nodes;
- failed tracking reconciliation;
- manual partner mapping;
- repeated disputes between ERP, EWM, TM and integration teams.

It also improves management reporting.

Instead of:

```text
98 percent of location addresses are complete.
```

the programme can report:

```text
The Hamburg campus has four governed operational nodes.

S/4 and EWM identities are aligned.

One TM identity remains ambiguous.

Two carrier codes are missing.

Three active lanes use a superseded node.

Outbound transportation is controlled,
but not yet fully ready.
```

That is a decision-ready statement.

# Final perspective

A location is not only where something is.

It is where a defined activity can happen, under a defined identity, schedule, role and set of partner agreements.

The practical test is:

> Can we explain which physical site and operational node every system code represents, and can we prove that the network still works when those identities, roles or calendars change?

When the answer is yes, location data becomes governed logistics infrastructure.

When the answer is:

> The addresses look similar and the records loaded successfully,

we know that the strings are populated.

We do not yet know whether the truck, warehouse, planner and carrier are all going to the same place.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that logistics locations become stable, traceable model objects rather than loosely connected codes spread across ERP, warehouse, transportation and partner systems.

Our operating model is:

```text
Physical sites define the real-world place.

Operational nodes define where work happens.

Roles define what can happen there.

System identities connect applications.

Partner identities connect the network.

Rules validate consistency.

Lineage shows lane and process impact.

Evidence proves the current state.

AI proposes corrections.

Humans approve identity, authority and scope.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance, logistics and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance pipeline that converts datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from source Evidence through validation, gap detection, lineage and impact analysis to reviewed proposals and GitHub delivery.

SAP describes SAP Transportation Management as integrating fleet and logistics management across the network, including transportation planning, freight tendering and settlement. The article uses that network scope to explain why location identity must remain consistent across internal and external execution systems.

SAP describes SAP Master Data Governance as preserving semantics and relationships across governed business entities, applying validated values and business Rules, maintaining an audit trail and supporting governed data across SAP and third-party sources. The proposed canonical location model applies those principles to logistics sites, nodes, roles and partner identities.

The PhysicalSite, OperationalNode, ExternalPartnerIdentity and TransportationLane objects, location validations and proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
