# Commercial availability policy

The repository code is MIT-licensed. That license does not grant rights to third-party weights, workflows, plugins or hosted models.

When `NODE_ENV=production`, IrisStudio enables commercial mode by default. In that mode, the server exposes only implemented direct-provider routes, which use the customer's own provider account and credentials. Bundled local and Comfy Cloud workflows, known restricted capabilities, and customer-imported workflows are excluded from the executable catalogue until their complete commercial terms are reviewed and approved.

The current list of known restricted capability IDs is maintained in `server/commercial-availability.ts`. Local development keeps the full catalogue unless `IRISSTUDIO_COMMERCIAL_MODE=1` is set. Production refuses `IRISSTUDIO_COMMERCIAL_MODE=0`.

Adding a workflow to a commercial catalogue requires a recorded review of its workflow source, every node/plugin, every model and adapter, any geographic or provider restrictions, and the exact deployment model. The current inventory still records open dependency reviews; commercial mode is a fail-closed protection for bundled workflows, not a legal clearance for the entire product.
