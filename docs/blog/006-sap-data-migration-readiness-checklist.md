# SAP Data Migration Readiness Checklist

**Reviewed: 14 July 2026**

A migration team can complete mappings, build load files and pass several technical checks while the domain is still not ready for migration.

This happens because readiness is often reduced to a few visible indicators:

- mapping completion;
- file availability;
- defect count;
- test execution;
- load success.

These indicators matter. None of them proves that the model, source data, transformation rules, target configuration and business ownership are aligned.

We use a broader definition:

> A domain is ready for migration when the programme can explain what will be loaded, where every critical value comes from, which rules were applied, which gaps remain, who accepted them and how the result will be governed after the load.

Readiness is therefore not a document produced immediately before cutover.

It is accumulated evidence.

SAP itself recommends curating master data early, before an SAP S/4HANA implementation, because more automated target processes depend heavily on clean and correct master data.

The practical difficulty is deciding what “curated” and “ready” mean for a specific programme.

This checklist is our answer.

It is intended for migration managers, MDG and MDM architects, data leads, domain owners, testing teams and programme managers. It can be used before a mock load, dress rehearsal or cutover, but the work should begin much earlier.

## Readiness is not the same as completion

Projects often report completion through percentages.

For example:

- 98% of mappings completed;
- 95% of data extracted;
- 92% of defects closed;
- 100% of migration objects configured.

These figures can all be accurate while hiding significant risk.

A mapping may be marked complete even when:

- the source column is empty for half the records;
- the value mapping covers only known codes;
- the business owner has not approved the transformation;
- the target field became mandatory after the mapping was completed;
- a country-specific exception is stored in another workbook;
- the migration rule conflicts with MDG validation;
- the test used synthetic rather than representative data.

Completion describes the status of an activity.

Readiness describes whether the resulting system and data can support the intended business process.

We recommend reporting both, but never treating them as interchangeable.

## The six dimensions of migration readiness

We assess readiness across six connected dimensions:

1. Model readiness
2. Source-data readiness
3. Mapping and transformation readiness
4. Target-system readiness
5. Testing and evidence readiness
6. Operational and governance readiness

A weakness in one dimension can invalidate progress in the others.

A technically perfect load is not useful when the target model is wrong.

An approved target model is not useful when the required source data does not exist.

A clean dataset is not enough when no one owns post-go-live corrections.

The checklist should therefore be reviewed as a whole.

# 1. Model readiness

The first question is not whether the migration file is ready.

The first question is whether the programme knows what the target model is.

## Is there one approved model?

The programme should be able to identify the current approved model without asking several teams to reconcile their own versions.

The model may be represented through several views, but the underlying objects should be consistent.

Check:

- Is there a defined model baseline?
- Is the baseline versioned?
- Can the team distinguish approved, proposed and implemented changes?
- Do MDG, migration and testing teams use the same attribute definitions?
- Are local variants linked to the global model?
- Are temporary exceptions clearly marked?

A common warning sign is that each workstream has an “official” workbook.

That usually means there is no single approved model, only several documents with different owners.

## Are the business objects clearly bounded?

Terms such as Customer, Supplier, Business Partner and Material are too broad by themselves.

The team should understand which components are included.

For Business Partner, for example:

- central identity;
- roles;
- addresses;
- tax data;
- bank data;
- relationships;
- customer company-code data;
- customer sales-area data;
- supplier company-code data;
- supplier purchasing data.

Check:

- Are included entities explicit?
- Are excluded entities explicit?
- Are relationships between entities modelled?
- Are organisational contexts understood?
- Are local extensions visible?

If boundaries remain unclear, mapping completion will be misleading because different teams will be mapping different interpretations of the domain.

## Are critical attributes defined?

A target field name is not a sufficient definition.

For each critical attribute, the programme should know:

- what it means;
- why it is needed;
- where it applies;
- who owns it;
- which values are allowed;
- when it is mandatory;
- which business processes consume it;
- whether it is global or local.

Check:

- Does every critical attribute have a definition?
- Can business and technical teams interpret the definition consistently?
- Are similar attributes differentiated?
- Are retired or obsolete attributes marked?
- Are regulatory attributes identified?

Definitions should be written in business language first and connected to physical fields second.

## Are contexts explicit?

Many migration defects are not field defects. They are context defects.

A value may be valid centrally but missing for one company code. A field may be mandatory in one country and optional elsewhere. A material attribute may be valid at plant level but incorrectly applied globally.

Check whether the model explicitly represents:

- company code;
- sales area;
- purchasing organisation;
- plant;
- storage location;
- country;
- language;
- partner role;
- business process;
- effective period.

If these conditions are stored only in notes or tab names, they are difficult to validate.

## Are value lists approved?

A field can be mapped while its values remain unresolved.

Check:

- Is the target value list approved?
- Are inactive values identified?
- Are local code lists documented?
- Is ownership clear?
- Are effective dates relevant?
- Are blank and unknown values defined?
- Are defaults controlled?
- Are unmapped source values visible?

Value-list readiness should be tracked separately from field readiness.

## Are validation rules defined?

For each critical rule, the programme should know:

- what is being checked;
- under which context;
- whether failure is an error or warning;
- who owns the rule;
- where it will be implemented;
- how it will be tested.

Check:

- Are mandatory-field rules explicit?
- Are cross-field dependencies documented?
- Are organisational rules clear?
- Are format and reference validations defined?
- Are duplicate and matching criteria agreed?
- Are temporary migration rules separated from permanent governance rules?

SAP MDG supports validated values, business rules, workflow routing, quality monitoring and auditable changes. The programme still has to define the actual rules and ownership appropriate to its domain.

# 2. Source-data readiness

A migration model describes what the programme expects.

Source-data readiness shows what the organisation actually has.

## Have representative datasets been profiled?

Do not rely only on field catalogues or source-system documentation.

Use actual extracts.

Check:

- Were representative datasets received?
- Do they include all relevant countries and organisations?
- Do they include realistic historical and active records?
- Are large-volume and edge-case populations represented?
- Is the extraction date known?
- Can the extract be reproduced?

A dataset from one country or one clean business unit should not be treated as evidence for the entire domain.

## Do expected columns exist?

Compare the target model and mapping expectations against the current extract.

Check:

- Are all required source columns present?
- Are column names stable?
- Are data types consistent?
- Are fields available for every relevant source system?
- Are some values stored outside the main source?
- Are relationships supplied in separate files?
- Are important columns derived only during extraction?

A mapping to a theoretical source field is not a usable mapping.

## Is completeness measured by context?

An overall completeness percentage may hide the real problem.

For example, a field may be 95% complete globally but almost entirely missing for one country that goes live in the first wave.

Check completeness by:

- country;
- source system;
- company code;
- sales organisation;
- plant;
- record type;
- business status;
- migration wave.

Readiness should reflect the population being loaded, not the average across the enterprise.

## Are data types and formats understood?

Check:

- date formats;
- decimal conventions;
- leading zeros;
- identifier lengths;
- phone and address formats;
- character encoding;
- language-specific text;
- numeric values stored as text;
- concatenated fields;
- multi-value fields.

A format issue is sometimes easy to fix technically. The business meaning may still be unclear.

For example, normalising a date is straightforward if the source is genuinely a date. It is harder when the field contains text such as “unknown,” “before 2010” or “not required.”

## Are duplicate patterns known?

For Customer, Supplier and Business Partner migration, duplicate handling can determine the entire loading strategy.

Check:

- Are duplicate candidates identified?
- Are matching criteria approved?
- Are false-positive risks understood?
- Are local and global duplicates distinguished?
- Is there a merge strategy?
- Is survivorship defined?
- Are legacy keys preserved?
- Are downstream references updated?
- Who approves merged records?

The migration team should not invent duplicate policy during load execution.

## Are invalid references known?

Check for:

- organisational units that do not exist in the target;
- obsolete country or region codes;
- invalid payment terms;
- missing parent entities;
- broken product hierarchies;
- unknown tax categories;
- missing partner relationships;
- inactive plants or company codes.

Reference-data failures should be visible before the load.

## Are obsolete records filtered?

A source system may contain data that is technically valid but no longer useful.

Check:

- Are active-record criteria defined?
- Are retention obligations understood?
- Are blocked and deleted records treated consistently?
- Are historical relationships required?
- Are dormant customers or suppliers included?
- Are unused materials excluded?
- Is the exclusion decision approved?

Migrating everything can increase cost and reduce trust in the target system.

## Is remediation ownership defined?

Every significant source-data issue should have a treatment and owner.

Possible treatments include:

- source correction;
- pre-migration cleansing;
- migration transformation;
- enrichment;
- controlled default;
- rejection;
- exclusion;
- post-go-live remediation;
- accepted exception.

Check:

- Is the chosen treatment recorded?
- Does the owner have authority to deliver it?
- Is the deadline aligned with the load?
- Is unresolved remediation visible to management?
- Will accepted issues remain traceable after go-live?

# 3. Mapping and transformation readiness

This is where programmes often report the highest completion and carry the most hidden assumptions.

## Does every target attribute have an identified source or treatment?

For each required target attribute, the team should know whether it is:

- directly mapped;
- transformed;
- derived;
- defaulted;
- manually enriched;
- created by the target system;
- not applicable;
- unavailable;
- intentionally left blank.

Check:

- Are any target attributes still source-unknown?
- Are “TBD” mappings visible?
- Are default rules approved?
- Are manual enrichments planned and resourced?
- Are system-generated values clearly separated?

## Are transformations precise enough to implement?

A note such as “convert to SAP format” is not a transformation rule.

A usable rule should explain:

- inputs;
- conditions;
- output;
- precedence;
- error behaviour;
- treatment of blanks;
- applicable context;
- examples;
- owner.

Check:

- Can another consultant implement the rule without interviewing the author?
- Can the rule be tested?
- Does the rule change business meaning?
- Has the business approved that change?
- Is the same rule duplicated elsewhere?

## Are value mappings complete against actual source values?

Do not review only the intended value list.

Compare mappings with current dataset distributions.

Check:

- Is every source value mapped?
- Are unexpected values visible?
- Are whitespace and case differences normalised?
- Are inactive codes treated?
- Are many-to-one mappings approved?
- Are one-to-many cases resolved?
- Are country-specific values handled?
- Are defaults documented?
- Is there a process for new values appearing in later extracts?

A value-mapping table is not complete because every row in the design document has a target. It is complete when it covers the values that actually appear in the migration population.

## Are key mappings controlled?

Check:

- Will existing identifiers be retained?
- Are internal or external number ranges used?
- How are legacy keys stored?
- How are merged records represented?
- How are cross-system keys reconciled?
- Are key mappings required by downstream systems?
- Can records be traced back after migration?
- Who owns corrections to key mappings?

Identifier errors can be more damaging than field-level defects because they affect relationships and reconciliation.

## Are mapping dependencies visible?

Some mappings depend on others.

For example:

- a sales-area attribute requires the sales-area record to exist;
- a partner function requires a related Business Partner;
- a bank record requires the parent supplier;
- a value derivation depends on country and company code;
- a product hierarchy requires reference data loaded first.

Check:

- Are prerequisites modelled?
- Is load sequence aligned?
- Are circular dependencies identified?
- Are missing parent records detected?
- Are cross-file relationships tested?

## Are temporary workarounds clearly separated?

Migration programmes often introduce temporary logic to keep testing moving.

Check:

- Is the workaround explicitly marked temporary?
- Is the reason recorded?
- Is there an expiry or review condition?
- Does the MDG team know about it?
- Could the value remain in production?
- Is remediation assigned?

Temporary rules have a tendency to become permanent when they are embedded only in code or workbook comments.

# 4. Target-system readiness

The source and mapping can be ready while the target environment is not.

## Is the target model stable enough for the load?

Check:

- Are required fields configured?
- Are structures and contexts available?
- Are target value lists aligned?
- Are recent design changes transported?
- Are environments consistent?
- Are planned extensions complete?
- Are obsolete target fields removed from the mapping?
- Is the migration team using the correct target version?

A changing target is normal during early testing. The programme must still know which version each load targets.

## Are MDG and migration validations aligned?

A record may pass migration validation and fail in MDG.

Check:

- Are mandatory rules consistent?
- Are format checks aligned?
- Are allowed values aligned?
- Are derivations understood?
- Are workflow conditions relevant during initial load?
- Are duplicate checks active?
- Are errors and warnings treated consistently?
- Are bypasses or loading modes documented?

The goal is not necessarily to implement every rule twice.

The programme should know which layer owns each rule and whether the combined behaviour is correct.

## Are prerequisites loaded?

Check whether the target requires:

- organisational structures;
- reference data;
- code lists;
- parent objects;
- number ranges;
- users and roles;
- key mappings;
- integration endpoints.

A migration object can be ready in isolation but blocked by missing prerequisites.

## Is load sequencing agreed?

Check:

- Which objects load first?
- Which relationships depend on parent records?
- When are deltas taken?
- How are failed records retried?
- Can partial loads be reconciled?
- What happens when a downstream system is unavailable?
- Is rollback possible?
- Which steps are manual?

Sequence should be documented as an operational runbook, not only understood by the technical team.

## Are technical capacity and windows confirmed?

Check:

- expected volumes;
- throughput;
- batch sizes;
- processing windows;
- lock constraints;
- replication load;
- error-log volumes;
- monitoring;
- storage;
- cutover timing.

A functionally correct load can still fail operationally if volume assumptions are wrong.

# 5. Testing and evidence readiness

Readiness requires evidence that the intended model works with representative data.

## Have tests covered more than technical loading?

A successful load proves that records entered the system.

It does not prove that the resulting data is correct or usable.

Check whether testing covers:

- mapping accuracy;
- transformation behaviour;
- mandatory rules;
- value mappings;
- relationships;
- organisational contexts;
- duplicate handling;
- workflow behaviour after loading;
- replication;
- downstream consumption;
- correction process;
- auditability.

## Are tests linked to model objects?

The programme should know which attributes, mappings and rules have been tested.

Check:

- Is every critical rule linked to a test?
- Are critical mappings covered?
- Are local variants tested?
- Are exceptions tested?
- Can a failed test be traced to the affected object?
- Can the team identify untested areas?

A list of executed test cases is less useful than evidence of model coverage.

## Was representative data used?

Check:

- Did tests include each relevant source system?
- Did they include each country?
- Did they include large and complex records?
- Did they include missing and invalid values?
- Did they include duplicates?
- Did they include relationship scenarios?
- Did they include records expected to fail?

Testing only clean “happy path” records provides false confidence.

## Are reconciliation criteria defined?

The team should know how to prove that the load result is complete and correct.

Check:

- record counts;
- rejected records;
- duplicate outcomes;
- key mappings;
- financial or quantitative totals where relevant;
- field-level comparisons;
- relationship counts;
- organisational coverage;
- downstream replication;
- unresolved differences.

Reconciliation should distinguish between expected and unexplained differences.

## Are defects classified correctly?

We recommend classifying defects as:

- source-data defect;
- mapping defect;
- transformation defect;
- target-model defect;
- configuration defect;
- integration defect;
- test-data defect;
- requirement or decision gap.

This matters because each category has a different owner and resolution path.

A generic defect backlog hides systemic problems.

## Is evidence retained?

Check:

- Which dataset version was used?
- Which model baseline was tested?
- Which transformation version was executed?
- Which environment was used?
- Which results were approved?
- Can evidence be retrieved later?
- Can AMS understand the result?

A test result without model and dataset context is difficult to reuse.

# 6. Operational and governance readiness

Migration does not end when the load completes.

The organisation has to own the resulting data.

## Are owners ready to accept the data?

Check:

- Have business owners reviewed the outcome?
- Are stewards assigned?
- Do they understand migrated defaults and exceptions?
- Can they identify unresolved remediation?
- Do they know how to request corrections?
- Are escalation paths available?

The project should not hand over unexplained exceptions as operational surprises.

## Are post-go-live validations active?

Check:

- Will the same critical rules remain enforced?
- Are migration-only bypasses disabled?
- Can stewards correct migrated data?
- Are quality reports available?
- Are duplicate controls operating?
- Are data owners receiving meaningful metrics?

SAP positions MDG as a central governance layer with workflows, validated values, data-quality monitoring and audit trails. Migration readiness should therefore include evidence that the loaded records can enter that operational governance model.

## Is unresolved remediation transferred?

Some issues will remain open at cutover.

That may be acceptable if they are controlled.

Check:

- Is each issue documented?
- Is business impact understood?
- Is an owner assigned?
- Is a deadline agreed?
- Is the affected population known?
- Is monitoring in place?
- Is the exception approved?

“Fix after go-live” is not a plan unless ownership and evidence survive the project.

## Can AMS understand the migrated model?

Check whether the support team can answer:

- Why is this field populated this way?
- Which source supplied it?
- Which transformation was applied?
- Which value mapping was used?
- Which exceptions were accepted?
- Which rule validates it?
- Which downstream systems depend on it?
- What should be reviewed before changing it?

If the answer depends on contacting the original migration consultant, the handover is incomplete.

# The readiness decision

A readiness review should not produce only “green” or “red.”

We recommend four states.

## Ready

The required evidence exists. Critical gaps are closed. Remaining issues are minor and owned.

## Ready with accepted exceptions

The programme understands the remaining gaps, their impact, owners and treatment. The appropriate authority has accepted the risk.

## Conditionally ready

Specific actions must be completed before the next load or milestone. The conditions are explicit and measurable.

## Not ready

Critical model, data, mapping, target or ownership gaps make the outcome unreliable.

This classification is more useful than forcing every domain into a binary status before the evidence supports it.

# A compact management checklist

Managers do not need to inspect every mapping.

Before approving the next migration milestone, we recommend asking:

1. Which approved model baseline are we loading against?
2. Which required target attributes still lack reliable source data?
3. Which value mappings do not cover the current dataset?
4. Which transformations still depend on open business decisions?
5. Which country or organisational contexts remain untested?
6. Which target validations differ from migration checks?
7. Which critical model objects have no test evidence?
8. Which exceptions will enter production?
9. Who owns unresolved remediation after cutover?
10. Can AMS explain and safely change the migrated data later?

These questions expose more risk than a single mapping-completion percentage.

# A practical readiness scorecard

A scorecard can help management compare domains, but it should not hide critical blockers.

We use categories such as:

| Area | Example evidence |
|---|---|
| Model | Approved attributes, contexts, rules and ownership |
| Source data | Current profiles, completeness and reference checks |
| Mapping | Complete source-to-target and value mappings |
| Target | Stable structures, configuration and prerequisites |
| Testing | Representative coverage and reconciliation |
| Operations | Stewards, remediation and handover |

Each area can be assessed as:

- Verified;
- Partially verified;
- Unsupported;
- Blocked.

We avoid averaging a severe blocker into a generally positive score.

For example, a domain should not receive a reassuring 88% readiness score when one mandatory tax requirement remains unresolved for the largest country.

The scorecard should direct attention, not produce comfort.

# Where Martenweave fits

We built Martenweave to turn readiness from a manual document exercise into a model-driven control process.

The current Martenweave product can represent:

- domains;
- entities;
- attributes;
- organisational contexts;
- source and target field endpoints;
- mappings;
- value lists and mappings;
- validation rules;
- owners;
- issues;
- decisions;
- change proposals;
- datasets and detected gaps.

It supports canonical model files, deterministic validation, generated indexes, dataset profiling, gap detection, trace and impact analysis, ownership and health reports, and reviewable change proposals.

For SAP migration scenarios, Martenweave can connect legacy source columns to SAP field endpoints, validate context and references, compare CSV or XLSX datasets against the expected model, detect missing coverage and trace downstream impact before a rule changes.

A readiness workflow can therefore be built from actual relationships:

```text
Approved model
      ↓
Expected source and target endpoints
      ↓
Current migration dataset
      ↓
Detected gaps and unresolved mappings
      ↓
Validation and impact analysis
      ↓
Reviewable readiness report
```

This does not replace migration tooling, SAP MDG or testing systems.

It provides a controlled view of whether their outputs remain aligned.

## A minimal Martenweave readiness pilot

We recommend starting with:

- one domain;
- one representative dataset;
- 20–100 critical attributes;
- source and target endpoints;
- current mappings;
- important value lists;
- critical validation rules;
- known open decisions.

The pilot should demonstrate that the team can:

1. validate the target model;
2. profile the dataset;
3. detect missing or unexpected fields;
4. identify incomplete value mappings;
5. trace source to target;
6. show the impact of one model change;
7. generate a management-readable readiness report.

The purpose is not to model every field immediately.

It is to prove that readiness can be assessed through evidence rather than spreadsheet status alone.

# Common readiness mistakes

## Waiting until the mock load to profile the data

By then, many mapping and design decisions already depend on assumptions.

Profile representative data during model design.

## Treating blank values as a cleansing issue only

A blank may indicate poor quality, an incorrect target requirement or a missing business process.

The cause matters.

## Reporting mapping completion without value coverage

A field mapping can be complete while most source codes remain unmapped.

Track both.

## Hiding temporary defaults

Defaults should be visible, approved and assigned for remediation.

## Testing only the successful population

Records expected to fail are part of readiness evidence.

## Treating every gap as a migration defect

Some gaps belong to the source, target model, governance process or business decision.

Classify them correctly.

## Completing the load without preparing ownership

The loaded data becomes an operational responsibility immediately after go-live.

Stewardship cannot begin after the project team disappears.

# Our conclusion

SAP data migration readiness is not demonstrated by a finished workbook or a successful technical load.

It is demonstrated when the programme can connect:

- the approved model;
- actual source data;
- mappings and transformations;
- target rules;
- test evidence;
- ownership;
- accepted exceptions.

We use this checklist because most migration risk sits between those artefacts.

A source field exists, but not for every country.

A mapping exists, but the value list is incomplete.

A rule exists, but migration bypasses it.

A test passed, but against an outdated model.

A defect was accepted, but no one owns it after go-live.

Each artefact can appear complete while the overall migration remains unsafe.

Our position is simple:

> A domain is ready when the programme can explain and prove the full path from source data to governed operational use.

That requires more than technical preparation.

It requires a controlled model, explicit decisions and evidence that the organisation can maintain the result after the migration team leaves.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. Our focus is helping architects and delivery teams identify gaps earlier, reduce repeated manual analysis and build evidence that a domain is genuinely ready—not merely reported as complete.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance hub supporting golden records, governed models, profiling, matching and consolidation, workflow routing, validated values, data-quality monitoring, mass changes and auditable data changes. SAP also recommends curating master data early before an SAP S/4HANA implementation.

Martenweave’s public product materials describe canonical model files, deterministic validation, generated indexes, dataset profiling, gap detection, traceability, impact analysis and controlled model-change proposals.

The Martenweave SAP migration scenario documents source-to-target mappings, organisational context, dataset gap detection, lineage and impact analysis.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
