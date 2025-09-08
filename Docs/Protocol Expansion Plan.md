# **Protocol Expansion Plan: Proposed Expansion Plan**

**Objective:** To enhance the Digital Chautari Protocol (DCP) technical specification with the necessary detail for independent implementation, security auditing, and long-term viability.

### **1\. Deep Dive: Network Communication & XRPC Specification**

The current specification describes the roles of the PVS, Relays, and AVs. We now need to define precisely how they communicate.

**Topics to Cover:**

* **PVS-to-Relay Communication:**  
  * What is the exact XRPC (or equivalent RPC) method for a PVS to announce itself to a Relay?  
  * How does a Relay subscribe to real-time updates from a PVS? (e.g., using WebSockets, long polling).  
  * Define the data format for the event stream ("firehose") from the PVS.  
* **AV-to-Relay Communication:**  
  * Specify the XRPC methods for an AV (like a Tallying Service) to connect to a Relay's firehose.  
  * How are filters applied? (e.g., "subscribe only to CastVoteTransaction records for electionId=123").  
* **Client-to-PVS Communication:**  
  * Define the core API endpoints a PVS must expose for a client application (e.g., createRecord, getRecord, updateProfile).  
* **Data Synchronization:**  
  * How does a user's repository get synchronized across multiple devices or after a PVS migration? Define the protocol for resolving conflicts and ensuring consistency.

**Why this is critical:** Without these definitions, no two independently built components (e.g., a PVS from one team and a Relay from another) could communicate, defeating the purpose of a federated protocol.

### **2\. Deep Dive: Cryptographic Primitive Specification**

The document correctly identifies the *types* of cryptography needed (homomorphic encryption, ZKPs). A full protocol must specify the *exact algorithms and parameters*.

**Topics to Cover:**

* **Signature Scheme:** Specify the exact algorithm and curve (e.g., ECDSA over secp256k1, or EdDSA over Curve25519).  
* **Hashing Algorithm:** Define the standard hash function for the protocol (e.g., SHA-256, BLAKE3).  
* **Homomorphic Encryption Scheme:**  
  * Specify the exact scheme (e.g., Exponential ElGamal).  
  * Define the cryptographic group, key generation parameters, and ciphertext encoding format.  
* **Zero-Knowledge Proof System:**  
  * Specify the ZKP system (e.g., Groth16, PLONK, or a STARK-based system).  
  * Define the exact circuits for the CitizenAttributeCredential proof and the nullifier scheme. This is a highly detailed task crucial for security.

**Why this is critical:** Ambiguity in cryptography is dangerous. Specifying these details ensures all implementations are secure and interoperable, and allows for formal security analysis and audits.

### **3\. Deep Dive: Key Management & Account Recovery**

This is one of the most critical aspects of user security and sovereignty.

**Topics to Cover:**

* **Key Derivation:** How are the user's signing and recovery keys generated? (e.g., from a mnemonic seed phrase).  
* **Recovery Key Storage:** Provide clear guidance and best practices for users on how to securely store their recovery key (e.g., offline, on paper).  
* **Account Recovery Protocol:** Detail the exact, step-by-step process a user follows to recover their account using their recovery key if their PVS provider becomes unavailable or they lose their primary device. This involves signing a message with the recovery key to update their DID document to point to a new PVS.  
* **Key Rotation:** Specify a protocol for rotating signing keys for security hygiene.

**Why this is critical:** A user's control over their identity is only as strong as their ability to recover it. A robust, well-documented recovery process is non-negotiable.

### **4\. Deep Dive: Credential Revocation Mechanism**

The protocol must be able to handle cases where a CitizenAttributeCredential needs to be invalidated.

**Topics to Cover:**

* **Revocation Trigger:** Who can initiate a revocation? (e.g., the original Issuer).  
* **Revocation List:** How are revocations published? A common method is for the Issuer to maintain a cryptographically signed, publicly accessible revocation list.  
* **Privacy-Preserving Check:** How does the Tallying Service check if a credential has been revoked without learning the user's identity? This can be incorporated into the ZKP, where the user must prove their credential is *not* on the public revocation list.

**Why this is critical:** This ensures the integrity of the system by allowing fraudulent or outdated credentials to be removed from circulation.

### **5\. Deep Dive: Long-Term Scalability & Data Archival**

A public bulletin board of all votes will grow indefinitely. The protocol needs a plan for managing this data over decades.

**Topics to Cover:**

* **Data Pruning:** Can non-essential data be pruned from active Relays after an election is certified and audited?  
* **Archival Nodes:** Propose a role for "Archival Nodes" in the network, whose purpose is to store the complete history of the firehose for long-term public record and academic research.  
* **State Syncing:** How does a new Relay or AV quickly get up to speed with the current state of the network without having to process the entire history from genesis? Define protocols for state snapshots.

**Why this is critical:** A protocol that cannot scale or manage its own data growth will eventually become unusable. Planning for this from the start is essential for long-term success.