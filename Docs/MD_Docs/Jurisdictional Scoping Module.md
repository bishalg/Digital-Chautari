# **Technical Addendum 1: Jurisdictional Scoping Module**

## **A Layered Governance Framework for the Digital Chautari Protocol**

Version: 1.0  
Applies to: Technical Specification v1.0  
Status: For Technical Review

### **1\. Introduction and Rationale**

The base Digital Chautari Protocol (DCP) establishes a robust framework for secure, anonymous, and verifiable polling. However, for practical implementation within a federal structure like Nepal's, a monolithic "national" polling system is insufficient. Governance happens at multiple levels: federal, provincial, district, municipal, and ward. Issues relevant to the citizens of Kathmandu Metropolitan City, Ward 16, should be addressed by participants from that specific ward, not the entire nation.

This addendum specifies the **Jurisdictional Scoping Module**, an extension to the DCP that enables the creation of polls and consultations targeted at specific, verifiable administrative and geographic boundaries. It achieves this by enhancing the Verifiable Credential (VC) model to include location-based attributes, which can then be selectively proven through Zero-Knowledge Proofs (ZKPs) without compromising user privacy.

### **2\. The Core Solution: Attribute-Based Verifiable Credentials**

The key to jurisdictional scoping lies in transforming the VoterEligibilityCredential from a simple binary proof ("is eligible") into a richer **CitizenAttributeCredential**. This credential will contain specific, non-identifiable attributes about the citizen, cryptographically signed by a trusted Issuer (e.g., the Government of Nepal's National ID authority).

#### **2.1. The Role of the Issuer**

During the one-time registration process, when a citizen verifies their National ID, the trusted Issuer will generate a CitizenAttributeCredential. This credential will contain a set of claims based on the official data associated with that citizen's ID.

**Key Attributes for Nepal's Federal Structure:**

* country\_code: "NP"  
* province\_id: (e.g., "3" for Bagmati Province)  
* district\_id: (e.g., "27" for Kathmandu)  
* municipality\_id: (e.g., "2701" for Kathmandu Metropolitan City)  
* ward\_id: (e.g., "16")  
* is\_of\_voting\_age: true

These attributes are securely embedded and signed within the VC, which is then stored by the user in their PVS. The user's name, address, and ID number are **not** included in this credential.

#### **2.2. Extending the ElectionDefinition Schema**

To create a jurisdiction-specific poll, the creating authority (e.g., a municipal office) will include a new object in the ElectionDefinition schema called eligibility\_criteria. This object will specify the exact attributes a citizen must possess to participate.

**Example 1: A Poll for a Specific Ward**

"eligibility\_criteria": {  
  "province\_id": "3",  
  "municipality\_id": "2701",  
  "ward\_id": "16"  
}

*This poll would only be open to citizens whose credentials contain attributes matching Ward 16 of Kathmandu Metro in Bagmati Province.*

**Example 2: A Poll for an Entire Province**

"eligibility\_criteria": {  
  "province\_id": "4"  
}

*This poll would be open to all verified citizens of Gandaki Province.*

### **3\. Privacy-Preserving Proof of Jurisdiction**

The most critical component is how a citizen proves they meet these criteria without revealing their location. This is achieved by extending the Zero-Knowledge Proof.

When a citizen of Ward 16 wants to vote in their local poll, their client application will generate a ZKP that proves the following statement to the Tallying Service:

*"I am in possession of a valid CitizenAttributeCredential signed by a trusted Issuer, AND the province\_id attribute in my credential has the value "3", AND the municipality\_id attribute has the value "2701", AND the ward\_id attribute has the value "16". Furthermore, the nullifier for this poll has not been used before."*

The ZKP verifies this entire statement as true without revealing the credential itself or any other attributes it might contain. The Tallying Service learns only that the ballot is from a legitimate participant of the correct jurisdiction, preserving the citizen's anonymity and privacy perfectly.

### **4\. Updated Schemas for the Digital Chautari Lexicon**

To implement this module, the following schemas in the Digital Chautari Lexicon must be updated.

#### **Updated CitizenAttributeCredential Schema**

(Replaces VoterEligibilityCredential)

{  
  "@context": \["\[https://www.w3.org/2018/credentials/v1\](https://www.w3.org/2018/credentials/v1)"\],  
  "id": "...",  
  "type": \["VerifiableCredential", "CitizenAttributeCredential"\],  
  "issuer": "did:example:GovOfNepal",  
  "issuanceDate": "...",  
  "credentialSubject": {  
    "id": "did:example:citizen123",  
    "country\_code": "NP",  
    "province\_id": "3",  
    "district\_id": "27",  
    "municipality\_id": "2701",  
    "ward\_id": "16",  
    "is\_of\_voting\_age": true  
  },  
  "proof": { ... }  
}

#### **Updated ElectionDefinition Schema**

(With added eligibility\_criteria field)

{  
  "electionId": "...",  
  "electionName": "Budget Consultation for KMC Ward 16",  
  "contests": \[ ... \],  
  "electionPublicKey": "...",  
  "trusteeDids": \[ ... \],  
  "trustedIssuerDids": \["did:example:GovOfNepal"\],  
  "eligibility\_criteria": {  
    "province\_id": "3",  
    "municipality\_id": "2701",  
    "ward\_id": "16"  
  }  
}

### **5\. Benefits of this Layered Approach**

* **Hyper-Local Engagement:** Empowers local governments to consult directly with their constituents on local matters.  
* **Reduced Noise:** Ensures that only relevant stakeholders participate, making the collected data more accurate and actionable.  
* **Flexibility:** The attribute-based model is highly flexible. Future credentials could include non-geographic attributes (e.g., "is\_a\_registered\_farmer," "is\_a\_community\_health\_volunteer") to enable targeted consultations with specific professional or social groups.  
* **Maintains Core Principles:** This extension is built entirely on the existing principles of DCP, preserving user sovereignty, privacy, and end-to-end verifiability.