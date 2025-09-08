// Data models for the application
// Keeps all content separate from logic and presentation

// Modal content data - structured and clean
const modalContentData = {
    conceptNote: {
        id: 'modal1',
        title: 'Concept Note: Digital Chautari',
        sections: [
            {
                type: 'header',
                content: {
                    to: 'Nepali Government Officials and Policymakers',
                    from: 'Proponents of Digital Governance',
                    date: 'September 7, 2025',
                    subject: 'Digital Chautari - A Secure Digital Bridge Between Citizens and Government'
                }
            },
            {
                type: 'section',
                title: '1. The Problem: A Growing Trust Deficit',
                content: 'In the digital age, the channels between the government and its citizens remain largely traditional, slow, and opaque. Public consultations often fail to capture a representative sample of public opinion, and citizens lack confidence that their voices are heard or that official decisions are free from bias.'
            },
            {
                type: 'section',
                title: '2. The Vision: A Tool for Transparent Governance',
                content: 'We propose the Digital Chautari ("Digital Public Square") Initiative, a project to develop a secure, transparent, and verifiable digital toolkit for public consultation. This system is not just another survey app; it is a foundational piece of public infrastructure designed to provide policymakers with an un-tamperable, clear, and direct line to the true voice of the Nepali people.'
            },
            {
                type: 'section',
                title: '3. How It Works: Security and Anonymity by Design',
                content: [
                    'One Person, One Vote: Citizens verify their identity once using their National ID in a secure, private process.',
                    'Complete Anonymity: When a citizen voices their opinion, their identity is cryptographically separated from their vote.',
                    'End-to-End Verifiability: Every vote is encrypted and posted to a public, transparent "digital bulletin board."'
                ]
            },
            {
                type: 'section',
                title: '4. Benefits for Nepal',
                content: [
                    'Enhanced Public Trust: Rebuilds faith in democratic processes by making them transparent and auditable.',
                    'Data-Driven Policy: Provides policymakers with accurate, unbiased data on public sentiment.',
                    'Inclusive Participation: Gives a voice to minorities and those in remote areas.',
                    'Layered Governance: The system is designed for Nepal\'s federal structure.'
                ]
            },
            {
                type: 'section',
                title: '5. The Path Forward',
                content: 'This is not a proposal to replace existing democratic institutions but to strengthen them with modern, secure technology. We have prepared a comprehensive white paper and technical specification detailing the protocol.'
            }
        ]
    },
    
    whitePaper: {
        id: 'modal2',
        title: 'White Paper: The Digital Chautari Framework',
        sections: [
            {
                type: 'section',
                title: '1. Executive Summary',
                content: 'This document outlines the framework for Digital Chautari, a protocol designed to create a secure, transparent, and layered system for public consultation and voting.'
            },
            {
                type: 'section',
                title: '2. Vision & Core Principles',
                content: 'Our vision is a Nepal where public policy is a direct reflection of the people\'s will. The protocol is built on three core principles:',
                list: [
                    'User Sovereignty: Citizens own and control their identity and data.',
                    'Verifiable Integrity: The integrity of every poll is mathematically provable by any party.',
                    'Privacy by Design: Voter anonymity is a non-negotiable cryptographic guarantee.'
                ]
            },
            {
                type: 'section',
                title: '3. Implementation Roadmap',
                content: 'A phased approach is proposed to ensure successful adoption:',
                orderedList: [
                    'Phase 1 (6-9 Months): Development of the core protocol and pilot project.',
                    'Phase 2 (12 Months): Expansion to multiple municipalities and provincial-level consultations.',
                    'Phase 3 (Ongoing): Nationwide rollout for non-binding national consultations.'
                ]
            },
            {
                type: 'section',
                title: '4. Conclusion',
                content: 'Digital Chautari offers a transformative opportunity to modernize governance, enhance democratic participation, and build a more responsive and trusted state.'
            }
        ]
    },
    
    technicalSpec: {
        id: 'modal3',
        title: 'Technical Specification: Vox Populi Protocol (VPP)',
        sections: [
            {
                type: 'section',
                title: 'Abstract',
                content: 'This report introduces the Vox Populi Protocol (VPP), a comprehensive framework for creating a decentralized, federated system for public voice data collection and cryptographically secure voting.'
            },
            {
                type: 'section',
                title: '1. Architectural Framework',
                content: 'The VPP architecture consists of Personal Voice Servers (PVS), Aggregation Relays, and Application Views (AVs)...'
            },
            {
                type: 'section',
                title: '2. The Identity Layer',
                content: 'Sybil resistance is achieved via W3C Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs), with eligibility proven using Zero-Knowledge Proofs (ZKPs)...'
            },
            {
                type: 'section',
                title: '4. Application Layer: E2E-V Voting',
                content: 'The protocol implements an End-to-End Verifiable (E2E-V) voting system using homomorphic encryption, guaranteeing that votes are Cast-as-Intended, Recorded-as-Cast, and Counted-as-Recorded...'
            },
            {
                type: 'note',
                content: '(Note: This is a summary. The full specification details the exact cryptographic primitives, data schemas, and network APIs.)'
            }
        ]
    },
    
    scopingModule: {
        id: 'modal4',
        title: 'Technical Addendum: Jurisdictional Scoping Module',
        sections: [
            {
                type: 'section',
                title: '1. Introduction and Rationale',
                content: 'This addendum specifies the Jurisdictional Scoping Module, an extension to the VPP that enables the creation of polls and consultations targeted at specific administrative and geographic boundaries.'
            },
            {
                type: 'section',
                title: '2. The Core Solution: Attribute-Based Verifiable Credentials',
                content: 'The solution lies in enhancing the VoterEligibilityCredential to a richer CitizenAttributeCredential. This credential contains non-identifiable attributes signed by a trusted Issuer.'
            },
            {
                type: 'subsection',
                title: 'Key Attributes for Nepal\'s Federal Structure:',
                codeList: [
                    'province_id: (e.g., "3" for Bagmati)',
                    'district_id: (e.g., "27" for Kathmandu)',
                    'municipality_id: (e.g., "2701" for Kathmandu)',
                    'ward_id: (e.g., "16")'
                ]
            },
            {
                type: 'section',
                title: '3. Privacy-Preserving Proof of Jurisdiction',
                content: 'A citizen proves they meet the criteria for a local poll without revealing their location using an extended Zero-Knowledge Proof.'
            },
            {
                type: 'section',
                title: '4. Benefits of this Layered Approach',
                content: [
                    'Hyper-Local Engagement: Empowers local governments.',
                    'Reduced Noise: Ensures only relevant stakeholders participate.',
                    'Flexibility: The model can be extended to non-geographic attributes in the future.'
                ]
            }
        ]
    }
};

// Application configuration
const appConfig = {
    defaultTheme: 'dark',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'np'],
    scrollAnimationThreshold: 0.1,
    modalTransitionDelay: 10,
    modalCloseDelay: 250
};

// Export for module usage (when needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { modalContentData, appConfig };
}

// Make available globally for browser usage
window.AppData = { modalContentData, appConfig };
