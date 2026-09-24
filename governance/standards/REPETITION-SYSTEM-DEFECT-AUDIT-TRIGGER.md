# JPV Repetition System-Defect Audit Trigger

Status: ENFORCED
Version: 1.0.0
Authority: Founder directive
Scope: all JPV repositories, entities, subsystems, operators, agents, automations, workflows, runtimes, and future governed systems

## Automatic trigger

When the Founder has to repeat, restate, reissue, or materially correct the same instruction, requirement, constraint, decision, or matter more than three times, JPV MUST automatically classify the recurrence as a system/process defect.

`REPETITION_COUNT > 3 => SYSTEM_DEFECT_FLAG=TRUE`

The fourth occurrence is the trigger. No additional Founder instruction, complaint, approval, or diagnosis is required.

## Mandatory response

On trigger, the responsible operator/system MUST:

1. flag the matter as a system/process defect;
2. stop treating the recurrence as an isolated communication error;
3. audit its own execution and reasoning path;
4. audit the governing workflow/process, including routing, continuity, authority, state persistence, validation, tooling, and handoffs relevant to the failure;
5. identify the root cause or, if not yet determinable, the exact unresolved fault boundary;
6. correct every defect within available authority and tooling;
7. add or strengthen recurrence prevention at the appropriate system layer;
8. validate the correction against the original instruction and all established constraints;
9. perform authoritative readback where a persistent system change is involved; and
10. record a defect receipt containing trigger count, matter, root cause/fault boundary, corrections, validation evidence, unresolved dependency, and owner.

## Prohibited behavior after trigger

After the automatic trigger, JPV MUST NOT:

- ask the Founder to repeat the same requirement again;
- treat the problem as merely tone, wording, ambiguity, or user preference when the operative requirement was already established;
- acknowledge the failure without auditing it;
- store the correction only in conversational memory when system persistence is required;
- substitute a plan, explanation, apology, or promise for executable remediation;
- close the defect because the immediate symptom disappeared; or
- claim completion without validation/readback evidence.

## Counting rule

Occurrences are matter-scoped, not phrase-scoped. Semantically equivalent repetitions and corrections count even when wording changes. A recurrence remains the same matter when the operative requirement or failed outcome is materially unchanged.

A materially new requirement starts a new count only for the genuinely new matter. Systems MUST NOT reset the count merely because a new session, operator, tool, repository, branch, provider, or interface is involved.

## Relationship to existing governance

This invariant strengthens JPV continuity, direct-execution, incident-response, labor-reversal, and authority rules. It does not replace them.

The repetition threshold is an escalation floor, not permission to ignore the first three failures. Every failure remains subject to ordinary correction and validation requirements.

## Required state

When triggered:

`JPV_SYSTEM_DEFECT=OPEN`

Closure is permitted only after root-cause/fault-boundary analysis, remediation, recurrence control, validation, and evidence receipt are complete:

`JPV_SYSTEM_DEFECT=CLOSED_VERIFIED`
