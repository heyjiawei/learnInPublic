# Stage 0, Aspirational / Introduction

- If the feature is transpiled or polyfilled at this stage, it's done by the person working on the proposal itself
- Stage 0 proposals aren't fleshed out enough (and do not contain enough spec text) for a third party to attempt implementation
- Using a Stage 0 implementation means you are helping to develop the feature and it is virtually certain to change significantly as it makes its way through the process.

# Stage 1, Experimental / Proposal

- the point where the proposal is expected to have identified cross-cutting concerns, interactions with other proposals, and implementation concerns.
- The proposal itself should be relatively fleshed out: the process requires "discussion of key algorithms, abstractions and semantics," "illustrative examples of usage," and "high level API."
- Using a Stage 1 implementation means you're helping to user test the feature and flesh out edge cases. It is still virtually certain to change significantly as it makes its way through the process.
- People often attempt to transpile or polyfill features at this stage, but the spec is usually missing enough detail that implementation attempts require close coordination with the champions, and almost always end up influencing the spec text presented for Stage 2.

# Stage 2, Draft

- Formally, a Stage 2 proposal is an initial draft of reasonably complete spec text ("all major semantics, syntax and API are covered, but TODOs, placeholders and editorial issues are expected").
- It's also the point where it's reasonable to consider using implementations (either transpiled/polyfilled implementations or implementations in engines) in real applications.
- Using a Stage 2 implementation means you're still helping to test out the feature, but with reasonable confidence that the core functionality will eventually make it into the spec.
- It will likely change in some form as the process continues. That said, updating your use of the mainstream scenarios in a feature after this point should usually be incremental.

# Stage 3, Browser Early Adoption / Candidate

- Stage 3 requires complete spec text, and requires both the feature's reviewers and the spec editor to sign off on the spec text. The process says that "all semantics, syntax and API are completed described."
- In practice, proposals move to them level with at least one browser implementation or a high-fidelity polyfill or transpiler.
- Stage 3 proposals do not necessarily make it through to Stage 4, but a Stage 3 proposal will almost always make it to Stage 4 after a period of implementation effort.

# Stage 4, Finished

- Indicate that the addition is ready for inclusion in the formal ECMAScript standard
