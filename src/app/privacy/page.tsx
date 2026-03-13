"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[800px] mx-auto px-6 py-12"
    >
      <h1 className="text-3xl font-bold text-text-primary">Peer Privacy Policy</h1>
      <p className="text-lg font-semibold text-text-primary mt-4">
        Last modified: January 24th, 2025
      </p>

      <div className="mt-8 space-y-6 text-text-secondary text-base leading-relaxed">
        <section>
          <p>
            This Privacy Policy describes how P2P Labs Inc. (&ldquo;P2P Labs,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares data in connection with the
            Peer interface (peer.xyz) and our related services (collectively, the &ldquo;Services&rdquo;).
            By using the Services, you agree to the collection and use of information in accordance with
            this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">High Level Summary</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Peer consists of a set of smart contracts deployed on Layer 1 and Layer 2 chains. The smart
              contracts are open source, transparent, and operate autonomously without any centralized
              intermediary.
            </li>
            <li>
              We do not collect or store personal data, such as first name, last name, street address, date
              of birth, email address, or IP address, in connection with your use of the Services.
            </li>
            <li>
              We enable authentication via an extension to read select payment data. This enables an improved
              user experience in generating ZK proofs. Only data explicitly approved by the user will be used
              in proof generation.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">Information We Collect</h2>
          <p>
            When you interact with the Peer Interface, we may collect limited, non-personally identifiable
            information to improve the Services. This may include publicly available blockchain data such as
            wallet addresses, transaction hashes, and on-chain balances. We do not link this on-chain data
            to any off-chain personal identity. Additionally, we may collect anonymized usage analytics such
            as page views, feature usage patterns, and error logs to help us improve the Interface. We use
            privacy-preserving analytics tools that do not track individual users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">How We Use Information</h2>
          <p>
            Any information we collect is used solely for the purpose of operating, maintaining, and improving
            the Peer Interface. We may use aggregated, anonymized data to analyze usage trends, optimize
            performance, identify bugs, and enhance the user experience. We do not sell, rent, or share any
            user data with third parties for marketing or advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">Third-Party Services</h2>
          <p>
            The Interface may interact with third-party services such as blockchain networks, RPC providers,
            and wallet extensions. These third-party services have their own privacy policies and practices,
            and we encourage you to review them. P2P Labs is not responsible for the privacy practices of
            third-party services. When you connect a wallet to the Interface, the wallet provider may collect
            information in accordance with its own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">Security</h2>
          <p>
            We take reasonable measures to protect the information associated with the Services. However, no
            method of transmission over the Internet or method of electronic storage is completely secure.
            While we strive to use commercially acceptable means to protect your information, we cannot
            guarantee its absolute security. Users are responsible for safeguarding their own wallet
            credentials and private keys.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new Privacy Policy on this page and updating the &ldquo;Last modified&rdquo; date. You are
            advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
