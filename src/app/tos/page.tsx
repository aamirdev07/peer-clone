"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-[800px] mx-auto px-6 py-12"
    >
      <h1 className="text-3xl font-bold text-text-primary">Peer Terms of Service</h1>
      <p className="text-lg font-semibold text-text-primary mt-4">
        Last modified: January 24th, 2025
      </p>

      <div className="mt-8 space-y-6 text-text-secondary text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Peer interface (the &ldquo;Interface&rdquo;) available at peer.xyz,
            you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). The Interface is operated
            by P2P Labs Inc. (&ldquo;P2P Labs,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            If you do not agree to all of these Terms, you may not access or use the Interface. We reserve the
            right to modify these Terms at any time, and such modifications will be effective immediately upon
            posting. Your continued use of the Interface following the posting of revised Terms constitutes
            your acceptance of such changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age to use the Interface. By using the Interface, you represent
            and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
            You further represent that you are not a person barred from using the Interface under the laws of
            your applicable jurisdiction, and that you are not a resident of, or accessing the Interface from,
            any jurisdiction where the use of blockchain-based protocols or cryptocurrency is prohibited or
            restricted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">3. Description of the Interface</h2>
          <p>
            The Peer Interface provides a decentralized, peer-to-peer marketplace that enables users to convert
            between fiat currencies and digital assets using zero-knowledge proof technology. The Interface
            interacts with smart contracts deployed on various Layer 1 and Layer 2 blockchain networks. P2P Labs
            does not custody, control, or manage user funds at any time. All transactions are executed on-chain
            through non-custodial smart contracts. The Interface merely provides a convenient front-end for
            users to interact with these underlying protocols.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">4. Prohibited Uses</h2>
          <p>
            You agree not to use the Interface for any unlawful purpose or in any manner that could damage,
            disable, overburden, or impair the Interface. Prohibited activities include, but are not limited to:
            engaging in money laundering, terrorist financing, or sanctions evasion; using the Interface to
            circumvent applicable laws or regulations; attempting to exploit, interfere with, or compromise the
            security or integrity of the smart contracts or the Interface; using automated bots, scripts, or
            other programmatic methods to interact with the Interface without prior authorization; and engaging
            in market manipulation, wash trading, or other deceptive trading practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, P2P Labs, its affiliates, officers, directors,
            employees, and agents shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of profits, data, or use, arising out of or in
            connection with your use of the Interface, whether based on warranty, contract, tort, or any other
            legal theory. The Interface is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            warranties of any kind, either express or implied. Your use of the Interface and interaction with
            the underlying smart contracts is entirely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-3">6. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Cayman Islands,
            without regard to its conflict of law principles. Any disputes arising out of or in connection with
            these Terms shall be resolved through binding arbitration in accordance with the rules of the
            relevant arbitration authority. By agreeing to these Terms, you waive your right to participate in
            any class action lawsuit or class-wide arbitration.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
